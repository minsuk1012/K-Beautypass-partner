'use client';

import { motion } from 'framer-motion';
import { Globe2, CreditCard, PlayCircle, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Globe2,
    title: "언어 장벽 없는 글로벌 환자 유치",
    desc: "AI 번역과 챗봇이 다국어 응대를 대신합니다. 코디네이터 채용 부담 없이 전 세계 환자를 맞이하세요.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: CreditCard,
    title: "노쇼(No-Show) 0% 도전",
    desc: "확실한 선결제 예약금 시스템과 자동 위약금 정책으로 병원의 소중한 진료 시간을 보호합니다.",
    color: "text-brand-purple",
    bg: "bg-brand-purple-50"
  },
  {
    icon: PlayCircle,
    title: "숏폼으로 완성되는 바이럴",
    desc: "백 마디 말보다 강력한 시술 영상을 업로드하세요. 영상을 보던 환자가 버튼 하나로 바로 예약합니다.",
    color: "text-brand-pink",
    bg: "bg-pink-50"
  },
  {
    icon: BarChart3,
    title: "투명하고 간편한 자동 정산",
    desc: "매일 아침 도착하는 정산 리포트. 복잡한 엑셀 작업 없이 시술 완료 즉시 정산 금액이 집계됩니다.",
    color: "text-brand-mint",
    bg: "bg-teal-50"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-brand-purple tracking-wide uppercase mb-3">Key Features</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            병원 운영에 필요한 <br className="hidden sm:block" />
            모든 기능을 하나로 담았습니다.
          </h3>
          <p className="text-lg text-gray-500">
            K-BeautyPass는 단순한 예약 시스템이 아닙니다. 입점과 동시에 시작되는 글로벌 성장을 경험해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-purple transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
