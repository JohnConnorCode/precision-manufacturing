'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'primary' | 'secondary' | 'mono' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

// Logo 1: Triple Eye Scanner - Clean, precise inspection focus
export const LogoTripleEye = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { iris: '#06b6d4', scan: '#3b82f6', text: '#1e293b' },
    secondary: { iris: '#475569', scan: '#64748b', text: '#1e293b' },
    mono: { iris: '#1e293b', scan: '#1e293b', text: '#1e293b' },
    gradient: { iris: 'url(#iis-gradient-1)', scan: 'url(#iis-gradient-2)', text: '#1e293b' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animated ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <defs>
        <linearGradient id="iis-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="iis-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Triple I Symbol - representing Integrated Inspection Systems */}
      <g transform="translate(25, 40)">
        {/* First I - Integrated */}
        <rect x="0" y="-20" width="4" height="40" fill={color.iris} />
        <circle cx="2" cy="-20" r="6" fill="none" stroke={color.scan} strokeWidth="1" opacity="0.5" />

        {/* Second I - Inspection */}
        <rect x="12" y="-20" width="4" height="40" fill={color.iris} />
        <circle cx="14" cy="0" r="8" fill="none" stroke={color.scan} strokeWidth="2" />
        <circle cx="14" cy="0" r="3" fill={color.iris} />

        {/* Third I - Systems (with scan lines) */}
        <rect x="24" y="-20" width="4" height="40" fill={color.iris} />
        <path d="M30 -10h8M30 0h8M30 10h8" stroke={color.scan} strokeWidth="1" opacity="0.7" />
      </g>

      {/* Typography - Clean, Modern, Professional */}
      <g transform="translate(70, 40)">
        <text x="0" y="-8" fill={color.text} fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          INTEGRATED
        </text>
        <text x="0" y="6" fill={color.text} fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          INSPECTION
        </text>
        <text x="0" y="20" fill={color.iris} fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          SYSTEMS
        </text>
      </g>
    </motion.svg>
  );
};

// Logo 2: Precision Target - Clean geometric focus on accuracy
export const LogoPrecisionTarget = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: '#06b6d4',
    secondary: '#475569',
    mono: '#1e293b',
    gradient: 'url(#iis-target-gradient)'
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 300 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={animated ? { rotate: 180 } : {}}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="iis-target-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* IIS Monogram with Target */}
      <g transform="translate(35, 40)">
        {/* Outer square frame */}
        <rect x="-25" y="-25" width="50" height="50" fill="none" stroke={colors[variant]} strokeWidth="2" />

        {/* Target circles */}
        <circle cx="0" cy="0" r="18" fill="none" stroke={colors[variant]} strokeWidth="1.5" opacity="0.3" />
        <circle cx="0" cy="0" r="12" fill="none" stroke={colors[variant]} strokeWidth="1.5" opacity="0.5" />
        <circle cx="0" cy="0" r="6" fill="none" stroke={colors[variant]} strokeWidth="1.5" opacity="0.7" />

        {/* IIS Letters */}
        <text x="0" y="5" fill={colors[variant]} fontSize="20" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle">
          IIS
        </text>

        {/* Precision crosshairs */}
        <path d="M-25 0h8M17 0h8M0 -25v8M0 17v8" stroke={colors[variant]} strokeWidth="1.5" />
      </g>

      {/* Clean Typography */}
      <g transform="translate(85, 40)">
        <text x="0" y="-10" fill="#1e293b" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
          INTEGRATED
        </text>
        <text x="0" y="5" fill="#1e293b" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
          INSPECTION
        </text>
        <text x="0" y="20" fill={colors[variant]} fontSize="14" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
          SYSTEMS
        </text>
      </g>
    </motion.svg>
  );
};

