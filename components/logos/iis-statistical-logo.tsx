'use client';

import { motion } from 'framer-motion';

interface StatisticalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showGrid?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Generate bell curve once at module level to avoid hydration mismatches
const generateBellCurve = () => {
  const points: string[] = [];
  const centerX = 320;
  const baseY = 340;
  const peakY = 80;
  const sigma = 75;
  const numPoints = 300;

  for (let i = 0; i <= numPoints; i++) {
    const x = 80 + (i / numPoints) * 480;
    const normalizedX = (x - centerX) / sigma;
    const gaussian = Math.exp(-0.5 * normalizedX * normalizedX);
    const y = baseY - (gaussian * (baseY - peakY));

    if (i === 0) {
      points.push(`M ${x},${y}`);
    } else {
      points.push(`L ${x},${y}`);
    }
  }

  points.push(`L 560,${baseY}`);
  points.push(`L 80,${baseY}`);
  points.push('Z');

  return points.join(' ');
};

const bellCurvePath = generateBellCurve();

export function StatisticalLogo({
  size = 'md',
  animated = false,
  showGrid = true,
  className = '',
  onMouseEnter,
  onMouseLeave
}: StatisticalLogoProps) {

  return (
    <svg
      viewBox="70 70 500 320"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        <defs>
          {/* Brand gradient */}
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
          </linearGradient>

          {/* Text gradient */}
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#f0f9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          {/* Text shadow */}
          <filter id="textShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.4" floodColor="#0369a1"/>
          </filter>

          {/* Curve shadow */}
          <filter id="curveShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" floodColor="#0369a1"/>
          </filter>

          {/* Clip path for grid */}
          <clipPath id="bellCurveClip">
            <path d={bellCurvePath} suppressHydrationWarning />
          </clipPath>
        </defs>

        {/* Filled bell curve */}
        <motion.path
          d={bellCurvePath}
          fill="url(#curveGradient)"
          filter="url(#curveShadow)"
          initial={animated ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.05
          }}
          style={{ transformOrigin: "center" }}
          suppressHydrationWarning
        />

        {/* White grid overlay */}
        {showGrid && (
          <g clipPath="url(#bellCurveClip)">
            <motion.g
              initial={animated ? { opacity: 0 } : { opacity: 0.2 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {Array.from({ length: 49 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={80 + i * 10}
                  y1="70"
                  x2={80 + i * 10}
                  y2="340"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="80"
                  y1={70 + i * 10}
                  x2="560"
                  y2={70 + i * 10}
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              ))}
            </motion.g>
          </g>
        )}

        {/* IIS Text */}
        <g textAnchor="middle" fontSize="100" fontWeight="900" fill="url(#textGradient)" fontFamily="Georgia, 'Times New Roman', serif" filter="url(#textShadow)" letterSpacing="-0.02em">
          <motion.text
            x="260"
            y="275"
            dominantBaseline="middle"
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: animated ? 0.6 : 0,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            I
          </motion.text>

          <motion.text
            x="320"
            y="275"
            dominantBaseline="middle"
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: animated ? 0.7 : 0,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            I
          </motion.text>

          <motion.text
            x="380"
            y="275"
            dominantBaseline="middle"
            initial={animated ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: animated ? 0.8 : 0,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            S
          </motion.text>
        </g>

        {/* Baseline */}
        <motion.line
          x1="80"
          y1="340"
          x2="560"
          y2="340"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Center line */}
        <motion.line
          x1="320"
          y1="80"
          x2="320"
          y2="340"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
          initial={animated ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 0.6 }}
          animate={{ scaleY: 1, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center" }}
        />

        {/* Sigma markers - only show on medium and large */}
        {size !== 'sm' && [
          { x: 95, label: '-3σ', weight: '500' },
          { x: 170, label: '-2σ', weight: '500' },
          { x: 245, label: '-1σ', weight: '600' },
          { x: 320, label: 'μ', weight: '800' },
          { x: 395, label: '+1σ', weight: '600' },
          { x: 470, label: '+2σ', weight: '500' },
          { x: 545, label: '+3σ', weight: '500' },
        ].map((marker, i) => (
          <motion.g
            key={marker.label}
            initial={animated ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: animated ? 0.9 + i * 0.05 : 0,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <line
              x1={marker.x}
              y1="340"
              x2={marker.x}
              y2="355"
              stroke="#1e293b"
              strokeWidth={marker.label === 'μ' ? '3' : '2'}
              strokeLinecap="round"
            />
            <text
              x={marker.x}
              y="378"
              textAnchor="middle"
              fontSize={marker.label === 'μ' ? '24' : '19'}
              fontWeight={marker.weight}
              fill="#1e293b"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-0.01em"
            >
              {marker.label}
            </text>
          </motion.g>
        ))}
      </svg>
  );
}
