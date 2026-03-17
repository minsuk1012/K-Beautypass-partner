'use client';

import Link from 'next/link';
import { ArrowRight, Check, Rocket } from 'lucide-react';
import InquiryForm from './InquiryForm';
import { trackOnboardingClick } from '../lib/analytics';

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
                 <Link href="https://www.k-beautypass.com/partner/apply" onClick={trackOnboardingClick} className="px-8 py-4 bg-brand-blue text-white font-bold rounded-xl text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-brand-blue/50 flex items-center justify-center gap-2">
                    온라인 입점 신청하기 <ArrowRight size={20} />
                 </Link>
                 <div className="px-8 py-4 bg-white/5 text-gray-300 font-bold rounded-xl text-lg border border-white/10 flex items-center justify-center gap-2">
                    <Check size={20} className="text-green-400" /> 가입비/연회비 무료
                 </div>
             </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:w-1/2 w-full max-w-lg">
             <InquiryForm />
          </div>

        </div>
      </div>
    </section>
  );
}
