"use client";

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';

interface StatsData {
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}

interface StatsProps {
  data?: StatsData;
}

const defaultStats = [
  { value: 30, suffix: '+', label: 'Years Experience', decimals: 0 },
  { value: 99.97, suffix: '%', label: 'On-Time Delivery', decimals: 2 },
  { value: 0.0001, suffix: '"', label: 'Min Tolerance', prefix: '±', decimals: 4 },
  { value: 500, suffix: '+', label: 'Active Clients', decimals: 0 },
];

export default function Stats({ data }: StatsProps) {
  // Use CMS data or fallback to defaults
  const stats = data?.stats ? data.stats.map(stat => {
    // Parse numeric value from string for animation
    const numValue = parseFloat(stat.value.replace(/[^0-9.-]/g, ''));
    const suffix = stat.value.replace(/[0-9.-]/g, '');
    return {
      value: numValue,
      suffix: suffix || '',
      label: stat.label,
      decimals: numValue < 1 ? 4 : numValue < 100 ? 2 : 0,
      prefix: undefined
    };
  }) : defaultStats;

  const title = data?.title || 'Operational Excellence';
  const subtitle = data?.subtitle || 'THE NUMBERS SPEAK FOR THEMSELVES';

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-[0.2em] mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
            {title}
          </h2>
        </motion.div>

      </div>
    </section>
  );
}