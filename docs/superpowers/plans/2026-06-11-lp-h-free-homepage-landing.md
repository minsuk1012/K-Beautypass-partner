# /lp/h "0원 다국어 홈페이지" 랜딩페이지 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈페이지 없는 병원 원장 대상 "KBP 입점하면 다국어 홈페이지 0원 제작" 랜딩페이지(`/lp/h`)를 [docs/variant-h-free-homepage.md](../../variant-h-free-homepage.md) 스펙대로 구현한다.

**Architecture:** 기존 변형 패턴(`/lp/a2`)을 따라 `app/lp/h/page.tsx` 단일 `'use client'` 파일에 인라인 서브컴포넌트로 구현. SEO 메타는 `app/lp/h/layout.tsx`(서버 컴포넌트)에서 export. 문의 출처 구분을 위해 `/api/inquiry`에 옵셔널 `source` 필드를 추가(하위 호환).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, framer-motion, lucide-react

**Verification 전략 (중요):** 이 repo에는 테스트 러너가 없다 (package.json scripts: dev/build/start/lint 뿐). 테스트 프레임워크 신규 도입은 이 작업 범위가 아니다 (YAGNI, 기존 변형들도 동일). 따라서 각 태스크의 검증은:
- `npm run lint` → exit 0 (오류 없음)
- `npm run build` → `✓ Compiled successfully` + 라우트 테이블에 `/lp/h` 표시
- 최종 태스크에서 dev 서버 + curl 스모크 테스트

**카피 주의:** FAQ Q2/Q3/Q5/Q6/Q7과 시장 통계 수치는 스펙의 "권장안"으로 구현한다. **광고 집행 전에 스펙 말미의 "확정 필요 사항" 체크리스트(정책·데이터·법률)를 통과해야 한다.** 코드 구현과 별개의 비즈니스 확인 사항이다.

---

## File Structure

| 파일 | 작업 | 책임 |
|------|------|------|
| `app/api/inquiry/route.ts` | Modify | 옵셔널 `source` 필드 수신 → Slack 메시지에 "유입 경로" 표시 |
| `app/lp/h/layout.tsx` | Create | SEO metadata export (client page는 metadata export 불가) |
| `app/lp/h/page.tsx` | Create | 랜딩 본체 — 헤더/Hero(언어탭 목업)/구글 공백/시장 기회/포함 범위/왜 무료/프로세스/FAQ/CTA폼/푸터/스티키바 |

`page.tsx`는 기존 변형 컨벤션(a: 395줄, a2: 506줄 단일 파일)을 따라 단일 파일로 하되, 섹션 순서대로 인라인 컴포넌트를 배치한다. 각 태스크는 `{/* SECTION:XXX */}` 마커 주석을 실제 JSX로 교체하는 방식으로 진행한다 (마커가 Edit의 anchor 역할).

---

### Task 1: `/api/inquiry`에 옵셔널 source 필드 추가

**Files:**
- Modify: `app/api/inquiry/route.ts`

- [ ] **Step 1: InquiryData 인터페이스에 source 추가**

`app/api/inquiry/route.ts`에서 다음을 찾아:

```ts
interface InquiryData {
  hospitalName: string;
  managerName: string;
  phone: string;
  email?: string;
  message?: string;
}
```

이렇게 교체:

```ts
interface InquiryData {
  hospitalName: string;
  managerName: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
}
```

- [ ] **Step 2: Slack 메시지 fields에 유입 경로 추가**

같은 파일에서 다음을 찾아:

```ts
            ...(data.message
              ? [
                  {
                    title: '문의사항',
                    value: data.message,
                    short: false,
                  },
                ]
              : []),
```

이렇게 교체 (message 블록 뒤에 source 블록 추가):

```ts
            ...(data.message
              ? [
                  {
                    title: '문의사항',
                    value: data.message,
                    short: false,
                  },
                ]
              : []),
            ...(data.source
              ? [
                  {
                    title: '유입 경로',
                    value: data.source,
                    short: true,
                  },
                ]
              : []),
```

- [ ] **Step 3: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build에 `✓ Compiled successfully` 출력. 기존 페이지들 라우트 정상.

- [ ] **Step 4: Commit**

