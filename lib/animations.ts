import { Variants, Transition } from 'framer-motion';

// Standardized animation timings (in seconds)
export const animationDuration = {
  instant: 0,
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  slower: 1.2,
  slowest: 2,
} as const;

// Standardized easing functions
export const animationEasing = {
  // Smooth and natural easing
  smooth: [0.43, 0.13, 0.23, 0.96],
  // Quick start, smooth end
  easeOut: [0.25, 0.1, 0.25, 1],
  // Smooth start, quick end
  easeIn: [0.42, 0, 1, 1],
  // Smooth both ends
  easeInOut: [0.42, 0, 0.58, 1],
  // Spring-like bounce
  spring: [0.68, -0.55, 0.265, 1.55],
  // Linear (no easing)
  linear: [0, 0, 1, 1],
} as const;

// Spring animation presets
export const springPresets = {
  gentle: { type: 'spring', stiffness: 100, damping: 20 },
  normal: { type: 'spring', stiffness: 200, damping: 25 },
  responsive: { type: 'spring', stiffness: 300, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  stiff: { type: 'spring', stiffness: 500, damping: 35 },
} as const;

// Reusable animation variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeIn,
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.smooth,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeIn,
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeIn,
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeIn,
    },
  },
};

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeIn,
    },
  },
};

// Card hover animation
export const cardHover: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeOut,
    },
  },
};

// Button hover animations
export const buttonHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: springPresets.responsive,
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: animationDuration.fast,
      ease: animationEasing.easeOut,
    },
  },
};

// Page transition animations
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDuration.slow,
      ease: animationEasing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: animationDuration.normal,
      ease: animationEasing.easeIn,
    },
  },
};

// Utility function to create custom transitions
export const createTransition = (
  duration: number = animationDuration.normal,
  ease: readonly number[] | string = animationEasing.smooth,
  delay: number = 0
): Transition => ({
  duration,
  ease: ease as any,
  delay,
});

// Utility function for scroll-triggered animations
export const scrollAnimation = (
  variants: Variants,
  viewport = { once: true, amount: 0.3 }
) => ({
  initial: 'initial',
  whileInView: 'animate',
  viewport,
  variants,
});

// Utility function to check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Create reduced motion variants
export const createReducedMotionVariants = (variants: Variants): Variants => {
  if (!shouldReduceMotion()) return variants;

  // Return variants with instant transitions
  const reduced: Variants = {};
  for (const key in variants) {
    if (typeof variants[key] === 'object' && variants[key] !== null) {
      reduced[key] = {
        ...variants[key],
        transition: { duration: 0 },
      };
    }
  }
  return reduced;
};