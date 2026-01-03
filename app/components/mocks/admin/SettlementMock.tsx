import React from 'react';
import { motion } from 'framer-motion';

export default function SettlementMock() {
  return (
      <div className="bg-white min-h-[500px] flex text-left text-xs sm:text-sm font-sans">
           {/* Sidebar */}
           <div className="w-48 border-r border-gray-100 p-4 hidden md:block bg-slate-50">
                <div className="text-xs font-bold text-gray-400 mb-4 px-2">FINANCE</div>
                <div className="space-y-1">
                    <div className="h-8 w-full bg-white border border-gray-200 rounded flex items-center px-3 font-semibold text-gray-700 shadow-sm">월별 정산</div>
                    <div className="h-8 w-full rounded flex items-center px-3 text-gray-500 hover:bg-gray-100">지급 내역</div>
                </div>
           </div>

           {/* Main Content */}
           <div className="flex-1 p-6 bg-white overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="text-xl font-bold text-gray-900">12월 정산 관리</div>
                        <div className="text-gray-500 text-xs mt-1">2025.12.01 ~ 2025.12.31</div>
                    </div>
                    <div className="bg-gray-900 text-white px-3 py-2 rounded text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800">
                        <span>🔄</span> 12월 정산 갱신
                    </div>
                </div>

                {/* Filter Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 mb-6 flex gap-2 shadow-sm items-center">
                    <div className="px-3 py-1.5 border border-gray-200 rounded bg-gray-50 text-gray-600 font-bold">2025년</div>
                    <div className="px-3 py-1.5 border border-blue-200 rounded bg-blue-50 text-brand-blue font-bold">12월</div>
                    <div className="h-4 w-px bg-gray-200 mx-1"/>
                    <div className="bg-gray-900 text-white px-3 py-1.5 rounded text-xs font-bold cursor-pointer">조회</div>
                </div>

                {/* Data Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
                    <div className="min-w-[600px]">
                        <div className="bg-gray-50 border-b border-gray-200 grid grid-cols-5 py-2 px-4 text-xs font-bold text-gray-500">
                        <div className="col-span-1">병원명</div>
                        <div className="text-right">총 시술금액</div>
                        <div className="text-right">수수료</div>
                        <div className="text-right">최종 입금액</div>
                        <div className="text-center">상태</div>
                    </div>
                    {/* Row 1 */}
                    <div className="grid grid-cols-5 py-3 px-4 text-sm items-center border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-800">강남 뷰티성형외과</div>
                        <div className="text-right text-gray-500">₩145,000,000</div>
                        <div className="text-right text-gray-400">-₩14,500,000</div>
                        <div className="text-right font-black text-brand-blue">₩130,500,000</div>
                        <div className="flex justify-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">정산 완료</span></div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-5 py-3 px-4 text-sm items-center border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-800">압구정 피부과</div>
                        <div className="text-right text-gray-500">₩82,400,000</div>
                        <div className="text-right text-gray-400">-₩8,240,000</div>
                        <div className="text-right font-black text-brand-blue">₩74,160,000</div>
                        <div className="flex justify-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">지급 요청</span></div>
                    </div>
                     {/* Row 3 */}
                    <div className="grid grid-cols-5 py-3 px-4 text-sm items-center hover:bg-gray-50 transition-colors opacity-60">
                        <div className="font-bold text-gray-800">신사 덴탈의원</div>
                        <div className="text-right text-gray-500">₩12,000,000</div>
                        <div className="text-right">-</div>
                        <div className="text-right">-</div>
                         <div className="flex justify-center"><span className="border border-gray-200 text-gray-400 px-2 py-0.5 rounded text-xs font-bold">작성 중</span></div>
                    </div>
                    </div>
                </div>
           </div>
      </div>
  );
}