```bash
git add app/api/inquiry/route.ts
git commit -m "feat: inquiry API에 유입 경로(source) 필드 추가

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: /lp/h 라우트 스캐폴드 (layout + 페이지 뼈대)

**Files:**
- Create: `app/lp/h/layout.tsx`
- Create: `app/lp/h/page.tsx`

- [ ] **Step 1: layout.tsx 생성 (SEO 메타)**

`app/lp/h/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '병원 홈페이지, 다국어까지 0원 제작 | KBEAUTYPASS 파트너',
  description:
    'KBP 입점 병원에게는 한국어+영·중·일 홈페이지 제작이 무료입니다. 예약이 성사될 때만 수수료를 받는 구조라 가능합니다. 외국인 환자는 구글에서 병원을 찾습니다.',
};

export default function VariantHLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: page.tsx 뼈대 생성 (헤더 + 섹션 마커 + 푸터 + 스티키 CTA)**

`app/lp/h/page.tsx`:

```tsx
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
```

- [ ] **Step 3: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공 + 라우트 테이블에 `○ /lp/h` 표시.

- [ ] **Step 4: Commit**

```bash
git add app/lp/h/layout.tsx app/lp/h/page.tsx
git commit -m "feat: /lp/h 변형 H 라우트 스캐폴드 (헤더·푸터·스티키 CTA·SEO 메타)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Hero 섹션 — 오퍼 선공 + 언어 탭 전환 목업

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: import 확장**

`app/lp/h/page.tsx`에서 다음을 찾아:

```tsx
import { ArrowRight } from 'lucide-react';
```

이렇게 교체:

```tsx
import { ArrowRight, ArrowDown } from 'lucide-react';
import BrowserFrame from '../../components/BrowserFrame';
```

- [ ] **Step 2: 언어 데이터 + 홈페이지 목업 컴포넌트 추가**

같은 파일에서 다음을 찾아:

```tsx
/* ─────────── Main Page ─────────── */
```

위에 아래 코드를 삽입 (찾은 줄은 유지):

```tsx
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

```

- [ ] **Step 3: Hero JSX 삽입**

같은 파일에서 다음을 찾아:

```tsx
        {/* SECTION:HERO */}
```

이렇게 교체:

```tsx
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
```

- [ ] **Step 4: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 5: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h Hero 섹션 — 0원 오퍼 + 언어 탭 전환 홈페이지 목업

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 구글 공백 섹션 — 네이버 vs 구글 비교

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: import 확장**

다음을 찾아:

```tsx
import { ArrowRight, ArrowDown } from 'lucide-react';
```

이렇게 교체:

```tsx
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star } from 'lucide-react';
```

- [ ] **Step 2: 구글 공백 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:GOOGLE_GAP */}
```

이렇게 교체:

```tsx
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
                    {['Gangnam A Dermatology Clinic', 'B Skin & Laser Clinic', 'Seoul C Aesthetic Clinic'].map(name => (
                      <div key={name}>
                        <p className="text-sm font-medium text-blue-700">{name}</p>
                        <p className="text-[11px] text-emerald-700">www.{name.split(' ')[0].toLowerCase()}-clinic.com</p>
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
```

- [ ] **Step 3: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 4: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h 구글 공백 섹션 — 네이버 vs 구글 검색 비교 목업

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: 시장 기회 섹션 — 숫자 카드

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: 시장 기회 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:MARKET */}
```

이렇게 교체:

```tsx
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
```

- [ ] **Step 2: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 3: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h 시장 기회 섹션 — 외국인 환자 성장 숫자 카드

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 포함 범위 섹션 — 혜택 카드 4종 + 가격 앵커 테이블

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: import 확장**

다음을 찾아:

```tsx
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star } from 'lucide-react';
```

이렇게 교체:

```tsx
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star, Globe, Store, Megaphone, Users } from 'lucide-react';
```

- [ ] **Step 2: PriceRow 컴포넌트 추가**

다음을 찾아:

```tsx
/* ─────────── 언어 탭 전환 홈페이지 목업 ─────────── */
```

위에 아래 코드를 삽입 (찾은 줄은 유지):

```tsx
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

```

- [ ] **Step 3: 포함 범위 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:BENEFITS */}
```

이렇게 교체:

```tsx
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
```

