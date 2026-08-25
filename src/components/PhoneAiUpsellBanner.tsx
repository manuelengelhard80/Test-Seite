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
  PhoneForwarded
} from 'lucide-react';
import { AuxiAvatar } from './AuxiAvatar';

export interface PhoneAiUpsellBannerProps {
  practiceName?: string;
  onActivate?: () => void;
}

export const PhoneAiUpsellBanner: React.FC<PhoneAiUpsellBannerProps> = ({
  practiceName = 'Ihre Praxis',
  onActivate,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="w-full bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-teal-500/30 relative overflow-hidden font-sans my-4">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info with Auxi / Phone AI visual */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative shrink-0">
            <AuxiAvatar size="md" isSpeaking={true} showBadge={false} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white">
              <PhoneCall size={10} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-400/20 text-teal-300 text-[11px] font-bold tracking-wide uppercase border border-teal-400/30">
                <Sparkles size={11} /> 14 Tage kostenlos testen
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Telefonservice & Anrufannahme</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              🤖 Ihr Praxiskalender steht bereit. Möchten Sie, dass unsere Telefon-KI Ihre Anrufe automatisch hier einbucht?
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Ihre Räume und Zeiten sind bereits hinterlegt. Aktivieren Sie die Telefon-KI mit einem Klick 14 Tage lang kostenlos.
            </p>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 shrink-0 pt-1 lg:pt-0">
          {isActivated ? (
            <div className="px-5 py-2.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check size={16} />
              <span>Telefon-KI für Praxiskalender aktiv!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsActivated(true);
                if (onActivate) onActivate();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneForwarded size={15} />
              <span>Telefon-KI unverbindlich testen</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Schließen"
          >
            <X size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
