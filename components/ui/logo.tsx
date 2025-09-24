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
      secondary: '#0F172A', // slate-900
      text: '#0F172A', // slate-900
      textSecondary: '#64748B' // slate-500
    },
    light: {
      primary: '#06B6D4', // cyan-500
      secondary: '#FFFFFF',
      text: '#FFFFFF',
      textSecondary: '#E2E8F0' // slate-200
    },
    dark: {
      primary: '#06B6D4',
      secondary: '#0F172A',
      text: '#0F172A',
      textSecondary: '#475569' // slate-600
    }
  };

  const sizes = {
    sm: { logo: 32, text: 16 },
    md: { logo: 40, text: 20 },
    lg: { logo: 48, text: 24 }
  };

  const { primary, secondary, text, textSecondary } = colors[variant];
  const { logo: logoSize } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Clean, professional logo mark */}
        <div className="relative">
          <svg
            width={logoSize}
            height={logoSize}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`logo-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={primary} stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Clean geometric design representing precision and aerospace */}
            <g>
              {/* Outer ring - represents global reach and completeness */}
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke={primary}
                strokeWidth="2"
                fill="none"
              />

              {/* Inner precision elements - minimalist IIS representation */}
              <g transform="translate(24, 24)">
                {/* Vertical bars for "II" */}
                <rect
                  x="-9"
                  y="-8"
                  width="3"
                  height="16"
                  fill={`url(#logo-gradient-${variant})`}
                  rx="0.5"
                />
                <rect
                  x="-3"
                  y="-8"
                  width="3"
                  height="16"
                  fill={`url(#logo-gradient-${variant})`}
                  rx="0.5"
                />

                {/* Stylized "S" - simple curve */}
                <path
                  d="M 3 -8 C 3 -8, 9 -8, 9 -4 C 9 0, 3 0, 3 0 C 3 0, 9 0, 9 4 C 9 8, 3 8, 3 8"
                  stroke={`url(#logo-gradient-${variant})`}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Subtle corner marks for precision */}
              <g opacity="0.5">
                <path d="M 8,8 L 8,12 M 8,8 L 12,8" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 40,8 L 40,12 M 40,8 L 36,8" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 40,40 L 40,36 M 40,40 L 36,40" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 8,40 L 8,36 M 8,40 L 12,40" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
              </g>
            </g>
          </svg>
        </div>

        {showText && (
          <div className="flex flex-col">
            {/* Company name - clean typography */}
            <div className="flex items-baseline">
              <span
                className={`font-bold tracking-tight ${
                  size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
                }`}
                style={{ color: text }}
              >
                IIS
              </span>
              <span
                className={`font-bold ${
                  size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
                }`}
                style={{ color: primary }}
              >
                MET
              </span>
            </div>
            <div
              className={`uppercase tracking-[0.2em] font-medium opacity-80 ${
                size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]'
              }`}
              style={{ color: textSecondary }}
            >
              Precision MFG
            </div>
          </div>
        )}
      </div>
    </div>
  );
}