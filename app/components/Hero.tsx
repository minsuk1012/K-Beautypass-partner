'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, User } from 'lucide-react';
import Link from 'next/link';
import BrowserFrame from './BrowserFrame';
import DashboardMock from './mocks/admin/DashboardMock';

interface HeroProps {
  customTitle?: string;
  customSubtitle?: string;
  customBadge?: string;
  customCta?: string;
}

export default function Hero({ customTitle, customSubtitle, customBadge, customCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-slate pt-32 pb-40">
      
      {/* Background Decor: Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Pop Gradient Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-pop mix-blend-multiply filter blur-[150px] opacity-15 animate-blob" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200 mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-200 mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Floating Background Elements (Flying Objects) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          
          {/* Floating Card 1: Revenue */}
          <motion.div 
             animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[20%] left-[10%] lg:left-[15%] bg-white p-4 rounded-2xl shadow-xl shadow-purple-500/10 border border-white/50 backdrop-blur-md hidden md:block"
          >
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <TrendingUp size={20}/>
                  </div>
                  <div>
                      <div className="text-xs text-gray-400 font-bold uppercase">매출 증가</div>
                      <div className="text-lg font-black text-brand-dark">+124%</div>
                  </div>
              </div>
          </motion.div>

          {/* Floating Card 2: Users */}
          <motion.div 
             animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute top-[30%] right-[10%] lg:right-[15%] bg-white p-3 rounded-2xl shadow-xl shadow-blue-500/10 border border-white/50 backdrop-blur-md hidden md:block z-0"
          >
               <div className="flex -space-x-3">
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                       <img src="/hero_avatar_1.png" className="w-full h-full object-cover" alt="User 1" />
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                       <img src="/hero_avatar_2.png" className="w-full h-full object-cover" alt="User 2" />
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                       <img src="/hero_avatar_3.png" className="w-full h-full object-cover" alt="User 3" />
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                       +4K
                   </div>
               </div>
          </motion.div>

          {/* Floating Card 3: Review */}
          <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-[20%] left-[5%] bg-white/80 p-4 rounded-xl shadow-lg border border-white/60 backdrop-blur-sm hidden lg:block"
          >
              <div className="flex gap-1 text-yellow-400 mb-1">
                  <Star size={12} fill="currentColor"/>
                  <Star size={12} fill="currentColor"/>
                  <Star size={12} fill="currentColor"/>
                  <Star size={12} fill="currentColor"/>
                  <Star size={12} fill="currentColor"/>
              </div>
              <div className="text-xs font-bold text-gray-700">"정말 편리해요!"</div>
          </motion.div>

      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-900 text-sm font-bold shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-red animate-pulse"></span>
            {customBadge || "AI 자동화 솔루션"}
          </div>
        </motion.div>

        {/* Massive Typography - Centered - Korean */}
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-gray-900 mb-8 leading-[1.1] word-keep-all"
        >
            {customTitle ? (
                <span dangerouslySetInnerHTML={{ __html: customTitle.replace(/\n/g, '<br/>') }} />
            ) : (
                <>
                글로벌 마케팅부터,<br className="hidden md:block"/>
                우리 병원의<br className="hidden md:block"/>
                <span className="relative inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                    압도적 성장
                    {/* Pop Highlight Underline */}
                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-purple-400/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                </span>
                </>
            )}
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed word-keep-all"
        >
            {customSubtitle ? (
                 <span dangerouslySetInnerHTML={{ __html: customSubtitle.replace(/\n/g, '<br/>') }} />
            ) : (
                <>
                글로벌 마케팅부터 예약 관리, 정산까지.<br/>
                <span className="text-gray-900 font-bold">K-BeautyPass</span>가 병원의 모든 운영 프로세스를 자동으로 처리합니다.
                </>
            )}
        </motion.p>

        {/* CTAs */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 w-full"
        >
            <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto px-12 py-5 rounded-full bg-gray-900 text-white font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
            >
                {customCta || "바로 입점신청"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="w-full sm:w-auto px-12 py-5 rounded-full bg-white border border-gray-200 text-gray-900 font-bold text-lg hover:border-gray-400 transition-all shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
            >
                 주요 기능 보기
            </button>
        </motion.div>

        {/* Centered Dashboard Mockup (Massive) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.2 }}
            className="relative w-full max-w-6xl mx-auto z-10"
        >
             {/* Main Browser Frame with Dashboard Mock */}
             <BrowserFrame url="admin.k-beautypass.com">
                 <DashboardMock />
             </BrowserFrame>
        </motion.div>

      </div>
    </section>
  );
}
