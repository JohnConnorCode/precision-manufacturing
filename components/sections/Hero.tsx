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

      {/* Content Container - Unified Max Width */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 px-6 md:px-8"
      >
        {/* Single max-width container for ALL content - consistent alignment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-4xl mx-auto"
        >

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0 : 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8 md:mb-10"
          >
            <h1 className="font-black leading-[1.05]">
              {/* PRECISION */}
              <motion.span
                className="block text-white uppercase text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))' }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                PRECISION
              </motion.span>
              {/* MANUFACTURING */}
              <motion.span
                className="block text-white uppercase text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))' }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.55, duration: prefersReducedMotion ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                MANUFACTURING
              </motion.span>
              {/* SERVICES - with gradient */}
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 uppercase text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] tracking-tight"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(59, 130, 246, 0.6))' }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: prefersReducedMotion ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                SERVICES
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline - no nested max-width */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.9, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed mb-12 md:mb-14"
          >
            {tagline}
          </motion.p>

          {/* Certification Badges - no nested max-width */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.1, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          >
            {badges.map((badge, index) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : (1.3 + index * 0.1), duration: prefersReducedMotion ? 0 : 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="inline-flex items-center px-6 py-3 rounded-full text-sm md:text-base font-semibold bg-white/10 text-white border border-white/30 backdrop-blur-md shadow-xl"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1.6, duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="flex justify-center items-center"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 text-white font-bold shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 px-10 md:px-12 h-14 md:h-16 text-lg md:text-xl"
              asChild
            >
              <Link href={ctaSecondary.href}>
                {ctaSecondary.text}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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