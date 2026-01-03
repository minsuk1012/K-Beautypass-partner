'use client';

import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export default function ConsultationEfficiency() {
  return (
    <section className="py-24 bg-brand-navy overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue-deep/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue-soft font-bold text-sm mb-6 uppercase tracking-wider">
                Smart Consultation System
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.2] tracking-tight">
                반복되는 문진과 통역,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-white">AI로 85% 단축</span>하세요.
            </h2>
        </div>

        {/* Visual Time Comparison */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-16 h-[500px] md:h-[450px]">
            
            {/* 1. Traditional (Dark Grey Stick) */}
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "100%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full md:w-56 bg-brand-navy-light rounded-t-3xl relative group flex flex-col justify-end overflow-hidden border border-white/5"
            >
                 <div className="p-6 text-center z-10">
                    <div className="text-gray-500 font-bold mb-1 uppercase text-sm tracking-wider">Traditional</div>
                    <div className="text-5xl font-black text-gray-600 mb-6">40<span className="text-2xl">m</span></div>
                    
                    <div className="text-xs text-gray-400 space-y-2 text-left bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                        <div className="flex justify-between items-center"><span className="w-2 h-2 rounded-full bg-gray-600"/><span>대기/접수 10'</span></div>
                        <div className="flex justify-between items-center"><span className="w-2 h-2 rounded-full bg-gray-600"/><span>통역 호출 5'</span></div>
                        <div className="flex justify-between items-center"><span className="w-2 h-2 rounded-full bg-gray-600"/><span>수기 문진 15'</span></div>
                    </div>
                 </div>
            </motion.div>

            {/* VS Badge */}
            <div className="text-gray-700 font-black text-3xl pb-10 italic opacity-50">VS</div>

            {/* 2. Smart (Neon Blue Stick) */}
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "15%", opacity: 1 }} // 6 min is approx 15% of 40
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="w-full md:w-56 bg-brand-blue rounded-t-3xl relative shadow-[0_0_60px_rgba(85,143,255,0.3)] flex flex-col justify-end group cursor-pointer hover:bg-brand-blue-soft transition-colors"
            >
                {/* Floating Badge */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: -90 }} // Float above
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-[240px] text-center"
                 >
                    <div className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-3">6<span className="text-4xl text-brand-blue-soft">m</span></div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded-full animate-bounce shadow-lg shadow-brand-red/40 border border-white/20">
                        <Sparkles size={12} fill="white"/> 압도적 효율 (85% 절감)
                    </div>
                 </motion.div>

                 <div className="p-4 text-center">
                    <div className="text-white font-bold text-sm tracking-widest">K-BeautyPass</div>
                 </div>
            </motion.div>
        </div>

        <p className="text-center text-gray-400 mt-16 max-w-lg mx-auto leading-relaxed text-lg">
            환자는 내원 전 <span className="text-white font-bold border-b border-brand-blue">모바일로 문진</span>을 완료합니다.<br/>
            원장님은 <span className="text-white font-bold border-b border-brand-blue">자동 번역된 차트</span>만 확인하세요.
        </p>

      </div>
    </section>
  );
}
