'use client';

import React from 'react';
import { Play, Eye, MoreVertical, Video } from 'lucide-react';

// Mock data
const MOCK_SHORTS = [
  { id: 1, thumbnail: 'bg-gradient-to-br from-pink-300 to-purple-400', title: '울쎄라 시술 과정', hospital: '강남 뷰티클리닉', views: 12400, status: 'published' },
  { id: 2, thumbnail: 'bg-gradient-to-br from-blue-300 to-cyan-400', title: '인모드 FX 전후 비교', hospital: '청담 에스테틱', views: 8200, status: 'published' },
  { id: 3, thumbnail: 'bg-gradient-to-br from-orange-300 to-red-400', title: '리쥬란 힐러 효과', hospital: '압구정 피부과', views: 5600, status: 'pending' },
  { id: 4, thumbnail: 'bg-gradient-to-br from-green-300 to-teal-400', title: '병원 시설 투어', hospital: '강남 뷰티클리닉', views: 3400, status: 'published' },
  { id: 5, thumbnail: 'bg-gradient-to-br from-yellow-300 to-orange-400', title: '필러 주입 과정', hospital: '신사동 클리닉', views: 2100, status: 'draft' },
  { id: 6, thumbnail: 'bg-gradient-to-br from-indigo-300 to-purple-400', title: '스킨보톡스 설명', hospital: '청담 에스테틱', views: 4800, status: 'published' },
];

export default function ShortsGridMock() {
  return (
    <div className="flex flex-col h-[420px] bg-white text-left font-sans text-slate-900 text-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">콘텐츠 관리</h2>
            <p className="text-xs text-gray-500 mt-0.5">숏폼 영상을 관리합니다.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
            <Video size={14} /> 영상 업로드
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-md shadow-sm">
            <Video size={14} /> 쇼츠
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="grid grid-cols-3 gap-4">
          {MOCK_SHORTS.map(short => (
            <div key={short.id} className="group relative">
              {/* Thumbnail */}
              <div className={`aspect-[9/16] rounded-xl ${short.thumbnail} relative overflow-hidden cursor-pointer`}>
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Play size={20} className="text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    short.status === 'published'
                      ? 'bg-green-500 text-white'
                      : short.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {short.status === 'published' ? '게시됨' : short.status === 'pending' ? '검토중' : '임시저장'}
                  </span>
                </div>

                {/* Views */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-medium">
                  <Eye size={12} /> {(short.views / 1000).toFixed(1)}K
                </div>

                {/* More Options */}
                <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={12} className="text-white" />
                </button>
              </div>
              
              {/* Info */}
              <div className="mt-2">
                <div className="font-bold text-gray-900 text-xs truncate">{short.title}</div>
                <div className="text-[10px] text-gray-500 truncate">{short.hospital}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
