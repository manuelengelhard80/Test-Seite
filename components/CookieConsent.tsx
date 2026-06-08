import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, Check, Settings2, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if the user has already saved their choices
    const savedConsent = localStorage.getItem('medicall_cookie_consent_v1');
    if (!savedConsent) {
      // Small timeout for subtle slide-in entry effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allSettings = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('medicall_cookie_consent_v1', JSON.stringify(allSettings));
    setIsVisible(false);
  };

  const handleAcceptMinimal = () => {
    const minimalSettings = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('medicall_cookie_consent_v1', JSON.stringify(minimalSettings));
    setIsVisible(false);
  };

  const handleSaveSelected = () => {
    localStorage.setItem('medicall_cookie_consent_v1', JSON.stringify(settings));
    setIsVisible(false);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === 'essential') return; // Cannot toggle essential cookies
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="gdpr-cookie-consent-bar"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_35px_rgba(0,0,0,0.12)] text-slate-800 dark:text-slate-100"
        >
          {/* Main Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            
            {/* EXPANDABLE SETTINGS PANEL (Shown above the main row if open) */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden border-b border-slate-100 dark:border-slate-800/80 mb-4 pb-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Category 1: Essential */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-950 dark:text-white">
                            Essenziell &amp; Notwendig
                          </span>
                          <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold px-1.5 py-0.5 rounded">
                            Aktiv
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          Erforderlich für Kernfunktionen wie den Praxis-Check und Ihre Produktempfehlungen.
                        </p>
                      </div>
                      <div className="relative inline-flex items-center shrink-0">
                        <input type="checkbox" checked={true} disabled={true} className="sr-only peer" />
                        <div className="w-8 h-4.5 bg-[#0D9488] rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all translate-x-3.5" />
                      </div>
                    </div>

                    {/* Category 2: Analytics */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 select-none cursor-pointer" onClick={() => toggleSetting('analytics')}>
                          <span className="text-xs font-bold text-slate-950 dark:text-white">
                            Analyse &amp; Statistik
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          Ermöglicht uns, die Nutzung anonymisiert zu messen (z.B. Abbruchquoten des Tests) zwecks Optimierung.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 select-none">
                        <input
                          type="checkbox"
                          checked={settings.analytics}
                          onChange={() => toggleSetting('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4.5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0D9488]" />
                      </label>
                    </div>

                    {/* Category 3: Personalisation */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 select-none cursor-pointer" onClick={() => toggleSetting('marketing')}>
                          <span className="text-xs font-bold text-slate-950 dark:text-white">
                            Personalisierung &amp; Produkte
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          Aktiviert Audio-Hörproben der Fachrichtungen und personalisierte Voice Assist &amp; Pulse Angebote.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 select-none">
                        <input
                          type="checkbox"
                          checked={settings.marketing}
                          onChange={() => toggleSetting('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4.5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#0D9488]" />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={handleSaveSelected}
                      className="bg-[#0D9488] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0b7f74] transition-colors cursor-pointer"
                    >
                      Auswahl bestätigen
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(false)}
                      className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 text-xs font-semibold"
                    >
                      Schließen
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HORIZONTAL STREAMLINED MAIN BAR */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Information / Description Column */}
              <div className="flex items-start sm:items-center gap-3 max-w-3xl">
                <div className="p-2 bg-[#0D9488]/10 text-[#0D9488] rounded-xl shrink-0 hidden sm:block">
                  <Cookie size={18} className="animate-pulse" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <h4 className="text-[13px] font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      Privatsphäre &amp; Cookies
                    </h4>
                    <span className="text-[9px] text-[#0D9488] font-bold tracking-widest uppercase inline-flex items-center gap-1">
                      <Shield size={9} strokeWidth={3} /> DSGVO-konform
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                    Wir nutzen Cookies, um Kernfunktionen wie den Praxis-Check und Audio-Anrufbeispiele optimal anzubieten. In unseren{' '}
                    <Link to="/datenschutz" className="underline hover:text-[#0D9488] font-medium">Datenschutzrichtlinien</Link>{' '}
                    erfahren Sie mehr.
                  </p>
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-end lg:self-center">
                
                {/* Settings customisation toggler */}
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 transition-all cursor-pointer"
                >
                  <Settings2 size={13} />
                  <span>Auswahl</span>
                  {showDetails ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                </button>

                {/* Accept Minimalist / Deny Optional Cookies */}
                <button
                  type="button"
                  onClick={handleAcceptMinimal}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Nur Notwendige
                </button>

                {/* Accept All (Primary Action) */}
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="bg-slate-950 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold hover:shadow-md transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-1"
                >
                  <Check size={14} strokeWidth={2.5} />
                  Alle akzeptieren
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
