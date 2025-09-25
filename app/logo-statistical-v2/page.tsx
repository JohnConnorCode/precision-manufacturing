'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function StatisticalLogoV2Page() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'tiny' | 'small' | 'medium' | 'large'>('large');

  const sizes = {
    tiny: { width: 48, height: 48, scale: 0.12 },
    small: { width: 96, height: 96, scale: 0.24 },
    medium: { width: 192, height: 192, scale: 0.48 },
    large: { width: 384, height: 384, scale: 0.96 },
  };

  const LogoSVG = ({ scale = 1, animated = true }) => (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="textShadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.2"/>
        </filter>
      </defs>

      {/* White background */}
      <rect x="0" y="0" width="600" height="400" fill="white" />

      {/* Bell Curve - Proper positioning ABOVE the text */}
      <motion.path
        d={`M 50 350
            C 50 350, 100 350, 150 340
            C 200 320, 250 280, 280 240
            C 295 200, 300 140
            C 305 200, 320 240
            C 350 280, 400 320, 450 340
            C 500 350, 550 350, 550 350`}
        stroke="black"
        strokeWidth={scale < 0.24 ? "8" : "4"}
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={animated ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Base Line */}
      <motion.line
        x1="30"
        y1="360"
        x2="570"
        y2="360"
        stroke="black"
        strokeWidth={scale < 0.24 ? "6" : "3"}
        strokeLinecap="round"
        initial={animated ? { scaleX: 0 } : { scaleX: 1 }}
        animate={animated ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      {/* IIS Text - Positioned INSIDE the curve triangle area */}
      <motion.text
        x="300"
        y="260"
        textAnchor="middle"
        fontSize={scale < 0.24 ? "120" : "90"}
        fontWeight="bold"
        fill="black"
        fontFamily="Georgia, Times New Roman, serif"
        filter="url(#textShadow)"
        initial={animated ? { opacity: 0 } : { opacity: 1 }}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        IIS
      </motion.text>

      {/* Statistical Markers below the line */}
      {scale >= 0.48 && (
        <>
          {/* -3σ marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <line x1="100" y1="355" x2="100" y2="365" stroke="black" strokeWidth="2" />
            <text
              x="100"
              y="385"
              textAnchor="middle"
              fontSize="16"
              fill="black"
              fontFamily="Times New Roman, serif"
            >
              -3σ
            </text>
          </motion.g>

          {/* μ marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            <line x1="300" y1="355" x2="300" y2="365" stroke="black" strokeWidth="2" />
            <text
              x="300"
              y="385"
              textAnchor="middle"
              fontSize="20"
              fill="black"
              fontFamily="Times New Roman, serif"
              fontStyle="italic"
            >
              μ
            </text>
          </motion.g>

          {/* +3σ marker */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <line x1="500" y1="355" x2="500" y2="365" stroke="black" strokeWidth="2" />
            <text
              x="500"
              y="385"
              textAnchor="middle"
              fontSize="16"
              fill="black"
              fontFamily="Times New Roman, serif"
            >
              +3σ
            </text>
          </motion.g>
        </>
      )}
    </svg>
  );

  const LogoCompact = ({ scale = 1 }) => (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified version for small sizes */}
      <rect x="0" y="0" width="400" height="400" fill="white" />

      {/* Simple curve */}
      <path
        d="M 50 300 Q 200 150, 350 300"
        stroke="black"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
      />

      {/* Base */}
      <line
        x1="50"
        y1="300"
        x2="350"
        y2="300"
        stroke="black"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Text */}
      <text
        x="200"
        y="250"
        textAnchor="middle"
        fontSize="100"
        fontWeight="bold"
        fill="black"
        fontFamily="Georgia, serif"
      >
        IIS
      </text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Statistical Logo - Correct Layout</h1>

        {/* Size Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(sizes).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size as 'tiny' | 'small' | 'medium' | 'large')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 shadow'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Logo Display */}
        <div className="flex justify-center mb-16">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            style={{
              width: sizes[selectedSize].width + 64,
              height: sizes[selectedSize].height + 64
            }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div style={{
              width: sizes[selectedSize].width,
              height: sizes[selectedSize].height
            }}>
              {sizes[selectedSize].scale < 0.24 ? (
                <LogoCompact scale={sizes[selectedSize].scale} />
              ) : (
                <LogoSVG scale={sizes[selectedSize].scale} animated={isHovered} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Application Sizes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-slate-100 p-4 rounded-lg mb-2">
                <div className="w-12 h-12 mx-auto">
                  <LogoCompact scale={0.12} />
                </div>
              </div>
              <p className="text-xs text-slate-600">48px Icon</p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 p-4 rounded-lg mb-2">
                <div className="w-24 h-24 mx-auto">
                  <LogoCompact scale={0.24} />
                </div>
              </div>
              <p className="text-xs text-slate-600">96px Badge</p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 p-4 rounded-lg mb-2">
                <div className="w-32 h-32 mx-auto">
                  <LogoSVG scale={0.32} animated={false} />
                </div>
              </div>
              <p className="text-xs text-slate-600">128px Header</p>
            </div>

            <div className="text-center">
              <div className="bg-slate-100 p-4 rounded-lg mb-2">
                <div className="w-48 h-32 mx-auto">
                  <LogoSVG scale={0.48} animated={false} />
                </div>
              </div>
              <p className="text-xs text-slate-600">192px Display</p>
            </div>
          </div>
        </div>

        {/* Design Notes */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Design Structure</h2>
          <div className="space-y-4 text-sm text-slate-300">
            <p>• Bell curve positioned above and around the text</p>
            <p>• IIS text sits within the triangular space formed by the curve</p>
            <p>• Statistical markers (μ, ±3σ) positioned below the baseline</p>
            <p>• Georgia serif font for classical statistical feel</p>
            <p>• Simplified version for small sizes maintains clarity</p>
          </div>
        </div>
      </div>
    </div>
  );
}