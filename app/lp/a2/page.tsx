'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Send, Check, Loader2 } from 'lucide-react';
import PhoneFrame from '../../components/PhoneFrame';
import PreConsultationMock from '../../components/mocks/user/PreConsultationMock';
import { trackInquirySubmit } from '../../lib/analytics';

/* ─────────── Inline Inquiry Form ─────────── */
function CompactInquiryForm() {
  const [form, setForm] = useState({ hospitalName: '', managerName: '', phone: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        trackInquirySubmit(form.hospitalName);
        setState('success');
        setForm({ hospitalName: '', managerName: '', phone: '', email: '', message: '' });
      } else {
        setState('error');
      }
    } catch { setState('error'); }
  };

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-orange-600" />
        </div>
        <p className="text-xl font-bold text-stone-900 mb-2">문의가 접수되었습니다</p>
        <p className="text-stone-500 mb-6">담당자가 빠르게 연락드리겠습니다.</p>
        <button onClick={() => setState('idle')} className="text-orange-600 font-medium hover:underline">
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input type="text" required placeholder="병원/클리닉명 *" value={form.hospitalName}
          onChange={e => setForm(f => ({ ...f, hospitalName: e.target.value }))}
          className="px-4 py-3 bg-stone-100 border-0 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
        <input type="text" required placeholder="담당자명 *" value={form.managerName}
          onChange={e => setForm(f => ({ ...f, managerName: e.target.value }))}
          className="px-4 py-3 bg-stone-100 border-0 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="tel" required placeholder="연락처 * (010-0000-0000)" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="px-4 py-3 bg-stone-100 border-0 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
        <input type="email" placeholder="이메일" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="px-4 py-3 bg-stone-100 border-0 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
      </div>
      <textarea rows={2} placeholder="문의사항 (선택)" value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        className="w-full px-4 py-3 bg-stone-100 border-0 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 resize-none" />
      {state === 'error' && <p className="text-red-600 text-sm">전송에 실패했습니다. 다시 시도해주세요.</p>}
      <button type="submit" disabled={state === 'loading'}
        className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-stone-400 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
        {state === 'loading'
          ? <><Loader2 className="w-5 h-5 animate-spin" /> 전송 중...</>
          : <><Send className="w-4 h-4" /> 입점 문의하기</>}
      </button>
    </form>
  );
}

/* ─────────── FAQ Accordion ─────────── */
const faqs = [
  {
    q: "AI 번역 품질이 통역 코디만큼 정확한가요?",
    a: "의료 전문 용어에 최적화된 AI 번역 엔진을 사용합니다. 시술명, 약품명, 주의사항 등 의료 특화 용어 데이터베이스를 기반으로 정확도 높은 번역을 제공합니다."
  },
  {
    q: "지원 언어는 몇 개인가요?",
    a: "중국어(간체/번체), 일본어, 영어, 태국어, 베트남어, 인도네시아어, 러시아어, 몽골어, 아랍어, 스페인어, 프랑스어, 독일어 등 12개 주요 언어를 지원합니다."
  },
  {
    q: "다국어 콘텐츠 제작 비용은?",
    a: "입점 혜택으로 무료 제공됩니다. 병원 정보를 기반으로 전문 번역 + AI 최적화를 통해 다국어 SEO 콘텐츠를 제작합니다."
  },
  {
    q: "정말 입점비가 0원인가요?",
    a: "네, 입점비·가입비·연회비 모두 무료입니다. 실제 시술 매출이 발생할 때만 수수료가 부과됩니다."
  }
];

