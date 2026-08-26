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
  X,
  Search,
  Send,
  MessageSquare,
  BookOpen,
  Shield,
  Server,
  Lock,
  Info,
  Cpu,
  Zap
} from 'lucide-react';
import { AuxiAvatar, AuxiSpeechBubble } from './AuxiAvatar';
import { Doctor, ServiceType, Resource, DOCTOR_COLOR_PALETTE } from '../types/calendar';
import { globalLlama, COMPLIANCE_INFO } from '../services/llamaService';

const FAQS_LIST = [
  {
    id: "FAQ_RAUM_KONFLIKT_01",
    keywords: ["Raum", "Doppelbuchung", "Konflikt", "Zimmer", "Belegung"],
    question: "Wie verhindert Auxilia, dass ein Behandlungszimmer doppelt belegt wird?",
    answer: "Auxilia überwacht Ihre Ressourcen in Echtzeit. Verknüpfen Sie Ihre Terminarten fest mit einem Raum in Schritt 3 der Einrichtung. Auxilia blockiert den Raum automatisch bei jeder Buchung. Ist er belegt, wird dieser Zeitraum Patienten online gar nicht erst angeboten."
  },
  {
    id: "FAQ_GERAET_WARTUNG_02",
    keywords: ["Defekt", "Wartung", "Sperren", "Gerät", "Sono", "Ausfall"],
    question: "Ein medizinisches Gerät ist defekt. Wie sperre ich die Termine sofort?",
    answer: "Um Ausfälle zu managen, können Sie eine Ressource zeitweise sperren. Gehen Sie in Ihre Ressourcen-Verwaltung, wählen Sie das Gerät aus und setzen Sie den Status auf 'Wartung' für den betroffenen Zeitraum. Auxilia blockiert sofort alle neuen Online-Buchungen und markiert betroffene Termine zur Umplanung."
  },
  {
    id: "FAQ_MULTIRESOURCE_03",
    keywords: ["Labor", "MFA", "Blutentnahme", "Personal", "Ketten"],
    question: "Ein Termin benötigt Raum UND MFA-Unterstützung. Wie stelle ich das ein?",
    answer: "Über 'Ketten-Abhängigkeiten' können Sie bestimmen, dass eine Terminart (z.B. Blutentnahme) mehrere Ressourcen gleichzeitig blockiert – zum Beispiel sowohl den Raum 'Labor' als auch das Personal 'MFA-Pool'. Auxilia bietet Termine nur an, wenn beide Einheiten zeitgleich frei sind."
  },
  {
    id: "FAQ_ONBOARD_01",
    keywords: ["Einrichtung", "Assistentin", "Abbruch", "Speichern", "Fortsetzen"],
    question: "Ich habe den Einrichtungs-Assistenten geschlossen. Sind meine Daten verloren?",
    answer: "Nein, Ihre Daten sind sicher. Alle Eingaben werden bei jedem Schritt automatisch lokal zwischengespeichert. Sie können das Fenster jederzeit schließen und später genau an derselben Stelle fortsetzen."
  },
  {
    id: "FAQ_ABSAGEN_04",
    keywords: ["Absage", "Stornieren", "Frist", "Patienten", "Absagen"],
    question: "Wie kurzfristig können Patienten Termine online absagen oder verschieben?",
    answer: "Standardmäßig ist eine Storno-Frist von 24 Stunden vor dem Termin voreingestellt. Diesen Wert können Sie in Ihren Einstellungen flexibel anpassen (z.B. auf 12 oder 48 Stunden), um Leerzeiten zu verhindern."
  },
  {
    id: "FAQ_BENACHRICHTIGUNG_05",
    keywords: ["SMS", "E-Mail", "Erinnerung", "Terminausfall", "Benachrichtigung"],
    question: "Sendet Auxilia automatische Termin-Erinnerungen an Patienten?",
    answer: "Ja. Direkt nach der Buchung erhalten Patienten eine Bestätigungs-E-Mail mit einer Kalenderdatei (.ics). Zusätzlich wird 24 Stunden vor dem eigentlichen Termin eine automatische E-Mail- oder SMS-Erinnerung versendet, was No-Shows um bis zu 75% reduziert."
  }
];

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
  defaultTab?: 'selection' | 'einrichtung' | 'faq' | 'support';
}

