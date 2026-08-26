import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MessageSquare, BookOpen, Send, ChevronRight, Sparkles } from 'lucide-react';
import { AuxiAvatar } from './AuxiAvatar';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const FAQS: FAQ[] = [
  {
    id: "FAQ_RAUM_KONFLIKT_01",
    keywords: ["Raum", "Doppelbuchung", "Konflikt", "Sono"],
    question: "Wie verhindert Auxilia, dass ein Untersuchungsraum doppelt belegt wird?",
    answer: "Auxilia überwacht Ihre Ressourcen in Echtzeit. 1. Öffnen Sie die 'Ressourcen-Einstellungen'. 2. Verknüpfen Sie Terminarten fest mit einem Raum. 3. Auxilia blockiert den Raum automatisch bei Buchung. Ist er belegt, wird der Slot Patienten gar nicht erst angeboten."
  },
  {
    id: "FAQ_GERAET_WARTUNG_02",
    keywords: ["Defekt", "Wartung", "Sperren", "Gerät"],
    question: "Ein Gerät ist defekt. Wie sperre ich die Termine sofort?",
    answer: "Um Ausfälle zu managen: 1. Gehen Sie zu 'Ressourcen'. 2. Wählen Sie das Gerät aus. 3. Setzen Sie den Status auf 'Wartung' und geben Sie den Zeitraum an. Auxilia stoppt sofort alle Online-Buchungen und markiert bestehende Termine rot zum Umplanen."
  },
  {
    id: "FAQ_MULTIRESOURCE_03",
    keywords: ["Labor", "MFA", "Blutentnahme", "Personal"],
    question: "Ein Termin benötigt Raum UND MFA-Unterstützung. Wie stelle ich das ein?",
    answer: "Nutzen Sie 'Ketten-Abhängigkeiten': 1. Wählen Sie die Terminart (z.B. Blutentnahme). 2. Fügen Sie unter Ressourcenbedarf sowohl 'Raum: Labor' als auch 'Personal: MFA-Pool' hinzu. Auxilia gibt den Slot nur frei, wenn beides verfügbar ist."
  },
  {
    id: "FAQ_ONBOARD_01",
    keywords: ["Einrichtung", "Assistentin", "Abbruch", "Fortsetzen"],
    question: "Ich habe den Einrichtungs-Assistenten geschlossen. Sind meine Daten weg?",
    answer: "Nein. Alle Eingaben werden automatisch gespeichert. 1. Klicken Sie im Dashboard oben rechts auf das Auxilia-Icon. 2. Wählen Sie 'Einrichtung fortsetzen'. Sie springen genau an den Punkt zurück, an dem Sie aufgehört haben."
  }
];

export const SupportAssistant: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Typewriter effect logic
  useEffect(() => {
    if (selectedFaq) {
      setDisplayedAnswer('');
      let i = 0;
      const text = selectedFaq.answer;
      
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      
      typewriterRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayedAnswer(prev => prev + text.charAt(i));
          i++;
        } else {
          if (typewriterRef.current) clearInterval(typewriterRef.current);
        }
      }, 20);
    }
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, [selectedFaq]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-[9999] overflow-hidden flex flex-col max-h-[600px]"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <AuxiAvatar size="xs" isSpeaking={true} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Auxilia Support</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">FAQ & Hilfe-Assistent</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Wie kann ich Ihnen helfen?"
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedFaq(null);
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedFaq ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedFaq(null)}
                  className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:text-teal-700 transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} className="rotate-180" /> Zurück zur Übersicht
                </button>
                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">{selectedFaq.question}</h4>
                  <div className="text-slate-700 text-sm leading-relaxed min-h-[60px]">
                    {displayedAnswer}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1.5 h-4 bg-teal-500 ml-1 translate-y-0.5"
                    />
                  </div>
                </div>
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-start gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <Sparkles size={16} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-sky-900 uppercase tracking-tight mb-1">Tipp von Auxilia</p>
                    <p className="text-xs text-sky-800 leading-relaxed">Wussten Sie, dass Sie Ressourcen auch zeitlich begrenzt sperren können? Das ist ideal für Fortbildungen.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Häufige Fragen</p>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map(faq => (
                    <button
                      key={faq.id}
                      onClick={() => setSelectedFaq(faq)}
                      className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all group cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-teal-100 transition-colors">
                          <BookOpen size={14} className="text-slate-500 group-hover:text-teal-600" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium leading-tight">{faq.question}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500 transition-colors shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search size={20} className="text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Keine passenden FAQs gefunden.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-teal-600 font-bold mt-2 hover:underline cursor-pointer"
                    >
                      Alle anzeigen
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Input Mock */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-9 bg-slate-100 rounded-lg flex items-center px-3 text-slate-400 text-xs italic">
                Noch Fragen? Schreiben Sie uns...
              </div>
              <button className="h-9 w-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 cursor-not-allowed">
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SupportFloatingButton: React.FC<{ onClick: () => void; isOpen: boolean }> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-[9998] flex items-center gap-3 pl-4 pr-2 py-2 rounded-full shadow-2xl transition-all group cursor-pointer ${
        isOpen 
          ? 'bg-slate-800 text-white' 
          : 'bg-white text-slate-900 border border-slate-200 hover:border-[#0D9488]'
      }`}
    >
      <span className="text-xs font-bold tracking-tight">Hilfe & FAQ</span>
      <div className={`relative ${isOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`}>
        {isOpen ? (
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            <X size={20} />
          </div>
        ) : (
          <div className="p-0.5 bg-gradient-to-tr from-teal-500 to-sky-500 rounded-full shadow-lg">
             <div className="bg-white rounded-full p-0.5">
               <AuxiAvatar size="sm" isSpeaking={!isOpen} showBadge={false} />
             </div>
          </div>
        )}
      </div>
    </motion.button>
  );
};
