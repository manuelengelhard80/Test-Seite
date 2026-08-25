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
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Soft Ambient Outer Glow (Luminous Mint/Teal) */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.14, 1] : [1, 1.05, 1],
          opacity: isSpeaking ? [0.45, 0.7, 0.45] : [0.25, 0.4, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2 : 3.5,
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 rounded-full bg-gradient-to-tr from-teal-300 via-emerald-200 to-cyan-200 blur-md ${sizeMap[size]}`}
      />

      {/* Main Floating Sphere */}
      <motion.div
        animate={
          isCelebrating
            ? { y: [0, -7, 0], scale: [1, 1.06, 1] }
            : isSpeaking
            ? { y: [0, -2.5, 0], rotate: [-1, 1, -1] }
            : { y: [0, -1.5, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 0.8 : isSpeaking ? 2 : 3.8,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size]} rounded-full flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Lighter, Radiant 3D Spherical Gradient (Auxilium Mint-Teal) */}
            <radialGradient id="auxiBrightSphere" cx="42%" cy="36%" r="62%">
              <stop offset="0%" stopColor="#5eead4" />       {/* Bright Teal 300 / Mint */}
              <stop offset="30%" stopColor="#2dd4bf" />      {/* Teal 400 highlight */}
              <stop offset="65%" stopColor="#0D9488" />      {/* Auxilium Primary Teal */}
              <stop offset="95%" stopColor="#0f766e" />      {/* Soft Teal 700 edge */}
              <stop offset="100%" stopColor="#115e59" />     {/* Outer rim */}
            </radialGradient>

            {/* Translucent Outer Glass Capsule Ring */}
            <linearGradient id="auxiOuterRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ccfbf1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.3" />
            </linearGradient>

            {/* Top Soft Gloss Arc */}
            <radialGradient id="auxiTopGlint" cx="45%" cy="20%" r="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Faint, Delicate Cheek Blush */}
            <radialGradient id="auxiSoftBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#99f6e4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
            </radialGradient>

            {/* Soft Ambient Ground Shadow */}
            <radialGradient id="auxiGroundShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Ambient Drop Shadow underneath */}
          <ellipse cx="60" cy="112" rx="34" ry="5.5" fill="url(#auxiGroundShadow)" />

          {/* 2. Outer Light Translucent Glass Ring (like in image) */}
          <circle cx="60" cy="58" r="54" fill="url(#auxiOuterRing)" />
          <circle cx="60" cy="58" r="53.5" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.9" />

          {/* 3. Luminous 3D Inner Sphere */}
          <circle cx="60" cy="58" r="44" fill="url(#auxiBrightSphere)" />

          {/* 4. Top Soft Specular Gloss Arc */}
          <ellipse cx="58" cy="34" rx="26" ry="14" fill="url(#auxiTopGlint)" />

          {/* 5. Pure White Sparkle Glint on Top-Right (No Yellow) */}
          <path
            d="M 88 32 Q 89.5 36.5 94 38 Q 89.5 39.5 88 44 Q 86.5 39.5 82 38 Q 86.5 36.5 88 32 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <circle cx="88" cy="38" r="1.2" fill="#ffffff" />

          {/* 6. Delicate Soft Cheeks (Blush) */}
          <circle cx="43" cy="65" r="5.5" fill="url(#auxiSoftBlush)" />
          <circle cx="77" cy="65" r="5.5" fill="url(#auxiSoftBlush)" />

          {/* 7. Filigrane, Delicate Smiling Eyes (Thin & Gentle Light Arcs ^ ^) */}
          {/* Left Eye Arc */}
          <path
            d="M 40 57.5 C 43.5 49 51 49 54.5 57.5"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Eye Arc */}
          <path
            d="M 65.5 57.5 C 69 49 76.5 49 80 57.5"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 8. Filigrane, Cute Tiny Smiling Mouth (Subtle gentle arc) */}
          <path
            d="M 57.5 63 C 58.8 66 61.2 66 62.5 63"
            stroke="#ffffff"
            strokeWidth="2.0"
            strokeLinecap="round"
            strokeLinejoin="round"
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