// Logo 3: Scan Grid - Modern, technical, precise
export const LogoScanGrid = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { grid: '#06b6d4', accent: '#3b82f6', text: '#1e293b' },
    secondary: { grid: '#475569', accent: '#64748b', text: '#1e293b' },
    mono: { grid: '#1e293b', accent: '#1e293b', text: '#1e293b' },
    gradient: { grid: 'url(#iis-scan-gradient)', accent: 'url(#iis-scan-gradient-2)', text: '#1e293b' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iis-scan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="iis-scan-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Scanning Grid Icon */}
      <g transform="translate(30, 40)">
        {/* Grid pattern */}
        <rect x="-20" y="-20" width="40" height="40" fill="none" stroke={color.grid} strokeWidth="1.5" />
        <path d="M-20 -10h40M-20 0h40M-20 10h40" stroke={color.grid} strokeWidth="0.5" opacity="0.4" />
        <path d="M-10 -20v40M0 -20v40M10 -20v40" stroke={color.grid} strokeWidth="0.5" opacity="0.4" />

        {/* Scan focus brackets */}
        <path d="M-20 -20h8v8M12 -20h8v8M-20 12v8h8M12 20h8v-8" stroke={color.accent} strokeWidth="2" />

        {/* Center scan point */}
        <circle cx="0" cy="0" r="3" fill={color.accent} />

        {animated && (
          <motion.line
            x1="-20"
            y1="-20"
            x2="-20"
            y2="20"
            stroke={color.accent}
            strokeWidth="1"
            opacity="0.6"
            animate={{ x1: [-20, 20, -20], x2: [-20, 20, -20] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </g>

      {/* Bold, Clean Text */}
      <text x="80" y="35" fill={color.text} fontSize="24" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">
        IIS
      </text>
      <g transform="translate(120, 40)">
        <text x="0" y="-12" fill={color.text} fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
          INTEGRATED
        </text>
        <text x="0" y="2" fill={color.text} fontSize="11" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
          INSPECTION
        </text>
        <text x="0" y="16" fill={color.grid} fontSize="11" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
          SYSTEMS
        </text>
      </g>
    </motion.svg>
  );
};

// Logo 4: Minimal IIS Mark - Ultra clean, professional
export const LogoMinimalMark = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: '#06b6d4',
    secondary: '#475569',
    mono: '#1e293b',
    gradient: 'url(#iis-minimal-gradient)'
  };

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={animated ? { scale: 1.05 } : {}}
    >
      <defs>
        <linearGradient id="iis-minimal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Minimal IIS Symbol */}
      <g transform="translate(25, 40)">
        <rect x="0" y="-15" width="3" height="30" fill={colors[variant]} />
        <rect x="8" y="-15" width="3" height="30" fill={colors[variant]} />
        <rect x="16" y="-15" width="3" height="30" fill={colors[variant]} opacity="0.7" />
        <rect x="24" y="-15" width="3" height="30" fill={colors[variant]} opacity="0.4" />
      </g>

      {/* Clean, Strong Typography */}
      <g transform="translate(65, 40)">
        <text x="0" y="5" fill="#1e293b" fontSize="28" fontWeight="300" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5">
          INTEGRATED
        </text>
        <text x="150" y="5" fill={colors[variant]} fontSize="28" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
          IIS
        </text>
      </g>
    </motion.svg>
  );
};

// Logo 5: Tech Shield - Protection and precision
export const LogoTechShield = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { shield: '#06b6d4', accent: '#3b82f6', text: '#1e293b' },
    secondary: { shield: '#475569', accent: '#64748b', text: '#1e293b' },
    mono: { shield: '#1e293b', accent: '#1e293b', text: '#1e293b' },
    gradient: { shield: 'url(#iis-shield-gradient)', accent: 'url(#iis-shield-gradient-2)', text: '#1e293b' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animated ? { y: [0, -2, 0] } : {}}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <defs>
        <linearGradient id="iis-shield-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="iis-shield-gradient-2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Shield with IIS */}
      <g transform="translate(35, 40)">
        <path
          d="M0 -22 L-18 -10 L-18 8 Q-18 20 0 28 Q18 20 18 8 L18 -10 Z"
          fill="none"
          stroke={color.shield}
          strokeWidth="2.5"
        />

        {/* IIS inside shield */}
        <text x="0" y="5" fill={color.shield} fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle">
          IIS
        </text>

        {/* Tech scan lines */}
        <path d="M-10 -5h20M-10 10h20" stroke={color.accent} strokeWidth="1" opacity="0.4" />
      </g>

      {/* Professional Typography */}
      <g transform="translate(75, 40)">
        <text x="0" y="-10" fill={color.text} fontSize="15" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          INTEGRATED
        </text>
        <text x="0" y="5" fill={color.text} fontSize="15" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          INSPECTION
        </text>
        <text x="0" y="20" fill={color.shield} fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
          SYSTEMS
        </text>
      </g>
    </motion.svg>
  );
};

