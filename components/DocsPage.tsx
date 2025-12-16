/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Calendar, DollarSign, CheckCircle, 
  MessageSquare, Settings, ChevronRight, Play, 
  Zap, Globe, LayoutDashboard, CreditCard, HelpCircle, User
} from 'lucide-react';

// --- Types ---

type DocId = 'reservation' | 'chat' | 'admin';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface DocCategory {
  id: DocId;
  title: string;
  icon: React.ElementType;
  sections: DocSection[];
}

// --- Visual Mock Components ---

const GuideVideo = ({ src, caption }: { src: string; caption: string }) => (
  <div className="mb-8">
    <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200 group">
      <video 
        src={src} 
        controls 
        className="w-full h-full object-contain bg-black"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
    <p className="mt-3 text-center text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
      <Play className="w-3 h-3" /> {caption}
    </p>
  </div>
);

const MockLogin = () => (
  <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-slate-200 p-8 my-8">
    <div className="flex justify-center mb-6">
       <div className="h-10 w-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
         <Settings className="w-6 h-6" />
       </div>
    </div>
    <div className="space-y-4">
      <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-slate-400 text-sm">admin@hospital.com</div>
      <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-slate-400 text-sm">••••••••</div>
      <div className="h-10 bg-brand-dark text-white rounded flex items-center justify-center font-bold text-sm shadow-md">로그인</div>
    </div>
  </div>
);

const MockDashboardHeader = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
    <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-6 text-sm font-medium text-slate-600 bg-slate-50/50">
       <span className="text-brand-blue font-bold border-b-2 border-brand-blue h-full flex items-center">Dashboard</span>
       <span className="h-full flex items-center">Reservations</span>
       <span className="h-full flex items-center">Settlement</span>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">오늘의 예약 (Today)</div>
          <div className="text-2xl font-bold text-slate-900">8 건</div>
       </div>
       <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="text-xs text-red-600 mb-1 font-bold">처리 대기중 (Pending)</div>
          <div className="text-2xl font-bold text-brand-red">3 건</div>
       </div>
       <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">이번 달 예상 매출</div>
          <div className="text-2xl font-bold text-slate-900">₩ 45,200,000</div>
       </div>
    </div>
  </div>
);

const MockFinancials = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 my-6">
    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
      <CreditCard className="w-4 h-4 text-slate-500" /> Payment Breakdown (결제 정보)
    </h4>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 bg-green-50 border border-green-100 p-4 rounded-lg">
        <div className="text-[10px] text-green-700 font-bold uppercase mb-1">Deposit (선결제 완료)</div>
        <div className="text-xl font-black text-green-800">₩ 150,000</div>
        <div className="text-[10px] text-green-600 mt-1">앱에서 결제됨</div>
      </div>
      <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg">
        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Remaining (현장 결제금)</div>
        <div className="text-xl font-black text-slate-800">₩ 1,350,000</div>
        <div className="text-[10px] text-slate-400 mt-1">병원에서 수납 필요</div>
      </div>
    </div>
  </div>
);

const MockSettlementList = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
    <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 border-b border-slate-100">
       <div>
         <div className="text-xs text-slate-500">지급 대기금 (Pending)</div>
         <div className="text-lg font-bold text-yellow-600">₩ 4,200,000</div>
       </div>
       <div>
         <div className="text-xs text-slate-500">지급 완료 (Completed)</div>
         <div className="text-lg font-bold text-green-600">₩ 12,500,000</div>
       </div>
    </div>
    <div className="divide-y divide-slate-50">
      <div className="flex justify-between items-center p-4 text-sm">
         <div>
           <div className="font-bold text-slate-800">Sarah J. (Rhinoplasty)</div>
           <div className="text-xs text-slate-400">2024. 10. 24 시술 완료</div>
         </div>
         <div className="text-right">
           <div className="font-bold">₩ 1,500,000</div>
           <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">정산 대기</span>
         </div>
      </div>
      <div className="flex justify-between items-center p-4 text-sm bg-slate-50/30">
         <div>
           <div className="font-bold text-slate-800">Mike T. (Botox)</div>
           <div className="text-xs text-slate-400">2024. 10. 22 시술 완료</div>
         </div>
         <div className="text-right">
           <div className="font-bold">₩ 300,000</div>
           <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">지급 완료</span>
         </div>
      </div>
    </div>
  </div>
);

