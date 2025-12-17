import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { logout } from './actions';
import Link from 'next/link';
import { Building, User, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch Submitted Hospitals with Products (via Users)
  const { data: usersData, error } = await supabaseAdmin
    .from('users')
    .select(`
        is_submitted,
        created_at,
        hospitals!inner ( * )
    `)
    .order('created_at', { ascending: false });

  const submissions = usersData?.map((user: any) => {
      const hospital = Array.isArray(user.hospitals) ? user.hospitals[0] : user.hospitals;
      if (!hospital) return null;
      
      return {
          ...hospital,
          users: { is_submitted: user.is_submitted }
      };
  }).filter(Boolean) || [];

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
                        <Link href={`/admin/hospital/${hospital.id}`} key={hospital.id} className="block group">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-brand-blue/50 transition-all overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            {hospital.logo_url ? (
                                                <img src={hospital.logo_url} alt="Logo" className="w-16 h-16 rounded-lg object-contain bg-white border border-slate-200" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                                                    <Building className="w-8 h-8" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{hospital.name}</h3>
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
                                        
                                        <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1 text-right">
                                            <div className="text-xs text-slate-400">
                                                Submitted on {formatDate(hospital.updated_at || hospital.created_at)}
                                            </div>
                                            <div className="text-sm font-medium text-brand-blue flex items-center gap-1">
                                                View Details &rarr;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
