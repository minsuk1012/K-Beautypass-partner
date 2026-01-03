import React, { useState, useMemo } from 'react';
import { 
  List, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, 
  Building2, LayoutGrid, Search, Filter 
} from 'lucide-react';

// ==========================================
// 1. MOCK DATA & TYPES
// ==========================================

interface Reservation {
  id: number;
  reservation_number: string;
  user: { name: string; email: string };
  hospital: { name: string };
  scheduled_date: string; // YYYY-MM-DD
  scheduled_time: string; // HH:MM
  treatment_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const MOCK_HOSPITALS = [
  { id: 1, name: "강남 아름다운 의원" },
  { id: 2, name: { en: "Pure Dermatology", ko: "퓨어 피부과" } },
  { id: 3, name: "서울 뷰티 클리닉" },
];

const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 101,
    reservation_number: 'RES-20240115-001',
    user: { name: '김지수', email: 'jisoo@example.com' },
    hospital: { name: '강남 아름다운 의원' },
    scheduled_date: '2025-01-15',
    scheduled_time: '14:30',
    treatment_amount: 150000,
    status: 'pending'
  },
  {
    id: 102,
    reservation_number: 'RES-20240115-002',
    user: { name: '박민준', email: 'minjun@example.com' },
    hospital: { name: '퓨어 피부과' },
    scheduled_date: '2025-01-15',
    scheduled_time: '16:00',
    treatment_amount: 320000,
    status: 'confirmed'
  },
  {
    id: 103,
    reservation_number: 'RES-20240116-003',
    user: { name: '최서연', email: 'seoyeon@example.com' },
    hospital: { name: '서울 뷰티 클리닉' },
    scheduled_date: '2025-01-16',
    scheduled_time: '10:00',
    treatment_amount: 88000,
    status: 'cancelled'
  },
  {
    id: 104,
    reservation_number: 'RES-20240120-004',
    user: { name: 'Lee James', email: 'james@example.com' },
    hospital: { name: '강남 아름다운 의원' },
    scheduled_date: '2025-01-20',
    scheduled_time: '11:30',
    treatment_amount: 450000,
    status: 'completed'
  },
   {
    id: 105,
    reservation_number: 'RES-20240120-005',
    user: { name: '한가인', email: 'gain@example.com' },
    hospital: { name: '퓨어 피부과' },
    scheduled_date: '2025-01-20',
    scheduled_time: '15:30',
    treatment_amount: 120000,
    status: 'pending'
  },
];

// ==========================================
// 2. MINI UI COMPONENT LIBRARY (Tailwind)
// ==========================================

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const Button = ({ children, variant = "primary", size = "md", className, ...props }: any) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50";
  const variants: any = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  const sizes: any = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2 text-sm",
    icon: "h-9 w-9"
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className, ...props }: any) => (
  <input className={cn("flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500", className)} {...props} />
);

const Badge = ({ children, className, variant = "default" }: any) => {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
    </span>
  );
};

const Card = ({ children, className }: any) => (
  <div className={cn("rounded-xl border bg-white text-gray-900 shadow", className)}>{children}</div>
);

// ==========================================
// 3. SUB COMPONENTS
// ==========================================

