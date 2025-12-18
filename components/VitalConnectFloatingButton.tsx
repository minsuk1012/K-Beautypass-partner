'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export const VitalConnectFloatingButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[60] font-sans">
            <Link
                href="https://vitalconnect.k-beautypass.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-brand-blue/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                    className="relative bg-white border border-slate-100 dark:border-slate-800 shadow-2xl rounded-full p-1.5 pr-6 flex items-center gap-3 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center relative shrink-0 overflow-hidden">
                        <motion.div
                            animate={{ x: isHovered ? 50 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute"
                        >
                             <Globe className="w-5 h-5 text-white" />
                        </motion.div>
                         <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: isHovered ? 0 : -50 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute"
                        >
                             <ArrowRight className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold leading-tight">병원 해외 마케팅이 필요하세요?</span>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-slate-900 leading-tight">Vital Connect</span>
                            <motion.span 
                                animate={{ x: isHovered ? 3 : 0 }}
                                className="text-brand-blue"
                            >
                                <ArrowRight className="w-3 h-3" />
                            </motion.span>
                        </div>
                    </div>
                    
                    {/* Slide Highlight Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </motion.div>
            </Link>
        </div>
    );
};
