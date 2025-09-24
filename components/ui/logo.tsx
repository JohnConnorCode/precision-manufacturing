'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'default',
  size = 'md'
}: LogoProps) {
  const colors = {
    default: {
      primary: '#06B6D4', // cyan-500
      secondary: '#3B82F6', // blue-500
      accent: '#0EA5E9', // sky-500
      text: '#0F172A', // slate-900
      textSecondary: '#64748B' // slate-500
    },
    light: {
      primary: '#67E8F9', // cyan-300
      secondary: '#93C5FD', // blue-300
      accent: '#FFFFFF',
      text: '#FFFFFF',
      textSecondary: '#E2E8F0' // slate-200
    },
    dark: {
      primary: '#06B6D4',
      secondary: '#3B82F6',
      accent: '#0EA5E9',
      text: '#0F172A',
      textSecondary: '#475569' // slate-600
    }
  };

  const sizes = {
    sm: { logo: 36, text: 18 },
    md: { logo: 48, text: 24 },
    lg: { logo: 60, text: 30 }
  };

  const { primary, secondary, accent, text, textSecondary } = colors[variant];
  const { logo: logoSize, text: textSize } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Premium aerospace precision logo */}
        <div className="relative">
          <svg
            className={size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-15 h-15' : 'w-12 h-12'}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id={`premium-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="50%" stopColor={accent} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>

              <linearGradient id={`inner-grad-${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={secondary} />
                <stop offset="100%" stopColor={primary} />
              </linearGradient>

              {/* Premium glow filter */}
              <filter id="premium-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Metallic pattern for aerospace feel */}
              <pattern id="metallic" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill={primary} opacity="0.05"/>
                <circle cx="2" cy="2" r="0.5" fill={accent} opacity="0.1"/>
              </pattern>
            </defs>

            {/* Main circular frame - represents precision */}
            <circle
              cx="30"
              cy="30"
              r="28"
              stroke={`url(#premium-grad-${variant})`}
              strokeWidth="1.5"
              fill="url(#metallic)"
              opacity="0.9"
            />

            {/* Inner technical ring */}
            <circle
              cx="30"
              cy="30"
              r="22"
              stroke={primary}
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
              strokeDasharray="2 3"
            />

            {/* Core design - IIS monogram with precision crosshairs */}
            <g transform="translate(30, 30)">
              {/* Precision crosshair guides */}
              <g opacity="0.3">
                <line x1="0" y1="-25" x2="0" y2="-18" stroke={primary} strokeWidth="0.5"/>
                <line x1="0" y1="18" x2="0" y2="25" stroke={primary} strokeWidth="0.5"/>
                <line x1="-25" y1="0" x2="-18" y2="0" stroke={primary} strokeWidth="0.5"/>
                <line x1="18" y1="0" x2="25" y2="0" stroke={primary} strokeWidth="0.5"/>
              </g>

              {/* IIS Monogram - Modern and balanced */}
              <g filter="url(#premium-glow)">
                {/* Letter I - First */}
                <rect
                  x="-14"
                  y="-12"
                  width="4"
                  height="24"
                  fill={`url(#inner-grad-${variant})`}
                  rx="0.5"
                />

                {/* Letter I - Second */}
                <rect
                  x="-2"
                  y="-12"
                  width="4"
                  height="24"
                  fill={`url(#inner-grad-${variant})`}
                  rx="0.5"
                />

                {/* Letter S - Stylized aerospace curve */}
                <path
                  d="M 6 -12 Q 14 -12 14 -6 Q 14 0 8 0 Q 8 0 14 0 Q 14 6 14 6 Q 14 12 6 12"
                  stroke={`url(#premium-grad-${variant})`}
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* Center precision dot */}
              <circle r="1.5" fill={accent} opacity="0.8"/>

              {/* Technical corner markers */}
              <g opacity="0.5">
                <path d="M -16,-16 L -16,-13 M -16,-16 L -13,-16" stroke={secondary} strokeWidth="1" strokeLinecap="round"/>
                <path d="M 16,-16 L 16,-13 M 16,-16 L 13,-16" stroke={secondary} strokeWidth="1" strokeLinecap="round"/>
                <path d="M 16,16 L 16,13 M 16,16 L 13,16" stroke={secondary} strokeWidth="1" strokeLinecap="round"/>
                <path d="M -16,16 L -16,13 M -16,16 L -13,16" stroke={secondary} strokeWidth="1" strokeLinecap="round"/>
              </g>

              {/* Rotating precision indicator */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                opacity="0.3"
              >
                <circle r="18" fill="none" stroke={accent} strokeWidth="0.25" strokeDasharray="1 5"/>
              </motion.g>
            </g>

            {/* Subtle scanning effect */}
            <motion.line
              x1="5"
              y1="30"
              x2="55"
              y2="30"
              stroke={accent}
              strokeWidth="0.3"
              opacity="0"
              animate={{
                opacity: [0, 0.6, 0],
                y1: [10, 50, 10],
                y2: [10, 50, 10]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Quality indicators - small precision marks */}
            <g opacity="0.4">
              {[0, 90, 180, 270].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 30 30)`}>
                  <circle cx="30" cy="6" r="0.5" fill={primary}/>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {showText && (
          <div className="flex flex-col">
            {/* Company name with better hierarchy */}
            <div className="flex items-baseline -space-x-0.5">
              <motion.span
                className={`font-black tracking-tight ${
                  size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
                }`}
                style={{ color: text }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                IIS
              </motion.span>
              <span
                className={`font-bold ${
                  size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'
                }`}
                style={{ color: primary }}
              >
                MET
              </span>
            </div>
            <div
              className={`uppercase tracking-[0.35em] font-semibold opacity-70 ${
                size === 'sm' ? 'text-[8px] -mt-1' : size === 'lg' ? 'text-xs' : 'text-[10px] -mt-0.5'
              }`}
              style={{ color: textSecondary }}
            >
              Precision Systems
            </div>
          </div>
        )}
      </div>
    </div>
  );
}