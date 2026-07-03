import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowRight, ArrowLeft, Check, Sparkles, Lock, 
  ShieldCheck, Server, FileText, CheckCircle2, AlertCircle,
  Building, Mail, Phone, User, Star, Flame, Award, Heart, Shield, Landmark,
  TrendingUp, Clock, Euro, ArrowUpRight, ChevronDown, ChevronUp, MessageCircle
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface Question {
  id: number;
  title: string;
  type: 'select' | 'multiselect' | 'text';
  options?: string[];
  placeholder?: string;
  hint?: string;
  optional?: boolean;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    title: 'Wie viele Anrufe gehen in Ihrer Praxis schätzungsweise an einem normalen Tag ein?',
    type: 'select',
    options: [
      'Unter 20 Anrufe',
      '20 bis 50 Anrufe',
      '51 bis 100 Anrufe',
      'Über 100 Anrufe'
    ],
  },
  {
    id: 2,
    title: 'Welche Art von Anrufen blockiert Ihr Team im Alltag am meisten?',
    type: 'multiselect',
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
      'Ein Anrufbeantworter läuft (muss später mühsam abgetippt werden)',
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
    title: 'Wann soll der KI-Telefonassistent Ihr Team idealerweise entlasten?',
    type: 'select',
    options: [
      'Nur zu den extremen Stoßzeiten (z. B. Montagmorgen), um den Empfang freizuhalten',
      'Nur außerhalb die Sprechzeiten (Mittagspause, Abende, Wochenende) anstelle des ABs',
      'Flexibel im Hybrid-Modell (vormittags das Team, nachmittags die KI)',
      'Rund um die Uhr (24/7), um maximale Erreichbarkeit zu garantieren',
    ],
  },
  {
    id: 6,
    title: 'Welches Praxisverwaltungssystem (PVS) nutzen Sie aktuell? (optional)',
    type: 'text',
    placeholder: 'z.B. Turbomed, CGM Albis, Medatixx, etc.',
    hint: 'Hinweis: Unser KI-Telefonsystem lässt sich dank offener API-Schnittstelle an nahezu jede gängige Praxissoftware anbinden.',
    optional: true,
  },
  {
    id: 7,
    title: 'Wie sollen Termine über den KI-Telefonassistenten gebucht bzw. synchronisiert werden?',
    type: 'select',
    options: [
      'Über unsere Praxissoftware (z.B. Doctolib, tomedo etc. via API-Schnittstelle)',
      'Über einen externen Cloud-Kalender (z.B. Google/Microsoft)',
      'Keine automatische Terminbuchung benötigt',
    ],
  },
];

