"use client";

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Gauge, Calendar, ChevronDown, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import BackgroundSlider from '@/components/ui/background-slider';
import { theme, styles, cn } from '@/lib/theme';
import { useScrollReveal, fadeInUp, scaleIn } from '@/hooks/useScrollReveal';
import { useMouseParallax, useMouseRotation } from '@/hooks/useMouseParallax';

// Lazy load 3D components
const PrecisionPart = lazy(() => import('@/components/3d/PrecisionPart'));
const ParticleField = lazy(() => import('@/components/effects/ParticleField'));

export default function Hero() {
  const { ref: revealRef, controls } = useScrollReveal();
  const { ref: parallaxRef } = useMouseParallax(0.02);
  const rotation = useMouseRotation(0.01);
  const heroImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837'
  ];

  const stats = [
    { label: 'FOUNDED', value: '1995', icon: Calendar },
    { label: 'CERTIFIED', value: 'AS9100D', icon: Award },
    { label: 'COMPLIANT', value: 'ITAR', icon: Shield },
    { label: 'QUALITY', value: 'ISO 9001', icon: Gauge }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 lg:pt-40">
      {/* Dynamic Background Slider */}
      <BackgroundSlider
        images={heroImages}
        interval={6000}
        className="opacity-30"
      />

      {/* Particle Background */}
      <Suspense fallback={null}>
        <ParticleField className="opacity-30" />
      </Suspense>

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* 3D Precision Part */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 opacity-20 lg:opacity-40">
        <Suspense fallback={null}>
          <PrecisionPart className="w-full h-full" />
        </Suspense>
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={revealRef}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Company Badge with Mouse Parallax */}
          <motion.div
            ref={parallaxRef as any}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`
            }}
          >
            <span className={cn(theme.components.badge.dark, 'px-4 py-2')}>
              <Zap className="w-3 h-3 mr-2 text-cyan-400" />
              PRECISION AEROSPACE MANUFACTURING • EST. 1995
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={cn(theme.typography.h1, 'mb-6')}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
              INTEGRATED
            </span>
            <span className="block text-white mt-2">
              INSPECTION SYSTEMS
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={cn(theme.typography.lead, 'text-cyan-400/80 mb-6')}
          >
            Advanced Precision Manufacturing Solutions
          </motion.p>

          {/* Company Mission */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={cn(theme.typography.body, 'text-slate-400 mb-12 max-w-3xl mx-auto')}
          >
            Aerospace-grade precision with cutting-edge technology. ITAR registered,
            AS9100D certified, delivering mission-critical components with
            uncompromising quality standards.
          </motion.p>

          {/* Stats Grid with Stagger Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={cn(theme.components.card.glass, 'p-4 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group cursor-pointer')}
              >
                <stat.icon className="w-5 h-5 text-cyan-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{stat.value}</div>
                <div className={cn(theme.typography.badge, 'text-slate-400 mt-1')}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className={cn(theme.components.button.primary, 'group px-8 py-4 relative overflow-hidden')}
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-4 border-2 border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 font-semibold text-base transition-all duration-300"
            >
              <Link href="/services">
                Explore Capabilities
              </Link>
            </Button>
          </motion.div>

          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-sm"
          >
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">5-Axis Machining</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">CMM Inspection</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">Fixture Design</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">Metrology</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">Metbase®</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-600 animate-bounce" />
        </motion.div>
      </div>

      {/* High-Tech Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-full blur-[100px]" />
      </div>
    </section>
  );
}