import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

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

  const eyeSizeMap = {
    sm: 'w-1.5 h-2',
    md: 'w-2 h-2.5',
    lg: 'w-3 h-4',
    xl: 'w-4 h-5',
  };

  const catchlightMap = {
    sm: 'w-0.5 h-0.5',
    md: 'w-1 h-1',
    lg: 'w-1.5 h-1.5',
    xl: 'w-2 h-2',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow Halo with warm & magical pulse */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.18, 1] : [1, 1.08, 1],
          opacity: isSpeaking ? [0.45, 0.75, 0.45] : [0.3, 0.45, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2 : 3.5,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-teal-300 via-sky-300 to-rose-200 blur-md ${sizeMap[size]}`}
      />

      {/* Main Avatar Character: Cute round Auxi Bot with cute antennas/ears, big sparkling anime eyes, rosy blush, and sweet smile */}
      <motion.div
        animate={
          isCelebrating
            ? { y: [0, -10, 0], rotate: [0, -8, 8, 0], scale: [1, 1.06, 1] }
            : isSpeaking
            ? { y: [0, -3.5, 0], rotate: [-1, 1, -1] }
            : { y: [0, -2, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 0.7 : isSpeaking ? 2 : 3.8,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} rounded-full bg-gradient-to-b from-white via-teal-50 to-teal-100 p-[2.5px] shadow-lg shadow-teal-900/15 border-2 border-white flex items-center justify-center backdrop-blur-md`}
      >
        {/* Cute Auxi Antenna on top */}
        <motion.div 
          animate={{ rotate: isSpeaking ? [-10, 10, -10] : [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-xs border border-white" />
          <div className="w-0.5 h-1.5 bg-teal-400" />
        </motion.div>

        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white relative overflow-hidden shadow-inner">
          {/* Glass reflection gradient */}
          <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-white/35 blur-xs" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-cyan-300/30 blur-xs" />

          {/* Cute Face Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-1">
            {isCelebrating ? (
              <div className="flex flex-col items-center">
                {/* Happy closed arched eyes ^^ */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 sm:w-3 h-1.5 border-t-2 border-white rounded-t-full font-bold" />
                  <div className="w-2 sm:w-3 h-1.5 border-t-2 border-white rounded-t-full font-bold" />
                </div>
                {/* Cheerful open mouth :D */}
                <div className="w-2 sm:w-2.5 h-1.5 bg-rose-300 rounded-b-full mt-0.5 border-t border-rose-400" />
                {/* Rosy Blush */}
                <div className="flex justify-between w-full px-2 mt--0.5">
                  <div className="w-1.5 h-1 rounded-full bg-rose-400/60 blur-[0.5px]" />
                  <div className="w-1.5 h-1 rounded-full bg-rose-400/60 blur-[0.5px]" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full px-1">
                {/* Big sparkling anime-style cute eyes */}
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {/* Left Eye */}
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ repeat: Infinity, duration: 3.6, times: [0, 0.88, 0.92, 0.96, 1] }}
                    className={`${eyeSizeMap[size]} rounded-full bg-slate-900 border border-teal-200/40 relative shadow-[0_0_8px_rgba(255,255,255,0.7)] flex items-start justify-start p-0.5`}
                  >
                    {/* Big glossy sparkle */}
                    <div className={`${catchlightMap[size]} rounded-full bg-white`} />
                    {/* Secondary tiny sparkle */}
                    <div className="w-0.5 h-0.5 rounded-full bg-white/90 absolute bottom-0.5 right-0.5" />
                  </motion.div>

                  {/* Right Eye */}
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                    transition={{ repeat: Infinity, duration: 3.6, times: [0, 0.88, 0.92, 0.96, 1] }}
                    className={`${eyeSizeMap[size]} rounded-full bg-slate-900 border border-teal-200/40 relative shadow-[0_0_8px_rgba(255,255,255,0.7)] flex items-start justify-start p-0.5`}
                  >
                    {/* Big glossy sparkle */}
                    <div className={`${catchlightMap[size]} rounded-full bg-white`} />
                    {/* Secondary tiny sparkle */}
                    <div className="w-0.5 h-0.5 rounded-full bg-white/90 absolute bottom-0.5 right-0.5" />
                  </motion.div>
                </div>

                {/* Cute Rosy Cheeks & Sweet Smile */}
                <div className="flex items-center justify-center gap-1 mt-0.5 w-full">
                  {/* Left Cheek Blush */}
                  <div className="w-1.5 h-1 sm:w-2 sm:h-1.5 rounded-full bg-rose-300/80 shadow-[0_0_4px_#fda4af]" />
                  
                  {/* Sweet Smile Arc */}
                  <div className="w-2 sm:w-2.5 h-1 border-b-[2px] border-white rounded-b-full -mt-0.5" />
                  
                  {/* Right Cheek Blush */}
                  <div className="w-1.5 h-1 sm:w-2 sm:h-1.5 rounded-full bg-rose-300/80 shadow-[0_0_4px_#fda4af]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Sparkle / Heart Badge */}
        {showBadge && (
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 border-2 border-white shadow-xs flex items-center justify-center text-slate-900"
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
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      className={`bg-white/95 backdrop-blur-md rounded-2xl border border-teal-200/80 p-4 sm:p-5 shadow-xl shadow-teal-950/5 relative text-slate-800 ${className}`}
    >
      {/* Speech bubble pointy arrow */}
      {position === 'bottom' && (
        <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-t border-l border-teal-200/80 rotate-45" />
      )}
      {position === 'top' && (
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b border-r border-teal-200/80 rotate-45" />
      )}

      <div className="flex items-start gap-3.5">
        <AuxiAvatar size="md" isSpeaking={true} />

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
              <span>{title}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </h4>
            {stepIndicator && (
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {stepIndicator}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {message}
          </p>

          {subtext && (
            <p className="text-[11px] text-slate-500 leading-normal pt-0.5">
              {subtext}
            </p>
          )}

          {(actionButtonText || secondaryButtonText) && (
            <div className="flex items-center gap-2 pt-2.5">
              {actionButtonText && (
                <button
                  type="button"
                  onClick={onAction}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{actionButtonText}</span>
                </button>
              )}
              {secondaryButtonText && (
                <button
                  type="button"
                  onClick={onSecondaryAction}
                  className="px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
