/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockHospitalChatRoom } from './MockChatInterface';

import { 
  FileText, Calendar, DollarSign, CheckCircle, 
  MessageSquare, Settings, ChevronRight, Play, 
  Zap, Globe, LayoutDashboard, CreditCard, HelpCircle, User, Copy,
  Bell, Ticket, ShoppingBag, Star, Users, LogOut, Map, Building2
} from 'lucide-react';

// --- Types ---

type DocId = 'partnership' | 'reservation' | 'chat' | 'admin' | 'test-account' | 'direct-chat';

interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface DocCategory {
  id: DocId;
  title: string;
  icon: React.ElementType;
  sections: DocSection[];
}

// --- Visual Mock Components ---

const GuideVideo = ({ src, caption }: { src: string; caption: string }) => (
  <div className="mb-8">
    <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200 group">
      <video 
        src={src} 
        controls 
        className="w-full h-full object-contain bg-black"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
    <p className="mt-3 text-center text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
      <Play className="w-3 h-3" /> {caption}
    </p>
  </div>
);

const MockLogin = () => (
  <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-slate-200 p-8 my-8">
    <div className="flex justify-center mb-6">
       <div className="h-10 w-10 bg-brand-blue rounded-xl flex items-center justify-center text-white">
         <Settings className="w-6 h-6" />
       </div>
    </div>
    <div className="space-y-4">
      <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-slate-400 text-sm">admin@hospital.com</div>
      <div className="h-10 bg-slate-50 border border-slate-200 rounded px-3 flex items-center text-slate-400 text-sm">••••••••</div>
      <div className="h-10 bg-brand-dark text-white rounded flex items-center justify-center font-bold text-sm shadow-md">로그인</div>
    </div>
  </div>
);

const MockDashboardHeader = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
    <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-6 text-sm font-medium text-slate-600 bg-slate-50/50">
       <span className="text-brand-blue font-bold border-b-2 border-brand-blue h-full flex items-center">대시보드</span>
       <span className="h-full flex items-center">예약 관리</span>
       <span className="h-full flex items-center">정산 관리</span>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
       <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">오늘의 예약</div>
          <div className="text-2xl font-bold text-slate-900">8 건</div>
       </div>
       <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="text-xs text-red-600 mb-1 font-bold">처리 대기중</div>
          <div className="text-2xl font-bold text-brand-red">3 건</div>
       </div>
       <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-500 mb-1">이번 달 예상 매출</div>
          <div className="text-2xl font-bold text-slate-900">₩ 45,200,000</div>
       </div>
    </div>
  </div>
);

const MockFinancials = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 my-6">
    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
      <CreditCard className="w-4 h-4 text-slate-500" /> 결제 정보
    </h4>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 bg-green-50 border border-green-100 p-4 rounded-lg">
        <div className="text-[10px] text-green-700 font-bold uppercase mb-1">선결제 완료</div>
        <div className="text-xl font-black text-green-800">₩ 150,000</div>
        <div className="text-[10px] text-green-600 mt-1">앱에서 결제됨</div>
      </div>
      <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg">
        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">현장 결제금</div>
        <div className="text-xl font-black text-slate-800">₩ 1,350,000</div>
        <div className="text-[10px] text-slate-400 mt-1">병원에서 수납 필요</div>
      </div>
    </div>
  </div>
);

const MockSettlementList = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-6">
    <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 border-b border-slate-100">
       <div>
         <div className="text-xs text-slate-500">지급 대기금</div>
         <div className="text-lg font-bold text-yellow-600">₩ 4,200,000</div>
       </div>
       <div>
         <div className="text-xs text-slate-500">지급 완료</div>
         <div className="text-lg font-bold text-green-600">₩ 12,500,000</div>
       </div>
    </div>
    <div className="divide-y divide-slate-50">
      <div className="flex justify-between items-center p-4 text-sm">
         <div>
           <div className="font-bold text-slate-800">Sarah J.</div>
           <div className="text-xs text-slate-400">2024. 10. 24 시술 완료</div>
         </div>
         <div className="text-right">
           <div className="font-bold">₩ 1,500,000</div>
           <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">정산 대기</span>
         </div>
      </div>
      <div className="flex justify-between items-center p-4 text-sm bg-slate-50/30">
         <div>
           <div className="font-bold text-slate-800">Mike T.</div>
           <div className="text-xs text-slate-400">2024. 10. 22 시술 완료</div>
         </div>
         <div className="text-right">
           <div className="font-bold">₩ 300,000</div>
           <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">지급 완료</span>
         </div>
      </div>
    </div>
  </div>
);

