'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const faqs = [
  {
    question: "정산은 언제 이루어지나요?",
    answer: "매월 1일부터 말일까지의 시술 완료 건에 대해 익월 10일에 정산 리포트가 발행되며, 15일에 병원 계좌로 자동 입금됩니다. 마이페이지에서 실시간 매출 현황을 언제든지 확인할 수 있습니다."
  },
  {
    question: "외국어 응대는 어떻게 하나요?",
    answer: "K-BeautyPass의 '스마트 문진' 시스템이 12개국어 자동 번역을 지원합니다. 환자가 자국어로 문진표를 작성하면 병원에서는 한국어로 즉시 확인할 수 있어, 전담 통역 코디네이터 없이도 원활한 진료가 가능합니다."
  },
  {
    question: "마케팅 비용은 별도로 발생하나요?",
    answer: "기본적인 플랫폼 입점과 숏폼 영상 업로드는 무료입니다. 다만, 상단 노출이나 특별 기획전 참여 등 프리미엄 마케팅 상품 이용 시 별도의 비용이 발생할 수 있습니다."
  },
  {
    question: "기존 병원 차트와 연동되나요?",
    answer: "네, 주요 EMR(전자의무기록) 시스템과의 연동을 지원합니다. 예약 확정 시 병원 차트에 환자 정보가 자동으로 등록되어 접수 업무를 최소화할 수 있습니다."
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  customTitle?: string;
  customItems?: FAQItem[];
}

export default function FAQ({ customTitle, customItems }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = customItems || faqs;

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-wider text-sm uppercase mb-2 block">{customTitle || "자주 묻는 질문"}</span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">{customTitle || "자주 묻는 질문"}</h2>
          <p className="text-gray-500 text-lg">궁금한 점을 확인하세요.</p>
        </div>

        <div className="space-y-4">
          {items.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(active => active === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-gray-900 text-lg focus:outline-none"
              >
                {faq.question}
                <ChevronDown 
                  className={clsx(
                    "w-5 h-5 text-gray-400 transition-transform duration-300",
                    openIndex === idx && "rotate-180 text-brand-blue"
                  )} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
