'use client';

import Link from 'next/link';
import { ArrowRight, Check, FileText, MousePointerClick, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnboardingCTA() {
  return (
    <section className="bg-brand-dark py-24 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-blue text-sm font-bold border border-white/20 mb-6">
                <Rocket size={16} />
                <span className="text-white">지금 바로 시작하세요</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                입점비 <span className="text-brand-blue">0원</span>,<br/>
                부담 없이 시작하는<br/>
                글로벌 비즈니스
             </h2>
             
             <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                초기 비용 부담은 덜고, 성공은 더하세요.<br/>
                매출이 발생할 때만 수수료가 부과되는 합리적인 시스템입니다.
             </p>

             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link href="/signup" className="px-8 py-4 bg-brand-blue text-white font-bold rounded-xl text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-brand-blue/50 flex items-center justify-center gap-2">
                    온라인 입점 신청하기 <ArrowRight size={20} />
                 </Link>
                 <div className="px-8 py-4 bg-white/5 text-gray-300 font-bold rounded-xl text-lg border border-white/10 flex items-center justify-center gap-2">
                    <Check size={20} className="text-green-400" /> 가입비/연회비 무료
                 </div>
             </div>
          </div>

          {/* Visual: Simplified Online Form Process */}
          <div className="lg:w-1/2 w-full max-w-lg">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-2xl relative"
             >
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-6 text-sm">
                    ✨ 5분 완성
                </div>

                <div className="space-y-6">
                    <div className="pb-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900">간편 입점 신청</h3>
                        <p className="text-xs text-gray-400">복잡한 서류 없이 온라인으로 신청하세요.</p>
                    </div>

                    {/* Step 1: Basic Info (Completed) */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-bold text-white text-sm shrink-0">
                            <Check size={16} />
                        </div>
                        <div className="flex-1 space-y-2 opacity-60">
                            <div className="text-xs font-bold text-gray-500">기본 정보</div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-9 w-full bg-gray-50 rounded border border-gray-200 flex items-center px-3 text-xs text-gray-600 font-medium">강남 아름다운 의원</div>
                                <div className="h-9 w-full bg-gray-50 rounded border border-gray-200 flex items-center px-3 text-xs text-gray-600 font-medium">010-1234-5678</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Verification (Active) */}
                    <div className="flex gap-4 relative">
                        {/* Progress Line */}
                        <div className="absolute top-8 left-4 bottom-[-20px] w-0.5 bg-gray-100 -z-10"></div>
                        
                        <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-lg shadow-brand-blue/30 ring-4 ring-brand-blue/10">
                            2
                        </div>
                        <div className="flex-1 space-y-3">
                             <div className="flex items-center justify-between">
                                 <div className="text-sm font-bold text-gray-900">사업자 번호 <span className="text-brand-blue text-xs font-normal">(*필수)</span></div>
                             </div>
                             
                             <div className="h-11 w-full bg-white rounded-xl border-2 border-brand-blue/20 ring-4 ring-brand-blue/5 flex items-center px-4 justify-between">
                                <span className="text-sm font-bold text-gray-800 tracking-widest">123 - 45 - 67890</span>
                                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                             </div>
                             <p className="text-[11px] text-gray-400 pl-1">
                                사업자 번호만 입력하면 나머지 정보는 자동으로 불러옵니다.
                             </p>
                        </div>
                    </div>

                    {/* Step 3: Manager Matching (Pending) */}
                    <div className="flex gap-4 opacity-40">
                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm shrink-0">3</div>
                         <div className="flex-1 space-y-2 pt-1">
                             <div className="text-xs font-bold text-gray-500">최종 승인 대기</div>
                             <div className="h-14 w-full bg-gray-50 rounded-lg border border-gray-200 border-dashed flex items-center justify-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                                <div className="h-2 w-20 bg-gray-200 rounded"></div>
                             </div>
                         </div>
                    </div>
                    
                    <div className="pt-4">
                        <div className="w-full h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer hover:bg-gray-800 transition-colors">
                            입점 신청 완료
                        </div>
                    </div>

                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
