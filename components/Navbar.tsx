'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/app/partner/actions';

interface Props {
  isLoggedIn: boolean;
}

export const Navbar = ({ isLoggedIn }: Props) => {
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    // If not on home page, go to home page first
    if (pathname !== '/') {
        router.push(`/#${id}`);
    } else {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        style={{ y: headerY }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <BrandLogo className="w-7 h-7" />
            <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
              KBEAUTYPASS
              <span className="text-brand-blue text-xs uppercase tracking-wider ml-1">Partners</span>
            </span>
          </Link>
          
            {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {['Problems', 'Solutions', 'Features'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-brand-blue transition-colors"
                type="button"
              >
                {item === 'Problems' ? '주요 과제' : item === 'Solutions' ? '솔루션' : '주요 기능'}
              </button>
            ))}
            

            
            <Link 
              href="/docs"
              className={`flex items-center gap-1 transition-colors ${pathname === '/docs' ? 'text-brand-blue font-bold' : 'hover:text-brand-blue'}`}
            >
              <FileText className="w-4 h-4" /> 가이드
            </Link>

            <Link
              href="/consultation"
              className="hover:text-brand-blue transition-colors"
            >
              입점 상담 신청
            </Link>

            {isLoggedIn ? (
                <button 
                  onClick={() => logout()}
                  className="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-brand-dark/10"
                >
                  로그아웃
                </button>
            ) : (
                <Link
                  href="/partner/onboarding"
                  className="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-brand-dark/10"
                >
                  바로 입점
                </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-800 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-30 bg-white border-b border-slate-200 shadow-xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Problems', 'Solutions', 'Features'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-lg font-medium text-slate-800 py-2 border-b border-slate-100"
                  type="button"
                >
                  {item === 'Problems' ? '주요 과제' : item === 'Solutions' ? '솔루션' : '주요 기능'}
                </button>
              ))}

               <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-slate-800 py-2 border-b border-slate-100 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" /> 가이드
              </Link>
              <Link
                href="/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-slate-800 py-2 border-b border-slate-100"
              >
                입점 상담 신청
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-4 bg-brand-blue text-white w-full py-4 rounded-xl font-bold flex items-center justify-center text-lg shadow-lg shadow-brand-blue/20"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  href="/partner/onboarding"
                  className="mt-4 bg-brand-blue text-white w-full py-4 rounded-xl font-bold flex items-center justify-center text-lg shadow-lg shadow-brand-blue/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  바로 입점
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
