'use client';

import React from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

// Mock data
const MOCK_PRODUCTS = [
  { id: 1, name: '프리미엄 울쎄라 300샷', hospital: '강남 뷰티클리닉', category: '리프팅', price: 890000, status: 'active' },
  { id: 2, name: '인모드 FX 전체 얼굴', hospital: '청담 에스테틱', category: '리프팅', price: 1200000, status: 'active' },
  { id: 3, name: '스킨보톡스 100U', hospital: '강남 뷰티클리닉', category: '주사', price: 350000, status: 'inactive' },
  { id: 4, name: '리쥬란 힐러 2cc', hospital: '압구정 피부과', category: '재생', price: 450000, status: 'active' },
  { id: 5, name: '볼 필러 1cc', hospital: '청담 에스테틱', category: '필러', price: 280000, status: 'active' },
];

export default function HospitalProductListMock() {
  return (
    <div className="flex flex-col h-[420px] bg-white text-left font-sans text-slate-900 text-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">병원 상품 관리</h2>
            <p className="text-xs text-gray-500 mt-0.5">시술 상품을 등록하고 관리합니다.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
            <Plus size={14} /> 새 상품 등록
          </button>
        </div>
        
        {/* Tabs + Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button className="px-3 py-1.5 text-xs font-medium bg-white text-gray-900 rounded-md shadow-sm">전체</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-md">판매중</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-md">품절</button>
          </div>
          
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="상품 검색..." 
              className="pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
      </div>

      {/* DataTable */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">시술명</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">병원</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">카테고리</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">가격</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_PRODUCTS.map(product => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-bold text-gray-900">{product.name}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-gray-600">{product.hospital}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">{product.category}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">₩{product.price.toLocaleString()}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {product.status === 'active' ? '판매중' : '품절'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>5개 항목 표시 중</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded bg-gray-900 text-white">1</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
        </div>
      </div>
    </div>
  );
}
