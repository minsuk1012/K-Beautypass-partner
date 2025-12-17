// app/partner/actions.ts
'use server';

import { cookies } from 'next/headers';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';
// We alias it to 'supabase' to minimize code changes in the file, 
// or I can replace all usages. Aliasing is safer for this tool.
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // Simple query to check user
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password) // In production, hash passwords!
    .single();

  if (error || !user) {
    return { error: 'Invalid credentials' };
  }

  // Set session
  const cookieStore = await cookies();
  cookieStore.set('partner_user_id', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('partner_user_id');
  redirect('/partner/login');
}

export async function getMetadata() {
  // Fetch categories and variations
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: variations } = await supabase.from('variations').select('*').order('name');

  return { categories, variations };
}

export async function saveDraft(products: any[], hospitalInfo: any) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('partner_user_id')?.value;

  if (!userId) {
    return { error: 'Unauthorized' };
  }

  try {
    // 1. Upsert Hospital Info
    if (hospitalInfo) {
        console.log('Upserting hospital info:', hospitalInfo);
        const { error: hospitalError } = await supabase
            .from('hospitals')
            .upsert({ 
                user_id: userId,
                ...hospitalInfo,
                updated_at: new Date().toISOString() 
            }, { onConflict: 'user_id' });
        
        if (hospitalError) {
             console.error('Hospital Upsert Error:', hospitalError);
             throw hospitalError;
        }
    }

    // 2. Upsert Products (Existing Logic)
    // We need to upsert products. 
    // Strategy: 
    // 1. Delete existing products for this user (simplest for draft overwrite if we don't track updates finely)
    // OR 2. Smart upsert. Given simplicity, full replacement for creating new set is easiest, but if we want to edit specific items...
    // Let's assume the frontend sends the FULL state. So we can delete all and recreate, or update.
    // Deleting all might lose IDs if we cared about them.
    // Better: Upsert by ID if provided, insert if not.
    // The frontend should track IDs if they exist (loaded from draft).

    // Also, we might have deleted products in the UI. We need to handle deletions.
    // Ideally user sends list of IDs to keep?
    // Alternative: Delete all for user and re-insert. This churns UUIDs but ensures consistency perfectly for 'Draft' state.
    // Given "Draft", overwrite is acceptable.
    // Let's optimize: The UI sends the current full list.
    // We can fetch existing IDs, compare with new IDs, delete missing.
    // But "Delete All" is robust.
    // WAIT: "Delete All" changes IDs, if we reload draft, frontend gets new IDs. That's fine.
    
    // REVISED STRATEGY: Delete all logic for simplicity/robustness match.
    // Step 1: Delete all hospital_products for user. (Cascade deletes pricings)
    // Step 2: Insert all new.
    // DOWNSIDE: Heavy churn.
    // COMPROMISE: If this were production, I'd do diffing. For this task... "중간 저장" (Draft).
    // Let's stick to Replace All to avoid "ghost" data.
    
    // TRANSACTION? Supabase-js doesn't support transactions easily without RPC.
    // We risk partial state.
    // Okay, let's keep it simple: 
    // We will assume 'id' in frontend is strictly for UI keys if temp, and real UUID if loaded.
    // Actually, users might have 100 products. Deleting all 100 and inserting 100 every save is slow.
    // Let's try to update if ID exists.
    
    // What about deleted products?
    // We need to know which ones were deleted.
    // Let's ask client to send `deletedProductIds`?
    // Or just fetch current list IDs, diff with incoming IDs, delete missing.
    
    // Fetch current IDs to handle deletions
    const { data: currentProducts } = await supabase.from('hospital_products').select('id').eq('user_id', userId);
    const existingIds = currentProducts?.map(p => p.id) || [];
    const incomingIds = products.map(p => p.id).filter(id => id && !id.startsWith('temp-'));
    
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));
    if (toDelete.length > 0) {
        await supabase.from('hospital_products').delete().in('id', toDelete);
    }
    
    // Continue with Upsert loop defined above...
    // Redefining the loop to be complete:
   
    for (const prod of products) {
        let productId = prod.id;
        
        if (productId && !productId.startsWith('temp-')) {
             await supabase.from('hospital_products').update({
                name: prod.name,
                variation_id: prod.variation_id
            }).eq('id', productId);
            
            // Pricings: Delete all and re-insert (easier than diffing nested array)
            await supabase.from('hospital_product_pricings').delete().eq('hospital_product_id', productId);
             const priceInserts = prod.pricings.map((p: any) => ({
                hospital_product_id: productId,
                description: p.description,
                price: parseInt(p.price),
                promotion_price: p.promotion_price ? parseInt(p.promotion_price) : null
            }));
            if (priceInserts.length > 0) await supabase.from('hospital_product_pricings').insert(priceInserts);

        } else {
             const { data, error } = await supabase.from('hospital_products').insert({
                user_id: userId,
                variation_id: prod.variation_id,
                name: prod.name
            }).select('id').single();
            if (error) throw error;
            productId = data.id;
            
            const priceInserts = prod.pricings.map((p: any) => ({
                hospital_product_id: productId,
                description: p.description,
                price: parseInt(p.price),
                promotion_price: p.promotion_price ? parseInt(p.promotion_price) : null
            }));
            if (priceInserts.length > 0) await supabase.from('hospital_product_pricings').insert(priceInserts);
        }
    }
    
    // Update IsSubmitted false (since it's draft)
    await supabase.from('users').update({ is_submitted: false }).eq('id', userId);

    return { success: true };

  } catch (e: any) {
    console.error('Save Draft Error:', e);
    return { error: `저장 실패: ${e.message || '알 수 없는 오류'}` };
  }
}

