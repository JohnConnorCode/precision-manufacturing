"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  distance = 30,
  className = ''
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
        x: [0, distance / 3, -distance / 3, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}