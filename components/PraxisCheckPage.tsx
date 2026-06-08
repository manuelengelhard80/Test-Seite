import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowRight, ArrowLeft, Check, Sparkles, Lock, 
  ShieldCheck, Server, FileText, CheckCircle2, AlertCircle,
  Building, Mail, Phone, User, Star, Flame, Award, Heart, Shield, Landmark
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  type: 'select' | 'text';
  options?: string[];
  placeholder?: string;
  hint?: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    title: 'Wie viele Anrufe gehen in Ihrer Praxis schätzungsweise an einem normalen Vormittag ein?',
    type: 'select',
    options: ['Unter 30 Anrufe', '30 bis 75 Anrufe', 'Über 75 Anrufe'],
  },
  {
    id: 2,
    title: 'Welche Art von Anrufen blockiert Ihr Team im Alltag am meisten?',
    type: 'select',
    options: [
      'Routine-Rezeptbestellungen & Überweisungen',
      'Terminvereinbarungen & -absagen',
      'Wiederkehrende Standard-Fragen (Öffnungszeiten etc.)',
      'Akute Notfälle & medizinische Rückfragen',
    ],
  },
  {
    id: 3,
    title: 'Was passiert aktuell mit Anrufen, die Ihr Team während der Stoßzeiten nicht annehmen kann?',
    type: 'select',
    options: [
      'Das Telefon ist besetzt (Patienten sind frustriert)',
      'Ein Anrufbeantworter läuft (muss mühsam abgetippt werden)',
      'Die Anrufe gehen verloren',
    ],
  },
  {
    id: 4,
    title: 'Wie stark belastet das ständige Telefonklingeln die Konzentration Ihres Teams?',
    type: 'select',
    options: [
      'Kaum spürbar – unser Empfang ist entspannt.',
      'Spürbar – es führt regelmäßig zu Stress.',
      'Extrem – das Team arbeitet am Limit.',
    ],
  },
  {
    id: 5,
    title: 'Welches Praxisverwaltungssystem (PVS) nutzen Sie aktuell?',
    type: 'text',
    placeholder: 'z.B. Turbomed, CGM Albis, Medatixx, etc.',
    hint: 'Hinweis: Unser KI-Telefonsystem lässt sich dank offener API-Schnittstelle an nahezu jede gängige Praxissoftware anbinden.',
  },
  {
    id: 6,
    title: 'Muss das Telefonsystem direkt an Ihr Praxisverwaltungssystem (PVS) angebunden werden?',
    type: 'select',
    options: [
      'Ja, eine direkte PVS-Synchronisation ist zwingend erforderlich (z.B. für sofortigen Datenabgleich / Rezepte).',
      'Nein, ein eigenständiges Online-Dashboard oder sichere E-Mail-Übermittlung reicht uns völlig.',
      'Optional – wir möchten uns hierzu erst beraten lassen.',
    ],
  },
];

