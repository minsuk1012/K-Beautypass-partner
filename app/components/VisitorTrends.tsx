'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';

const monthlyData = [
  { month: '24.11', visitors: 1361076, label: '11월' },
  { month: '24.12', visitors: 1270863, label: '12월' },
  { month: '25.01', visitors: 1117243, label: '1월' },
  { month: '25.02', visitors: 1138408, label: '2월' },
  { month: '25.03', visitors: 1614596, label: '3월', highlight: true },
  { month: '25.04', visitors: 1707113, label: '4월' },
  { month: '25.05', visitors: 1629387, label: '5월' },
  { month: '25.06', visitors: 1619220, label: '6월' },
  { month: '25.07', visitors: 1733199, label: '7월' },
  { month: '25.08', visitors: 1820332, label: '8월', peak: true },
  { month: '25.09', visitors: 1702813, label: '9월' },
  { month: '25.10', visitors: 1739020, label: '10월' },
];

const countryData = [
  { rank: 1, country: '중국', flag: '🇨🇳', visitors: 5313896, color: 'from-red-500 to-orange-500', description: '의료관광 핵심 수요처' },
  { rank: 2, country: '일본', flag: '🇯🇵', visitors: 3577043, color: 'from-pink-500 to-rose-500', description: '높은 재방문율' },
  { rank: 3, country: '대만', flag: '🇹🇼', visitors: 1807323, color: 'from-blue-500 to-cyan-500', description: 'K-뷰티 관심도 최상위' },
  { rank: 4, country: '미국', flag: '🇺🇸', visitors: 1449861, color: 'from-indigo-500 to-blue-500', description: '교포 및 서구권 수요' },
  { rank: 5, country: '홍콩', flag: '🇭🇰', visitors: 610711, color: 'from-purple-500 to-pink-500', description: '고부가 가치 시술 선호' },
];

const maxVisitors = Math.max(...monthlyData.map(d => d.visitors));

export default function VisitorTrends() {
  return (
    <section id="market" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-brand-blue font-bold tracking-wider text-sm uppercase mb-4">
              <Globe size={16} />
              Market Insight
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              방한 외래객 추이,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">
                역대급 회복세
              </span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              2025년 8월, 월 <span className="text-gray-900 font-bold">182만 명</span> 돌파.<br/>
              지금이 글로벌 의료관광 시장 진출의 최적기입니다.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <TrendingUp size={14} />
              연중 최고점
            </div>
            <div className="text-3xl font-black">182만</div>
            <div className="text-gray-400 text-sm">2025년 8월</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <ArrowUpRight size={14} className="text-green-500" />
              3월 대비 증가
            </div>
            <div className="text-3xl font-black text-gray-900">+47.6만</div>
            <div className="text-gray-400 text-sm">반등 시작점 대비</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
              <Users size={14} />
              중화권 방문객
            </div>
            <div className="text-3xl font-black text-gray-900">773만</div>
            <div className="text-gray-400 text-sm">중국+대만+홍콩</div>
          </div>
          <div className="bg-gradient-to-br from-brand-blue to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Sparkles size={14} />
              골든타임
            </div>
            <div className="text-3xl font-black">NOW</div>
            <div className="text-white/70 text-sm">2026 상반기 진출 적기</div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">월별 방한 외래객 추이</h3>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <Calendar size={14} />
                2024.11 ~ 2025.10 (한국관광공사)
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-gray-900" />
                <span className="text-gray-600">월별 방문객</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-brand-blue" />
                <span className="text-gray-600">연중 최고점</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-400">
              <span>180만</span>
              <span>150만</span>
              <span>120만</span>
              <span>90만</span>
            </div>

            {/* Chart */}
            <div className="ml-14 flex items-end justify-between gap-2 h-64">
              {monthlyData.map((data, index) => {
                const height = (data.visitors / maxVisitors) * 100;
                return (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex-1 flex flex-col items-center group"
                  >
                    <div className="relative w-full">
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                        <div className="bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap">
                          {(data.visitors / 10000).toFixed(1)}만 명
                          {data.peak && <span className="ml-1 text-yellow-400">Peak!</span>}
                        </div>
                        <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                      </div>

                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 ${
                          data.peak
                            ? 'bg-gradient-to-t from-brand-blue to-purple-500'
                            : data.highlight
                              ? 'bg-gradient-to-t from-green-500 to-emerald-400'
                              : 'bg-gray-900'
                        }`}
                        style={{ height: `${height * 2.56}px` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="ml-14 flex justify-between mt-3">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 text-center">
                  <span className={`text-xs ${data.peak ? 'text-brand-blue font-bold' : 'text-gray-400'}`}>
                    {data.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Country Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">국적별 방한 외래객 TOP 5</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {countryData.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative rounded-2xl p-5 text-center overflow-hidden ${
                  index === 0
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white col-span-2 md:col-span-1'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {index === 0 && (
                  <div className="absolute top-2 right-2">
                    <span className="text-xs font-bold bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full">1위</span>
                  </div>
                )}
                <div className="text-4xl mb-2">{country.flag}</div>
                <div className={`text-lg font-bold mb-1 ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                  {country.country}
                </div>
                <div className={`text-2xl font-black mb-1 ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                  {(country.visitors / 10000).toFixed(0)}만
                </div>
                <div className={`text-xs ${index === 0 ? 'text-gray-400' : 'text-gray-500'}`}>
                  {country.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insight Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-brand-blue/10 to-purple-500/10 rounded-2xl p-8 border border-brand-blue/20"
        >
          <div className="flex items-start gap-4">
            <div className="bg-brand-blue/20 p-3 rounded-xl text-brand-blue shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">시장 인사이트</h4>
              <p className="text-gray-600 leading-relaxed">
                2025년 3월을 기점으로 월 <span className="font-bold text-gray-900">160만 명 이상</span>의 안정적인 모객이 이루어지고 있으며,
                중화권(중국·대만·홍콩) 방문객이 전체의 <span className="font-bold text-gray-900">과반수</span>를 차지합니다.
                현재 상승 추세가 지속되고 있어 <span className="font-bold text-brand-blue">2026년 상반기가 글로벌 의료관광 시장 진출의 최적기</span>입니다.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
