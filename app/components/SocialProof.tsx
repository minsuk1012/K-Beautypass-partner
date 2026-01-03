'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const stats = [
  { label: '월간 예약 건수', value: '12,000+' },
  { label: '글로벌 환자 유치', value: '50,000+' },
  { label: '병원 파트너 만족도', value: '99.2%' },
];

const mockLogos = [
  "아름다운 피부과", "더라인 성형외과", "바른 치과", "예쁜얼굴 의원", "서울 클리닉",
  "밝은 안과", "미소 한의원", "The View Clinic", "K-Beauty Center", "Global Care"
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-white border-b border-gray-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
            <h3 className="text-lg font-bold text-gray-500 mb-6 flex items-center justify-center gap-2">
                <Building2 size={20} className="text-brand-blue"/>
                <span className="text-gray-900 font-black">120+</span> 파트너 병원과 함께합니다
            </h3>
            
            {/* Logo Grid (Mock) */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {mockLogos.map((logo, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-lg font-black text-gray-300 hover:text-brand-blue cursor-default select-none"
                    >
                        {logo}
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                    <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm font-bold text-gray-500">{stat.label}</div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}
