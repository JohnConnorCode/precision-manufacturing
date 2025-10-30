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
        className="container relative z-10 px-6 md:px-8 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >

          {/* Main Title - Compact inline layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="mb-6"
          >
            <h1 className="font-bold leading-tight">
              <motion.span
                className="block text-white/90 uppercase text-2xl sm:text-3xl md:text-4xl tracking-wide mb-2"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                PRECISION MANUFACTURING
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4))' }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.6, duration: prefersReducedMotion ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                SERVICES
              </motion.span>
            </h1>
          </motion.div>

          {/* Visual separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: prefersReducedMotion ? 0 : 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"
          />

          {/* Tagline - constrained width for readability */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.0, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10"
          >
            {tagline}
          </motion.p>

          {/* Certification Badges - tighter, smaller */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto"
          >
            {badges.map((badge, index) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : (1.3 + index * 0.1), duration: prefersReducedMotion ? 0 : 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/80 border border-white/10 backdrop-blur-sm"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Button - single, prominent */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.6, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 px-8 h-12 text-base"
              asChild
            >
              <Link href={ctaSecondary.href}>
                {ctaSecondary.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

        </motion.div>
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