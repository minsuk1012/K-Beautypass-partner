'use client';

import React from 'react';
import { Plus, Eye, Edit, Search } from 'lucide-react';

// Mock data
const MOCK_ADMINS = [
  { id: 1, name: '김원장', email: 'director@gangnam-clinic.com', role: 'master', roleLabel: '마스터', hospital: '강남 뷰티클리닉', status: 'active' },
  { id: 2, name: '박실장', email: 'manager@gangnam-clinic.com', role: 'manager', roleLabel: '매니저', hospital: '강남 뷰티클리닉', status: 'active' },
  { id: 3, name: '이데스크', email: 'staff1@gangnam-clinic.com', role: 'staff', roleLabel: '스탭', hospital: '강남 뷰티클리닉', status: 'active' },
  { id: 4, name: '최원장', email: 'director@cheongdam.com', role: 'master', roleLabel: '마스터', hospital: '청담 에스테틱', status: 'inactive' },
];

export default function AdminUserListMock() {
  return (
    <div className="flex flex-col h-[380px] bg-white text-left font-sans text-slate-900 text-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">관리자 계정 관리</h2>
            <p className="text-xs text-gray-500 mt-0.5">내부 직원 및 병원 담당자 계정을 관리합니다.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
            <Plus size={14} /> 관리자 추가
          </button>
        </div>
        
        {/* FilterBar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="이름 또는 이메일 검색..." 
              className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <select className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white">
            <option value="">권한 전체</option>
            <option value="master">마스터</option>
            <option value="manager">매니저</option>
            <option value="staff">스탭</option>
          </select>
        </div>
      </div>

      {/* DataTable */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">이름</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">권한</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">소속 병원</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_ADMINS.map(admin => (
              <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="font-bold text-gray-900">{admin.name}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="text-gray-600 text-xs">{admin.email}</div>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    admin.role === 'master' 
                      ? 'bg-purple-100 text-purple-700'
                      : admin.role === 'manager'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {admin.roleLabel}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="text-gray-600 text-xs">{admin.hospital}</div>
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    admin.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {admin.status === 'active' ? '활성' : '정지'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>4명의 관리자</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded bg-gray-900 text-white">1</button>
        </div>
      </div>
    </div>
  );
}