export const PraxisCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1); // 1-7: Questions, 8: Evaluation Screen
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [leadForm, setLeadForm] = useState({
    name: '',
    praxis: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showTransparency, setShowTransparency] = useState<boolean>(false);

  // Calculations based on Question 1 answers
  const calculatePotentialSavings = () => {
    const q1 = answers[1] || 'Unter 20 Anrufe';
    
    // LOGIK 1: BERECHNUNG DES MONATLICHEN TARIFS (Basis: Frage 1)
    let anrufe_tag = 15;
    let tarif = 'Doc-Tarif (99 € / Mon.)';
    let systemkosten = 99;
    let inklusivminuten = '1.000 Inklusivminuten (jede weitere 0,15 €)';
    
    if (q1 === 'Unter 20 Anrufe') {
      anrufe_tag = 15;
      tarif = 'Doc-Tarif (99 € / Mon.)';
      systemkosten = 99;
      inklusivminuten = '1.000 Inklusivminuten (jede weitere 0,15 €)';
    } else if (q1 === '20 bis 50 Anrufe') {
      anrufe_tag = 35;
      tarif = 'Praxis-Tarif (299 € / Mon.)';
      systemkosten = 299;
      inklusivminuten = '3.000 Inklusivminuten (jede weitere 0,12 €)';
    } else if (q1 === '51 bis 100 Anrufe') {
      anrufe_tag = 75;
      tarif = 'Praxis-Tarif (414 € / Mon.)';
      systemkosten = 414;
      inklusivminuten = '3.000 Inklusivminuten (jede weitere 0,12 €)';
    } else {
      // Über 100 Anrufe
      anrufe_tag = 130;
      tarif = 'Klinik-Tarif (ab 499 € / Mon.)';
      systemkosten = 723;
      inklusivminuten = 'ab 5.000 Inklusivminuten (individuell anpassbar)';
    }

    const workingDays = 22;
    const ki_minuten = Math.round(anrufe_tag * 0.80 * 4 * workingDays);
    const zeitgewinn_stunden = Math.round(ki_minuten / 33);
    const brutto_ersparnis = Math.round(zeitgewinn_stunden * 25.0);
    const netto_ersparnis = Math.round(brutto_ersparnis - systemkosten);
    const roi = Math.round((netto_ersparnis / systemkosten) * 100);

    // LOGIK 2: ERMITTLUNG DES INSTALLATIONS-PRODUKTS (Basis: Frage 7)
    const q7 = answers[7] || '';
    let hauptprodukt = 'Voice';
    let link = 'https://auxilium-assist.de/voice-kaufen';
    
    if (q7.includes('Praxissoftware') || q7.includes('API-Schnittstelle')) {
      hauptprodukt = 'Puls';
      link = 'https://auxilium-assist.de/puls-kaufen';
    } else if (q7.includes('externen') || q7.includes('Cloud-Kalender') || q7.includes('Google') || q7.includes('Microsoft')) {
      hauptprodukt = 'Assist';
      link = 'https://auxilium-assist.de/assist-kaufen';
    } else {
      hauptprodukt = 'Voice';
      link = 'https://auxilium-assist.de/voice-kaufen';
    }

    return {
      tarif,
      inklusivminuten,
      zeitgewinn_stunden,
      brutto_ersparnis: `${brutto_ersparnis.toLocaleString('de-DE')} €`,
      netto_ersparnis: `${netto_ersparnis.toLocaleString('de-DE')} €`,
      roi,
      hauptprodukt,
      link,
      anrufe_tag,
      workingDays,
      ki_minuten,
      systemkosten,
      brutto_ersparnis_num: brutto_ersparnis,
      netto_ersparnis_num: netto_ersparnis
    };
  };

  const savings = calculatePotentialSavings();

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    // Single choice: advances automatically and without delay
    setTimeout(() => {
      setStep((curr) => {
        if (curr === 7) {
          return 8; // Directly to evaluation screen which is step 8
        }
        return curr + 1;
      });
    }, 250);
  };

  const handleToggleMultiOption = (questionId: number, option: string) => {
    setAnswers((prev) => {
      const currentVal = prev[questionId] || '';
      const selectedList = currentVal ? currentVal.split('; ') : [];
      let newList;
      if (selectedList.includes(option)) {
        newList = selectedList.filter((item) => item !== option);
      } else {
        newList = [...selectedList, option];
      }
      return { ...prev, [questionId]: newList.join('; ') };
    });
  };

  const handleTextChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!leadForm.name.trim()) errors.name = 'Name ist erforderlich';
    if (!leadForm.praxis.trim()) errors.praxis = 'Praxisname/Fachrichtung ist erforderlich';
    if (!leadForm.email.trim()) {
      errors.email = 'E-Mail-Adresse ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(leadForm.email)) {
      errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    if (!leadForm.phone.trim()) {
      errors.phone = 'Telefonnummer ist erforderlich';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep(9); // Show live evaluation langsung in the browser
    window.scrollTo(0, 0);
  };

  const handleBackToStart = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header (only visible before result page) */}
        {step < 8 && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-4 animate-pulse">
              <Sparkles size={12} className="text-emerald-600" />
              100% Kostenlos &amp; Unverbindlich
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
          
          {/* Left panel - Main Container (takes full width on step 8) */}
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
                  <span>Frage {Math.min(step, 7)} von 7</span>
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

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {step <= 7 ? (
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
                        
                        {/* SELECT (SINGLE CHOICE) */}
                        {quizQuestions[step - 1].type === 'select' && quizQuestions[step - 1].options?.map((option, idx) => {
                          const isSelected = answers[step] === option;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(step, option)}
                              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
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

                        {/* MULTISELECT (MULTIPLE CHOICE WITH MANUAL NEXT BUTTON) */}
                        {quizQuestions[step - 1].type === 'multiselect' && (
                          <div className="space-y-3">
                            {quizQuestions[step - 1].options?.map((option, idx) => {
                              const selectedList = answers[step] ? answers[step].split('; ') : [];
                              const isSelected = selectedList.includes(option);
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleToggleMultiOption(step, option)}
                                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                                    isSelected 
                                      ? 'border-[#0D9488] bg-emerald-50/20 text-[#0D9488] font-semibold' 
                                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <span className="text-sm sm:text-base pr-4">{option}</span>
                                  <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                    isSelected 
                                      ? 'border-[#0D9488] bg-[#0D9488] text-white' 
                                      : 'border-slate-300 group-hover:border-slate-400 bg-white'
                                  }`}>
                                    {isSelected && <Check size={12} strokeWidth={3.5} />}
                                  </div>
                                </button>
                              );
                            })}

                            {/* Manual Confirm/Next Button */}
                            <div className="pt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={() => setStep((curr) => curr + 1)}
                                disabled={!answers[step]}
                                className="bg-[#0D9488] hover:bg-[#0b7f74] disabled:opacity-50 disabled:pointer-events-none text-white font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
                              >
                                Weiter <ArrowRight size={16} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* TEXT INPUT WITH MANUAL NEXT BUTTON */}
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
                                  if (e.key === 'Enter') {
                                    if (quizQuestions[step - 1].optional || answers[step]?.trim()) {
                                      setStep((curr) => curr + 1);
                                    }
                                  }
                                }}
                              />
                            </div>
                            
                            {quizQuestions[step - 1].hint && (
                              <div className="flex gap-3 bg-[#EEF2F6] p-4.5 rounded-2xl border border-slate-200">
                                <AlertCircle size={18} className="text-[#0D9488] shrink-0 mt-0.5" />
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                  {quizQuestions[step - 1].hint}
                                </p>
                              </div>
                            )}

                            {/* Manual Confirm/Next Button */}
                            <div className="pt-2 flex justify-end">
                              <button
                                type="button"
                                onClick={() => setStep((curr) => curr + 1)}
                                disabled={!quizQuestions[step - 1].optional && !answers[step]?.trim()}
                                className="bg-[#0D9488] hover:bg-[#0b7f74] disabled:opacity-50 disabled:pointer-events-none text-white font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
                              >
                                Weiter <ArrowRight size={16} />
                              </button>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Controls Footer inside Card */}
                      <div className="mt-8 flex justify-between items-center pt-5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setStep((curr) => Math.max(curr - 1, 1))}
                          disabled={step === 1}
                          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        >
                          <ArrowLeft size={16} /> Zurück
                        </button>

                        <span className="text-xs text-slate-400 font-medium font-sans">
                          Schritt {step} von 7
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    // LIVE EVALUATION SCREEN (ECHTZEIT-ANZEIGE)
                    <motion.div
                      key="live-evaluation"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8 text-slate-800 font-sans"
                    >
                      {/* Dashboard Header */}
                      <div className="border-b border-slate-150 pb-5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-[#0D9488] font-bold text-[11px] uppercase tracking-wider rounded-full mb-3 border border-emerald-100/50 animate-pulse">
                            <CheckCircle2 size={12} className="text-[#0D9488]" /> Live-Auswertung abgeschlossen
                          </span>
                          <h1 className="text-3xl sm:text-4.5xl font-black text-slate-950 tracking-tight leading-none">
                            Ihr Praxis-Effizienz-Dashboard
                          </h1>
                        </div>
                      </div>

                      {/* 1. EMPFOHLENE INFRASTRUKTUR BANNER */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden group">
                        {/* Background light rays */}
                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#0D9488] opacity-10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                        
                        <div className="space-y-6 relative z-10">
                          {/* Banner Table Header representation */}
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center gap-1.5">
                            <Award size={14} className="text-[#2DD4BF] shrink-0" /> EMPFOHLENE SYSTEMLÖSUNG
                          </div>

                          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                            {/* Linke Seite: Produktinfos & Features */}
                            <div className="space-y-5 flex-1">
                              <div className="flex items-center gap-3">
                                <div className="p-3 bg-slate-800/80 rounded-2xl text-[#2DD4BF] border border-slate-700">
                                  {savings.hauptprodukt === 'Voice' ? (
                                    <Phone size={24} />
                                  ) : savings.hauptprodukt === 'Assist' ? (
                                    <Clock size={24} />
                                  ) : (
                                    <Sparkles size={24} />
                                  )}
                                </div>
                                <div className="text-left">
                                  <h2 className="text-2.5xl sm:text-3.5xl font-black tracking-tight leading-none text-white mb-1">
                                    Auxilium {savings.hauptprodukt}
                                  </h2>
                                  <p className="text-[#2DD4BF] text-xs sm:text-sm font-semibold tracking-wide uppercase">
                                    {savings.hauptprodukt === 'Voice' 
                                      ? 'KI-Telefonassistent für Erreichbarkeit' 
                                      : savings.hauptprodukt === 'Assist' 
                                      ? 'KI-Telefonassistent mit Terminorganisation' 
                                      : 'Die vollintegrierte Praxis-KI'}
                                  </p>
                                </div>
                              </div>

                              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl text-left">
                                {savings.hauptprodukt === 'Voice' 
                                  ? 'Der digitale Empfang, smarter KI-Telefonassistent für maximale Erreichbarkeit in Ihrer Praxis. Stellen Sie sicher, dass keine Anrufe mehr verloren gehen und Ihr Team spürbar entlastet wird.' 
                                  : savings.hauptprodukt === 'Assist' 
                                  ? 'Der KI-Telefonassistent mit intelligenter Terminorganisation für spürbare Praxisentlastung. Automatisiert Terminprozesse und reduziert den täglichen Telefonaufwand erheblich.' 
                                  : 'Der digitale Herzschlag Ihrer Praxis – für vollständige Integration und automatisierte Abläufe im Hintergrund. Verbindet Kommunikation, Prozesse und Ihre Praxissoftware zu einem nahtlosen System.'}
                              </p>

                              {/* Features der Startseite */}
                              <div className="pt-2">
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-3 text-left">
                                  Inbegriffene Produkt-Features:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                                  {savings.hauptprodukt === 'Voice' && (
                                    <>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>24/7 telefonische Erreichbarkeit</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Empathische & menschliche Patientenkommunikation</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Notfall- & Dringlichkeitserkennung</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Rezept- & Überweisungsannahme</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>FAQ-Beantwortung (Sprechzeiten etc.)</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Sichere E-Mail-Benachrichtigung (Details im Dashboard)</span>
                                      </li>
                                    </>
                                  )}
                                  {savings.hauptprodukt === 'Assist' && (
                                    <>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Inklusive aller Voice-Features</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Vollautomatische, DSGVO & § 203 konforme Terminvergabe (Google Workspace / M365)</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Lückensuche in der Praxissoftware</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Storno-Schutz: Terminabsagen & Wiederfreigabe</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>SMS-Terminbestätigung an Patienten</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Optimierte Auslastung ohne Team-Zutun</span>
                                      </li>
                                    </>
                                  )}
                                  {savings.hauptprodukt === 'Puls' && (
                                    <>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Inklusive aller Assist-Features</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Tiefe Praxissoftware-Schnittstelle</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>API-Anbindung für individuelle Systeme</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Automatisierter Recall-Service</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Vollständige Prozessautomatisierung</span>
                                      </li>
                                      <li className="flex items-start gap-2.5 text-xs text-slate-200">
                                        <Check size={14} className="text-[#2DD4BF] shrink-0 mt-0.5" strokeWidth={3} />
                                        <span>Eigene Stimme (Voice Clone optional)</span>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>

                              {/* Tarifbereich - Kleiner & dezenter */}
                              <div className="pt-4 border-t border-slate-800/80 mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-xl text-xs text-slate-300">
                                  <span className="font-bold text-[#2DD4BF]">Empfohlener Tarif:</span>
                                  <span>{savings.tarif}</span>
                                </div>
                                <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                                <span className="text-slate-400 text-[11px] font-medium text-left">
                                  Inklusive: {savings.inklusivminuten}
                                </span>
                              </div>

                              {/* WhatsApp Beratung - Kleiner, klickbarer Vermerk mit Profilbild */}
                              <div 
                                onClick={() => document.getElementById('global-whatsapp-trigger')?.click()}
                                className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900/40 hover:bg-slate-800/50 border border-slate-800/60 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] hover:border-teal-500/30 group text-left"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="relative shrink-0 mt-0.5">
                                    <img 
                                      src="https://media.licdn.com/dms/image/v2/D4D03AQEjvaMA0a3xfQ/profile-displayphoto-crop_800_800/B4DZvWglWxJMAI-/0/1768830432171?e=1784764800&v=beta&t=DwGFx1quxy-6XfmkHlN_O7-th5TQZbMkOhofWVwD_68" 
                                      alt="Manuel Engelhard" 
                                      className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                                      referrerPolicy="no-referrer"
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#0D9488] rounded-full" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="font-mono text-[9px] font-bold text-[#2DD4BF] uppercase tracking-widest leading-none">Persönliche Beratung</p>
                                    <div>
                                      <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">Manuel Engelhard</h4>
                                      <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Experte für KI-Implementierungen</p>
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-snug">
                                      Haben Sie Fragen zur Auswertung? Klicken Sie hier, für eine persönliche Beratung!
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0D9488]/15 text-[#2DD4BF] font-bold text-[10px] uppercase tracking-wider rounded-xl border border-[#0D9488]/30 group-hover:bg-[#0D9488]/25 group-hover:text-white transition-all self-start sm:self-center">
                                  <MessageCircle size={12} className="fill-current" />
                                  <span>Beratung starten</span>
                                </div>
                              </div>

                            </div>

                            {/* Rechte Seite: Buchungs-CTA */}
                            <div className="w-full lg:w-80 shrink-0 self-stretch flex flex-col justify-start pt-2 lg:pt-0">
                              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center h-full flex flex-col justify-between items-center space-y-4">
                                <div className="space-y-3 w-full">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0D9488]/10 text-[#2DD4BF] font-bold text-[10px] uppercase tracking-wider rounded-full border border-[#0D9488]/20">
                                    <Sparkles size={10} /> Empfehlung sichern
                                  </span>
                                  <h3 className="text-xl font-black text-white tracking-tight leading-snug">
                                    Ihr KI-Assistent ist bereit
                                  </h3>
                                  <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
                                    Sichern Sie sich jetzt Ihr maßgeschneidertes KI-System zum Sonderpreis. Die Einrichtung erfolgt unkompliziert und remote.
                                  </p>
                                </div>

                                <div className="w-full space-y-3">
                                  <a
                                    href={savings.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    referrerPolicy="no-referrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-medical hover:shadow-glow text-white font-black py-4 px-6 rounded-2xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs uppercase tracking-wider cursor-pointer group"
                                    id="btn-buy-recommendation"
                                  >
                                    <span>JETZT SYSTEM BUCHEN</span>
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                  </a>
                                  
                                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
                                    <Lock size={10} className="text-emerald-400" />
                                    <span>Risikofrei &amp; DSGVO-konform</span>
                                  </div>
                                </div>

                                {/* Info zum Onboarding - Klares Design */}
                                <div className="bg-slate-800/40 border border-slate-800/80 p-3.5 rounded-2xl flex items-start gap-2.5 text-[11px] text-slate-450 w-full mt-auto">
                                  <span className="text-xs text-[#2DD4BF] shrink-0 mt-0.5">💡</span>
                                  <p className="leading-normal text-left text-slate-300">
                                    <strong>Wichtiger Buchungshinweis:</strong> Der monatliche Tarif wird erst im Laufe Ihres persönlichen, geführten Onboarding-Prozesses finalisiert und gebucht. Sie gehen jetzt kein Risiko ein.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. WIRTSCHAFTLICHE KENNZAHLEN (MONATLICH) */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 text-xl">📈</span>
                          <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-wider">
                            Wirtschaftliche Kennzahlen (Monatlich)
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Zeitgewinn Box */}
                          <div className="bg-white border border-slate-200/80 rounded-2.5xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">⏰ Zeitgewinn</span>
                              <span className="p-1 px-2.5 bg-emerald-50 text-[#0D9488] font-bold text-[10px] rounded-full">Pro Monat</span>
                            </div>
                            <div className="mt-4">
                              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 leading-none">
                                +{savings.zeitgewinn_stunden} Std.
                              </h2>
                              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                                wertvolle Fokuszeit am Tresen
                              </p>
                            </div>
                          </div>

                          {/* BUDGET-ENTLASTUNG Box */}
                          <div className="bg-white border border-slate-200/80 rounded-2.5xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">💶 BUDGET-ENTLASTUNG</span>
                              <span className="p-1 px-2.5 bg-emerald-50 text-[#0D9488] font-bold text-[10px] rounded-full">Monatlich</span>
                            </div>
                            <div className="mt-4">
                              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-none text-[#0D9488]">
                                {savings.brutto_ersparnis}
                              </h2>
                              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                                freigeschaufelte Personalkosten
                              </p>
                            </div>
                          </div>

                          {/* Reale Netto-Ersparnis Box */}
                          <div className="bg-gradient-to-br from-emerald-50/10 via-[#EEF9F8]/25 to-white border-2 border-[#0D9488]/40 rounded-2.5xl p-6 shadow-md flex flex-col justify-between hover:border-[#0D9488]/60 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#0D9488] opacity-5 rounded-full blur-xl"></div>
                            <div className="flex justify-between items-start relative z-10">
                              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest flex items-center gap-1">📉 REALE NETTO-ERSPARNIS</span>
                              <span className="p-1 px-2.5 bg-emerald-500 text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider">Effektiv</span>
                            </div>
                            <div className="mt-4 relative z-10">
                              <h2 className="text-3.5xl sm:text-4.5xl font-black text-slate-950 leading-none">
                                {savings.netto_ersparnis}
                              </h2>
                              <p className="text-slate-600 text-xs sm:text-sm mt-2 font-bold block">
                                echte Netto-Ersparnis pro Monat
                              </p>
                            </div>
                          </div>

                          {/* System-ROI Box */}
                          <div className="bg-white border border-slate-200/80 rounded-2.5xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">📈 SYSTEM-ROI</span>
                              <span className="p-1 px-2.5 bg-emerald-50 text-[#0D9488] font-bold text-[10px] rounded-full">Rendite</span>
                            </div>
                            <div className="mt-4">
                              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 leading-none">
                                {savings.roi}%
                              </h2>
                              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                                Amortisation ab Tag 1
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* 3. DIREKTZUGANG BANNER */}
                      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#0D9488] to-[#0284C7]"></div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="text-left">
                            <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-wider uppercase flex items-center gap-2">
                              <Lock size={15} className="text-[#0D9488]" /> IHR DIREKTZUGANG
                            </h3>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2 font-medium">
                              Sichern Sie sich die KI-Infrastruktur jetzt direkt für Ihr Team:
                            </p>
                          </div>
                          <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
                            <a
                              href={savings.link}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="w-full md:w-auto text-center inline-flex items-center justify-center gap-2 py-4 px-8 bg-gradient-medical hover:shadow-glow text-white font-extrabold rounded-2xl text-xs sm:text-sm tracking-wide shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer uppercase"
                              id="btn-direct-access-link"
                            >
                              Jetzt für die Praxis buchen
                              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* 4. DISCLAMER / INFORMATION LABEL */}
                      <div className="flex items-start gap-2.5 bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                        <span className="text-base text-slate-400 shrink-0 mt-0.5">ℹ️</span>
                        <p className="text-xs text-slate-500 leading-relaxed font-sans">
                          <em>Berechnungsgrundlage 2026:</em> Basierend auf {savings.zeitgewinn_stunden} Std. befreiter Arbeitszeit und einem durchschnittlichen Arbeitgeber-MFA-Kostensatz von 25,00 €/Std. inkl. Nebenkosten. Sonstige Anrufanliegen (wie Rezepte) erhalten eine sichere E-Mail-Benachrichtigung und werden datenschutzkonform direkt im Dashboard dokumentiert.
                        </p>
                      </div>

                      {/* COLLAPSIBLE OR NICE TRANSPARENCY REPORT */}
                      <div className="bg-slate-50 rounded-3xl border border-slate-150 overflow-hidden transition-all duration-300">
                        <button
                          type="button"
                          onClick={() => setShowTransparency(!showTransparency)}
                          className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-slate-100/50 transition-colors focus:outline-none cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🔍</span>
                            <span className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                              Transparenz-Bericht: So haben wir gerechnet
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">
                              {showTransparency ? 'Schließen' : 'Einblenden'}
                            </span>
                            <div className="p-1 rounded-full bg-slate-200/50 text-slate-600">
                              {showTransparency ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {showTransparency && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 sm:p-8 pt-0 space-y-4 border-t border-slate-200/50">
                                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                                  Damit Sie unser betriebswirtschaftliches Ergebnis exakt nachvollziehen können, legen wir den exakten mathematischen Rechenweg basierend auf Ihren Praxisdaten offen.
                                </p>

                                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm space-y-4">
                                  <div>
                                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-2 font-sans">Ausgangsdaten Ihrer Praxis</p>
                                    <ul className="space-y-1.5 text-slate-700">
                                      <li>• Geschätztes Anrufvolumen: <strong>{savings.anrufe_tag} Anrufe / Tag</strong></li>
                                      <li>• Arbeitstage: <strong>{savings.workingDays} Tage / Monat</strong></li>
                                      <li>• KI-Abfangrate: <strong>80 %</strong> (pauschale Abfangrate)</li>
                                      <li>• Zeitaufwand pro Anruf: <strong>4 Minuten</strong> (inkl. Nachbearbeitungszeit)</li>
                                      <li>• Arbeitgeber-Stundensatz MFA (inkl. Lohnnebenkosten Stand 2026): <strong>25,00 € / Stunde</strong></li>
                                    </ul>
                                  </div>

                                  <div className="border-t border-slate-100 pt-3">
                                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-3 font-sans">Mathematischer Rechenweg</p>
                                    <ul className="space-y-3 text-slate-700">
                                      <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                        <span className="font-semibold text-slate-900 shrink-0">1. KI-Minuten:</span>
                                        <span className="font-mono text-slate-650 bg-slate-50 px-1.5 py-0.5 rounded text-xs select-all">
                                          {savings.anrufe_tag} * 0.80 * 4 Min * {savings.workingDays} Tage = {savings.ki_minuten} Min. / Monat
                                        </span>
                                      </li>
                                      <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                        <span className="font-semibold text-slate-900 shrink-0">2. Rüstzeit-bereinigter Zeitgewinn MFA:</span>
                                        <span className="font-mono text-slate-650 bg-slate-50 px-1.5 py-0.5 rounded text-xs select-all">
                                          {savings.ki_minuten} Min. / 33 Min. = {savings.zeitgewinn_stunden} Std. / Monat
                                        </span>
                                      </li>
                                      <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                        <span className="font-semibold text-slate-900 shrink-0">3. Budget-Entlastung:</span>
                                        <span className="font-mono text-slate-650 bg-slate-50 px-1.5 py-0.5 rounded text-xs select-all">
                                          {savings.zeitgewinn_stunden} Std. * 25,00 € = {savings.brutto_ersparnis}
                                        </span>
                                      </li>
                                      <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                        <span className="font-semibold text-slate-900 shrink-0">4. Reale Netto-Ersparnis:</span>
                                        <span className="font-mono text-slate-650 bg-slate-50 px-1.5 py-0.5 rounded text-xs select-all">
                                          {savings.brutto_ersparnis} - {savings.systemkosten} € Systemkosten = {savings.netto_ersparnis}
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-emerald-50/60 p-4.5 rounded-xl border border-[#0D9488]/15 text-xs sm:text-sm text-slate-705">
                                  <strong>Betriebswirtschaftlicher Nachweis:</strong> Die entlastete Arbeitszeit entspricht realen <strong>Arbeitgeber-Vollkosten (Tarif 2026)</strong> von 25,- € pro Stunde. Abzüglich der Tarif-Gebühr von <strong>{savings.systemkosten} €</strong> spart Ihre Praxis somit jeden Monat effektiv <strong>{savings.netto_ersparnis} an Netto-Kosten</strong> zurück. Bei Systemkosten von {savings.systemkosten} € entspricht dies einem <strong>ROI von {savings.roi}%</strong> ab dem ersten Tag.
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* 100% DSGVO-konformer Datenschutz */}
                      <div className="bg-slate-950 text-slate-300 rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-900">
                        <h3 className="text-md font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                          🔒 100 % DSGVO-konformer Datenschutz
                        </h3>
                        
                        <div className="space-y-4 text-xs sm:text-[13px] leading-relaxed">
                          <p>
                            <strong className="text-emerald-400 block mb-0.5">Deutscher Server-Standort:</strong> Sämtliche Sprachverarbeitungen und Daten laufen auf hochsicheren Servern in Deutschland.
                          </p>
                          <p>
                            <strong className="text-emerald-400 block mb-0.5">Ärztliche Schweigepflicht:</strong> Das System erfüllt lückenlos alle rechtlichen Vorgaben des Patientengeheimnisses (§ 203 StGB). Patientendaten sind zu jedem Zeitpunkt absolut sicher und verschlüsselt.
                          </p>
                        </div>
                      </div>

                       {/* Restart Button */}
                      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                          type="button"
                          onClick={handleBackToStart}
                          className="w-full sm:w-auto bg-teal-50 hover:bg-teal-100 text-[#0D9488] border border-teal-100 font-bold py-3.5 px-8 rounded-2xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Zurück zur Startseite <ArrowRight size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setAnswers({});
                            setLeadForm({ name: '', praxis: '', email: '', phone: '' });
                          }}
                          className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Check wiederholen
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
                      <span className="text-[10px] font-bold leading-normal text-emerald-400 uppercase tracking-wider block">Analyse &amp; Berechnung aktiv</span>
                      <p className="text-[10.5px] text-slate-300 max-w-[200px] mt-1 leading-tight text-center font-medium">
                        Wird nach Abschluss des Fragebogens live freigeschaltet
                      </p>
                    </div>
                    
                    {/* Blurred background content to visually tease the statistics */}
                    <div className="blur-[3px] select-none pointer-events-none opacity-20 space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Geschätzte Zeiteinsparung</span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-black text-white tracking-tight">51 Std.</span>
                        <span className="text-xs text-slate-400">/ Woche</span>
                      </div>
                      <span className="text-xs text-[#0D9488] font-bold block">✓ Entlastung für Ihr Empfangsteam</span>
                    </div>
                  </div>

                  {/* Dynamic metric 2: Answered properties */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5 font-sans">Erfasste Parameter</span>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Anrufaufkommen:</span>
                        <span className="text-white font-bold text-right font-sans">{answers[1] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Zeitfresser:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1 font-sans">{answers[2] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Stoßzeiten-Fluss:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1 font-sans">{answers[3] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Team-Stressfaktor:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1 font-sans">{answers[4] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Praxissoftware (PVS):</span>
                        <span className="text-white font-bold text-right font-sans">{answers[5] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                        <span className="text-slate-400 font-medium font-sans">Daten-Weg:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1 font-sans">{answers[6] || 'Ausstehend...'}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs pb-1">
                        <span className="text-slate-400 font-medium font-sans">Einsatzzeit:</span>
                        <span className="text-white font-bold text-right max-w-[150px] line-clamp-1 font-sans">{answers[7] || 'Ausstehend...'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Shield Info Badge */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
                  <div className="p-1 px-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Shield size={16} />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Garantiert DSGVO-konform</h4>
                </div>

                <ul className="space-y-3 text-xs text-slate-500 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] shrink-0 mt-1.5" />
                    <span>Verarbeitung ausschließlich auf hochsicheren Servern in Deutschland.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] shrink-0 mt-1.5" />
                    <span>Konform mit KBV-Richtlinien und DSGVO Patientengeheimnis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] shrink-0 mt-1.5" />
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