const MockReport = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4 my-6">
    <div className="flex justify-between border-b border-slate-100 pb-4">
      <div className="font-bold text-slate-800">Medical Report #2024-821</div>
      <div className="text-xs bg-brand-lightblue text-brand-blue px-2 py-1 rounded font-bold">Translated</div>
    </div>
    <div className="space-y-2">
      <div className="text-xs text-slate-400 font-bold uppercase">Patient Complaint</div>
      <div className="p-3 bg-slate-50 rounded text-sm text-slate-700">
        "I want to fix my nose bridge line naturally..." <br/>
        <span className="text-brand-blue font-bold">→ "자연스러운 콧대 라인 교정 희망"</span>
      </div>
    </div>
    <div className="space-y-2">
      <div className="text-xs text-slate-400 font-bold uppercase">Medical Alert</div>
      <div className="flex gap-2">
          <span className="bg-red-50 text-brand-red px-2 py-1 rounded text-xs font-bold border border-red-100">Aspirin Allergy</span>
          <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-bold border border-orange-100">Hypertension</span>
      </div>
    </div>
  </div>
);

// --- Documentation Content ---

const DOCS_DATA: DocCategory[] = [
  {
    id: 'reservation',
    title: '플랫폼 예약 (Platform)',
    icon: Calendar,
    sections: [
      {
        id: 'overview',
        title: '예약 시스템 개요',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              K-Beauty Pass의 예약 시스템은 <strong>노쇼(No-Show) 방지</strong>에 최적화되어 있습니다. 
              환자가 10%의 보증금을 결제해야만 병원 캘린더에 예약이 확정됩니다. 아래 영상에서 일반적인 예약 과정을 확인해보세요.
            </p>
            <GuideVideo src="/reservation.mp4" caption="일반 고객 예약 프로세스 시연" />
          </>
        )
      },
      {
        id: 'ai-report',
        title: 'AI 사전 문진 리포트',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              환자가 내원하기 전, 12개국 언어로 수집된 문진 데이터를 
              <strong>한국어 의료 용어</strong>로 완벽하게 번역하여 제공합니다.
              환자의 알레르기, 기저질환, 시술 희망 부위를 미리 파악하세요.
            </p>
            <MockReport />
          </>
        )
      }
    ]
  },
  {
    id: 'chat',
    title: 'AI 채팅 (Chat)',
    icon: MessageSquare,
    sections: [
      {
        id: 'translation',
        title: '실시간 번역 채팅',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              별도의 통역 코디네이터 없이도 환자와 직접 소통할 수 있습니다.
              병원에서 한국어로 입력하면, 환자의 모국어(영어, 중문, 일문 등)로 
              실시간 번역되어 전송됩니다.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
               <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 text-sm shadow-sm self-start">
                    <div className="text-xs text-slate-400 mb-1">Patient (Translated)</div>
                    수술 후 붓기는 보통 며칠이나 가나요?
                  </div>
                  <div className="bg-brand-blue text-white p-3 rounded-lg rounded-tr-none text-sm shadow-sm self-end text-right">
                    <div className="text-xs text-blue-200 mb-1">Hospital (Original)</div>
                    개인차는 있지만 보통 3~5일 정도면 큰 붓기는 가라앉습니다.
                  </div>
               </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: 'admin',
    title: '관리자 페이지 사용법',
    icon: Settings,
    sections: [
      {
        id: 'getting-started',
        title: '1. 파트너 센터 접속 (Getting Started)',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              파트너 센터는 병원 운영에 필요한 모든 기능을 제공하는 관리자 전용 웹사이트입니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
              <li><strong>접속 주소:</strong> <span className="text-brand-blue underline cursor-pointer">https://admin.k-beautypass.com</span></li>
              <li><strong>로그인:</strong> 발급해드린 관리자 계정(이메일)과 비밀번호로 로그인하세요.</li>
            </ul>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
               <div className="text-xs text-slate-500 font-bold mb-2 text-center uppercase tracking-wide">Login Screen Preview</div>
               <MockLogin />
            </div>
          </>
        )
      },
      {
        id: 'dashboard',
        title: '2. 대시보드 (Dashboard)',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              로그인 후 처음 만나는 화면입니다. 병원의 현재 운영 현황을 한눈에 파악할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
               <li><strong>주요 지표:</strong> 오늘의 예약 건수, 처리 대기 중인 예약, 이달의 예상 매출액 확인.</li>
               <li><strong>빠른 이동:</strong> '예약 관리', '정산 관리' 등 자주 쓰는 메뉴로 바로 이동.</li>
            </ul>
            <MockDashboardHeader />
          </>
        )
      },
      {
        id: 'reservation-mgmt',
        title: '3. 예약 관리 (Reservation Management)',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              고객의 시술 예약을 접수하고 확정하는 단계입니다. 가장 빈번하게 사용하시게 될 핵심 기능입니다.
            </p>
            
            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">3.1 예약 확인 및 확정</h3>
            <p className="text-slate-600 text-sm mb-4">
              고객이 예약을 신청하면 <span className="text-brand-red font-bold">[대기중 (Pending)]</span> 상태로 접수됩니다.
              예약 상세 페이지에서 고객 정보를 검토한 후 <strong>[Confirm]</strong> 버튼을 눌러 확정하세요.
              관리자가 승인하는 즉시 고객에게 예약 확정 알림이 발송됩니다.
            </p>
            <GuideVideo src="/admin_reservation.mp4" caption="관리자 예약 확정 및 관리 방법" />

            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">3.2 환자 정보 상세 확인</h3>
            <p className="text-slate-600 text-sm mb-4">
               <strong>Payment</strong> 탭에서는 고객이 앱에서 선결제한 예약금(Deposit)과 병원에서 받아야 할 현장 결제금(Remaining)을 명확히 구분해 줍니다.
            </p>
            <MockFinancials />
          </>
        )
      },
      {
        id: 'settlement',
        title: '4. 정산 및 매출 관리 (Settlement)',
        content: (
          <>
            <p className="text-slate-600 mb-4">
               K-Beautypass를 통해 발생한 매출과 정산 예정 금액을 투명하게 확인합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
               <li><strong>지급 대기금:</strong> 시술은 완료되었으나 아직 정산 입금 전인 금액입니다.</li>
               <li><strong>총 수수료 수익:</strong> 플랫폼 이용 수수료를 제외한 병원의 순수익을 계산합니다.</li>
               <li><strong>상태값:</strong> 정산 대기 (노란색) → 지급 완료 (초록색)</li>
            </ul>
            <MockSettlementList />
          </>
        )
      },
      {
        id: 'product',
        title: '5. 시술 상품 관리 (Product)',
        content: (
          <>
            <p className="text-slate-600 mb-4">
               병원의 시술 정보를 관리하고 가격을 수정합니다. 
               각 시술의 설명, 전후 사진, 시술 시간 등을 업데이트하여 고객에게 매력적으로 보이게 만듭니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-500">
               * 이벤트 가격이나 변동된 시술 가격을 실시간으로 반영할 수 있습니다.
            </div>
          </>
        )
      },
      {
        id: 'help',
        title: '🆘 도움이 필요하신가요?',
        content: (
          <div className="bg-brand-lightblue/10 border border-brand-lightblue/30 rounded-xl p-6">
             <p className="text-slate-700 mb-4 font-medium">
               파트너 센터 이용 중 문제가 발생하거나 궁금한 점이 있다면 언제든 파트너 지원팀으로 연락해 주세요.
             </p>
             <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-20 font-bold text-slate-500">이메일</div>
                   <div className="text-brand-blue underline">partner@k-beautypass.com</div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-20 font-bold text-slate-500">문의 전화</div>
                   <div className="text-slate-800">02-1234-5678 (평일 10:00 - 18:00)</div>
                </div>
             </div>
          </div>
        )
      }
    ]
  }
];

