import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { logout } from './actions';
import { Building, User, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch consultations
  const { data: consultations, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching consultations:', error);
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
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Consultation Requests</h2>
                <p className="text-slate-500">Total {consultations?.length || 0} requests</p>
            </div>
        </div>

        {error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                Failed to load data. Please check Supabase permissions.
            </div>
        ) : (
            <div className="grid gap-4">
                {consultations && consultations.length > 0 ? (
                    consultations.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(item.created_at)}
                                </div>
                                <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full w-fit">
                                    New Request
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="flex items-start gap-3">
                                    <Building className="w-5 h-5 text-brand-blue mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Hospital Name</p>
                                        <p className="font-medium text-slate-900">{item.hospital_name || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 text-brand-blue mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Manager</p>
                                        <p className="font-medium text-slate-900">{item.manager_name || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-brand-blue mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Contact</p>
                                        <p className="font-medium text-slate-900">{item.contact || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500">No consultation requests found.</p>
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
}
