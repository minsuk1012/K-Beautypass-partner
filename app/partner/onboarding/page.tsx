import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMetadata, loadData, logout } from '../actions';
import PartnerOnboardingForm from '@/components/PartnerOnboardingForm';
import { BrandLogo } from '@/components/BrandLogo';
import { LogOut } from 'lucide-react';

export default async function OnboardingPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('partner_user_id')?.value;

    if (!userId) {
        redirect('/partner/login');
    }
    const { categories, variations } = await getMetadata();
    const loadResult = await loadData();

    const { products, isSubmitted, isLoggedIn, hospitalInfo } = loadResult;

    const safeCategories = categories || [];
    const safeVariations = variations || [];
    const safeProducts = products || [];
    const safeHospitalInfo = hospitalInfo || null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BrandLogo className="w-8 h-8" />
                        <span className="font-bold text-slate-800">파트너 센터</span>
                    </div>
                    {isLoggedIn && (
                        <form action={logout}>
                            <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                                <LogOut className="w-4 h-4" /> 로그아웃
                            </button>
                        </form>
                    )}
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="mb-8 text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">시술 정보 등록</h1>
                    <p className="text-slate-500">
                        병원에서 제공하는 시술 및 상품 정보를 등록해주세요.<br/>
                        작성 중인 내용은 언제든지 임시저장하고 나중에 다시 이어서 작성할 수 있습니다.
                    </p>
                </div>

                <PartnerOnboardingForm 
                    categories={safeCategories}
                    variations={safeVariations}
                    initialProducts={safeProducts}
                    initialHospitalInfo={safeHospitalInfo}
                    isSubmitted={isSubmitted || false}
                    isLoggedIn={isLoggedIn || false}
                />
            </main>
        </div>
    );
}
