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
        className="container relative z-10 pt-24 md:pt-28 pb-16 md:pb-20 px-4 md:px-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-5xl mx-auto"
        >

          {/* Main Title - Cleaner and more impactful */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tight leading-[0.95]">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-2xl uppercase"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              >
                PRECISION
              </motion.span>
              <motion.span
                className="block text-white drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 uppercase font-black"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
              >
                ENGINEERING
              </motion.span>
            </h1>
          </motion.div>

          {/* Single focused tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 md:mb-12 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Ultra-Precision Manufacturing for
            <span className="text-cyan-400 font-semibold"> Aerospace Critical Components</span>
          </motion.p>

          {/* CTA Buttons - Cleaner design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-300 px-8 md:px-10 h-12 md:h-14 text-base"
              asChild
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 px-8 md:px-10 h-12 md:h-14 text-base"
              asChild
            >
              <Link href="/services">
                View Capabilities
              </Link>
            </Button>
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