const MockReport = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4 my-6">
    <div className="flex justify-between border-b border-slate-100 pb-4">
      <div className="font-bold text-slate-800">의료 리포트 #2024-821</div>
      <div className="text-xs bg-brand-lightblue text-brand-blue px-2 py-1 rounded font-bold">번역됨</div>
    </div>
    <div className="space-y-2">
      <div className="text-xs text-slate-400 font-bold uppercase">환자 호소 증상</div>
      <div className="p-3 bg-slate-50 rounded text-sm text-slate-700">
        "I want to fix my nose bridge line naturally..." <br/>
        <span className="text-brand-blue font-bold">→ "자연스러운 콧대 라인 교정 희망"</span>
      </div>
    </div>
    <div className="space-y-2">
      <div className="text-xs text-slate-400 font-bold uppercase">의료 주의사항</div>
      <div className="flex gap-2">
          <span className="bg-red-50 text-brand-red px-2 py-1 rounded text-xs font-bold border border-red-100">아스피린 알레르기</span>
          <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-bold border border-orange-100">고혈압</span>
      </div>
    </div>
  </div>
);

const MockQuestionnaireInfographic = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-2xl mx-auto my-8 font-sans">
    {/* Header */}
    <div className="bg-white border-b border-slate-100 p-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6" />
         </div>
         <div>
            <div className="font-bold text-slate-900 text-lg">PATIENT PRE-VISIT QUESTIONNAIRE SUMMARY</div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
               Step 3 of 4: Health & Travel Details <CheckCircle className="w-3 h-3 text-brand-blue" />
            </div>
         </div>
      </div>
      <div className="hidden sm:block">
         <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-brand-blue rounded-full"></div>
         </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
       
       {/* Left: Travel Info */}
       <div className="flex-1 p-6 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-6">
             <Globe className="w-5 h-5 text-brand-blue" />
             <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Travel Information</h4>
          </div>

          <div className="space-y-6">
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                   <div className="bg-blue-100 p-2 rounded-lg text-brand-blue">
                      <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Travel Dates</div>
                      <div className="text-slate-900 font-bold text-lg">2024.12.20 - 2024.12.27</div>
                   </div>
                </div>
                <div className="text-xs text-slate-500 pl-[52px]">Upcoming Trip Duration: 8 Days</div>
             </div>

             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                <div className="flex items-center gap-3 mb-3">
                   <div className="bg-blue-100 p-2 rounded-lg text-brand-blue">
                      <DollarSign className="w-5 h-5" />
                   </div>
                   <div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase">Budget Range</div>
                       <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <HelpCircle className="w-3 h-3" /> Estimated
                       </div>
                   </div>
                </div>
                
                <div className="px-1">
                   <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                      <span>$2,000</span>
                      <span>$5,000 (USD)</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                      <div className="absolute left-[20%] right-[30%] top-0 bottom-0 bg-brand-blue rounded-full opacity-30"></div>
                      <div className="absolute left-[20%] text-[8px] -top-3 text-slate-400 font-bold">$2k</div>
                      <div className="absolute right-[30%] text-[8px] -top-3 text-slate-400 font-bold">$5k</div>
                   </div>
                   <div className="mt-2 text-center text-xs font-bold text-brand-blue">
                       Target: $2,000 - $5,000
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Right: Medical History */}
       <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-6">
             <FileText className="w-5 h-5 text-brand-blue" />
             <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Medical History</h4>
          </div>

          <div className="space-y-4">
             <div className="border-b border-slate-50 pb-4">
                <div className="flex items-start gap-3">
                   <div className="mt-1 text-red-500">
                      <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs border border-red-100">!</div>
                   </div>
                   <div>
                      <div className="text-xs text-slate-400 font-bold uppercase mb-1">Allergies</div>
                      <div className="font-bold text-slate-900 text-lg">Aspirin</div>
                      <div className="text-xs text-slate-500 mt-0.5">Reported reaction: Mild skin rash</div>
                   </div>
                </div>
             </div>

             <div className="border-b border-slate-50 pb-4">
                <div className="flex items-start gap-3">
                   <div className="mt-1 text-purple-500">
                      <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs border border-purple-100">Rx</div>
                   </div>
                   <div>
                      <div className="text-xs text-slate-400 font-bold uppercase mb-1">Previous Procedures</div>
                      <div className="font-bold text-slate-900 text-lg">Botox</div>
                      <div className="text-xs text-slate-500 mt-0.5">Last treatment: 6 months ago<br/>Area: Forehead & Crows Feet</div>
                   </div>
                </div>
             </div>

             <div>
                <div className="flex items-start gap-3">
                   <div className="mt-1 text-blue-500">
                       <Zap className="w-6 h-6 p-1 bg-blue-50 rounded-full" />
                   </div>
                   <div className="w-full">
                      <div className="text-xs text-slate-400 font-bold uppercase mb-2">Pain Tolerance Level</div>
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
                         <span>Low</span>
                         <span className="text-brand-blue font-bold">Moderate</span>
                         <span>High</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full w-[60%] bg-gradient-to-r from-blue-300 to-brand-blue rounded-full"></div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 leading-tight">
                        Comfortable with minor discomfort; prefers topical anesthetic.
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

    </div>
    
    {/* Footer Actions */}
    <div className="bg-slate-50 p-4 border-t border-slate-100 flex gap-3 justify-center">
       <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors uppercase tracking-wide">Edit Details</button>
       <button className="px-6 py-2 bg-brand-blue text-white shadow-md shadow-brand-blue/20 text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors uppercase tracking-wide">Submit Questionnaire</button>
    </div>
  </div>
);

