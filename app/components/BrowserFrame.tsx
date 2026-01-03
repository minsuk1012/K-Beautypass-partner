'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
  isDark?: boolean;
}

export default function BrowserFrame({ children, url = "k-beautypass.com", className, isDark = false }: BrowserFrameProps) {
  return (
    <div className={clsx(
        "rounded-xl overflow-hidden shadow-browser border transition-all duration-300",
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200/60",
        className
    )}>
      {/* Browser Toolbar */}
      <div className={clsx(
          "h-10 px-4 flex items-center gap-4 border-b",
          isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50/80 border-gray-100"
      )}>
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
        </div>

        {/* Address Bar */}
        <div className={clsx(
             "flex-1 h-6 rounded-md flex items-center justify-center text-[10px] font-medium opacity-60",
             isDark ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500 shadow-sm border border-gray-100"
        )}>
           <span className="flex items-center gap-1">
             🔒 {url}
           </span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-10"></div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
