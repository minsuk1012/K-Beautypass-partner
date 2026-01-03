import React, { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl ${className}`}>
        {/* Notch / Dynamic Island */}
        <div className="w-[120px] h-[30px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
        <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[9px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[9px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[9px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[9px] top-[142px] rounded-e-lg"></div>
        
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative z-10">
            {children}
            
            {/* Status Bar Mock */}
             <div className="absolute top-0 w-full h-11 flex justify-between items-center px-6 z-20 pointer-events-none mix-blend-difference text-white text-[10px] font-bold">
                 <span>9:41</span>
                 <div className="flex gap-1.5 items-center">
                    <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg> 
                    <div className="w-5 h-2.5 bg-current rounded-sm border border-current opacity-80 relative">
                        <div className="absolute inset-0.5 bg-current rounded-[1px] w-[60%]"></div>
                    </div>
                 </div>
             </div>
        </div>
    </div>
  );
}
