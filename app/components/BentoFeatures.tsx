'use client';

import { motion } from 'framer-motion';
import { Globe2, CreditCard, PlayCircle, BarChart3, ArrowUpRight } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="py-24 bg-brand-slate relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold tracking-wider text-sm uppercase">Why K-BeautyPass?</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            병원 성장을 위한<br/>
            가장 진보된 솔루션
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Feature 1: Global (Large - Span 2) - Premium Mesh Gradient */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 rounded-[2rem] relative overflow-hidden group text-white shadow-2xl shadow-brand-blue/20"
          >
             {/* Complex Mesh Gradient Background */}
             <div className="absolute inset-0 bg-[#0F172A]">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-brand-blue rounded-full blur-[120px] opacity-40 animate-blob mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[100%] bg-brand-blue-deep rounded-full blur-[100px] opacity-60 animate-blob animation-delay-4000 mix-blend-screen" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[60%] bg-brand-red rounded-full blur-[80px] opacity-20 animate-blob animation-delay-2000 mix-blend-overlay" />
                
                {/* Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
             </div>

             <div className="relative z-10 flex flex-col h-full justify-between p-8 sm:p-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium mb-5 shadow-inner shadow-white/10">
                        <Globe2 size={16} className="text-brand-blue-soft"/> Global Expansion
                    </div>
                    <h3 className="text-3xl font-bold mb-4 drop-shadow-md">전 세계 15개국 10만 명의<br/>잠재 고객을 만나세요</h3>
                    <p className="text-brand-blue-soft/90 max-w-md leading-relaxed font-medium">
                        자동 번역 시스템과 AI 챗봇이 언어 장벽을 허물어 드립니다.
                        별도의 해외 마케팅 팀 없이도 글로벌 환자를 유치할 수 있습니다.
                    </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all cursor-pointer">
                    입점 효과 확인하기 <ArrowUpRight size={20} />
                </div>
             </div>
          </motion.div>


          {/* Feature 2: Settlement (Tall - Span 1) - White Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-[2rem] bg-white border border-white/50 shadow-xl shadow-gray-200/50 p-8 relative overflow-hidden group"
          >
             <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 text-brand-blue">
                <BarChart3 size={28} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3">익일 자동 정산</h3>
             <p className="text-gray-500 text-sm leading-relaxed mb-8">
                복잡한 계산은 없습니다. 시술 완료 다음 날, 수수료를 제외한 금액이 정확하게 입금됩니다.
             </p>
             
             {/* Abstract Chart UI */}
             <div className="absolute bottom-0 left-0 right-0 h-32 px-6 flex items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-1/4 h-[40%] bg-gray-100 rounded-t-lg group-hover:bg-brand-blue-soft/50 transition-colors" />
                <div className="w-1/4 h-[70%] bg-gray-200 rounded-t-lg group-hover:bg-brand-blue-soft transition-colors" />
                <div className="w-1/4 h-[50%] bg-gray-100 rounded-t-lg group-hover:bg-brand-blue-soft/50 transition-colors" />
                <div className="w-1/4 h-[90%] bg-brand-blue rounded-t-lg shadow-lg shadow-brand-blue/30" />
             </div>
          </motion.div>


          {/* Feature 3: No-Show (Span 1) - White Card with Red Accent */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="rounded-[2rem] bg-white border border-white/50 shadow-xl shadow-gray-200/50 p-8"
          >
              <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
                 <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">노쇼 0% 도전</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                 선결제 예약금 제도로 무단 불참을 원천 차단합니다. 병원의 소중한 시간을 보호하세요.
              </p>
          </motion.div>


          {/* Feature 4: Shorts (Span 2) - Soft Red Gradient */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="md:col-span-2 rounded-[2rem] bg-gradient-to-br from-white to-brand-red-soft/20 border border-white/60 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-10 relative overflow-hidden shadow-xl shadow-brand-red/5"
          >
             <div className="flex-1 z-10">
                 <div className="inline-flex items-center gap-2 text-brand-red font-bold mb-4 uppercase tracking-wide text-xs">
                     <PlayCircle size={16} /> Viral Marketing
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">숏폼으로 증명하는<br/>압도적인 시술 효과</h3>
                 <p className="text-gray-500 mb-6 leading-relaxed">
                     정지된 사진보다 5배 높은 예약 전환율. <br/>원장님의 시술 노하우를 15초 영상으로 담아보세요.
                 </p>
                 <button className="text-sm font-bold text-brand-red underline decoration-brand-red/30 underline-offset-4 hover:decoration-brand-red transition-all">
                     성공 사례 영상 보기
                 </button>
             </div>
             
             <div className="flex-1 flex justify-center z-10">
                 {/* Simulate Mobile Frame */}
                 <div className="w-40 h-64 bg-gray-900 rounded-[1.5rem] border-4 border-gray-800 shadow-2xl overflow-hidden relative rotate-6 group-hover:rotate-0 transition-transform duration-500 group-hover:scale-105">
                     <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-600 font-bold">VIDEO</div>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/50">
                             <PlayCircle fill="white" size={20} className="ml-1"/>
                         </div>
                     </div>
                 </div>
             </div>

              {/* Decorative Red Blur */}
              <div className="absolute -left-20 top-0 w-64 h-64 bg-brand-red/10 rounded-full blur-[80px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
