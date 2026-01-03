'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface FeatureShowcaseAsymmetricProps {
  title: string;
  description: string;
  badge: string;
  features: string[];
  visual: ReactNode;
  reversed?: boolean;
}

export default function FeatureShowcaseAsymmetric({ title, description, badge, features, visual, reversed = false }: FeatureShowcaseAsymmetricProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Decor: Clean grid or lines instead of gradient blob */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={clsx(
            "flex flex-col gap-12 lg:gap-20 items-center",
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
            
            {/* Text Area (40% width on Desktop) */}
            <motion.div 
                initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-5/12"
            >
                <div className="mb-6">
                    <span className="text-brand-blue font-bold text-sm uppercase tracking-[0.2em]">{badge}</span>
                    <div className="h-1 w-12 bg-brand-blue mt-2 rounded-full" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    {title.split('\n').map((line, i) => (
                        <span key={i} className="block">
                            {line}
                        </span>
                    ))}
                </h2>
                
                <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                    {description.split('\n').map((line, i) => (
                        <span key={i} className="block mb-1">
                            {line}
                        </span>
                    ))}
                </p>

                <ul className="grid grid-cols-1 gap-4 mb-4">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                            </div>
                            <span className="font-bold text-gray-700">{feature}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Visual Area (60% width on Desktop, Bleed) */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                 className={clsx(
                     "w-full lg:w-7/12 relative",
                     reversed ? "lg:-ml-12" : "lg:-mr-12"
                 )}
            >
                <div className="relative rounded-[2.5rem] bg-gray-50 p-4 sm:p-8 border border-gray-100 shadow-[0_32px_80px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_100px_rgba(0,0,0,0.1)] transition-shadow">
                    {/* Shadow Accent */}
                    <div className="absolute inset-0 bg-white/40 blur-xl -z-10 rounded-[2.5rem]" />
                    
                    <div className="overflow-hidden rounded-2xl shadow-sm border border-black/5">
                        {visual}
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