// --- Main Component ---

const DocsPage: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<DocId>('reservation');
  const activeDoc = DOCS_DATA.find(d => d.id === activeDocId) || DOCS_DATA[0];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          
          {/* Left Sidebar: Document Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit">
            <div className="mb-6 px-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Guide Book</h2>
              <div className="font-heading font-bold text-xl text-slate-900">사용자 가이드</div>
            </div>
            <nav className="space-y-1">
              {DOCS_DATA.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveDocId(doc.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeDocId === doc.id 
                      ? 'bg-brand-lightblue/20 text-brand-blue shadow-sm ring-1 ring-brand-lightblue/50' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <doc.icon className={`w-5 h-5 ${activeDocId === doc.id ? 'text-brand-blue' : 'text-slate-400'}`} />
                  {doc.title}
                  {activeDocId === doc.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              ))}
            </nav>

            <div className="mt-8 px-4 py-4 bg-slate-50 rounded-xl border border-slate-100 hidden lg:block">
              <p className="text-xs text-slate-500 mb-2">기술 지원이 필요하신가요?</p>
              <button className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> 고객센터 연결
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDocId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <header className="mb-10 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-2 text-sm text-brand-blue font-medium mb-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Docs
                    <span className="text-slate-300">/</span>
                    {activeDoc.title}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                    {activeDoc.title}
                  </h1>
                </header>

                <div className="space-y-16">
                  {activeDoc.sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-32">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2 group cursor-pointer" onClick={() => scrollToSection(section.id)}>
                        {section.title}
                        <span className="opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity text-sm">#</span>
                      </h2>
                      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Right Sidebar: Table of Contents (On this page) */}
          <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 h-fit pl-8 border-l border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              On this page
            </h3>
            <ul className="space-y-3 relative">
              {/* Active Indicator Line (Simplified) */}
              <div className="absolute left-[-33px] top-0 bottom-0 w-0.5 bg-slate-100"></div>
              
              {activeDoc.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-slate-500 hover:text-brand-blue hover:underline text-left transition-colors block w-full truncate"
                  >
                    {section.title.split('(')[0]} {/* Clean title for sidebar */}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default DocsPage;