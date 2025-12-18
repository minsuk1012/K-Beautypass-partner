'use client';

import React, { useState } from 'react';
import { login, register } from '../actions';
import { BrandLogo } from '@/components/BrandLogo';
import { useRouter } from 'next/navigation';

export default function PartnerLoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const action = isLoginMode ? login : register;
      const result = await action(formData);
      
      if (result?.success) {
        router.push('/partner/onboarding');
      } else if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setError('오류가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <BrandLogo className="w-12 h-12 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">
            {isLoginMode ? '파트너 로그인' : '파트너 회원가입'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">K-Beauty Pass Partners</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
            <button
                type="button"
                onClick={() => {
                    setIsLoginMode(true);
                    setError('');
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                    isLoginMode 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                로그인
            </button>
            <button
                type="button"
                onClick={() => {
                    setIsLoginMode(false);
                    setError('');
                }}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                    !isLoginMode 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                회원가입
            </button>
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
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                처리 중...
              </div>
            ) : (isLoginMode ? '로그인' : '회원가입 및 바로 시작')}
          </button>
        </form>
      </div>
    </div>
  );
}
