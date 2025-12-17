import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { logout } from './actions';
import { Building, User, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch Submitted Hospitals with Products
  const { data: submissions, error } = await supabaseAdmin
    .from('hospitals')
    .select(`
        *,
        users!inner(is_submitted),
        hospital_products(
            *,
            hospital_product_pricings(*)
        )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
  }

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

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="text-lg font-bold text-slate-900">Partners Admin</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500">Administrator</span>
                <form action={logout}>
                    <button className="text-sm font-medium text-red-600 hover:text-red-700">
                        Logout
                    </button>
                </form>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Partner Applications</h2>
                <p className="text-slate-500">Total {submissions?.length || 0} applications (Drafts included)</p>
            </div>
        </div>

        {error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                Failed to load data. Please check Supabase permissions.
            </div>
        ) : (
            <div className="grid gap-6">
                {submissions && submissions.length > 0 ? (
                    submissions.map((hospital) => (
                        <div key={hospital.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                            {/* Hospital Header Info */}
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        {hospital.logo_url ? (
                                            <img src={hospital.logo_url} alt="Logo" className="w-16 h-16 rounded-lg object-contain bg-white border border-slate-200" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                                                <Building className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold text-slate-900">{hospital.name}</h3>
                                                {(hospital.users as any)?.is_submitted ? (
                                                     <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded">Submitted</span>
                                                ) : (
                                                     <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded">Draft</span>
                                                )}
                                            </div>
                                            <div className="text-sm text-slate-500 space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-slate-700">{hospital.representative_name}</span>
                                                    <span className="text-slate-300">|</span>
                                                    <span>{hospital.address} {hospital.detailed_address}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3 h-3" /> {hospital.phone}
                                                    <span className="text-slate-300">|</span>
                                                    <User className="w-3 h-3" /> {hospital.manager_name} ({hospital.manager_phone})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right text-xs text-slate-400">
                                        Submitted on {formatDate(hospital.updated_at || hospital.created_at)}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Detailed Info Grid */}
                            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                {/* Left: Hospital Details & Images */}
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">About Hospital</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {hospital.description || 'No description provided.'}
                                        </p>
                                    </div>
                                    
                                    {hospital.interior_images && hospital.interior_images.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Interior Images</h4>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {hospital.interior_images.map((img: string, idx: number) => (
                                                    <img key={idx} src={img} alt={`Interior ${idx}`} className="w-20 h-20 rounded-lg object-cover border border-slate-100" />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Products List */}
                                <div className="md:col-span-2 p-6 bg-slate-50/30">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                                        Registered Products ({hospital.hospital_products?.length || 0})
                                    </h4>
                                    
                                    <div className="grid gap-4">
                                        {hospital.hospital_products && hospital.hospital_products.map((product: any) => (
                                            <div key={product.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900">{product.name}</div>
                                                        <div className="text-xs text-slate-500">Variation ID: {product.variation_id}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    {product.hospital_product_pricings && product.hospital_product_pricings.map((price: any) => (
                                                        <div key={price.id} className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded">
                                                            <span className="text-slate-700">{price.description}</span>
                                                            <div className="text-right">
                                                                {price.promotion_price ? (
                                                                    <>
                                                                       <span className="text-xs text-slate-400 line-through mr-2">₩ {parseInt(price.price).toLocaleString()}</span>
                                                                       <span className="font-bold text-brand-blue">₩ {parseInt(price.promotion_price).toLocaleString()}</span>
                                                                    </>
                                                                ) : (
                                                                    <span className="font-bold text-slate-900">₩ {parseInt(price.price).toLocaleString()}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500">No submitted applications found.</p>
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
}