export async function submitFinal(products: any[], hospitalInfo: any) {
    // Save first
    const saveResult = await saveDraft(products, hospitalInfo);
    if (saveResult.error) return saveResult;
    
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;
    
    if (userId) {
        await supabase.from('users').update({ is_submitted: true }).eq('id', userId);
    }
    
    // Send Slack Notification
    if (hospitalInfo && products.length > 0) {
        await sendSlackNotification(hospitalInfo, products);
    }

    return { success: true };
}

async function sendSlackNotification(hospital: any, products: any[]) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    const productSummary = products.map(p => {
        const pricings = p.pricings.map((pr: any) => 
            `- ${pr.description}: ${parseInt(pr.price).toLocaleString()}원${pr.promotion_price ? ` (할인가: ${parseInt(pr.promotion_price).toLocaleString()}원)` : ''}`
        ).join('\n');
        return `*${p.name}*\n${pricings}`;
    }).join('\n\n');

    const payload = {
        text: "새로운 병원 입점 신청이 접수되었습니다! 🎉",
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "🏥 새로운 병원 입점 신청",
                    emoji: true
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*병원명:*\n${hospital.name}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*대표자:*\n${hospital.representative_name}`
                    }
                ]
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*담당자:*\n${hospital.manager_name}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*연락처:*\n${hospital.manager_phone}`
                    }
                ]
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*주소:*\n${hospital.address} ${hospital.detailed_address || ''}`
                    },
                    {
                        type: "mrkdwn",
                        text: `*지역:*\n${hospital.district}`
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*등록된 시술 상품 (${products.length}개)*\n\n${productSummary}`
                }
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "관리자 페이지에서 보기",
                            emoji: true
                        },
                        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin`,
                        style: "primary"
                    }
                ]
            }
        ]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error('Slack notification failed:', e);
    }
}

export async function undoSubmit() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;
    
    if (userId) {
        await supabase.from('users').update({ is_submitted: false }).eq('id', userId);
        return { success: true };
    }
    return { error: 'Unauthorized' };
}


export async function loginOrRegister(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  let user = existingUser;

  if (existingUser) {
      if (existingUser.password !== password) {
          return { error: 'Invalid password' };
      }
  } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({ username, password })
        .select()
        .single();
      
      if (createError) return { error: 'Failed to create account' };
      user = newUser;
  }

  // Set session
  const cookieStore = await cookies();
  cookieStore.set('partner_user_id', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return { success: true };
}

export async function loadData() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;
    
    if (!userId) return { success: false, error: 'Not logged in' };

    // Use supabaseAdmin to bypass RLS (aliased as supabase)
    // Fetch Hospital Info
    const { data: hospital, error: hError } = await supabase
        .from('hospitals')
        .select('*')
        .eq('user_id', userId)
        .single();
        
    // Fetch User Info (for is_submitted status)
    const { data: user, error: uError } = await supabase
        .from('users')
        .select('is_submitted')
        .eq('id', userId)
        .single();
    
    // Fetch Products
    const { data: products, error: pError } = await supabase
        .from('hospital_products')
        .select(`
            id, name, variation_id,
            hospital_product_pricings (id, description, price, promotion_price)
        `)
        .eq('user_id', userId);
        
    return { 
        isLoggedIn: true,
        products, 
        hospitalInfo: hospital,
        isSubmitted: user?.is_submitted 
    };
}
