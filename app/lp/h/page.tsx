'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Check,
  ClipboardCheck,
  HeartPulse,
  Languages,
  Loader2,
  Search,
  Send,
  Sparkles,
  Stethoscope,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { trackInquirySubmit } from '../../lib/analytics';

const asset = (name: string) => `/lp-h/${name}`;

const facts = [
  { value: '4개 언어', label: '한국어 · 영어 · 중국어 · 일본어' },
  { value: '2~4주', label: '자료 전달 후 초안 제작 기준' },
  { value: '0원', label: '초기 구축비와 월 이용료' },
  { value: '15%', label: '예약·시술 완료 시 성과 수수료' },
];

const categories: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: Stethoscope,
    title: '피부과',
    desc: '레이저·리프팅·스킨부스터 등 시술 정보와 전문 의료진 중심의 탐색 구조',
  },
  {
    icon: Sparkles,
    title: '성형외과',
    desc: '의료진 경력, 수술 방식, 회복 일정과 상담 전 확인 정보를 체계적으로 제공',
  },
  {
    icon: ClipboardCheck,
    title: '치과',
    desc: '임플란트·교정·심미 진료의 기간, 가격 범위와 내원 절차를 명확하게 안내',
  },
  {
    icon: HeartPulse,
    title: '건강검진',
    desc: '검진 항목, 소요 시간, 결과 상담과 외국어 지원 범위를 예약 전에 확인',
  },
  {
    icon: Building2,
    title: '한방·웰니스',
    desc: '체질 상담, 회복 프로그램과 웰니스 경험을 문화적 맥락까지 고려해 설명',
  },
  {
    icon: Camera,
    title: '헤어·메이크업',
    desc: '방문 목적과 스타일 레퍼런스를 사전에 공유하고 상담 채널로 바로 연결',
  },
];

const benefits: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: Languages,
    title: '다국어 정보 설계',
    desc: '기계 번역 문장이 아닌 진료 맥락 중심의 페이지 구성',
  },
  {
    icon: Search,
    title: '검색 기반 콘텐츠',
    desc: '진료명·지역·언어별 검색 의도를 고려한 구조',
  },
  {
    icon: Store,
    title: '예약 연결',
    desc: 'KBP 상품과 문의 경로를 웹사이트에서 바로 연결',
  },
  {
    icon: CalendarDays,
    title: '운영 업데이트',
    desc: '시술·가격·의료진 변경에 필요한 기본 수정 지원',
  },
];

const processSteps = [
  { title: '입점 적합성 확인', desc: '진료 과목, 외국인 응대 가능 범위, 운영 조건과 목표 시장을 확인합니다.', time: '1~2일' },
  { title: '자료 전달·인터뷰', desc: '의료진, 진료 항목, 가격, 위치, 사진과 기존 홍보 자료를 전달받습니다.', time: '병원 협의' },
  { title: '기획·다국어 제작', desc: 'KBP가 콘텐츠 구조, 번역, 모바일 화면과 예약 연결을 포함한 초안을 제작합니다.', time: '2~4주' },
  { title: '병원 검수', desc: '의학 정보와 의료광고 표현을 병원이 검토하고 필요한 수정을 반영합니다.', time: '1~2회' },
  { title: '오픈·운영', desc: '웹사이트와 KBP 상품을 공개하고 문의·예약 경로를 운영합니다.', time: '상시' },
];

const faqs = [
  {
    q: '정말 구축비와 월 이용료가 없나요?',
    a: '네. 다국어 홈페이지의 초기 구축비, KBP 입점비와 월 이용료는 받지 않습니다. KBP를 통한 예약이 시술 완료로 이어졌을 때만 계약된 성과 수수료가 발생합니다.',
  },
  {
    q: '홈페이지와 콘텐츠의 소유권은 누구에게 있나요?',
    a: '소유권과 사용 범위, 계약 종료 후 데이터 및 사이트 처리 방식은 계약서에 명시합니다. 병원이 제공한 원본 자료의 권리는 병원에 있습니다.',
  },
  {
    q: '의료광고 관련 검수는 어떻게 진행하나요?',
    a: 'KBP는 금지 표현을 피하는 제작 가이드를 적용하며, 공개 전 최종 의료 정보와 광고 표현은 병원이 검수합니다.',
  },
  {
    q: '어떤 수정이 기본 운영 범위에 포함되나요?',
    a: '시술명, 가격, 의료진, 진료 시간 등 기본 정보 변경은 운영 범위에 포함합니다. 페이지 전면 개편이나 대규모 신규 콘텐츠는 사전에 범위를 협의합니다.',
  },
  {
    q: '입점을 종료하면 홈페이지는 어떻게 되나요?',
    a: '유지 조건, 이전 가능 범위, 콘텐츠 제공 방식과 종료 일정을 계약 전에 서면으로 안내합니다. 구두 설명이 아닌 최종 계약서가 기준입니다.',
  },
];

