import React from 'react';
import { MoreVertical, Send, Plus, ChevronLeft, ShoppingBag, Star, Zap } from 'lucide-react';

const MockProductCard = ({ 
  title = "[Special] Potenza 240 Shots", 
  hospital = "Serene Medical Spa",
  price = "720,000",
  rating = "4.8" 
}: {
  title?: string;
  hospital?: string;
  price?: string | number;
  rating?: string;
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mt-3 w-[260px] mx-auto">
    <div className="h-40 bg-pink-100 relative">
       {/* Placeholder Image replacement */}
       <img src="/hospital_product.png" alt="Product" className="w-full h-full object-cover" />
       
       <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-800">{rating}</span>
       </div>
    </div>
    <div className="p-4">
      <div className="font-bold text-base text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-400 mb-3">{hospital}</div>
      
      <div className="flex items-center justify-between">
         <div className="font-bold text-purple-600 text-lg">
             {typeof price === 'number' ? price.toLocaleString() : price}
         </div>
         <span className="bg-gray-100/80 text-gray-600 text-xs px-3 py-1.5 rounded-lg font-bold">
             View Reservation
         </span>
      </div>
    </div>
  </div>
);

export const MockHospitalChatRoom = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden max-w-sm mx-auto my-6 flex flex-col h-[600px] shadow-sm font-sans">
       
       {/* 1. Header */}
       <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100 z-10 shadow-sm bg-white sticky top-0">
          <div className="p-1 text-gray-800">
              <ChevronLeft size={24} />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-100">
              <span className="text-xl">❖</span>
          </div>
          <div className="flex-1">
              <h1 className="text-base font-bold text-gray-900">
                  Serene Medical Spa
              </h1>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500">Typically replies in 1 hr</span>
              </div>
          </div>
          <div className="text-gray-400">
              <MoreVertical size={24} />
          </div>
       </div>
  
       {/* 2. Chat Area */}
       <div className="flex-1 bg-[#FAFAFA] p-4 space-y-6 overflow-y-auto">
          
          {/* Hospital Message 1: Product Card */}
          <div className="flex w-full justify-start items-start gap-2">
             <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center">
                 <span className="text-sm text-gray-800">❖</span>
             </div>
             <div className="flex flex-col items-start max-w-[85%]">
                 <span className="text-[10px] text-gray-800 font-bold mb-1 ml-1">Hospital</span>
                 <div className="bg-white border border-gray-100 rounded-[20px] rounded-tl-sm px-5 py-3 text-sm text-gray-800 shadow-sm mb-2">
                     Here is your reserved product info.
                 </div>
                 {/* Card */}
                 <MockProductCard />
                 <span className="text-[10px] text-gray-400 mt-2 ml-1">4:02 PM</span>
             </div>
          </div>

          {/* Hospital Message 2: Reservation Confirmation */}
          <div className="flex w-full justify-start items-start gap-2">
             <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-100 flex items-center justify-center">
                 <span className="text-sm text-gray-800">❖</span>
             </div>
             <div className="flex flex-col items-start max-w-[85%]">
                 <span className="text-[10px] text-gray-800 font-bold mb-1 ml-1">Hospital</span>
                 <div className="bg-white border border-gray-100 rounded-[20px] rounded-tl-sm px-5 py-4 text-sm text-gray-800 shadow-sm leading-relaxed space-y-4 min-w-[240px]">
                     <p>Hello, Test User 1765952556.</p>
                     <p>Your reservation for 2025-12-27 11:30 has been received.</p>
                     <p>We will notify you once it's confirmed.</p>
                 </div>
                 <span className="text-[10px] text-gray-400 mt-2 ml-1">4:02 PM</span>
             </div>
          </div>

       </div>
    </div>
  );
};