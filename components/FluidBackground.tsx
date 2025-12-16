/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* Brand Blue Blob - Trust/Medical */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-brand-lightblue rounded-full mix-blend-multiply filter blur-[80px] opacity-70 will-change-transform"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Brand Pink/Red Blob - Beauty/Vitality */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-brand-pink rounded-full mix-blend-multiply filter blur-[80px] opacity-60 will-change-transform"
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 50, -25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />
      
      {/* Small accent blob for Red */}
       <motion.div
        className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-red-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-40 will-change-transform"
        animate={{
          x: [0, 20, -20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Clean White Overlay for content readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-darken pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;