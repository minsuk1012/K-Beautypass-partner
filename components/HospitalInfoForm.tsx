'use client';

import React from 'react';
import Autocomplete from 'react-google-autocomplete';

interface HospitalInfo {
    name: string;
    representative_name: string;
    business_registration_number: string;
    phone: string;
    district: string;
    address: string;
    detailed_address: string;
    email: string;
    description: string;
    website: string;
    manager_name: string;
    manager_phone: string;
    logo_file?: File | null;
    interior_files?: File[];
    logo_preview?: string;
    interior_previews?: string[];
    logo_url?: string;
    interior_images?: string[];
}

interface Props {
    info: HospitalInfo;
    onChange: (field: keyof HospitalInfo, value: any) => void;
    onRemoveImage?: (url: string) => void;
}

const DISTRICTS = [
    '강남구', '서초구', '송파구', '강동구', '마포구', '용산구', '성동구', '광진구', 
    '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', 
    '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '종로구', '중구'
].sort();

import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function HospitalInfoForm({ info, onChange, onRemoveImage }: Props) {
    
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('이미지 크기는 5MB 이하여야 합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            onChange('logo_file', file);
            onChange('logo_preview', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleInteriorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        
        const currentFiles = info.interior_files || [];
        if (currentFiles.length + files.length > 5) {
             alert('원내 이미지는 최대 5장까지 등록 가능합니다.');
             return;
        }

        const validFiles = files.filter(f => {
             if(f.size > 5 * 1024 * 1024) {
                 alert(`"${f.name}" 파일이 5MB를 초과하여 제외되었습니다.`);
                 return false;
             }
             return true;
        });
        
        if (validFiles.length === 0) return;

        const newPreviews: string[] = [];
        let loadedCount = 0;

        validFiles.forEach(file => {
             const reader = new FileReader();
             reader.onloadend = () => {
                  newPreviews.push(reader.result as string);
                  loadedCount++;
                  if (loadedCount === validFiles.length) {
                       onChange('interior_files', [...currentFiles, ...validFiles]);
                       onChange('interior_previews', [...(info.interior_previews || []), ...newPreviews]);
                  }
             };
             reader.readAsDataURL(file);
        });
    };

    const removeLogo = () => {
        if (info.logo_url && onRemoveImage) {
            if (confirm('저장된 로고 이미지를 삭제하시겠습니까? (즉시 삭제됩니다)')) {
                onRemoveImage(info.logo_url);
            } else {
                return;
            }
        }
        onChange('logo_file', null);
        onChange('logo_preview', '');
        onChange('logo_url', '');
    };

    const removeInterior = (index: number) => {
        // This handles removal of NEWLY added files (previews)
        const newFiles = [...(info.interior_files || [])];
        newFiles.splice(index, 1);
        const newPreviews = [...(info.interior_previews || [])];
        newPreviews.splice(index, 1);
        
        onChange('interior_files', newFiles);
        onChange('interior_previews', newPreviews);
    };

    const removeExistingInterior = (index: number) => {
        const urlToRemove = (info.interior_images || [])[index];
        
        if (confirm('저장된 이미지를 삭제하시겠습니까? (즉시 삭제됩니다)')) {
            if (urlToRemove && onRemoveImage) {
                onRemoveImage(urlToRemove);
            }
            const newImages = [...(info.interior_images || [])];
            newImages.splice(index, 1);
            onChange('interior_images', newImages);
        }
    };

    const logoDisplay = info.logo_preview || info.logo_url;

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">병원 기본 정보</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo & Images Section */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">병원명 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={info.name}
                        onChange={(e) => onChange('name', e.target.value)}
                        placeholder="병원 공식 명칭"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">대표자명 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={info.representative_name}
                        onChange={(e) => onChange('representative_name', e.target.value)}
                        placeholder="대표자 성함"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">사업자 등록번호</label>
                    <input
                        type="text"
                        value={info.business_registration_number}
                        onChange={(e) => onChange('business_registration_number', e.target.value)}
                        placeholder="000-00-00000"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">대표 전화번호</label>
                    <input
                        type="text"
                        value={info.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        placeholder="02-0000-0000"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">지역 (구/군) <span className="text-red-500">*</span></label>
                    <select
                        value={info.district}
                        onChange={(e) => onChange('district', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    >
                        <option value="">지역 선택</option>
                        {DISTRICTS.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">주소 <span className="text-red-500">*</span></label>
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                            onPlaceSelected={(place) => {
                                let detailedAddress = place.formatted_address?.replace(/^대한민국\s*/, '') || '';
                                
                                const components = place.address_components;
                                if (components) {
                                    // Extract District (Gu)
                                    const districtComponent = components.find((c: any) => 
                                        c.types.includes('sublocality_level_1') || c.types.includes('locality')
                                    );
                                    if (districtComponent) {
                                        const districtName = districtComponent.long_name;
                                        const matched = DISTRICTS.find(d => districtName.includes(d));
                                        if (matched) onChange('district', matched);
                                    }

                                    // Construct Road Name Address
                                    const route = components.find((c: any) => c.types.includes('route'))?.long_name;
                                    const streetNumber = components.find((c: any) => c.types.includes('street_number'))?.long_name;
                                    const city = components.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name; // Seoul
                                    const district = districtComponent?.long_name;

                                    // If we have road name components, prefer constructing it
                                    if (route) {
                                      const parts = [];
                                      if (city) parts.push(city);
                                      if (district) parts.push(district);
                                      parts.push(route);
                                      if (streetNumber) parts.push(streetNumber);
                                      
                                      if (parts.length >= 3) {
                                          detailedAddress = parts.join(' ');
                                      }
                                    }
                                }
                                onChange('address', detailedAddress);
                            }}
                            options={{
                                types: ["establishment", "geocode"],
                                componentRestrictions: { country: "kr" },
                                fields: ["formatted_address", "address_components", "name"]
                            }}
                            defaultValue={info.address}
                            onChange={(e: any) => onChange('address', e.target.value)}
                            placeholder="병원명 또는 주소 검색 (자동완성)"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">상세 주소 (선택)</label>
                        <input
                            type="text"
                            value={info.detailed_address || ''}
                            onChange={(e) => onChange('detailed_address', e.target.value)}
                            placeholder="층, 호수 등 추가 주소 입력"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">대표 이메일</label>
                    <input
                        type="email"
                        value={info.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        placeholder="contact@hospital.com"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">웹사이트</label>
                    <input
                        type="url"
                        value={info.website}
                        onChange={(e) => onChange('website', e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">담당자 성함 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={info.manager_name}
                        onChange={(e) => onChange('manager_name', e.target.value)}
                        placeholder="담당자 성함"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">담당자 연락처 <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={info.manager_phone}
                        onChange={(e) => onChange('manager_phone', e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">병원 소개</label>
                    <textarea
                        value={info.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        rows={4}
                        placeholder="병원에 대한 간단한 소개를 입력해주세요."
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                    />
                </div>

                {/* Logo & Images Section */}
                <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-brand-blue" /> 병원 이미지 관리
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Logo Upload */}
                        <div>
                            <div className="text-xs font-bold text-slate-600 mb-2">병원 로고 (1장) <span className="text-xs text-slate-400 font-normal">5MB 이하</span></div>
                            
                            {logoDisplay ? (
                                <div className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                                     <img src={logoDisplay} alt="Logo" className="w-full h-full object-contain bg-slate-50" />
                                     <button onClick={removeLogo} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <X className="w-4 h-4" />
                                     </button>
                                </div>
                            ) : (
                                <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-brand-blue transition-colors group text-slate-400 hover:text-brand-blue">
                                     <Upload className="w-6 h-6 mb-2" />
                                     <span className="text-xs font-medium">로고 업로드</span>
                                     <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                </label>
                            )}
                        </div>

                        {/* Interior Upload */}
                        <div className="md:col-span-2">
                            <div className="text-xs font-bold text-slate-600 mb-2">원내 이미지 (최대 5장) <span className="text-xs text-slate-400 font-normal">5MB 이하</span></div>
                            <div className="flex flex-wrap gap-4">
                                {/* Existing Images */}
                                {(info.interior_images || []).map((imgUrl, idx) => (
                                     <div key={`existing-${idx}`} className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                                          <img src={imgUrl} alt={`Interior Existing ${idx}`} className="w-full h-full object-cover" />
                                          <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-br">저장됨</div>
                                          <button onClick={() => removeExistingInterior(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <X className="w-4 h-4" />
                                          </button>
                                     </div>
                                ))}

                                {/* New Previews */}
                                {(info.interior_previews || []).map((preview, idx) => (
                                     <div key={`new-${idx}`} className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                                          <img src={preview} alt={`Interior New ${idx}`} className="w-full h-full object-cover" />
                                          <button onClick={() => removeInterior(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <X className="w-4 h-4" />
                                          </button>
                                     </div>
                                ))}
                                
                                {((info.interior_images?.length || 0) + (info.interior_files?.length || 0) < 5) && (
                                    <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-brand-blue transition-colors group text-slate-400 hover:text-brand-blue">
                                        <Upload className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-medium">이미지 추가</span>
                                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleInteriorUpload} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
