'use client';

import Image from 'next/image';
import { useState } from 'react';
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

  const textColorClass = variant === 'light'
    ? 'text-white'
    : variant === 'dark'
    ? 'text-slate-900'
    : 'text-slate-800';

  // Scale image size based on size prop
  const imageWidth = size === 'sm' ? 36 : size === 'lg' ? 56 : 48;
  const imageHeight = size === 'sm' ? 36 : size === 'lg' ? 56 : 48;

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
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex-shrink-0 ${className}`}
      >
        <Image
          src="/Gaussian-Distribution-with-_IIS_.png"
          alt="IIS - Integrated Inspection Systems"
          width={imageWidth}
          height={imageHeight}
          priority
          quality={90}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />
      </motion.div>

      {showText && (
        <div className={`flex flex-col justify-center ${gapClass}`}>
          {['INTEGRATED', 'INSPECTION', 'SYSTEMS'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
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