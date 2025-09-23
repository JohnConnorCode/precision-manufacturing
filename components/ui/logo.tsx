'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
}

export default function Logo({ className = '', showText = true, variant = 'default' }: LogoProps) {
  const colors = {
    default: {
      primary: '#0EA5E9',
      secondary: '#1e293b',
      accent: '#06B6D4',
      text: '#1e293b'
    },
    light: {
      primary: '#93C5FD',
      secondary: '#FFFFFF',
      accent: '#67E8F9',
      text: '#FFFFFF'
    },
    dark: {
      primary: '#0EA5E9',
      secondary: '#0f172a',
      accent: '#06B6D4',
      text: '#0f172a'
    }
  };

  const { primary, secondary, accent, text } = colors[variant];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Modern precision measurement logo */}
        <div className="relative">
          <svg
            className="w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id={`logoGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={accent} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Outer hexagon - aerospace precision */}
            <path
              d="M24 4 L40 12 L40 36 L24 44 L8 36 L8 12 Z"
              stroke={`url(#logoGrad-${variant})`}
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
            />

            {/* Inner precision measurement system */}
            <g transform="translate(24, 24)">
              {/* Main crosshair */}
              <line x1="0" y1="-14" x2="0" y2="-6" stroke={primary} strokeWidth="2" strokeLinecap="round"/>
              <line x1="0" y1="6" x2="0" y2="14" stroke={primary} strokeWidth="2" strokeLinecap="round"/>
              <line x1="-14" y1="0" x2="-6" y2="0" stroke={primary} strokeWidth="2" strokeLinecap="round"/>
              <line x1="6" y1="0" x2="14" y2="0" stroke={primary} strokeWidth="2" strokeLinecap="round"/>

              {/* Precision circle */}
              <circle r="5" fill="none" stroke={`url(#logoGrad-${variant})`} strokeWidth="1.5"/>

              {/* Center reticle */}
              <circle r="1.5" fill={accent}/>

              {/* Measurement markers */}
              <g opacity="0.7">
                {[45, 135, 225, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="0"
                    y1="-9"
                    x2="0"
                    y2="-11"
                    stroke={accent}
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform={`rotate(${angle})`}
                  />
                ))}
              </g>

              {/* Corner brackets - precision framing */}
              <path d="M -10,-10 L -10,-7 M -10,-10 L -7,-10" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 10,-10 L 10,-7 M 10,-10 L 7,-10" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 10,10 L 10,7 M 10,10 L 7,10" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M -10,10 L -10,7 M -10,10 L -7,10" stroke={primary} strokeWidth="1.5" strokeLinecap="round"/>
            </g>

            {/* Animated scan line effect */}
            <motion.line
              x1="8"
              y1="24"
              x2="40"
              y2="24"
              stroke={accent}
              strokeWidth="0.5"
              opacity="0"
              animate={{
                opacity: [0, 0.8, 0],
                y1: [16, 32, 16],
                y2: [16, 32, 16]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>

          {/* Subtle pulse effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-12 h-12"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M24 4 L40 12 L40 36 L24 44 L8 36 L8 12 Z"
                stroke={accent}
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </motion.div>
        </div>

        {showText && (
          <div className="flex flex-col">
            {/* Company name */}
            <div className="flex items-baseline">
              <span className="text-2xl font-black tracking-tight" style={{ color: text }}>
                IIS
              </span>
              <span className="text-xs font-medium tracking-[0.2em] ml-2 opacity-70" style={{ color: accent }}>
                MET
              </span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] font-medium mt-0.5 opacity-60" style={{ color: text }}>
              Precision Systems
            </div>
          </div>
        )}
      </div>
    </div>
  );
}