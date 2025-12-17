import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <img src="/favicon.svg" alt="K-Beauty Pass Logo" className={`${className} object-contain`} />
);
