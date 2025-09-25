'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

interface HeroSectionProps {
  // Image Configuration
  backgroundImage: string;
  imageAlt: string;

  // Content
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  description?: string | ReactNode;

  // Buttons
  buttons?: HeroButton[];

  // Layout Options
  height?: 'full' | 'large' | 'medium';
  alignment?: 'left' | 'center' | 'right';
  showScrollIndicator?: boolean;

  // Additional classes
  className?: string;
}

export default function HeroSection({
  backgroundImage,
  imageAlt,
  badge,
  title,
  subtitle,
  description,
  buttons = [],
  height = 'large',
  alignment = 'center',
  showScrollIndicator = false,
  className = ''
}: HeroSectionProps) {
  const { scrollY } = useScroll();

  // Parallax effects
  const imageY = useTransform(scrollY, [0, 1000], [0, -200]);
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]'
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const BadgeIcon = badge?.icon;

  return (
    <section className={cn(
      'relative flex items-center overflow-hidden',
      heightClasses[height],
      className
    )}>
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          className="object-cover object-center animate-fade-in"
          priority={true}
          loading="eager"
          quality={95}
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-transparent to-blue-950/30" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="container relative z-10 px-4 md:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className={cn(
          'max-w-5xl mx-auto flex flex-col',
          alignmentClasses[alignment]
        )}>
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
                {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-2" />}
                {badge.text}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight"
          >
            {typeof title === 'string' ? (
              <span className="text-white">{title}</span>
            ) : (
              title
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-light"
            >
              {subtitle}
            </motion.div>
          )}

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-base sm:text-lg md:text-xl text-white/70 mb-10 max-w-3xl"
            >
              {description}
            </motion.p>
          )}

          {/* Buttons */}
          {buttons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'left' && 'justify-start',
                alignment === 'right' && 'justify-end'
              )}
            >
              {buttons.map((button, index) => {
                const ButtonIcon = button.icon || ArrowRight;
                const isPrimary = button.variant === 'primary' || index === 0;

                return (
                  <Button
                    key={button.href}
                    size="lg"
                    variant={isPrimary ? 'default' : 'outline'}
                    className={cn(
                      'group h-12 md:h-14 px-8 md:px-10 text-base font-semibold',
                      isPrimary
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/30'
                        : 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm'
                    )}
                    asChild
                  >
                    <Link href={button.href}>
                      {button.label}
                      <ButtonIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.33, 1, 0.68, 1]
            }}
            className="text-white/50 hover:text-white/70 transition-colors cursor-pointer"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}