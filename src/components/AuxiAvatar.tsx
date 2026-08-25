import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, HeartHandshake, ArrowRight, Check } from 'lucide-react';

export interface AuxiAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  isCelebrating?: boolean;
  className?: string;
  showBadge?: boolean;
}

export const AuxiAvatar: React.FC<AuxiAvatarProps> = ({
  size = 'md',
  isSpeaking = false,
  isCelebrating = false,
  className = '',
  showBadge = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const iconSizeMap = {
    sm: 16,
    md: 22,
    lg: 32,
    xl: 48,
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow Halo */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : [1, 1.06, 1],
          opacity: isSpeaking ? [0.4, 0.7, 0.4] : [0.25, 0.4, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2 : 3.5,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-400 via-sky-400 to-emerald-300 blur-md ${sizeMap[size]}`}
      />

      {/* Main Avatar Body (Auxi 3D Glass Pill) */}
      <motion.div
        animate={
          isCelebrating
            ? { y: [0, -8, 0], rotate: [0, -6, 6, 0] }
            : isSpeaking
            ? { y: [0, -3, 0] }
            : { y: [0, -1.5, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 0.8 : isSpeaking ? 2.2 : 4,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} rounded-2xl bg-gradient-to-b from-white via-teal-50 to-teal-100/90 p-[2px] shadow-lg shadow-teal-900/10 border border-white/80 flex items-center justify-center backdrop-blur-md`}
      >
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-teal-500 via-teal-600 to-sky-600 flex items-center justify-center text-white relative overflow-hidden shadow-inner">
          {/* Subtle 3D shine effect */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/30 blur-xs" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-sky-300/30 blur-xs" />

          {/* Robot / Assistant Face */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {isCelebrating ? (
              <Sparkles size={iconSizeMap[size]} className="text-amber-200 animate-spin" />
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                {/* Friendly LED Eyes */}
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, times: [0, 0.85, 0.9, 0.95, 1] }}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-100 shadow-[0_0_6px_#a7f3d0]"
                  />
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, times: [0, 0.85, 0.9, 0.95, 1] }}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-100 shadow-[0_0_6px_#a7f3d0]"
                  />
                </div>
                {/* Cute Smile Arc */}
                <div className="w-2.5 sm:w-3 h-1 border-b-2 border-emerald-100/90 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Floating Sparkle Badge */}
        {showBadge && (
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center text-slate-900"
          >
            <Sparkles size={size === 'sm' ? 8 : 10} className="text-amber-950 fill-amber-950" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export interface AuxiSpeechBubbleProps {
  title?: string;
  message: string;
  subtext?: string;
  stepIndicator?: string;
  actionButtonText?: string;
  onAction?: () => void;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
  position?: 'bottom' | 'top' | 'floating';
  className?: string;
}

export const AuxiSpeechBubble: React.FC<AuxiSpeechBubbleProps> = ({
  title = 'Auxi • Ihre Praxiskalender-Assistentin',
  message,
  subtext,
  stepIndicator,
  actionButtonText,
  onAction,
  secondaryButtonText,
  onSecondaryAction,
  position = 'bottom',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative bg-white/95 backdrop-blur-xl border border-teal-100/90 rounded-2xl p-4 sm:p-5 shadow-xl shadow-teal-950/5 text-slate-800 ${className}`}
    >
      {/* Header bar with Auxi identifier & Step */}
      <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <AuxiAvatar size="sm" showBadge={false} isSpeaking={true} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm text-slate-900 leading-none">Auxi</span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-teal-50 text-[10px] font-bold text-teal-800 border border-teal-200/60">
                <Sparkles size={9} className="text-teal-600" /> Onboarding
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Praxiskalender-Begleitung</span>
          </div>
        </div>

        {stepIndicator && (
          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/50">
            {stepIndicator}
          </span>
        )}
      </div>

      {/* Message in polite "Sie" form */}
      <div className="space-y-1.5">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          {message}
        </p>
        {subtext && (
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-normal">
            {subtext}
          </p>
        )}
      </div>

      {/* Action Buttons if provided */}
      {(actionButtonText || secondaryButtonText) && (
        <div className="flex items-center justify-end gap-2 mt-3.5 pt-2.5 border-t border-slate-100">
          {secondaryButtonText && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {secondaryButtonText}
            </button>
          )}
          {actionButtonText && (
            <button
              type="button"
              onClick={onAction}
              className="px-4 py-2 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{actionButtonText}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};
