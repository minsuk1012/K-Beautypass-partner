'use client';

import React from 'react';
import { ArrowLeft, Share, Heart, MapPin, Clock, Star, ChevronDown } from 'lucide-react';

export default function HospitalDetailMock() {
  return (
    <div className="w-full h-[600px] bg-white text-gray-900 font-sans relative overflow-hidden flex flex-col">
      {/* Header Image */}
      <div className="h-48 relative shrink-0">
        <img 
            src="/hospital_interior_treatment_01.webp" 
            alt="Hospital Interior" 
            className="w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full p-4 flex justify-between items-center text-white z-10">
          <ArrowLeft size={24} className="drop-shadow-md" />
          <div className="flex gap-4">
            <Share size={24} className="drop-shadow-md" />
            <Heart size={24} className="drop-shadow-md" />
          </div>
        </div>
        
        {/* Mock Image Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-5 text-white z-10">
           <div className="text-xs font-bold opacity-90 mb-1">Gangnam, Seoul</div>
           <div className="text-2xl font-black tracking-tight">Gangnam W Clinic</div>
        </div>
      </div>

      {/* Info Stats */}
      <div className="flex border-b border-gray-100 py-3 relative z-10 bg-white rounded-t-2xl -mt-4">
         <div className="flex-1 flex flex-col items-center border-r border-gray-100">
          <div className="flex items-center gap-1 font-bold text-gray-900">
             <Star size={14} className="text-yellow-400 fill-yellow-400" /> 4.9
          </div>
          <div className="text-[10px] text-gray-400">Review 128</div>
        </div>
        <div className="flex-1 flex flex-col items-center border-r border-gray-100">
           <div className="font-bold text-gray-900">10:00~</div>
           <div className="text-[10px] text-green-500">Open Now</div>
        </div>
         <div className="flex-1 flex flex-col items-center">
           <div className="font-bold text-gray-900">English</div>
           <div className="text-[10px] text-purple-500">Available</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex-1 py-3 text-center text-sm font-bold border-b-2 border-brand-dark text-brand-dark">Procedures</div>
        <div className="flex-1 py-3 text-center text-sm font-medium text-gray-400">Info</div>
        <div className="flex-1 py-3 text-center text-sm font-medium text-gray-400">Reviews</div>
      </div>

      {/* Procedure List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3 pb-24">
         <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-gray-700">Best Seller</h3>
            <span className="text-xs text-brand-blue font-bold">See All</span>
         </div>
         
         {[
             { name: 'Premium Skin Booster', price: '250,000', img: '/hospital_product_1.png' },
             { name: 'Ulthera Lifting 300', price: '890,000', img: '/hospital_product_2.png' },
             { name: 'Pico Toning Laser', price: '120,000', img: '/hospital_product_3.png' }
         ].map((item, idx) => (
           <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
              <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden bg-gray-100">
                 <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                 <div>
                    <div className="flex justify-between items-start">
                        <div className="text-[10px] text-brand-blue font-bold mb-0.5 border border-blue-100 bg-blue-50 inline-block px-1.5 rounded">EVENT</div>
                    </div>
                    <div className="font-bold text-sm text-gray-900 mb-1 leading-tight">{item.name}</div>
                    <div className="text-[10px] text-gray-400 line-clamp-1">Genuine tips used, Certificate...</div>
                 </div>
                 <div className="flex items-center justify-between mt-2">
                    <div className="text-brand-dark font-black text-sm">₩ {item.price}</div>
                    <button className="bg-brand-dark text-white text-[10px] px-3 py-1.5 rounded-full font-bold">
                       Book
                    </button>
                 </div>
              </div>
           </div>
         ))}
      </div>

       {/* Bottom CTA */}
       <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100 flex gap-3 z-20">
          <button className="flex-1 py-3 rounded-xl border border-brand-blue text-brand-blue font-bold text-sm">
             Inquiry
          </button>
          <button className="flex-[2] py-3 rounded-xl bg-brand-blue text-white font-bold text-sm shadow-lg shadow-blue-200">
             Reservation Request
          </button>
       </div>
    </div>
  );
}
