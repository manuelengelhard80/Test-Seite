import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  X,
  Zap,
  PhoneForwarded,
  Settings
} from 'lucide-react';
import { AuxiAvatar } from './AuxiAvatar';

export interface PhoneAiUpsellBannerProps {
  practiceName?: string;
  onActivate?: () => void;
  onReopenWizard?: () => void;
}

export const PhoneAiUpsellBanner: React.FC<PhoneAiUpsellBannerProps> = ({
  practiceName = 'Ihre Praxis',
  onActivate,
  onReopenWizard,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-teal-50/95 via-sky-50/80 to-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-teal-200/90 relative overflow-hidden font-sans my-2"
    >
      {/* Decorative gentle ambient light circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-sky-200/25 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info with Auxi & Phone AI visual */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative shrink-0">
            <AuxiAvatar size="md" isSpeaking={true} showBadge={false} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0D9488] border-2 border-white shadow-xs flex items-center justify-center text-white">
              <PhoneCall size={10} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold tracking-wide uppercase border border-emerald-200">
                <Sparkles size={11} className="text-emerald-700" /> 14 Tage kostenlos testen
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">Auxilium Telefon-KI Integration</span>
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>🤖 Ihr Praxiskalender steht bereit. Möchten Sie, dass unsere Telefon-KI Ihre Anrufe automatisch hier einbucht?</span>
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              Ihre Räume, Behandler und Behandlungszeiten sind hinterlegt. Aktivieren Sie die Telefon-KI mit einem Klick 14 Tage lang unverbindlich und kostenlos.
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 shrink-0 pt-1 lg:pt-0">
          {isActivated ? (
            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
              <Check size={16} className="text-emerald-600" />
              <span>Telefon-KI für Praxiskalender aktiv!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsActivated(true);
                if (onActivate) onActivate();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneForwarded size={15} />
              <span>Telefon-KI unverbindlich testen</span>
            </button>
          )}

          {onReopenWizard && (
            <button
              type="button"
              onClick={onReopenWizard}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Praxiskalender-Einstellungen mit Auxilia anpassen"
            >
              <Settings size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Schließen"
          >
            <X size={16} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
