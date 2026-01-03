import React from 'react';
import { DollarSign, Users, CreditCard, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, CheckCircle, Clock, LayoutDashboard, Building2, ShoppingBag, CalendarCheck } from 'lucide-react';

export default function DashboardMock() {
  return (
    <div className="bg-slate-50 min-h-[600px] flex text-left font-sans text-slate-900 selection:bg-brand-blue/20">
       {/* Sidebar (Visual Only) */}
       <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4">
           {/* Logo Area */}
           <div className="flex items-center gap-2 mb-8 px-2">
               <img src="/favicon.svg" alt="K-BeautyPass" className="h-6 w-6" />
               <div className="font-black text-lg tracking-tight">K-BeautyPass</div>
           </div>
           
           <div className="space-y-6">
               <div className="space-y-1">
                   <div className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-slate-900 rounded-md font-medium text-sm">
                       <LayoutDashboard size={16} /> 대시보드
                   </div>
               </div>

               <div>
                   <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">병원 및 시술</div>
                   <div className="space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-md font-medium text-sm hover:bg-slate-50">
                            <Building2 size={16} /> 병원 관리
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-md font-medium text-sm hover:bg-slate-50">
                            <ShoppingBag size={16} /> 시술 상품
                        </div>
                   </div>
               </div>

               <div>
                   <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">운영 관리</div>
                   <div className="space-y-1">
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-md font-medium text-sm hover:bg-slate-50">
                            <CalendarCheck size={16} /> 예약 관리
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 text-slate-500 rounded-md font-medium text-sm hover:bg-slate-50">
                            <CreditCard size={16} /> 정산 관리
                        </div>
                   </div>
               </div>
           </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 p-8 overflow-hidden flex flex-col">
           {/* Header */}
           <div className="flex justify-between items-center mb-8">
               <div>
                   <h2 className="text-2xl font-bold tracking-tight text-slate-900">대시보드</h2>
                   <p className="text-slate-500 text-sm">병원 운영 현황을 한눈에 확인하세요.</p>
               </div>
               <div className="flex gap-2">
                   <div className="bg-white border border-slate-200 shadow-sm rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 flex items-center gap-2">
                       <Calendar size={14} className="text-slate-400"/> 오늘
                   </div>
                   <div className="bg-gray-900 text-white shadow-md rounded-md px-3 py-1.5 text-sm font-medium">
                       리포트 다운로드
                   </div>
               </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
               {[
                   { title: '총 매출', value: '₩128.4M', change: '+12.5%', icon: DollarSign, trend: 'up' },
                   { title: '신규 예약', value: '342', change: '+4.1%', icon: Calendar, trend: 'up' },
                   { title: '방문 환자', value: '1,204', change: '+8.2%', icon: Users, trend: 'up' },
                   { title: '대기 중', value: '12', change: '-2', icon: Activity, trend: 'down' },
               ].map((stat, i) => (
                   <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-2">
                           <span className="text-xs font-semibold text-slate-500">{stat.title}</span>
                           <stat.icon size={16} className="text-slate-400"/>
                       </div>
                       <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                       <div className={`text-xs font-bold flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'}`}>
                           {stat.trend === 'up' ? <ArrowUpRight size={12} className="mr-1"/> : <ArrowDownRight size={12} className="mr-1"/>}
                           {stat.change} <span className="text-slate-400 font-normal ml-1">지난달 대비</span>
                       </div>
                   </div>
               ))}
           </div>

           {/* Content Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
               {/* Main Chart Area */}
               <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
                   <div className="flex justify-between items-center mb-6">
                       <div>
                           <h3 className="font-bold text-slate-900">월별 매출 추이</h3>
                           <p className="text-xs text-slate-500">2025년 기준</p>
                       </div>
                       <MoreHorizontal size={16} className="text-slate-400"/>
                   </div>
                   
                   {/* CSS Bar Chart with Tooltips */}
                   <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-2 min-h-[200px]">
                       {[
                           { m: '1월', v: 34000000, h: 40 },
                           { m: '2월', v: 42000000, h: 55 },
                           { m: '3월', v: 38000000, h: 45 },
                           { m: '4월', v: 52000000, h: 65 },
                           { m: '5월', v: 68000000, h: 80 },
                           { m: '6월', v: 45000000, h: 50 },
                           { m: '7월', v: 55000000, h: 60 },
                           { m: '8월', v: 72000000, h: 85 },
                           { m: '9월', v: 60000000, h: 70 },
                           { m: '10월', v: 85000000, h: 95 },
                           { m: '11월', v: 92000000, h: 100 },
                           { m: '12월', v: 88000000, h: 90 },
                       ].map((data, i) => (
                           <div key={i} className="w-full bg-slate-50 rounded-t-sm relative group flex flex-col justify-end h-full">
                               {/* Tooltip */}
                               <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                   <div className="bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                       ₩{(data.v / 1000000).toFixed(1)}M
                                   </div>
                                   <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1"></div>
                               </div>
                               
                               {/* Bar - Changed to Black */}
                               <div 
                                   className="w-full bg-gray-900 rounded-t-sm transition-all duration-500 group-hover:bg-gray-700 relative"
                                   style={{ height: `${data.h}%` }}
                               ></div>
                           </div>
                       ))}
                   </div>
                   <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-medium px-1 uppercase tracking-wide">
                       <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                       <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                   </div>
               </div>

               {/* Side List: Recent Reservations */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
                   <h3 className="font-bold text-slate-900 mb-4">최근 예약</h3>
                   <div className="space-y-4 overflow-hidden">
                       {[
                           { name: 'Sarah J.', time: '10:00 AM', status: 'confirmed', proc: 'Botox' },
                           { name: 'Mike Chen', time: '11:30 AM', status: 'pending', proc: 'Filler' },
                           { name: 'Yuki T.', time: '02:00 PM', status: 'confirmed', proc: 'Laser' },
                           { name: 'Amy Park', time: '03:45 PM', status: 'confirmed', proc: 'Skin Care' },
                           { name: 'Tom Wilson', time: '04:30 PM', status: 'pending', proc: 'Consult' },
                       ].map((res, i) => (
                           <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0">
                               <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                       {res.name.charAt(0)}
                                   </div>
                                   <div>
                                       <div className="text-sm font-bold text-slate-900">{res.name}</div>
                                       <div className="text-xs text-slate-500">{res.proc}</div>
                                   </div>
                               </div>
                               <div className="text-right">
                                   <div className="text-xs font-bold text-slate-700">{res.time}</div>
                                   {res.status === 'confirmed' ? (
                                       <span className="text-[10px] text-green-600 flex items-center justify-end gap-0.5"><CheckCircle size={8}/> 확정</span>
                                   ) : (
                                       <span className="text-[10px] text-orange-500 flex items-center justify-end gap-0.5"><Clock size={8}/> 대기</span>
                                   )}
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
