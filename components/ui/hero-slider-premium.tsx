'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SlideData {
  src: string;
  alt: string;
  focal?: 'center' | 'top' | 'bottom';
}

interface HeroSliderPremiumProps {
  slides: SlideData[];
  interval?: number;
  className?: string;
}

export default function HeroSliderPremium({
  slides,
  interval = 8000,
  className = ''
}: HeroSliderPremiumProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();

  // Smooth parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const getFocalPosition = (focal?: string) => {
    switch(focal) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      default: return 'object-center';
    }
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Smooth cross-fade image transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
          style={{ y, scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].alt}
              fill
              className={cn(
                "object-cover",
                getFocalPosition(slides[currentIndex].focal)
              )}
              priority
              quality={95}
              sizes="100vw"
            />

            {/* Subtle Ken Burns effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.08],
              }}
              transition={{
                scale: {
                  duration: interval / 1000,
                  ease: "linear"
                }
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Strong gradient overlay for maximum text contrast */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Main gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Center focus vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)'
          }}
        />

        {/* Strong top fade for nav */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 to-transparent" />

        {/* Strong bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </div>
  );
}