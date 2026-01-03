import React from 'react';
import { motion } from 'framer-motion';
import { Video, BarChart2, MessageCircle } from 'lucide-react';

export default function MarketingMock() {
  return (
      <div className="bg-white min-h-[500px] flex text-left text-xs sm:text-sm font-sans">
           {/* Sidebar */}
           <div className="w-48 border-r border-gray-100 p-4 hidden md:block bg-slate-50">
                <div className="text-xs font-bold text-gray-400 mb-4 px-2">MARKETING</div>
                <div className="space-y-1">
                    <div className="h-8 w-full bg-white border border-gray-200 rounded flex items-center px-3 font-semibold text-gray-700 shadow-sm">콘텐츠 관리</div>
                    <div className="h-8 w-full rounded flex items-center px-3 text-gray-500 hover:bg-gray-100">캠페인 성과</div>
                    <div className="h-8 w-full rounded flex items-center px-3 text-gray-500 hover:bg-gray-100">리뷰 관리</div>
                </div>
           </div>

           {/* Main Content */}
           <div className="flex-1 p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="text-xl font-bold text-gray-900">콘텐츠 관리</div>
                        <div className="text-gray-500 text-xs mt-1">업로드된 숏폼 및 홍보 영상을 관리합니다.</div>
                    </div>
                </div>

                 {/* Tabs */}
                <div className="flex border-b border-gray-100 mb-6 font-medium text-sm">
                    <div className="px-4 py-2 border-b-2 border-black font-bold text-gray-900 flex items-center gap-2">
                        <Video size={14}/> 쇼츠 (Shorts)
                    </div>
                    <div className="px-4 py-2 text-gray-400">일반 영상</div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Item 1 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-[9/16] bg-gray-100 relative">
                             {/* Placeholder Overlay */}
                             <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                 <Video size={32}/>
                             </div>
                             <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px]">0:45</div>
                        </div>
                        <div className="p-3">
                            <div className="font-bold text-gray-800 truncate mb-2">Summer Skin Care Event</div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1"><MessageCircle size={12}/> 342</div>
                                <div className="flex items-center gap-1 font-bold text-brand-blue"><BarChart2 size={12}/> 12.5k View</div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-[9/16] bg-gray-100 relative">
                             {/* Placeholder Overlay */}
                             <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                 <Video size={32}/>
                             </div>
                             <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px]">0:30</div>
                        </div>
                        <div className="p-3">
                            <div className="font-bold text-gray-800 truncate mb-2">Botox Before & After</div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <div className="flex items-center gap-1"><MessageCircle size={12}/> 89</div>
                                <div className="flex items-center gap-1 font-bold text-brand-blue"><BarChart2 size={12}/> 4.1k View</div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
      </div>
  );
}
