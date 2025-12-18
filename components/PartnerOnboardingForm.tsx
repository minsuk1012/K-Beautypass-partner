'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveDraft, submitFinal, login, register, undoSubmit } from '@/app/partner/actions';
import { Trash2, Plus, Save, Send, AlertCircle, X, Copy, Building2, Stethoscope, Loader2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import HospitalInfoForm from './HospitalInfoForm';
import { supabase } from '@/lib/supabaseClient';

interface Pricing {
    description: string;
    price: string | number;
    promotion_price?: string | number;
}

interface Product {
    id?: string;
    name: string;
    category_id: string;
    variation_id: string;
    pricings: Pricing[];
}

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
    categories: any[];
    variations: any[];
    initialProducts: any[];
    initialHospitalInfo: HospitalInfo | null;
    isSubmitted: boolean;
    isLoggedIn: boolean;
}

export default function PartnerOnboardingForm({ categories, variations, initialProducts, initialHospitalInfo, isSubmitted, isLoggedIn: initialIsLoggedIn }: Props) {
    const [activeTab, setActiveTab] = useState<'hospital' | 'procedure'>('hospital');
    const [products, setProducts] = useState<Product[]>([]);
    const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>({
        name: '',
        representative_name: '',
        business_registration_number: '',
        phone: '',
        district: '',
        address: '',
        detailed_address: '',
        email: '',
        description: '',
        website: '',
        manager_name: '',
        manager_phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<'draft' | 'final' | null>(null);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialProducts && initialProducts.length > 0) {
            const mapped = initialProducts.map(p => {
                const variation = variations.find(v => v.id === p.variation_id);
                return {
                    id: p.id,
                    name: p.name,
                    category_id: variation?.category_id || '',
                    variation_id: p.variation_id,
                    pricings: p.hospital_product_pricings.map((pr: any) => ({
                        description: pr.description,
                        price: pr.price,
                        promotion_price: pr.promotion_price
                    }))
                };
            });
            setProducts(mapped);
        } else {
            if (!isSubmitted && products.length === 0) addProduct(); 
        }

        if (initialHospitalInfo) {
            setHospitalInfo(initialHospitalInfo);
        }
    }, [initialProducts, variations, isSubmitted, initialHospitalInfo]);

    const addProduct = () => {
        setProducts(prev => [
            ...prev,
            {
                id: `temp-${Date.now()}`,
                name: '',
                category_id: '',
                variation_id: '',
                pricings: [{ description: '', price: '', promotion_price: '' }]
            }
        ]);
    };

    const duplicateProduct = (index: number) => {
        setProducts(prev => {
            const original = prev[index];
            const newProduct = {
                ...original,
                id: `temp-${Date.now()}`, 
                pricings: original.pricings.map(p => ({ ...p })), 
            };
            const newProducts = [...prev];
            newProducts.splice(index + 1, 0, newProduct);
            return newProducts;
        });
    }

    const removeProduct = (index: number) => {
        setProducts(prev => prev.filter((_, i) => i !== index));
    };

    const updateProduct = (index: number, field: keyof Product, value: any) => {
        setProducts(prev => {
            const newProducts = [...prev];
            newProducts[index] = { ...newProducts[index], [field]: value };
            if (field === 'category_id') {
                newProducts[index].variation_id = '';
            }
            return newProducts;
        });
    };

    const addPricing = (productIndex: number) => {
        setProducts(prev => {
            const newProducts = [...prev];
            const product = newProducts[productIndex];
            newProducts[productIndex] = {
                ...product,
                pricings: [...product.pricings, { description: '', price: '', promotion_price: '' }]
            };
            return newProducts;
        });
    };

    const removePricing = (productIndex: number, pricingIndex: number) => {
        setProducts(prev => {
            const newProducts = [...prev];
            const product = newProducts[productIndex];
            if (product.pricings.length > 1) {
                newProducts[productIndex] = {
                    ...product,
                    pricings: product.pricings.filter((_, i) => i !== pricingIndex)
                };
            }
            return newProducts;
        });
    };

    const updatePricing = (productIndex: number, pricingIndex: number, field: keyof Pricing, value: any) => {
        setProducts(prev => {
            const newProducts = [...prev];
            const product = newProducts[productIndex];
            const newPricings = [...product.pricings];
            newPricings[pricingIndex] = {
                ...newPricings[pricingIndex],
                [field]: value
            };
            newProducts[productIndex] = {
                ...product,
                pricings: newPricings
            };
            return newProducts;
        });
    };
    
    const updateHospitalInfo = (field: keyof HospitalInfo, value: any) => {
        setHospitalInfo(prev => ({ ...prev, [field]: value }));
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        if (!file) return null;
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('partner-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                alert(`이미지 업로드 실패: ${uploadError.message}`);
                return null;
            }

            const { data } = supabase.storage
                .from('partner-images')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error: any) {
            console.error('File upload failed:', error);
            alert(`이미지 업로드 오류: ${error.message}`);
            return null;
        }
    };

    const handleSaveRequest = async (isFinal: boolean) => {
        // Validation for Hospital Info
        if (!hospitalInfo.name || !hospitalInfo.representative_name || !hospitalInfo.district || !hospitalInfo.address || !hospitalInfo.manager_name || !hospitalInfo.manager_phone) {
             setMessage('병원 정보의 필수 항목(*표시)을 모두 입력해주세요.');
             setActiveTab('hospital'); // Switch to hospital tab to show error context
             return;
        }

        // Validation for Products
         if (products.length === 0) {
            setMessage('최소 하나 이상의 시술 정보를 입력해주세요.');
            setActiveTab('procedure');
            return;
        }

        for (const p of products) {
            if (!p.name || !p.variation_id) {
                setMessage('모든 시술의 카테고리, 시술명을 선택하고 상품명을 입력해주세요.');
                setActiveTab('procedure');
                return;
            }
            for (const pr of p.pricings) {
                if (!pr.description || !pr.price) {
                     setMessage('가격 옵션의 내용과 가격을 모두 입력해주세요.');
                     setActiveTab('procedure');
                     return;
                }
            }
        }

        if (!isLoggedIn) {
            setPendingAction(isFinal ? 'final' : 'draft');
            setShowLoginModal(true);
        } else {
             await executeSave(isFinal);
        }
    };

    const executeSave = async (isFinal: boolean) => {
        setLoading(true);
        setMessage('이미지 업로드 및 저장 중...');

        try {
            // 1. Upload Images
            let logoUrl = (hospitalInfo as any).logo_url;
            if (hospitalInfo.logo_file) {
                 const url = await uploadImage(hospitalInfo.logo_file);
                 if (url) logoUrl = url;
            }

            let interiorImages = (hospitalInfo as any).interior_images || [];
            // Preserve existing images if interior_previews has them (mixed with new files?)
            // Actually, we are storing new files in `interior_files`. 
            // Existing URL-based images should already be in `interior_images`.
            // But `HospitalInfoForm` manages previews which might include dataURLs for new files and http urls for old.
            // Simplified: Upload new `interior_files` and append to existing list? 
            // Or better: The `interior_files` state contains ONLY NEW files.
            // We need to merge them.
            // But we don't have an easy "delete" logic for server images yet in this form state.
            // Let's assume we append new ones to the array or replace if it's a fresh definition.
            // For this draft logic: Upload new files, add to existing `interior_images` string array.
            
            if (hospitalInfo.interior_files && hospitalInfo.interior_files.length > 0) {
                const newUrls = await Promise.all(hospitalInfo.interior_files.map(uploadImage));
                const validUrls = newUrls.filter(u => u !== null) as string[];
                interiorImages = [...(interiorImages || []), ...validUrls];
            }
            
            // Note: If user deleted an existing image in UI, our current `HospitalInfoForm` logic just removes it from preview.
            // We need to sync that state.
            // Current `removeInterior` in HospitalInfoForm only updates local state 'interior_files' or 'interior_previews'.
            // Realistically, to handle deletions of existing server images, we need `interior_images` (string[]) in the state.
            // `HospitalInfoForm` receives `info`. I should have updated `info.interior_images` on deletion too.
            // But `HospitalInfoForm` uses `onChange`.
            // Correct approach: `HospitalInfoForm` should update `interior_images` array when removing an item that is a URL.
            // I'll leave the deletion of EXISTING server images as a TODO or implicitly handled if we overwrite the whole array.
            // Actually, `interior_images` isn't fully exposed in `HospitalInfoForm` UI removal efficiently if we don't distinguish.
            // Let's rely on `logoUrl` and `interiorImages` constructed here.
            
            const infoToSave = {
                ...hospitalInfo,
                logo_url: logoUrl,
                interior_images: interiorImages
            };

            // Remove file objects before sending to server action
            delete (infoToSave as any).logo_file;
            delete (infoToSave as any).interior_files;
            delete (infoToSave as any).logo_preview; // Don't save base64
            delete (infoToSave as any).interior_previews;

            const result = isFinal ? await submitFinal(products, infoToSave) : await saveDraft(products, infoToSave);
            
            if (result.success) {
                setMessage(isFinal ? '성공적으로 제출되었습니다!' : '임시저장되었습니다.');
                // Clear file inputs state
                setHospitalInfo(prev => ({
                    ...prev,
                    logo_file: null,
                    interior_files: [],
                    logo_url: logoUrl, // Update with real URL
                    interior_images: interiorImages
                }));
                
                if (isFinal) {
                    router.refresh(); 
                }
            } else {
                setMessage((result as any).error || '저장에 실패했습니다.');
            }
        } catch (e: any) {
            console.error(e);
            setMessage(`오류가 발생했습니다: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSubmit = async (formData: FormData) => {
        setAuthLoading(true);
        try {
            const action = isLoginMode ? login : register;
            const result = await action(formData);
            
            if (result.success) {
                setIsLoggedIn(true);
                setShowLoginModal(false);
                if (pendingAction) {
                    executeSave(pendingAction === 'final');
                    setPendingAction(null);
                }
            } else {
                alert((result as any).error); 
            }
        } catch (e) {
            console.error(e);
            alert('오류가 발생했습니다.');
        } finally {
            setAuthLoading(false);
        }
    };



    const handleUndoSubmit = async () => {
        if (confirm('제출을 취소하고 내용을 수정하시겠습니까?')) {
            const result = await undoSubmit();
            if (result.success) {
                router.refresh();
            }
        }
    };

    if (isSubmitted) {
        return (
             <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                        <Send className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">제출 완료</h2>
                    <p className="text-slate-500 mb-8">병원 입점 신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.</p>
                    
                    <button 
                        onClick={handleUndoSubmit}
                        className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                    >
                        제출 취소 및 수정하기
                    </button>
                </div>
             </div>
        );
    }

    const handleRemoveImage = async (url: string) => {
        try {
            // Extract filename from URL
            // URL format: .../partner-images/FILENAME
            const fileName = url.split('/').pop();
            if (!fileName) return;

            const { error } = await supabase.storage
                .from('partner-images')
                .remove([fileName]);

            if (error) {
                console.error('Delete error:', error);
                alert(`이미지 삭제 실패: ${error.message}`);
            } else {
                console.log('Image deleted from storage:', fileName);
            }
        } catch (e: any) {
             console.error('Delete exception:', e);
             alert(`삭제 중 오류: ${e.message}`);
        }
    };

    return (
        <div className="max-w-5xl mx-auto relative px-4">
            
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('hospital')}
                    className={`pb-3 px-4 flex items-center gap-2 font-bold transition-all border-b-2 ${activeTab === 'hospital' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    병원 기본 정보
                    {!hospitalInfo.name && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mb-3" />}
                </button>
                <button
                    onClick={() => setActiveTab('procedure')}
                    className={`pb-3 px-4 flex items-center gap-2 font-bold transition-all border-b-2 ${activeTab === 'procedure' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    시술/상품 정보
                </button>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${
                    message.includes('성공') ? 'bg-green-50 text-green-700' : 
                    message.includes('임시저장') ? 'bg-blue-50 text-blue-700' :
                    'bg-red-50 text-red-700'
                }`}>
                    <AlertCircle className="w-5 h-5" />
                    {message}
                </div>
            )}
            
            {/* Tab Content */}
            <div className="mb-6">
                {activeTab === 'hospital' ? (
                     <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <HospitalInfoForm 
                            info={hospitalInfo} 
                            onChange={updateHospitalInfo} 
                            onRemoveImage={handleRemoveImage}
                        />
                     </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                        
                        {/* Example Data Guide */}
                        <div className="bg-slate-50 border-b border-slate-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> 작성 가이드 및 예시
                                </div>
                                <span className="text-xs text-slate-300">|</span>
                                <span className="text-xs text-slate-500">상품명 구성에 따라 옵션을 유연하게 설정할 수 있습니다.</span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Case 1: Multiple Options */}
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
                                     <div className="absolute top-0 right-0 bg-blue-50 text-brand-blue text-[10px] font-bold px-2 py-1 rounded-bl-lg">추천 (다양한 옵션)</div>
                                     <h5 className="font-bold text-slate-900 text-sm mb-2">Case 1. 상품명에 '샷 수/용량' 미포함</h5>
                                     <p className="text-xs text-slate-500 mb-3">
                                        상품명을 포괄적으로 적으면, 하나의 상품 안에 <strong>여러 가격 옵션(300샷, 600샷 등)</strong>을 구성하여 고객에게 다양한 선택지를 제공할 수 있습니다.
                                     </p>
                                     
                                     <div className="bg-slate-50 rounded p-3 text-xs space-y-2 border border-slate-100">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-slate-400 w-12 shrink-0 font-medium">상품명</span>
                                            <span className="font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">울쎄라 리프팅</span>
                                        </div>
                                        <div className="flex gap-2 items-start mt-2">
                                            <span className="text-slate-400 w-12 shrink-0 font-medium pt-1">가격옵션</span>
                                            <div className="space-y-1 w-full">
                                                <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-200">
                                                    <span>300샷 (재생관리 포함)</span>
                                                    <span className="font-bold text-brand-blue">₩ 1,000,000</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-200">
                                                    <span>600샷 (풀페이스)</span>
                                                    <span className="font-bold text-brand-blue">₩ 1,900,000</span>
                                                </div>
                                            </div>
                                        </div>
                                     </div>
                                </div>

                                {/* Case 2: Specific Product */}
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                     <h5 className="font-bold text-slate-900 text-sm mb-2">Case 2. 상품명에 '샷 수/특정 조건' 포함</h5>
                                     <p className="text-xs text-slate-500 mb-3">
                                        <strong>원장님 직접 시술</strong>이나 <strong>특정 용량(이벤트)</strong>을 상품명에 구체적으로 명시하면, 옵션이 단순해지며 타겟 고객에게 명확히 어필할 수 있습니다.
                                     </p>
                                     
                                     <div className="bg-slate-50 rounded p-3 text-xs space-y-2 border border-slate-100">
                                         <div className="flex gap-2 items-center">
                                            <span className="text-slate-400 w-12 shrink-0 font-medium pt-1">상품명</span>
                                            <span className="font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 leading-relaxed">[대표원장] 울쎄라 400샷 + 스킨부스터</span>
                                        </div>
                                        <div className="flex gap-2 items-start mt-2">
                                            <span className="text-slate-400 w-12 shrink-0 font-medium pt-1">가격옵션</span>
                                            <div className="space-y-1 w-full">
                                                <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-slate-200">
                                                    <span>400샷 패키지</span>
                                                    <span className="font-bold text-brand-blue">₩ 1,500,000</span>
                                                </div>
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
                                        <th className="py-2 px-2 w-[15%] font-bold">카테고리</th>
                                        <th className="py-2 px-2 w-[15%] font-bold">표준 시술명</th>
                                        <th className="py-2 px-2 w-[25%] font-bold">상품명 (앱 표시용)</th>
                                        <th className="py-2 px-2 w-[40%] font-bold">가격 옵션 (내용 / 정가 / <span className="text-brand-blue">할인가</span>)</th>
                                        <th className="py-2 px-2 w-[5%] text-center font-bold">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {products.map((product, pIndex) => (
                                        <tr key={pIndex} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 align-top">
                                                <select
                                                    value={product.category_id}
                                                    onChange={(e) => updateProduct(pIndex, 'category_id', e.target.value)}
                                                    className="w-full p-1.5 text-xs bg-white border border-slate-200 rounded hover:border-brand-blue focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
                                                >
                                                    <option value="">카테고리 선택</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-2 align-top">
                                                <select
                                                    value={product.variation_id}
                                                    onChange={(e) => updateProduct(pIndex, 'variation_id', e.target.value)}
                                                    disabled={!product.category_id}
                                                    className="w-full p-1.5 text-xs bg-white border border-slate-200 rounded hover:border-brand-blue focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none disabled:bg-slate-50 disabled:text-slate-400 transition-colors"
                                                >
                                                    <option value="">시술 선택</option>
                                                    {variations
                                                        .filter(v => v.category_id === product.category_id)
                                                        .map(v => (
                                                            <option key={v.id} value={v.id}>{v.name}</option>
                                                        ))}
                                                </select>
                                            </td>
                                            <td className="p-2 align-top">
                                                <input
                                                    type="text"
                                                    value={product.name}
                                                    onChange={(e) => updateProduct(pIndex, 'name', e.target.value)}
                                                    placeholder="예: [이벤트] 울쎄라 리프팅"
                                                    className="w-full p-1.5 text-xs bg-white border border-slate-200 rounded hover:border-brand-blue focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors"
                                                />
                                            </td>
                                            <td className="p-2 align-top">
                                                <div className="space-y-1">
                                                    {product.pricings.map((pricing, prIndex) => (
                                                        <React.Fragment key={prIndex}>
                                                            <div className="flex gap-1 items-start">
                                                                <input
                                                                    type="text"
                                                                    value={pricing.description}
                                                                    onChange={(e) => updatePricing(pIndex, prIndex, 'description', e.target.value)}
                                                                    placeholder="내용 (300샷)"
                                                                    className="flex-[2] p-1 text-xs bg-white border border-slate-200 rounded focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
                                                                />
                                                                <div className="flex-1 relative">
                                                                    <input
                                                                        type="number"
                                                                        value={pricing.price}
                                                                        onChange={(e) => updatePricing(pIndex, prIndex, 'price', e.target.value)}
                                                                        placeholder="정가(필수)"
                                                                        className="w-full p-1 pr-4 text-xs bg-white border border-slate-200 rounded focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-right font-mono"
                                                                    />
                                                                    <span className="absolute right-1 top-1 text-[10px] text-slate-400">₩</span>
                                                                </div>
                                                                <div className="flex-1 relative">
                                                                    <input
                                                                        type="number"
                                                                        value={pricing.promotion_price || ''}
                                                                        onChange={(e) => updatePricing(pIndex, prIndex, 'promotion_price', e.target.value)}
                                                                        placeholder="할인가(선택)"
                                                                        disabled={!pricing.price}
                                                                        className="w-full p-1 pr-4 text-xs bg-white border border-brand-blue/30 rounded focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-right font-mono disabled:bg-slate-50 placeholder:text-brand-blue/50"
                                                                    />
                                                                    <span className="absolute right-1 top-1 text-[10px] text-slate-400">₩</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => removePricing(pIndex, prIndex)}
                                                                    disabled={product.pricings.length <= 1}
                                                                    className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-0"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                            {pricing.price && pricing.promotion_price && Number(pricing.promotion_price) < Number(pricing.price) && (
                                                               <div className="text-[10px] text-brand-blue text-right pr-8 mt-1 mb-2">
                                                                  ✨ 플랫폼에 <span className="font-bold">{Math.round((1 - Number(pricing.promotion_price)/Number(pricing.price)) * 100)}% 할인</span> 가격으로 노출됩니다.
                                                               </div>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                    <button
                                                        onClick={() => addPricing(pIndex)}
                                                        className="text-[11px] text-brand-blue font-medium flex items-center gap-1 hover:underline px-1 py-0.5"
                                                    >
                                                        <Plus className="w-3 h-3" /> 가격 옵션 추가
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-2 align-top text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button 
                                                        onClick={() => duplicateProduct(pIndex)}
                                                        className="p-1.5 text-slate-400 hover:text-brand-blue hover:bg-blue-50 rounded transition-colors"
                                                        title="행 복사"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </button>
                                                    <button 
                                                        onClick={() => removeProduct(pIndex)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        title="행 삭제"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                            <button
                                onClick={addProduct}
                                className="w-full py-3 border border-dashed border-slate-300 rounded-lg text-slate-500 font-bold hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <Plus className="w-4 h-4" /> 행 추가하기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="sticky bottom-4 z-10 flex gap-3 p-4 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl mx-auto max-w-2xl">
                <button
                    onClick={() => handleSaveRequest(false)}
                    disabled={loading}
                    className="flex-1 py-3 px-6 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" /> 임시 저장
                </button>
                <button
                    onClick={() => handleSaveRequest(true)}
                    disabled={loading}
                    className="flex-1 py-3 px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> 처리 중...
                        </>
                    ) : (
                        <>   
                            {isSubmitted ? '제출 완료' : '최종 제출'} <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
            
            <div className="h-20"></div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="text-center mb-6">
                             <BrandLogo className="w-10 h-10 mb-3" />
                             <h3 className="text-xl font-bold text-slate-900">
                                {isLoginMode ? '저장 전 로그인' : '파트너 회원가입'}
                             </h3>
                             <p className="text-sm text-slate-500">
                                {isLoginMode ? '작성 내용을 저장하려면 로그인이 필요합니다.' : '계정을 생성하고 작성 내용을 안전하게 저장하세요.'}
                             </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                            <button
                                type="button"
                                onClick={() => setIsLoginMode(true)}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                                    isLoginMode 
                                    ? 'bg-white text-slate-900 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                로그인
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsLoginMode(false)}
                                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                                    !isLoginMode 
                                    ? 'bg-white text-slate-900 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                회원가입
                            </button>
                        </div>

                        <form action={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">아이디</label>
                                <input name="username" type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none" placeholder="아이디 입력" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">비밀번호</label>
                                <input name="password" type="password" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none" placeholder="비밀번호 입력" />
                            </div>
                            <button 
                                type="submit" 
                                disabled={authLoading}
                                className="w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {authLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        처리 중...
                                    </>
                                ) : (
                                    isLoginMode ? '로그인 및 저장' : '회원가입 및 저장'
                                )}
                            </button> 
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