function CompactInquiryForm() {
  const [form, setForm] = useState({
    hospitalName: '',
    department: '',
    managerName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('loading');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'lp_h' }),
      });

      if (!response.ok) {
        setState('error');
        return;
      }

      trackInquirySubmit(form.hospitalName);
      setState('success');
      setForm({ hospitalName: '', department: '', managerName: '', phone: '', email: '', message: '' });
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
          <Check className="h-7 w-7 text-[#3d77ec]" />
        </div>
        <strong className="mb-2 block text-2xl text-slate-950">문의가 접수되었습니다.</strong>
        <p className="mb-7 text-slate-500">담당자가 입력하신 연락처로 영업일 기준 1~2일 내 연락드리겠습니다.</p>
        <button type="button" onClick={() => setState('idle')} className="font-bold text-[#3d77ec]">
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <Input
        required
        label="병원명"
        value={form.hospitalName}
        onChange={(value) => setForm((prev) => ({ ...prev, hospitalName: value }))}
        autoComplete="organization"
      />
      <Input
        required
        label="주요 진료과"
        value={form.department}
        onChange={(value) => setForm((prev) => ({ ...prev, department: value }))}
      />
      <Input
        required
        label="담당자명"
        value={form.managerName}
        onChange={(value) => setForm((prev) => ({ ...prev, managerName: value }))}
        autoComplete="name"
      />
      <Input
        required
        label="연락처"
        type="tel"
        value={form.phone}
        onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
        autoComplete="tel"
      />
      <Input
        label="이메일"
        type="email"
        value={form.email}
        onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
        autoComplete="email"
      />
      <label className="grid gap-2 text-sm font-bold text-slate-600 sm:col-span-2">
        외국인 응대 현황 또는 문의 내용
        <textarea
          rows={4}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="min-h-28 resize-y rounded border border-slate-300 px-4 py-3 text-base font-normal text-slate-950 outline-none transition focus:border-[#3d77ec] focus:ring-4 focus:ring-blue-100"
        />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-500 sm:col-span-2">
        <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#3d77ec]" />
        입점 상담을 위한 개인정보 수집 및 연락에 동의합니다. 제출 정보는 상담 목적에만 사용됩니다.
      </label>
      {state === 'error' && <p className="text-sm font-semibold text-red-600 sm:col-span-2">전송에 실패했습니다. 다시 시도해주세요.</p>}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#3d77ec] px-5 font-bold text-white transition hover:bg-[#245fd2] disabled:bg-slate-400 sm:col-span-2"
      >
        {state === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> 전송 중
          </>
        ) : (
          <>
            입점 가능 여부 문의하기 <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-600">
      {label}
      {required ? ' *' : ''}
      <input
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded border border-slate-300 px-4 py-3 text-base font-normal text-slate-950 outline-none transition focus:border-[#3d77ec] focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-wide ${light ? 'text-blue-200' : 'text-[#3d77ec]'}`}>
      <span className="h-px w-7 bg-current" />
      {children}
    </p>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-14 grid gap-8 md:grid-cols-[0.62fr_1.38fr] ${center ? 'mx-auto max-w-3xl text-center md:block' : ''}`}>
      <div className={center ? 'flex justify-center' : ''}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <div>
        <h2 className="mb-5 text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
          {title.split('\n').map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="text-lg leading-8 text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function AppPhone() {
  return (
    <div className="relative aspect-[306/610] w-[clamp(112px,28vw,218px)] overflow-hidden rounded-[34px] border border-white/30 bg-slate-950 p-1.5 shadow-2xl md:rounded-[38px] md:p-2">
      <div className="absolute left-1/2 top-3 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-950 md:h-5 md:w-20" />
      <div className="h-full overflow-hidden rounded-[27px] bg-slate-50 md:rounded-[30px]">
        <PhoneStatus />
        <div className="flex min-h-11 items-center justify-between border-b border-slate-200 bg-white px-4">
          <span className="text-[9px] font-black text-slate-950 md:text-[11px]">K-BEAUTYPASS</span>
          <span className="rounded bg-blue-50 px-2 py-1 text-[7px] font-black text-[#245fd2]">EN</span>
        </div>
        <div className="p-3">
          <small className="mb-1 block text-[7px] font-black uppercase text-[#3d77ec] md:text-[8px]">Discover Seoul clinics</small>
          <strong className="mb-3 block text-[11px] leading-tight text-slate-950 md:text-base">
            Find your clinic
            <br />
            with confidence.
          </strong>
          <div className="mb-3 hidden min-h-8 items-center gap-2 rounded border border-slate-200 bg-white px-3 text-[8px] text-slate-400 sm:flex">
            <Search className="h-3 w-3" /> Search treatments
          </div>
          <div className="mb-2 flex items-center justify-between text-[8px] font-black text-slate-950 md:text-[10px]">
            Recommended <span className="text-[#3d77ec]">View</span>
          </div>
          <article className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="relative h-16 md:h-24">
              <img src={asset('clinic-discovery-blue-v2.webp')} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-2 top-2 rounded bg-slate-950/75 px-1.5 py-1 text-[6px] font-black text-white">English</span>
            </div>
            <div className="p-2">
              <strong className="mb-1 block text-[8px] text-slate-950 md:text-xs">Seoul Dermatology</strong>
              <p className="mb-2 text-[6px] text-slate-500 md:text-[8px]">Gangnam · Skin clinic</p>
              <div className="hidden min-h-7 items-center justify-center rounded bg-[#3d77ec] text-[8px] font-black text-white sm:flex">
                Request appointment
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function BookingPhone() {
  return (
    <div className="relative aspect-[306/610] w-[clamp(112px,28vw,218px)] overflow-hidden rounded-[34px] border border-white/30 bg-slate-950 p-1.5 shadow-2xl md:rounded-[38px] md:p-2">
      <div className="absolute left-1/2 top-3 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-950 md:h-5 md:w-20" />
      <div className="h-full overflow-hidden rounded-[27px] bg-slate-50 md:rounded-[30px]">
        <PhoneStatus />
        <div className="flex min-h-11 items-center justify-center border-b border-slate-200 bg-white pt-1 text-[9px] font-black md:text-[10px]">
          Appointment request
        </div>
        <div className="m-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:m-3 md:p-3">
          <small className="mb-1 block text-[6px] font-black text-[#3d77ec] md:text-[8px]">BOOKING #KBP-2406</small>
          <strong className="block text-[8px] text-slate-950 md:text-[13px]">Laser consultation</strong>
          <span className="hidden text-[8px] leading-5 text-slate-500 sm:block">June 18 · 14:30<br />English coordinator requested</span>
        </div>
        <div className="mx-auto mb-2 grid aspect-square w-16 place-items-center rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm md:w-32 md:p-3">
          <div
            className="h-full w-full rounded-sm border-[5px] border-white"
            style={{
              backgroundImage: 'repeating-conic-gradient(#172033 0 25%, transparent 0 50%)',
              backgroundSize: '18px 18px',
            }}
          />
        </div>
        <div className="mx-2 flex min-h-6 items-center justify-center rounded bg-[#3d77ec] text-[6px] font-black text-white md:mx-3 md:min-h-8 md:text-[9px]">
          Connect channel
        </div>
      </div>
    </div>
  );
}

function MessengerPhone() {
  return (
    <div className="relative aspect-[306/610] w-[clamp(112px,28vw,218px)] overflow-hidden rounded-[34px] border border-white/30 bg-slate-950 p-1.5 shadow-2xl md:rounded-[38px] md:p-2">
      <div className="absolute left-1/2 top-3 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-950 md:h-5 md:w-20" />
      <div className="relative h-full overflow-hidden rounded-[27px] bg-slate-50 md:rounded-[30px]">
        <PhoneStatus />
        <div className="flex min-h-12 items-center gap-2 bg-white px-3 pt-1">
          <span className="h-7 w-7 rounded-full bg-blue-100" />
          <div>
            <strong className="block text-[8px] md:text-[11px]">Seoul Dermatology</strong>
            <span className="text-[6px] text-slate-500 md:text-[8px]">Coordinator online</span>
          </div>
        </div>
        <div className="space-y-2 p-2 md:p-3">
          <div className="max-w-[85%] rounded-lg border border-slate-200 bg-white p-2 text-[6px] leading-4 text-slate-600 md:text-[8px]">
            Hello. I would like to confirm consultation details.
          </div>
          <div className="ml-auto max-w-[85%] rounded-lg bg-[#3d77ec] p-2 text-[6px] leading-4 text-white md:text-[8px]">
            안녕하세요. 가능한 시간을 안내드릴게요.
          </div>
          <div className="max-w-[85%] rounded-lg border border-slate-200 bg-white p-2 text-[6px] leading-4 text-slate-600 md:text-[8px]">
            Is an English coordinator available?
          </div>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex min-h-7 items-center rounded-full border border-slate-200 bg-white px-3 text-[6px] text-slate-400 md:text-[8px]">
          Translated reply available
        </div>
      </div>
    </div>
  );
}

function PhoneStatus() {
  return (
    <div className="flex min-h-8 items-center justify-between bg-white px-4 pt-1 text-[7px] font-black text-slate-950 md:min-h-9 md:text-[9px]">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <i className="block h-2 w-2 rounded-full bg-slate-950" />
        <i className="block h-1.5 w-2.5 rounded border border-slate-950" />
      </span>
    </div>
  );
}

function FAQItem({ item, open, onToggle }: { item: (typeof faqs)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-200">
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-6 py-6 text-left">
        <span className="text-lg font-extrabold text-slate-950">{item.q}</span>
        <span className="text-2xl leading-none text-[#3d77ec]">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="max-w-3xl pb-6 text-base leading-8 text-slate-500">{item.a}</p>}
    </div>
  );
}

export default function VariantHPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-blue-200 selection:text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-full w-full max-w-[1180px] px-4 sm:px-6 items-center justify-between">
          <Link href="/lp/h" className="flex items-end gap-3 font-black tracking-tight">
            <span>K-BEAUTYPASS</span>
            <span className="hidden text-xs font-black uppercase tracking-wide text-[#3d77ec] sm:inline">Partner</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm font-bold text-slate-500 md:flex">
            <a href="#problem" className="hover:text-slate-950">시장 기회</a>
            <a href="#solution" className="hover:text-slate-950">제공 범위</a>
            <a href="#model" className="hover:text-slate-950">비용 구조</a>
            <a href="#process" className="hover:text-slate-950">진행 과정</a>
          </div>
          <button type="button" onClick={scrollToForm} className="min-h-10 rounded bg-[#3d77ec] px-5 text-sm font-bold text-white hover:bg-[#245fd2]">
            입점 가능 여부 확인
          </button>
        </nav>
      </header>

      <main className="pt-[68px]">
        <section
          className="relative flex min-h-[650px] overflow-hidden bg-cover bg-center text-white md:h-[calc(100svh-116px)] md:max-h-[760px] md:min-h-[620px]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,14,28,.72) 0%, rgba(8,14,28,.32) 48%, rgba(8,14,28,.08) 100%), url(${asset('hero-clinic-blue-v2.webp')})`,
          }}
        >
          <div className="mx-auto flex h-full w-full max-w-[1180px] items-center px-4 py-16 sm:px-6 max-md:items-end">
            <div className="w-full max-w-[720px] md:w-[66%]">
              <Eyebrow light>Global patient acquisition infrastructure</Eyebrow>
              <h1 className="mb-6 text-[clamp(40px,7vw,72px)] font-black leading-[1.08] tracking-tight">
                외국인 환자가
                <br />
                검색하고 예약하는
                <br />
                병원 웹사이트
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80">
                영·중·일 다국어 웹사이트부터 Google 검색 기반 콘텐츠와 KBP 예약 연결까지.
                초기 구축비와 월 이용료 없이 실제 예약이 발생할 때만 성과 수수료를 받습니다.
              </p>
              <div className="mb-8 flex flex-wrap gap-3 max-sm:grid max-sm:grid-cols-1">
                <button type="button" onClick={scrollToForm} className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#3d77ec] px-6 font-bold text-white">
                  입점 가능 여부 확인 <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#solution" className="inline-flex min-h-12 items-center justify-center rounded border border-white/40 bg-white/10 px-6 font-bold text-white backdrop-blur">
                  제작 범위 살펴보기
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-white/90">
                <li className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-200">초기 구축비 0원</li>
                <li className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-200">월 이용료 0원</li>
                <li className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-200">예약 성사 시 수수료 15%</li>
              </ul>
            </div>
          </div>
          <p className="absolute bottom-5 right-6 text-xs text-white/55">KBP 파트너 클리닉 공간 콘셉트 이미지</p>
        </section>

        <section className="bg-[#101827] text-white">
          <div className="mx-auto grid w-full max-w-[1180px] grid-cols-2 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.value} className="min-h-28 border-l border-white/10 p-6 last:border-r max-md:border-t">
                <strong className="mb-1 block text-2xl font-black">{fact.value}</strong>
                <span className="text-sm text-white/60">{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="problem" className="bg-[#f5f8ff] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <SectionHeader
              eyebrow="The visibility gap"
              title={'네이버에 있는 병원이\nGoogle에는 없습니다.'}
              desc="한국 환자는 네이버에서 병원을 찾지만, 외국인 환자의 탐색은 Google에서 시작됩니다. 번역된 병원 정보와 독립 웹사이트가 없으면 비교 후보에 들어가기 어렵습니다."
            />
            <div className="grid gap-12 md:grid-cols-[.88fr_1.12fr] md:gap-16">
              <div className="pt-4">
                <div className="mb-6 border-b border-slate-200 pb-6">
                  <strong className="block text-[clamp(44px,7vw,78px)] font-black leading-none text-[#3d77ec]">117만 명</strong>
                  <span className="font-extrabold text-slate-700">2024년 한국을 찾은 외국인 환자</span>
                </div>
                <p className="mb-5 text-base leading-8 text-slate-500">
                  전년 대비 약 두 배로 성장한 시장이지만, 환자가 이해할 수 있는 언어로 진료 항목·의료진·위치·예약 방법을 설명하는 병원은 아직 제한적입니다.
                </p>
                <p className="text-base leading-8 text-slate-500">
                  KBP는 홈페이지를 단순 홍보물이 아니라 검색에서 예약까지 이어지는 환자 획득 경로로 설계합니다.
                </p>
                <p className="mt-5 text-xs leading-6 text-slate-400">출처: 보건복지부·한국보건산업진흥원, 2024년 외국인환자 유치 실적</p>
              </div>
              <div className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-2xl shadow-slate-200/70">
                <div className="flex min-h-14 items-center gap-3 border-b border-slate-200 px-5">
                  <Search className="h-5 w-5 text-slate-400" />
                  <span className="font-bold">skin clinic gangnam english</span>
                </div>
                <div className="p-6">
                  {[
                    ['gangnam-skin-a.com', 'Gangnam Skin Clinic A | English Consultation', 'English-speaking coordinators, treatment information, location and online booking.'],
                    ['clinic-b.kr/en', 'Clinic B Seoul | Dermatology & Laser', 'Explore doctors, procedures and prices before requesting an appointment.'],
                  ].map(([url, title, desc]) => (
                    <article key={url} className="mb-6 border-b border-slate-100 pb-6">
                      <small className="text-[#3d77ec]">{url}</small>
                      <h3 className="my-1 text-lg font-bold text-blue-800">{title}</h3>
                      <p className="text-sm leading-6 text-slate-500">{desc}</p>
                    </article>
                  ))}
                  <div className="border-l-4 border-red-400 bg-red-50 p-4 text-sm font-extrabold leading-6 text-red-600">
                    원장님의 병원 정보가 외국어 웹페이지로 제공되지 않으면 이 비교 화면에 등장하기 어렵습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="bg-white py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <SectionHeader
              eyebrow="What we build"
              title={'홈페이지 한 장이 아니라\n예약 경로 전체를 만듭니다.'}
              desc="병원 소개 페이지를 번역하는 데서 끝나지 않습니다. 외국인 환자가 검색하고, 비교하고, 신뢰하고, 문의할 수 있는 정보 구조를 함께 구축합니다."
            />
            <div className="grid overflow-hidden rounded-md bg-[#0d1628] md:grid-cols-[1.22fr_.78fr]">
              <div className="relative min-h-[520px] overflow-hidden md:min-h-[610px]">
                <img src={asset('clinic-corridor-blue-v2.webp')} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/25" />
                <div className="absolute inset-x-4 top-6 overflow-hidden rounded-md border border-white/70 bg-white/95 shadow-2xl md:inset-x-12 md:top-12">
                  <div className="flex min-h-16 items-center justify-between border-b border-slate-200 px-5 max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:gap-2 max-sm:py-3">
                    <span className="text-sm font-black">SEOUL DERMATOLOGY</span>
                    <div className="flex gap-1 text-xs font-black">
                      {['KR', 'EN', 'CN', 'JP'].map((lang, index) => (
                        <span key={lang} className={`px-3 py-2 ${index === 0 ? 'border-b-2 border-[#3d77ec] text-[#3d77ec]' : 'text-slate-400'}`}>{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid min-h-[400px] md:grid-cols-[1.05fr_.95fr]">
                    <div className="flex flex-col justify-center p-6 md:p-9">
                      <span className="mb-3 text-xs font-black uppercase text-[#3d77ec]">피부과 전문의 진료</span>
                      <h3 className="mb-4 text-3xl font-black leading-tight text-slate-950">정확한 진단에서 시작하는 피부 치료</h3>
                      <p className="mb-6 text-sm leading-7 text-slate-500">의료진, 진료 항목, 가격과 위치를 확인하고 원하는 일정으로 상담을 요청하세요.</p>
                      <span className="inline-flex min-h-10 w-fit items-center rounded bg-[#3d77ec] px-4 text-sm font-bold text-white">상담 예약</span>
                    </div>
                    <img src={asset('clinic-consult-room-blue-v2.webp')} alt="블루 포인트가 적용된 병원 상담실 콘셉트" className="min-h-44 h-full w-full object-cover md:min-h-[400px]" />
                  </div>
                </div>
              </div>
              <aside className="flex flex-col justify-center p-8 text-white md:p-10">
                <Eyebrow light>파일럿 제작 범위</Eyebrow>
                <h3 className="mb-7 text-3xl font-black leading-tight">환자가 결정을 내리는 데 필요한 정보를 우선합니다.</h3>
                <ul>
                  {benefits.map((item) => (
                    <li key={item.title} className="flex gap-4 border-t border-white/15 py-5">
                      <item.icon className="mt-1 h-5 w-5 shrink-0 text-blue-200" />
                      <div>
                        <strong className="mb-1 block">{item.title}</strong>
                        <span className="text-sm leading-6 text-white/60">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8ff] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <SectionHeader
              center
              eyebrow="Partner categories"
              title={'외국인 환자 수요가 높은 병원부터\n예약 경로를 연결합니다.'}
              desc="병원의 진료 과목과 운영 역량을 기준으로 검색 콘텐츠와 상담 흐름을 다르게 설계합니다."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <article key={category.title} className="rounded-lg border border-blue-100 bg-white p-7 shadow-xl shadow-blue-950/5">
                  <category.icon className="mb-6 h-9 w-9 text-[#3d77ec]" />
                  <h3 className="mb-3 text-2xl font-black">{category.title}</h3>
                  <p className="text-sm leading-7 text-slate-500">{category.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#101827] py-20 text-white md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center"><Eyebrow light>Reservation-to-channel flow</Eyebrow></div>
              <h2 className="mb-5 text-3xl font-black leading-tight md:text-5xl">예약 문의가 병원 채널의<br />상담 전환으로 이어지는 구조</h2>
              <p className="text-lg leading-8 text-white/70">
                KBP에서 병원을 탐색한 고객을 예약 요청과 병원 상담 채널까지 자연스럽게 연결합니다.
                단순 노출이 아니라 실제 상담이 시작되는 흐름을 설계합니다.
              </p>
              <div className="mt-6 inline-flex rounded border border-blue-200/25 bg-[#3d77ec]/15 px-4 py-2 text-sm font-extrabold text-blue-100">
                상품 탐색 → 예약 요청 → 병원 상담 채널 연결 → 상담·예약 전환
              </div>
            </div>

            <div className="mx-auto mt-12 flex w-[min(420px,100%)] items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-4 shadow-2xl">
              <span className="rounded bg-[#3d77ec]/25 px-3 py-2 text-xs font-black text-blue-100">KBP 예약</span>
              <div>
                <strong className="block text-sm">고객 정보와 관심 시술을 상담 담당자에게 전달</strong>
                <span className="text-xs text-white/55">화면은 서비스 흐름을 설명하기 위한 콘셉트 목업입니다.</span>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-center gap-2 md:gap-5">
              <div className="translate-y-4 -rotate-2"><AppPhone /></div>
              <BookingPhone />
              <div className="translate-y-4 rotate-2"><MessengerPhone /></div>
            </div>

            <div className="mx-auto mt-12 flex w-fit max-w-full items-center gap-4 rounded-lg border border-white/10 bg-black/25 p-4 max-sm:w-full max-sm:flex-col max-sm:items-start">
              <strong className="text-sm">연결 가능한 상담 채널</strong>
              <div className="flex flex-wrap gap-2">
                {[
                  ['LINE', 'bg-green-500'],
                  ['톡', 'bg-green-600'],
                  ['WA', 'bg-sky-500'],
                  ['IG', 'bg-red-500'],
                  ['MAIL', 'bg-amber-500'],
                ].map(([label, color]) => (
                  <span key={label} className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-[10px] font-black text-white ${color}`}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8ff] py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[1180px] px-4 sm:px-6 overflow-hidden bg-slate-100 md:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[320px] md:min-h-[550px]">
              <img src={asset('clinic-pilot-consultation-blue-v2.webp')} alt="외국인 환자와 병원 코디네이터의 상담 운영 콘셉트" className="h-full w-full object-cover" />
              <span className="absolute left-6 top-6 rounded bg-slate-950/80 px-3 py-2 text-xs font-bold text-white">
                파트너 상담 운영 콘셉트 · 실제 성과 수치 아님
              </span>
            </div>
            <div className="self-center p-8 md:p-14">
              <Eyebrow>Pilot case structure</Eyebrow>
              <h3 className="mb-5 text-3xl font-black leading-tight md:text-5xl">병원마다 같은 템플릿을 복제하지 않습니다.</h3>
              <p className="mb-7 text-base leading-8 text-slate-500">
                진료 과목, 핵심 고객, 의료진 강점과 운영 가능한 예약 방식부터 확인한 뒤 병원별 페이지 구조와 콘텐츠 우선순위를 정합니다.
              </p>
              <ul className="grid grid-cols-2 border-t border-slate-300 text-sm font-bold text-slate-700 max-sm:grid-cols-1">
                {['병원 포지셔닝 정리', '4개 언어 콘텐츠', '진료·가격 페이지', '의료진 프로필', 'Google 검색 구조', 'KBP 예약 연결'].map((item) => (
                  <li key={item} className="border-b border-slate-300 py-4">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="model" className="bg-[#111a2b] py-20 text-white md:py-28">
          <div className="mx-auto grid w-full max-w-[1180px] px-4 sm:px-6 gap-12 md:grid-cols-[.82fr_1.18fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <Eyebrow light>Business model</Eyebrow>
              <h2 className="mb-5 text-4xl font-black leading-tight md:text-6xl">무료의 이유를<br />숨기지 않습니다.</h2>
              <p className="text-lg leading-8 text-white/65">
                KBP는 제작비를 받아 수익을 내는 웹 에이전시가 아닙니다. 환자가 KBP를 통해 예약하고 시술을 완료했을 때 발생하는 성과 수수료가 수익 모델입니다.
              </p>
            </div>
            <div>
              <div className="rounded-md border border-white/15 px-6">
                {[
                  ['다국어 홈페이지 기획·제작', '0원'],
                  ['KBP 플랫폼 입점', '0원'],
                  ['도메인·호스팅·기본 업데이트', '월 0원'],
                  ['초기 마케팅 지원', 'KBP 부담'],
                  ['예약 후 시술 완료', '15%'],
                  ['예약 또는 시술 미발생', '수수료 없음'],
                ].map(([label, value], index) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] gap-5 border-b border-white/15 py-6 last:border-b-0">
                    <span className="text-white/60">{label}</span>
                    <strong className={`text-right ${index === 4 ? 'text-2xl text-blue-200' : ''}`}>{value}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-l-4 border-blue-200 bg-white/5 p-5 text-sm leading-7 text-white/70">
                세부 정산 기준, 홈페이지 유지 조건, 수정 범위와 해지 시 처리 방식은 계약 전에 서면으로 제공합니다. 최종 조건은 병원과 체결하는 계약서를 기준으로 합니다.
              </p>
            </div>
          </div>
        </section>

        <section id="process" className="bg-white py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <SectionHeader
              eyebrow="Process & ownership"
              title={'누가 무엇을 준비하는지\n처음부터 명확하게.'}
              desc="병원은 정확한 진료 정보와 검수에 집중하고, KBP는 정보 구조·다국어 콘텐츠·개발과 운영을 담당합니다."
            />
            <div className="border-t border-slate-200">
              {processSteps.map((step, index) => (
                <article key={step.title} className="grid gap-4 border-b border-slate-200 py-7 md:grid-cols-[90px_minmax(190px,.7fr)_minmax(0,1.3fr)_110px] md:gap-6">
                  <span className="text-sm font-black text-[#3d77ec]">0{index + 1}</span>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="text-sm leading-7 text-slate-500">{step.desc}</p>
                  <time className="font-bold text-slate-600 md:text-right">{step.time}</time>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8ff] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            <SectionHeader
              eyebrow="Partner fit"
              title="모든 병원에 맞는 제안은 아닙니다."
              desc="실제 예약을 운영할 준비가 된 병원과 장기적인 파트너십을 만드는 것이 목적입니다."
            />
            <div className="grid border border-slate-200 bg-white md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="mb-6 text-2xl font-black text-[#3d77ec]">잘 맞는 병원</h3>
                <ul className="space-y-0">
                  {['외국인 환자 상담 또는 통역 응대가 가능한 병원', '피부과·성형외과 등 해외 환자 수요가 있는 진료과', '진료 정보와 가격을 투명하게 제공할 수 있는 병원', '예약 요청에 일정 시간 내 응답할 운영 담당자가 있는 병원'].map((item) => (
                    <li key={item} className="border-t border-slate-200 py-4 pl-6 text-sm leading-7 text-slate-600 before:-ml-6 before:mr-4 before:inline-block before:h-2 before:w-2 before:bg-[#3d77ec]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-200 p-8 md:border-l md:border-t-0 md:p-10">
                <h3 className="mb-6 text-2xl font-black">먼저 준비가 필요한 병원</h3>
                <ul>
                  {['외국어 상담과 환자 응대 절차가 아직 없는 경우', '의료진·시술·가격 정보를 외부에 제공하기 어려운 경우', '단기간 광고 노출만을 목적으로 입점을 검토하는 경우', '예약 확정과 변경을 관리할 담당자가 없는 경우'].map((item) => (
                    <li key={item} className="border-t border-slate-200 py-4 pl-6 text-sm leading-7 text-slate-600 before:-ml-6 before:mr-4 before:inline-block before:h-2 before:w-2 before:bg-slate-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[1180px] px-4 sm:px-6 gap-12 md:grid-cols-[.55fr_1.45fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">계약 전에<br />확인할 내용</h2>
            </div>
            <div className="border-t border-slate-200">
              {faqs.map((item, index) => (
                <FAQItem key={item.q} item={item} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />
              ))}
            </div>
          </div>
        </section>

        <section ref={formRef} id="inquiry" className="bg-[#111a2b] py-20 text-white md:py-28">
          <div className="mx-auto grid w-full max-w-[1180px] px-4 sm:px-6 gap-12 md:grid-cols-[.82fr_1.18fr]">
            <div>
              <Eyebrow light>Partner inquiry</Eyebrow>
              <h2 className="mb-5 text-4xl font-black leading-tight md:text-6xl">우리 병원에 맞는지<br />먼저 확인하세요.</h2>
              <p className="mb-8 text-lg leading-8 text-white/65">
                상담에서는 제작을 권유하기보다 진료 과목, 외국인 응대 환경과 예약 운영 가능성을 먼저 확인합니다.
              </p>
              <ul className="border-t border-white/15">
                {[
                  ['상담 소요', '약 20분'],
                  ['준비할 내용', '진료과 · 외국인 응대 현황'],
                  ['제작 시작', '적합성 확인 및 계약 후'],
                ].map(([label, value]) => (
                  <li key={label} className="flex justify-between gap-5 border-b border-white/10 py-4 text-sm text-white/60">
                    <span>{label}</span>
                    <strong className="text-right text-white">{value}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-white p-6 text-slate-950 md:p-9">
              <h3 className="mb-2 text-2xl font-black">입점 가능 여부 문의</h3>
              <p className="mb-7 text-sm leading-6 text-slate-500">필수 정보를 남겨주시면 담당자가 영업일 기준 1~2일 내 연락드립니다.</p>
              <CompactInquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0b1220] py-10 pb-28 text-white/55">
        <div className="mx-auto flex w-full max-w-[1180px] px-4 sm:px-6 items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
          <div>
            <div className="mb-3 font-black text-white">K-BEAUTYPASS PARTNER</div>
            <p className="text-xs leading-6">
              서울특별시 강남구 역삼로 114, 8층 8071호
              <br />
              대표자 하용헌 · 입점 문의 kbeautypass@gmail.com
            </p>
          </div>
          <p className="text-xs">© 2026 K-BeautyPass Inc. All rights reserved.</p>
        </div>
      </footer>

      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur transition-transform md:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <button type="button" onClick={scrollToForm} className="flex min-h-12 w-full items-center justify-center rounded bg-[#3d77ec] font-black text-white">
          입점 가능 여부 확인
        </button>
      </div>
    </div>
  );
}
