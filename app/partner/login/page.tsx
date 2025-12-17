'use client';

import React, { useState } from 'react';
import { login } from '../actions';
import { BrandLogo } from '@/components/BrandLogo';
import { useRouter } from 'next/navigation';

export default function PartnerLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData);
      if (result?.success) {
        router.push('/partner/onboarding');
      } else if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <BrandLogo className="w-12 h-12 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">파트너 로그인</h1>
          <p className="text-slate-500 text-sm">Vital Connect 병원 입점 파트너</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">아이디</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              placeholder="Partner ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? '로그인 중...' : '로그인 / 회원가입'}
          </button>
          
          <p className="text-xs text-center text-slate-400 mt-4">
             새로운 아이디를 입력하시면 자동으로 회원가입 처리됩니다.
             <br/>(임시 기능: 비밀번호를 잊지 마세요)
          </p>
        </form>
      </div>
    </div>
  );
}
