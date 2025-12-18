'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Zap, ShieldCheck, Stethoscope, 
  Calendar, CheckCircle, 
  TrendingUp, ArrowRight, FileText, MessageSquare, User
} from 'lucide-react';
import Link from 'next/link';
import { VitalConnectFloatingButton } from './VitalConnectFloatingButton';

export const LandingPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 bg-brand-lightblue text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-blue-100">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"/>
              B2B 전용 파트너십 제안
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              전 세계 환자가 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">당신의 병원을</span> <br/>
              기다립니다.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              언어 장벽 없이, 노쇼 걱정 없이. <br/>
              <span className="font-bold text-slate-800">KBEAUTYPASS</span>는 AI 기술로 진성 외국인 환자를 병원까지 안전하게 연결합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/consultation"
                className="bg-brand-blue text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-600 transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 group"
              >
                입점 신청하기 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/docs"
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> 가이드 보기
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Gradient Blob based on brand colors */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-lightblue to-brand-pink rounded-[40px] rotate-3 blur-3xl opacity-60" />
            
            <div className="relative w-full h-auto min-h-[450px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col font-sans">
                {/* Header */}
                <div className="bg-white border-b border-slate-100 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="font-heading font-bold text-slate-900 text-lg md:text-xl">Sarah Jenkins</div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                           🇺🇸 USA <span className="text-slate-300">|</span> 2025. 05. 20 Visits
                        </div>
                     </div>
                  </div>
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                      Booking Confirmed
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/30">
                   
                   {/* Travel Info */}
                   <div className="flex-1 p-6 space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                         <Globe className="w-4 h-4 text-brand-blue" />
                         <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Travel Details</h4>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                         <div className="flex items-center justify-between mb-2">
                             <div className="text-[10px] text-slate-400 font-bold uppercase">Estimated Budget</div>
                             <div className="text-brand-blue text-xs font-bold">$2k - $5k</div>
                         </div>
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-brand-blue rounded-full"></div>
                         </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                         <div className="bg-brand-pink/10 p-2 rounded-lg text-brand-pink">
                            <Calendar className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Stay Duration</div>
                            <div className="text-slate-900 font-bold">7 Days</div>
                         </div>
                      </div>
                   </div>

                   {/* Medical Info */}
                   <div className="flex-1 p-6 space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                         <Stethoscope className="w-4 h-4 text-brand-red" />
                         <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Medical Info</h4>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                         <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center font-bold text-xs shrink-0">!</div>
                             <div>
                                <div className="text-xs text-slate-400 font-bold uppercase">Allergies</div>
                                <div className="font-bold text-slate-900">Aspirin</div>
                             </div>
                         </div>
                         <div className="w-full h-px bg-slate-100" />
                         <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center font-bold text-xs shrink-0">Rx</div>
                             <div>
                                <div className="text-xs text-slate-400 font-bold uppercase">History</div>
                                <div className="font-bold text-slate-900">Botox (6mo ago)</div>
                             </div>
                         </div>
                      </div>
                      
                      <div className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-lg flex items-center gap-2">
                         <Zap className="w-4 h-4 text-brand-blue fill-current" />
                         <span className="text-xs text-brand-blue font-bold">AI Translated Report Included</span>
                      </div>
                   </div>
                </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-xs"
            >
              <div className="w-10 h-10 bg-brand-lightblue rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                  <div className="text-sm font-bold text-slate-800">노쇼 걱정 ZERO</div>
                  <div className="text-xs text-slate-500">선결제 시스템 보호</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* PAIN POINTS SECTION */}
      <section id="problems" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              병원장님, 외국인 환자 유치에 <br/>
              <span className="text-slate-400">이런 어려움이 있지 않으신가요?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: '언어 장벽과 긴 상담', desc: '영어로 시술 설명하느라 진료 시간이 2배로 길어지고, 뉘앙스 전달이 어렵습니다.' },
              { icon: Calendar, title: '빈번한 노쇼 (No-Show)', desc: '예약해놓고 연락 없이 안 오는 외국인 환자 때문에 스케줄 구멍과 매출 손해가 큽니다.' },
              { icon: TrendingUp, title: '불확실한 마케팅 효율', desc: '비싼 해외 마케팅 대행사 비용 대비 실제 내원율은 얼마나 되는지 파악하기 힘듭니다.' },
            ].map((item, i) => (
              <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300 group"
              >
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {/* Use Brand Red for pain points to signal 'Problem' */}
                    <item.icon className="w-7 h-7 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solutions" className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-blue/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-2 block">Our Solution</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              KBEAUTYPASS만의 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lightblue to-brand-pink">3가지 핵심 솔루션</span>
            </h2>
          </div>

          <div className="space-y-24">
            {/* Solution 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-6 text-brand-blue">
                      <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI 의료 통역 & 스마트 문진</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                      예약 확정 시, 피부 고민부터 알레르기, 여행 일정까지 포함된 
                      <strong> [AI 환자 리포트]</strong>가 자동으로 첨부됩니다. 
                      단순 번역을 넘어 의료진이 환자 정보를 사전에 한눈에 파악하여 
                      문진 시간을 획기적으로 단축할 수 있습니다.
                  </p>
                  <ul className="space-y-3">
                      {['3개 국어(영·중·일) 실시간 지원', '의료 전문 용어 자동 번역', '사전 문진 데이터 연동'].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-brand-blue" /> {feat}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                  {/* Simplified Graphic for AI Report */}
                  <div className="bg-white rounded-xl p-6 text-slate-900 shadow-lg transform rotate-2">
                      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                        <div className="font-bold text-lg">AI Medical Summary</div>
                        <div className="bg-brand-lightblue text-brand-blue px-2 py-1 rounded text-xs font-bold">Translated</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0" />
                            <div>
                              <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                              <div className="h-3 w-48 bg-slate-100 rounded" />
                            </div>
                        </div>
                        <div className="p-3 bg-brand-lightblue/30 rounded-lg text-sm text-brand-blue border border-brand-lightblue">
                            <span className="font-bold block mb-1">💡 환자 주요 니즈</span>
                            "자연스러운 코 라인 개선을 원하며, 회복 기간은 3일 이내여야 함."
                        </div>
                      </div>
                  </div>
                </div>
            </div>

            {/* Solution 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-[340px] flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">Sarah Jenkins</div>
                      <div className="text-xs text-slate-500">예약일: 2025. 05. 20</div>
                    </div>
                  </div>
                  
                  {/* Chat Area */}
                  <div className="flex-1 py-4 flex flex-col gap-3 overflow-hidden relative">
                    {/* Message 1 (Patient) */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                      <div className="flex flex-col gap-1 max-w-[80%]">
                        <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-800">
                          Hi, I have a question about the recovery time.
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] text-white bg-brand-blue px-1.5 py-0.5 rounded-full">EN → KO</span>
                            <span className="text-[10px] text-slate-400">회복 기간에 대해 궁금한 점이 있습니다.</span>
                        </div>
                      </div>
                    </div>

                    {/* Message 2 (Hospital) */}
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="flex flex-col gap-1 items-end max-w-[80%]">
                        <div className="bg-brand-blue text-white p-3 rounded-2xl rounded-tr-none text-sm">
                          안녕하세요! 보통 3~5일 정도의 회복 기간이 필요합니다.
                        </div>
                         <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Hello! Usually, a recovery period of 3-5 days is required.</span>
                            <span className="text-[10px] text-white bg-slate-400 px-1.5 py-0.5 rounded-full">KO → EN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-6 text-brand-blue">
                      <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">예약 기반 실시간 번역 채팅</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                      예약 데이터를 기반으로 환자와 실시간으로 소통하세요. 
                      언어 장벽 없이 원활한 문진과 상담이 가능하도록 자동 번역 기능을 제공합니다.
                      환자의 시술 이력과 예약 정보를 보며 정확한 상담이 가능합니다.
                  </p>
                  <ul className="space-y-3">
                      {['실시간 자동 번역 (134개 언어)', '예약 데이터 연동 채팅', '사진/파일 전송 기능'].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-brand-blue" /> {feat}
                        </li>
                      ))}
                  </ul>
                </div>
            </div>

            {/* Solution 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="w-16 h-16 bg-brand-pink/30 rounded-2xl flex items-center justify-center mb-6 text-brand-pink">
                      <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">글로벌 타겟 마케팅</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                      별도의 해외 마케팅 팀이 없어도 됩니다. 
                      전 세계 20개국, 4개 언어(영어, 중문, 일문, 국문)로 지원되는 플랫폼을 통해
                      지역별 트렌드에 맞춘 타겟 광고를 집행합니다.
                  </p>
                </div>
                <div className="order-1 lg:order-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-blue rounded-full blur-[80px] opacity-20" />
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                      alt="Global Users" 
                      className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover h-64 md:h-80 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                국경 없는 의료 서비스, <br/> <span className="text-brand-blue">글로벌 환자 유치</span>로 매출을 극대화하세요
              </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col">
                <div className="h-40 bg-brand-lightblue/30 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                    {/* Abstract UI representation */}
                    <div className="absolute inset-x-4 top-4 bottom-0 bg-white rounded-t-lg shadow-sm p-3">
                      <div className="flex gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-brand-red" />
                          <div className="text-[10px] text-slate-400">New Booking Alert</div>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded mb-1" />
                      <div className="h-2 w-2/3 bg-slate-100 rounded" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-3">실시간 예약 알림</h3>
                <p className="text-slate-600 text-sm">예약 접수 시 실시간(WebSocket) 알림이 울립니다. 새로고침 없이 즉시 확인하세요.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col">
                <div className="h-40 bg-brand-pink/10 rounded-xl mb-6 flex flex-col items-center justify-center relative px-6">
                    <div className="w-full space-y-3">
                       <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                          <span className="w-12">Existing</span>
                          <div className="flex-1 h-3 bg-slate-200 rounded-full"></div>
                          <span>30m</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-rose-600 font-bold">
                          <span className="w-12">KBP</span>
                          <div className="w-1/4 h-3 bg-rose-500 rounded-full relative">
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping" />
                          </div>
                          <span>5m</span>
                       </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-3">문진 시간 단축</h3>
                <p className="text-slate-600 text-sm">사전 AI 리포트로 환자 파악 시간을 획기적으로 줄입니다. 불필요한 질의응답 없이 곧바로 핵심 상담을 시작하세요.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col">
                <div className="h-40 bg-green-50 rounded-xl mb-6 flex flex-col justify-center p-4 relative overflow-hidden">
                    <div className="w-full bg-white rounded-lg shadow-sm border border-green-100 p-3 space-y-2 relative z-10">
                       <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-100 pb-1 mb-1">
                          <span>Recent Payouts</span>
                          <span>Amount</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                          <div className="flex flex-col">
                             <span>Ulthera 300</span>
                             <span className="text-[10px] text-slate-400 font-normal">Oct 24 • Completed</span>
                          </div>
                          <span className="text-green-600">+$1,200</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-bold text-slate-800 opacity-50">
                          <div className="flex flex-col">
                             <span>Botox 50u</span>
                             <span className="text-[10px] text-slate-400 font-normal">Oct 23 • Completed</span>
                          </div>
                          <span className="text-green-600">+$150</span>
                       </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl"></div>
                </div>
                <h3 className="text-xl font-bold mb-3">투명한 자동 정산</h3>
                <p className="text-slate-600 text-sm">시술 완료 후 주기에 맞춰 시술비가 자동 정산됩니다. 매출 리포트를 한눈에 확인하세요.</p>
              </div>
          </div>
          
          <div className="mt-16 text-center">
              <Link 
                href="/docs"
                className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline"
              >
                플랫폼 이용 가이드 문서 보기 <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
        </div>
      </section>

      {/* MARKETING BENEFITS SECTION */}
      <section id="marketing" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-lightblue/5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-2 block">Partnership Benefits</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              B2B 파트너 전용 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-pink font-black">마케팅 연계 혜택</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              초기 입점 병원의 성공적인 안착을 위해 <br className="hidden md:block" />
              실질적인 마케팅 지원 프로그램을 운영합니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl relative overflow-hidden">
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="inline-flex items-center gap-2 bg-brand-pink text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-brand-pink/30">
                      <Zap className="w-4 h-4 fill-current" /> 테스트 프로모션 지원
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                      초기 환자 유입을 위한<br/>
                      <span className="text-brand-blue">집중 마케팅 패키지</span>
                   </h3>
                   
                   <div className="space-y-8">
                      {/* Feature 1 */}
                      <div className="flex gap-4 group">
                         <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center shrink-0 text-brand-blue font-bold text-xl group-hover:bg-brand-blue group-hover:text-white transition-colors">1</div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">입점 후 1개월 : 메인 배너 노출</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                               가장 트래픽이 높은 앱 메인 페이지 상단에 파트너 병원의 <br/>단독 이벤트 배너를 1개월간 노출하여 브랜드 인지도를 높입니다.
                            </p>
                         </div>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex gap-4 group">
                         <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center shrink-0 text-brand-blue font-bold text-xl group-hover:bg-brand-blue group-hover:text-white transition-colors">2</div>
                         <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">소규모 체험단 / 리뷰 유도 <span className="text-xs text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded ml-2 align-middle">선택형</span></h4>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">
                               검증된 마이크로 인플루언서(체험단)를 매칭하여 <br/>신뢰도 높은 초기 시술 리뷰 콘텐츠를 빠르게 확보합니다.
                            </p>
                            
                            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 border border-slate-100 mt-2">
                               <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
                                  <ShieldCheck className="w-4 h-4 text-brand-blue" /> 
                                  <span>진행 조건 및 방식</span>
                               </div>
                               <ul className="space-y-2 text-slate-600 text-xs pl-1">
                                  <li className="flex items-start gap-2">
                                     <span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5"/> 
                                     <span><strong>병원 제공:</strong> 체험단을 위한 무료 시술 (필수)</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                     <span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5"/> 
                                     <span><strong>체험단 이행:</strong> 고퀄리티 SNS 콘텐츠 제작 및 앱 내 리뷰 작성</span>
                                  </li>
                               </ul>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Visual Side */}
                <div className="relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-brand-pink/10 blur-[60px] rounded-full opacity-70" />
                   
                   <div className="relative grid gap-6">
                      {/* 1. Banner Mockup */}
                      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                          <div className="bg-slate-50 p-3 border-b border-slate-100 flex items-center justify-between">
                             <div className="text-xs font-bold text-slate-500">App Main Banner</div>
                             <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-400"/>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"/>
                                <div className="w-2 h-2 rounded-full bg-green-400"/>
                             </div>
                          </div>
                          <div className="aspect-[3/1] bg-gradient-to-r from-slate-900 to-slate-800 relative p-6 flex flex-col justify-center">
                              <div className="absolute right-0 bottom-0 opacity-20">
                                 <Zap className="w-24 h-24 text-white rotate-12 translate-y-4 translate-x-4" />
                              </div>
                              <div className="relative z-10 text-white">
                                 <div className="text-xs font-bold text-brand-lightblue mb-1">NEW PARTNER EVENT</div>
                                 <div className="text-xl font-black italic">GRAND OPENING</div>
                                 <div className="text-xs text-slate-300 mt-1">Special Discount ~50% OFF</div>
                              </div>
                          </div>
                      </div>

                      {/* 2. Review Mockup */}
                      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 transform translate-x-4 hover:-translate-y-1 transition-transform duration-300">
                          <div className="flex items-center gap-3 mb-4">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-pink to-brand-blue p-[2px]">
                                <div className="w-full h-full rounded-full bg-white p-[2px]">
                                   <User className="w-full h-full text-slate-300 bg-slate-100 rounded-full p-1" />
                                </div>
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-900">Sarah_daily</div>
                                <div className="text-[10px] text-slate-400">Singapore • Skin Care</div>
                             </div>
                             <div className="ml-auto text-yellow-400 flex text-xs">★★★★★</div>
                          </div>
                          <div className="space-y-2 mb-3">
                             <div className="h-24 bg-slate-100 rounded-lg w-full relative overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">Review Photo / Video</div>
                             </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                             "I visited this clinic as an influencer and I was totally amazed! The service was professional and..."
                          </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="contact" className="py-20 md:py-32 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8 inline-block p-4 rounded-full bg-brand-lightblue text-brand-blue animate-bounce">
              <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
            입점비 Zero, <br/>
            수수료는 <span className="text-brand-blue">오직 매출이 발생할 때만</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-12">
            복잡한 서류 절차는 필요 없습니다. <br/>
            온라인 양식 제출 한 번으로 가장 빠르고 간편하게 입점 신청을 완료하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/consultation"
                className="bg-brand-blue text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-blue-600 transition-all shadow-xl shadow-brand-blue/30"
              >
                입점 상담 신청하기
              </Link>
              <a 
                href="https://test.k-beautypass.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-800 border border-slate-200 px-10 py-5 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                데모 체험하기
              </a>
          </div>
        </div>
      </section>

      <VitalConnectFloatingButton />
    </>
  );
};
