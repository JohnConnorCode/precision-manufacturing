import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const colors = {
    default: {
      primary: '#22D3EE',
      secondary: '#0F172A',
      accent: '#00D4FF'
    },
    light: {
      primary: '#22D3EE',
      secondary: '#FFFFFF',
      accent: '#00D4FF'
    },
    dark: {
      primary: '#22D3EE',
      secondary: '#0F172A',
      accent: '#00D4FF'
    }
  };

  const { primary, secondary, accent } = colors[variant];

  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Precision Manufacturing Logo"
    >
      {/* Icon - Precision Gear/Target Hybrid */}
      <g>
        {/* Outer Ring */}
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke={primary}
          strokeWidth="2"
          fill="none"
        />

        {/* Inner Precision Cross */}
        <path
          d="M30 10 L30 50 M10 30 L50 30"
          stroke={primary}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center Target */}
        <circle cx="30" cy="30" r="8" fill={accent} opacity="0.2" />
        <circle cx="30" cy="30" r="4" fill={primary} />

        {/* Precision Marks */}
        <g>
          {[0, 90, 180, 270].map((angle) => (
            <line
              key={angle}
              x1="30"
              y1="6"
              x2="30"
              y2="10"
              stroke={primary}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
        </g>

        {/* Tech Accent Lines */}
        <path
          d="M18 18 L24 24 M42 42 L36 36 M42 18 L36 24 M18 42 L24 36"
          stroke={accent}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Typography - Bold Industrial Style */}
      <g>
        {/* PRECISION */}
        <text
          x="65"
          y="28"
          fill={secondary}
          fontSize="20"
          fontWeight="800"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          PRECISION
        </text>

        {/* MFG */}
        <text
          x="65"
          y="46"
          fill={primary}
          fontSize="18"
          fontWeight="700"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="0.05em"
        >
          MFG
        </text>

        {/* Accent Line */}
        <rect x="65" y="32" width="40" height="1" fill={accent} opacity="0.5" />
      </g>

      {/* Tech Pattern Background */}
      <defs>
        <pattern id="techGrid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1" height="1" fill={primary} opacity="0.05" />
        </pattern>
      </defs>
    </svg>
  );
}