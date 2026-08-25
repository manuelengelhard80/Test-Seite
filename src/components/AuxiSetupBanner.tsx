import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  DoorClosed, 
  Stethoscope, 
  Play,
  X,
  Clock
} from 'lucide-react';
import { AuxiAvatar } from './AuxiAvatar';

export interface AuxiSetupBannerProps {
  onStartSetup: () => void;
  onDismiss?: () => void;
}

export const AuxiSetupBanner: React.FC<AuxiSetupBannerProps> = ({
  onStartSetup,
  onDismiss,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-teal-50/90 via-sky-50/80 to-emerald-50/90 border border-teal-200/90 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden font-sans my-2"
    >
      {/* Top right close (X) button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-all cursor-pointer shadow-2xs border border-teal-100"
          title="Schließen"
          aria-label="Schließen"
        >
          <X size={16} />
        </button>
      )}

      {/* Soft decorative background circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-48 h-48 bg-sky-200/30 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pr-0 lg:pr-8">
        
        {/* Left: Auxi avatar + invitation text */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative shrink-0">
            <AuxiAvatar size="lg" isSpeaking={true} showBadge={true} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[11px] font-bold tracking-wide uppercase border border-teal-200">
                <Clock size={11} className="text-teal-700" /> 5 Minuten Einrichtung
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Praxiskalender-Assistentin</span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              Guten Tag! Ich bin Auxi. 💫 Wollen wir Ihren Praxiskalender jetzt einrichten?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              In unter 5 Minuten hinterlegen wir gemeinsam Ihr Behandler-Team, Räume mit automatischer Doppelbelegungs-Sperre und Ihre Leistungen – ganz ohne Handbuch oder IT-Stress.
            </p>

            {/* Feature quick badges */}
            <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px] font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-teal-100 shadow-2xs">
                <Users size={12} className="text-teal-600" /> Ärzte & Sprechzeiten
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-teal-100 shadow-2xs">
                <DoorClosed size={12} className="text-sky-600" /> Raum- & Gerätesperre
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-teal-100 shadow-2xs">
                <Stethoscope size={12} className="text-emerald-600" /> Smartes Web-Widget
              </span>
            </div>
          </div>
        </div>

        {/* Right: Primary Action Button (no "Bereits eingerichtet" button to free up space) */}
        <div className="flex items-center shrink-0 pt-1 lg:pt-0">
          <button
            type="button"
            onClick={onStartSetup}
            className="w-full sm:w-auto px-6 py-3 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Play size={15} className="fill-white" />
            <span>Jetzt mit Auxi einrichten</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
