"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: 99.97, suffix: '%', label: 'On-Time Delivery' },
  { value: 0.0001, suffix: '"', label: 'Min Tolerance', prefix: '±' },
  { value: 500, suffix: '+', label: 'Active Clients' },
];

function Counter({ from, to, duration = 2, prefix = '', suffix = '' }: {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      // Calculate interpolated value
      const current = progress * (to - from) + from;
      // For values < 1, keep decimal precision; otherwise round
      setCount(to < 1 ? Math.round(current * 10000) / 10000 : Math.round(current * 100) / 100);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [from, to, duration, inView]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-cyan mb-2">
                <Counter
                  from={0}
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}