'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star, Globe, Store, Megaphone, Users } from 'lucide-react';
import BrowserFrame from '../../components/BrowserFrame';

/* ─────────── 가격 앵커 행 ─────────── */
function PriceRow({ label, old, replacement }: { label: string; old: string; replacement: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-slate-200/60 last:border-0">
      <span className="text-slate-600 text-sm sm:text-base">{label}</span>
      <div className="flex items-baseline gap-4">
        <span className="text-red-500 line-through text-sm">{old}</span>
        <span className="font-bold text-emerald-600">{replacement}</span>
      </div>
    </div>
  );
}

/* ─────────── 언어 탭 전환 홈페이지 목업 ─────────── */
const SITE_LANGS = [
  { tag: '한국어', chipClass: 'bg-slate-900 text-white', name: '강남 OO피부과', tagline: '피부 고민, 정확한 진단으로 시작하세요', nav: ['병원 소개', '시술 안내', '의료진', '오시는 길'], chips: ['레이저 토닝', '보톡스', '필러'], cta: '상담 예약' },
  { tag: 'English', chipClass: 'bg-blue-500 text-white', name: 'Gangnam OO Skin Clinic', tagline: 'Healthy skin starts with an accurate diagnosis', nav: ['About', 'Treatments', 'Doctors', 'Location'], chips: ['Laser Toning', 'Botox', 'Filler'], cta: 'Book Now' },
  { tag: '中文', chipClass: 'bg-amber-500 text-white', name: '江南OO皮肤科', tagline: '肌肤问题，从精准诊断开始', nav: ['医院介绍', '项目介绍', '医生团队', '交通指南'], chips: ['激光美白', '肉毒素', '玻尿酸'], cta: '预约咨询' },
  { tag: '日本語', chipClass: 'bg-pink-500 text-white', name: '江南OOスキンクリニック', tagline: '肌の悩みは正確な診断から', nav: ['医院紹介', '施術案内', '医療陣', 'アクセス'], chips: ['レーザー', 'ボトックス', 'ヒアルロン酸'], cta: '相談予約' },
];

function HospitalSiteMock() {
  const [langIdx, setLangIdx] = useState(0);
  const [autoKey, setAutoKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLangIdx(i => (i + 1) % SITE_LANGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [autoKey]);

  const lang = SITE_LANGS[langIdx];

  return (
    <BrowserFrame url="gangnam-oo-clinic.com" className="w-full max-w-2xl">
      {/* 언어 탭 */}
      <div role="tablist" aria-label="홈페이지 언어" className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
        {SITE_LANGS.map((l, i) => (
          <button key={l.tag} role="tab" aria-selected={i === langIdx}
            onClick={() => { setLangIdx(i); setAutoKey(k => k + 1); }}
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
        {/* ═══════════ 인식 전환 — 구글 공백 ═══════════ */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 text-center">
              네이버에는 있는데,<br />구글에는 없습니다.
            </h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-14">
              지금까지는 네이버 플레이스로 충분했습니다. 한국 환자에게는요.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* 좌: 네이버 — 잘 나옴 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">한국 환자</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check size={11} /> 잘 나옵니다
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded bg-[#03C75A] text-white text-xs font-black flex items-center justify-center">N</span>
                    <span className="text-xs text-slate-400 font-medium">네이버 플레이스</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">강남 OO피부과</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="font-bold text-slate-700">4.8</span>
                    <span>· 방문자 리뷰 312</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin size={12} /> 서울 강남구 · 피부과
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">한국 환자는 네이버에서 찾습니다.</p>
              </div>

              {/* 우: 구글 — 우리 병원 없음 */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">외국인 환자</span>
                  <span className="text-[11px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    보이지 않습니다
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                    <Search size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-700 font-medium">skin clinic gangnam</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Gangnam A Dermatology Clinic', url: 'www.gangnam-a-skin.com' },
                      { name: 'B Skin & Laser Clinic', url: 'www.bskinlaser.com' },
                      { name: 'Seoul C Aesthetic Clinic', url: 'www.seoul-c-aesthetic.com' },
                    ].map(item => (
                      <div key={item.name}>
                        <p className="text-sm font-medium text-blue-700">{item.name}</p>
                        <p className="text-[11px] text-emerald-700">{item.url}</p>
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-red-200 rounded-lg px-3 py-2.5 text-center">
                      <p className="text-xs font-bold text-red-400">원장님 병원은 여기에 없습니다</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">외국인 환자는 구글에서 찾습니다.</p>
              </div>
            </div>

            <p className="text-center text-lg md:text-xl font-bold text-slate-900 max-w-2xl mx-auto leading-relaxed">
              네이버 플레이스는 외국인 환자에게 사실상 보이지 않습니다.<br />
              <span className="text-red-500">구글에 없는 병원은, 외국인 환자에게는 존재하지 않는 병원입니다.</span>
            </p>
          </div>
        </section>
        {/* ═══════════ 시장 기회 — 왜 지금 ═══════════ */}
        <section className="bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-14 text-center">
              외국인 환자, 역대 최대.
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: '117만 명', label: '2024년 외국인 환자', sub: '2023년 60.6만 → 약 2배 성장' },
                { value: '피부과', label: '외국인 환자 진료과 1위', sub: '미용 시술 수요 집중' },
                { value: '강남·서울', label: '외국인 환자 최다 지역', sub: '주변 병원은 이미 유치 중' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-7 text-center">
                  <p className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">{stat.value}</p>
                  <p className="text-sm font-bold text-slate-900 mb-1">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.sub}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400">
              * 출처: 보건복지부·한국보건산업진흥원 외국인 환자 유치 실적
            </p>
          </div>
        </section>
        {/* ═══════════ 포함 범위 — 0원에 받는 것 전부 ═══════════ */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-14 text-center">
              0원에, 이 모든 것을 받습니다.
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-16">
              {[
                {
                  icon: Globe,
                  title: '다국어 홈페이지 제작',
                  desc: '병원 소개, 시술 안내, 의료진 프로필, 위치, 문의까지. 모바일 반응형 기본.',
                  tags: ['KR', 'EN', '中', '日'],
                },
                {
                  icon: Store,
                  title: 'KBP 플랫폼 입점',
                  desc: '글로벌 유저가 시술을 찾고 예약하는 K-BeautyPass에 병원이 노출됩니다.',
                  tags: [],
                },
                {
                  icon: Megaphone,
                  title: '초기 마케팅 지원',
                  desc: '입점 초기 마케팅 비용은 플랫폼이 부담합니다. 병원이 내는 광고비는 없습니다.',
                  tags: [],
                },
                {
                  icon: Users,
                  title: '외국인 체험단 3건 무료',
                  desc: '입점 병원 대상 외국인 체험단을 3건 무료로 지원합니다.',
                  tags: [],
                },
              ].map(card => (
                <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                    {card.tags.map((tag, i) => (
                      <span key={tag} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ['bg-slate-200 text-slate-600', 'bg-blue-100 text-blue-600', 'bg-amber-100 text-amber-600', 'bg-pink-100 text-pink-600'][i]
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">일반 제작사와 비교하면</h3>
              <PriceRow label="홈페이지 제작비" old="300~1,000만원+" replacement="0원" />
              <PriceRow label="다국어 페이지 추가" old="언어당 별도 견적" replacement="포함" />
              <PriceRow label="모바일 반응형" old="옵션 별도" replacement="기본 포함" />
              <PriceRow label="월 유지보수" old="별도" replacement="0원" />
              <p className="text-xs text-slate-400 mt-4">* 일반 제작사 시세는 보수적 범위 기준입니다.</p>
            </div>
          </div>
        </section>
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
