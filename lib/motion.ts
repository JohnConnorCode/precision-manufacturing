import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has enabled reduced motion in their OS settings
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Motion variants that respect prefers-reduced-motion
 * If user prefers reduced motion, animations will be instant
 */
export const getMotionVariants = (prefersReducedMotion: boolean) => ({
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
    }
  },

  fadeInUp: {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
  },

  fadeInDown: {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
  },

  slideInLeft: {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : -30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
  },

  slideInRight: {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
  },

  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
      }
    }
  }
});

/**
 * CSS classes for reduced motion
 * These can be applied conditionally based on user preference
 */
export const motionClasses = {
  transition: {
    default: 'transition-all duration-300 ease-out',
    reduced: 'transition-none'
  },
  transform: {
    default: 'transform hover:scale-105',
    reduced: ''
  },
  animation: {
    default: 'animate-in fade-in duration-500',
    reduced: ''
  }
};

/**
 * Helper function to get motion-safe CSS classes
 */
export const getMotionSafeClass = (
  defaultClass: string,
  reducedClass: string = '',
  prefersReducedMotion: boolean
): string => {
  return prefersReducedMotion ? reducedClass : defaultClass;
};

/**
 * Tailwind CSS utility for reduced motion
 * Add to tailwind.config.js: motion-safe and motion-reduce variants
 */
export const motionSafeVariants = {
  'motion-safe': 'motion-safe:',
  'motion-reduce': 'motion-reduce:'
};