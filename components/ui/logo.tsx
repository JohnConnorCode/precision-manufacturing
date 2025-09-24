'use client';

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
      text: '#0F172A', // slate-900
      textSecondary: '#64748B' // slate-500
    },
    light: {
      primary: '#06B6D4', // cyan-500
      text: '#FFFFFF',
      textSecondary: '#E2E8F0' // slate-200
    },
    dark: {
      primary: '#06B6D4',
      text: '#0F172A',
      textSecondary: '#475569' // slate-600
    }
  };

  const sizes = {
    sm: { logo: 28, text: 14 },
    md: { logo: 36, text: 18 },
    lg: { logo: 44, text: 22 }
  };

  const { primary, text, textSecondary } = colors[variant];
  const { logo: logoSize } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center space-x-2.5">
        {/* Ultra-clean, minimal logo mark */}
        <div className="relative">
          <svg
            width={logoSize}
            height={logoSize}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple, modern design */}
            <g>
              {/* Clean hexagon shape for aerospace/precision feel */}
              <path
                d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z"
                stroke={primary}
                strokeWidth="2"
                fill="none"
              />

              {/* Minimalist "IIS" monogram inside */}
              <g transform="translate(20, 20)">
                {/* Letter I - vertical line */}
                <rect
                  x="-8"
                  y="-8"
                  width="2"
                  height="16"
                  fill={primary}
                />

                {/* Letter I - second vertical */}
                <rect
                  x="-3"
                  y="-8"
                  width="2"
                  height="16"
                  fill={primary}
                />

                {/* Letter S - simplified */}
                <path
                  d="M 2 -8 L 8 -8 L 8 -2 L 2 2 L 8 2 L 8 8 L 2 8"
                  stroke={primary}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="square"
                />
              </g>
            </g>
          </svg>
        </div>

        {showText && (
          <div className="flex flex-col -space-y-0.5">
            {/* Company name - ultra clean */}
            <div className="flex items-baseline">
              <span
                className={`font-semibold tracking-tight ${
                  size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-lg'
                }`}
                style={{ color: text }}
              >
                IIS
              </span>
              <span
                className={`font-semibold ${
                  size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-lg'
                }`}
                style={{ color: primary }}
              >
                MET
              </span>
            </div>
            <div
              className={`uppercase tracking-[0.15em] font-medium ${
                size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]'
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