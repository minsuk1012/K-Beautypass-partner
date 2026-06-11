"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { trackPartnerServiceClick } from "../lib/analytics";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (pathname === "/lp/h") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative rounded-2xl bg-slate-800 px-5 py-3.5 text-sm leading-relaxed text-white shadow-xl"
          >
            <span className="text-slate-300">해외 환자 유치를 위한</span>
            <br />
            <span className="font-bold text-blue-400">데이터 기반 글로벌 마케팅</span>{" "}
            솔루션입니다.
            {/* 말풍선 꼬리 */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-slate-800" />
            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-xs text-white transition-colors hover:bg-slate-500"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA 버튼 */}
      <div className="relative">
        {/* HOT 배지 */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
          className="absolute -right-2 -top-2 z-10 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-md"
        >
          HOT
        </motion.span>

        <motion.a
          href="https://vitalconnect.k-beautypass.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackPartnerServiceClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 shadow-lg shadow-blue-500/25 transition-shadow hover:shadow-xl hover:shadow-blue-500/30"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-widest text-blue-200">
              PARTNER SERVICE
            </span>
            <span className="text-sm font-bold text-white">
              바이탈커넥트 이동
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </motion.a>
      </div>
    </div>
  );
}
