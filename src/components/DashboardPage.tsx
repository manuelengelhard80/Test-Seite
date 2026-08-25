import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Settings, 
  Code2, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  Bell,
  CheckCircle2,
  Copy,
  RefreshCw,
  ExternalLink,
  Menu,
  X,
  Clock,
  MapPin,
  AlignLeft,
  MoreHorizontal,
  Key,
  Stethoscope,
  Building2,
  ShieldCheck,
  AlertCircle,
  CalendarDays,
  CalendarRange
} from 'lucide-react';
import { Doctor, ServiceType, Resource, CalendarEvent } from '../types/calendar';

interface DashboardPageProps {
  onLogout: () => void;
}

// Date Helpers
const formatDateISO = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMonday = (d: Date): Date => {
  const date = new Date(d);
  const day = date.getDay(); // 0 is Sunday, 1 is Monday...
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const getWeekDays = (d: Date): Date[] => {
  const monday = getMonday(d);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    return day;
  });
};

const getCalendarWeek = (d: Date): number => {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

const getMonthMatrix = (d: Date): Date[][] => {
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = getMonday(firstDay);
  
  const weeks: Date[][] = [];
  let current = new Date(startDay);
  
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let day = 0; day < 7; day++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
    if (current.getMonth() !== month && w >= 4) {
      break;
    }
  }
  return weeks;
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState('calendar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  // Database / Settings State (Using brand turquoise & harmonious accents)
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 'dr-mueller', name: 'Dr. Müller', color: 'bg-teal-50 border-teal-200 text-teal-800', border: 'border-[#0D9488]' },
    { id: 'dr-schmidt', name: 'Dr. Schmidt', color: 'bg-emerald-50 border-emerald-200 text-emerald-800', border: 'border-emerald-500' },
    { id: 'dr-weber', name: 'Dr. Weber', color: 'bg-cyan-50 border-cyan-200 text-cyan-800', border: 'border-cyan-600' },
  ]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([
    { id: 'st_akut', name: 'Akutsprechstunde', durationMinutes: 15 },
    { id: 'st_checkup', name: 'Check-Up', durationMinutes: 30 },
    { id: 'st_blut', name: 'Blutabnahme', durationMinutes: 15 },
    { id: 'st_erst', name: 'Erstgespräch', durationMinutes: 45 },
    { id: 'st_sono', name: 'Ultraschall / Sonografie', durationMinutes: 30 },
  ]);
  const [resources, setResources] = useState<Resource[]>([
    { id: 'res_room1', name: 'Behandlungszimmer 1', type: 'room' },
    { id: 'res_room2', name: 'Behandlungszimmer 2', type: 'room' },
    { id: 'res_ultraschall', name: 'Ultraschall-Gerät', type: 'device' },
  ]);

  // Calendar State
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>(['dr-mueller', 'dr-schmidt', 'dr-weber']);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mini Calendar Month Navigation
  const [miniCalDate, setMiniCalDate] = useState<Date>(new Date());
  
  // Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Google Integration
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Time Slots (08:00 - 18:00)
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); 

  // Load Initial Rich Realistic Practice Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const today = new Date();
        const monday = getMonday(today);
        
        const getOffsetDate = (dayOffset: number) => {
          const d = new Date(monday);
          d.setDate(monday.getDate() + dayOffset);
          return formatDateISO(d);
        };

        const todayISO = formatDateISO(today);

        const mockEvents: CalendarEvent[] = [
          // Appointments for Today
          { 
            id: 'evt_today_1', 
            title: 'Akut: Müller, Thomas', 
            date: todayISO,
            time: 9, 
            duration: 0.5, 
            docId: 'dr-mueller', 
            type: 'Akutsprechstunde', 
            source: 'internal', 
            desc: 'Starke Schmerzen LWS seit heute Morgen',
            patientName: 'Thomas Müller',
            patientPhone: '0151 12345678',
            patientType: 'kasse',
            serviceTypeId: 'st_akut',
            resourceId: 'res_room1'
          },
          { 
            id: 'evt_today_2', 
            title: 'Check-Up: Schmidt, Anna', 
            date: todayISO,
            time: 10.5, 
            duration: 0.5, 
            docId: 'dr-schmidt', 
            type: 'Check-Up', 
            source: 'internal', 
            desc: 'Jährlicher Gesundheits-Check-Up',
            patientName: 'Anna Schmidt',
            patientPhone: '0160 88776655',
            patientType: 'privat',
            serviceTypeId: 'st_checkup',
            resourceId: 'res_room2'
          },
          { 
            id: 'evt_today_3', 
            title: 'Blutabnahme: Wagner, Klaus', 
            date: todayISO,
            time: 8.5, 
            duration: 0.5, 
            docId: 'dr-weber', 
            type: 'Blutabnahme', 
            source: 'internal', 
            desc: 'Großes Blutbild Nüchternkontrolle',
            patientName: 'Klaus Wagner',
            patientPhone: '0172 4433221',
            patientType: 'kasse',
            serviceTypeId: 'st_blut'
          },
          { 
            id: 'evt_today_4', 
            title: 'Erstgespräch: Klein, Maximilian', 
            date: todayISO,
            time: 14, 
            duration: 0.75, 
            docId: 'dr-schmidt', 
            type: 'Erstgespräch', 
            source: 'ai_voice', 
            desc: 'Automatisch gebucht über Auxilium Telefonassistent',
            patientName: 'Maximilian Klein',
            patientPhone: '0171 9988776',
            patientType: 'kasse',
            serviceTypeId: 'st_erst',
            resourceId: 'res_room1'
          },
          // Appointments for Monday (Day offset 0)
          { 
            id: 'evt_mon_1', 
            title: 'Sonografie: Becker, Sabine', 
            date: getOffsetDate(0),
            time: 11, 
            duration: 0.5, 
            docId: 'dr-mueller', 
            type: 'Ultraschall / Sonografie', 
            source: 'internal', 
            desc: 'Abdomen Sonografie Kontrolle',
            patientName: 'Sabine Becker',
            patientPhone: '0170 5566778',
            patientType: 'privat',
            serviceTypeId: 'st_sono',
            resourceId: 'res_ultraschall'
          },
          // Appointments for Tuesday (Day offset 1)
          { 
            id: 'evt_tue_1', 
            title: 'Akut: Fischer, Laura', 
            date: getOffsetDate(1),
            time: 9.5, 
            duration: 0.5, 
            docId: 'dr-weber', 
            type: 'Akutsprechstunde', 
            source: 'ai_voice', 
            desc: 'Fieberhafter Infekt',
            patientName: 'Laura Fischer',
            patientPhone: '0152 3344556',
            patientType: 'kasse',
            serviceTypeId: 'st_akut'
          },
          { 
            id: 'evt_tue_2', 
            title: 'Check-Up: Braun, Helga', 
            date: getOffsetDate(1),
            time: 15, 
            duration: 0.5, 
            docId: 'dr-mueller', 
            type: 'Check-Up', 
            source: 'internal', 
            desc: 'Routine-Check & EKG',
            patientName: 'Helga Braun',
            patientPhone: '0176 1122334',
            patientType: 'kasse',
            serviceTypeId: 'st_checkup'
          },
          // Appointments for Wednesday (Day offset 2)
          { 
            id: 'evt_wed_1', 
            title: 'Blutabnahme: Weber, Martin', 
            date: getOffsetDate(2),
            time: 8, 
            duration: 0.5, 
            docId: 'dr-weber', 
            type: 'Blutabnahme', 
            source: 'internal', 
            desc: 'Schilddrüsen-Werte',
            patientName: 'Martin Weber',
            patientPhone: '0163 9988112',
            patientType: 'kasse',
            serviceTypeId: 'st_blut'
          },
          { 
            id: 'evt_wed_2', 
            title: 'Erstgespräch: Hoffmann, Jens', 
            date: getOffsetDate(2),
            time: 10, 
            duration: 0.75, 
            docId: 'dr-schmidt', 
            type: 'Erstgespräch', 
            source: 'ai_voice', 
            desc: 'Neupatient Hausarztwechsel',
            patientName: 'Jens Hoffmann',
            patientPhone: '0175 7766554',
            patientType: 'privat',
            serviceTypeId: 'st_erst'
          },
          // Appointments for Thursday (Day offset 3)
          { 
            id: 'evt_thu_1', 
            title: 'Sonografie: Sommer, Frank', 
            date: getOffsetDate(3),
            time: 11.5, 
            duration: 0.5, 
            docId: 'dr-mueller', 
            type: 'Ultraschall / Sonografie', 
            source: 'internal', 
            desc: 'Carotis Duplex',
            patientName: 'Frank Sommer',
            patientPhone: '0151 7788990',
            patientType: 'privat',
            serviceTypeId: 'st_sono',
            resourceId: 'res_ultraschall'
          },
          // Appointments for Friday (Day offset 4)
          { 
            id: 'evt_fri_1', 
            title: 'Akut: Richter, Elena', 
            date: getOffsetDate(4),
            time: 10, 
            duration: 0.5, 
            docId: 'dr-schmidt', 
            type: 'Akutsprechstunde', 
            source: 'ai_voice', 
            desc: 'Akute Bronchitis',
            patientName: 'Elena Richter',
            patientPhone: '0179 4455667',
            patientType: 'kasse',
            serviceTypeId: 'st_akut'
          },
          { 
            id: 'evt_fri_2', 
            title: 'Check-Up: Koch, Daniel', 
            date: getOffsetDate(4),
            time: 13.5, 
            duration: 0.5, 
            docId: 'dr-weber', 
            type: 'Check-Up', 
            source: 'internal', 
            desc: 'Check-Up 35',
            patientName: 'Daniel Koch',
            patientPhone: '0160 3322110',
            patientType: 'kasse',
            serviceTypeId: 'st_checkup'
          }
        ];
        
        setEvents(mockEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDoctor = (id: string) => {
    if (selectedDoctors.includes(id)) {
      if (selectedDoctors.length > 1) setSelectedDoctors(selectedDoctors.filter(d => d !== id));
    } else {
      setSelectedDoctors([...selectedDoctors, id]);
    }
  };

  const checkConflict = (newEvent: Partial<CalendarEvent>) => {
    if (!newEvent.time || !newEvent.duration || !newEvent.docId || !newEvent.date) return false;

    return events.some(event => {
      if (event.id === newEvent.id) return false;
      if (event.date !== newEvent.date) return false;
      
      const eventStart = event.time;
      const eventEnd = event.time + event.duration;
      const newStart = newEvent.time!;
      const newEnd = newEvent.time! + newEvent.duration!;
      
      const isOverlapping = (newStart < eventEnd && newEnd > eventStart);
      
      if (isOverlapping) {
        // Conflict if same doctor
        if (event.docId === newEvent.docId) return true;
        // Conflict if same resource (room/device)
        if (newEvent.resourceId && event.resourceId === newEvent.resourceId) return true;
      }
      
      return false;
    });
  };

  const handleConnectGoogle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsGoogleConnected(true);
      setIsSyncing(false);
    }, 1500);
  };

  // Date Navigation Handlers
  const handlePrevDate = () => {
    const newD = new Date(currentDate);
    if (viewMode === 'day') {
      newD.setDate(newD.getDate() - 1);
    } else if (viewMode === 'week') {
      newD.setDate(newD.getDate() - 7);
    } else if (viewMode === 'month') {
      newD.setMonth(newD.getMonth() - 1);
    }
    setCurrentDate(newD);
  };

  const handleNextDate = () => {
    const newD = new Date(currentDate);
    if (viewMode === 'day') {
      newD.setDate(newD.getDate() + 1);
    } else if (viewMode === 'week') {
      newD.setDate(newD.getDate() + 7);
    } else if (viewMode === 'month') {
      newD.setMonth(newD.getMonth() + 1);
    }
    setCurrentDate(newD);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setMiniCalDate(today);
  };

  const handleEventClick = (evt: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(evt);
    setIsCreating(false);
    setShowEventModal(true);
  };

  const handleSlotClick = (time: number, docId: string, specificDate?: string) => {
    const defaultDoc = docId || selectedDoctors[0] || doctors[0].id;
    const targetDate = specificDate || formatDateISO(currentDate);
    const newEvent: Partial<CalendarEvent> = {
      id: `new_${Date.now()}`,
      title: '',
      date: targetDate,
      time: time,
      duration: 0.5,
      docId: defaultDoc,
      source: 'internal',
      desc: '',
      patientName: '',
      patientPhone: '',
      patientType: 'kasse',
      serviceTypeId: serviceTypes[0].id
    };
    setSelectedEvent(newEvent);
    setIsCreating(true);
    setShowEventModal(true);
  };

  const saveEvent = async () => {
    if (selectedEvent && selectedEvent.docId && selectedEvent.time && selectedEvent.date) {
      const eventToSave = {
        ...selectedEvent,
        title: selectedEvent.title || selectedEvent.patientName || 'Unbenannter Termin'
      } as CalendarEvent;

      if (checkConflict(eventToSave)) {
        alert("Achtung: Dieser Termin überschneidet sich mit einem anderen Termin oder einer Ressource!");
        return;
      }

      if (isCreating) {
        setEvents([...events, eventToSave]);
      } else {
        setEvents(events.map(e => e.id === eventToSave.id ? eventToSave : e));
      }
      setShowEventModal(false);
    }
  };

  const handleServiceTypeChange = (stId: string) => {
    const st = serviceTypes.find(s => s.id === stId);
    if (st && selectedEvent) {
      const durationHours = st.durationMinutes / 60;
      setSelectedEvent({
        ...selectedEvent,
        serviceTypeId: stId,
        duration: durationHours,
        type: st.name
      });
    }
  };

  // Header Title Formatting
  const getHeaderTitle = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekDays = getWeekDays(currentDate);
      const first = weekDays[0];
      const last = weekDays[6];
      const kw = getCalendarWeek(currentDate);
      return `${first.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })} – ${last.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })} (KW ${kw})`;
    } else {
      return currentDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
    }
  };

  const todayISO = formatDateISO(new Date());
  const currentDateISO = formatDateISO(currentDate);
  const weekDays = getWeekDays(currentDate);
  const monthWeeks = getMonthMatrix(currentDate);
  const miniCalWeeks = getMonthMatrix(miniCalDate);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-sm
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0
      `}>
        <div className="p-4 px-5 flex items-center justify-between border-b border-slate-100">
           <div className="flex flex-col items-start select-none">
             <div className="flex items-center gap-1.5">
               <span className="relative flex h-2.5 w-2.5 mt-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488] shadow-sm"></span>
               </span>
               <span className="font-extrabold text-gradient text-xl leading-none">Auxilium Assist</span>
             </div>
             <span className="text-[11px] text-slate-500 mt-1 font-semibold tracking-wide pl-4">Praxiskalender</span>
           </div>
           <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
             <X size={20} />
           </button>
        </div>

        {/* Sidebar Mini Calendar & Nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Create Button */}
          <button 
            onClick={() => {
              handleSlotClick(9, selectedDoctors[0], currentDateISO);
              setSidebarOpen(false);
            }}
            className="w-full bg-[#0D9488] hover:bg-[#0f766e] shadow-md hover:shadow-lg text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} /> <span>Neuer Termin</span>
          </button>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${activeTab === 'calendar' ? 'bg-teal-50 text-[#0D9488] font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <CalendarIcon size={18} className={activeTab === 'calendar' ? 'text-[#0D9488]' : 'text-slate-500'} /> Kalender
            </button>
            <button onClick={() => setActiveTab('api')} className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${activeTab === 'api' ? 'bg-teal-50 text-[#0D9488] font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Code2 size={18} className={activeTab === 'api' ? 'text-[#0D9488]' : 'text-slate-500'} /> API & Integration
            </button>
            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${activeTab === 'team' ? 'bg-teal-50 text-[#0D9488] font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Users size={18} className={activeTab === 'team' ? 'text-[#0D9488]' : 'text-slate-500'} /> Team & Räume
            </button>
          </nav>

          {/* Mini Interactive Month Calendar in Sidebar */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-800">
                {miniCalDate.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => {
                    const d = new Date(miniCalDate);
                    d.setMonth(d.getMonth() - 1);
                    setMiniCalDate(d);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  onClick={() => {
                    const d = new Date(miniCalDate);
                    d.setMonth(d.getMonth() + 1);
                    setMiniCalDate(d);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Mini Cal Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
              <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
              {miniCalWeeks.flat().map((date, idx) => {
                const isCurrentMonth = date.getMonth() === miniCalDate.getMonth();
                const isSelected = formatDateISO(date) === currentDateISO;
                const isToday = formatDateISO(date) === todayISO;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentDate(date);
                      setMiniCalDate(date);
                    }}
                    className={`h-6 w-6 mx-auto rounded-full flex items-center justify-center text-[11px] transition-colors cursor-pointer
                      ${!isCurrentMonth ? 'text-slate-300' : 'text-slate-700'}
                      ${isSelected ? 'bg-[#0D9488] text-white font-bold shadow-sm' : ''}
                      ${!isSelected && isToday ? 'border border-[#0D9488] font-bold text-[#0D9488]' : ''}
                      ${!isSelected && isCurrentMonth ? 'hover:bg-slate-200' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor Filter */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
              <span>Behandler</span>
              <span className="text-[10px] text-[#0D9488] font-semibold hover:underline cursor-pointer" onClick={() => setSelectedDoctors(doctors.map(d => d.id))}>Alle</span>
            </h3>
            <div className="space-y-1">
              {doctors.map(doc => {
                const isChecked = selectedDoctors.includes(doc.id);
                return (
                  <div 
                    key={doc.id} 
                    className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors" 
                    onClick={() => toggleDoctor(doc.id)}
                  >
                     <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#0D9488] border-[#0D9488]' : 'border-slate-300'}`}>
                       {isChecked && <CheckCircle2 size={12} className="text-white" />}
                     </div>
                     <span className={`text-xs font-medium ${isChecked ? 'text-slate-800' : 'text-slate-400'}`}>{doc.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Resources Filter */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 px-1">Ressourcen & Räume</h3>
            <div className="space-y-1">
              {resources.map(res => (
                <div key={res.id} className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                   <div className="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                   <span className="text-xs text-slate-600">{res.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-2.5 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-xs font-semibold cursor-pointer">
            <LogOut size={16} /> Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        
        {/* Header / Toolbar */}
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 bg-white shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-600">
              <Menu size={20} />
            </button>
            
            {/* Today Button */}
            <button 
              onClick={handleToday}
              className="text-xs font-bold border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-teal-50 hover:text-[#0D9488] hover:border-teal-200 text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              Heute
            </button>

            {/* Navigation Chevrons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
               <button onClick={handlePrevDate} className="p-1 hover:bg-white rounded shadow-2xs transition-all cursor-pointer" title="Zurück">
                 <ChevronLeft size={16} className="text-slate-600" />
               </button>
               <button onClick={handleNextDate} className="p-1 hover:bg-white rounded shadow-2xs transition-all cursor-pointer" title="Vor">
                 <ChevronRight size={16} className="text-slate-600" />
               </button>
            </div>

            {/* Dynamic Date Title */}
            <div className="flex items-center gap-2 ml-1">
               <span className="text-base sm:text-lg font-bold text-slate-800">{getHeaderTitle()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* View Switcher: Tag / Woche / Monat */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 shadow-2xs">
               <button 
                 onClick={() => setViewMode('day')}
                 className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === 'day' ? 'bg-white shadow-sm text-[#0D9488]' : 'text-slate-600 hover:text-slate-900'}`}
               >
                 <span>Tag</span>
               </button>
               <button 
                 onClick={() => setViewMode('week')}
                 className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === 'week' ? 'bg-white shadow-sm text-[#0D9488]' : 'text-slate-600 hover:text-slate-900'}`}
               >
                 <span>Woche</span>
               </button>
               <button 
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === 'month' ? 'bg-white shadow-sm text-[#0D9488]' : 'text-slate-600 hover:text-slate-900'}`}
                >
                 <span>Monat</span>
               </button>
            </div>
            
            <div className="flex items-center gap-2">
               <button className="text-slate-500 hover:bg-slate-100 p-2 rounded-xl transition-colors cursor-pointer"><Search size={18} /></button>
               <button onClick={() => setActiveTab('api')} className="text-slate-500 hover:bg-slate-100 p-2 rounded-xl transition-colors hidden sm:block cursor-pointer"><Settings size={18} /></button>
               <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer ring-2 ring-teal-100">
                 P
               </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative bg-white">
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <RefreshCw className="animate-spin text-[#0D9488]" size={32} />
            </div>
          ) : activeTab === 'calendar' && (
             <div className="h-full flex flex-col overflow-hidden">
                
                {/* 1. TAG (DAY) VIEW */}
                {viewMode === 'day' && (
                  <div className="h-full flex flex-col overflow-hidden">
                    {/* Header: Doctors list */}
                    <div className="flex border-b border-slate-200 bg-white ml-14 pr-4 overflow-hidden shrink-0">
                      {selectedDoctors.map(docId => {
                        const doc = doctors.find(d => d.id === docId);
                        return (
                          <div key={docId} className="flex-1 py-3 text-center border-l border-slate-100 flex items-center justify-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${doc?.id === 'dr-mueller' ? 'bg-[#0D9488]' : doc?.id === 'dr-schmidt' ? 'bg-emerald-500' : 'bg-cyan-500'}`}></div>
                            <span className="text-xs font-bold text-slate-800">{doc?.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Scrollable Day Grid */}
                    <div className="flex-1 overflow-y-auto overflow-x-auto relative scroll-smooth">
                       <div className="relative min-w-[300px]" style={{ minWidth: selectedDoctors.length > 2 ? '700px' : '100%' }}>
                          
                          {/* Current Time Indicator Line (if today) */}
                          {currentDateISO === todayISO && (
                            <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: '240px' }}>
                               <div className="border-t-2 border-[#0D9488] w-full relative">
                                 <div className="absolute -left-2 -top-1.5 w-3 h-3 rounded-full bg-[#0D9488]"></div>
                               </div>
                            </div>
                          )}

                          {timeSlots.map((hour) => (
                            <div key={hour} className="flex group h-24">
                               {/* Time Column */}
                               <div className="w-14 text-right pr-3 -mt-2.5 shrink-0">
                                 <span className="text-xs text-slate-400 font-medium">{hour}:00</span>
                               </div>
                               
                               {/* Doctor Columns */}
                               <div className="flex-1 flex border-t border-slate-100 relative">
                                 {/* Half-hour guide line */}
                                 <div className="absolute top-12 left-0 right-0 border-t border-slate-50 w-full"></div>

                                 {selectedDoctors.map(docId => (
                                   <div 
                                     key={docId} 
                                     onClick={() => handleSlotClick(hour, docId, currentDateISO)}
                                     className="flex-1 border-l border-slate-100 hover:bg-teal-50/30 transition-colors cursor-pointer relative group/slot"
                                   >
                                     <div className="hidden group-hover/slot:flex absolute inset-0 items-center justify-center opacity-0 group-hover/slot:opacity-100 pointer-events-none">
                                        <div className="bg-white/80 p-1 rounded-md shadow-2xs border border-teal-100">
                                          <Plus className="text-[#0D9488]" size={16} />
                                        </div>
                                     </div>
                                   </div>
                                 ))}
                               </div>
                            </div>
                          ))}

                          {/* Render Events for Day View */}
                          {events
                            .filter(e => e.date === currentDateISO && selectedDoctors.includes(e.docId))
                            .map(evt => {
                             const docIndex = selectedDoctors.indexOf(evt.docId);
                             const widthPercent = 100 / selectedDoctors.length;
                             const leftPercent = docIndex * widthPercent;
                             const doctor = doctors.find(d => d.id === evt.docId);
                             const isConflict = checkConflict({...evt, id: 'temp'});

                             return (
                               <div
                                 key={evt.id}
                                 onClick={(e) => handleEventClick(evt, e)}
                                 className={`absolute z-20 mx-1 rounded-lg p-2 text-xs cursor-pointer shadow-sm border-l-4 hover:brightness-95 hover:z-30 transition-all overflow-hidden ${doctor?.color} ${doctor?.border} ${isConflict ? 'ring-2 ring-red-500' : ''}`}
                                 style={{
                                    top: `${(evt.time - 8) * 96 + 1}px`,
                                    height: `${evt.duration * 96 - 2}px`,
                                    left: `calc(3.5rem + ${leftPercent}%)`,
                                    width: `calc(${widthPercent}% - 3.5rem / ${selectedDoctors.length} - 6px)`
                                 }}
                               >
                                 <div className="font-bold truncate flex items-center justify-between text-slate-900">
                                   <span className="truncate">{evt.title || evt.patientName}</span>
                                   {evt.patientType === 'privat' && (
                                     <span className="bg-amber-100 text-amber-800 px-1 rounded text-[9px] font-extrabold uppercase shrink-0">PKV</span>
                                   )}
                                 </div>
                                 <div className="truncate opacity-80 mt-0.5 text-[11px] font-medium">
                                   {evt.type} • {evt.time % 1 === 0 ? `${evt.time}:00` : `${Math.floor(evt.time)}:30`} - {((evt.time + evt.duration) % 1 === 0) ? `${evt.time + evt.duration}:00` : `${Math.floor(evt.time + evt.duration)}:30`}
                                 </div>
                                 {evt.resourceId && (
                                   <div className="text-[10px] opacity-70 truncate mt-0.5 flex items-center gap-1">
                                     <Building2 size={10} />
                                     <span>{resources.find(r => r.id === evt.resourceId)?.name}</span>
                                   </div>
                                 )}
                               </div>
                             );
                          })}
                       </div>
                    </div>
                  </div>
                )}

                {/* 2. WOCHE (WEEK) VIEW */}
                {viewMode === 'week' && (
                  <div className="h-full flex flex-col overflow-hidden">
                    {/* Weekday Header Columns */}
                    <div className="flex border-b border-slate-200 bg-white ml-14 pr-4 overflow-hidden shrink-0">
                      {weekDays.map((dayDate, idx) => {
                        const dayISO = formatDateISO(dayDate);
                        const isToday = dayISO === todayISO;
                        const isSelectedDay = dayISO === currentDateISO;
                        const dayName = dayDate.toLocaleDateString('de-DE', { weekday: 'short' });
                        const dayNum = dayDate.getDate();

                        return (
                          <div 
                            key={idx} 
                            onClick={() => {
                              setCurrentDate(dayDate);
                            }}
                            className={`flex-1 py-2.5 text-center border-l border-slate-100 cursor-pointer transition-colors ${isSelectedDay ? 'bg-teal-50/50' : 'hover:bg-slate-50'}`}
                          >
                            <span className="text-[11px] font-bold text-slate-500 uppercase block">{dayName}</span>
                            <div className="flex justify-center mt-0.5">
                              <span className={`h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isToday ? 'bg-[#0D9488] text-white shadow-sm' : 'text-slate-800'}`}>
                                {dayNum}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Scrollable Week Grid */}
                    <div className="flex-1 overflow-y-auto overflow-x-auto relative scroll-smooth">
                      <div className="relative min-w-[750px]">
                        {timeSlots.map((hour) => (
                          <div key={hour} className="flex group h-24">
                             {/* Time Column */}
                             <div className="w-14 text-right pr-3 -mt-2.5 shrink-0">
                               <span className="text-xs text-slate-400 font-medium">{hour}:00</span>
                             </div>
                             
                             {/* 7 Day Columns */}
                             <div className="flex-1 flex border-t border-slate-100 relative">
                               {/* Half-hour guide line */}
                               <div className="absolute top-12 left-0 right-0 border-t border-slate-50 w-full"></div>

                               {weekDays.map((dayDate, dayIdx) => {
                                 const dayISO = formatDateISO(dayDate);
                                 return (
                                   <div 
                                     key={dayIdx} 
                                     onClick={() => handleSlotClick(hour, selectedDoctors[0], dayISO)}
                                     className="flex-1 border-l border-slate-100 hover:bg-teal-50/30 transition-colors cursor-pointer relative group/slot"
                                   >
                                     <div className="hidden group-hover/slot:flex absolute inset-0 items-center justify-center opacity-0 group-hover/slot:opacity-100 pointer-events-none">
                                        <div className="bg-white/80 p-1 rounded-md shadow-2xs border border-teal-100">
                                          <Plus className="text-[#0D9488]" size={14} />
                                        </div>
                                     </div>
                                   </div>
                                 );
                               })}
                             </div>
                          </div>
                        ))}

                        {/* Render Events for Week View */}
                        {events
                          .filter(e => selectedDoctors.includes(e.docId))
                          .map(evt => {
                            const eventDayIdx = weekDays.findIndex(d => formatDateISO(d) === evt.date);
                            if (eventDayIdx === -1) return null; // Outside this week

                            const widthPercent = 100 / 7;
                            const leftPercent = eventDayIdx * widthPercent;
                            const doctor = doctors.find(d => d.id === evt.docId);

                            return (
                              <div
                                key={evt.id}
                                onClick={(e) => handleEventClick(evt, e)}
                                className={`absolute z-20 mx-0.5 rounded-lg p-1.5 text-xs cursor-pointer shadow-sm border-l-4 hover:brightness-95 hover:z-30 transition-all overflow-hidden ${doctor?.color} ${doctor?.border}`}
                                style={{
                                   top: `${(evt.time - 8) * 96 + 1}px`,
                                   height: `${evt.duration * 96 - 2}px`,
                                   left: `calc(3.5rem + ${leftPercent}%)`,
                                   width: `calc(${widthPercent}% - 3.5rem / 7 - 3px)`
                                }}
                              >
                                <div className="font-bold truncate flex items-center justify-between text-slate-900 text-[11px]">
                                  <span className="truncate">{evt.patientName || evt.title}</span>
                                  {evt.patientType === 'privat' && (
                                    <span className="bg-amber-100 text-amber-800 px-0.5 rounded text-[8px] font-bold uppercase">PKV</span>
                                  )}
                                </div>
                                <div className="truncate opacity-80 text-[10px]">
                                  {evt.type} • {evt.time % 1 === 0 ? `${evt.time}:00` : `${Math.floor(evt.time)}:30`}
                                </div>
                                <div className="truncate text-[9px] opacity-75 font-medium mt-0.5">
                                  {doctor?.name}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. MONAT (MONTH) VIEW */}
                {viewMode === 'month' && (
                  <div className="h-full flex flex-col overflow-hidden bg-slate-100">
                    {/* Weekday Header */}
                    <div className="grid grid-cols-7 border-b border-slate-200 bg-white text-center py-2.5 text-xs font-bold text-slate-600 shrink-0">
                      <span>Montag</span>
                      <span>Dienstag</span>
                      <span>Mittwoch</span>
                      <span>Donnerstag</span>
                      <span>Freitag</span>
                      <span>Samstag</span>
                      <span>Sonntag</span>
                    </div>

                    {/* Month Matrix Grid */}
                    <div className="flex-1 grid grid-rows-5 md:grid-rows-6 grid-cols-7 gap-px bg-slate-200 overflow-y-auto">
                      {monthWeeks.flat().map((dayDate, idx) => {
                        const dayISO = formatDateISO(dayDate);
                        const isCurrentMonth = dayDate.getMonth() === currentDate.getMonth();
                        const isToday = dayISO === todayISO;
                        const dayEvents = events.filter(e => e.date === dayISO && selectedDoctors.includes(e.docId));

                        return (
                          <div 
                            key={idx}
                            onClick={() => {
                              setCurrentDate(dayDate);
                            }}
                            className={`min-h-[100px] p-2 flex flex-col transition-colors group relative ${isCurrentMonth ? 'bg-white hover:bg-teal-50/20' : 'bg-slate-50/70 text-slate-400'}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center ${isToday ? 'bg-[#0D9488] text-white font-bold shadow-xs' : isCurrentMonth ? 'text-slate-800' : 'text-slate-400'}`}>
                                {dayDate.getDate()}
                              </span>
                              
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSlotClick(9, selectedDoctors[0], dayISO);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-teal-50 rounded text-slate-400 hover:text-[#0D9488] transition-opacity cursor-pointer"
                                title="Termin hinzufügen"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Appointments list */}
                            <div className="flex-1 space-y-1 overflow-y-auto max-h-[85px] scrollbar-none">
                              {dayEvents.slice(0, 3).map(evt => {
                                const doc = doctors.find(d => d.id === evt.docId);
                                return (
                                  <div
                                    key={evt.id}
                                    onClick={(e) => handleEventClick(evt, e)}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium truncate cursor-pointer shadow-2xs border-l-2 hover:opacity-90 flex items-center justify-between gap-1 ${doc?.color} ${doc?.border}`}
                                    title={`${evt.patientName} (${evt.type}) - ${evt.time}:00 Uhr`}
                                  >
                                    <span className="truncate">
                                      {evt.time % 1 === 0 ? `${evt.time}:00` : `${Math.floor(evt.time)}:30`} {evt.patientName}
                                    </span>
                                    {evt.patientType === 'privat' && (
                                      <span className="text-[8px] font-bold text-amber-700">P</span>
                                    )}
                                  </div>
                                );
                              })}
                              
                              {dayEvents.length > 3 && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentDate(dayDate);
                                    setViewMode('day');
                                  }}
                                  className="text-[10px] font-bold text-[#0D9488] hover:underline block text-center w-full pt-0.5 cursor-pointer"
                                >
                                  +{dayEvents.length - 3} weitere
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

             </div>
          )}

          {/* API & INTEGRATIONS TAB */}
          {activeTab === 'api' && (
            <div className="p-4 lg:p-8 max-w-4xl mx-auto overflow-y-auto h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Integrationen & API</h2>
              
              {/* Google Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-50 text-[#0D9488] rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
                        <CalendarIcon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Google Kalender</h3>
                        <p className="text-sm text-slate-500">2-Wege-Synchronisation für private Termine</p>
                      </div>
                   </div>
                   
                   {!isGoogleConnected ? (
                      <button 
                        onClick={handleConnectGoogle}
                        disabled={isSyncing}
                        className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-50 hover:text-[#0D9488] hover:border-teal-200 transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                      >
                        {isSyncing ? <RefreshCw className="animate-spin text-[#0D9488]" size={16} /> : <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />}
                        Verbinden
                      </button>
                   ) : (
                      <div className="flex items-center gap-3">
                         <span className="text-sm text-slate-600 font-medium">praxis@gmail.com</span>
                         <span className="text-xs font-bold text-[#0D9488] bg-teal-50 px-2 py-1 rounded border border-teal-100 flex items-center gap-1">
                           <CheckCircle2 size={12} /> Aktiv
                         </span>
                         <button onClick={() => setIsGoogleConnected(false)} className="text-slate-400 hover:text-red-500 cursor-pointer"><LogOut size={16} /></button>
                      </div>
                   )}
                </div>
              </div>

              {/* API Credentials Section */}
              <h3 className="text-lg font-bold text-slate-900 mb-4 mt-8">Entwickler-Einstellungen (Turso/libsql)</h3>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
                 <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                      <Key size={14} className="text-[#0D9488]" /> Turso Database Endpoint
                    </label>
                    <div className="flex gap-2">
                       <code className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-600 flex items-center">
                         libsql://auxilium-db-username.turso.io
                       </code>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* TEAM & RÄUME TAB */}
          {(activeTab === 'team' || activeTab === 'settings') && (
            <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">Ärzte, Team & Ressourcen</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <Users size={18} className="text-[#0D9488]" /> Behandler ({doctors.length})
                   </h3>
                   <div className="space-y-3">
                     {doctors.map(d => (
                       <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                         <span className="font-semibold text-sm text-slate-800">{d.name}</span>
                         <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">Aktiv</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <Building2 size={18} className="text-[#0D9488]" /> Räume & Geräte ({resources.length})
                   </h3>
                   <div className="space-y-3">
                     {resources.map(r => (
                       <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                         <span className="font-semibold text-sm text-slate-800">{r.name}</span>
                         <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold capitalize">{r.type}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* EVENT DETAILS / CREATE MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 className="font-bold text-slate-800 text-lg">
                 {isCreating ? 'Neuer Praxis-Termin' : 'Termin-Details'}
               </h3>
               <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                 <X size={20} />
               </button>
            </div>
            
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
               {isCreating ? (
                 <div className="space-y-4">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Patientenname</label>
                      <input 
                        type="text" 
                        autoFocus
                        className="w-full border-b-2 border-slate-200 pb-2 text-lg font-bold text-slate-900 focus:border-[#0D9488] outline-none bg-transparent"
                        placeholder="Name des Patienten eingeben"
                        value={selectedEvent?.patientName || ''} 
                        onChange={(e) => setSelectedEvent({...selectedEvent, patientName: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Patient Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Telefonnummer</label>
                        <input 
                          type="tel"
                          className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm"
                          placeholder="z.B. 0151 12345678"
                          value={selectedEvent?.patientPhone || ''} 
                          onChange={(e) => setSelectedEvent({...selectedEvent, patientPhone: e.target.value})}
                        />
                      </div>
                      {/* Patient Insurance */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Versicherung</label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button 
                            type="button"
                            onClick={() => setSelectedEvent({...selectedEvent, patientType: 'kasse'})}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${selectedEvent?.patientType === 'kasse' ? 'bg-white shadow text-[#0D9488]' : 'text-slate-500'}`}
                          >
                            Kasse (GKV)
                          </button>
                          <button 
                            type="button"
                            onClick={() => setSelectedEvent({...selectedEvent, patientType: 'privat'})}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${selectedEvent?.patientType === 'privat' ? 'bg-white shadow text-amber-700' : 'text-slate-500'}`}
                          >
                            Privat (PKV)
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Date selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Datum</label>
                        <input 
                          type="date"
                          className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm font-medium"
                          value={selectedEvent?.date || currentDateISO}
                          onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                        />
                      </div>

                      {/* Doctor selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Behandler</label>
                        <select 
                          className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm font-medium cursor-pointer"
                          value={selectedEvent?.docId || doctors[0].id}
                          onChange={(e) => setSelectedEvent({...selectedEvent, docId: e.target.value})}
                        >
                          {doctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Service Type (Behandlungsgrund) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1.5">
                        <Stethoscope size={14} className="text-[#0D9488]" /> Behandlungsgrund
                      </label>
                      <select 
                        className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm font-medium cursor-pointer"
                        value={selectedEvent?.serviceTypeId || serviceTypes[0].id}
                        onChange={(e) => handleServiceTypeChange(e.target.value)}
                      >
                        {serviceTypes.map(st => (
                          <option key={st.id} value={st.id}>{st.name} ({st.durationMinutes} Min)</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Startzeit</label>
                          <select 
                            className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm font-medium cursor-pointer"
                            value={selectedEvent?.time || 9}
                            onChange={(e) => setSelectedEvent({...selectedEvent, time: parseFloat(e.target.value)})}
                          >
                            {timeSlots.map(h => (
                              <React.Fragment key={h}>
                                <option value={h}>{h}:00 Uhr</option>
                                <option value={h + 0.5}>{h}:30 Uhr</option>
                              </React.Fragment>
                            ))}
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1.5">
                            <Building2 size={14} className="text-[#0D9488]" /> Raum / Gerät (Opt.)
                          </label>
                          <select 
                            className="w-full bg-slate-50 p-2.5 rounded-xl text-slate-700 outline-none border border-slate-200/60 focus:border-[#0D9488] focus:bg-white text-sm font-medium cursor-pointer"
                            value={selectedEvent?.resourceId || ''}
                            onChange={(e) => setSelectedEvent({...selectedEvent, resourceId: e.target.value})}
                          >
                            <option value="">Keine Zuweisung</option>
                            {resources.map(res => (
                              <option key={res.id} value={res.id}>{res.name}</option>
                            ))}
                          </select>
                       </div>
                    </div>

                    {checkConflict(selectedEvent!) && (
                      <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                        <AlertCircle size={16} />
                        Konflikt erkannt: Der Arzt oder die Ressource ist an diesem Datum/Uhrzeit bereits belegt!
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Anmerkungen</label>
                      <textarea 
                        className="w-full bg-slate-50 p-3 rounded-xl text-sm border border-slate-200/60 focus:bg-white focus:border-[#0D9488] transition-all resize-none h-18 outline-none" 
                        placeholder="Zusätzliche medizinische Notizen..."
                        value={selectedEvent?.desc || ''}
                        onChange={(e) => setSelectedEvent({...selectedEvent, desc: e.target.value})}
                      />
                    </div>
                 </div>
               ) : (
                 <div className="space-y-5">
                    <div className="flex items-start justify-between">
                       <div className="flex items-start gap-3.5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${doctors.find(d => d.id === selectedEvent?.docId)?.color}`}>
                            <Users size={22} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg leading-tight">{selectedEvent?.patientName || selectedEvent?.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {selectedEvent?.date && new Date(selectedEvent.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })} • {selectedEvent?.time % 1 === 0 ? `${selectedEvent?.time}:00` : `${Math.floor(selectedEvent?.time || 0)}:30`} Uhr
                            </p>
                          </div>
                       </div>
                       <div className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedEvent?.patientType === 'privat' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'}`}>
                         {selectedEvent?.patientType === 'privat' ? 'Privat' : 'Kasse'}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Telefon</p>
                        <p className="text-sm font-semibold text-slate-800">{selectedEvent?.patientPhone || 'Nicht hinterlegt'}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Behandler</p>
                        <p className="text-sm font-semibold text-slate-800">{doctors.find(d => d.id === selectedEvent?.docId)?.name}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                       <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">Behandlungsgrund:</span>
                          <span className="font-bold text-slate-800">{selectedEvent?.type}</span>
                       </div>
                       {selectedEvent?.resourceId && (
                         <div className="flex items-center justify-between text-xs border-t border-slate-200/50 pt-1.5">
                            <span className="text-slate-500 font-medium">Ressource:</span>
                            <span className="font-bold text-[#0D9488]">{resources.find(r => r.id === selectedEvent?.resourceId)?.name}</span>
                         </div>
                       )}
                    </div>

                    {selectedEvent?.desc && (
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notizen</p>
                        <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 border border-slate-100 leading-relaxed">
                          {selectedEvent.desc}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-[#0D9488] bg-teal-50 p-2.5 rounded-xl border border-teal-100 font-medium">
                      <ShieldCheck size={16} className="shrink-0 text-[#0D9488]" />
                      <span>Terminbuchung synchronisiert mit Praxis-PVS / Auxilium Assist.</span>
                    </div>
                 </div>
               )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
               {isCreating ? (
                 <>
                   <button onClick={() => setShowEventModal(false)} className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold text-xs cursor-pointer">Abbrechen</button>
                   <button 
                     onClick={saveEvent} 
                     className="px-5 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-xs shadow-sm transition-colors cursor-pointer"
                   >
                     Termin eintragen
                   </button>
                 </>
               ) : (
                 <>
                   <button 
                     onClick={() => {
                       if (selectedEvent?.id) {
                         setEvents(events.filter(e => e.id !== selectedEvent.id));
                         setShowEventModal(false);
                       }
                     }} 
                     className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-semibold mr-auto transition-colors cursor-pointer"
                   >
                     Löschen
                   </button>
                   <button onClick={() => setShowEventModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Schließen</button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
