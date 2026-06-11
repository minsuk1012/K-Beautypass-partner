'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, MessageSquare, Globe, ArrowRight, ArrowDown, CheckCircle2 } from 'lucide-react';
import PhoneFrame from '../../components/PhoneFrame';
import PreConsultationMock from '../../components/mocks/user/PreConsultationMock';
import FAQ from '../../components/FAQ';
import InquiryForm from '../../components/InquiryForm';

const customFaqs = [
  {
    question: "AI 번역 품질이 통역 코디만큼 정확한가요?",
    answer: "의료 전문 용어에 최적화된 AI 번역 엔진을 사용합니다. 시술명, 약품명, 주의사항 등 의료 특화 용어 데이터베이스를 기반으로 정확도 높은 번역을 제공하며, 지속적으로 개선하고 있습니다."
  },
  {
    question: "어떤 언어를 지원하나요?",
    answer: "중국어(간체/번체), 일본어, 영어, 태국어, 베트남어, 인도네시아어, 러시아어, 몽골어, 아랍어, 스페인어, 프랑스어, 독일어 등 12개 주요 언어를 지원합니다."
  },
  {
    question: "다국어 콘텐츠는 어떻게 제작되나요?",
    answer: "입점 시 병원 정보(시술 목록, 의료진 소개, 위치 등)를 기반으로 전문 번역 + AI 최적화를 통해 다국어 콘텐츠를 제작합니다. 별도 비용 없이 입점 혜택으로 제공됩니다."
  },
  {
    question: "입점 비용이 정말 무료인가요?",
    answer: "네, 입점비·가입비·연회비 모두 무료입니다. 실제 시술 매출이 발생할 때만 수수료가 부과되는 성과 기반 모델이므로 리스크 없이 시작할 수 있습니다."
  }
];