- [ ] **Step 4: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 5: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h 포함 범위 섹션 — 혜택 카드 4종 + 가격 앵커 테이블

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: 왜 무료인가 섹션 — 수수료 구조 도식

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: 왜 무료인가 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:WHY_FREE */}
```

이렇게 교체:

```tsx
        {/* ═══════════ 왜 무료인가 — 신뢰 ═══════════ */}
        <section id="why-free" className="bg-slate-50 scroll-mt-14">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 text-center">
              병원이 잘돼야, 우리도 법니다.
            </h2>
            <p className="text-slate-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              홈페이지 제작비, 입점비, 월 이용료를 받지 않습니다. 예약이 성사되지 않으면 KBP의 수익도 0원입니다.<br className="hidden md:block" />
              그래서 병원의 얼굴이 될 홈페이지부터 우리가 먼저 투자합니다.
            </p>

            <div className="grid md:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden mb-10">
              {[
                { step: '01', title: '외국인 환자가 예약', desc: 'KBP 플랫폼과 다국어 홈페이지를 통해 환자가 예약합니다.' },
                { step: '02', title: '시술 완료', desc: '병원은 진료에만 집중하면 됩니다.' },
                { step: '03', title: '그때만 수수료 15%', desc: '예약이 없으면 비용도 0원입니다.' },
              ].map((item, i) => (
                <div key={item.step} className="bg-white p-8 md:p-10 relative">
                  {i < 2 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-slate-50 border-2 border-slate-200 items-center justify-center">
                      <ArrowRight size={14} className="text-slate-400" />
                    </div>
                  )}
                  <span className="text-emerald-600 text-sm font-bold">{item.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {['입점비 0원', '제작비 0원', '월 이용료 0원', '광고비 0원'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
```

- [ ] **Step 2: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 3: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h 왜 무료인가 섹션 — 성과형 수수료 구조 도식

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: 프로세스 섹션 — 4단계

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: 프로세스 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:PROCESS */}
```

이렇게 교체:

```tsx
        {/* ═══════════ 프로세스 — 4단계 ═══════════ */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-14 text-center">
              문의부터 오픈까지, 4단계면 끝납니다.
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: '1', title: '입점 문의', desc: '아래 폼 작성 1분이면 됩니다.' },
                { step: '2', title: '상담 & 자료 전달', desc: '병원 정보와 시술 목록을 전달해 주세요.' },
                { step: '3', title: '제작 & 검수', desc: '초안 제작 후 병원 검토·수정을 거칩니다. (2~4주)' },
                { step: '4', title: '오픈 + 입점', desc: '홈페이지 오픈과 KBP 입점이 동시에 진행됩니다.' },
              ].map(item => (
                <div key={item.step} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white text-sm font-black flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
```

- [ ] **Step 2: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 3: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h 프로세스 섹션 — 문의부터 오픈까지 4단계

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: FAQ 섹션 — 아코디언 7문항

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: FAQ 데이터 + 아코디언 컴포넌트 추가**

다음을 찾아:

```tsx
/* ─────────── 가격 앵커 행 ─────────── */
```

위에 아래 코드를 삽입 (찾은 줄은 유지):

```tsx
/* ─────────── FAQ ───────────
 * 주의: Q2/Q3/Q5/Q6/Q7 답변은 스펙(docs/variant-h-free-homepage.md)의 권장안.
 * 광고 집행 전 "확정 필요 사항" 체크리스트(정책·법률) 통과 필요.
 */
const faqs = [
  {
    q: '정말 무료인가요? 왜 무료죠?',
    a: '네, 홈페이지 제작비·입점비·월 이용료 모두 0원입니다. KBP는 예약이 성사될 때만 성과 수수료를 받습니다. 병원이 잘돼야 저희도 수익이 나는 구조이기 때문에, 병원의 얼굴이 될 홈페이지를 먼저 투자해 제작합니다.',
  },
  {
    q: '도메인·호스팅·유지 비용은 누가 부담하나요?',
    a: '병원이 별도로 부담하는 비용은 없습니다. 시술 추가, 가격 변경 등 기본 업데이트도 요청 시 반영됩니다.',
  },
  {
    q: '홈페이지 소유권은 누구에게 있나요?',
    a: '홈페이지와 콘텐츠의 소유권은 병원에 있습니다.',
  },
  {
    q: '의료광고법에 문제는 없나요?',
    a: '치료 경험담, 과장·비교 광고 등 의료법상 금지되는 표현을 피해 의료광고 규정을 준수하는 가이드로 제작합니다.',
  },
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '병원 자료 전달 후 2~4주 안에 초안을 드리고, 검토와 수정을 거쳐 오픈합니다.',
  },
  {
    q: '어떤 진료과가 가능한가요?',
    a: '피부과·성형외과 등 외국인 환자 수요가 있는 미용·의료 진료과 중심으로 입점 가능합니다. 그 외 진료과는 문의 시 안내드립니다.',
  },
  {
    q: '입점을 해지하면 홈페이지는 어떻게 되나요?',
    a: '유지 조건과 해지 시 처리 방식은 계약 전에 서면으로 명확하게 안내드립니다. 구두 설명이 아닌 계약서 기준으로 확인하실 수 있습니다.',
  },
];

function FAQItem({ item, isOpen, toggle }: { item: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={toggle} className="w-full text-left py-5 flex items-start justify-between gap-4">
        <span className="text-base sm:text-lg font-semibold text-slate-900">{item.q}</span>
        <span className={`text-slate-400 text-2xl leading-none shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="pb-5 text-slate-500 leading-relaxed max-w-xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

```

- [ ] **Step 2: 페이지 컴포넌트에 FAQ 상태 추가**

다음을 찾아:

```tsx
  const [showStickyBar, setShowStickyBar] = useState(false);
```

이렇게 교체:

```tsx
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
```

- [ ] **Step 3: FAQ JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:FAQ */}
```

이렇게 교체:

```tsx
        {/* ═══════════ FAQ ═══════════ */}
        <section className="bg-slate-50">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-12">
              자주 묻는 질문
            </h2>
            <div>
              {faqs.map((item, i) => (
                <FAQItem key={i} item={item} isOpen={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </section>
```

- [ ] **Step 4: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공.

- [ ] **Step 5: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h FAQ 섹션 — 무료 조건·소유권·의료법 등 7문항

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: CTA + 문의 폼 섹션 (source=lp_h)

**Files:**
- Modify: `app/lp/h/page.tsx`

- [ ] **Step 1: import 확장**

다음을 찾아:

```tsx
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star, Globe, Store, Megaphone, Users } from 'lucide-react';
```

이렇게 교체:

```tsx
import { ArrowRight, ArrowDown, Check, MapPin, Search, Star, Globe, Store, Megaphone, Users, Send, Loader2 } from 'lucide-react';
import { trackInquirySubmit } from '../../lib/analytics';
```

- [ ] **Step 2: CompactInquiryForm 컴포넌트 추가 (a2 패턴 + emerald 톤 + source)**

다음을 찾아:

```tsx
/* ─────────── FAQ ───────────
```

위에 아래 코드를 삽입 (찾은 줄은 유지):

```tsx
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
        body: JSON.stringify({ ...form, source: 'lp_h' }),
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
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-emerald-600" />
        </div>
        <p className="text-xl font-bold text-slate-900 mb-2">문의가 접수되었습니다</p>
        <p className="text-slate-500 mb-6">담당자가 빠르게 연락드리겠습니다.</p>
        <button onClick={() => setState('idle')} className="text-emerald-600 font-medium hover:underline">
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
          className="px-4 py-3 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
        <input type="text" required placeholder="담당자명 *" value={form.managerName}
          onChange={e => setForm(f => ({ ...f, managerName: e.target.value }))}
          className="px-4 py-3 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="tel" required placeholder="연락처 * (010-0000-0000)" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="px-4 py-3 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
        <input type="email" placeholder="이메일" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="px-4 py-3 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
      </div>
      <textarea rows={2} placeholder="병원명, 진료과, 궁금하신 점을 남겨주세요." value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        className="w-full px-4 py-3 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none" />
      {state === 'error' && <p className="text-red-600 text-sm">전송에 실패했습니다. 다시 시도해주세요.</p>}
      <button type="submit" disabled={state === 'loading'}
        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
        {state === 'loading'
          ? <><Loader2 className="w-5 h-5 animate-spin" /> 전송 중...</>
          : <><Send className="w-4 h-4" /> 0원 홈페이지 문의하기</>}
      </button>
    </form>
  );
}

```

- [ ] **Step 3: CTA + 폼 JSX 삽입**

다음을 찾아:

```tsx
        {/* SECTION:CTA_FORM */}
```

이렇게 교체:

```tsx
        {/* ═══════════ CTA + FORM ═══════════ */}
        <section ref={formRef} className="bg-slate-900 scroll-mt-14">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  홈페이지가 없어서 놓치던 환자,<br />이제 0원으로 잡으세요.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  제작비 0원, 입점비 0원.<br />
                  예약이 성사될 때만 수수료를 냅니다.
                </p>
                <div className="space-y-3">
                  {['다국어 홈페이지 제작 0원', '입점비·월 이용료 0원', '초기 마케팅 플랫폼 부담', '외국인 체험단 3건 지원'].map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">0원 홈페이지 입점 문의</h3>
                  <p className="text-xs text-slate-400 mt-1">정보를 남겨주시면 담당자가 연락드립니다.</p>
                </div>
                <CompactInquiryForm />
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 4: 검증**

Run: `npm run lint && npm run build`
Expected: lint exit 0, build 성공. 이 시점에 SECTION 마커 주석이 모두 실제 섹션으로 교체되어 있어야 함:

```bash
grep -c "SECTION:" app/lp/h/page.tsx
```
Expected: `0`

- [ ] **Step 5: Commit**

```bash
git add app/lp/h/page.tsx
git commit -m "feat: /lp/h CTA·문의 폼 섹션 — source=lp_h 출처 추적

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 11: 최종 검증 — 스모크 테스트

**Files:** (없음 — 검증만)

- [ ] **Step 1: 프로덕션 빌드 확인**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 라우트 테이블에 `○ /lp/h` 포함, 에러 0건.

- [ ] **Step 2: dev 서버 기동 + 핵심 콘텐츠 스모크 테스트**

```bash
npm run dev &
sleep 12
curl -s http://localhost:3010/lp/h -o /tmp/lph.html
grep -c "만들어 드립니다" /tmp/lph.html
grep -c "구글에는 없습니다" /tmp/lph.html
grep -c "병원이 잘돼야" /tmp/lph.html
grep -c "자주 묻는 질문" /tmp/lph.html
grep -c "0원 홈페이지 입점 문의" /tmp/lph.html
```

Expected: 각 grep 결과 1 이상 (0이면 해당 섹션 누락).

- [ ] **Step 3: dev 서버 종료**

```bash
pkill -f "next dev" 2>/dev/null; true
```

- [ ] **Step 4: 수동 확인 안내 (사람 확인 항목)**

브라우저에서 `http://localhost:3010/lp/h` 열어 확인할 것:
- Hero 언어 탭이 2.8초 간격 자동 순환 + 클릭 전환되는가
- 모바일 폭(375px)에서 모든 섹션 깨짐 없는가
- "어떻게 가능한가요?" 버튼이 왜-무료 섹션으로 스크롤되는가
- 스크롤 600px 이후 하단 스티키 바 등장하는가
- 폼 제출 시 Slack 수신 + "유입 경로: lp_h" 표시되는가 (SLACK_WEBHOOK_URL 설정 환경에서)

- [ ] **Step 5: 최종 커밋 (잔여 변경이 있는 경우만)**

```bash
git status --short
# app/lp/h/ 또는 app/api/inquiry/route.ts에 미커밋 변경이 있으면:
git add app/lp/h/ app/api/inquiry/route.ts
git commit -m "feat: /lp/h 변형 H 랜딩 마무리

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## 스펙 커버리지 매핑 (자가 점검용)

| 스펙 섹션 | 구현 태스크 |
|----------|------------|
| 1. 헤더 | Task 2 |
| 2. Hero (오퍼 선공 + 언어 탭 목업) | Task 3 |
| 3. 구글 공백 | Task 4 |
| 4. 시장 기회 | Task 5 |
| 5. 포함 범위 (혜택 카드 + 가격 앵커) | Task 6 |
| 6. 왜 무료인가 (수수료 도식) | Task 7 |
| 7. 프로세스 4단계 | Task 8 |
| 8. FAQ 7문항 | Task 9 |
| 9. CTA + 폼 (source=lp_h) | Task 1, 10 |
| 10. Footer | Task 2 |
| 스티키 CTA 바 (a2 패턴) | Task 2 |
| SEO 메타 | Task 2 (layout.tsx) |

**구현 범위 밖 (광고 집행 전 비즈니스 확인):** 스펙 말미 "확정 필요 사항" — FAQ 정책 답변 확정, 시장 통계 출처 검증, 의료광고 문구 법률 검토.
