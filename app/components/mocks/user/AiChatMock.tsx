import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Send, Sparkles, Languages, ChevronLeft, MoreVertical, Plus } from 'lucide-react';

export default function AiChatMock() {
  return (
    <div className="bg-white min-h-[500px] flex flex-col md:flex-row text-left text-xs sm:text-sm font-sans shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        {/* Left: AI Recommendation Mode (Actual UI Recreation) */}
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 bg-white flex flex-col relative">
            {/* Header: Recreating app/frontend/Components/user/organisms/chat/ChatHeader.tsx */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50 bg-purple-50/50 z-10">
                <div className="p-1 text-gray-400">
                    <ChevronLeft size={20} />
                </div>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-purple-100 ring-2 ring-white shadow-sm flex-shrink-0">
                    <img src="/ai_avatar.png" alt="AI Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xs font-bold text-purple-700 truncate flex items-center gap-1">
                        AI Assistant
                        <Sparkles size={10} className="text-purple-600 fill-purple-200" />
                    </h1>
                    <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[9px] text-gray-500 font-medium">Always active</span>
                    </div>
                </div>
                <MoreVertical size={16} className="text-gray-400" />
            </div>

            {/* AI Context Toggle: Recreating app/frontend/Pages/User/Chats/Show.tsx */}
            <div className="px-4 py-2 bg-purple-50/30 border-b border-purple-100/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-purple-700 font-medium">
                    <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-[8px]">👤</span>
                    </div>
                    <span>Use my profile for recommendations</span>
                </div>
                <div className="w-6 h-3 bg-purple-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Chat Body: Recreating app/frontend/Components/user/molecules/ChatMessage.tsx */}
            <div className="flex-1 p-4 space-y-4 bg-gray-50/30 overflow-y-auto max-h-[350px]">
                {/* User Bubble */}
                <div className="flex justify-end">
                    <div className="bg-[#6100FF] text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-[11px] font-medium leading-relaxed">
                        I have dry skin and fine lines around my eyes. What do you recommend?
                    </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex-shrink-0 mt-1 overflow-hidden shadow-sm">
                        <img src="/ai_avatar.png" alt="AI" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white border border-purple-100 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-[11px] leading-relaxed">
                        <p className="font-bold text-purple-700 mb-1">Rejuran Healer (Salmon Injection)</p>
                        <p>Based on your profile, I recommend <span className="font-bold">Rejuran Healer</span>. It is excellent for deep hydration and tissue regeneration.</p>
                        <div className="mt-3 flex gap-2">
                            <span className="px-2 py-0.5 bg-purple-50 border border-purple-100 rounded-md text-[9px] text-purple-600 font-bold">1-2 days recovery</span>
                            <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[9px] text-gray-500 font-bold">Low Pain</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Input: Recreating app/frontend/Components/user/molecules/ChatInput.tsx */}
            <div className="p-3 bg-white border-t border-gray-50 flex items-center gap-2">
                 <div className="p-1 text-gray-300">
                    <Plus size={20} />
                 </div>
                 <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-[10px] text-gray-400 font-medium">
                    Ask AI anything...
                 </div>
                 <div className="p-1 text-purple-600">
                    <Send size={18} />
                 </div>
            </div>
        </div>

        {/* Right: Reservation & Translation Chat (Admin Side Logic) */}
        <div className="flex-1 bg-white p-6 flex flex-col bg-gradient-to-br from-white to-blue-50/30">
             <div className="mb-4 flex items-center justify-between">
                <div className="font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                        <MessageSquare size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black">Sarah's Reservation</span>
                        <span className="text-[9px] text-gray-400 font-medium tracking-tight">K-BP Real-time Bridge</span>
                    </div>
                </div>
                <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md shadow-blue-200">
                    <Languages size={10}/> Translating
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 border border-gray-100 rounded-2xl shadow-inner pt-4">
                 {/* System Msg */}
                 <div className="text-center">
                     <span className="text-[9px] text-gray-400 bg-gray-100/50 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Confirmed · 14:30</span>
                 </div>

                 {/* Patient Msg (Original + Translated) */}
                 <div className="flex flex-col items-start max-w-[90%]">
                     <div className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-none text-[11px] font-medium leading-relaxed shadow-sm">
                        Is it okay to drink coffee before the treatment?
                     </div>
                     <div className="mt-1.5 flex gap-1.5 items-center text-brand-blue bg-blue-50/80 px-3 py-1.5 rounded-xl text-[10px] font-extrabold border border-blue-100/50">
                         <span className="opacity-50">KR</span>
                         <span className="tracking-tight">시술 전에 커피를 마셔도 되나요?</span>
                     </div>
                 </div>

                 {/* Admin Reply */}
                 <div className="flex flex-col items-end self-end max-w-[90%]">
                      <div className="bg-brand-dark text-white px-4 py-2.5 rounded-2xl rounded-tr-none text-[11px] font-medium leading-relaxed shadow-lg shadow-brand-dark/10">
                         가벼운 커피는 괜찮지만, 시술 2시간 전부터는 금식하시는 것이 좋습니다.
                      </div>
                      <div className="mt-1.5 flex gap-1.5 items-center text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-gray-100">
                           <span className="opacity-50 text-brand-blue">EN</span>
                           <span className="tracking-tight">Fasting 2 hours before is recommended.</span>
                      </div>
                 </div>
             </div>
        </div>
    </div>
  );
}

