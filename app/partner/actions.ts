'use server';

import { cookies } from 'next/headers';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user || user.password !== password) {
    return { error: '아이디 또는 비밀번호가 일치하지 않습니다.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('partner_user_id', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 
  });

  return { success: true };
}

export async function register(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single();

  if (existingUser) {
    return { error: '이미 존재하는 아이디입니다.' };
  }

  // Create new user
  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert({ username, password })
    .select()
    .single();
  
  if (createError || !newUser) {
      console.error('Registration Error:', createError);
      return { error: '회원가입에 실패했습니다.' };
  }

  // Auto login (Set session)
  const cookieStore = await cookies();
  cookieStore.set('partner_user_id', newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('partner_user_id');
  redirect('/partner/onboarding');
}

export async function getMetadata() {
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
    if (hospitalInfo) {
        const { error: hospitalError } = await supabase
            .from('hospitals')
            .upsert({ 
                user_id: userId,
                ...hospitalInfo,
                updated_at: new Date().toISOString() 
            }, { onConflict: 'user_id' });
        
        if (hospitalError) throw hospitalError;
    }

    const { data: currentProducts } = await supabase.from('hospital_products').select('id').eq('user_id', userId);
    const existingIds = currentProducts?.map(p => p.id) || [];
    const incomingIds = products.map(p => p.id).filter(id => id && !id.startsWith('temp-'));
    
    const toDelete = existingIds.filter(id => !incomingIds.includes(id));
    if (toDelete.length > 0) {
        await supabase.from('hospital_products').delete().in('id', toDelete);
    }
    
    for (const prod of products) {
        let productId = prod.id;
        
        if (productId && !productId.startsWith('temp-')) {
             await supabase.from('hospital_products').update({
                name: prod.name,
                variation_id: prod.variation_id
            }).eq('id', productId);
            
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
    
    await supabase.from('users').update({ is_submitted: false }).eq('id', userId);

    return { success: true };

  } catch (e: any) {
    console.error('Save Draft Error:', e);
    return { error: `저장 실패: ${e.message || '알 수 없는 오류'}` };
  }
}

export async function submitFinal(products: any[], hospitalInfo: any) {
    const saveResult = await saveDraft(products, hospitalInfo);
    if (saveResult.error) return saveResult;
    
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;
    
    if (userId) {
        await supabase.from('users').update({ is_submitted: true }).eq('id', userId);
    }
    
    if (hospitalInfo && products.length > 0) {
        await sendSlackNotification(hospitalInfo, products);
    }

    return { success: true };
}

async function sendSlackNotification(hospital: any, products: any[]) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

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
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*등록된 시술 상품 수:*\n${products.length}개`
                    }
                ]
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
                        url: `https://partner.k-beautypass.com/admin`,
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

export async function loadData() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;
    
    if (!userId) {
        return { 
            isLoggedIn: false,
            products: [], 
            hospitalInfo: null,
            isSubmitted: false 
        };
    }

    const { data: hospital } = await supabase
        .from('hospitals')
        .select('*')
        .eq('user_id', userId)
        .single();
        
    const { data: user } = await supabase
        .from('users')
        .select('is_submitted')
        .eq('id', userId)
        .single();
    
    const { data: products } = await supabase
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
