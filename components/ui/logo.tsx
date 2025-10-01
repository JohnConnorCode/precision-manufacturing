'use client';

import { StatisticalLogo } from '@/components/logos/iis-statistical-logo';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  className = '',
  showText = true,
  variant = 'default',
  size = 'md'
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger initial animation on mount
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const textColorClass = variant === 'light'
    ? 'text-white'
    : variant === 'dark'
    ? 'text-slate-900'
    : 'text-slate-800';

  // Scale text size with logo size
  const textSizeClass = size === 'sm'
    ? 'text-[9px]'
    : size === 'lg'
    ? 'text-[13px]'
    : 'text-[11px]';

  // Scale spacing with logo size
  const gapClass = size === 'sm'
    ? 'gap-0'
    : size === 'lg'
    ? 'gap-1'
    : 'gap-0.5';

  return (
    <div
      className="flex items-center -space-x-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StatisticalLogo
        size={size}
        animated={true}
        showGrid={true}
        className={className}
      />

      {showText && (
        <div className={`flex flex-col justify-center ${gapClass} -mt-2`}>
          {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={
                i === 2
                  ? `${textSizeClass} font-extrabold tracking-[0.15em] leading-none ${variant === 'light' ? 'text-blue-400' : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent'}`
                  : `${textSizeClass} font-extrabold tracking-[0.15em] ${textColorClass} leading-none`
              }
            >
              {word}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}