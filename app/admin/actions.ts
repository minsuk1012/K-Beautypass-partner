'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function login(formData: FormData) {
  const id = formData.get('id');
  const password = formData.get('password');
  
  if (!id || !password) {
      return { error: 'Please enter both ID and password' };
  }

  const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('username', id)
      .eq('password_hash', password) // Storing plain text for this prototype as requested
      .single();

  if (admin && !error) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', admin.id, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return { success: true };
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
