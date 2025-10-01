'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StatisticalLogoV2Page() {
  const [animated, setAnimated] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [key, setKey] = useState(0);

  // Generate mathematically accurate bell curve using Gaussian function
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

    // Close the path along the baseline
    points.push(`L 560,${baseY}`);
    points.push(`L 80,${baseY}`);
    points.push('Z');

    return points.join(' ');
  };

  const bellCurvePath = generateBellCurve();

  const restartAnimation = () => {
    setKey(prev => prev + 1);
  };

  const StatisticalLogo = ({ size = 1, animate = true }: { size?: number; animate?: boolean }) => {
    return (
      <svg
        viewBox="0 0 640 420"
        className="w-full h-full"
        style={{ maxWidth: `${640 * size}px` }}
      >
        <defs>
          {/* EXACT brand gradient from nav/hero buttons */}
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

          {/* Premium glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Text shadow */}
          <filter id="textShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.4" floodColor="#0369a1"/>
          </filter>

          {/* Soft shadow for curve */}
          <filter id="curveShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" floodColor="#0369a1"/>
          </filter>

          {/* Clip path for grid */}
          <clipPath id="bellCurveClip">
            <path d={bellCurvePath} />
          </clipPath>
        </defs>

        {/* Background */}
        <rect width="640" height="420" fill="transparent" />

        {/* Filled bell curve with smooth gradient and shadow */}
        <motion.path
          d={bellCurvePath}
          fill="url(#curveGradient)"
          filter="url(#curveShadow)"
          initial={animate ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1
          }}
          style={{ transformOrigin: "center" }}
        />

        {/* White grid overlay - perfectly clipped */}
        {showGrid && (
          <g clipPath="url(#bellCurveClip)">
            <motion.g
              initial={animate ? { opacity: 0 } : { opacity: 0.2 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Vertical grid lines - evenly spaced */}
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
              {/* Horizontal grid lines - evenly spaced */}
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

        {/* IIS Text - COMPLETELY WITHIN THE BLUE AREA - Each Letter Fades In */}
        {/* Curve: peak=80, base=340. Positioning at y=275 */}
        <g textAnchor="middle" fontSize="100" fontWeight="900" fill="url(#textGradient)" fontFamily="Georgia, 'Times New Roman', serif" filter="url(#textShadow)" letterSpacing="-0.02em">
          {/* Letter I */}
          <motion.text
            x="260"
            y="275"
            dominantBaseline="middle"
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.6,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            I
          </motion.text>

          {/* Letter I */}
          <motion.text
            x="320"
            y="275"
            dominantBaseline="middle"
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            I
          </motion.text>

          {/* Letter S */}
          <motion.text
            x="380"
            y="275"
            dominantBaseline="middle"
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 2.0,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            S
          </motion.text>
        </g>

        {/* Baseline with smooth animation */}
        <motion.line
          x1="80"
          y1="340"
          x2="560"
          y2="340"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Vertical center line (μ) */}
        <motion.line
          x1="320"
          y1="80"
          x2="320"
          y2="340"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
          initial={animate ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 0.6 }}
          animate={{ scaleY: 1, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center" }}
        />

        {/* Standard deviation markers - perfectly balanced */}
        {[
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
            initial={animate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2 + i * 0.08,
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

        {/* Elegant data points along the curve */}
        {animate && [0.20, 0.35, 0.50, 0.65, 0.80].map((position, i) => {
          const x = 80 + position * 480;
          const centerX = 320;
          const sigma = 75;
          const normalizedX = (x - centerX) / sigma;
          const gaussian = Math.exp(-0.5 * normalizedX * normalizedX);
          const y = 340 - (gaussian * 260);

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4.5"
              fill="#ffffff"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1, 1.3, 0],
                opacity: [0, 0.9, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 4,
                delay: 3 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          );
        })}

        {/* Elegant shimmer effect across IIS text */}
        {animate && (
          <motion.rect
            x="200"
            y="160"
            width="120"
            height="120"
            fill="url(#textGradient)"
            opacity="0"
            style={{ mixBlendMode: 'overlay' }}
            animate={{
              x: [200, 400],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 2.5,
              delay: 3.5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: [0.16, 1, 0.3, 1]
            }}
          />
        )}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-tight">
            IIS Statistical Logo
          </h1>
          <p className="text-xl text-slate-700 mb-2 font-medium">
            Six Sigma • Normal Distribution • Process Excellence
          </p>
          <p className="text-lg text-slate-600">
            Integrated Inspection Systems
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => setAnimated(!animated)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              animated
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-xl'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {animated ? '✓ Animated' : 'Static'}
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              showGrid
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-xl'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {showGrid ? '✓ Grid Overlay' : 'No Grid'}
          </button>
          <button
            onClick={restartAnimation}
            className="px-6 py-3 rounded-xl font-semibold transition-all shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl"
          >
            ↻ Replay
          </button>
        </motion.div>

        {/* Main Logo Display */}
        <motion.div
          key={key}
          className="bg-white rounded-3xl shadow-2xl p-16 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Subtle radial gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-transparent to-blue-50/30 rounded-3xl" />

          <div className="relative flex items-center justify-center">
            <StatisticalLogo size={1} animate={animated} />
          </div>
        </motion.div>

        {/* Size Variations */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-10 tracking-tight">Scalable Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-slate-50 rounded-2xl p-8 mb-4 flex items-center justify-center" style={{ minHeight: '220px' }}>
                <StatisticalLogo size={0.5} animate={false} />
              </div>
              <p className="text-base font-semibold text-slate-700">Small • 320×210px</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-50 rounded-2xl p-8 mb-4 flex items-center justify-center" style={{ minHeight: '280px' }}>
                <StatisticalLogo size={0.7} animate={false} />
              </div>
              <p className="text-base font-semibold text-slate-700">Medium • 448×294px</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-50 rounded-2xl p-8 mb-4 flex items-center justify-center" style={{ minHeight: '340px' }}>
                <StatisticalLogo size={0.9} animate={false} />
              </div>
              <p className="text-base font-semibold text-slate-700">Large • 576×378px</p>
            </div>
          </div>
        </motion.div>

        {/* Design Specifications */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Decorative gradient accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-bold mb-8 tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Design Features
              </h2>
              <ul className="space-y-5 text-slate-200 text-lg">
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Mathematically perfect Gaussian distribution (300 points)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Brand gradient: blue-600 → blue-500 → indigo-600</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Sequential letter animation - each letter fades in elegantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Subtle white grid (20% opacity) clipped to curve</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Complete Six Sigma markers (-3σ to +3σ)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Premium animations: bounce, shimmer, data pulses</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-cyan-400 text-2xl mt-1 font-bold">●</span>
                  <span>Infinitely scalable SVG with perfect rendering</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Decorative gradient accent */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-100/40 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Technical Details</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Color System</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Blue-600 → Blue-500 → Indigo-600 gradient with white text and shadow
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Distribution</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Gaussian: f(x) = e^(-½((x-μ)/σ)²) with σ=75px, perfectly smooth
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Grid Pattern</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    10px spacing, 49 vertical × 28 horizontal lines, clipped
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Typography</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Georgia serif (115px), sequential fade-in per letter, centered in curve
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Animation</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    Bounce easing, staggered timing, infinite data point loops
                  </p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-6 hover:border-cyan-600 transition-colors">
                  <h3 className="font-bold text-slate-900 mb-2 text-xl">Format</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    SVG vector, 640×420 viewBox, retina-ready, web-optimized
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}