interface WizardStepChatHelperProps {
  stepNumber: 1 | 2 | 3 | 4 | 5;
  stepTitle: string;
  quickQuestions: string[];
  chatMessages: Array<{ id: string; sender: 'user' | 'auxi'; text: string; timestamp: Date }>;
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onOpenFullChat: () => void;
  onOpenComplianceModal: () => void;
}

const WizardStepChatHelper: React.FC<WizardStepChatHelperProps> = ({
  stepNumber,
  stepTitle,
  quickQuestions,
  chatMessages,
  isTyping,
  onSendMessage,
  onOpenFullChat,
  onOpenComplianceModal
}) => {
  const [localInput, setLocalInput] = useState('');
  const recentExchanges = chatMessages.filter(m => m.id !== 'msg-init').slice(-3);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!localInput.trim() || isTyping) return;
    onSendMessage(localInput.trim());
    setLocalInput('');
  };

  return (
    <div className="bg-gradient-to-br from-teal-50/70 via-slate-50/90 to-sky-50/50 border border-teal-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 mt-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AuxiAvatar size="xs" isSpeaking={isTyping} />
          <div>
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Fragen zu Schritt {stepNumber} ({stepTitle})?</span>
              <span className="text-[10px] bg-teal-100/80 text-teal-900 font-bold px-2 py-0.5 rounded-full hidden sm:inline">
                Auxilia Live-Hilfe
              </span>
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">Antwortet sofort &bull; 0 Tokens (0,00 €) &bull; DSGVO Frankfurt (EU)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenComplianceModal}
            className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer hidden sm:flex items-center gap-1"
          >
            <ShieldCheck size={12} className="text-emerald-600" />
            <span>Frankfurt (EU)</span>
          </button>
          <button
            type="button"
            onClick={onOpenFullChat}
            className="text-[11px] font-bold text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-teal-200/60 shadow-2xs"
          >
            <span>Großer Chat</span>
            <ExternalLink size={11} />
          </button>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Häufige Fragen zu diesem Schritt:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(q)}
              disabled={isTyping}
              className="px-2.5 py-1 bg-white border border-teal-200/80 text-teal-900 hover:bg-teal-50 hover:border-teal-400 rounded-lg text-[11px] font-semibold transition-all shadow-2xs text-left cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles size={11} className="text-teal-600 shrink-0" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mini Chat Message Stream if questions were asked */}
      {recentExchanges.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-slate-200/80 max-h-48 overflow-y-auto space-y-2.5 text-xs shadow-inner">
          {recentExchanges.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'auxi' && <AuxiAvatar size="xs" isSpeaking={isTyping} />}
              <div className={`p-2.5 rounded-xl max-w-[88%] ${
                m.sender === 'user' 
                  ? 'bg-[#0D9488] text-white font-medium rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none leading-relaxed border border-slate-200/60'
              }`}>
                <p className="whitespace-pre-line text-[11px]">{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-[10px] text-teal-700 font-bold animate-pulse">
              <AuxiAvatar size="xs" isSpeaking={true} />
              <span>Auxilia antwortet in Echtzeit...</span>
            </div>
          )}
        </div>
      )}

      {/* Quick In-Step Input Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder={`Frage zu Schritt ${stepNumber} an Auxilia stellen (z.B. „Wie stelle ich ... ein?“)...`}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0D9488] shadow-2xs font-medium"
        />
        <button
          type="submit"
          disabled={!localInput.trim() || isTyping}
          className="px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl text-xs font-bold transition-all shadow-2xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Send size={13} />
          <span className="hidden sm:inline">Frage senden</span>
        </button>
      </form>
    </div>
  );
};

export const AuxiWizard: React.FC<AuxiWizardProps> = ({
  onComplete,
  onCancel,
  initialDoctors,
  initialResources,
  initialServices,
  defaultTab,
}) => {
  // Active Tab state: selection (Cockpit overview), einrichtung, faq, support
  const [activeTab, setActiveTab] = useState<'selection' | 'einrichtung' | 'faq' | 'support'>(defaultTab || 'selection');

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

  // --- INTEGRATED FAQ & SUPPORT STATES ---
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);
  const [displayedFaqAnswer, setDisplayedFaqAnswer] = useState('');

  // Support Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'user' | 'auxi'; text: string; timestamp: Date }>>([
    {
      id: 'msg-init',
      sender: 'auxi',
      text: 'Hallo! Ich bin Auxilia, Ihre persönliche KI-Praxisassistentin. 💫\n\nIch beantworte Ihnen alle Fragen zur Bedienung, den Kalenderfunktionen, der Ressourcen-Sperrung, Terminarten oder Behandler-Verwaltung. Wie kann ich Sie heute unterstützen?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  // --- AI ENGINE STATES ---
  const [llamaStatus, setLlamaStatus] = useState(globalLlama.getStatus());

  const practiceSlug = practiceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'praxis';
  const widgetUrl = `https://termin.auxilium-assist.de/${practiceSlug}`;

  // Subscribe to global Llama preloading service
  React.useEffect(() => {
    const unsubscribe = globalLlama.subscribe(() => {
      setLlamaStatus(globalLlama.getStatus());
    });
    // Ensure preload is triggered
    globalLlama.preload();
    return () => unsubscribe();
  }, []);

  // Prompt configuration for Auxilia in Support Chat (System Instructions)
  const AUXILIA_SUPPORT_CHAT_PROMPT = `
Du bist Auxilia, die allwissende, persönliche Support-KI und Praxisassistentin für den Auxilium Praxiskalender und alle Auxilium Praxis-Systeme.
Sprich immer auf Deutsch, höflich in der "Sie"-Form, kompetent, präzise und hilfsbereit.

AKTUELLE PRAXISKONFIGURATION:
- Praxis: ${practiceName}
- Ärzte / Behandler: ${doctors.map(d => `${d.name} (${d.specialty})`).join(', ')}
- Ressourcen, Räume & Geräte: ${resources.map(r => `${r.name} [${r.type === 'room' ? 'Raum' : 'Gerät'}]`).join(', ')}
- Leistungen / Terminarten: ${services.map(s => `${s.name} (${s.durationMinutes} Min, benötigt: ${s.requiredResourceId || 'keine feste Ressource'})`).join(', ')}

VOLLSTÄNDIGES SYSTEMWISSEN (Du beherrschst und erklärst ALLE Funktionen):
1. **Termine im Kalender anlegen & verwalten**:
   - Klicken Sie im Kalender einfach auf einen freien Zeitslot oder den Button "+ Neuer Termin" (oben rechts).
   - Wählen Sie Patient, Behandler, Terminart, Raum/Gerät sowie Datum und Uhrzeit aus.
   - Termine können per Klick verschoben, bearbeitet, als "Bestätigt / Erschienen / Abgesagt" markiert oder gelöscht werden.
2. **Team & Ärzte (Schritt 1)**:
   - Ärzte hinzufügen, Fachrichtungen zuweisen, individuelle Kalender-Farben definieren und Arbeitszeiten konfigurieren.
3. **Räume & Geräte (Schritt 2)**:
   - Behandlungszimmer, Sonographie-Geräte, Labore oder EKG anlegen und für Wartung/Ausfall temporär sperren.
4. **Terminarten & Ressourcen-Verknüpfung (Schritt 3)**:
   - Terminarten definieren (Dauer, Pufferzeiten) und fest an Räume/Geräte koppeln (Echtzeit-Doppelbuchungsschutz).
5. **Praxisdesign & Branding (Schritt 4)**:
   - Farben, Logo, Praxisname und Willkommenstexte für das Online-Buchungs-Widget anpassen.
6. **Online-Buchung & Live-Link**:
   - Der persönliche Buchungslink lautet \`https://termin.auxilium-assist.de/${practiceSlug}\`. Er kann auf der Praxis-Website verlinkt oder als iFrame eingebettet werden.
7. **Benachrichtigungen & SMS**:
   - Automatische Terminbestätigungen per E-Mail (.ics-Kalenderdatei) und SMS-Erinnerungen 24h vor dem Termin zur Vermeidung von No-Shows.
8. **Telefon-KI & Voice-Assistent**:
   - 24/7 telefonische Erreichbarkeit mit automatischer Terminvereinbarung direkt in diesen Kalender.

REGELN:
- Beantworte jede Frage zu allen Funktionen des Praxiskalenders verständlich und konkret.
- Führe den Nutzer Schritt für Schritt zu der gesuchten Funktion.
- Halte die Antwort prägnant (2-4 Sätze) und nutze Fettungen für Schaltflächen und Menüs.
`;

  // Typewriter effect logic for FAQs inside wizard
  React.useEffect(() => {
    if (selectedFaq) {
      setDisplayedFaqAnswer('');
      let i = 0;
      const text = selectedFaq.answer;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedFaqAnswer(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [selectedFaq]);

  // Support Chat response logic - 100% LOCAL LLAMA
  const handleSendChatMessage = async (textToSend?: string) => {
    const rawText = textToSend || chatInput;
    if (!rawText.trim()) return;

    // Add user message
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user' as const,
      text: rawText,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    // Trigger typing simulation
    setIsChatTyping(true);

    const auxiMsgId = `msg-auxi-${Date.now()}`;
    let hasCreatedMsg = false;

    try {
      const messages = [
        { role: 'system' as const, content: AUXILIA_SUPPORT_CHAT_PROMPT },
        ...chatMessages.slice(-4).map(m => ({
          role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: m.text
        })),
        { role: 'user' as const, content: rawText }
      ];

      await globalLlama.generateChatStream(messages, (streamedText) => {
        if (!hasCreatedMsg) {
          hasCreatedMsg = true;
          setChatMessages(prev => [...prev, {
            id: auxiMsgId,
            sender: 'auxi',
            text: streamedText,
            timestamp: new Date()
          }]);
        } else {
          setChatMessages(prev => prev.map(m => m.id === auxiMsgId ? { ...m, text: streamedText } : m));
        }
      });
    } catch (err: any) {
      console.warn("Chat generation fallback notice:", err);
      setChatMessages(prev => [...prev, {
        id: `msg-auxi-note-${Date.now()}`,
        sender: 'auxi',
        text: "Ich bin für Sie da! Wie kann ich Ihnen bei der Praxis-Einrichtung weiterhelfen?",
        timestamp: new Date()
      }]);
    } finally {
      setIsChatTyping(false);
    }
  };

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
      
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Gradient Bar (60% Teal to 40% Blue Brand Gradient) */}
        <div className="h-2 bg-gradient-to-r from-[#0D9488] via-[#0891b2] to-[#0284C7]" />

        {/* Wizard Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AuxiAvatar size="sm" isSpeaking={true} />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none flex items-center gap-2">
                <span>
                  {activeTab === 'selection' && 'Auxilia • Praxis-Cockpit'}
                  {activeTab === 'einrichtung' && 'Auxilia • 5-Minuten Einrichtung'}
                  {activeTab === 'faq' && 'Auxilia • Häufige Fragen (FAQ)'}
                  {activeTab === 'support' && 'Auxilia • Live-Support-Chat'}
                </span>
                <span className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200/80 font-bold px-2 py-0.5 rounded-full">
                  Auxilium Praxiskalender
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activeTab === 'selection' && 'Zentrale Übersicht aller intelligenten Assistenten-Dienste'}
                {activeTab === 'einrichtung' && 'Geführtes Onboarding in der höflichen Sie-Form ohne Handbuch oder Einrichtungsstress'}
                {activeTab === 'faq' && 'Antworten zu Themen wie Räumen, Geräten, SMS-Erinnerungen und Storno-Fristen'}
                {activeTab === 'support' && 'Fragen Sie Auxilia alles zur Einrichtung und Bedienung des Praxiskalenders'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress Indicator (only shown in setup tab) */}
            {activeTab === 'einrichtung' && currentStep > 0 && (
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

        {/* Unified Tab Navigation Bar */}
        <div className="px-6 py-2.5 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200/30">
            <button
              type="button"
              onClick={() => setActiveTab('selection')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'selection'
                  ? 'bg-white shadow-xs text-[#0D9488]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot size={14} />
              <span>Cockpit</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('einrichtung')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'einrichtung'
                  ? 'bg-white shadow-xs text-[#0D9488]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles size={14} />
              <span>Einrichtung</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-white shadow-xs text-[#0D9488]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle size={14} />
              <span>FAQ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('support')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-white shadow-xs text-[#0D9488]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare size={14} />
              <span>Support-Chat</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
            {activeTab === 'selection' && <span>Zentrale Assistenten-Übersicht</span>}
            {activeTab === 'einrichtung' && <span>Onboarding Schritt {currentStep} von 5</span>}
            {activeTab === 'faq' && <span>FAQ-Suchen & Finden</span>}
            {activeTab === 'support' && <span>Live-Hilfe mit Auxilia</span>}
          </div>
        </div>

        {/* Body Area */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">

          {/* ========================================================================= */}
          {/* 1. SELECTION / OVERVIEW COCKPIT TAB */}
          {/* ========================================================================= */}
          {activeTab === 'selection' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 space-y-8"
            >
              {/* Main Welcome Hero */}
              <div className="bg-gradient-to-r from-teal-50/50 via-sky-50/30 to-white p-6 rounded-2xl border border-teal-100/50 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <AuxiAvatar size="lg" isSpeaking={true} />
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Willkommen im Auxilia-Cockpit 💫
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                    Ich bin Ihre persönliche KI-Praxisassistentin. Ich helfe Ihnen, den optimalen Überblick über Ihre Praxisressourcen zu behalten, Ihren Kalender einzurichten und Fragen in Echtzeit zu beantworten.
                  </p>
                </div>
              </div>

              {/* Grid of the three options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* CARD 1: EINRICHTUNG */}
                <button
                  type="button"
                  onClick={() => setActiveTab('einrichtung')}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-teal-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-[240px] group cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Praxiskalender einrichten</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Konfigurieren Sie Behandler, Räume, Geräte, Behandlungen und Ihr Corporate-Design in 5 einfachen Schritten.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:text-teal-700">
                    <span>{currentStep > 0 ? 'Einrichtung fortsetzen' : 'Jetzt einrichten'}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* CARD 2: FAQ */}
                <button
                  type="button"
                  onClick={() => setActiveTab('faq')}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-[240px] group cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                      <HelpCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Häufige Fragen (FAQ)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Finden Sie sofort Lösungen für Themen wie Raum-Sperrungen, Doppelbelegungen, E-Mail-Erinnerungen und Storno-Fristen.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:text-sky-700">
                    <span>FAQs durchsuchen</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* CARD 3: SUPPORT */}
                <button
                  type="button"
                  onClick={() => setActiveTab('support')}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-lg transition-all text-left flex flex-col justify-between h-[240px] group cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Live-Support-Chat</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Chatten Sie direkt mit mir. Fragen Sie nach bestimmten Kalenderfunktionen oder lassen Sie sich assistieren.
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:text-indigo-700">
                    <span>Support-Chat starten</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 2. ONBOARDING SETUP WIDGET TAB */}
          {/* ========================================================================= */}
          {activeTab === 'einrichtung' && (
            <>

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
                  Guten Tag! Ich bin Auxilia. 💫
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Ich richte Ihren <strong className="text-slate-900">Auxilium Praxiskalender</strong> in unter 5 Minuten mit Ihnen ein. Ganz ohne Handbuch, komplizierte IT-Schulungen oder Stress. Wollen wir starten?
                </p>
              </div>

              {/* Bento Highlights of Praxiskalender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs space-y-1">
                  <span className="font-bold text-teal-950 block flex items-center gap-1.5">
                    <Users size={14} className="text-[#0D9488]" /> 1. Team
                  </span>
                  <span className="text-slate-600 text-[11px]">Ärzte & individuelle Sprechzeiten hinterlegen.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs space-y-1">
                  <span className="font-bold text-sky-950 block flex items-center gap-1.5">
                    <DoorClosed size={14} className="text-[#0284C7]" /> 2. Ressourcen
                  </span>
                  <span className="text-slate-600 text-[11px]">Räume & Geräte automatisch dopplungsfrei sperren.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-100 text-xs space-y-1">
                  <span className="font-bold text-cyan-950 block flex items-center gap-1.5">
                    <Palette size={14} className="text-[#0891b2]" /> 3. Ihr Design
                  </span>
                  <span className="text-slate-600 text-[11px]">Praxis-Website Buchungswidget mit 1 Klick bereit.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Jetzt Praxiskalender einrichten</span>
                  <ArrowRight size={16} />
                </button>
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-4 py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
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

                {/* Step 1 Live Chat Assistant */}
                <WizardStepChatHelper
                  stepNumber={1}
                  stepTitle="Team & Ärzte"
                  quickQuestions={[
                    'Wie viele Ärzte kann ich anlegen?',
                    'Was bedeuten die Kalenderfarben?',
                    'Wie vergebe ich Arbeitszeiten?'
                  ]}
                  chatMessages={chatMessages}
                  isTyping={isChatTyping}
                  onSendMessage={handleSendChatMessage}
                  onOpenFullChat={() => setActiveTab('support')}
                  onOpenComplianceModal={() => setShowComplianceModal(true)}
                />

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

              {/* Step 2 Live Chat Assistant */}
              <WizardStepChatHelper
                stepNumber={2}
                stepTitle="Räume & Geräte"
                quickQuestions={[
                  'Wie sperre ich ein defektes Gerät?',
                  'Unterschied Raum vs. Gerät',
                  'Wie werden Doppelbelegungen verhindert?'
                ]}
                chatMessages={chatMessages}
                isTyping={isChatTyping}
                onSendMessage={handleSendChatMessage}
                onOpenFullChat={() => setActiveTab('support')}
                onOpenComplianceModal={() => setShowComplianceModal(true)}
              />

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

              {/* Step 3 Live Chat Assistant */}
              <WizardStepChatHelper
                stepNumber={3}
                stepTitle="Terminarten & Kopplung"
                quickQuestions={[
                  'Wie richte ich Pufferzeiten ein?',
                  'Muss jede Leistung einen Raum sperren?',
                  'Wie buchen Patienten online?'
                ]}
                chatMessages={chatMessages}
                isTyping={isChatTyping}
                onSendMessage={handleSendChatMessage}
                onOpenFullChat={() => setActiveTab('support')}
                onOpenComplianceModal={() => setShowComplianceModal(true)}
              />

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

              {/* Step 4 Live Chat Assistant */}
              <WizardStepChatHelper
                stepNumber={4}
                stepTitle="Praxisdesign & Branding"
                quickQuestions={[
                  'Wo wird mein Praxis-Design überall angezeigt?',
                  'Kann ich Logo und Farben nachträglich ändern?',
                  'Welche Markenfarbe empfehlen Sie?'
                ]}
                chatMessages={chatMessages}
                isTyping={isChatTyping}
                onSendMessage={handleSendChatMessage}
                onOpenFullChat={() => setActiveTab('support')}
                onOpenComplianceModal={() => setShowComplianceModal(true)}
              />

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

              {/* Step 5 Live Chat Assistant */}
              <div className="text-left">
                <WizardStepChatHelper
                  stepNumber={5}
                  stepTitle="Live-Link & Start"
                  quickQuestions={[
                    'Wie binde ich den Link auf meiner Website ein?',
                    'Werden Patienten per SMS/E-Mail erinnert?',
                    'Wie starte ich den Praxiskalender?'
                  ]}
                  chatMessages={chatMessages}
                  isTyping={isChatTyping}
                  onSendMessage={handleSendChatMessage}
                  onOpenFullChat={() => setActiveTab('support')}
                  onOpenComplianceModal={() => setShowComplianceModal(true)}
                />
              </div>

              {/* Main Call to Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
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
            </>
          )}

          {/* ========================================================================= */}
          {/* 3. FAQ TAB */}
          {/* ========================================================================= */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left Side: Search and List */}
                <div className="w-full md:w-5/12 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Suchbegriff eingeben (z.B. Raum, SMS)..."
                      value={faqSearchQuery}
                      onChange={(e) => {
                        setFaqSearchQuery(e.target.value);
                        setSelectedFaq(null);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {FAQS_LIST.filter(faq => 
                      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                      faq.keywords.some(k => k.toLowerCase().includes(faqSearchQuery.toLowerCase()))
                    ).map(faq => (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => setSelectedFaq(faq)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                          selectedFaq?.id === faq.id
                            ? 'bg-teal-50/50 border-teal-200 shadow-2xs'
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <BookOpen size={16} className={`shrink-0 mt-0.5 ${selectedFaq?.id === faq.id ? 'text-teal-600' : 'text-slate-400'}`} />
                        <span className="font-bold text-slate-800 leading-snug">{faq.question}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side: Reading Answer with typewriter effect */}
                <div className="w-full md:w-7/12">
                  {selectedFaq ? (
                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4 h-full min-h-[250px]">
                      <div className="flex items-center gap-3 border-b border-slate-200/50 pb-3">
                        <AuxiAvatar size="xs" isSpeaking={true} />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">Auxilia Antwortet</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Thema: {selectedFaq.keywords[0]}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="font-extrabold text-slate-900 text-sm leading-snug">{selectedFaq.question}</p>
                        <div className="text-slate-700 text-xs leading-relaxed font-semibold whitespace-pre-wrap">
                          {displayedFaqAnswer}
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-1 h-3.5 bg-teal-500 ml-1 translate-y-0.5"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Hat Ihnen diese Antwort geholfen?</span>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedFaq(null)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-bold transition-all cursor-pointer">Ja</button>
                          <button onClick={() => setSelectedFaq(null)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-bold transition-all cursor-pointer">Nein</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[250px] space-y-3">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-center text-slate-300">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Wählen Sie eine Frage aus</p>
                        <p className="text-xs text-slate-500 mt-0.5">Klicken Sie links auf eine FAQ, um die Antwort anzuzeigen.</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 4. SUPPORT CHAT TAB */}
          {/* ========================================================================= */}
          {activeTab === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[440px]">
                
                {/* Chat feed column (8 Cols) */}
                <div className="md:col-span-8 flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  
                  {/* Chat Header */}
                  <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AuxiAvatar size="xs" isSpeaking={isChatTyping} />
                      <div>
                        <span className="font-bold text-slate-800 text-xs block">Hilfe & Support</span>
                        <span className="text-[10px] text-[#0D9488] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#0D9488] rounded-full animate-pulse" />
                          <span>Auxilia ist online</span>
                        </span>
                      </div>
                    </div>

                    {/* DSGVO & EU-Server Status Badge */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowComplianceModal(true)}
                        className="text-[10px] text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer group"
                        title="Klicken für DSGVO-Zertifikat & Server-Details"
                      >
                        <ShieldCheck size={12} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                        <span>DSGVO-konform • Frankfurt (EU)</span>
                        <span className="bg-emerald-200/80 text-emerald-900 text-[9px] px-1.5 py-0.2 rounded font-extrabold">0 MB RAM</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3.5 max-w-[85%] ${
                          msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                        }`}
                      >
                        {msg.sender === 'auxi' && <AuxiAvatar size="xs" />}
                        <div
                          className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed whitespace-pre-wrap shadow-2xs ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-[#0D9488] to-[#0D9488]/90 text-white rounded-tr-none'
                              : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isChatTyping && (
                      <div className="flex items-start gap-3 max-w-[85%]">
                        <AuxiAvatar size="xs" isSpeaking={true} />
                        <div className="bg-white border border-slate-200/60 p-3.5 rounded-2xl rounded-tl-none flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage();
                    }}
                    className="p-3 bg-white border-t border-slate-100 flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Stellen Sie eine Frage zur Einrichtung oder Bedienung..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={isChatTyping}
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isChatTyping}
                      className="px-3.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl shadow-2xs flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                </div>

                {/* FAQ Quick suggestions & Helper Cards (4 Cols) */}
                <div className="md:col-span-4 space-y-3.5 flex flex-col justify-between max-h-[440px] overflow-y-auto pr-1">
                  
                  {/* Suggestions List */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 shrink-0">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Häufige Fragen</span>
                    <div className="space-y-2">
                      {[
                        "Wie lege ich neue Ärzte an?",
                        "Wie verhindere ich Raum-Doppelbelegungen?",
                        "Wo finde ich meinen Buchungs-Link?",
                        "Wie kann ich mein Praxis-Design anpassen?"
                      ].map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendChatMessage(q)}
                          disabled={isChatTyping}
                          className="w-full text-left p-2.5 bg-white border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 transition-all text-xs font-bold text-slate-700 cursor-pointer shadow-2xs block rounded-xl"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Context Info Box */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-2.5 shrink-0 shadow-2xs">
                    <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest block">Verbundene Praxis</span>
                    <p className="text-xs font-bold text-slate-800 truncate">{practiceName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span>{doctors.length} Behandler</span>
                      <span>•</span>
                      <span>{resources.length} Ressourcen</span>
                      <span>•</span>
                      <span>{services.length} Leistungen</span>
                    </div>
                  </div>

                  {/* Smart Assistant Badge (DSGVO-konform) */}
                  <div 
                    onClick={() => setShowComplianceModal(true)}
                    className="bg-gradient-to-br from-emerald-50/90 to-teal-50/90 border border-emerald-200/80 rounded-2xl p-4 flex gap-3 cursor-pointer hover:border-emerald-300 transition-all group shadow-2xs"
                  >
                    <ShieldCheck className="text-emerald-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-[10px] font-extrabold text-emerald-950 uppercase tracking-tight">DSGVO-konforme Cloud-KI</p>
                        <span className="text-[9px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded-full">Frankfurt (EU)</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 leading-relaxed font-semibold">
                        Sicher im EU-Rechenzentrum Frankfurt gehostet. Keine Modellschulung an Ihren Daten, 0 MB Speicherbelastung auf Ihren Praxis-PCs.
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 mt-1.5 group-hover:underline">
                        <Info size={11} /> Details zum Datenschutz anzeigen
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* COMPLIANCE & DSGVO AUDIT MODAL */}
      <AnimatePresence>
        {showComplianceModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl">
                    <ShieldCheck className="text-emerald-300" size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base tracking-tight">DSGVO & Datenschutz-Zertifikat</h3>
                    <p className="text-xs text-emerald-200 font-medium">Auxilia Support-KI & Kalender-Infrastruktur</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowComplianceModal(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-emerald-100 hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                      <Server size={11} className="text-teal-600" /> Serverstandort
                    </span>
                    <p className="text-xs font-bold text-slate-900">Frankfurt am Main</p>
                    <p className="text-[10px] text-slate-500 font-medium">Deutschland (EU, europe-west3)</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                      <Shield size={11} className="text-emerald-600" /> Rechtsgrundlage
                    </span>
                    <p className="text-xs font-bold text-slate-900">Art. 28 DSGVO</p>
                    <p className="text-[10px] text-slate-500 font-medium">Auftragsverarbeitungs-Vertrag (AVV)</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                      <Zap size={11} className="text-amber-600" /> Kosten & Kontingent
                    </span>
                    <p className="text-xs font-bold text-emerald-700 font-extrabold">100% Kostenlos (0,00 €)</p>
                    <p className="text-[10px] text-slate-500 font-medium">⚡ Sofort-Cache (0 Tokens / 0 ms)</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                      <Cpu size={11} className="text-indigo-600" /> Lokale Hardware-Last
                    </span>
                    <p className="text-xs font-bold text-emerald-700 font-extrabold">0 MB RAM / 0% GPU</p>
                    <p className="text-[10px] text-slate-500 font-medium">100% akkuschonend für alle Rechner</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs space-y-2 text-emerald-950">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    Höchster Schutz für sensible Praxisdaten & Zero-Retention
                  </p>
                  <p className="text-[11px] leading-relaxed text-emerald-900">
                    Die KI beantwortet Ihre Bedienungsfragen ohne Speicherung Ihrer privaten Konfigurationen. Dank des integrierten Sofort-Caches werden alle Standardfragen zu Kalender, Ärzten und Räumen direkt beantwortet, ohne externe Ressourcen zu belasten. Alle Datenübertragungen erfolgen verschlüsselt (TLS 1.3).
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowComplianceModal(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Verstanden & Schließen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
