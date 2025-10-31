"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import HeroSliderFixed from '@/components/ui/hero-slider-fixed';
import { usePrefersReducedMotion, getMotionVariants } from '@/lib/motion';

interface HeroData {
  mainTitle?: string;
  subTitle?: string;
  tagline?: string;
  badges?: string[];
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
  backgroundSlides?: Array<{
    image: string;
    alt: string;
    focal: 'center' | 'top' | 'bottom';
  }>;
}

interface HeroProps {
  data?: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const textY = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 50]);
  const textOpacity = useTransform(scrollY, [0, 300], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Use CMS data or fallback to defaults
  const heroSlides = data?.backgroundSlides?.map(slide => ({
    src: slide.image,
    alt: slide.alt,
    focal: slide.focal
  })) || [
    {
      src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=95',
      alt: 'Advanced 5-axis CNC machining center',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2400&q=95',
      alt: 'Precision metrology and inspection',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=95',
      alt: 'Automated manufacturing systems',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=95',
      alt: 'Industrial engineering and process development',
      focal: 'center' as const
    },
    {
      src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=2400&q=95',
      alt: 'Defense and aerospace components manufacturing',
      focal: 'center' as const
    }
  ];

  const mainTitle = data?.mainTitle || 'PRECISION MANUFACTURING';
  const subTitle = data?.subTitle || 'SERVICES';
  const tagline = data?.tagline || 'Innovative Precision Machining & Manufacturing Excellence Since 1995';
  const badges = data?.badges || [
    'Advanced CNC Machining',
    'Precision Metrology',
    'Engineering Excellence',
    '3 Sigma Yield'
  ];
  const ctaPrimary = data?.ctaPrimary || { text: 'Get Quote', href: '/contact?interest=quote' };
  const ctaSecondary = data?.ctaSecondary || { text: 'View Capabilities', href: '/services' };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background Slider */}
      <HeroSliderFixed slides={heroSlides} />

      {/* Content Container */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 px-6 md:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center space-y-8"
          >

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm text-white/70 font-medium tracking-wide">SINCE 1995</span>
            </motion.div>

            {/* Main Headline - Clean and balanced */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Precision Manufacturing
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400">
                  Excellence
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed"
            >
              {tagline}
            </motion.p>

            {/* Capabilities Grid */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.0, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : (1.2 + index * 0.1), duration: prefersReducedMotion ? 0 : 0.5 }}
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <span className="text-sm font-medium text-white/90">{badge}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: prefersReducedMotion ? 0 : 0.8 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 px-8 h-12"
                asChild
              >
                <Link href={ctaSecondary.href}>
                  {ctaSecondary.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2.5, duration: prefersReducedMotion ? 0 : 1, ease: [0.33, 1, 0.68, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : {
            y: [0, 8, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 2,
            repeat: Infinity,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="text-white/50 hover:text-white/70 transition-colors cursor-pointer"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}