export default function VariantAPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToComparison = () => {
    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Header (Fixed) */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center">
        <div className="container mx-auto px-6 h-full flex items-center justify-between max-w-6xl">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-slate-800">
            KBEAUTYPASS <span className="font-medium text-slate-500">파트너</span>
          </Link>
          <button 
            onClick={scrollToForm}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-bold text-sm transition-colors"
          >
            무료로 시작하기 <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* 2. Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="container mx-auto px-6 relative z-10 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Hero Copy */}
              <div className="text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-bold mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  입점비 0원
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15] mb-6">
                  월 300만원 통역 코디, <br className="hidden md:block" />
                  <span className="text-emerald-500">더 이상 필요 없습니다.</span>
                </h1>
                
                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                  AI 자동 번역으로 12개국어 문진·상담을 처리하고, <br/>
                  병원 전용 다국어 SEO 콘텐츠까지 무료로 제작해 드립니다.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={scrollToForm}
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                  >
                    무료로 시작하기 <ArrowRight size={20} />
                  </button>
                  <button 
                    onClick={scrollToComparison}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 transition-all active:scale-95"
                  >
                    비용 비교 보기 <ArrowDown size={20} />
                  </button>
                </div>
              </div>

              {/* Hero Visual - Cost Comparison Cards */}
              <div id="comparison" className="relative grid sm:grid-cols-2 gap-4 lg:gap-6 mt-10 lg:mt-0">
                {/* Traditional Method Card */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm relative pt-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-red-200 text-red-600 font-bold px-4 py-1.5 rounded-full text-sm shadow-sm whitespace-nowrap">
                    기존 방식
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">통역 코디네이터 고용</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">월 인건비</span>
                      <span className="font-semibold text-slate-400 line-through decoration-red-500">300만원</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">4대보험 등</span>
                      <span className="font-semibold text-slate-400 line-through decoration-red-500">30만원</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">교육/관리</span>
                      <span className="font-semibold text-slate-400 line-through decoration-red-500">별도 발생</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-red-100/50">
                      <span className="text-slate-600">대응 언어</span>
                      <span className="font-medium text-slate-700">1~2개국어</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">근무 시간</span>
                      <span className="font-medium text-slate-700">09~18시</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-red-200 flex justify-between items-center">
                    <span className="font-bold text-slate-800">월 합계</span>
                    <span className="text-xl font-black text-red-500">약 330만원+</span>
                  </div>
                </div>

                {/* K-BeautyPass Card */}
                <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 shadow-xl shadow-emerald-500/10 relative pt-10 sm:-translate-y-4 z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-md shadow-emerald-500/30 whitespace-nowrap">
                    K-BeautyPass
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">AI 자동 번역 시스템</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">월 비용</span>
                      <span className="font-bold text-emerald-600">0원</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">추가 비용</span>
                      <span className="font-bold text-emerald-600">없음</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">교육/관리</span>
                      <span className="font-bold text-emerald-600">불필요</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-50">
                      <span className="text-slate-600">대응 언어</span>
                      <span className="font-bold text-emerald-600">12개국어</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">운영 시간</span>
                      <span className="font-bold text-emerald-600">24시간</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-emerald-100 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 mb-1">월 합계</span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-flex items-center gap-1 w-fit">
                        <CheckCircle2 size={12} /> 입점비 무료
                      </span>
                    </div>
                    <span className="text-2xl font-black text-emerald-500">0원</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Features — 각 블록 다른 레이아웃 (데모 통합) */}
        <section className="py-24 bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-20">
              통역 코디 없이,<br className="hidden md:block" /> 이 모든 것이 가능합니다.
            </h2>

            <div className="space-y-24">
              {/* Block 01: 번역 문진 + PhoneFrame (데모 통합) */}
              <div className="grid md:grid-cols-[1fr,auto] gap-12 md:gap-16 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Languages size={20} className="text-emerald-500" />
                    <span className="text-emerald-600 text-sm font-bold">자동 번역 문진</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">환자가 도착하기 전,<br />모든 준비는 끝납니다.</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 max-w-md">
                    환자가 자국어로 문진표를 작성하면 병원에서는 한국어로 즉시 확인합니다. 통역 코디를 기다릴 필요 없이 사전 의료 정보를 완벽하게 파악할 수 있습니다.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['중국어', '일본어', '영어', '태국어', '베트남어', '+7개'].map(lang => (
                      <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-xs font-medium">{lang}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <PhoneFrame>
                    <PreConsultationMock />
                  </PhoneFrame>
                </div>
              </div>

              {/* Block 02: 상담 통번역 — 역방향 (시각 좌, 텍스트 우) */}
              <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-16 items-center">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 order-2 md:order-1">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                        <p className="text-emerald-700 text-xs font-bold mb-1">환자 (中文)</p>
                        <p className="text-slate-600">보톡스 시술 후 주의사항이 궁금합니다</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[80%]">
                        <p className="text-slate-400 text-xs font-bold mb-1">병원 (한국어)</p>
                        <p className="text-slate-600">시술 후 4시간 동안 눕지 마시고, 시술 부위를 문지르지 마세요.</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                        <p className="text-emerald-700 text-xs font-bold mb-1">환자 (中文)</p>
                        <p className="text-slate-600">감사합니다. 다음 예약도 가능한가요?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare size={20} className="text-emerald-500" />
                    <span className="text-emerald-600 text-sm font-bold">실시간 통번역</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">상담도 AI가<br />자동으로 통번역</h3>
                  <p className="text-slate-600 leading-relaxed max-w-md">
                    예약 전 상담부터 시술 후 케어까지 AI가 실시간으로 통번역합니다. 별도의 통역 인력 없이 원활한 커뮤니케이션이 가능합니다.
                  </p>
                </div>
              </div>

              {/* Block 03: SEO 콘텐츠 — 가로 카드 나열 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={20} className="text-emerald-500" />
                  <span className="text-emerald-600 text-sm font-bold">다국어 SEO</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">구글에서 외국인이<br />우리 병원을 찾습니다</h3>
                <p className="text-slate-600 leading-relaxed mb-8 max-w-lg">
                  병원 소개, 시술 정보, 의료진 프로필을 중국어·일본어·영어로 제작합니다. 구글 검색에 최적화하여 외국인 환자 유입을 늘립니다. 제작 비용 0원.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { flag: '🇨🇳', label: '中文', title: '江南OO皮肤科', desc: '激光美白·肉毒素·玻尿酸', bg: 'bg-amber-50 border-amber-100' },
                    { flag: '🇯🇵', label: '日本語', title: 'カンナムOO皮膚科', desc: 'レーザー美白·ボトックス', bg: 'bg-pink-50 border-pink-100' },
                    { flag: '🇺🇸', label: 'English', title: 'Gangnam OO Dermatology', desc: 'Laser · Botox · Filler', bg: 'bg-blue-50 border-blue-100' },
                  ].map(item => (
                    <div key={item.label} className={`${item.bg} border rounded-xl p-5`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{item.flag}</span>
                        <span className="text-xs font-bold text-slate-400">{item.label}</span>
                      </div>
                      <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "연간 절감 효과" 섹션 */}
        <section className="py-24 bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-16">
              연간으로 환산하면, 이 정도입니다.
            </h2>

            <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex flex-col gap-6 font-bold text-lg md:text-xl text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-700 pb-6">
                  <span>통역 코디 연간 인건비</span>
                  <span className="text-white">약 3,960만원</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-6">
                  <span>K-BeautyPass 연간 비용</span>
                  <span className="text-emerald-400">0원</span>
                </div>
                <div className="flex justify-between items-center pt-6">
                  <span className="text-white text-2xl md:text-3xl">연간 절감 효과</span>
                  <span className="text-emerald-400 text-3xl md:text-5xl font-black">3,960만원+</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-left text-sm text-slate-500 space-y-2 flex flex-col items-center">
              <p>* 통역 코디네이터 월 330만원 기준 (4대보험 포함)</p>
              <p>* K-BeautyPass는 매출 발생 시에만 수수료가 부과되는 성과 기반 모델입니다.</p>
            </div>
          </div>
        </section>

        {/* 6. FAQ 섹션 */}
        <FAQ customTitle="자주 묻는 질문" customItems={customFaqs} />

        {/* 7. CTA 섹션 */}
        <section className="py-24 bg-slate-800 border-t border-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700 via-slate-800 to-slate-900"></div>
          
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-left text-white">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                  통역 비용 걱정 없이, <br/>
                  <span className="text-emerald-400">지금 바로 시작하세요.</span>
                </h2>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-md">
                  입점비 0원. AI 자동 번역과 다국어 콘텐츠 제작까지 무료. <br/>
                  매출이 발생할 때만 수수료가 부과됩니다.
                </p>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} /> 병원 정보만 입력하면 끝!
                  </p>
                  <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={16} /> 담당자가 빠르게 연락드립니다.
                  </p>
                </div>
              </div>

              <div>
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400 text-sm">
        <div className="container mx-auto px-6 max-w-6xl text-center space-y-2">
          <p>서울특별시 강남구 역삼로 114, 8층 8071호</p>
          <p>입점 문의: kbeautypass@gmail.com · 대표자: 하용헌</p>
          <p className="mt-4 pt-4 border-t border-slate-800 inline-block text-slate-500">&copy; 2025 K-BeautyPass Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Bottom CTA Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 py-3 px-6"
          >
            <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800">연간 <span className="text-emerald-500">3,960만원</span> 절감</p>
                <p className="text-xs text-slate-500">입점비 0원 · AI 자동 번역 · 다국어 콘텐츠 무료</p>
              </div>
              <button onClick={scrollToForm}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shrink-0 ml-auto">
                무료로 시작하기 <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
