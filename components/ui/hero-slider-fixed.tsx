'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SlideData {
  src: string;
  alt: string;
  focal?: 'center' | 'top' | 'bottom';
}

interface HeroSliderFixedProps {
  slides: SlideData[];
  interval?: number;
  className?: string;
}

export default function HeroSliderFixed({
  slides,
  interval = 8000,
  className = ''
}: HeroSliderFixedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useScroll();

  // Smooth parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload all images on mount
  useEffect(() => {
    if (!isClient) return;

    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, [slides, isClient]);

  // Auto-advance slides
  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval, isClient]);

  const getFocalPosition = (focal?: string) => {
    switch(focal) {
      case 'top': return 'object-top';
      case 'bottom': return 'object-bottom';
      default: return 'object-center';
    }
  };

  if (!isClient) {
    // Server-side: show first image statically
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <div className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
          <div className="relative w-full h-full">
            <Image
              src={slides[0].src}
              alt={slides[0].alt}
              fill
              className={cn(
                "object-cover",
                getFocalPosition(slides[0].focal)
              )}
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Stack all images, only show current one */}
      {slides.map((slide, index) => (
        <motion.div
          key={`slide-${index}`}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
          style={{ y, scale }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            transition: {
              opacity: {
                duration: 1.5,
                ease: "easeInOut"
              }
            }
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={cn(
                "object-cover",
                getFocalPosition(slide.focal)
              )}
              priority={index === 0}
              quality={100}
              sizes="100vw"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Subtle Ken Burns effect only on current image */}
            {index === currentIndex && (
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
            )}
          </div>
        </motion.div>
      ))}

      {/* Strong gradient overlay for maximum text contrast */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Main gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Center focus vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 100%)'
          }}
        />

        {/* Top gradient for header */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

        {/* Bottom gradient for content */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}