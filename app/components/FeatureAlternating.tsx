'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FeatureAlternatingProps {
  title: string;
  description: string;
  badge: string;
  features: string[];
  visual: ReactNode;
  reversed?: boolean;
}

export default function FeatureAlternating({ title, description, badge, features, visual, reversed = false }: FeatureAlternatingProps) {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={clsx(
          "flex flex-col gap-16 lg:gap-24 items-center",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl"
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
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {description.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i !== description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            
            <ul className="space-y-4">
               {features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <CheckCircle2 className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                   <span className="font-semibold text-gray-700">{feature}</span>
                 </li>
               ))}
            </ul>
          </motion.div>

          {/* Visual Content (Browser Frame) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl relative"
          >

             
             {visual}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
