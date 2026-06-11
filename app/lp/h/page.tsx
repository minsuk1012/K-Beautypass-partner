'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import BrowserFrame from '../../components/BrowserFrame';

/* ─────────── 언어 탭 전환 홈페이지 목업 ─────────── */
const SITE_LANGS = [
  { tag: '한국어', chipClass: 'bg-slate-900 text-white', name: '강남 OO피부과', tagline: '피부 고민, 정확한 진단으로 시작하세요', nav: ['병원 소개', '시술 안내', '의료진', '오시는 길'], chips: ['레이저 토닝', '보톡스', '필러'], cta: '상담 예약' },
  { tag: 'English', chipClass: 'bg-blue-500 text-white', name: 'Gangnam OO Skin Clinic', tagline: 'Healthy skin starts with an accurate diagnosis', nav: ['About', 'Treatments', 'Doctors', 'Location'], chips: ['Laser Toning', 'Botox', 'Filler'], cta: 'Book Now' },
  { tag: '中文', chipClass: 'bg-amber-500 text-white', name: '江南OO皮肤科', tagline: '肌肤问题，从精准诊断开始', nav: ['医院介绍', '项目介绍', '医生团队', '交通指南'], chips: ['激光美白', '肉毒素', '玻尿酸'], cta: '预约咨询' },
  { tag: '日本語', chipClass: 'bg-pink-500 text-white', name: '江南OOスキンクリニック', tagline: '肌の悩みは正確な診断から', nav: ['医院紹介', '施術案内', '医療陣', 'アクセス'], chips: ['レーザー', 'ボトックス', 'ヒアルロン酸'], cta: '相談予約' },
];

function HospitalSiteMock() {
  const [langIdx, setLangIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLangIdx(i => (i + 1) % SITE_LANGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const lang = SITE_LANGS[langIdx];

  return (
    <BrowserFrame url="gangnam-oo-clinic.com" className="w-full max-w-2xl">
      {/* 언어 탭 */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
        {SITE_LANGS.map((l, i) => (
          <button key={l.tag} onClick={() => setLangIdx(i)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${i === langIdx ? l.chipClass : 'bg-white text-slate-400 border border-slate-200'}`}>
            {l.tag}
          </button>
        ))}
      </div>
      {/* 사이트 본문 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={langIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="p-5 sm:p-6 bg-white"
        >
          <div className="flex items-center justify-between mb-5">
            <p className="font-black text-slate-900 text-sm sm:text-base">{lang.name}</p>
            <div className="hidden sm:flex items-center gap-3">
              {lang.nav.map(item => (
                <span key={item} className="text-[11px] text-slate-400 font-medium">{item}</span>
              ))}
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-black text-slate-900 leading-snug mb-4">{lang.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {lang.chips.map(chip => (
              <span key={chip} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-xs font-medium">{chip}</span>
            ))}
          </div>
          <span className="inline-block px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-lg">{lang.cta}</span>
        </motion.div>
      </AnimatePresence>
    </BrowserFrame>
  );
}

/* ─────────── Main Page ─────────── */
export default function VariantHPage() {
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
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 h-14">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900">
            KBEAUTYPASS
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">파트너</span>
          </Link>
          <button onClick={scrollToForm}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-full transition-colors">
            0원으로 시작하기
          </button>
        </div>
      </header>

      <main className="pt-14">
        {/* ═══════════ HERO — 오퍼 선공 ═══════════ */}
        <section className="relative bg-slate-50 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-8"
            >
              🏥 KBP 입점 병원 혜택
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight mb-6"
            >
              병원 홈페이지,<br />
              다국어까지 <span className="text-emerald-600">0원</span>에 만들어 드립니다.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 mb-10 max-w-xl leading-relaxed"
            >
              한국어 + 영·중·일 홈페이지 제작이 KBP 입점 병원에게는 무료입니다.<br className="hidden sm:block" />
              예약이 성사될 때만 수수료를 받는 구조라 가능합니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-14"
            >
              <button onClick={scrollToForm}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                0원으로 홈페이지 시작하기 <ArrowRight size={20} />
              </button>
              <button onClick={() => document.getElementById('why-free')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-8 py-4 rounded-lg font-bold text-lg border border-slate-300 hover:border-slate-400 bg-white transition-colors">
                어떻게 가능한가요? <ArrowDown size={20} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full flex justify-center"
            >
              <HospitalSiteMock />
            </motion.div>
          </div>
        </section>
        {/* SECTION:GOOGLE_GAP */}
        {/* SECTION:MARKET */}
        {/* SECTION:BENEFITS */}
        {/* SECTION:WHY_FREE */}
        {/* SECTION:PROCESS */}
        {/* SECTION:FAQ */}
        {/* SECTION:CTA_FORM */}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-slate-500 text-sm space-y-2 mb-6">
            <p>서울특별시 강남구 역삼로 114, 8층 8071호</p>
            <p>입점 문의: kbeautypass@gmail.com · 대표자: 하용헌</p>
          </div>
          <p className="text-slate-600 text-xs">&copy; 2025 K-BeautyPass Inc. All rights reserved.</p>
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
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 py-3 px-6"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900">다국어 홈페이지 <span className="text-emerald-600">0원</span> 제작</p>
                <p className="text-xs text-slate-400">입점비 0원 · 예약 성사 시에만 수수료</p>
              </div>
              <button onClick={scrollToForm}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shrink-0 ml-auto">
                0원으로 시작하기 <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
