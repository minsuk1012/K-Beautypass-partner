'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Send, Building, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

const ConsultationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    hospitalName: '',
    managerName: '',
    contact: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', form);
    
    // Supabase Insert
    try {
      const { error } = await supabase
        .from('consultations')
        .insert([
          { 
            hospital_name: form.hospitalName, 
            manager_name: form.managerName, 
            contact: form.contact 
          },
        ]);

      if (error) throw error;

      // Send Slack Notification
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          hospitalName: form.hospitalName, 
          managerName: form.managerName, 
          contact: form.contact 
        }),
      });

      setSubmitted(true);
    } catch (error) {
       console.error('Error inserting data:', error);
       alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">상담 신청 완료</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            문의해주셔서 감사합니다.<br/>
            담당자가 확인 후 <strong>{form.contact}</strong>으로<br/> 
            빠른 시일 내에 연락드리겠습니다.
          </p>
          <Link 
            href="/"
            className="block text-center bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors w-full"
          >
            메인으로 돌아가기
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50">
      <div className="max-w-xl mx-auto">
        <Link 
          href="/"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> 뒤로가기
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-3">
              입점 상담 신청
            </h1>
            <p className="text-slate-600">
              K-Beauty Pass와 함께 글로벌 성장을 시작하세요.<br/>
              간단한 정보를 남겨주시면 담당자가 안내해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="hospitalName" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Building className="w-4 h-4 text-brand-blue" />
                병원명
              </label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                required
                value={form.hospitalName}
                onChange={handleChange}
                placeholder="예: 케이뷰티 성형외과"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="managerName" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <User className="w-4 h-4 text-brand-blue" />
                담당자명
              </label>
              <input
                type="text"
                id="managerName"
                name="managerName"
                required
                value={form.managerName}
                onChange={handleChange}
                placeholder="성함을 입력해주세요"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Phone className="w-4 h-4 text-brand-blue" />
                연락처
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                value={form.contact}
                onChange={handleChange}
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 mt-8 group"
            >
              상담 신청하기
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationForm;
