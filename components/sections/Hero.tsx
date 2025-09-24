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
        className="container relative z-10 pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Certification Badges - Better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
          >
            {['AS9100D', 'ITAR', 'ISO 9001:2015', 'NADCAP'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-cyan-400/40 bg-black/60 backdrop-blur-md"
              >
                <span className="text-[10px] md:text-xs font-semibold text-cyan-400">{cert}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title - Improved sizing and contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.1]"
          >
            <span className="text-white drop-shadow-2xl">Precision</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 drop-shadow-2xl"> Beyond</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="text-white drop-shadow-2xl">Expectations</span>
          </motion.h1>

          {/* Tagline - Better contrast */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 font-light drop-shadow-lg"
          >
            Advanced aerospace manufacturing with
            <span className="text-cyan-400 font-semibold"> ±0.0001"</span> precision
          </motion.p>

          {/* CTA Buttons - Better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all duration-300 px-6 md:px-8 h-12 md:h-14 text-base md:text-lg"
              asChild
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 bg-black/40 text-white hover:border-cyan-400/60 hover:bg-black/60 backdrop-blur-md transition-all duration-300 px-6 md:px-8 h-12 md:h-14 text-base md:text-lg font-medium"
              asChild
            >
              <Link href="/services">
                Explore Capabilities
              </Link>
            </Button>
          </motion.div>

          {/* Company Info - Better visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-12 md:mt-16 text-sm text-white/70"
          >
            <p className="font-medium">Integrated Inspection Systems, Inc.</p>
            <p className="text-xs mt-1 text-white/50">Serving aerospace & defense since 1995</p>
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