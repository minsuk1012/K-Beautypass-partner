'use client';

import Hero from './components/Hero';
import FeatureAlternating from './components/FeatureAlternating';
import FeatureCentered from './components/FeatureCentered';
import FeatureShowcaseAsymmetric from './components/FeatureShowcaseAsymmetric';
import BrowserFrame from './components/BrowserFrame';
import VisitorTrends from './components/VisitorTrends';
import MarketingPackage from './components/MarketingPackage';
import OnboardingCTA from './components/OnboardingCTA';

// Mock UIs
import PreConsultationMock from './components/mocks/user/PreConsultationMock';
import SettlementMock from './components/mocks/admin/SettlementMock';
import SpecialOfferMock from './components/mocks/SpecialOfferMock';
import AiChatMock from './components/mocks/user/AiChatMock';
import PhoneFrame from './components/PhoneFrame';

import FAQ from './components/FAQ';

import Link from 'next/link';

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white text-gray-900 overflow-x-hidden selection:bg-brand-blue/30 selection:text-brand-navy">

      {/* Header (Minimal) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 absolute left-4 sm:left-6 lg:left-8">
                <img src="/favicon.svg" alt="K-BeautyPass" className="w-7 h-7" />
                <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:inline">KBEAUTYPASS</span>
                <span className="px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold hidden sm:inline">파트너</span>
            </Link>
            <nav className="flex items-center gap-6 md:gap-8 text-sm font-bold text-gray-500">
                <button onClick={() => scrollTo('market')} className="hover:text-brand-navy transition-colors cursor-pointer">시장현황</button>
                <button onClick={() => scrollTo('marketing')} className="hover:text-brand-navy transition-colors cursor-pointer">마케팅</button>
                <button onClick={() => scrollTo('features')} className="hover:text-brand-navy transition-colors cursor-pointer">주요 기능</button>
                <button onClick={() => scrollTo('faq')} className="hover:text-brand-navy transition-colors cursor-pointer hidden sm:block">FAQ</button>
                <button onClick={() => scrollTo('contact')} className="hover:text-brand-navy transition-colors cursor-pointer hidden sm:block">문의</button>
            </nav>
        </div>
      </header>

      <main>
        {/* 1. Hero Section (Centered & Browser Frame) */}
        <Hero />

        {/* Visitor Trends Section */}
        <VisitorTrends />

        {/* Marketing Package (Replaces Social Proof) */}
        <MarketingPackage />
        
        {/* 2. Feature Sections (Diverse Layouts) */}
        <div id="features" className="bg-white relative z-20 overflow-hidden">
           
           {/* Global Unified Background Gradient */}
           <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-[0%] left-[-10%] w-[60%] h-[40%] bg-purple-100/30 rounded-full blur-[120px] mix-blend-multiply" />
               <div className="absolute top-[30%] right-[-20%] w-[70%] h-[50%] bg-blue-100/30 rounded-full blur-[120px] mix-blend-multiply" />
               <div className="absolute bottom-[0%] left-[10%] w-[60%] h-[40%] bg-pink-100/30 rounded-full blur-[120px] mix-blend-multiply" />
           </div>
           
           {/* Feature 1: AI Chat & Recommendation (Classic Split) */}
           <FeatureAlternating
              badge="AI 컨시어지"
              title={"무엇이든 물어보세요,\nAI가 즉시 추천합니다."}
              description={"증상만 말하면 AI가 최적의 시술을 추천하고,\n예약 후 상담까지 실시간 통번역 채팅으로 매끄럽게 연결합니다."}
              features={[
                  "증상별 맞춤 시술 AI 추천",
                  "실시간 예약 상담 자동 번역",
                  "시술 전 주의사항 자동 안내"
              ]}
              visual={
                  <BrowserFrame url="k-beautypass.com/chat">
                      <AiChatMock />
                  </BrowserFrame>
              }
           />



           {/* Feature 2: Efficiency (Alternating - Reversed) */}
           <FeatureAlternating
              reversed
              badge="스마트 문진"
              title={"환자가 도착하기 전,\n모든 준비는 끝납니다."}
              description={"12개국어 자동 번역 문진표로 언어 장벽을 없애고,\n사전 의료 정보를 완벽하게 파악하세요."}
              features={[
                  "12개국어 자동 번역 지원",
                  "사전 의료 정보 완벽 파악",
                  "모바일 최적화 비대면 문진"
              ]}
              visual={
                  <div className="w-full flex items-center justify-center">
                    <div className="transform hover:scale-[1.02] transition-transform duration-500">
                      <PhoneFrame>
                        <PreConsultationMock />
                      </PhoneFrame>
                    </div>
                  </div>
              }
           />

           {/* Feature 3: Marketing (Asymmetric Showcase - Left) */}
           <FeatureShowcaseAsymmetric
              badge="글로벌 마케팅"
              title={"대행사 없이,\n전 세계 환자를 만나세요."}
              description={"복잡한 대행 절차 없이 숏폼 영상 하나로\n수백만 명의 글로벌 잠재 고객에게 도달합니다."}
              features={[
                  "글로벌 유저 직접 노출",
                  "실시간 마케팅 성과 분석",
                  "검증된 환자 리뷰 시스템"
              ]}
              visual={
                <SpecialOfferMock />
              }
           />

           {/* Feature 4: Settlement (Asymmetric Showcase - Right) */}
           <FeatureShowcaseAsymmetric
              reversed
              badge="자동 정산"
              title={"수익 관리,\n더 이상 고민하지 마세요."}
              description={"투명한 실시간 매출 리포트와 자동 정산 시스템으로\n진료에만 집중할 수 있는 환경을 만듭니다."}
              features={[
                  "실시간 매출 트래킹",
                  "월별 자동 정산 리포트",
                  "글로벌 결제 완벽 지원"
              ]}
              visual={
                <SettlementMock />
              }
           />

        </div>

        {/* 3. FAQ Section */}
        <FAQ />

        {/* 4. Onboarding CTA */}
        <OnboardingCTA />

      </main>

      {/* Footer (Simplified for this style) */}
      <footer id="contact" className="bg-white border-t border-gray-100 pt-12 pb-12 scroll-mt-20">
          <div className="container mx-auto px-4 text-center">
              <div className="text-gray-500 text-sm space-y-2 mb-8">
                  <p>서울특별시 강남구 역삼로 114, 8층 8071호</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                      <span>입점 문의: kbeautypass@gmail.com</span>
                      <span className="w-px h-3 bg-gray-300 my-auto hidden sm:block"></span>
                      <span>대표자: 하용헌</span>
                  </div>
              </div>
              <div className="text-gray-400 text-xs">
                  © 2025 K-BeautyPass Inc. All rights reserved.
              </div>
          </div>
      </footer>
    </div>
  );
}
