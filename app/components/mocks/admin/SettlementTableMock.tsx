'use client';

import React from 'react';
import { Calculator, FileText, ChevronDown } from 'lucide-react';

// Mock data
const MOCK_SETTLEMENTS = [
  { id: 1, hospital: '강남 뷰티클리닉', total: 45000000, fee: 4500000, payout: 40500000, status: 'paid', statusLabel: '지급 완료' },
  { id: 2, hospital: '청담 에스테틱', total: 32000000, fee: 3200000, payout: 28800000, status: 'confirmed', statusLabel: '정산 확정' },
  { id: 3, hospital: '압구정 피부과', total: 28000000, fee: 2800000, payout: 25200000, status: 'pending', statusLabel: '검토 중' },
  { id: 4, hospital: '신사동 클리닉', total: 18500000, fee: 1850000, payout: 16650000, status: 'paid', statusLabel: '지급 완료' },
];

const formatCurrency = (amount: number) => `₩${amount.toLocaleString()}`;

export default function SettlementTableMock() {
  return (
    <div className="flex flex-col h-[420px] bg-white text-left font-sans text-slate-900 text-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">월별 정산 관리</h2>
            <p className="text-xs text-gray-500 mt-0.5">병원별 정산 현황을 확인합니다.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
            <Calculator size={14} /> 정산 생성
          </button>
        </div>
        
        {/* Year/Month Filter */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
            2025년 <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
            12월 <ChevronDown size={14} className="text-gray-400" />
          </button>
          
          <div className="flex-1" />
          
          {/* Summary Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-gray-500">총 결제액: </span>
              <span className="font-bold text-gray-900">₩123,500,000</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div>
              <span className="text-gray-500">총 지급액: </span>
              <span className="font-bold text-green-600">₩111,150,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* DataTable */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">병원</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">총 결제액</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">수수료</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">지급 예정액</th>
              <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">명세서</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_SETTLEMENTS.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-bold text-gray-900">{s.hospital}</div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="font-medium text-gray-900">{formatCurrency(s.total)}</div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="text-red-500">-{formatCurrency(s.fee)}</div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(s.payout)}</div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    s.status === 'paid' 
                      ? 'bg-green-100 text-green-700'
                      : s.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {s.statusLabel}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors ml-auto">
                    <FileText size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs">
        <span className="text-gray-500">4개 병원의 정산 내역</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">매월 10일 일괄 지급</span>
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
}
