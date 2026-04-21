
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
  Key
} from 'lucide-react';

interface DashboardPageProps {
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState('calendar');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  // Calendar State
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>(['dr-mueller', 'dr-schmidt']);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Google Integration
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Doctors Data
  const doctors = [
    { id: 'dr-mueller', name: 'Dr. Müller', color: 'bg-blue-50 border-blue-200 text-blue-700', border: 'border-blue-500' },
    { id: 'dr-schmidt', name: 'Dr. Schmidt', color: 'bg-emerald-50 border-emerald-200 text-emerald-700', border: 'border-emerald-500' },
    { id: 'dr-weber', name: 'Dr. Weber', color: 'bg-purple-50 border-purple-200 text-purple-700', border: 'border-purple-500' },
  ];

  // Time Slots (08:00 - 18:00)
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); 

  // Mock Events
  const [events, setEvents] = useState([
    { id: 'evt_982374', title: 'Akut: Müller, Thomas', time: 9, duration: 1, docId: 'dr-mueller', type: 'Notfall', source: 'internal', desc: 'Starke Schmerzen LWS' },
    { id: 'evt_123456', title: 'Vorsorge: Schmidt, Anna', time: 10, duration: 1, docId: 'dr-schmidt', type: 'Routine', source: 'internal', desc: 'Jährlicher Check-up' },
    { id: 'evt_773822', title: 'Team-Besprechung', time: 13, duration: 0.5, docId: 'dr-mueller', type: 'Intern', source: 'internal', desc: 'Besprechung der neuen KI-Software' },
    { id: 'evt_998877', title: 'Neupatient: Klein', time: 14, duration: 1.5, docId: 'dr-schmidt', type: 'Erstgespräch', source: 'internal', desc: 'Überweisung vom Hausarzt' },
  ]);

  const toggleDoctor = (id: string) => {
    if (selectedDoctors.includes(id)) {
      if (selectedDoctors.length > 1) setSelectedDoctors(selectedDoctors.filter(d => d !== id));
    } else {
      setSelectedDoctors([...selectedDoctors, id]);
    }
  };

  const handleConnectGoogle = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsGoogleConnected(true);
      setIsSyncing(false);
      setEvents(prev => [
        ...prev,
        { id: 'g_1', title: 'Zahnarzt (Privat)', time: 11, duration: 1, docId: 'dr-mueller', type: 'Privat', source: 'google', desc: 'Privater Termin' },
        { id: 'g_2', title: 'Mittagspause', time: 12, duration: 1, docId: 'dr-mueller', type: 'Blocker', source: 'google', desc: '' },
      ]);
    }, 1500);
  };

  const handleEventClick = (evt: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(evt);
    setIsCreating(false);
    setShowEventModal(true);
  };

  const handleSlotClick = (time: number, docId: string) => {
    const newEvent = {
      id: `new_${Date.now()}`,
      title: '(Neuer Termin)',
      time: time,
      duration: 1,
      docId: docId,
      type: 'Neu',
      source: 'internal',
      desc: ''
    };
    setSelectedEvent(newEvent);
    setIsCreating(true);
    setShowEventModal(true);
  };

  const saveNewEvent = () => {
    if (isCreating && selectedEvent) {
      setEvents([...events, { ...selectedEvent, title: selectedEvent.title === '(Neuer Termin)' ? 'Neuer Termin' : selectedEvent.title }]);
    }
    setShowEventModal(false);
  };

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
           <div className="flex items-center gap-2">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488]"></span>
             </span>
             <span className="font-bold text-slate-800 text-xl tracking-tight">auxilium.ai</span>
           </div>
           <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
             <X size={24} />
           </button>
        </div>

        {/* Sidebar Mini Calendar & Nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Create Button */}
          <button 
            onClick={() => {
              handleSlotClick(9, selectedDoctors[0]);
              setSidebarOpen(false);
            }}
            className="w-full bg-white border border-slate-200 shadow-sm hover:shadow-md text-slate-700 font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={20} className="text-google-red" /> <span>Erstellen</span>
          </button>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-r-full font-medium text-sm transition-colors ${activeTab === 'calendar' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
              <CalendarIcon size={18} /> Kalender
            </button>
            <button onClick={() => setActiveTab('api')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-r-full font-medium text-sm transition-colors ${activeTab === 'api' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Code2 size={18} /> API & Integration
            </button>
            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-r-full font-medium text-sm transition-colors ${activeTab === 'team' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Users size={18} /> Team
            </button>
          </nav>

          {/* Doctor Filter */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4">Meine Kalender</h3>
            <div className="space-y-1">
              {doctors.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 px-4 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer" onClick={() => toggleDoctor(doc.id)}>
                   <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedDoctors.includes(doc.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                     {selectedDoctors.includes(doc.id) && <CheckCircle2 size={12} className="text-white" />}
                   </div>
                   <span className="text-sm text-slate-700">{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Other Calendars */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4">Andere Kalender</h3>
            <div className="flex items-center gap-3 px-4 py-1.5 opacity-60">
               <div className="w-4 h-4 rounded border border-slate-300"></div>
               <span className="text-sm text-slate-700">Feiertage</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-600 transition-colors w-full text-sm font-medium">
            <LogOut size={18} /> Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header / Toolbar */}
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 bg-white shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-full text-slate-600">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
               <span className="text-xl font-normal text-slate-700 hidden sm:block">Mai 2024</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
               <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronLeft size={16} className="text-slate-600" /></button>
               <button className="p-1 hover:bg-white rounded shadow-sm transition-all"><ChevronRight size={16} className="text-slate-600" /></button>
            </div>
            <button className="text-sm font-bold border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors hidden sm:block">Heute</button>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex bg-slate-100 p-1 rounded-lg">
               <button 
                 onClick={() => setViewMode('day')}
                 className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewMode === 'day' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Tag
               </button>
               <button 
                 onClick={() => setViewMode('week')}
                 className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewMode === 'week' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Woche
               </button>
               <button 
                  onClick={() => setViewMode('month')}
                  className={`hidden sm:block px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewMode === 'month' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                 Monat
               </button>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><Search size={20} /></button>
               <button className="text-slate-500 hover:bg-slate-100 p-2 rounded-full hidden sm:block"><Settings size={20} /></button>
               <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:ring-4 ring-emerald-100 transition-all">
                 P
               </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative bg-white">
          
          {activeTab === 'calendar' && (
             <div className="h-full flex flex-col overflow-hidden">
                {/* Calendar Header Row (Doctors) */}
                <div className="flex border-b border-slate-200 bg-white ml-14 pr-4 overflow-hidden">
                   {selectedDoctors.map(docId => {
                     const doc = doctors.find(d => d.id === docId);
                     return (
                       <div key={docId} className="flex-1 py-3 text-center border-l border-slate-100">
                         <span className="text-sm font-bold text-slate-700">{doc?.name}</span>
                       </div>
                     )
                   })}
                </div>

                {/* Scrollable Calendar Grid */}
                <div className="flex-1 overflow-y-auto overflow-x-auto relative scroll-smooth">
                   <div className="relative min-w-[300px]" style={{ minWidth: selectedDoctors.length > 2 ? '800px' : '100%' }}>
                      
                      {/* Current Time Indicator Line (Static visual for demo) */}
                      <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: '240px' }}>
                         <div className="border-t-2 border-red-500 w-full relative">
                           <div className="absolute -left-2 -top-1.5 w-3 h-3 rounded-full bg-red-500"></div>
                         </div>
                      </div>

                      {timeSlots.map((hour, index) => (
                        <div key={hour} className="flex group h-24">
                           {/* Time Column */}
                           <div className="w-14 text-right pr-2 -mt-2.5">
                             <span className="text-xs text-slate-400 font-medium">{hour}:00</span>
                           </div>
                           
                           {/* Grid Columns */}
                           <div className="flex-1 flex border-t border-slate-100 relative">
                             {/* Half-hour guide line */}
                             <div className="absolute top-12 left-0 right-0 border-t border-slate-50 w-full"></div>

                             {selectedDoctors.map(docId => (
                               <div 
                                 key={docId} 
                                 onClick={() => handleSlotClick(hour, docId)}
                                 className="flex-1 border-l border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer relative"
                               >
                                 {/* Plus icon on hover */}
                                 <div className="hidden group-hover:flex absolute inset-0 items-center justify-center opacity-0 hover:opacity-100 pointer-events-none">
                                    <Plus className="text-slate-300" />
                                 </div>
                               </div>
                             ))}
                           </div>
                        </div>
                      ))}

                      {/* Render Events */}
                      {events.filter(e => selectedDoctors.includes(e.docId)).map(evt => {
                         const docIndex = selectedDoctors.indexOf(evt.docId);
                         const widthPercent = 100 / selectedDoctors.length;
                         const leftPercent = docIndex * widthPercent;
                         
                         // Determine visual style based on source/type
                         const isGoogle = evt.source === 'google';
                         const doctor = doctors.find(d => d.id === evt.docId);
                         
                         return (
                           <div
                             key={evt.id}
                             onClick={(e) => handleEventClick(evt, e)}
                             className={`absolute z-20 mx-1 rounded-md p-2 text-xs cursor-pointer shadow-sm border-l-4 hover:brightness-95 hover:z-30 transition-all overflow-hidden ${isGoogle ? 'bg-white border-blue-500 text-slate-700 ring-1 ring-slate-200' : `${doctor?.color} ${doctor?.border}`}`}
                             style={{
                               top: `${(evt.time - 8) * 96 + 1}px`, // 96px per hour (h-24)
                               height: `${evt.duration * 96 - 2}px`,
                               left: `calc(3.5rem + ${leftPercent}%)`, // 3.5rem is time col width
                               width: `calc(${widthPercent}% - 3.5rem / ${selectedDoctors.length} - 4px)`
                             }}
                           >
                             <div className="font-bold truncate flex items-center gap-1">
                               {isGoogle && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                               {evt.title}
                             </div>
                             <div className="truncate opacity-80">
                               {evt.time}:00 - {evt.time + evt.duration}:00
                             </div>
                           </div>
                         );
                      })}
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'api' && (
            <div className="p-4 lg:p-8 max-w-4xl mx-auto overflow-y-auto h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Integrationen & API</h2>
              
              {/* Google Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
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
                        className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
                      >
                        {isSyncing ? <RefreshCw className="animate-spin" size={16} /> : <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />}
                        Verbinden
                      </button>
                   ) : (
                      <div className="flex items-center gap-3">
                         <span className="text-sm text-slate-600 font-medium">praxis@gmail.com</span>
                         <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                           <CheckCircle2 size={12} /> Aktiv
                         </span>
                         <button onClick={() => setIsGoogleConnected(false)} className="text-slate-400 hover:text-red-500"><LogOut size={16} /></button>
                      </div>
                   )}
                </div>
              </div>

              {/* API Credentials Section */}
              <h3 className="text-lg font-bold text-slate-900 mb-4 mt-8">Entwickler-Einstellungen</h3>
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
                 
                 {/* API Key Field */}
                 <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                        <Key size={14} /> API Key
                      </label>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-100">Live Environment</span>
                    </div>
                    <div className="flex gap-2">
                       <code className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-600 flex items-center">
                         aux_live_8f92k39d02k19s83j492
                       </code>
                       <button className="bg-white border border-slate-200 w-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95" title="Kopieren">
                         <Copy size={18} />
                       </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Dieser Schlüssel gewährt Vollzugriff auf Ihre Praxis-Instanz. Geben Sie ihn nicht weiter.
                    </p>
                 </div>

                 <div className="w-full h-px bg-slate-100 my-6"></div>

                 {/* Event ID Field */}
                 <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                        <Code2 size={14} /> Event ID (Webhook)
                      </label>
                    </div>
                    <div className="flex gap-2">
                       <code className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-600 flex items-center">
                         evt_test_sample_12345
                       </code>
                       <button className="bg-white border border-slate-200 w-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95" title="Kopieren">
                         <Copy size={18} />
                       </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Verwenden Sie diese ID zum Testen von Webhooks oder für spezifische Event-Updates via API.
                    </p>
                 </div>

              </div>

              {/* Documentation Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="font-bold text-lg mb-1">API Dokumentation</h3>
                     <p className="text-slate-400 text-sm">Beispiel-Request für Terminabfrage</p>
                   </div>
                 </div>
                 
                 <div className="bg-black/30 rounded-lg p-4 font-mono text-sm flex items-start gap-3 mb-4 overflow-x-auto">
                   <span className="text-purple-400 shrink-0">$</span> 
                   <span className="break-all">curl -X GET https://api.auxilium.ai/v1/events/evt_test_sample_12345 \<br/> -H "Authorization: Bearer aux_live_8f92k..."</span>
                 </div>

                 <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg text-sm hover:bg-slate-100 transition-colors">
                   Zur Dokumentation
                 </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'team' || activeTab === 'settings') && (
            <div className="flex items-center justify-center h-full text-slate-400">
               <div className="text-center">
                 <Settings size={64} className="mx-auto mb-4 opacity-20" />
                 <p>Dieser Bereich ist in der Demo deaktiviert.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Details / Create Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 className="font-bold text-slate-800 text-lg">
                 {isCreating ? 'Neuer Termin' : selectedEvent?.title}
               </h3>
               <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors">
                 <X size={20} />
               </button>
            </div>
            
            <div className="p-6 space-y-5">
               {isCreating ? (
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titel / Patient</label>
                      <input 
                        type="text" 
                        autoFocus
                        className="w-full border-b-2 border-slate-200 pb-2 text-lg font-bold text-slate-900 focus:border-primary outline-none bg-transparent"
                        placeholder="Termintitel hinzufügen"
                        defaultValue={selectedEvent?.title === '(Neuer Termin)' ? '' : selectedEvent?.title} 
                        onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start</label>
                          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg">
                             <Clock size={16} /> {selectedEvent?.time}:00 Uhr
                          </div>
                       </div>
                       <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dauer</label>
                          <select className="w-full bg-slate-50 p-2 rounded-lg text-slate-700 outline-none">
                             <option>30 Min</option>
                             <option selected>60 Min</option>
                             <option>90 Min</option>
                          </select>
                       </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notizen</label>
                      <textarea className="w-full bg-slate-50 p-3 rounded-xl text-sm border-transparent focus:bg-white focus:border-primary/20 border transition-all resize-none h-20 outline-none" placeholder="Details hinzufügen..."></textarea>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                         {selectedEvent?.source === 'google' ? <CalendarIcon size={20} /> : <AlignLeft size={20} />}
                       </div>
                       <div>
                         <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{selectedEvent?.title}</h4>
                         <p className="text-sm text-slate-500">{selectedEvent?.time}:00 - {selectedEvent?.time + selectedEvent?.duration}:00 Uhr</p>
                       </div>
                    </div>
                    
                    {selectedEvent?.desc && (
                      <div className="bg-slate-50 p-3 rounded-xl text-sm text-slate-600 border border-slate-100 leading-relaxed">
                        {selectedEvent.desc}
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-sm text-slate-500 pt-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <span>{doctors.find(d => d.id === selectedEvent?.docId)?.name}</span>
                       <span className="text-slate-300">|</span>
                       <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedEvent?.type === 'Notfall' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                         {selectedEvent?.type}
                       </span>
                    </div>

                    {selectedEvent?.source === 'google' && (
                       <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                          <RefreshCw size={12} /> Synchronisiert mit Google Kalender
                       </div>
                    )}
                 </div>
               )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
               {isCreating ? (
                 <>
                   <button onClick={() => setShowEventModal(false)} className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium">Abbrechen</button>
                   <button onClick={saveNewEvent} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-sm transition-colors">Speichern</button>
                 </>
               ) : (
                 <>
                   <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><MoreHorizontal size={20} /></button>
                   <div className="flex-1"></div>
                   <button onClick={() => setShowEventModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">Bearbeiten</button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
