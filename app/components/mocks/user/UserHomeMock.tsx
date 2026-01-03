'use client';

import React from 'react';
import { Search, Bell, MapPin, Star, Heart, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { name: '스킨케어', color: 'bg-pink-100 text-pink-500' },
  { name: '리프팅', color: 'bg-indigo-100 text-indigo-500' },
  { name: '바디관리', color: 'bg-blue-100 text-blue-500' },
  { name: '쁘띠시술', color: 'bg-purple-100 text-purple-500' },
  { name: '제모', color: 'bg-yellow-100 text-yellow-600' },
];

const HOSPITALS = [
  { name: '강남 더블유 클리닉', rating: 4.9, reviews: 128, location: 'Gangnam', image: '/hospital_interior_reception_01.webp' },
  { name: '청담 에스테틱', rating: 4.8, reviews: 85, location: 'Cheongdam', image: '/hospital_interior_treatment_01.webp' },
  { name: '압구정 피부과', rating: 4.7, reviews: 204, location: 'Apgujeong', image: '/hospital_interior_reception_01.webp' },
];

export default function UserHomeMock() {
  return (
    <div className="w-full h-[600px] bg-white text-gray-900 font-sans relative overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between bg-white z-10">
        <div className="font-black text-xl text-brand-dark tracking-tighter">
          K-Beauty<span className="text-brand-blue">Pass</span>
        </div>
        <div className="flex items-center gap-3 text-gray-800">
          <Search size={22} strokeWidth={2} />
          <div className="relative">
            <Bell size={22} strokeWidth={2} />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide">
        
        {/* Banner */}
        <div className="mx-5 mt-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 p-5 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
             <div className="text-xs font-bold opacity-80 mb-1">SUMMER EVENT</div>
            <div className="text-xl font-bold leading-tight mb-3">
                Premium<br/>Skin Booster <span className="text-yellow-300">50% OFF</span>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                View Details
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Categories */}
        <div className="px-5 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Categories</h2>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {CATEGORIES.map((cat, idx) => (
               <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px] cursor-pointer hover:scale-105 transition-transform">
                 <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm`}>
                   <div className="w-6 h-6 bg-white/50 rounded-full" />
                 </div>
                 <div className="text-[11px] font-medium text-gray-600">{cat.name}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Recommended Hospitals */}
        <div className="px-5 mt-6">
           <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Recommended</h2>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {HOSPITALS.map((hosp, idx) => (
              <div key={idx} className="flex gap-4 p-3 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white items-center">
                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                    <img src={hosp.image} alt={hosp.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-sm text-gray-900">{hosp.name}</div>
                    <Heart size={16} className="text-gray-300" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin size={10} /> {hosp.location}
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-900">{hosp.rating}</span>
                    <span className="text-[10px] text-gray-400">({hosp.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="h-16 border-t border-gray-100 bg-white flex items-center justify-around absolute bottom-0 w-full z-10 px-2 pb-2">
        <div className="flex flex-col items-center gap-1 text-brand-blue">
           <div className="w-5 h-5 bg-brand-blue/20 rounded-md" />
           <span className="text-[9px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
           <div className="w-5 h-5 bg-gray-100 rounded-md" />
           <span className="text-[9px] font-medium">Search</span>
        </div>
         <div className="flex flex-col items-center gap-1 text-gray-300">
           <div className="w-5 h-5 bg-gray-100 rounded-md" />
           <span className="text-[9px] font-medium">My</span>
        </div>
      </div>
    </div>
  );
}
