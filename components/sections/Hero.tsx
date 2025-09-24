"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import HeroSliderPremium from '@/components/ui/hero-slider-premium';

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 50]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2400&q=90',
      alt: 'Advanced 5-axis CNC machining center',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=2400&q=90',
      alt: 'Precision aerospace components manufacturing',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400&q=90',
      alt: 'High-precision metrology and inspection',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=2400&q=90',
      alt: 'Aerospace turbine blade manufacturing',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1633614907351-22492e5458bb?w=2400&q=90',
      alt: 'Defense systems precision engineering',
      focal: 'center' as const
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background Slider */}
      <HeroSliderPremium slides={heroSlides} />

      {/* Content Container - Professional and Clean */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Certification Badges - Clean and Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
          >
            {['AS9100D', 'ITAR', 'ISO 9001:2015', 'NADCAP'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="px-4 md:px-5 py-2 rounded-full border border-cyan-400/30 bg-black/40 backdrop-blur-md"
              >
                <span className="text-[11px] md:text-xs font-semibold text-cyan-400 tracking-wider">{cert}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title - Bold and Clear with Unique Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-[1.05]">
              <motion.span
                className="block text-white drop-shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Aerospace
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 drop-shadow-2xl relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Precision
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-cyan-300/20 to-blue-400/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
              <motion.span
                className="block text-white drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Manufacturing Excellence
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline - Professional and Impactful */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 md:mb-14 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Delivering mission-critical components with
            <span className="text-cyan-400 font-semibold"> ±0.0001"</span> precision
            <span className="block text-base md:text-lg text-white/70 mt-3">
              Since 1995 • Bali, Indonesia
            </span>
          </motion.p>

          {/* CTA Buttons - Professional Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/40 transition-all duration-500 px-8 md:px-10 h-14 md:h-16 text-base md:text-lg"
              asChild
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-500 px-8 md:px-10 h-14 md:h-16 text-base md:text-lg font-medium"
              asChild
            >
              <Link href="/services">
                Explore Capabilities
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators - Professional Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 md:mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '30+', label: 'Years' },
              { value: '500+', label: 'Projects' },
              { value: '99.97%', label: 'Quality' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.5 + index * 0.1,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="text-white/50 hover:text-white/70 transition-colors cursor-pointer"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}