'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function CTAButton({ href, children, variant = 'primary' }: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 disabled:pointer-events-none disabled:opacity-50 px-6 py-3";

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40",
    secondary: "border border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-blue-600/50"
  };

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </Link>
  );
}