import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0 }
};

export function useScrollReveal(threshold = 0.1) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

export function useParallaxScroll(speed = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const scrolled = window.scrollY;
      const rate = scrolled * speed;

      ref.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}