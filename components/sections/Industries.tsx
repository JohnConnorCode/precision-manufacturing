"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plane, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

const industries = [
  {
    title: 'Aerospace',
    description: 'Critical components for commercial and military aircraft. From turbine blades to structural assemblies.',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    href: '/industries/aerospace',
    features: ['FAA approved', 'NADCAP certified', 'Zero defect delivery'],
  },
  {
    title: 'Energy & Turbines',
    description: 'High-temperature alloy components for power generation. Supporting renewable and traditional energy sectors.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    href: '/industries/energy',
    features: ['Superalloy expertise', 'Large part capability', 'Field service support'],
  },
  {
    title: 'Defense',
    description: 'ITAR-compliant manufacturing for defense contractors. Maintaining highest security and quality standards.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940',
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
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Clear Section Purpose */}
          <p className="text-sm font-bold text-cyan-600 uppercase tracking-[0.2em] mb-2">
            SPECIALIZED SECTOR EXPERTISE
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-slate-900">INDUSTRY</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"> LEADERS</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto font-medium mb-4">
            Three decades of trusted partnerships in mission-critical sectors
          </p>

          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Our certifications and clearances enable us to serve the most demanding industries
            where component failure can mean mission failure
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
                    <div className="relative h-48 overflow-hidden">
                      <ParallaxImage
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                      </div>
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