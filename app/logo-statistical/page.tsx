'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StatisticalLogoPage() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="relative">
        {/* Main Logo Container */}
        <motion.div
          className="relative w-[600px] h-[400px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 600 400"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.15"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Bell Curve Path */}
            <motion.path
              d="M 50 350 Q 100 350 150 340 Q 200 320 250 280 Q 280 240 300 180 Q 320 240 350 280 Q 400 320 450 340 Q 500 350 550 350"
              stroke="black"
              strokeWidth="12"
              fill="none"
              filter="url(#shadow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Animated gradient overlay on curve */}
            <motion.path
              d="M 50 350 Q 100 350 150 340 Q 200 320 250 280 Q 280 240 300 180 Q 320 240 350 280 Q 400 320 450 340 Q 500 350 550 350"
              stroke="url(#curve-gradient)"
              strokeWidth="10"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Base Line */}
            <motion.line
              x1="30"
              y1="360"
              x2="570"
              y2="360"
              stroke="black"
              strokeWidth="4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: "center" }}
            />

            {/* Standard Deviation Markers */}
            {/* -3σ marker */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <line x1="80" y1="355" x2="80" y2="365" stroke="black" strokeWidth="2" />
              <text
                x="80"
                y="390"
                textAnchor="middle"
                className="text-2xl font-bold"
                fill="black"
              >
                -3σ
              </text>
            </motion.g>

            {/* μ (mean) marker */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              <line x1="300" y1="355" x2="300" y2="365" stroke="black" strokeWidth="2" />
              <text
                x="300"
                y="390"
                textAnchor="middle"
                className="text-3xl font-bold"
                fill="black"
              >
                μ
              </text>
            </motion.g>

            {/* +3σ marker */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              <line x1="520" y1="355" x2="520" y2="365" stroke="black" strokeWidth="2" />
              <text
                x="520"
                y="390"
                textAnchor="middle"
                className="text-2xl font-bold"
                fill="black"
              >
                +3σ
              </text>
            </motion.g>

            {/* IIS Text in Triangle */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
            >
              {/* Triangle outline */}
              <path
                d="M 300 120 L 200 280 L 400 280 Z"
                stroke="none"
                fill="none"
              />

              {/* IIS Text */}
              <text
                x="300"
                y="230"
                textAnchor="middle"
                className="text-7xl font-black"
                fill="black"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                IIS
              </text>
            </motion.g>

            {/* Animated scan line */}
            {isAnimating && (
              <motion.line
                x1="300"
                y1="100"
                x2="300"
                y2="360"
                stroke="#0ea5e9"
                strokeWidth="1"
                opacity="0.6"
                animate={{
                  x1: [80, 520, 80],
                  x2: [80, 520, 80],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Animated data points */}
            {isAnimating && [
              { x: 150, y: 340 },
              { x: 200, y: 320 },
              { x: 250, y: 280 },
              { x: 300, y: 180 },
              { x: 350, y: 280 },
              { x: 400, y: 320 },
              { x: 450, y: 340 },
            ].map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="3"
                fill="#0ea5e9"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0],
                }}
                transition={{
                  delay: index * 0.2,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}

            {/* Six Sigma notation */}
            <motion.text
              x="300"
              y="40"
              textAnchor="middle"
              className="text-sm font-medium tracking-wider"
              fill="#0284c7"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              SIX SIGMA QUALITY STANDARD
            </motion.text>
          </svg>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Integrated Inspection Systems
          </h1>
          <p className="text-lg text-slate-600">
            Statistical Process Control • Precision Within ±0.0001"
          </p>
          <div className="mt-4 flex justify-center gap-8 text-sm text-slate-500">
            <div>Cp &gt; 1.67</div>
            <div>Cpk &gt; 1.33</div>
            <div>Zero Defects</div>
          </div>
        </motion.div>

        {/* Control Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 transition-colors font-medium"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </motion.div>

        {/* Mathematical Formula Display */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
        >
          <div className="inline-block bg-white rounded-lg shadow-lg p-6 font-mono text-sm">
            <div className="text-slate-600 mb-2">Normal Distribution:</div>
            <div className="text-lg">
              f(x) = (1/σ√(2π)) × e^(-½((x-μ)/σ)²)
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Where: μ = mean, σ = standard deviation
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}