const MockAppPreview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
      {/* List View Preview */}
      <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
               <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
               <span className="font-bold text-slate-800 text-sm">입력한 '상품명' 노출 위치</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden max-w-[260px] mx-auto relative group">
              <div className="aspect-[4/3] bg-slate-200 relative">
                  <img src="/hospital_product_4.png" alt="Product" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm">
                     <div className="w-3 h-3 rounded-full border border-slate-300" />
                  </div>
              </div>
              <div className="p-4">
                   <div className="relative mb-1">
                       <div className="absolute -inset-1 border-2 border-red-500 rounded animate-pulse opacity-50"></div>
                       <div className="text-sm font-bold text-slate-900 leading-tight">[Director's Choice] Aqua Shine Injection</div>
                   </div>
                   <div className="text-[10px] text-slate-400 mb-3">Noble Aura Clinic</div>
                   
                   <div className="text-sm font-bold text-slate-900">439,000 <span className="text-[10px] font-normal text-slate-500">KRW</span></div>
              </div>
          </div>
          <p className="text-xs text-center text-slate-500">
            앱 메인 화면과 검색 결과 리스트에서<br/>가장 먼저 보여지는 제목입니다.
          </p>
      </div>

      {/* Detail View Preview */}
      <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
               <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
               <span className="font-bold text-slate-800 text-sm">입력한 '가격 옵션' 노출 위치</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden max-w-[280px] mx-auto p-4 relative mt-12">
               <div className="text-xs text-slate-500 font-bold mb-3 pb-2 border-b border-slate-50">Select Option</div>
               
               {/* Highlighted Option */}
               <div className="border-2 border-brand-blue rounded-xl p-4 bg-white relative shadow-md">
                    <div className="absolute -inset-[3px] border-2 border-red-500 rounded-xl pointer-events-none animate-pulse opacity-50"></div>
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-slate-900">Aqua Shine Injection 1cc</span>
                        <span className="font-bold text-sm text-slate-900">439,000 KRW</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Time: 30 mins</div>
               </div>
          </div>
           <p className="text-xs text-center text-slate-500 mt-4">
            고객이 최종적으로 선택하고 결제하는<br/>실제 옵션명과 가격입니다.
          </p>
          

      </div>
  </div>
);

const MockMyPage = () => {
  const user = { 
    name: "Test User", 
    email: "test_user@example.com", 
    gender: 'female' 
  };
  const stats = { 
    total_reservations: 2, 
    available_coupons_count: 5 
  };

  const MenuLink = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 px-1 transition-colors cursor-pointer group">
       <div className="flex items-center gap-3">
          <Icon size={20} className="text-gray-400 group-hover:text-gray-600" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
       </div>
       <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-400" />
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden my-6 max-w-sm mx-auto relative pb-8">
      
      {/* 1. Header (Notification) */}
      <div className="px-4 py-4 flex justify-end">
         <div className="relative p-1 cursor-pointer">
             <Bell size={22} className="text-gray-400" />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
         </div>
      </div>

      {/* 2. Profile Section */}
      <div className="px-5 mb-8 flex items-center gap-4">
         {/* Avatar Placeholder */}
         <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border border-gray-100 flex items-center justify-center">
            <img src="/female_avatar_3d.png" alt="User Avatar" className="w-full h-full object-cover" />
         </div>
         <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-xs text-gray-400 mb-1">{user.email}</p>
            <div className="text-[10px] font-bold text-gray-600 flex items-center gap-1 hover:text-purple-600 transition-colors cursor-pointer">
                Edit Profile <ChevronRight size={10} />
            </div>
         </div>
      </div>

      {/* 3. Stats Grid (Reservations & Coupons) */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-8">
         <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center gap-2 active:bg-gray-100 transition-colors cursor-pointer hover:bg-gray-100/80">
            <div className="bg-white p-2 rounded-full shadow-sm">
                <Calendar size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Reservations</span>
            <span className="text-xl font-bold text-gray-900">{stats.total_reservations}</span>
         </div>
         <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center justify-center gap-2 active:bg-gray-100 transition-colors cursor-pointer hover:bg-gray-100/80">
            <div className="bg-white p-2 rounded-full shadow-sm">
                <Ticket size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Coupons</span>
            <span className="text-xl font-bold text-gray-900">{stats.available_coupons_count}</span>
         </div>
      </div>

      {/* 4. Menu List */}
      <div className="px-4">
         <MenuLink icon={Calendar} label="My Reservations" />
         <MenuLink icon={Map} label="My Trips" />
         <MenuLink icon={ShoppingBag} label="My Points" />
         <MenuLink icon={FileText} label="Medical History" />
         <MenuLink icon={Star} label="My Reviews" />
         <MenuLink icon={Users} label="Invite Friends" />
         
         <div className="mt-8 flex flex-col items-center gap-4 py-4">
             <div className="flex items-center gap-2 text-gray-400 text-sm font-medium hover:text-gray-600 cursor-pointer">
                 <LogOut size={16} /> Log Out
             </div>
             <span className="text-xs text-gray-300">v1.0.0</span>
         </div>
      </div>
    </div>
  );
};