function FAQItem({ item, isOpen, toggle }: { item: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button onClick={toggle} className="w-full text-left py-5 flex items-start justify-between gap-4">
        <span className="text-lg font-semibold text-stone-900">{item.q}</span>
        <span className={`text-stone-400 text-2xl leading-none shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="pb-5 text-stone-500 leading-relaxed max-w-xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── Cost Item Row ─────────── */
function CostRow({ label, old, replacement }: { label: string; old: string; replacement: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-stone-200/60">
      <span className="text-stone-600 text-sm sm:text-base">{label}</span>
      <div className="flex items-baseline gap-4">
        <span className="text-red-500 line-through text-sm">{old}</span>
        <span className="font-bold text-stone-900">{replacement}</span>
      </div>
    </div>
  );
}

/* ─────────── Main Page ─────────── */
export default function VariantA2Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-stone-900 selection:bg-orange-200 selection:text-orange-900">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200/50 h-14">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-stone-800">
            KBEAUTYPASS
          </Link>
          <button onClick={scrollToForm}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-full transition-colors">
            무료 입점 문의
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          HERO — 문장 속에 숫자를 녹인 내러티브형
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-stone-900 overflow-hidden pt-14">
        <div className="max-w-5xl mx-auto px-6 relative z-10 py-28 md:py-36 lg:py-44">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-stone-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            입점비 0원 · AI 자동 번역
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-8 max-w-3xl"
          >
            연간 <span className="text-orange-400">3,960만원</span>의<br />
            통역 비용,<br />
            <span className="text-stone-400">0원으로 바꿀 수 있습니다.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-stone-400 mb-10 max-w-lg leading-relaxed"
          >
            12개국어 자동 번역과 다국어 SEO 콘텐츠 제작까지.<br />
            K-BeautyPass가 무료로 제공합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={scrollToForm}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              무료로 시작하기 <ArrowRight size={20} />
            </button>
            <button onClick={() => document.getElementById('breakdown')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-stone-400 hover:text-white px-8 py-4 rounded-lg font-bold text-lg border border-stone-700 hover:border-stone-500 transition-colors">
              비용 비교 <ArrowDown size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          COST BREAKDOWN — 라벨 없이 질문형 헤딩으로 시작
          ═══════════════════════════════════════════════ */}
      <section id="breakdown" className="bg-[#faf8f5] scroll-mt-14">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-4">
            통역 코디에 들어가는<br />실제 비용을 따져보면.
          </h2>
          <p className="text-stone-500 mb-12 max-w-lg">
            월 330만원의 인건비는 시작일 뿐입니다. 4대보험, 교육, 관리 비용까지 포함하면 연간 4천만원에 가깝습니다.
          </p>

          <div className="mb-12">
            <CostRow label="월 인건비" old="300만원" replacement="0원" />
            <CostRow label="4대보험 부담" old="30만원" replacement="0원" />
            <CostRow label="교육·관리 비용" old="별도 발생" replacement="불필요" />
            <CostRow label="대응 언어" old="1~2개국어" replacement="12개국어" />
            <CostRow label="운영 시간" old="09~18시" replacement="24시간" />
            <CostRow label="다국어 콘텐츠 제작" old="외주 별도" replacement="무료 포함" />
          </div>

          <div className="bg-stone-900 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-stone-400 text-sm mb-1">K-BeautyPass 입점 시</p>
              <p className="text-white text-xl font-bold">연간 절감 효과</p>
            </div>
            <p className="text-orange-400 text-4xl sm:text-5xl font-black tracking-tight">3,960만원+</p>
          </div>
          <p className="text-stone-400 text-xs mt-4">
            * 통역 코디네이터 월 330만원 기준 (4대보험 포함). 매출 발생 시에만 수수료가 부과됩니다.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES — 3개 블록, 각각 다른 레이아웃
          (데모 섹션 통합, 동일 그리드 반복 제거)
          ═══════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-20 max-w-md">
            통역 코디 없이,<br />이 모든 것이 됩니다.
          </h2>

          <div className="space-y-28 md:space-y-36">

            {/* ── Block 01: 센터 스택형 + PhoneFrame (데모 통합) ── */}
            <div>
              <div className="max-w-xl mb-10">
                <span className="text-orange-500 text-sm font-bold">01</span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3">12개국어 자동 번역 문진</h3>
                <p className="text-stone-500 leading-relaxed">
                  환자가 자국어로 문진표를 작성하면 병원에서는 한국어로 즉시 확인합니다.
                  통역 코디를 기다릴 필요 없이, 사전 의료 정보를 완벽하게 파악할 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['중국어', '일본어', '영어', '태국어', '베트남어', '+7개'].map(lang => (
                    <span key={lang} className="px-3 py-1 bg-stone-100 text-stone-500 rounded-md text-xs font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <PhoneFrame>
                  <PreConsultationMock />
                </PhoneFrame>
              </div>
            </div>

            {/* ── Block 02: 역방향 그리드 (시각 좌 / 텍스트 우) ── */}
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-16 items-start">
              <div className="bg-stone-50 rounded-xl p-6 sm:p-8 border border-stone-100 order-2 md:order-1">
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                      <p className="text-orange-700 text-xs font-bold mb-1">환자 (中文)</p>
                      <p className="text-stone-600">보톡스 시술 후 주의사항이 궁금합니다</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white border border-stone-200 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[80%]">
                      <p className="text-stone-400 text-xs font-bold mb-1">병원 (한국어)</p>
                      <p className="text-stone-600">시술 후 4시간 동안 눕지 마시고, 시술 부위를 문지르지 마세요.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
                      <p className="text-orange-700 text-xs font-bold mb-1">환자 (中文)</p>
                      <p className="text-stone-600">감사합니다. 다음 예약도 가능한가요?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-orange-500 text-sm font-bold">02</span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3">실시간 상담 자동 통번역</h3>
                <p className="text-stone-500 leading-relaxed">
                  예약 전 상담부터 시술 후 케어까지 AI가 실시간으로 통번역합니다.
                  별도의 통역 인력 없이 원활한 커뮤니케이션이 가능합니다.
                </p>
              </div>
            </div>

            {/* ── Block 03: 텍스트 + 가로 카드 나열 ── */}
            <div>
              <div className="max-w-xl mb-8">
                <span className="text-orange-500 text-sm font-bold">03</span>
                <h3 className="text-2xl font-bold text-stone-900 mt-2 mb-3">다국어 SEO 콘텐츠 무료 제작</h3>
                <p className="text-stone-500 leading-relaxed">
                  병원 소개, 시술 정보, 의료진 프로필을 중국어·일본어·영어로 제작합니다.
                  구글 검색에 최적화하여 외국인 환자가 직접 우리 병원을 찾게 됩니다. 제작 비용 0원.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { flag: '🇨🇳', label: '中文', title: '江南OO皮肤科', desc: '激光美白·肉毒素·玻尿酸', color: 'bg-amber-50 border-amber-100' },
                  { flag: '🇯🇵', label: '日本語', title: 'カンナムOO皮膚科', desc: 'レーザー美白·ボトックス', color: 'bg-pink-50 border-pink-100' },
                  { flag: '🇺🇸', label: 'English', title: 'Gangnam OO Dermatology', desc: 'Laser · Botox · Filler', color: 'bg-blue-50 border-blue-100' },
                ].map(item => (
                  <div key={item.label} className={`${item.color} border rounded-xl p-5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{item.flag}</span>
                      <span className="text-xs font-bold text-stone-400">{item.label}</span>
                      <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">SEO</span>
                    </div>
                    <p className="font-bold text-stone-800 text-sm mb-1">{item.title}</p>
                    <p className="text-stone-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROCESS STEPS — 다크 배경, 수평 스텝 (프로세스 신뢰)
          ═══════════════════════════════════════════════ */}
      <section className="bg-stone-900">
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          <p className="text-stone-500 text-sm font-medium mb-3">입점 과정</p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-16">
            입점부터 환자 유입까지,<br />이렇게 진행됩니다.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-stone-800 rounded-2xl overflow-hidden">
            {[
              {
                step: '01',
                title: '간편 입점 신청',
                desc: '병원 정보를 입력하면 끝. 1분이면 완료됩니다.',
                detail: '입점비 · 가입비 · 연회비 0원',
              },
              {
                step: '02',
                title: '다국어 콘텐츠 제작',
                desc: '병원 정보 기반으로 중·일·영 SEO 콘텐츠를 제작합니다.',
                detail: '제작 기간 약 1~2주',
              },
              {
                step: '03',
                title: '글로벌 환자 유입 시작',
                desc: '검색 노출 + 플랫폼 노출로 외국인 환자가 유입됩니다.',
                detail: 'AI 자동 번역으로 즉시 소통',
              },
            ].map((item, i) => (
              <div key={item.step} className="bg-stone-900 p-8 md:p-10 relative">
                {/* 스텝 간 화살표 (모바일 제외) */}
                {i < 2 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-stone-800 border-2 border-stone-700 items-center justify-center">
                    <ArrowRight size={14} className="text-stone-500" />
                  </div>
                )}
                <span className="text-orange-400 text-sm font-bold">{item.step}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block text-xs font-medium text-stone-500 bg-stone-800 px-3 py-1.5 rounded-md">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-stone-500 text-sm mt-10">
            전 과정에서 별도 비용이 발생하지 않습니다. 매출이 발생할 때만 수수료가 부과됩니다.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ — 라벨 없이 깔끔하게
          ═══════════════════════════════════════════════ */}
      <section className="bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-12">
            자주 묻는 질문
          </h2>
          <div>
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} isOpen={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA + FORM
          ═══════════════════════════════════════════════ */}
      <section ref={formRef} className="bg-white scroll-mt-14 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-6">
                통역 비용 걱정 없이,<br />지금 시작하세요.
              </h2>
              <p className="text-stone-500 leading-relaxed mb-8">
                입점비 0원. AI 자동 번역과 다국어 콘텐츠 제작까지 무료.<br />
                매출이 발생할 때만 수수료가 부과됩니다.
              </p>
              <div className="space-y-3">
                {['입점비·가입비·연회비 0원', '12개국어 AI 자동 번역', '다국어 SEO 콘텐츠 무료 제작', '성과 기반 수수료 모델'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-stone-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-stone-900">간편 입점 문의</h3>
                <p className="text-xs text-stone-400 mt-1">정보를 남겨주시면 담당자가 연락드립니다.</p>
              </div>
              <CompactInquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-stone-500 text-sm space-y-2 mb-6">
            <p>서울특별시 강남구 역삼로 114, 8층 8071호</p>
            <p>입점 문의: kbeautypass@gmail.com · 대표자: 하용헌</p>
          </div>
          <p className="text-stone-600 text-xs">&copy; 2025 K-BeautyPass Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* ── Sticky Bottom CTA Bar ── */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-stone-200 py-3 px-6"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-stone-900">연간 <span className="text-orange-500">3,960만원</span> 절감</p>
                <p className="text-xs text-stone-400">입점비 0원 · AI 자동 번역 · 다국어 콘텐츠 무료</p>
              </div>
              <button onClick={scrollToForm}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shrink-0 ml-auto">
                무료 입점 문의 <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
