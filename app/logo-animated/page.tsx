'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedLogoPage() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="relative">
        {/* Main Logo Container */}
        <motion.div
          className="relative w-96 h-96 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Outer Ring with Rotation */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: isAnimating ? 360 : 0 }}
            transition={{
              duration: 20,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                opacity="0.5"
              />
            </svg>
          </motion.div>

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-8"
            animate={{ rotate: isAnimating ? -360 : 0 }}
            transition={{
              duration: 15,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 336 336" className="w-full h-full">
              <circle
                cx="168"
                cy="168"
                r="150"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeDasharray="20 10"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Inner Tech Pattern */}
          <motion.div
            className="absolute inset-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-full h-full relative">
              {/* Circuit Board Pattern */}
              <svg viewBox="0 0 268 268" className="w-full h-full absolute">
                <g stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.4">
                  <path d="M67 67 L201 67 L201 201 L67 201 Z" />
                  <path d="M100 100 L168 100 L168 168 L100 168 Z" />
                  <circle cx="67" cy="67" r="4" fill="#06b6d4" />
                  <circle cx="201" cy="67" r="4" fill="#06b6d4" />
                  <circle cx="201" cy="201" r="4" fill="#06b6d4" />
                  <circle cx="67" cy="201" r="4" fill="#06b6d4" />
                </g>
              </svg>

              {/* Center IIS Logo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    IIS
                  </motion.div>
                  <motion.div
                    className="text-xs uppercase tracking-widest text-cyan-400 mt-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    Integrated
                  </motion.div>
                  <motion.div
                    className="text-xs uppercase tracking-widest text-cyan-400"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                  >
                    Inspection
                  </motion.div>
                  <motion.div
                    className="text-xs uppercase tracking-widest text-cyan-400"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    Systems
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Pulsing Dots */}
          {[0, 90, 180, 270].map((angle, index) => {
            const radius = 180;
            const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
            return (
              <motion.div
                key={angle}
                className="absolute w-3 h-3"
                style={{
                  left: `${(x / 400) * 100}%`,
                  top: `${(y / 400) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{
                  delay: 1.5 + index * 0.1,
                  duration: 0.6,
                  repeat: isAnimating ? Infinity : 0,
                  repeatDelay: 2,
                }}
              >
                <div className="w-full h-full bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
              </motion.div>
            );
          })}

          {/* Scanning Line Effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnimating ? 1 : 0 }}
          >
            <motion.div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              animate={{
                y: isAnimating ? ["0%", "400%"] : "0%",
              }}
              transition={{
                duration: 2,
                repeat: isAnimating ? Infinity : 0,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Glowing Effect */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <h1 className="text-2xl font-light text-white mb-2">
            Precision Manufacturing Excellence
          </h1>
          <p className="text-sm text-cyan-400">
            Advanced Metrology &amp; Inspection Solutions
          </p>
        </motion.div>

        {/* Control Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-6 py-2 bg-cyan-600/20 border border-cyan-600/50 rounded-lg text-cyan-400 hover:bg-cyan-600/30 transition-colors"
          >
            {isAnimating ? 'Pause Animation' : 'Resume Animation'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}