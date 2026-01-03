'use client';

import React from 'react';
import { User, Ticket, CreditCard, ChevronRight, Settings, Heart, Bell, Users } from 'lucide-react';

export default function MyPageMock() {
  return (
    <div className="w-full h-[600px] bg-gray-50 text-gray-900 font-sans relative overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white p-5 pb-8 rounded-b-3xl shadow-sm z-10">
         <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-lg">My Page</h1>
            <Settings size={20} className="text-gray-400" />
         </div>
         
         <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                 <User size={30} className="text-gray-400" />
             </div>
             <div>
                 <div className="font-bold text-xl text-gray-900">Emily Clark</div>
                 <div className="text-xs text-gray-500">emily.clark@email.com</div>
                 <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-bold">
                     VIP Member
                 </div>
             </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Stats */}
          <div className="flex bg-white rounded-2xl p-4 shadow-sm border border-gray-100 justify-between">
              <div className="flex flex-col items-center flex-1 border-r border-gray-100 last:border-0">
                  <div className="text-brand-blue font-bold text-lg">2</div>
                  <div className="text-[10px] text-gray-400">Reservations</div>
              </div>
              <div className="flex flex-col items-center flex-1 border-r border-gray-100 last:border-0">
                  <div className="text-gray-900 font-bold text-lg">5</div>
                  <div className="text-[10px] text-gray-400">Coupons</div>
              </div>
              <div className="flex flex-col items-center flex-1 border-r border-gray-100 last:border-0">
                  <div className="text-gray-900 font-bold text-lg">12</div>
                  <div className="text-[10px] text-gray-400">Reviews</div>
              </div>
          </div>

          {/* Menu Lists */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {[
                { icon: Ticket, label: 'My Coupons', badge: 'New' },
                { icon: CreditCard, label: 'Payment Methods' },
                { icon: Heart, label: 'Wishlist' },
              ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                          <item.icon size={18} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                           {item.badge && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{item.badge}</span>}
                           <ChevronRight size={16} className="text-gray-300" />
                      </div>
                  </div>
              ))}
          </div>
          
           <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {[
                { icon: Bell, label: 'Notifications' },
                { icon: Users, label: 'Help Center' },
              ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                          <item.icon size={18} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                  </div>
              ))}
          </div>
      </div>
    
       {/* Bottom Nav */}
      <div className="h-16 border-t border-gray-100 bg-white flex items-center justify-around absolute bottom-0 w-full z-10 px-2 pb-2">
        <div className="flex flex-col items-center gap-1 text-gray-300">
           <div className="w-5 h-5 bg-gray-100 rounded-md" />
           <span className="text-[9px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-300">
           <div className="w-5 h-5 bg-gray-100 rounded-md" />
           <span className="text-[9px] font-medium">Search</span>
        </div>
         <div className="flex flex-col items-center gap-1 text-brand-blue">
           <div className="w-5 h-5 bg-brand-blue/20 rounded-md" />
           <span className="text-[9px] font-bold">My</span>
        </div>
      </div>
    </div>
  );
}
