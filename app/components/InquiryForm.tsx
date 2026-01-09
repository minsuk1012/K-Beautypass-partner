'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';

interface FormData {
  hospitalName: string;
  managerName: string;
  phone: string;
  email: string;
  message: string;
}

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    hospitalName: '',
    managerName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '전송에 실패했습니다.');
      }

      setIsSuccess(true);
      setFormData({
        hospitalName: '',
        managerName: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          문의가 접수되었습니다
        </h3>
        <p className="text-gray-500 mb-6">
          담당자가 빠른 시일 내에 연락드리겠습니다.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-brand-blue font-medium hover:underline"
        >
          추가 문의하기
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-2xl relative"
    >
      <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-6 text-sm">
        1분 완성
      </div>

      <div className="pb-4 border-b border-gray-100 mb-6">
        <h3 className="text-lg font-bold text-gray-900">간편 입점 문의</h3>
        <p className="text-xs text-gray-400">
          정보를 남겨주시면 담당자가 연락드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              병원/클리닉명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              placeholder="예: 강남 아름다운 의원"
              className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              담당자명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              required
              placeholder="홍길동"
              className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="010-1234-5678"
              className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            문의사항
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="궁금하신 점이 있으시면 남겨주세요."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors resize-none"
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              문의하기
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
