"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import BackgroundSlider from '@/components/ui/background-slider';
import { theme, styles, cn } from '@/lib/theme';

export default function Hero() {
  const heroImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Dynamic Background Slider */}
      <BackgroundSlider
        images={heroImages}
        interval={6000}
        className="opacity-50"
      />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      <div className="container relative z-10 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
              INTEGRATED
            </span>
            <span className="block text-white mt-2">
              INSPECTION SYSTEMS
            </span>
          </motion.h1>

          {/* Clear Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Aerospace-Grade Precision Manufacturing
            <span className="block text-base md:text-lg text-slate-400 mt-2">
              AS9100D Certified • ITAR Registered • Since 1995
            </span>
          </motion.p>

          {/* Single Clear CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-4 border-2 border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 font-medium text-lg transition-all duration-300"
            >
              <Link href="/services">
                Our Capabilities
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-500 animate-bounce" />
        </motion.div>
      </div>

      {/* Subtle Gradient Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}