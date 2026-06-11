'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
        {/* SECTION:HERO */}
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 py-3 px-6"
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
