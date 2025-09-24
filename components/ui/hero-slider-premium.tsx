'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  interval = 7000,
  className = ''
}: HeroSliderPremiumProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollY } = useScroll();

  // Smooth parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -200], {
    clamp: false
  });

  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % slides.length);
        setIsTransitioning(false);
      }, 50);
    }, interval);

    return () => clearInterval(timer);
  }, [nextIndex, slides.length, interval]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex((index + 1) % slides.length);
      setIsTransitioning(false);
    }, 50);
  };

  const getFocalPosition = (focal?: string) => {
    switch(focal) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      default: return 'object-center';
    }
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Current image layer */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y, scale, opacity }}
      >
        <div className="relative w-full h-full">
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            className={cn(
              "object-cover transition-transform ease-out",
              getFocalPosition(slides[currentIndex].focal),
              !isTransitioning ? 'scale-105' : 'scale-100'
            )}
            style={{ transitionDuration: '7000ms' }}
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Next image layer (underneath for seamless transition) */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y, scale }}
      >
        <div className="relative w-full h-full">
          <Image
            src={slides[nextIndex].src}
            alt={slides[nextIndex].alt}
            fill
            className={cn(
              "object-cover",
              getFocalPosition(slides[nextIndex].focal)
            )}
            priority={false}
            quality={90}
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Premium gradient overlay - subtle and elegant */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/70" />

        {/* Radial vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.2) 60%, rgba(15, 23, 42, 0.5) 100%)'
          }}
        />

        {/* Top fade for header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/80 to-transparent" />

        {/* Bottom fade for content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/90 to-transparent" />
      </div>

      {/* Subtle animated accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Premium slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative p-1 group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="relative">
                <div className={cn(
                  'h-[2px] transition-all duration-700 ease-out',
                  index === currentIndex
                    ? 'w-10 bg-cyan-400'
                    : 'w-6 bg-white/20 hover:bg-white/40 group-hover:w-8'
                )} />

                {/* Active indicator glow */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 h-[2px] w-10 bg-cyan-400"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(6, 182, 212, 0)',
                        '0 0 20px 4px rgba(6, 182, 212, 0.3)',
                        '0 0 0 0 rgba(6, 182, 212, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}

                {/* Progress bar for active slide */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 h-[2px] bg-white/60 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: interval / 1000,
                      ease: 'linear'
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cross-fade overlay for transitions */}
      <motion.div
        className="absolute inset-0 bg-slate-950 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0.3 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </div>
  );
}