// Logo 6: Circuit Eye - Technology meets precision inspection
export const LogoCircuitEye = ({ variant = 'primary', size = 'md', animated = false, className = '' }: LogoProps) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  const colors = {
    primary: { eye: '#06b6d4', circuit: '#3b82f6', text: '#1e293b' },
    secondary: { eye: '#475569', circuit: '#64748b', text: '#1e293b' },
    mono: { eye: '#1e293b', circuit: '#1e293b', text: '#1e293b' },
    gradient: { eye: 'url(#iis-eye-gradient)', circuit: 'url(#iis-eye-gradient-2)', text: '#1e293b' }
  };

  const color = colors[variant];

  return (
    <motion.svg
      className={`${sizeMap[size]} ${className}`}
      viewBox="0 0 340 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iis-eye-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="iis-eye-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Circuit Eye Symbol */}
      <g transform="translate(35, 40)">
        {/* Eye shape */}
        <ellipse cx="0" cy="0" rx="22" ry="12" fill="none" stroke={color.eye} strokeWidth="2.5" />

        {/* Iris */}
        <circle cx="0" cy="0" r="8" fill="none" stroke={color.eye} strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill={color.eye} />

        {/* Circuit connections */}
        <path d="M-22 0h-8m0 0v-5m0 0h-5" stroke={color.circuit} strokeWidth="1.5" />
        <path d="M22 0h8m0 0v5m0 0h5" stroke={color.circuit} strokeWidth="1.5" />
        <circle cx="-35" cy="-5" r="2" fill={color.circuit} />
        <circle cx="35" cy="5" r="2" fill={color.circuit} />

        {animated && (
          <motion.circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke={color.circuit}
            strokeWidth="1"
            opacity="0.5"
            animate={{ r: [8, 12, 8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </g>

      {/* Strong, Modern Typography */}
      <g transform="translate(80, 40)">
        <text x="0" y="-10" fill={color.text} fontSize="16" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">
          INTEGRATED
        </text>
        <text x="0" y="6" fill={color.text} fontSize="16" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">
          INSPECTION
        </text>
        <text x="0" y="22" fill={color.eye} fontSize="16" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
          SYSTEMS
        </text>
      </g>
    </motion.svg>
  );
};

// Main Logo Display Component
export const IISLogoShowcase = () => {
  const logos = [
    {
      component: LogoTripleEye,
      name: 'Triple Eye Scanner',
      description: 'Three I\'s representing Integrated Inspection Systems with scanning elements'
    },
    {
      component: LogoPrecisionTarget,
      name: 'Precision Target',
      description: 'Clean geometric design with crosshair precision and IIS monogram'
    },
    {
      component: LogoScanGrid,
      name: 'Scan Grid Technology',
      description: 'Modern grid pattern with active scanning visualization'
    },
    {
      component: LogoMinimalMark,
      name: 'Minimal IIS Mark',
      description: 'Ultra-clean, professional design with progressive opacity'
    },
    {
      component: LogoTechShield,
      name: 'Tech Shield',
      description: 'Protection and quality assurance through inspection'
    },
    {
      component: LogoCircuitEye,
      name: 'Circuit Eye',
      description: 'Technology-focused inspection with circuit board elements'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Integrated Inspection Systems</h1>
          <p className="text-xl text-slate-600">Logo Design Variations</p>
          <p className="text-sm text-slate-500 mt-2">Clean, Powerful, Precise</p>
        </div>

        <div className="grid gap-8">
          {logos.map(({ component: LogoComponent, name, description }, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-2">{name}</h2>
              <p className="text-slate-600 mb-8">{description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Primary Variant */}
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="primary" size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Primary</p>
                </div>

                {/* Secondary Variant */}
                <div className="text-center">
                  <div className="bg-slate-100 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="secondary" size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Secondary</p>
                </div>

                {/* Monochrome on Dark */}
                <div className="text-center">
                  <div className="bg-slate-900 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="mono" size="lg" className="invert" />
                  </div>
                  <p className="text-sm text-slate-600">Monochrome (Dark BG)</p>
                </div>

                {/* Gradient with Animation */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200 mb-2 flex items-center justify-center min-h-[120px]">
                    <LogoComponent variant="gradient" size="lg" animated />
                  </div>
                  <p className="text-sm text-slate-600">Gradient (Animated)</p>
                </div>
              </div>

              {/* Size Variations */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Size Variations</h3>
                <div className="flex items-end gap-8 flex-wrap">
                  <div className="text-center">
                    <LogoComponent size="sm" />
                    <p className="text-xs text-slate-500 mt-2">Small (32px)</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="md" />
                    <p className="text-xs text-slate-500 mt-2">Medium (48px)</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="lg" />
                    <p className="text-xs text-slate-500 mt-2">Large (64px)</p>
                  </div>
                  <div className="text-center">
                    <LogoComponent size="xl" />
                    <p className="text-xs text-slate-500 mt-2">Extra Large (96px)</p>
                  </div>
                </div>
              </div>

              {/* Usage Examples */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Usage Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded">
                    <LogoComponent variant="mono" size="md" className="invert" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded">
                    <LogoComponent variant="primary" size="md" />
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded">
                    <LogoComponent variant="mono" size="md" className="brightness-0 invert" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};