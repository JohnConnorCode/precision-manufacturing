'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { StatisticalLogo } from '@/components/logos/iis-statistical-logo';
import Logo from '@/components/ui/logo';
import { Download, Zap, Grid3x3, Sparkles } from 'lucide-react';

export default function StatisticalLogoShowcase() {
  const [animated, setAnimated] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [key, setKey] = useState(0);

  const restartAnimation = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Brand Identity System</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Statistical Logo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-3 font-medium">
            Integrated Inspection Systems
          </p>
          <p className="text-lg text-slate-400">
            Six Sigma • Normal Distribution • Precision Excellence
          </p>
        </motion.div>

        {/* Interactive Controls */}
        <motion.div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setAnimated(!animated)}
            className={`group px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 ${
              animated
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-600/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            {animated ? 'Animated' : 'Static'}
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`group px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 ${
              showGrid
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-600/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            {showGrid ? 'Grid On' : 'Grid Off'}
          </button>
          <button
            onClick={restartAnimation}
            className="group px-6 py-3 rounded-xl font-semibold transition-all shadow-lg bg-emerald-600 text-white hover:shadow-2xl hover:shadow-emerald-600/40 hover:bg-emerald-500 flex items-center gap-2"
          >
            ↻ Replay Animation
          </button>
        </motion.div>

        {/* Main Hero Logo Display */}
        <motion.div
          key={key}
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12 md:p-20 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

          <div className="relative flex items-center justify-center min-h-[400px]">
            <StatisticalLogo size="lg" animated={animated} showGrid={showGrid} />
          </div>
        </motion.div>

        {/* Logo with Company Name */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Complete Brand Mark</h2>
          <div className="flex items-center justify-center">
            <Logo size="lg" showText={true} />
          </div>
        </motion.div>

        {/* Size Variations Grid */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">Scale & Versatility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { size: 'sm', label: 'Small', usage: 'Favicons, App Icons' },
              { size: 'md', label: 'Medium', usage: 'Navigation, Headers' },
              { size: 'lg', label: 'Large', usage: 'Hero Sections, Print' }
            ].map((variant, i) => (
              <motion.div
                key={variant.size}
                className="bg-white rounded-2xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-center justify-center mb-6" style={{ minHeight: variant.size === 'sm' ? '120px' : variant.size === 'md' ? '160px' : '200px' }}>
                  <StatisticalLogo size={variant.size as 'sm' | 'md' | 'lg'} animated={false} showGrid={showGrid} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{variant.label}</h3>
                <p className="text-sm text-slate-600">{variant.usage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Background Variations */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">Background Versatility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { bg: 'bg-white', label: 'Light Background', textColor: 'text-slate-900' },
              { bg: 'bg-slate-800', label: 'Dark Background', textColor: 'text-white' },
              { bg: 'bg-gradient-to-br from-blue-600 to-indigo-600', label: 'Brand Gradient', textColor: 'text-white' }
            ].map((variant, i) => (
              <motion.div
                key={variant.label}
                className={`${variant.bg} rounded-2xl p-8 text-center`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
              >
                <div className="flex items-center justify-center mb-6" style={{ minHeight: '160px' }}>
                  <Logo size="md" showText={false} variant={variant.bg === 'bg-white' ? 'default' : 'light'} />
                </div>
                <h3 className={`text-lg font-bold ${variant.textColor} mb-1`}>{variant.label}</h3>
                <p className={`text-sm ${variant.textColor} opacity-70`}>Perfect clarity</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design System Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Design Features */}
          <motion.div
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white shadow-2xl border border-slate-700/50 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Design Features
              </h2>
              <ul className="space-y-4 text-slate-300">
                {[
                  'Mathematically perfect Gaussian distribution curve',
                  'Brand gradient: Blue-600 → Blue-500 → Indigo-600',
                  'Sequential letter animation with elegant easing',
                  'Subtle grid overlay clipped to curve boundary',
                  'Complete Six Sigma notation (-3σ to +3σ)',
                  'Premium drop shadows and glow effects',
                  'Infinitely scalable vector format (SVG)',
                  'Optimized for web, print, and embroidery'
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
                  >
                    <span className="text-blue-400 text-xl mt-0.5">•</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Technical Specifications */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Technical Specs</h2>
              <div className="space-y-6">
                {[
                  { label: 'Dimensions', value: 'Responsive SVG (70×70 to 500×320 viewBox)' },
                  { label: 'Color Profile', value: 'RGB: #2563eb, #3b82f6, #6366f1' },
                  { label: 'Typography', value: 'Georgia Serif, 100px, 900 weight' },
                  { label: 'Grid System', value: '10px spacing, 49×28 lines, 20% opacity' },
                  { label: 'Mathematical Formula', value: 'f(x) = e^(-½((x-μ)/σ)²), σ=75' },
                  { label: 'Animation', value: 'Framer Motion, custom easing [0.16, 1, 0.3, 1]' },
                  { label: 'File Format', value: 'SVG, React Component, Embeddable' },
                  { label: 'Accessibility', value: 'ARIA labels, semantic markup' }
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    className="border-l-4 border-blue-600 pl-4 hover:border-blue-500 transition-colors"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
                  >
                    <h3 className="font-bold text-slate-900 mb-1">{spec.label}</h3>
                    <p className="text-sm text-slate-600">{spec.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Usage Guidelines */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Brand Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: 'DO',
                color: 'emerald',
                items: [
                  'Maintain minimum 40px height',
                  'Use on contrasting backgrounds',
                  'Keep adequate clear space',
                  'Use provided color values'
                ]
              },
              {
                icon: '⚠',
                title: 'CAUTION',
                color: 'amber',
                items: [
                  'Avoid busy background patterns',
                  'Test on all target displays',
                  'Verify color reproduction',
                  'Check animation performance'
                ]
              },
              {
                icon: '✕',
                title: 'DON\'T',
                color: 'rose',
                items: [
                  'Alter proportions or distort',
                  'Change brand gradient colors',
                  'Remove grid or sigma markers',
                  'Use low-resolution rasters'
                ]
              }
            ].map((guideline, i) => (
              <motion.div
                key={guideline.title}
                className={`bg-${guideline.color}-600/10 border border-${guideline.color}-600/20 rounded-2xl p-6`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
              >
                <div className={`text-4xl mb-4 text-${guideline.color}-400`}>{guideline.icon}</div>
                <h3 className={`text-xl font-bold text-${guideline.color}-400 mb-4`}>{guideline.title}</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {guideline.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={`text-${guideline.color}-400 mt-1`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold text-lg">Download Brand Assets</div>
              <div className="text-sm text-blue-100">SVG, PNG, React Component</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