// --- ResourceSidebar ---
function ResourceSidebar({ items, selectedId, onSelect, title = "Resources" }: any) {
  const [search, setSearch] = useState('');

  const getItemName = (item: any) => {
    if (typeof item.name === 'string') return item.name;
    return item.name?.ko || item.name?.en || 'Unknown';
  };

  const filteredItems = items.filter((item: any) => 
    getItemName(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white h-full flex flex-col hidden md:flex">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
           <Filter className="h-4 w-4 text-gray-500"/>
           <span>{title}</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder={`검색...`}
            className="pl-9 h-9"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <button
          onClick={() => onSelect('all')}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
            selectedId === 'all' 
              ? "bg-purple-50 text-purple-900" 
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} />
            전체 보기
          </div>
        </button>
        
        <div className="my-2 border-t mx-2" />

        {filteredItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
              selectedId === item.id 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
             <div className="flex items-center gap-2 truncate">
              <Building2 size={16} className="shrink-0 opacity-70"/>
              <span className="truncate">{getItemName(item)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- List View ---
function ReservationsList({ reservations }: any) {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">확정됨</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">대기중</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">취소됨</Badge>;
      case 'completed': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">완료됨</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-white">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">예약 번호</th>
                <th className="px-6 py-3 font-medium">사용자</th>
                <th className="px-6 py-3 font-medium">병원</th>
                <th className="px-6 py-3 font-medium">날짜/시간</th>
                <th className="px-6 py-3 font-medium">시술 금액</th>
                <th className="px-6 py-3 font-medium">상태</th>
                <th className="px-6 py-3 font-medium text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.length > 0 ? (
                reservations.map((res: any) => (
                  <tr key={res.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-gray-600">{res.reservation_number}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{res.user.name}</div>
                      <div className="text-xs text-gray-500">{res.user.email}</div>
                    </td>
                    <td className="px-6 py-4">{typeof res.hospital.name === 'string' ? res.hospital.name : res.hospital.name.ko}</td>
                    <td className="px-6 py-4">
                       <div className="text-gray-900">{res.scheduled_date}</div>
                       <div className="text-gray-500 text-xs">{res.scheduled_time}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(res.treatment_amount)}</td>
                    <td className="px-6 py-4">{getStatusBadge(res.status)}</td>
                    <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="sm" onClick={() => alert('실제로는 상세 페이지로 이동합니다.')}>
                         상세
                       </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                     데이터가 없습니다.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Fake Pagination */}
       <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Showing 1 to {reservations.length} of {reservations.length} results
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" disabled>Previous</Button>
           <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}

// --- Calendar View ---
function ReservationsCalendar({ reservations }: any) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 15)); // Mocking Jan 2025 where data exists

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const reservationsByDate = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    reservations.forEach((res: any) => {
      const dateStr = res.scheduled_date; // YYYY-MM-DD
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(res);
    });
    return grouped;
  }, [reservations]);

  const renderCells = () => {
    const cells = [];
    // Previous Month Fillers
    for (let i = 0; i < firstDayOfMonth; i++) {
        cells.push(<div key={`prev-${i}`} className="h-32 bg-gray-50/50 border-b border-r border-gray-100" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
       const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
       const dayReservations = reservationsByDate[dateStr] || [];
       const isToday = day === 15; // Just mocking "today" as the 15th for demo visuals

       cells.push(
         <div key={day} className={cn("min-h-[120px] bg-white border-b border-r border-gray-100 p-2 transition-colors hover:bg-gray-50 relative group", isToday && "bg-blue-50/10")}>
             <div className="flex justify-between items-start mb-1">
                 <span className={cn(
                    "text-sm font-semibold h-7 w-7 flex items-center justify-center rounded-full",
                    isToday ? "bg-purple-600 text-white" : "text-gray-500"
                )}>
                    {day}
                </span>
             </div>
             <div className="space-y-1">
                {dayReservations.map((res: any) => (
                   <div key={res.id} className="text-xs p-1 rounded bg-purple-50 text-purple-700 border border-purple-100 truncate cursor-not-allowed">
                       {res.scheduled_time} {res.user.name}
                   </div>
                ))}
             </div>
         </div>
       )
    }
    return cells;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                <CalendarIcon className="h-5 w-5"/>
                {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-1">
               <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft className="h-4 w-4"/></Button>
               <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight className="h-4 w-4"/></Button>
            </div>
        </div>
        <div className="flex-1 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 border-b bg-gray-50">
                 {DAYS.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 border-r last:border-r-0">
                        {day}
                    </div>
                 ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
                {renderCells()}
            </div>
        </div>
    </div>
  );
}

// ==========================================
// 4. MAIN DEMO COMPONENT
// ==========================================

export default function ReservationDemo() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | 'all'>('all');

  // Filter Data Logic
  const filteredReservations = useMemo(() => {
    let data = MOCK_RESERVATIONS;
    if (selectedHospitalId !== 'all') {
      data = data.filter(r => 
        MOCK_HOSPITALS.some(h => h.id === selectedHospitalId && (typeof h.name === 'string' ? h.name : h.name.ko) === (typeof r.hospital.name === 'string' ? r.hospital.name : (r.hospital.name as any)))
      );
    }
    // Very naive matching for mock 'hospital.name' string against 'hospital object', works for this simple mock data
    return data;
  }, [selectedHospitalId]);

  const getHospitalName = (id: number) => {
     const h = MOCK_HOSPITALS.find(h => h.id === id);
     if (!h) return '';
     return typeof h.name === 'string' ? h.name : h.name.ko || h.name.en;
  };

  return (
    <div className="flex h-[800px] w-full border rounded-xl overflow-hidden bg-slate-50 font-sans text-slate-900 shadow-2xl my-10">
      
      {/* Sidebar */}
      <ResourceSidebar 
        items={MOCK_HOSPITALS}
        selectedId={selectedHospitalId}
        onSelect={setSelectedHospitalId}
        title="병원 필터"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
         {/* Header */}
         <div className="flex items-center justify-between p-6 pb-4 border-b bg-white">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {selectedHospitalId === 'all' ? '전체 예약 목록' : getHospitalName(selectedHospitalId as number)}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    {filteredReservations.length}개의 예약이 조회되었습니다.
                </p>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                        viewMode === 'list' 
                            ? "bg-white text-slate-900 shadow-sm" 
                            : "text-slate-500 hover:text-slate-900"
                    )}
                >
                    <List size={16} /> 목록
                </button>
                <button
                    onClick={() => setViewMode('calendar')}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                        viewMode === 'calendar' 
                            ? "bg-white text-slate-900 shadow-sm" 
                            : "text-slate-500 hover:text-slate-900"
                    )}
                >
                    <CalendarIcon size={16} /> 캘린더
                </button>
            </div>
         </div>

         {/* Body */}
         <div className="flex-1 overflow-y-auto p-6">
             {viewMode === 'list' ? (
                 <ReservationsList reservations={filteredReservations} />
             ) : (
                 <ReservationsCalendar reservations={filteredReservations} />
             )}
         </div>
      </div>

    </div>
  );
}
