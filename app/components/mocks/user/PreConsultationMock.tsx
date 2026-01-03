'use client';

import React from 'react';
import { ChevronLeft, Globe, Check, CircleDot, AlertCircle } from 'lucide-react';

export default function PreConsultationMock() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-4 px-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button className="w-8 h-8 flex items-center justify-center text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-bold text-gray-900">Pre-Consultation</span>
          <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            <Globe size={12} />
            EN
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5">
          <div className="flex-1 h-1 rounded-full bg-[#6100FF]" />
          <div className="flex-1 h-1 rounded-full bg-[#6100FF]" />
          <div className="flex-1 h-1 rounded-full bg-gray-200" />
          <div className="flex-1 h-1 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-5 py-5">
        {/* Section Title */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Medical History</h2>
          <p className="text-xs text-gray-500">Please answer the following questions accurately.</p>
        </div>

        {/* Question 1 */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-800 mb-2.5 block">
            Do you have any allergies?
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#6100FF]/5 border-2 border-[#6100FF]">
              <div className="w-5 h-5 rounded-full bg-[#6100FF] flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium text-gray-900">Yes</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              <span className="text-sm font-medium text-gray-600">No</span>
            </div>
          </div>
        </div>

        {/* Allergy Detail Input */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">
            Please specify your allergies
          </label>
          <div className="relative">
            <input
              type="text"
              value="Penicillin, Aspirin"
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-[#6100FF]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check size={16} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-800 mb-2.5 block">
            Any previous cosmetic procedures?
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              <span className="text-sm font-medium text-gray-600">Yes</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#6100FF]/5 border-2 border-[#6100FF]">
              <div className="w-5 h-5 rounded-full bg-[#6100FF] flex items-center justify-center">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium text-gray-900">No</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3">
          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Your responses will be automatically translated and shared with the medical staff before your visit.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-5 border-t border-gray-100 bg-white">
        <button className="w-full bg-[#6100FF] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-transform">
          Continue
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Step 2 of 4</p>
      </div>
    </div>
  );
}
