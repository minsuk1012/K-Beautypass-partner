
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Link from 'next/link';
import { ArrowLeft, Building, User, Phone, Globe, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function HospitalDetailPage({ params }: PageProps) {
    const { id } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        redirect('/admin/login');
    }

    // 1. Fetch Hospital Data
    const { data: hospitalData, error: hError } = await supabaseAdmin
        .from('hospitals')
        .select(`
            *,
            users!inner(is_submitted)
        `)
        .eq('id', id)
        .single();

    if (hError || !hospitalData) {
        console.error('Error fetching hospital detail:', hError);
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                <p>Hospital not found or error loading data.</p>
            </div>
        );
    }

    // 2. Fetch Products for this User with Category/Variation info
    const { data: products, error: pError } = await supabaseAdmin
        .from('hospital_products')
        .select(`
            *,
            hospital_product_pricings(*),
            variations (
                name,
                categories (
                    name
                )
            )
        `)
        .eq('user_id', hospitalData.user_id)
        .order('created_at', { ascending: true });

    const hospital = {
        ...hospitalData,
        hospital_products: products || []
    };

    // Format date helper
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Group products by Category
    const groupedProducts: Record<string, any[]> = {};
    if (hospital.hospital_products) {
        hospital.hospital_products.forEach((product: any) => {
            const categoryName = product.variations?.categories?.name || 'Uncategorized';
            if (!groupedProducts[categoryName]) {
                groupedProducts[categoryName] = [];
            }
            groupedProducts[categoryName].push(product);
        });
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* ... Navbar (omitted for brevity in replacement if possible, but I need to include context) ... */}
            {/* Header / Nav */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-slate-500 hover:text-slate-800 p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-lg font-bold text-slate-900">Hospital Details</h1>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-10">
                {/* ... Header Section ... */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            {hospital.name}
                            {(hospital.users as any)?.is_submitted ? (
                                <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-bold rounded-full">Submitted</span>
                            ) : (
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm font-bold rounded-full">Draft</span>
                            )}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">ID: {hospital.id}</p>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                        <div className="flex items-center justify-end gap-1">
                           <Calendar className="w-4 h-4"/>
                           Updated: {formatDate(hospital.updated_at || hospital.created_at)}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* 1. Basic Info Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-slate-700">
                            Basic Information
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    {hospital.logo_url ? (
                                        <img src={hospital.logo_url} alt="Logo" className="w-24 h-24 rounded-lg object-contain bg-slate-50 border border-slate-200" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Building className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Representative</label>
                                        <p className="font-medium text-slate-900">{hospital.representative_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Business No.</label>
                                        <p className="text-slate-900">{hospital.business_registration_number || '-'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Address</label>
                                        <p className="text-slate-900">{hospital.address} {hospital.detailed_address}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{hospital.district}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Online</label>
                                        <p className="text-slate-900">
                                            {hospital.website ? <a href={hospital.website} target="_blank" className="text-brand-blue hover:underline">{hospital.website}</a> : '-'}
                                        </p>
                                        <p className="text-sm text-slate-600 truncate">{hospital.email || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 p-6 bg-slate-50/30">
                            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" /> Manager Contact
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-slate-500">Name</span>
                                    <p className="font-medium">{hospital.manager_name}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500">Phone</span>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3 h-3 text-slate-400" />
                                        <p className="font-medium">{hospital.manager_phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 p-6">
                            <h4 className="text-sm font-bold text-slate-900 mb-2">Hospital Introduction</h4>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                                {hospital.description || "No description."}
                            </p>
                        </div>
                    </div>

                    {/* 2. Interior Images */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                         <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-slate-700 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Interior Images ({hospital.interior_images?.length || 0})
                        </div>
                        <div className="p-6">
                            {hospital.interior_images && hospital.interior_images.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {hospital.interior_images.map((img: string, idx: number) => (
                                        <div key={idx} className="relative aspect-[4/3] group">
                                            <img src={img} alt={`Interior ${idx}`} className="w-full h-full object-cover rounded-lg border border-slate-100 shadow-sm group-hover:shadow transition-all" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">No interior images uploaded.</p>
                            )}
                        </div>
                    </div>

                    {/* 3. Products List (Grouped Table) */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-slate-700 flex items-center justify-between">
                            <span>Registered Products</span>
                            <span className="bg-white px-2 py-0.5 rounded text-xs border border-slate-200 text-slate-500">
                                Total {hospital.hospital_products?.length || 0}
                            </span>
                        </div>
                        
                        <div className="p-6 space-y-8">
                             {Object.entries(groupedProducts).length > 0 ? (
                                 Object.entries(groupedProducts).map(([category, items]) => (
                                     <div key={category}>
                                         <h3 className="text-sm font-bold text-slate-900 mb-3 pl-1 border-l-4 border-brand-blue">
                                             {category}
                                         </h3>
                                         <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                             <table className="w-full text-sm text-left">
                                                 <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                                     <tr>
                                                         <th className="px-4 py-3 font-medium w-1/4">Variation</th>
                                                         <th className="px-4 py-3 font-medium w-1/4">Product Name</th>
                                                         <th className="px-4 py-3 font-medium w-1/2">Pricing Options</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody className="divide-y divide-slate-100">
                                                     {items.map((product: any) => (
                                                         <tr key={product.id} className="hover:bg-slate-50/50">
                                                             <td className="px-4 py-3 align-top font-medium text-slate-700">
                                                                 {product.variations?.name || 'Unknown'}
                                                             </td>
                                                             <td className="px-4 py-3 align-top text-slate-900">
                                                                 {product.name}
                                                             </td>
                                                             <td className="px-4 py-3 align-top">
                                                                 <div className="space-y-1">
                                                                     {product.hospital_product_pricings && product.hospital_product_pricings.map((price: any) => (
                                                                         <div key={price.id} className="flex items-center justify-between text-xs bg-slate-50 p-1.5 rounded border border-slate-100">
                                                                             <span className="text-slate-600">{price.description}</span>
                                                                             <div className="flex items-center gap-2">
                                                                                 {price.promotion_price ? (
                                                                                     <>
                                                                                        <span className="text-slate-400 line-through">₩ {parseInt(price.price).toLocaleString()}</span>
                                                                                        <span className="font-bold text-brand-blue">₩ {parseInt(price.promotion_price).toLocaleString()}</span>
                                                                                     </>
                                                                                 ) : (
                                                                                     <span className="font-bold text-slate-700">₩ {parseInt(price.price).toLocaleString()}</span>
                                                                                 )}
                                                                             </div>
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                             </td>
                                                         </tr>
                                                     ))}
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 ))
                             ) : (
                                <div className="text-center text-slate-500 py-4">
                                    No products registered.
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
