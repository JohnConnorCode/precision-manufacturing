"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import HeroSliderPremium from '@/components/ui/hero-slider-premium';

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 30]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=2400&q=90',
      alt: 'Precision CNC machining center',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2400&q=90',
      alt: 'Quality inspection and metrology',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=2400&q=90',
      alt: 'Aerospace component manufacturing',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=2400&q=90',
      alt: 'Advanced robotics and automation',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=2400&q=90',
      alt: 'Precision measurement technology',
      focal: 'top' as const
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background Slider */}
      <HeroSliderPremium slides={heroSlides} />

      {/* Content Container - Clean and Focused */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 pt-32 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Certification Badges - Subtle and Premium */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {['AS9100D', 'ITAR', 'ISO 9001:2015', 'NADCAP'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="px-4 py-2 rounded-full border border-cyan-500/20 bg-slate-950/30 backdrop-blur-sm"
              >
                <span className="text-xs font-medium text-cyan-400/90">{cert}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title - Clean Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Precision</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Beyond</span>
            <br />
            <span className="text-white">Expectations</span>
          </motion.h1>

          {/* Tagline - Sophisticated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 font-light"
          >
            Advanced aerospace manufacturing with
            <span className="text-cyan-400 font-normal"> ±0.0001"</span> precision
          </motion.p>

          {/* CTA Buttons - Premium Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 px-8"
              asChild
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-950/50 text-white hover:border-cyan-500/50 hover:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 px-8"
              asChild
            >
              <Link href="/services">
                Explore Capabilities
              </Link>
            </Button>
          </motion.div>

          {/* Company Info - Subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-16 text-sm text-slate-400"
          >
            <p>Integrated Inspection Systems, Inc.</p>
            <p className="text-xs mt-1 text-slate-500">Serving aerospace & defense since 1995</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 hover:text-white/60 transition-colors cursor-pointer"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}