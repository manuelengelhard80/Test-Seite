import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Building2,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';
import { Doctor, ServiceType } from '../types/calendar';

export interface BookingWidgetConfig {
  practiceName: string;
  practiceSubtitle: string;
  primaryColor: string; // e.g. #0D9488
  borderRadius: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl';
  showDoctorSelection: boolean;
  showInsuranceSelection: boolean;
  showPhoneRequired: boolean;
  allowComments: boolean;
  themeMode: 'light' | 'dark' | 'clean';
  preselectedDoctorId?: string;
  confirmationMessage: string;
}

export const DEFAULT_WIDGET_CONFIG: BookingWidgetConfig = {
  practiceName: 'Gemeinschaftspraxis am Marktplatz',
  practiceSubtitle: 'Online-Terminbuchung für Neu- und Bestandspatienten',
  primaryColor: '#0D9488',
  borderRadius: 'rounded-2xl',
  showDoctorSelection: true,
  showInsuranceSelection: true,
  showPhoneRequired: true,
  allowComments: true,
  themeMode: 'light',
  confirmationMessage: 'Ihr Termin wurde verbindlich reserviert. Sie erhalten in Kürze eine Bestätigung per SMS und E-Mail.',
};

export interface BookingWidgetProps {
  config?: Partial<BookingWidgetConfig>;
  doctors?: Doctor[];
  serviceTypes?: ServiceType[];
  onBookingComplete?: (bookingData: any) => void;
  isStandalone?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  config: userConfig,
  doctors: propDoctors,
  serviceTypes: propServiceTypes,
  onBookingComplete,
  isStandalone = false,
}) => {
  const config = { ...DEFAULT_WIDGET_CONFIG, ...userConfig };

  const defaultDoctors: Doctor[] = propDoctors || [
    { id: 'dr-mueller', name: 'Dr. Müller', specialty: 'Allgemeinmedizin', hex: '#0D9488', colorId: 'teal', color: '', border: '' },
    { id: 'dr-schmidt', name: 'Dr. Schmidt', specialty: 'Innere Medizin', hex: '#0284C7', colorId: 'blue', color: '', border: '' },
    { id: 'dr-weber', name: 'Dr. Weber', specialty: 'Hausärztliche Versorgung', hex: '#4F46E5', colorId: 'indigo', color: '', border: '' },
  ];

  const defaultServices: ServiceType[] = propServiceTypes || [
    { id: 'st_akut', name: 'Akutsprechstunde / Schmerzen', durationMinutes: 15 },
    { id: 'st_checkup', name: 'Gesundheits-Check-Up', durationMinutes: 30 },
    { id: 'st_blut', name: 'Labor & Blutabnahme', durationMinutes: 15 },
    { id: 'st_erst', name: 'Erstgespräch / Neupatient', durationMinutes: 45 },
    { id: 'st_sono', name: 'Ultraschall-Untersuchung', durationMinutes: 30 },
  ];

  // Booking Flow Steps: 1: Doctor & Treatment, 2: Date & Slot, 3: Patient Info, 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    config.preselectedDoctorId || defaultDoctors[0]?.id || 'dr-mueller'
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultServices[0]?.id || 'st_akut');
  const [insuranceType, setInsuranceType] = useState<'kasse' | 'privat'>('kasse');
  const [isExistingPatient, setIsExistingPatient] = useState<boolean>(true);

  // Selected Date and Slot
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    // Default to tomorrow or next business day
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30');

  // Patient Info
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [acceptedDsgvo, setAcceptedDsgvo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available Time Slots Mock Generator based on chosen date & doctor
  const availableSlots = [
    { time: '08:30', available: true },
    { time: '09:00', available: false },
    { time: '09:30', available: true },
    { time: '10:00', available: true },
    { time: '10:30', available: false },
    { time: '11:15', available: true },
    { time: '11:45', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: false },
    { time: '15:15', available: true },
    { time: '16:00', available: true },
  ];

  // Helper date navigation
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    // skip sunday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
  });

  const selectedDoctor = defaultDoctors.find(d => d.id === selectedDoctorId) || defaultDoctors[0];
  const selectedService = defaultServices.find(s => s.id === selectedServiceId) || defaultServices[0];

  const handleNextStep1 = () => {
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedTimeSlot) {
      setErrorMessage('Bitte wählen Sie ein Zeitfenster aus.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientFirstName || !patientLastName) {
      setErrorMessage('Bitte geben Sie Ihren vollständigen Namen an.');
      return;
    }
    if (config.showPhoneRequired && !patientPhone) {
      setErrorMessage('Bitte geben Sie eine Telefonnummer für Rückfragen an.');
      return;
    }
    if (!patientEmail) {
      setErrorMessage('Bitte geben Sie Ihre E-Mail-Adresse für die Terminbestätigung an.');
      return;
    }
    if (!acceptedDsgvo) {
      setErrorMessage('Bitte akzeptieren Sie die Datenschutzbestimmungen.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      if (onBookingComplete) {
        onBookingComplete({
          patientName: `${patientLastName}, ${patientFirstName}`,
          patientPhone,
          patientEmail,
          doctorName: selectedDoctor?.name,
          doctorId: selectedDoctorId,
          serviceName: selectedService?.name,
          duration: selectedService?.durationMinutes || 30,
          date: selectedDate,
          time: selectedTimeSlot,
          insuranceType,
          notes: patientNotes
        });
      }
    }, 600);
  };

  const resetBooking = () => {
    setStep(1);
    setPatientFirstName('');
    setPatientLastName('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientNotes('');
    setAcceptedDsgvo(false);
    setSelectedTimeSlot('09:30');
  };

  const primaryHex = config.primaryColor || '#0D9488';

  return (
    <div 
      className={`w-full max-w-xl mx-auto bg-white border border-slate-200/90 shadow-lg ${config.borderRadius} overflow-hidden font-sans transition-all`}
      style={{
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Widget Header */}
      <div 
        className="p-5 sm:p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: primaryHex }}
      >
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold tracking-wide uppercase mb-2 text-white">
              <Sparkles size={12} /> Online-Terminvergabe
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {config.practiceName}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 mt-1 font-medium">
              {config.practiceSubtitle}
            </p>
          </div>
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs items-center justify-center text-white shrink-0">
            <CalendarIcon size={20} />
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1.5 mt-5 pt-3 border-t border-white/20 text-xs font-semibold">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            step === 1 ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-white/80'
          }`}>
            <span className="w-4 h-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center">1</span>
            <span>Behandlung</span>
          </div>
          <ChevronRight size={14} className="text-white/40" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            step === 2 ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-white/80'
          }`}>
            <span className="w-4 h-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center">2</span>
            <span>Termin</span>
          </div>
          <ChevronRight size={14} className="text-white/40" />
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
            step === 3 ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-white/80'
          }`}>
            <span className="w-4 h-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center">3</span>
            <span>Patient</span>
          </div>
        </div>
      </div>

      {/* Step Contents */}
      <div className="p-5 sm:p-7">
        
        {/* STEP 1: SERVICE & DOCTOR SELECTION */}
        {step === 1 && (
          <div className="space-y-5">
            
            {/* Insurance Option */}
            {config.showInsuranceSelection && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Versicherungsstatus
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInsuranceType('kasse')}
                    className={`py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      insuranceType === 'kasse'
                        ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <span>Gesetzlich (GKV)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInsuranceType('privat')}
                    className={`py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      insuranceType === 'privat'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <span>Privat / Selbstzahler</span>
                  </button>
                </div>
              </div>
            )}

            {/* Treatment Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Behandlungsgrund</span>
                <span className="text-[11px] text-slate-400 font-normal">Bitte wählen</span>
              </label>
              <div className="space-y-2">
                {defaultServices.map(service => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#0D9488] bg-teal-50/60 shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-slate-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{service.name}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        ca. {service.durationMinutes} Min
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doctor Selection */}
            {config.showDoctorSelection && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Behandelnder Arzt / Ärztin
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {defaultDoctors.map(doc => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#0D9488] bg-teal-50/60 shadow-xs' 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: doc.hex || '#0D9488' }}
                          />
                          <span className="font-bold text-xs sm:text-sm text-slate-900 block truncate">{doc.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{doc.specialty}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Patient Status Check */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Waren Sie bereits in unserer Praxis?</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsExistingPatient(true)}
                  className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                    isExistingPatient ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Ja, Bestandspatient
                </button>
                <button
                  type="button"
                  onClick={() => setIsExistingPatient(false)}
                  className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                    !isExistingPatient ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Nein, Neupatient
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextStep1}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              style={{ backgroundColor: primaryHex }}
            >
              <span>Weiter zur Terminauswahl</span>
              <ChevronRight size={16} />
            </button>

          </div>
        )}

        {/* STEP 2: DATE & TIME SLOT SELECTION */}
        {step === 2 && (
          <div className="space-y-5">
            
            {/* Quick Date Selector Horizontal Bar */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Datum auswählen
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {nextDays.slice(0, 6).map((date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  const dayName = date.toLocaleDateString('de-DE', { weekday: 'short' });
                  const dayNum = date.getDate();
                  const monthName = date.toLocaleDateString('de-DE', { month: 'short' });

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#0D9488] bg-teal-50/80 text-[#0D9488] shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold uppercase">{dayName}</span>
                      <span className="block text-base font-extrabold my-0.5">{dayNum}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">{monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Verfügbare Uhrzeiten am {new Date(selectedDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
                </label>
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock size={11} /> {selectedService?.durationMinutes} Min. Dauer
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {availableSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.time;
                  if (!slot.available) {
                    return (
                      <div 
                        key={slot.time}
                        className="py-2.5 px-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 text-xs font-semibold text-center line-through cursor-not-allowed select-none"
                      >
                        {slot.time}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#0D9488] bg-[#0D9488] text-white shadow-xs' 
                          : 'border-slate-200 hover:border-teal-500 text-slate-800 bg-white hover:bg-teal-50/40'
                      }`}
                    >
                      {slot.time} Uhr
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Summary Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{selectedService?.name}</span>
                <span className="text-slate-500 mt-0.5 block">
                  bei <strong className="text-slate-700">{selectedDoctor?.name}</strong> • {new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })} um {selectedTimeSlot} Uhr
                </span>
              </div>
              <span 
                className="w-3 h-3 rounded-full shrink-0" 
                style={{ backgroundColor: selectedDoctor?.hex || primaryHex }}
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Zurück</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep2}
                className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: primaryHex }}
              >
                <span>Weiter zu Ihren Angaben</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: PATIENT INFORMATION */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Vorname *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Anna"
                  value={patientFirstName}
                  onChange={(e) => setPatientFirstName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nachname *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Becker"
                  value={patientLastName}
                  onChange={(e) => setPatientLastName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Mobilfunknummer {config.showPhoneRequired ? '*' : '(optional)'}
                </label>
                <input
                  type="tel"
                  required={config.showPhoneRequired}
                  placeholder="0170 12345678"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">Für SMS-Terminerinnerung & Code</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">E-Mail-Adresse *</label>
                <input
                  type="email"
                  required
                  placeholder="ihre.mail@beispiel.de"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">Für Terminbestätigung & Kalendereintrag</span>
              </div>
            </div>

            {config.allowComments && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Hinweis / Anmerkung für die Praxis (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="z.B. Seit 3 Tagen Halsschmerzen oder Bitte um Rückruf..."
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0D9488] focus:bg-white transition-colors resize-none"
                />
              </div>
            )}

            {/* DSGVO Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  required
                  checked={acceptedDsgvo}
                  onChange={(e) => setAcceptedDsgvo(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] shrink-0 cursor-pointer"
                />
                <span>
                  Ich stimme der Verarbeitung meiner Daten zur Terminvereinbarung gemäß der{' '}
                  <strong className="text-slate-800 underline">Datenschutzerklärung</strong> zu.
                </span>
              </label>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Zurück</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                style={{ backgroundColor: primaryHex }}
              >
                {isSubmitting ? (
                  <span>Termin wird reserviert...</span>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Termin verbindlich buchen</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* STEP 4: SUCCESS / CONFIRMATION */}
        {step === 4 && (
          <div className="text-center py-4 space-y-5">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-white shadow-md animate-in zoom-in-95 duration-200"
              style={{ backgroundColor: primaryHex }}
            >
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Termin erfolgreich vereinbart!</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                {config.confirmationMessage}
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-semibold">Patient:</span>
                <span className="font-bold text-slate-800">{patientFirstName} {patientLastName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-semibold">Behandlung:</span>
                <span className="font-bold text-slate-800">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-semibold">Arzt:</span>
                <span className="font-bold text-slate-800">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Zeitpunkt:</span>
                <span className="font-bold text-teal-800">
                  {new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} um {selectedTimeSlot} Uhr
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={resetBooking}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Weiteren Termin vereinbaren
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Widget Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-[#0D9488]" />
          <span>256-Bit SSL Verschlüsselt • DSGVO-Konform</span>
        </div>
        <span className="font-semibold text-slate-500">Auxilium Assist</span>
      </div>

    </div>
  );
};
