'use client';

import { useEffect, useRef, useState, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MessageCircle, ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const TOTAL_SLIDES = 13;

export default function PartnerPage() {
  const [current, setCurrent] = useState(1);
  const [scale, setScale] = useState(1);
  const [showInquiry, setShowInquiry] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    const form = e.currentTarget;
    const data = {
      hospitalName: (form.elements.namedItem('hospital') as HTMLInputElement).value,
      managerName: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value || undefined,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value || undefined,
    };
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const prev = useCallback(() => setCurrent((s) => Math.max(1, s - 1)), []);
  const next = useCallback(() => {
    if (current === TOTAL_SLIDES) {
      setShowInquiry(true);
    } else {
      setCurrent((s) => Math.min(TOTAL_SLIDES, s + 1));
    }
  }, [current]);

  // Scale calculation
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = window.innerHeight - 56 - 72; // header + controls
        const scaleW = w / 1280;
        const scaleH = h / 720;
        setScale(Math.min(scaleW, scaleH));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showInquiry) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, showInquiry]);

  return (
    <div className="h-screen flex flex-col font-sans bg-gray-950 text-gray-900 overflow-hidden selection:bg-brand-blue/30">

      {/* Header */}
      <header className="h-14 flex-shrink-0 bg-white/5 backdrop-blur-md border-b border-white/10 z-50">
        <div className="h-full px-4 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="K-BeautyPass" className="w-6 h-6" />
            <span className="text-lg font-black tracking-tight text-white hidden sm:inline">KBEAUTYPASS</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="/proposal.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              PDF
            </a>
            <button
              onClick={() => setShowInquiry(true)}
              className="px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-full hover:bg-brand-blue/90 transition-colors"
            >
              입점 문의하기
            </button>
          </div>
        </div>
      </header>

      {/* Slide Area */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div
              style={{
                width: 1280,
                height: 720,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
            >
              <iframe
                src={`/slides/slide-${current}.html`}
                className="w-[1280px] h-[720px] border-0 rounded-lg shadow-2xl"
                scrolling="no"
                title={`Slide ${current}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side Arrows */}
        <button
          onClick={prev}
          disabled={current === 1}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white hover:scale-105 disabled:opacity-0 transition-all cursor-pointer border border-gray-200"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white hover:scale-105 transition-all cursor-pointer border border-gray-200"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="h-[72px] flex-shrink-0 flex items-center justify-center gap-4 bg-gray-950">
        {/* Dot Navigation */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrent(n)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                n === current ? 'bg-brand-blue w-6' : 'bg-white/20 w-2 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <span className="text-white/40 text-sm ml-2">
          {current} / {TOTAL_SLIDES}
        </span>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowInquiry(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black">입점 문의</h2>
                </div>

                {formState === 'success' ? (
                  <div className="text-center py-8">
                    <p className="text-xl font-bold mb-2">문의가 접수되었습니다!</p>
                    <p className="text-gray-500 text-sm">영업일 기준 1~2일 내에 연락드리겠습니다.</p>
                    <button
                      onClick={() => { setShowInquiry(false); setFormState('idle'); }}
                      className="mt-6 px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">병원명 *</label>
                        <input
                          type="text"
                          name="hospital"
                          required
                          placeholder="예: OO피부과의원"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">담당자명 *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="홍길동"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1.5">연락처 *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="010-0000-0000"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">이메일</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="hospital@example.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">문의 내용</label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="궁금한 점이 있으시면 남겨주세요."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors resize-none"
                        />
                      </div>
                      {formState === 'error' && (
                        <p className="text-red-500 text-sm">전송에 실패했습니다. 다시 시도해주세요.</p>
                      )}
                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="w-full py-3.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {formState === 'loading' ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> 전송 중...</>
                        ) : (
                          <>입점 문의하기 <ArrowRight className="w-5 h-5" /></>
                        )}
                      </button>
                    </form>

                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