export const PraxisCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1); // 1-6: Questions, 7: Email Lead Gate, 8: Thank you page
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadForm, setLeadForm] = useState({
    salutation: '', // 'Herr' | 'Frau'
    name: '',
    praxis: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dynamic values calculation based on answers
  const calculatePotentialSavings = () => {
    let hoursSaved = 4;
    let patientSatisfaction = 'Hoch';
    
    const q1 = answers[1]; // calls at morning
    const q2 = answers[2]; // bottleneck type
    const q4 = answers[4]; // stress level

    if (q1 === 'Unter 30 Anrufe') hoursSaved = 5;
    if (q1 === '30 bis 75 Anrufe') hoursSaved = 12;
    if (q1 === 'Über 75 Anrufe') hoursSaved = 22;

    if (q2 === 'Routine-Rezeptbestellungen & Überweisungen') {
      hoursSaved += 3;
    } else if (q2 === 'Terminvereinbarungen & -absagen') {
      hoursSaved += 4;
    }

    if (q4 === 'Extrem – das Team arbeitet am Limit.') {
      hoursSaved += 2;
    }

    return {
      hours: hoursSaved,
      pctReduction: q1 === 'Über 75 Anrufe' ? '85%' : '75%',
      stressLabel: q4 === 'Extrem – das Team arbeitet am Limit.' ? 'Signifikante Reduktion' : 'Bessere Urlaubsübersicht'
    };
  };

  const getProductRecommendation = () => {
    const isPvsRequired = answers[6]?.includes('Ja') || answers[6]?.includes('zwingend');
    const isOptional = answers[6]?.includes('Optional') || answers[6]?.includes('beraten');
    const pvsName = answers[5] || 'Ihre Praxissoftware';
    
    if (isPvsRequired) {
      return {
        title: 'Voice Assist & Pulse Sync Pro',
        tagline: `Vollintegrierte KI-Telefonie & Live-Datenabgleich für ${pvsName}`,
        description: `Die ultimative Kombination aus unserem hochentwickelten Telefonassistenten (Voice Assist) und dem Echtzeit-Konnektor (Pulse). Damit fließen alle Rezept-, Überweisungs- und Terminanfragen vollautomatisch und synchronisiert in Ihr System ${pvsName}.`,
        features: [
          `Nahtlose Verbindung von Voice Assist & Pulse für ${pvsName}`,
          'Vollautomatischer Eintrag von Rezepten direkt in die Karteikarte',
          'Intelligente Patienten-Identifikation via Versichertennummer/Rufnummer',
          'Verschlüsselte bidirektionale Datenübertragung (FHIR & REST)'
        ],
        badge: 'Vollautomatische Premium-Lösung',
        icon: 'Server',
      };
    } else if (isOptional) {
      return {
        title: 'Voice Assist & Pulse Hybrid',
        tagline: 'Smarter KI-Anrufbeantworter mit flexiblem Pulse-Anschluss',
        description: `Die perfekte Brücke für Praxen, die flexibel bleiben möchten. Starten Sie direkt mit dem KI-Sprachassistenten (Voice Assist) und nutzen Sie das sichere Pulse-Kanal-Portal. Die tiefe Schnittstellenanbindung zu ${pvsName} kann jederzeit per Knopfdruck nachgerüstet werden.`,
        features: [
          'Voice Assist übernimmt 105% aller Anrufe in Stoßzeiten',
          'Sichere Vorab-Strukturierung im Pulse-Portal ohne IT-Eingriff',
          'Persönliche Beratung zur optimalen Schnittstellen-Einrichtung inklusive',
          'Jederzeit erweiterbar auf volle automatische PVS-Synchronisation'
        ],
        badge: 'Häufigste Empfehlung',
        icon: 'Sparkles',
      };
    } else {
      return {
        title: 'Voice Assist Standalone (inkl. Pulse Dashboard)',
        tagline: 'Autarke KI-Telefonie – Sofort bereit ohne Installationsaufwand',
        description: 'Nutzen Sie die gesamte Power des KI-Sprachassistenten (Voice Assist) völlig unabhängig von Ihrer Praxissoftware. Alle Patientenwünsche werden in Echtzeit im übersichtlichen, browserbasierten Pulse Dashboard für Ihren Empfang aufbereitet.',
        features: [
          'Komplett autarker Betrieb – Keine Modifikation Ihrer Praxis-IT erforderlich',
          'Inbetriebnahme und Rufumleitung in weniger als 15 Minuten einsatzbereit',
          'Intuitives Pulse Dashboard für jeden Browser (PC, Laptop oder Tablet)',
          'Sichere, DSGVO-konforme Übermittlung von Rezeptnachfragen per Mail & Web'
        ],
        badge: 'Schnellste Inbetriebnahme',
        icon: 'ShieldCheck',
      };
    }
  };

  const savings = calculatePotentialSavings();

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setTimeout(() => {
      setStep((curr) => Math.min(curr + 1, 8));
    }, 280);
  };

  const handleTextChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!leadForm.salutation) errors.salutation = 'Bitte wählen Sie eine Anrede aus';
    if (!leadForm.name.trim()) errors.name = 'Name ist erforderlich';
    if (!leadForm.praxis.trim()) errors.praxis = 'Praxisname ist erforderlich';
    if (!leadForm.email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(leadForm.email)) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail an';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(8); // Show final thank you page
  };

  const handleBackToStart = () => {
    navigate('/');
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        {step < 8 && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-4 animate-pulse">
              <Sparkles size={12} className="text-emerald-600" />
              100% Kostenlos und Unverbindlich
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
              Der 3-Minuten-Praxis-Check
            </h1>
            <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Analysieren Sie das Entlastungs- und Sparpotenzial Ihrer Praxis am Telefon und erhalten Sie ein individuelles Konzept.
            </p>
          </div>
        )}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel - Main Quiz Card (7 columns) */}
          <div className={`${step === 8 ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-8'} w-full`}>
            
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              
              {/* Card Header Profile Indicator */}
              {step <= 7 && (
                <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#0D9488]"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488]"></span>
                    </span>
                    <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">Praxis-Check live-Auswertung</span>
                  </div>
                  <span>Frage {step <= 6 ? step : 6} von 6</span>
                </div>
              )}

              {/* Progress bar */}
              {step <= 7 && (
                <div className="w-full bg-slate-100 h-1.5 flex transition-all duration-300">
                  <div 
                    className="bg-gradient-medical h-full rounded-r-full transition-all duration-500 ease-out"
                    style={{ width: `${(Math.min(step, 7) / 7) * 100}%` }}
                  />
                </div>
              )}

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {step <= 6 ? (
                    // QUESTIONS STEP
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <span className="text-xs font-bold text-[#0D9488] tracking-widest uppercase bg-emerald-50 border border-emerald-100/60 px-3 py-1.5 rounded-full">
                        Frage {step}
                      </span>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mt-3">
                        {quizQuestions[step - 1].title}
                      </h2>

                      <div className="space-y-3 mt-4">
                        {quizQuestions[step - 1].type === 'select' && quizQuestions[step - 1].options?.map((option, idx) => {
                          const isSelected = answers[step] === option;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(step, option)}
                              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                                isSelected 
                                  ? 'border-[#0D9488] bg-emerald-50/30 text-[#0D9488] font-semibold shadow-md' 
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <span className="text-sm sm:text-base pr-4">{option}</span>
                              <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                isSelected 
                                  ? 'border-[#0D9488] bg-[#0D9488] text-white' 
                                  : 'border-slate-300 group-hover:border-slate-400 bg-white'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                            </button>
                          );
                        })}

                        {quizQuestions[step - 1].type === 'text' && (
                          <div className="space-y-4">
                            <div className="relative">
                              <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={answers[step] || ''}
                                onChange={(e) => handleTextChange(step, e.target.value)}
                                placeholder={quizQuestions[step - 1].placeholder}
                                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/15 outline-none text-slate-800 transition-all shadow-sm"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && answers[step]?.trim()) {
                                    setStep((curr) => Math.min(curr + 1, 8));
                                  }
                                }}
                              />
                            </div>
                            
                            {quizQuestions[step - 1].hint && (
                              <div className="flex gap-3 bg-primary-light/40 p-4.5 rounded-2xl border border-primary-light">
                                <AlertCircle size={18} className="text-[#0D9488] shrink-0 mt-0.5" />
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {quizQuestions[step - 1].hint}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Controls Footer inside Card */}
                      <div className="mt-8 flex justify-between items-center pt-5 border-t border-slate-100">
                        <button
                          onClick={() => setStep((curr) => Math.max(curr - 1, 1))}
                          disabled={step === 1}
                          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ArrowLeft size={16} /> Zurück
                        </button>

                        {quizQuestions[step - 1].type === 'text' ? (
                          <button
                            onClick={() => setStep((curr) => Math.min(curr + 1, 8))}
                            disabled={!answers[step]?.trim()}
                            className="bg-gradient-medical text-white px-7 py-3.5 rounded-full font-bold text-sm hover:shadow-glow transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5 shadow-md"
                          >
                            Weiter <ArrowRight size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setStep((curr) => Math.min(curr + 1, 8))}
                            disabled={!answers[step]}
                            className="text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                          >
                            Nächste Frage <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ) : step === 7 ? (
                    // LEAD GATE STEP
                    <motion.div
                      key="lead-gate"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="space-y-6"
                    >
                      <div className="text-center max-w-xl mx-auto mb-6">
                        <div className="inline-flex items-center justify-center p-3 bg-gradient-medical text-white rounded-2xl shadow-xl mb-4">
                          <Sparkles size={24} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                          Fast fertig! Ihre Auswertung wird generiert.
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
                          Wir berechnen nun Ihr individuelles Entlastungskonzept. Tragen Sie einfach Ihre Daten ein, um die detaillierte PDF-Auswertung und ein kurzes Audio-Hörbeispiel unserer Praxis-KI per E-Mail zu erhalten.
                        </p>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-xl mx-auto">
                        {/* Anrede */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-600 block pl-1 uppercase tracking-wide">Anrede</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setLeadForm({ ...leadForm, salutation: 'Frau' })}
                              className={`py-3 px-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer ${
                                leadForm.salutation === 'Frau'
                                  ? 'border-[#0D9488] bg-emerald-50/30 text-[#0D9488] ring-2 ring-[#0D9488]/10'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`h-2 text-xs flex items-center justify-center rounded-full w-2 ${leadForm.salutation === 'Frau' ? 'bg-[#0D9488]' : 'bg-slate-300'}`} />
                              Frau
                            </button>
                            <button
                              type="button"
                              onClick={() => setLeadForm({ ...leadForm, salutation: 'Herr' })}
                              className={`py-3 px-4 rounded-xl border font-semibold text-sm transition-all focus:outline-none flex items-center justify-center gap-2 cursor-pointer ${
                                leadForm.salutation === 'Herr'
                                  ? 'border-[#0D9488] bg-emerald-50/30 text-[#0D9488] ring-2 ring-[#0D9488]/10'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`h-2 text-xs flex items-center justify-center rounded-full w-2 ${leadForm.salutation === 'Herr' ? 'bg-[#0D9488]' : 'bg-slate-300'}`} />
                              Herr
                            </button>
                          </div>
                          {formErrors.salutation && <span className="text-xs text-red-500 block pl-1 font-medium">{formErrors.salutation}</span>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 block pl-1 uppercase tracking-wide">Nachname des Ansprechpartners</label>
                            <div className="relative">
                              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={leadForm.name}
                                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                                placeholder="z.B. Dr. Müller"
                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white rounded-xl border ${formErrors.name ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-[#0D9488]'} focus:ring-2 outline-none text-slate-800 transition-all text-sm`}
                              />
                            </div>
                            {formErrors.name && <span className="text-xs text-red-500 block pl-1 font-medium">{formErrors.name}</span>}
                          </div>

                          {/* Praxis */}
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 block pl-1 uppercase tracking-wide">Praxis / Fachrichtung</label>
                            <div className="relative">
                              <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                value={leadForm.praxis}
                                onChange={(e) => setLeadForm({ ...leadForm, praxis: e.target.value })}
                                placeholder="z.B. Hausarztpraxis, Zahnarzt"
                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white rounded-xl border ${formErrors.praxis ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-[#0D9488]'} focus:ring-2 outline-none text-slate-800 transition-all text-sm`}
                              />
                            </div>
                            {formErrors.praxis && <span className="text-xs text-red-500 block pl-1 font-medium">{formErrors.praxis}</span>}
                          </div>
                        </div>

                        {/* E-Mail */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 block pl-1 uppercase tracking-wide">E-Mail-Adresse (für PDF-Auswertung & Marketing)</label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="email"
                              value={leadForm.email}
                              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                              placeholder="name@praxis-mueller.de"
                              className={`w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white rounded-xl border ${formErrors.email ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-[#0D9488]'} focus:ring-2 outline-none text-slate-800 transition-all text-sm`}
                            />
                          </div>
                          {formErrors.email && <span className="text-xs text-red-500 block pl-1 font-medium">{formErrors.email}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            className="w-full bg-gradient-medical text-white font-bold py-4 rounded-2xl hover:shadow-glow hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                          >
                            Jetzt Auswertung anfordern & Audio-Demo sichern
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        {/* DSGVO Note */}
                        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-100 mt-4">
                          <Lock size={12} />
                          <span>Ihre Daten sind absolut sicher und werden streng DSGVO-konform geschützt.</span>
                        </div>
                      </form>

                      <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
                        <button
                          type="button"
                          onClick={() => setStep(6)}
                          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                        >
                          <ArrowLeft size={16} /> Zurück zur Schnittstellen-Frage
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    // THANK YOU STEP
                    <motion.div
                      key="thankyou"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8"
                    >
                      <div className="text-center max-w-2xl mx-auto mb-6">
                        <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-sm">
                          <CheckCircle2 size={48} strokeWidth={1.5} className="animate-bounce" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight animate-fade-in">
                          Vielen Dank! Ihre Auswertung wird übermittelt.
                        </h2>
                        
                        <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5.5 mt-5 leading-relaxed inline-block max-w-[550px]">
                          <p className="text-emerald-800 text-sm font-semibold">
                            Vielen Dank, {leadForm.salutation === 'Frau' ? 'Frau' : 'Herr'} {leadForm.name}! Wir haben Ihre Angaben erfolgreich erhalten. Die detaillierte Auswertung sowie das akustische Hörbeispiel senden wir Ihnen in den nächsten 2 Minuten direkt an Ihre E-Mail-Adresse:
                          </p>
                          <span className="underline font-bold text-emerald-950 block mt-1.5 text-base">{leadForm.email}</span>
                        </div>
                      </div>

                      {/* INDIVIDUELLES SPARKENNZAHLEN-BOARD (FREIGESCHALTET) */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                          <Sparkles size={200} />
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488]/10 text-emerald-400 border border-emerald-500/20 mb-2">
                              <Star size={12} fill="currentColor" /> Individuelle Auswertung freigeschaltet
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                              Das Sparpotenzial Ihrer Praxis
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
                              Berechnet basierend auf den Angaben von <span className="text-emerald-400 font-semibold">{leadForm.praxis || 'Ihrer Praxis'}</span> ({leadForm.salutation === 'Frau' ? 'Frau' : 'Herr'} {leadForm.name})
                            </p>
                          </div>
                          
                          <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shrink-0 w-fit">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            Live-Analyse abgeschlossen
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Hours Saved */}
                          <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
                            <div>
                              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Entlastung am Telefon</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">{savings.hours} Std.</span>
                                <span className="text-xs text-slate-400">/ Woche</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                              Diese wertvolle Arbeitszeit wird künftig nicht mehr durch administrative Telefonate blockiert.
                            </p>
                          </div>

                          {/* Call assurance percentage reduction */}
                          <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
                            <div>
                              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Anruf-Erfassungsquote</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{savings.pctReduction}</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                              Einsparung bisheriger Ausfallzeiten. Ihre Leitungen sind niemals besetzt, Ihre Patienten stets gut betreut.
                            </p>
                          </div>

                          {/* Effect on the team */}
                          <div className="bg-slate-800/40 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
                            <div>
                              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Team-Stress-Effekt</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">{savings.stressLabel}</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                              Weniger abgelenktes Praxisleben bedeutet mehr Zuwendung für die anwesenden Patienten vor Ort.
                            </p>
                          </div>

                        </div>

                        {/* Recap list of parameters for medical gravity */}
                        <div className="mt-6 pt-5 border-t border-slate-800/60 grid grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
                          <div>
                            <span className="text-slate-500 font-medium block">Anrufaufkommen:</span>
                            <span className="text-slate-200 font-semibold block mt-0.5">{answers[1] || 'Keine Angabe'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium block">Häufigster Zeitfresser:</span>
                            <span className="text-slate-250 font-semibold block mt-0.5 text-slate-200">{answers[2] || 'Keine Angabe'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium block">Stoßzeiten-Gefahr:</span>
                            <span className="text-slate-200 font-semibold block mt-0.5">{answers[3] || 'Keine Angabe'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium block">PVS (Praxissoftware):</span>
                            <span className="text-slate-200 font-semibold block mt-0.5">{answers[5] || 'Keine Angabe'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium block">PVS-Anbindung:</span>
                            <span className="text-slate-200 font-semibold block mt-0.5 text-[#0D9488] font-bold">
                              {answers[6] ? (answers[6].includes('Ja') ? 'Zwingend' : answers[6].includes('Nein') ? 'Autark' : 'Optional') : 'Keine Angabe'}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* INDIVIDUELLE PRODUKT-EMPFEHLUNG (DYNAMISCH) */}
                      <div className="bg-gradient-to-br from-[#0D9488]/5 to-emerald-500/10 border-2 border-[#0D9488]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0D9488]/15 pb-5">
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488] text-white mb-2 shadow-sm">
                              ✓ Empfohlenes Produkt & Setup für {answers[5] || 'Ihre Praxis'}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                              {getProductRecommendation().icon === 'Server' ? <Server size={22} className="text-[#0D9488]" /> : getProductRecommendation().icon === 'Sparkles' ? <Sparkles size={22} className="text-[#0D9488]" /> : <ShieldCheck size={22} className="text-[#0D9488]" />} {getProductRecommendation().title}
                            </h3>
                            <p className="text-[#0D9488] font-bold text-xs sm:text-sm mt-1">
                              {getProductRecommendation().tagline}
                            </p>
                          </div>
                          
                          <div className="bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/20 px-3 py-1.5 rounded-full font-bold text-xs shrink-0 w-fit">
                            {getProductRecommendation().badge}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed font-medium">
                              {getProductRecommendation().description}
                            </p>
                            
                            <div className="bg-white/80 p-4.5 rounded-2xl border border-[#0D9488]/10 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 shadow-sm">
                              <span className="font-bold text-[#0D9488] block">Ihr Daten-Vorteil:</span>
                              Laut Ihrer Antwort auf Frage 6 ist Ihnen die PVS-Schnittstelle {answers[6]?.toLowerCase().includes('ja') ? 'zwingend wichtig' : answers[6]?.toLowerCase().includes('nein') ? 'nicht zwingend notwendig' : 'optional wichtig'}. Unser Produkt <span className="font-semibold text-slate-900">{getProductRecommendation().title}</span> wurde dafür maßgeschneidert.
                            </div>
                          </div>

                          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Produkt-Highlights:</h4>
                            <ul className="space-y-2.5">
                              {getProductRecommendation().features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                                  <div className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                                    <Check size={12} strokeWidth={3} />
                                  </div>
                                  <span className="leading-tight">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Split detail cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        {/* Quality Promise */}
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-7 space-y-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-primary-light text-primary-dark rounded-xl">
                              <Star size={18} fill="currentColor" />
                            </div>
                            <h3 className="font-extrabold text-slate-900 text-lg">Unser Service-Versprechen</h3>
                          </div>
                          
                          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                            <p className="leading-relaxed">
                              Wir liefern eine voll funktionsfähige, professionelle KI-Infrastruktur, die Ihren Empfang ab dem ersten Tag entlastet.
                            </p>
                            <div className="border-l-3 border-[#0D9488] pl-3 py-0.5">
                              <span className="font-bold text-slate-800 block mb-0.5">Sofort-Entlastungsverfahren:</span>
                              Routine-Anrufe (wie Rezeptwünsche oder Terminabsagen) werden ab der Aktivierung vollautomatisch im Hintergrund dokumentiert. Ihr Team hat sofort wieder freien Kopf für Patienten vor Ort.
                            </div>
                          </div>
                        </div>

                        {/* DSGVO Section */}
                        <div className="bg-slate-950 text-slate-300 rounded-3xl p-6 sm:p-7 border border-slate-900">
                          <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-4 mb-4">
                            <div className="p-1.5 bg-[#CCFBF1]/15 text-[#0D9488] rounded-xl border border-[#CCFBF1]/20">
                              <ShieldCheck size={20} />
                            </div>
                            <h3 className="font-extrabold text-white text-lg tracking-tight">🔒 Höchster Datenschutz</h3>
                          </div>

                          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                            Als medizinische Einrichtung tragen Sie die Verantwortung für sensible Patientendaten. Unser System wurde exakt für diese strengen Anforderungen gebaut:
                          </p>

                          <div className="space-y-3">
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <strong className="text-white">✓ Kein autonomer Zugriff:</strong> Eine PVS-Anbindung erfolgt ausschließlich nach expliziter Freigabe mit Ihrem IT-Dienstleister.
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <strong className="text-white">✓ Server-Infrastruktur in DE:</strong> Sämtliche Sprachdaten und Verarbeitungen laufen DSGVO-konform auf Hochsicherheitsservern in Deutschland.
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <strong className="text-white">✓ Ärztliche Schweigepflicht:</strong> Vollständige systemische Einhaltung des Patientengeheimnisses zu jedem Zeitpunkt.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                          onClick={handleBackToStart}
                          className="w-full sm:w-auto bg-[#0D9488] text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all hover:shadow-glow hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                        >
                          Zurück zur Startseite <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right panel - Live Saving Calculator Sidebar (5 columns) */}
          {step < 8 && (
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              
              {/* Profile Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Flame size={120} />
                </div>

                <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-emerald-400" />
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-400">Praxis-Profil</span>
                  </div>
                  <span className="text-xs bg-[#0D9488]/15 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                    Echtzeit-Analyse
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Locked Savings Potential Teaser */}
                  <div className="bg-slate-800/40 rounded-2xl p-4.5 border border-slate-800 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-4 z-10">
                      <div className="p-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-1.5 animate-pulse">
                        <Sparkles size={16} className="text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-bold leading-normal text-emerald-400 uppercase tracking-wider block">Analyse & Berechnung aktiv</span>
                      <p className="text-[10.5px] text-slate-300 max-w-[200px] mt-1 leading-tight text-center font-medium">Wird unmittelbar nach der Dateneingabe live freigeschaltet</p>
                    </div>
                    
                    {/* Blurred background content to visually tease the statistics */}
                    <div className="blur-[3px] select-none pointer-events-none opacity-20 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block animate-pulse">Geschätzte Zeiteinsparung</span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-black text-white tracking-tight">18 Std.</span>
                        <span className="text-xs text-slate-400">/ Woche</span>
                      </div>
                      <span className="text-xs text-[#0D9488] font-bold block">✓ Entlastung für Ihr Empfangsteam</span>
                    </div>
                  </div>

                  {/* Dynamic metric 2: Answered properties */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Erfasste Parameter</span>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium">Anrufaufkommen:</span>
                        <span className="text-white font-bold text-right">{answers[1] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium">Zeitfresser:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1">{answers[2] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium">Stoßzeiten-Fluss:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1">{answers[3] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium">Team-Stressfaktor:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1">{answers[4] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium">Praxissoftware (PVS):</span>
                        <span className="text-white font-bold text-right">{answers[5] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs pb-1">
                        <span className="text-slate-400 font-medium">PVS-Schnittstelle:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1">
                          {answers[6] ? (answers[6].includes('Ja') ? 'Zwingend' : answers[6].includes('Nein') ? 'Autark' : 'Optional') : 'Ausstehend...'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Shield Info Badge */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
                  <div className="p-1 px-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Shield size={16} />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Garantiert DSGVO-konform</h4>
                </div>

                <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Verarbeitung ausschließlich auf hochsicheren Servern in Deutschland.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Konform mit KBV-Richtlinien und DSGVO Patientengeheimnis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Kein Ausspähen von Daten. Keine direkte Installation in Ihrer Praxis-IT erforderlich.</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
