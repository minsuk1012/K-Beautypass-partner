'use client';

import { motion } from 'framer-motion';
import { Megaphone, Users, CheckCircle2, Gift, PenTool } from 'lucide-react';

export default function MarketingPackage() {
  return (
    <section id="marketing" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-wider text-sm uppercase mb-2 block">Special Offer</span>
            <h2 className="text-4xl font-black text-gray-900 mb-6">초기 환자 유입을 위한<br/>집중 마케팅 패키지</h2>
            <p className="text-xl text-gray-500">입점 초기, 확실한 브랜드 인지도 확보를 위해 K-BeautyPass가 지원합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Card 1: Main Banner */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-brand-dark to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
            >
                <div className="absolute top-0 right-0 bg-white/10 w-64 h-64 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                        <Megaphone className="text-brand-blue" size={24} />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold mb-4 border border-brand-blue/30">
                        입점 후 1개월
                    </div>
                    <h3 className="text-2xl font-bold mb-4">메인 배너 노출</h3>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        가장 트래픽이 높은 앱 메인 페이지 상단에 파트너 병원의 <span className="text-white font-bold">단독 이벤트 배너를 1개월간 노출</span>하여 브랜드 인지도를 높입니다.
                    </p>
                    
                    {/* Visual Mock of Banner */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-full h-2 bg-white/10 rounded-full"></div>
                             <div className="w-8 h-8 rounded-full bg-white/20 shrink-0"></div>
                        </div>
                        <div className="w-full h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-black/10"></div>
                             <span className="relative font-bold text-sm">Main Event Banner</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Card 2: Review Group */}
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden shadow-lg"
            >
                 <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                    <Users size={24} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mb-4">
                    선택형 프로그램
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">소규모 체험단 / 리뷰 유도</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                    검증된 마이크로 인플루언서(체험단)를 매칭하여 <span className="text-gray-900 font-bold">신뢰도 높은 초기 시술 리뷰 콘텐츠</span>를 빠르게 확보합니다.
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">U1</div>
                        <div className="flex-1">
                            <div className="h-2 w-24 bg-gray-200 rounded mb-1"></div>
                            <div className="h-2 w-16 bg-gray-100 rounded"></div>
                        </div>
                        <div className="text-yellow-400 text-xs">★★★★★</div>
                    </div>
                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">U2</div>
                        <div className="flex-1">
                            <div className="h-2 w-28 bg-gray-200 rounded mb-1"></div>
                            <div className="h-2 w-20 bg-gray-100 rounded"></div>
                        </div>
                         <div className="text-yellow-400 text-xs">★★★★★</div>
                    </div>
                </div>
            </motion.div>
        
        </div>

        {/* Conditions Box */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-brand-blue" size={20}/>
                진행 조건 및 방식
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-brand-blue">
                        <Gift size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 mb-1">병원 제공</div>
                        <p className="text-sm text-gray-600">체험단을 위한 무료 시술 (필수)</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-purple-600">
                        <PenTool size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 mb-1">체험단 이행</div>
                        <p className="text-sm text-gray-600">고퀄리티 SNS 콘텐츠 제작 및 앱 내 리뷰 작성</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
