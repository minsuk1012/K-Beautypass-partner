'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCenteredProps {
  title: string;
  description: string;
  badge: string;
  visual: ReactNode;
  bgType?: 'white' | 'slate';
}

export default function FeatureCentered({ title, description, badge, visual, bgType = 'white' }: FeatureCenteredProps) {
  return (
    <section className={`py-24 overflow-hidden ${bgType === 'slate' ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-6 uppercase tracking-wider">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.15] tracking-tight">
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i !== title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto relative group"
        >
          {/* Subtle decoration instead of large gradient */}
          <div className="absolute -inset-4 bg-gradient-to-b from-gray-100 to-transparent rounded-[2rem] -z-10 group-hover:opacity-100 opacity-50 transition-opacity" />
          
          <div className="shadow-2xl shadow-blue-900/10 rounded-2xl overflow-hidden border border-gray-100">
            {visual}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
