'use client';

import { LogoPrecisionTargetEnhanced } from '@/components/logos/iis-logo-enhanced';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  className = '',
  showText: _showText = true,
  variant = 'default',
  size = 'md'
}: LogoProps) {
  // Map old size prop to new logo sizes
  const sizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const
  };

  // Map old variant prop to new logo variants
  const variantMap = {
    default: 'primary' as const,
    light: 'primary' as const, // Will add invert class for light backgrounds
    dark: 'mono' as const
  };

  return (
    <div className={className}>
      <LogoPrecisionTargetEnhanced
        variant={variantMap[variant]}
        size={sizeMap[size]}
        animated={true}
        showAnimation={true}
        className={variant === 'light' ? 'brightness-0 invert' : ''}
      />
    </div>
  );
}