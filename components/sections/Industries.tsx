"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plane, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const industries = [
  {
    title: 'Aerospace',
    description: 'Critical components for commercial and military aircraft. From turbine blades to structural assemblies.',
    icon: Plane,
    image: '/images/aerospace.jpg',
    href: '/industries/aerospace',
    features: ['FAA approved', 'NADCAP certified', 'Zero defect delivery'],
  },
  {
    title: 'Energy & Turbines',
    description: 'High-temperature alloy components for power generation. Supporting renewable and traditional energy sectors.',
    icon: Zap,
    image: '/images/energy.jpg',
    href: '/industries/energy',
    features: ['Superalloy expertise', 'Large part capability', 'Field service support'],
  },
  {
    title: 'Defense',
    description: 'ITAR-compliant manufacturing for defense contractors. Maintaining highest security and quality standards.',
    icon: Shield,
    image: '/images/defense.jpg',
    href: '/industries/defense',
    features: ['ITAR registered', 'Secure facility', 'Rapid prototyping'],
  },
];

export default function Industries() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted partner for mission-critical manufacturing across multiple sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={industry.href}>
                  <Card className="overflow-hidden hover:shadow-hover transition-all duration-300 group">
                    <div className="relative h-48 bg-gradient-to-br from-accent/5 to-accent-cyan/5 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-accent-cyan/20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <Icon className="h-5 w-5 mr-2 text-accent-cyan" />
                        {industry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {industry.description}
                      </p>
                      <ul className="space-y-1">
                        {industry.features.map((feature) => (
                          <li key={feature} className="text-xs text-muted-foreground flex items-center">
                            <span className="w-1 h-1 bg-accent-cyan rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}