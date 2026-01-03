'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: "500+", label: "제휴 병원", sub: "국내 최정상급 클리닉" },
  { value: "120K", label: "누적 거래액", sub: "(단위: 억 원)" },
  { value: "98%", label: "재계약율", sub: "파트너 만족도" },
  { value: "24/7", label: "글로벌 지원", sub: "3개국어 실시간 응대" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-brand-blue-deep text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-blue blur-[120px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-brand-red blur-[120px] rounded-full mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.5 }}
               className="text-center pt-8 md:pt-0 px-4"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-brand-blue-soft font-medium mb-1 tracking-wide">{stat.label}</div>
              <div className="text-xs text-brand-blue-soft/60">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
