import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <BrandLogo className="w-6 h-6" />
              <div className="font-heading text-lg font-bold text-slate-900">KBEAUTYPASS</div>
           </div>
           <p className="text-sm text-slate-500 mb-2">서울특별시 강남구 역삼로 114, 8층 8071호</p>
           <p className="text-sm text-slate-500">입점 문의: partner@k-beautypass.com</p>
        </div>
        
        <div className="text-sm text-slate-400">
          © 2024 K-Beauty Pass. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
