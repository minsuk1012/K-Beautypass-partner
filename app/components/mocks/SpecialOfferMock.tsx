import React from 'react';
import { Star, ChevronRight, Megaphone, Users } from 'lucide-react';

export default function SpecialOfferMock() {
  return (
      <div className="flex flex-col md:flex-row gap-6 w-full font-sans">
           
           {/* Left Card: Main Banner Exposure (Dark Theme) */}
           <div className="flex-1 bg-gray-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[400px]">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold w-fit mb-6 border border-white/5">
                    <Megaphone size={12} className="text-brand-blue" />
                    <span>입점 후 1개월</span>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">메인 배너 노출</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8">
                        가장 트래픽이 높은 앱 메인 페이지 상단에 파트너 병원의 <span className="text-white font-bold">단독 이벤트 배너</span>를
                        <br className="hidden md:block"/> 1개월간 노출하여 브랜드 인지도를 높입니다.
                    </p>
                </div>

                {/* Banner Visual Mockup */}
                <div className="bg-gray-800 rounded-xl p-3 border border-gray-700/50 relative">
                    {/* Fake Browser Toolbar */}
                    <div className="flex gap-1.5 mb-3 px-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    {/* Banner Content */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg h-32 w-full flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent"></div> 
                        <span className="font-bold text-white shadow-sm z-10">Main Event Banner</span>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/20 blur-xl rounded-full"></div>
                    </div>
                </div>
           </div>

           {/* Right Card: Experience Group (Light Theme) */}
           <div className="flex-1 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl flex flex-col justify-between min-h-[400px]">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full text-xs font-bold w-fit mb-6 text-purple-600">
                    <Users size={12} />
                    <span>선택형 프로그램</span>
                </div>

                <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">소규모 체험단 / 리뷰 유도</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-8">
                        검증된 마이크로 인플루언서(체험단)를 매칭하여 <span className="text-gray-900 font-bold">신뢰도 높은 초기 시술 리뷰 콘텐츠</span>를 빠르게 확보합니다.
                    </p>
                </div>

                {/* Reviews Visual List */}
                <div className="space-y-3">
                    {/* Review Item 1 */}
                    <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-center">
                        <div className="shrink-0 flex flex-col gap-2 items-center">
                            <img src="/review_avatar_1.png" className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" alt="Sarah Kim" />
                            <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">VIP</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">Sarah Kim</div>
                                    <div className="text-xs text-gray-400">20s • Sensitive Skin</div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                The staff were incredibly kind and the procedure was painless! I noticed immediate brightening effects right after the session. Highly recommended for K-beauty fans!
                            </p>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="currentColor" />)}
                        </div>
                    </div>
                     {/* Review Item 2 */}
                     <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-center opacity-70">
                        <div className="shrink-0 flex flex-col gap-2 items-center">
                            <img src="/review_avatar_2.png" className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm" alt="Jessica Lee" />
                            <div className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">New</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">Jessica Lee</div>
                                    <div className="text-xs text-gray-400">30s • Dry Skin</div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                Amazing experience at the clinic. The reservation via K-BeautyPass was so smooth. I loved the automatic translation feature during the consultation.
                            </p>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="currentColor" />)}
                        </div>
                    </div>
                </div>

           </div>

      </div>
  );
}
