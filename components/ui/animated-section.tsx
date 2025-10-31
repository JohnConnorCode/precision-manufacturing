'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, scrollAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animateOnce?: boolean;
  amount?: number;
  disabled?: boolean;
}

/**
 * Reusable animated section component that fades in and moves up on scroll
 * DRY principle: Replaces repetitive motion.div scroll animations throughout the app
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  animateOnce = true,
  amount = 0.3,
  disabled = false,
  ...motionProps
}: AnimatedSectionProps) {
  // If animations are disabled, return a regular div
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const animationVariants = {
    ...fadeInUp,
    animate: {
      ...(typeof fadeInUp.animate === 'object' && fadeInUp.animate !== null ? fadeInUp.animate : {}),
      transition: {
        ...(typeof fadeInUp.animate === 'object' &&
           fadeInUp.animate !== null &&
           'transition' in fadeInUp.animate ?
           (fadeInUp.animate as any).transition : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay,
        },
      }}
      viewport={{ once: animateOnce, amount }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}