import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Phone, 
  Plus, 
  Search, 
  Filter, 
  DoorClosed, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  X,
  AlertTriangle,
  Lock,
  Layers
} from 'lucide-react';
import { Doctor, ServiceType, Resource, CalendarEvent, DOCTOR_COLOR_PALETTE } from '../types/calendar';

export interface ResponsiveCalendarProps {
  doctors: Doctor[];
  resources: Resource[];
  serviceTypes: ServiceType[];
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (eventId: string) => void;
  primaryColor?: string;
}

export const ResponsiveCalendar: React.FC<ResponsiveCalendarProps> = ({
  doctors,
  resources,
  serviceTypes,
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  primaryColor = '#0D9488',
}) => {
  // Current view date
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'list'>('day');

  // Filter state
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string>('all');
  const [selectedResourceFilter, setSelectedResourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mobile Bottom Sheet state for Event Details or New Event
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  // New/Edit Event Form State
  const [formPatientName, setFormPatientName] = useState('');
  const [formPatientPhone, setFormPatientPhone] = useState('');
  const [formPatientType, setFormPatientType] = useState<'kasse' | 'privat'>('kasse');
  const [formDocId, setFormDocId] = useState(doctors[0]?.id || 'doc-1');
  const [formServiceId, setFormServiceId] = useState(serviceTypes[0]?.id || 'st-akut');
  const [formResourceId, setFormResourceId] = useState<string>('');
  const [formTime, setFormTime] = useState<number>(9.0);
  const [formDate, setFormDate] = useState(selectedDate);
  const [formDuration, setFormDuration] = useState<number>(0.5);
  const [formDesc, setFormDesc] = useState('');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Time hours scale: 08:00 to 18:00 (half-hour increments)
  const timeSlots = [
    8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5,
    13.0, 13.5, 14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0, 17.5
  ];

  const formatHourString = (hourFloat: number) => {
    const h = Math.floor(hourFloat);
    const m = Math.round((hourFloat - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // Check for Resource Conflict (Ressourcen-Sperre check)
  const checkResourceConflict = (date: string, time: number, duration: number, resId?: string, excludeEventId?: string) => {
    if (!resId) return null;
    const endTime = time + duration;

    const conflicting = events.find((evt) => {
      if (excludeEventId && evt.id === excludeEventId) return false;
      if (evt.date !== date) return false;
      if (evt.resourceId !== resId) return false;
      const evtEnd = evt.time + evt.duration;
      return (time < evtEnd && endTime > evt.time);
    });

    if (conflicting) {
      const resName = resources.find((r) => r.id === resId)?.name || 'Ressource';
      const docName = doctors.find((d) => d.id === conflicting.docId)?.name || 'Kollege';
      return `Achtung: ${resName} ist zu dieser Zeit bereits durch ${conflicting.patientName} (${docName}) belegt!`;
    }
    return null;
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (selectedDoctorFilter !== 'all' && evt.docId !== selectedDoctorFilter) return false;
      if (selectedResourceFilter !== 'all' && evt.resourceId !== selectedResourceFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = evt.patientName.toLowerCase().includes(q);
        const matchPhone = evt.patientPhone.toLowerCase().includes(q);
        const matchType = evt.type.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchType) return false;
      }
      return true;
    });
  }, [events, selectedDoctorFilter, selectedResourceFilter, searchQuery]);

  const openCreateModal = (presetTime?: number, presetDocId?: string) => {
    setModalMode('create');
    setFormPatientName('');
    setFormPatientPhone('');
    setFormPatientType('kasse');
    setFormDocId(presetDocId || (selectedDoctorFilter !== 'all' ? selectedDoctorFilter : doctors[0]?.id || ''));
    setFormServiceId(serviceTypes[0]?.id || '');
    const defSvc = serviceTypes[0];
    setFormResourceId(defSvc?.requiredResourceId || '');
    setFormDuration((defSvc?.durationMinutes || 30) / 60);
    setFormTime(presetTime !== undefined ? presetTime : 9.0);
    setFormDate(selectedDate);
    setFormDesc('');
    setConflictWarning(null);
    setShowEventModal(true);
  };

  const openEditModal = (evt: CalendarEvent) => {
    setModalMode('edit');
    setActiveEvent(evt);
    setFormPatientName(evt.patientName);
    setFormPatientPhone(evt.patientPhone);
    setFormPatientType(evt.patientType);
    setFormDocId(evt.docId);
    setFormServiceId(evt.serviceTypeId || serviceTypes[0]?.id || '');
    setFormResourceId(evt.resourceId || '');
    setFormDuration(evt.duration);
    setFormTime(evt.time);
    setFormDate(evt.date);
    setFormDesc(evt.desc || '');
    setConflictWarning(null);
    setShowEventModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPatientName.trim()) return;

    // Check resource conflict
    const conflict = checkResourceConflict(
      formDate,
      formTime,
      formDuration,
      formResourceId,
      modalMode === 'edit' && activeEvent ? activeEvent.id : undefined
    );

    if (conflict) {
      setConflictWarning(conflict);
      return;
    }

    const svc = serviceTypes.find((s) => s.id === formServiceId);
    const serviceName = svc?.name || 'Termin';

    if (modalMode === 'create') {
      const newEvt: CalendarEvent = {
        id: `evt_${Date.now()}`,
        title: `${formPatientName} (${serviceName})`,
        patientName: formPatientName.trim(),
        patientPhone: formPatientPhone.trim(),
        patientType: formPatientType,
        docId: formDocId,
        serviceTypeId: formServiceId,
        resourceId: formResourceId || undefined,
        date: formDate,
        time: formTime,
        duration: formDuration,
        type: serviceName,
        source: 'internal',
        desc: formDesc,
      };
      onAddEvent(newEvt);
    } else if (modalMode === 'edit' && activeEvent) {
      const updatedEvt: CalendarEvent = {
        ...activeEvent,
        patientName: formPatientName.trim(),
        patientPhone: formPatientPhone.trim(),
        patientType: formPatientType,
        docId: formDocId,
        serviceTypeId: formServiceId,
        resourceId: formResourceId || undefined,
        date: formDate,
        time: formTime,
        duration: formDuration,
        type: serviceName,
        desc: formDesc,
      };
      onUpdateEvent(updatedEvt);
    }

    setShowEventModal(false);
  };

  // Date Navigation Helpers
  const shiftDate = (days: number) => {
    const curr = new Date(selectedDate);
    curr.setDate(curr.getDate() + days);
    setSelectedDate(curr.toISOString().split('T')[0]);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden font-sans">
      
      {/* 1. TOP TOOLBAR / FILTER CHIPS */}
      <div className="p-3 sm:p-4 border-b border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        
        {/* Left: Date Picker & View Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => shiftDate(-1)}
              className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
              title="Vorheriger Tag"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 text-xs sm:text-sm font-bold text-slate-800 min-w-[120px] text-center">
              {new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={() => shiftDate(1)}
              className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
              title="Nächster Tag"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Heute
          </button>

          {/* View Mode Chips */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(['day', 'list'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === mode ? 'bg-white text-[#0D9488] font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode === 'day' ? 'Tagesansicht' : 'Listenansicht'}
              </button>
            ))}
          </div>

        </div>

        {/* Right: Search & Action Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Patient, Telefon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => openCreateModal()}
            className="px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus size={16} />
            <span>Neuer Termin</span>
          </button>
        </div>

      </div>

      {/* 2. FILTER CHIPS BAR (Thumb-friendly on mobile) */}
      <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
        
        {/* Doctor Filters */}
        <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Behandler:</span>
        <button
          type="button"
          onClick={() => setSelectedDoctorFilter('all')}
          className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            selectedDoctorFilter === 'all'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Alle ({doctors.length})
        </button>

        {doctors.map((doc) => {
          const isSelected = selectedDoctorFilter === doc.id;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => setSelectedDoctorFilter(doc.id)}
              className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-white border-2 text-slate-900 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              style={{ borderColor: isSelected ? doc.hex : undefined }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: doc.hex }} />
              <span>{doc.name}</span>
            </button>
          );
        })}

        {/* Resource / Room Filters */}
        {resources.length > 0 && (
          <>
            <div className="w-[1px] h-4 bg-slate-300 mx-1 shrink-0" />
            <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Ressource:</span>
            <select
              value={selectedResourceFilter}
              onChange={(e) => setSelectedResourceFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none cursor-pointer shrink-0"
            >
              <option value="all">Alle Räume & Geräte</option>
              {resources.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </>
        )}

      </div>

      {/* 3. MAIN CALENDAR GRID (DAY VIEW OR LIST VIEW) */}
      <div className="flex-1 overflow-y-auto">
        
        {viewMode === 'day' ? (
          /* MULTI-COLUMN OR SINGLE COLUMN DAY SCHEDULE */
          <div className="min-w-[600px] h-full flex flex-col">
            
            {/* Column Headers (Doctors) */}
            <div className="grid border-b border-slate-200 bg-slate-50 sticky top-0 z-20"
              style={{
                gridTemplateColumns: `80px repeat(${selectedDoctorFilter === 'all' ? doctors.length : 1}, minmax(180px, 1fr))`
              }}
            >
              <div className="p-3 text-[11px] font-bold text-slate-400 border-r border-slate-200 flex items-center justify-center">
                Zeit
              </div>
              {(selectedDoctorFilter === 'all' ? doctors : doctors.filter(d => d.id === selectedDoctorFilter)).map((doc) => (
                <div key={doc.id} className="p-3 border-r border-slate-200 text-center font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: doc.hex }} />
                  <span>{doc.name}</span>
                  <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">({doc.specialty})</span>
                </div>
              ))}
            </div>

            {/* Time Slots Grid */}
            <div className="flex-1 divide-y divide-slate-100">
              {timeSlots.map((slotHour) => {
                const activeDocs = selectedDoctorFilter === 'all' ? doctors : doctors.filter(d => d.id === selectedDoctorFilter);

                return (
                  <div
                    key={slotHour}
                    className="grid min-h-[54px] hover:bg-slate-50/50 transition-colors"
                    style={{
                      gridTemplateColumns: `80px repeat(${activeDocs.length}, minmax(180px, 1fr))`
                    }}
                  >
                    {/* Time Label */}
                    <div className="p-2 border-r border-slate-200 text-[11px] font-bold text-slate-400 text-center flex items-center justify-center select-none">
                      {formatHourString(slotHour)}
                    </div>

                    {/* Doctor Slot Cells */}
                    {activeDocs.map((doc) => {
                      // Find events for this doctor at this slot
                      const slotEvents = filteredEvents.filter(
                        (e) => e.docId === doc.id && e.date === selectedDate && e.time === slotHour
                      );

                      return (
                        <div
                          key={doc.id}
                          onClick={() => {
                            if (slotEvents.length === 0) openCreateModal(slotHour, doc.id);
                          }}
                          className="border-r border-slate-200 p-1 relative cursor-pointer group"
                        >
                          {slotEvents.map((evt) => {
                            const resObj = resources.find((r) => r.id === evt.resourceId);

                            return (
                              <motion.div
                                key={evt.id}
                                layoutId={evt.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(evt);
                                }}
                                className="w-full p-2 rounded-xl text-left shadow-xs hover:shadow-md transition-all border text-xs relative overflow-hidden"
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  borderColor: doc.hex,
                                  borderLeftWidth: '4px',
                                }}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <span className="font-bold text-slate-900 truncate block">
                                    {evt.patientName}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ${
                                      evt.patientType === 'privat' ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'
                                    }`}
                                  >
                                    {evt.patientType === 'privat' ? 'PKV' : 'GKV'}
                                  </span>
                                </div>

                                <div className="text-[11px] text-slate-600 flex items-center justify-between mt-1">
                                  <span className="truncate">{evt.type}</span>
                                  <span className="text-slate-400 text-[10px] font-medium shrink-0">
                                    {Math.round(evt.duration * 60)}m
                                  </span>
                                </div>

                                {/* Resource Badge if locked */}
                                {resObj && (
                                  <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                    <Lock size={9} className="text-[#0D9488]" />
                                    <span className="truncate">{resObj.name}</span>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}

                          {slotEvents.length === 0 && (
                            <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-slate-300 transition-opacity">
                              <Plus size={14} />
                            </div>
                          )}
                        </div>
                      );
                    })}

                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          /* LIST VIEW */
          <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Termine am {new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} ({filteredEvents.filter(e => e.date === selectedDate).length})
            </h3>

            {filteredEvents.filter(e => e.date === selectedDate).length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                Keine Termine für die gewählten Filter an diesem Tag eingetragen.
              </div>
            ) : (
              filteredEvents
                .filter(e => e.date === selectedDate)
                .sort((a, b) => a.time - b.time)
                .map((evt) => {
                  const doc = doctors.find((d) => d.id === evt.docId);
                  const resObj = resources.find((r) => r.id === evt.resourceId);

                  return (
                    <div
                      key={evt.id}
                      onClick={() => openEditModal(evt)}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-center px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 shrink-0">
                          <span className="block text-xs font-bold">{formatHourString(evt.time)}</span>
                          <span className="block text-[10px] text-slate-400">{Math.round(evt.duration * 60)} Min</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{evt.patientName}</span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                                evt.patientType === 'privat' ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'
                              }`}
                            >
                              {evt.patientType === 'privat' ? 'PKV' : 'GKV'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                            <span>{evt.type}</span>
                            {evt.patientPhone && (
                              <span className="flex items-center gap-1 text-slate-400">
                                <Phone size={11} /> {evt.patientPhone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {resObj && (
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg flex items-center gap-1">
                            <Lock size={10} className="text-[#0D9488]" />
                            <span>{resObj.name}</span>
                          </span>
                        )}
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1.5 border"
                          style={{ borderColor: doc?.hex || '#CBD5E1' }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: doc?.hex }} />
                          <span>{doc?.name}</span>
                        </span>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        )}

      </div>

      {/* 4. MODAL / BOTTOM-SHEET FOR APPOINTMENT DETAILS & EDITING */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs font-sans">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <CalendarIcon size={18} className="text-[#0D9488]" />
                  <span>{modalMode === 'create' ? 'Neuen Termin eintragen' : 'Termindetails bearbeiten'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveModal} className="p-5 overflow-y-auto space-y-4 flex-1">
                
                {conflictWarning && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
                    <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{conflictWarning}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Patientenname *</label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. Schmidt, Anna"
                      value={formPatientName}
                      onChange={(e) => setFormPatientName(e.target.value)}
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Telefonnummer</label>
                    <input
                      type="tel"
                      placeholder="0170 1234567"
                      value={formPatientPhone}
                      onChange={(e) => setFormPatientPhone(e.target.value)}
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Behandelnder Arzt</label>
                    <select
                      value={formDocId}
                      onChange={(e) => setFormDocId(e.target.value)}
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
                    >
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.specialty})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Versicherungsstatus</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setFormPatientType('kasse')}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          formPatientType === 'kasse' ? 'bg-teal-50 border-teal-600 text-teal-900' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        GKV
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormPatientType('privat')}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          formPatientType === 'privat' ? 'bg-amber-50 border-amber-600 text-amber-900' : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        PKV
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Leistung / Grund</label>
                    <select
                      value={formServiceId}
                      onChange={(e) => {
                        const sId = e.target.value;
                        setFormServiceId(sId);
                        const match = serviceTypes.find((s) => s.id === sId);
                        if (match) {
                          setFormDuration((match.durationMinutes || 30) / 60);
                          if (match.requiredResourceId) setFormResourceId(match.requiredResourceId);
                        }
                      }}
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none"
                    >
                      {serviceTypes.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.durationMinutes} Min)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Ressource / Raum-Sperre</label>
                    <select
                      value={formResourceId}
                      onChange={(e) => setFormResourceId(e.target.value)}
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                    >
                      <option value="">(Keine Raum-Sperre)</option>
                      {resources.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} ({r.type === 'room' ? 'Raum' : 'Gerät'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Datum</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Uhrzeit</label>
                    <select
                      value={formTime}
                      onChange={(e) => setFormTime(parseFloat(e.target.value))}
                      className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none"
                    >
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {formatHourString(t)} Uhr
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Dauer</label>
                    <select
                      value={formDuration}
                      onChange={(e) => setFormDuration(parseFloat(e.target.value))}
                      className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                    >
                      <option value={0.25}>15 Min</option>
                      <option value={0.5}>30 Min</option>
                      <option value={0.75}>45 Min</option>
                      <option value={1.0}>60 Min</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {modalMode === 'edit' && activeEvent ? (
                    <button
                      type="button"
                      onClick={() => {
                        onDeleteEvent(activeEvent.id);
                        setShowEventModal(false);
                      }}
                      className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Termin absagen
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                    >
                      {modalMode === 'create' ? 'Termin eintragen' : 'Änderungen speichern'}
                    </button>
                  </div>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
