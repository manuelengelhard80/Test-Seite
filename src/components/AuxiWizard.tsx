import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  DoorClosed, 
  Stethoscope, 
  Palette, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Building2,
  PhoneCall,
  Bot,
  HelpCircle,
  Clock,
  Layers,
  X
} from 'lucide-react';
import { AuxiAvatar, AuxiSpeechBubble } from './AuxiAvatar';
import { Doctor, ServiceType, Resource, DOCTOR_COLOR_PALETTE } from '../types/calendar';

export interface OnboardingData {
  doctors: Doctor[];
  resources: Resource[];
  serviceTypes: ServiceType[];
  practiceName: string;
  primaryColor: string;
  practiceSubtitle: string;
}

export interface AuxiWizardProps {
  onComplete: (data: OnboardingData) => void;
  onCancel?: () => void;
  initialDoctors?: Doctor[];
  initialResources?: Resource[];
  initialServices?: ServiceType[];
}

export const AuxiWizard: React.FC<AuxiWizardProps> = ({
  onComplete,
  onCancel,
  initialDoctors,
  initialResources,
  initialServices,
}) => {
  // Wizard Milestone Step: 0: Welcome, 1: Team, 2: Resources/Rooms, 3: Services & Resource Locking, 4: Branding, 5: Finish
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  // STEP 1: DOCTORS STATE
  const [doctors, setDoctors] = useState<Doctor[]>(
    initialDoctors || [
      { id: 'doc-1', name: 'Dr. med. Julia Weber', specialty: 'Allgemeinmedizin', colorId: 'teal', color: '', border: '', hex: '#0D9488' },
      { id: 'doc-2', name: 'Dr. med. Thomas Becker', specialty: 'Innere Medizin', colorId: 'blue', color: '', border: '', hex: '#0284C7' },
    ]
  );
  const [newDocName, setNewDocName] = useState('');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Allgemeinmedizin');
  const [newDocColorHex, setNewDocColorHex] = useState('#4F46E5');

  // STEP 2: RESOURCES / ROOMS STATE
  const [resources, setResources] = useState<Resource[]>(
    initialResources || [
      { id: 'res-room-1', name: 'Behandlungszimmer 1', type: 'room' },
      { id: 'res-room-2', name: 'Behandlungszimmer 2', type: 'room' },
      { id: 'res-sono', name: 'Ultraschall / Sonographie', type: 'device' },
      { id: 'res-labor', name: 'Labor & Blutentnahmeplatz', type: 'room' },
    ]
  );
  const [newResName, setNewResName] = useState('');
  const [newResType, setNewResType] = useState<'room' | 'device'>('room');

  // STEP 3: SERVICES & RESOURCE LOCKING STATE
  const [services, setServices] = useState<ServiceType[]>(
    initialServices || [
      { id: 'st-blut', name: 'Blutabnahme / Labor', durationMinutes: 10, requiredResourceId: 'res-labor' },
      { id: 'st-checkup', name: 'Gesundheits-Check-Up', durationMinutes: 20, requiredResourceId: 'res-room-1' },
      { id: 'st-akut', name: 'Akutsprechstunde', durationMinutes: 15, requiredResourceId: 'res-room-2' },
      { id: 'st-sono', name: 'Ultraschall-Untersuchung', durationMinutes: 25, requiredResourceId: 'res-sono' },
    ]
  );
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState<number>(15);
  const [newServiceResourceId, setNewServiceResourceId] = useState<string>('res-room-1');

  // STEP 4: BRANDING
  const [practiceName, setPracticeName] = useState('Gemeinschaftspraxis am Schlossgarten');
  const [practiceSubtitle, setPracticeSubtitle] = useState('Ihr vertrauensvolles Praxisteam für ganzheitliche Medizin');
  const [primaryColor, setPrimaryColor] = useState('#0D9488');

  // STEP 5: SUCCESS & WIDGET LINK
  const [copiedLink, setCopiedLink] = useState(false);
  const [supportRequested, setSupportRequested] = useState(false);

  const practiceSlug = practiceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'praxis';
  const widgetUrl = `https://termin.auxilium-assist.de/${practiceSlug}`;

  // Quick Preset Adders
  const addDoctor = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newDocName.trim()) return;
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: newDocName.trim(),
      specialty: newDocSpecialty.trim(),
      colorId: 'custom',
      color: '',
      border: '',
      hex: newDocColorHex,
    };
    setDoctors([...doctors, newDoc]);
    setNewDocName('');
  };

  const removeDoctor = (id: string) => {
    if (doctors.length <= 1) return;
    setDoctors(doctors.filter(d => d.id !== id));
  };

  const addResource = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newResName.trim()) return;
    const newRes: Resource = {
      id: `res-${Date.now()}`,
      name: newResName.trim(),
      type: newResType,
    };
    setResources([...resources, newRes]);
    setNewResName('');
  };

  const removeResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const addService = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newServiceName.trim()) return;
    const newSvc: ServiceType = {
      id: `st-${Date.now()}`,
      name: newServiceName.trim(),
      durationMinutes: newServiceDuration,
      requiredResourceId: newServiceResourceId || undefined,
    };
    setServices([...services, newSvc]);
    setNewServiceName('');
  };

  const removeService = (id: string) => {
    if (services.length <= 1) return;
    setServices(services.filter(s => s.id !== id));
  };

  const handleFinish = () => {
    onComplete({
      doctors,
      resources,
      serviceTypes: services,
      practiceName,
      primaryColor,
      practiceSubtitle,
    });
  };

  const copyWidgetUrl = () => {
    navigator.clipboard.writeText(widgetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto font-sans">
      
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500" />

        {/* Wizard Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AuxiAvatar size="sm" isSpeaking={true} />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none flex items-center gap-2">
                <span>Auxi • 5-Minuten Einrichtung</span>
                <span className="text-[10px] bg-teal-100 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                  Auxilium Praxiskalender
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Geführtes Onboarding in der höflichen Sie-Form ohne Handbuch oder Einrichtungsstress
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Indicator */}
            {currentStep > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span>Schritt {currentStep} von 5</span>
                <div className="flex gap-1 ml-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentStep >= s ? 'bg-[#0D9488]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Top Right Close (X) Button */}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                title="Schließen"
                aria-label="Schließen"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Body Area */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">

          {/* ========================================================================= */}
          {/* MILESTONE 0: WELCOME SCREEN */}
          {/* ========================================================================= */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4 sm:py-8 max-w-xl mx-auto space-y-6"
            >
              <div className="relative inline-block">
                <AuxiAvatar size="xl" isSpeaking={true} />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Guten Tag! Ich bin Auxi. 💫
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Ich richte Ihren <strong className="text-slate-900">Auxilium Praxiskalender</strong> in unter 5 Minuten mit Ihnen ein. Ganz ohne Handbuch, komplizierte IT-Schulungen oder Stress. Wollen wir starten?
                </p>
              </div>

              {/* Bento Highlights of Praxiskalender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs space-y-1">
                  <span className="font-bold text-teal-950 block flex items-center gap-1.5">
                    <Users size={14} className="text-[#0D9488]" /> 1. Team
                  </span>
                  <span className="text-slate-600 text-[11px]">Ärzte & individuelle Sprechzeiten hinterlegen.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs space-y-1">
                  <span className="font-bold text-sky-950 block flex items-center gap-1.5">
                    <DoorClosed size={14} className="text-[#0284C7]" /> 2. Ressourcen
                  </span>
                  <span className="text-slate-600 text-[11px]">Räume & Geräte automatisch dopplungsfrei sperren.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1">
                  <span className="font-bold text-indigo-950 block flex items-center gap-1.5">
                    <Palette size={14} className="text-[#4F46E5]" /> 3. Ihr Design
                  </span>
                  <span className="text-slate-600 text-[11px]">Praxis-Website Buchungswidget mit 1 Klick bereit.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Jetzt Praxiskalender einrichten</span>
                  <ArrowRight size={16} />
                </button>
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-4 py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-2xl transition-colors cursor-pointer"
                  >
                    Überspringen & direkt zum Kalender
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 1: ÄRZTE & TEAM */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Auxi Speech Bubble */}
              <AuxiSpeechBubble
                stepIndicator="Schritt 1 / 5"
                message="Wer vergibt in Ihrer Praxis Sprechzeiten?"
                subtext="Legen Sie die behandelnden Ärztinnen und Ärzte an. Jeder Behandler erhält eine eigene Farbe im Praxiskalender für maximale Übersichtlichkeit."
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                
                {/* Form to add doctor (5 Cols) */}
                <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Plus size={14} className="text-[#0D9488]" />
                    <span>Behandler hinzufügen</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Name & Titel</label>
                    <input
                      type="text"
                      placeholder="z.B. Dr. med. Sarah Klein"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Fachrichtung</label>
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      {['Allgemeinmedizin', 'Innere Medizin', 'Kardiologie', 'Pädiatrie'].map((spec) => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => setNewDocSpecialty(spec)}
                          className={`p-1.5 rounded-lg text-[11px] font-semibold border text-left transition-all cursor-pointer truncate ${
                            newDocSpecialty === spec
                              ? 'border-[#0D9488] bg-teal-50 text-[#0D9488]'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Oder freie Eingabe..."
                      value={newDocSpecialty}
                      onChange={(e) => setNewDocSpecialty(e.target.value)}
                      className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Kalenderfarbe</label>
                    <div className="flex gap-1.5">
                      {DOCTOR_COLOR_PALETTE.slice(0, 6).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setNewDocColorHex(c.hex)}
                          className={`w-7 h-7 rounded-lg transition-all cursor-pointer ${
                            newDocColorHex === c.hex ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : ''
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addDoctor}
                    disabled={!newDocName.trim()}
                    className="w-full py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    + Arzt anlegen
                  </button>
                </div>

                {/* List of current doctors (7 Cols) */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Ihr Praxis-Team ({doctors.length})
                    </h3>
                    <span className="text-[11px] text-slate-400">Mindestens 1 Arzt erforderlich</span>
                  </div>

                  <div className="space-y-2.5">
                    {doctors.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: doc.hex }}
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 block">{doc.name}</span>
                            <span className="text-[11px] text-slate-500">{doc.specialty}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDoctor(doc.id)}
                          disabled={doctors.length <= 1}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-30 cursor-pointer"
                          title="Entfernen"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Zurück
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Weiter zu Räumen & Geräten</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: RÄUME & GERÄTE (RESSOURCEN-SPERRE) */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Auxi Speech Bubble */}
              <AuxiSpeechBubble
                stepIndicator="Schritt 2 / 5"
                message="Welche Räume oder Geräte müssen bei Terminbuchungen automatisch gesperrt werden?"
                subtext="Der Auxilium Praxiskalender verhindert automatisch Doppelbelegungen von Geräten (z.B. Sonographie) und Räumen (z.B. Labor)."
              />

              {/* Quick 1-Click Badges Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Schnellauswahl: Typische Praxis-Ressourcen
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { name: 'Behandlungszimmer 1', type: 'room' },
                    { name: 'Behandlungszimmer 2', type: 'room' },
                    { name: 'Behandlungszimmer 3', type: 'room' },
                    { name: 'Labor & Blutabnahme', type: 'room' },
                    { name: 'Ultraschall / Sono', type: 'device' },
                    { name: 'Ruhe- & Belastungs-EKG', type: 'device' },
                    { name: 'Lungenfunktion (LuFu)', type: 'device' },
                    { name: 'OP / Wundversorgung', type: 'room' },
                  ].map((preset) => {
                    const isAdded = resources.some((r) => r.name.toLowerCase() === preset.name.toLowerCase());
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          if (isAdded) {
                            setResources(resources.filter((r) => r.name.toLowerCase() !== preset.name.toLowerCase()));
                          } else {
                            setResources([
                              ...resources,
                              { id: `res-${Date.now()}-${Math.random()}`, name: preset.name, type: preset.type as any },
                            ]);
                          }
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isAdded
                            ? 'border-[#0D9488] bg-teal-50/80 text-[#0D9488] font-bold shadow-2xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="text-xs block">{preset.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {preset.type === 'room' ? 'Raum' : 'Gerät'}
                          </span>
                        </div>
                        {isAdded ? (
                          <CheckCircle2 size={16} className="text-[#0D9488] shrink-0" />
                        ) : (
                          <Plus size={14} className="text-slate-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Resource Form */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row gap-2.5 items-center">
                <input
                  type="text"
                  placeholder="Eigene Ressource (z.B. Lasertherapie-Raum)..."
                  value={newResName}
                  onChange={(e) => setNewResName(e.target.value)}
                  className="flex-1 w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0D9488]"
                />
                <select
                  value={newResType}
                  onChange={(e) => setNewResType(e.target.value as any)}
                  className="w-full sm:w-auto bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                >
                  <option value="room">Raum</option>
                  <option value="device">Gerät</option>
                </select>
                <button
                  type="button"
                  onClick={addResource}
                  disabled={!newResName.trim()}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  Hinzufügen
                </button>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Zurück
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Weiter zu Behandlungsgründen & Kopplung</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: BEHANDLUNGSGRÜNDE & SMARTE KOPPLUNG */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Auxi Speech Bubble */}
              <AuxiSpeechBubble
                stepIndicator="Schritt 3 / 5"
                message="Welche Termine buchen Ihre Patientinnen und Patienten am häufigsten?"
                subtext="Hier koppeln Sie Behandlungsdauer und automatisch benötigte Räume. So weiß der Praxiskalender, dass z.B. eine Blutabnahme das Labor sperren muss."
              />

              {/* Service List with Smart Resource Lock */}
              <div className="space-y-2.5">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                        <Stethoscope size={16} />
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 block">{svc.name}</span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <Clock size={11} /> {svc.durationMinutes} Min. Behandlungszeit
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Linked Resource Selector */}
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Sperrt:</span>
                        <select
                          value={svc.requiredResourceId || ''}
                          onChange={(e) => {
                            const resId = e.target.value;
                            setServices(
                              services.map((s) =>
                                s.id === svc.id ? { ...s, requiredResourceId: resId || undefined } : s
                              )
                            );
                          }}
                          className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer"
                        >
                          <option value="">(Keine Raum-Sperre)</option>
                          {resources.map((res) => (
                            <option key={res.id} value={res.id}>
                              {res.name} ({res.type === 'room' ? 'Raum' : 'Gerät'})
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeService(svc.id)}
                        disabled={services.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Entfernen"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Service Form */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="Neuer Behandlungsgrund (z.B. Impfung)..."
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <select
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(Number(e.target.value))}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none"
                  >
                    <option value={10}>10 Min.</option>
                    <option value={15}>15 Min.</option>
                    <option value={20}>20 Min.</option>
                    <option value={30}>30 Min.</option>
                    <option value={45}>45 Min.</option>
                    <option value={60}>60 Min.</option>
                  </select>
                </div>
                <div className="sm:col-span-4 flex gap-2">
                  <button
                    type="button"
                    onClick={addService}
                    disabled={!newServiceName.trim()}
                    className="w-full py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    + Leistung anlegen
                  </button>
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Zurück
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Weiter zum Praxis-Branding</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: PRAXIS-BRANDING */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Auxi Speech Bubble */}
              <AuxiSpeechBubble
                stepIndicator="Schritt 4 / 5"
                message="Geben wir Ihrem Praxiskalender nun Ihr individuelles Design."
                subtext="Passen Sie Praxisnamen, Akzentfarbe und Slogan an. So fühlen sich Ihre Patientinnen und Patienten sofort wie zuhause."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Form */}
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Praxisname</label>
                    <input
                      type="text"
                      value={practiceName}
                      onChange={(e) => setPracticeName(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Untertitel / Slogan</label>
                    <input
                      type="text"
                      value={practiceSubtitle}
                      onChange={(e) => setPracticeSubtitle(e.target.value)}
                      className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Haupt-Markenfarbe</label>
                    <div className="grid grid-cols-6 gap-2">
                      {DOCTOR_COLOR_PALETTE.slice(0, 6).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setPrimaryColor(c.hex)}
                          className={`h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            primaryColor === c.hex ? 'ring-2 ring-offset-2 ring-slate-800 scale-105 shadow-xs' : ''
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {primaryColor === c.hex && <Check size={14} className="text-white drop-shadow" strokeWidth={3} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Vorschau: Praxiskalender Kopfbereich
                  </span>
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{practiceName}</h4>
                        <p className="text-xs text-slate-500">{practiceSubtitle}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Online-Terminbuchung aktiv</span>
                      <span className="px-2 py-0.5 rounded-full text-white font-bold text-[10px]" style={{ backgroundColor: primaryColor }}>
                        Verifiziert
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft size={16} /> Zurück
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Einrichtung abschließen</span>
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: DER "FERTIG!"-MOMENT & WIDGET-LINK */}
          {/* ========================================================================= */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 max-w-xl mx-auto space-y-6"
            >
              <div className="relative inline-block">
                <AuxiAvatar size="xl" isCelebrating={true} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Hervorragend! 🎉
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Ihr <strong className="text-slate-900">Auxilium Praxiskalender</strong> ist jetzt vollständig einsatzbereit und synchronisiert.
                </p>
              </div>

              {/* Widget Link Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#0D9488]" />
                    <span>Ihr Buchungs-Widget für die Praxis-Homepage:</span>
                  </span>
                  <span className="text-[10px] bg-teal-100 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                    Sofort aktiv
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={widgetUrl}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 outline-none select-all"
                  />
                  <button
                    type="button"
                    onClick={copyWidgetUrl}
                    className="bg-[#0D9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedLink ? 'Kopiert!' : 'Link kopieren'}</span>
                  </button>
                </div>
              </div>

              {/* Main Call to Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <CheckCircle2 size={18} />
                  <span>Praxiskalender öffnen</span>
                </button>
              </div>

              {/* Dezentraler Support Safety-Net Button */}
              <div className="pt-3 border-t border-slate-100">
                {supportRequested ? (
                  <p className="text-xs text-teal-700 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} /> Unser Support-Team meldet sich gerne für den Datenimport bei Ihnen!
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSupportRequested(true)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Möchten Sie, dass unser Support weitere Daten für Sie importiert?
                  </button>
                )}
              </div>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
};
