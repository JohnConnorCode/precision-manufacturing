import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const colors = {
    default: {
      primary: '#3B82F6', // Blue-500
      secondary: '#0F172A',
      accent: '#06B6D4' // Cyan-500
    },
    light: {
      primary: '#93C5FD', // Blue-300
      secondary: '#FFFFFF',
      accent: '#67E8F9' // Cyan-300
    },
    dark: {
      primary: '#3B82F6', // Blue-500
      secondary: '#0F172A',
      accent: '#06B6D4' // Cyan-500
    }
  };

  const { primary, secondary, accent } = colors[variant];

  return (
    <svg
      viewBox="0 0 280 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Integrated Inspection Systems Logo"
    >
      {/* Icon - Professional Precision Symbol */}
      <g>
        {/* Outer Ring with measurement marks */}
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke={primary}
          strokeWidth="2"
          fill="none"
        />

        {/* Inner precision crosshair */}
        <path
          d="M30 10 L30 50 M10 30 L50 30"
          stroke={primary}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="30" cy="30" r="3" fill={primary} />

        {/* Corner measurement marks */}
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

        {/* Quadrant marks */}
        <g opacity="0.6">
          {[45, 135, 225, 315].map((angle) => (
            <circle
              key={angle}
              cx="30"
              cy="12"
              r="1"
              fill={accent}
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
        </g>
      </g>

      {/* Typography - Company Name */}
      <g>
        {/* IIS */}
        <text
          x="65"
          y="28"
          fill={secondary}
          fontSize="22"
          fontWeight="800"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          IIS
        </text>

        {/* Integrated Inspection Systems */}
        <text
          x="65"
          y="44"
          fill={accent}
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          letterSpacing="0.02em"
        >
          INTEGRATED INSPECTION SYSTEMS
        </text>

        {/* Accent Line */}
        <rect x="65" y="31" width="160" height="0.5" fill={accent} opacity="0.3" />
      </g>

      {/* Tagline */}
      <text
        x="228"
        y="44"
        fill={accent}
        fontSize="8"
        fontWeight="500"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontStyle="italic"
        opacity="0.7"
      >
        Inc.
      </text>
    </svg>
  );
}