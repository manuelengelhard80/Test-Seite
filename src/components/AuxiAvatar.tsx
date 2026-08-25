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
  showBadge = false, // removed yellow badge by default
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Outer Soft Glow Halo in Auxilium Teal/Cyan */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : [1, 1.06, 1],
          opacity: isSpeaking ? [0.4, 0.7, 0.4] : [0.25, 0.45, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2 : 3.5,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-teal-300 to-cyan-300 blur-md ${sizeMap[size]}`}
      />

      {/* Main 3D Glass Orb Container */}
      <motion.div
        animate={
          isCelebrating
            ? { y: [0, -8, 0], scale: [1, 1.08, 1] }
            : isSpeaking
            ? { y: [0, -3, 0], rotate: [-1, 1, -1] }
            : { y: [0, -2, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 0.8 : isSpeaking ? 2 : 3.8,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} rounded-full p-[3px] bg-gradient-to-b from-white/90 via-teal-100/60 to-teal-200/50 shadow-lg shadow-teal-950/20 border border-teal-200/70 flex items-center justify-center backdrop-blur-md`}
      >
        {/* Soft Inner Glow Ring */}
        <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-teal-500/30 via-transparent to-cyan-200/40 flex items-center justify-center relative overflow-hidden">
          
          {/* Main 3D Sphere SVG Face */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full rounded-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 3D Sphere Radial Gradient using Auxilium Teal #0D9488 & Petrol Shades */}
              <radialGradient id="auxiSphereGrad" cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#2dd4bf" />       {/* Teal 400 highlight */}
                <stop offset="35%" stopColor="#0D9488" />      {/* Auxilium Primary Teal */}
                <stop offset="75%" stopColor="#0f766e" />      {/* Teal 700 depth */}
                <stop offset="100%" stopColor="#115e59" />     {/* Teal 800 shadow */}
              </radialGradient>

              {/* Upper Glass Specular Reflection */}
              <linearGradient id="auxiGlassGloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Soft Cheek Blush Radial Gradient (Mint / Soft Cyan) */}
              <radialGradient id="auxiBlushGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#5eead4" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
              </radialGradient>

              {/* Glow Filter for White Light Arcs */}
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Base 3D Sphere */}
            <circle cx="50" cy="50" r="48" fill="url(#auxiSphereGrad)" />

            {/* 2. Soft Bottom Ambient Shadow */}
            <ellipse cx="50" cy="88" rx="30" ry="8" fill="#134e4a" opacity="0.35" />

            {/* 3. Glass Top Light Arch */}
            <path
              d="M 12 40 C 18 18, 82 18, 88 40 C 72 26, 28 26, 12 40 Z"
              fill="url(#auxiGlassGloss)"
            />

            {/* 4. White / Cyan Sparkle Catchlight (Top-Right, matching image in Auxilium palette) */}
            <path
              d="M 76 22 Q 78 27 83 29 Q 78 31 76 36 Q 74 31 69 29 Q 74 27 76 22 Z"
              fill="#ffffff"
              opacity="0.9"
            />
            <circle cx="76" cy="29" r="1.5" fill="#a5f3fc" />

            {/* 5. Glowing Cheeks (Blush) */}
            <circle cx="28" cy="58" r="7.5" fill="url(#auxiBlushGrad)" />
            <circle cx="72" cy="58" r="7.5" fill="url(#auxiBlushGrad)" />

            {/* 6. Cheerful Smiling Eyes (Curved Glowing Light Arcs ^ ^) */}
            {/* Left Eye Arc */}
            <path
              d="M 28 50 C 33 37, 43 37, 47 50"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#softGlow)"
            />
            {/* Right Eye Arc */}
            <path
              d="M 53 50 C 57 37, 67 37, 72 50"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#softGlow)"
            />

            {/* 7. Cute Small Smiling Mouth in Center */}
            <path
              d="M 46 59 C 48 64, 52 64, 54 59"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#softGlow)"
            />
          </svg>
        </div>
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
