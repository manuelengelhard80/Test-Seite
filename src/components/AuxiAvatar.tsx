import React from 'react';
import { motion } from 'motion/react';

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
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* 1. Balanced Ambient Glow (Teal-to-Blue harmony) */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.08, 1] : [1, 1.03, 1],
          opacity: isSpeaking ? [0.25, 0.4, 0.25] : [0.15, 0.25, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2.5 : 4.5,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-[#0D9488] via-[#0891b2] to-[#0284C7] blur-md ${sizeMap[size]}`}
      />

      {/* 2. Main 3D Sphere Container with gentle smooth float motion */}
      <motion.div
        animate={
          isCelebrating
            ? { y: [0, -6, 0], scale: [1, 1.05, 1] }
            : isSpeaking
            ? { y: [0, -2, 0] }
            : { y: [0, -1.2, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 0.9 : isSpeaking ? 2.2 : 4,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} rounded-full p-[2px] bg-gradient-to-b from-white/85 via-teal-100/40 to-sky-200/40 shadow-md shadow-slate-900/15 border border-teal-200/70 flex items-center justify-center backdrop-blur-md`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full rounded-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Perfectly Balanced 60% Teal to 40% Blue Brand Gradient */}
            <linearGradient id="auxiHarmonicGrad" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#14b8a6" />       {/* Fresh Teal top-left */}
              <stop offset="40%" stopColor="#0D9488" />      {/* Auxilium Primary Teal */}
              <stop offset="65%" stopColor="#0891b2" />      {/* Transition Cyan-Ocean */}
              <stop offset="100%" stopColor="#0284C7" />     {/* Rich Sky/Ocean Blue bottom-right */}
            </linearGradient>

            {/* 3D Sphere Highlight Overlay for deep spherical volume */}
            <radialGradient id="auxiSphereShade" cx="36%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="85%" stopColor="#0f172a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.38" />
            </radialGradient>

            {/* Feminine Glassy Highlight (Soft circular spot from image) */}
            <radialGradient id="auxiSphereGloss" cx="50%" cy="25%" r="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Soft Glowing Cheek Blush (Harmonious Mint-Cyan Glow) */}
            <radialGradient id="auxiDotBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </radialGradient>

            {/* Subtle glow filter for the facial light lines */}
            <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Base 3D Sphere with brand Gradient */}
          <circle cx="50" cy="50" r="48" fill="url(#auxiHarmonicGrad)" />

          {/* 2. 3D Spherical Volume Overlay */}
          <circle cx="50" cy="50" r="48" fill="url(#auxiSphereShade)" />

          {/* 3. Soft Glassy Top Reflection (Feminine Highlight) */}
          <circle cx="50" cy="30" r="30" fill="url(#auxiSphereGloss)" opacity="0.8" />

          {/* 4. Delicate Glowing Cheeks (Blush) */}
          <circle cx="28" cy="62" r="7" fill="url(#auxiDotBlush)" />
          <circle cx="72" cy="62" r="7" fill="url(#auxiDotBlush)" />

          {/* 5. Harmonious Feminine Eye Arcs (^ ^) - Thicker and softer */}
          {/* Left Eye Arc */}
          <path
            d="M 28 52 C 32.5 40, 41.5 40, 46 52"
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#eyeGlow)"
          />
          {/* Right Eye Arc */}
          <path
            d="M 54 52 C 58.5 40, 67.5 40, 72 52"
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#eyeGlow)"
          />

          {/* 6. Cute Feminine Smile Arc */}
          <path
            d="M 45 61 C 47.5 66, 52.5 66, 55 61"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#eyeGlow)"
          />
        </svg>
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
  title = 'Auxilia • Ihre Praxiskalender-Assistentin',
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
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7]" />
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