// --- Documentation Content ---

const CopyableCredential = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-md border border-slate-200 shadow-sm group hover:border-brand-blue/50 transition-colors">
      <div className="flex flex-col overflow-hidden mr-4">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{label}</span>
        <span className="text-sm font-mono text-slate-800 truncate select-all">{value}</span>
      </div>
      <button 
        onClick={handleCopy}
        className="flex-shrink-0 p-2 text-slate-400 hover:text-brand-blue hover:bg-brand-lightblue/10 rounded-lg transition-all"
        title="Copy to clipboard"
        aria-label={`Copy ${label}`}
      >
        {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};



const DOCS_DATA: DocCategory[] = [
  {
    id: 'partnership',
    title: '입점 신청',
    icon: Building2,
    sections: [
      {
        id: 'how-to-apply',
        title: '1. 병원 입점 신청 절차',
        content: (
          <>
            <p className="text-slate-600 mb-6 text-lg">
              K-Beauty Pass의 병원 입점 절차를 안내해 드립니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
               {[
                 { step: 1, title: '회원가입', desc: '파트너 계정을 생성합니다.' },
                 { step: 2, title: '병원 정보 입력', desc: '병원 기본 정보와 담당자 정보를 입력합니다.' },
                 { step: 3, title: '시술/가격 설정', desc: '대표 시술 상품을 등록합니다.' },
                 { step: 4, title: '심사 및 승인', desc: '운영팀 검토 후 최종 입점됩니다.' }
               ].map((s) => (
                 <div key={s.step} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
                    <div className="absolute top-0 right-0 p-2 opacity-10 font-black text-4xl text-slate-900 group-hover:text-brand-blue transition-colors">{s.step}</div>
                    <div className="font-bold text-slate-900 mb-1">{s.title}</div>
                    <div className="text-xs text-slate-500">{s.desc}</div>
                 </div>
               ))}
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">데이터 입력 및 앱 노출 예시</h3>
            <p className="text-slate-600 mb-4 text-sm">
                파트너 센터에서 입력하신 <strong>상품명</strong>과 <strong>가격 옵션</strong>이 실제 앱 사용자에게 어떻게 보여지는지 확인하세요.
            </p>
            
            <MockAppPreview />
            
             <div className="mt-12 text-center border-t border-slate-100 pt-8">
                <a href="/partner/onboarding" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 transform hover:-translate-y-1">
                   입점 신청 시작하기 <ChevronRight className="w-5 h-5" />
                </a>
             </div>
          </>
        )
      }
    ]
  },
  {
    id: 'test-account',
    title: '테스트 계정 및 마이페이지',
    icon: User,
    sections: [
      {
        id: 'test-account-login',
        title: '1. 테스트 계정 생성 및 로그인',
        content: (
          <>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              K-Beauty Pass 플랫폼은 개발 및 테스트 편의를 위해 별도의 회원가입 절차 없는
              <strong className="text-slate-900"> '테스트 계정 원클릭 생성' </strong> 기능을 지원합니다.
              로그인 후 마이페이지에서 제공되는 다양한 기능을 경험해보세요.
            </p>
            
            <GuideVideo src="/login.mp4" caption="테스트 계정 생성 및 로그인 프로세스" />

            <div className="mt-8 bg-brand-lightblue/5 border border-brand-lightblue/20 rounded-xl p-6">
              <h4 className="font-bold text-brand-blue mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" /> 
                테스트 계정 발급
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                로그인 화면 하단의 전용 패널을 통해 즉시 접속이 가능합니다. 
                <span className="bg-yellow-100 text-yellow-800 px-1 rounded ml-1 font-bold">실제 이메일 인증이나 비밀번호 입력이 필요하지 않습니다.</span>
              </p>
              
              <div className="bg-white rounded-lg border border-brand-lightblue/30 p-4 space-y-3 shadow-sm">
                <div className="flex">
                  <span className="w-24 text-xs font-bold text-slate-400 uppercase tracking-wide flex-shrink-0 pt-1">실행</span>
                  <span className="text-sm text-slate-800 font-medium">로그인 페이지 {'>'} 하단 <span className="text-brand-blue font-bold">[테스트 사용자 생성]</span> 버튼 클릭</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-xs font-bold text-slate-400 uppercase tracking-wide flex-shrink-0 pt-1">계정 유형</span>
                  <span className="text-sm text-slate-800">일반 사용자 권한으로 자동 생성</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-xs font-bold text-slate-400 uppercase tracking-wide flex-shrink-0 pt-1">비고</span>
                  <span className="text-sm text-slate-500">병원 관리자 계정 생성 기능은 현재 준비 중입니다.</span>
                </div>
              </div>
            </div>
          </>
        )
      },
      {
        id: 'mypage-dashboard',
        title: '2. 마이페이지 통합 대시보드',
        content: (
          <>
            <p className="text-slate-600 mb-8">
              환자의 의료 여정을 통합 관리할 수 있는 개인화된 대시보드입니다. 
              예약 상태부터 시술 이력, 포인트 및 혜택까지 한눈에 확인하세요.
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className='flex-shrink-0 w-full md:w-auto'>
                <div className="text-xs text-center text-slate-400 mb-2 font-bold">대시보드 예시</div>
                <MockMyPage />
              </div>
              <div className="flex-1 space-y-8 pt-4">
                <div>
                   <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                     <span className="w-6 h-6 rounded bg-brand-lightblue/20 text-brand-blue flex items-center justify-center text-xs">1</span>
                     대시보드 현황
                   </h5>
                   <ul className="list-disc pl-9 text-sm text-slate-600 space-y-1">
                     <li><strong>Reservations:</strong> 진행 중인 예약 건수를 실시간으로 확인합니다.</li>
                     <li><strong>Coupons:</strong> 사용 가능한 보유 쿠폰 수량을 표시합니다.</li>
                   </ul>
                </div>
                <div>
                   <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                     <span className="w-6 h-6 rounded bg-brand-lightblue/20 text-brand-blue flex items-center justify-center text-xs">2</span>
                     의료 여정 관리
                   </h5>
                   <ul className="list-disc pl-9 text-sm text-slate-600 space-y-1">
                     <li><strong>My Reservations:</strong> 상세 예약 일정 및 확정 상태를 확인합니다.</li>
                     <li><strong>Medical History:</strong> 과거 시술 내역 및 상담 기록을 아카이빙합니다.</li>
                     <li><strong>My Trips:</strong> 한국 방문 및 의료 관광 일정을 관리합니다.</li>
                   </ul>
                </div>
                <div>
                   <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                     <span className="w-6 h-6 rounded bg-brand-lightblue/20 text-brand-blue flex items-center justify-center text-xs">3</span>
                     혜택 및 활동
                   </h5>
                   <ul className="list-disc pl-9 text-sm text-slate-600 space-y-1">
                     <li><strong>My Points:</strong> 적립된 포인트 조회 및 사용 내역을 확인합니다.</li>
                     <li><strong>My Reviews:</strong> 병원 방문 후 작성한 리뷰를 관리합니다.</li>
                   </ul>
                </div>
              </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: 'reservation',
    title: '플랫폼 예약',
    icon: Calendar,
    sections: [
      {
        id: 'overview',
        title: '예약 시스템 개요',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              K-Beauty Pass의 예약 시스템은 예약 확정 후 <strong>환자의 상세 사전 정보</strong>를 병원에 전달하는 것에 초점을 맞춥니다.
              단순한 예약 일정을 넘어, 환자의 <strong>여행 일정 및 예산, 고민 부위</strong> 등을 미리 파악하여 맞춤형 응대가 가능하도록 지원합니다.
            </p>
            <GuideVideo src="/reservation.mp4" caption="일반 고객 예약 프로세스 시연" />

            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-brand-blue" /> 
                PayPal Sandbox 결제 테스트 정보
              </h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                현재 개발 환경에서는 <strong>PayPal Sandbox</strong>를 통해 결제가 이루어집니다. 
                실제 비용이 청구되지 않으며, 예약 플로우를 테스트하시려면 아래의 테스트 전용 계정을 사용해주세요.
              </p>
              <div className="flex flex-col gap-3">
                <CopyableCredential label="테스트 계정 ID" value="sb-q1x1p47636718@personal.example.com" />
                <CopyableCredential label="테스트 계정 Password" value="98d7<cE6" />
              </div>
            </div>
          </>
        )
      },
      {
        id: 'ai-report',
        title: '사전 문진 리스트',
        content: (
          <>
            <p className="text-slate-600 mb-6">
              환자가 내원하기 전, 진료에 꼭 필요한 핵심 정보를 리스트 형태로 제공합니다. 
              <strong>여행객을 위한 여행 정보</strong>와 <strong>의료진을 위한 문진 내역</strong>을 한눈에 확인하세요.
            </p>

             <div className="mb-8">
                <MockQuestionnaireInfographic />
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-brand-lightblue/5 p-5 rounded-xl border border-brand-lightblue/20">
                  <h5 className="font-bold text-brand-blue mb-3 text-sm flex items-center gap-2">
                     <Map className="w-4 h-4" /> 여행 정보 (Trip Info)
                  </h5>
                  <ul className="space-y-2 text-sm text-slate-700">
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                        <span><strong>여행 일자:</strong> 입국일 및 출국일 정보</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                        <span><strong>예산 범위:</strong> 시술에 사용할 수 있는 가용 예산</span>
                     </li>
                  </ul>
               </div>

               <div className="bg-brand-lightblue/5 p-5 rounded-xl border border-brand-lightblue/20">
                  <h5 className="font-bold text-brand-blue mb-3 text-sm flex items-center gap-2">
                     <FileText className="w-4 h-4" /> 문진 리스트 (Medical List)
                  </h5>
                  <ul className="space-y-2 text-sm text-slate-700">
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                        <span><strong>알레르기:</strong> 약물 등 알레르기 반응 여부</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                        <span><strong>시술 이력:</strong> 이전에 받은 시술 정보</span>
                     </li>
                     <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                        <span><strong>통증 허용 범위:</strong> 시술 시 통증 민감도 체크</span>
                     </li>
                  </ul>
               </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: 'direct-chat',
    title: '예약 기반 상담',
    icon: MessageSquare,
    sections: [
      {
        id: 'direct-chat-overview',
        title: '예약 기반 상담',
        content: (
          <>
            <p className="text-slate-600 mb-6 text-lg">
              사용자가 예약을 완료하면 예약된 상품을 기반으로 채팅을 이어갈 수 있습니다. 
              <strong>예약이 확정된 사용자</strong>들을 대상으로 병원 방문 전 문진을 진행하거나, 
              병원 방문 이후에도 <strong>사후 관리용</strong>으로 활용할 수 있습니다.
            </p>
            <GuideVideo src="/chat.mp4" caption="예약된 시술을 기반으로 상담을 진행하는 모습" />

            {/* Info Box: Smart Context Sync */}
            <div className="bg-brand-lightblue/5 border border-brand-lightblue/20 rounded-xl p-6 mb-8">
              <h4 className="font-bold text-brand-blue mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" /> 
                예약 정보 자동 동기화
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                상담 시작과 동시에 환자의 예약 정보가 자동으로 동기화됩니다. 
                <strong> 예약된 시술 내역, 일정, 결제 정보</strong>가 
                관리자 화면에 요약되어 표시되므로 별도의 확인 과정 없이 빠르고 정확한 응대가 가능합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                 <div className="bg-white p-3 rounded-lg border border-brand-lightblue/30 text-sm shadow-sm text-center">
                    <div className="font-bold text-slate-800 mb-1">예약 상품 연동</div>
                    <div className="text-xs text-slate-500">예약 정보를 기반으로 맞춤 상담 시작</div>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-brand-lightblue/30 text-sm shadow-sm text-center">
                    <div className="font-bold text-slate-800 mb-1">사전 문진</div>
                    <div className="text-xs text-slate-500">방문 전 환자 상태 및 니즈 미리 파악</div>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-brand-lightblue/30 text-sm shadow-sm text-center">
                    <div className="font-bold text-slate-800 mb-1">사후 케어</div>
                    <div className="text-xs text-slate-500">시술 후 회복 관리 및 문의 응대</div>
                 </div>
              </div>
            </div>

            {/* Feature Details */}
            <h3 className="text-xl font-bold text-slate-800 mb-4">시술 만족도를 높이는 케어 도구</h3>
            <p className="text-slate-600 mb-8">
               병원 방문 전 필요한 사전 문진을 진행하거나, 시술 후 주의사항 및 관리 방법을 채팅으로 안내하여 환자의 불안감을 해소하고 만족도를 높이세요.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
               <div className='flex-shrink-0 w-full lg:w-auto'>
                  <div className="text-xs text-center text-slate-400 mb-2 font-bold">채팅방 예시</div>
                  <MockHospitalChatRoom />
               </div>
               <div className="flex-1 space-y-6 pt-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                       <FileText className="w-4 h-4 text-brand-blue" />
                       사전 문진 및 사후 관리
                     </h5>
                     <p className="text-sm text-slate-600 mb-2">
                       방문 전 환자의 건강 상태를 파악할 수 있는 <strong>문진표</strong>를 발송하거나, 
                       시술 후 회복 관리에 필요한 <strong>주의사항</strong>을 카드 형태로 전달하세요.
                     </p>
                     <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                        <li>다국어 지원 문진표 발송 및 자동 번역 수신</li>
                        <li>시술별 맞춤 주의사항 및 복약 지도 안내</li>
                     </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                       <User className="w-4 h-4 text-brand-blue" />
                       신뢰도 높은 담당자 프로필
                     </h5>
                     <p className="text-sm text-slate-600">
                       익명의 상담원이 아닌, 병원의 전문 담당자 프로필이 노출됩니다. 
                       응답 대기 중에는 AI가 기본 응대를 지원하고, 담당자 연결 시 예상 대기 시간을 안내하여 이탈을 방지합니다.
                       <br/>
                       <span className="text-xs bg-purple-100 text-purple-700 px-1.5 rounded ml-1">K-Beautypass AI</span>
                       <span className="text-xs bg-slate-200 text-slate-600 px-1.5 rounded ml-1">Hospital Staff</span>
                     </p>
                  </div>
               </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: 'chat',
    title: 'AI 채팅 (준비중)',
    icon: MessageSquare,
    sections: [
      {
        id: 'translation',
        title: '실시간 번역 채팅',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              별도의 통역 코디네이터 없이도 환자와 직접 소통할 수 있습니다.
              병원에서 한국어로 입력하면, 환자의 모국어로 
              실시간 번역되어 전송됩니다.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-6">
               <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 text-sm shadow-sm self-start">
                    <div className="text-xs text-slate-400 mb-1">환자</div>
                    수술 후 붓기는 보통 며칠이나 가나요?
                  </div>
                  <div className="bg-brand-blue text-white p-3 rounded-lg rounded-tr-none text-sm shadow-sm self-end text-right">
                    <div className="text-xs text-blue-200 mb-1">병원</div>
                    개인차는 있지만 보통 3~5일 정도면 큰 붓기는 가라앉습니다.
                  </div>
               </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: 'admin',
    title: '관리자 페이지 사용법 (준비중)',
    icon: Settings,
    sections: [
      {
        id: 'getting-started',
        title: '1. 파트너 센터 접속',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              파트너 센터는 병원 운영에 필요한 모든 기능을 제공하는 관리자 전용 웹사이트입니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
              <li><strong>접속 주소:</strong> <span className="text-brand-blue underline cursor-pointer">https://admin.k-beautypass.com</span></li>
              <li><strong>로그인:</strong> 발급해드린 관리자 계정과 비밀번호로 로그인하세요.</li>
            </ul>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
               <div className="text-xs text-slate-500 font-bold mb-2 text-center uppercase tracking-wide">로그인 화면 예시</div>
               <MockLogin />
            </div>
          </>
        )
      },
      {
        id: 'dashboard',
        title: '2. 대시보드',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              로그인 후 처음 만나는 화면입니다. 병원의 현재 운영 현황을 한눈에 파악할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
               <li><strong>주요 지표:</strong> 오늘의 예약 건수, 처리 대기 중인 예약, 이달의 예상 매출액 확인.</li>
               <li><strong>빠른 이동:</strong> '예약 관리', '정산 관리' 등 자주 쓰는 메뉴로 바로 이동.</li>
            </ul>
            <MockDashboardHeader />
          </>
        )
      },
      {
        id: 'reservation-mgmt',
        title: '3. 예약 관리',
        content: (
          <>
            <p className="text-slate-600 mb-4">
              고객의 시술 예약을 접수하고 확정하는 단계입니다. 가장 빈번하게 사용하시게 될 핵심 기능입니다.
            </p>
            
            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">3.1 예약 확인 및 확정</h3>
            <p className="text-slate-600 text-sm mb-4">
              고객이 예약을 신청하면 <span className="text-brand-red font-bold">[대기중]</span> 상태로 접수됩니다.
              예약 상세 페이지에서 고객 정보를 검토한 후 <strong>[Confirm]</strong> 버튼을 눌러 확정하세요.
              관리자가 승인하는 즉시 고객에게 예약 확정 알림이 발송됩니다.
            </p>
            <GuideVideo src="/admin_reservation.mp4" caption="관리자 예약 확정 및 관리 방법" />

            <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">3.2 환자 정보 상세 확인</h3>
            <p className="text-slate-600 text-sm mb-4">
               <strong>Payment</strong> 탭에서는 고객이 앱에서 선결제한 예약금과 병원에서 받아야 할 현장 결제금을 명확히 구분해 줍니다.
            </p>
            <MockFinancials />
          </>
        )
      },
      {
        id: 'settlement',
        title: '4. 정산 및 매출 관리',
        content: (
          <>
            <p className="text-slate-600 mb-4">
               K-Beautypass를 통해 발생한 매출과 정산 예정 금액을 투명하게 확인합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm mb-6">
               <li><strong>지급 대기금:</strong> 시술은 완료되었으나 아직 정산 입금 전인 금액입니다.</li>
               <li><strong>총 수수료 수익:</strong> 플랫폼 이용 수수료를 제외한 병원의 순수익을 계산합니다.</li>
               <li><strong>상태값:</strong> 정산 대기 → 지급 완료</li>
            </ul>
            <MockSettlementList />
          </>
        )
      },
      {
        id: 'product',
        title: '5. 시술 상품 관리',
        content: (
          <>
            <p className="text-slate-600 mb-4">
               병원의 시술 정보를 관리하고 가격을 수정합니다. 
               각 시술의 설명, 전후 사진, 시술 시간 등을 업데이트하여 고객에게 매력적으로 보이게 만듭니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-500">
               * 이벤트 가격이나 변동된 시술 가격을 실시간으로 반영할 수 있습니다.
            </div>
          </>
        )
      },
      {
        id: 'help',
        title: '🆘 도움이 필요하신가요?',
        content: (
          <div className="bg-brand-lightblue/10 border border-brand-lightblue/30 rounded-xl p-6">
             <p className="text-slate-700 mb-4 font-medium">
               파트너 센터 이용 중 문제가 발생하거나 궁금한 점이 있다면 언제든 파트너 지원팀으로 연락해 주세요.
             </p>
             <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-20 font-bold text-slate-500">이메일</div>
                   <div className="text-brand-blue underline">partner@k-beautypass.com</div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-20 font-bold text-slate-500">문의 전화</div>
                   <div className="text-slate-800">02-1234-5678</div>
                </div>
             </div>
          </div>
        )
      }
    ]
  }
];

// --- Main Component ---

const DocsPage: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState<DocId>('partnership');
  const activeDoc = DOCS_DATA.find(d => d.id === activeDocId) || DOCS_DATA[0];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          
          {/* Left Sidebar: Document Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit">
            <div className="mb-6 px-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Guide Book</h2>
              <div className="font-heading font-bold text-xl text-slate-900">사용자 가이드</div>
            </div>
            <nav className="space-y-1">
              {DOCS_DATA.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveDocId(doc.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeDocId === doc.id 
                      ? 'bg-brand-lightblue/20 text-brand-blue shadow-sm ring-1 ring-brand-lightblue/50' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >

                  {doc.title}
                  {activeDocId === doc.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              ))}
            </nav>

            <div className="mt-8 px-4 py-4 bg-slate-50 rounded-xl border border-slate-100 hidden lg:block">
              <p className="text-xs text-slate-500 mb-2">기술 지원이 필요하신가요?</p>
              <button className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1 mb-4">
                <HelpCircle className="w-3 h-3" /> 고객센터 연결
              </button>
              
              <a 
                href="https://vitalconnect.k-beautypass.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-brand-dark text-white text-xs font-bold py-2.5 rounded-lg hover:bg-slate-700 transition-colors shadow-md shadow-slate-200"
              >
                VitalConnect 바로가기
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDocId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <header className="mb-10 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-2 text-sm text-brand-blue font-medium mb-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Docs
                    <span className="text-slate-300">/</span>
                    {activeDoc.title}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                    {activeDoc.title}
                  </h1>
                </header>

                <div className="space-y-16">
                  {activeDoc.sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-32">
                      <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2 group cursor-pointer" onClick={() => scrollToSection(section.id)}>
                        {section.title}
                        <span className="opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity text-sm">#</span>
                      </h2>
                      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Right Sidebar: Table of Contents (On this page) */}
          <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 h-fit pl-8 border-l border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              On this page
            </h3>
            <ul className="space-y-3 relative">
              {/* Active Indicator Line (Simplified) */}
              <div className="absolute left-[-33px] top-0 bottom-0 w-0.5 bg-slate-100"></div>
              
              {activeDoc.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-slate-500 hover:text-brand-blue hover:underline text-left transition-colors block w-full truncate"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default DocsPage;