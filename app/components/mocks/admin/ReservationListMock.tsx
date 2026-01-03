'use client';

import React from 'react';
import { List, Calendar, Eye, ChevronRight } from 'lucide-react';

// Mock data for reservations
const MOCK_RESERVATIONS = [
  { id: 1, time: '10:00', patient: '김민지', procedure: '울쎄라 300샷', status: 'confirmed', statusLabel: '예약 확정', statusColor: 'bg-green-100 text-green-700' },
  { id: 2, time: '11:30', patient: 'Sarah Williams', procedure: '인모드 FX', status: 'in_progress', statusLabel: '시술 중', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 3, time: '14:00', patient: '田中 美咲', procedure: '스킨보톡스', status: 'pending', statusLabel: '승인 대기', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 4, time: '15:30', patient: '이수현', procedure: '리쥬란 힐러', status: 'completed', statusLabel: '시술 완료', statusColor: 'bg-gray-100 text-gray-600' },
  { id: 5, time: '17:00', patient: 'Emma Chen', procedure: '필러 (턱)', status: 'confirmed', statusLabel: '예약 확정', statusColor: 'bg-green-100 text-green-700' },
];

const MOCK_HOSPITALS = [
  { id: 1, name: '강남 뷰티클리닉', count: 12 },
  { id: 2, name: '청담 에스테틱', count: 8 },
  { id: 3, name: '압구정 피부과', count: 5 },
];

export default function ReservationListMock() {
  return (
    <div className="flex h-[420px] bg-slate-50 text-left font-sans text-slate-900 text-sm overflow-hidden">
      
      {/* ResourceSidebar */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filter by Hospital</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium">
              <span>전체 병원</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">25</span>
            </div>
            {MOCK_HOSPITALS.map(h => (
              <div key={h.id} className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium cursor-pointer transition-colors">
                <span>{h.name}</span>
                <span className="text-gray-400">{h.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Reservations</h2>
            <p className="text-xs text-gray-500 mt-0.5">25 bookings found</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-md shadow-sm">
              <List size={14} /> List
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-md transition-colors">
              <Calendar size={14} /> Calendar
            </button>
          </div>
        </div>

        {/* Reservation List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {MOCK_RESERVATIONS.map(res => (
              <div 
                key={res.id} 
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{res.time}</div>
                    <div className="text-[10px] text-gray-400 uppercase">오늘</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div>
                    <div className="font-bold text-gray-900">{res.patient}</div>
                    <div className="text-xs text-gray-500">{res.procedure}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${res.statusColor}`}>
                    {res.statusLabel}
                  </span>
                  <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hover:text-gray-600">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1-5 of 25</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded hover:bg-gray-100">Prev</button>
            <button className="px-2 py-1 rounded bg-gray-900 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
            <button className="px-2 py-1 rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
