"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

const services = [
  {
    title: '5-Axis Machining',
    description: 'Complex geometries with unmatched precision. Simultaneous multi-axis control for aerospace components.',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Up to 60" parts', 'Titanium & exotic alloys'],
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80'
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements. Ensuring consistency across production runs.',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning. AS9102 first article inspection.',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'Full traceability'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
  },
  {
    title: 'Engineering Support',
    description: 'Design for manufacturability consultation. Process optimization and cost reduction strategies.',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Value engineering'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
  },
];

export default function Services() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
            CORE CAPABILITIES
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Precision manufacturing excellence backed by three decades of aerospace expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-slate-200 group relative bg-white">
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <ParallaxImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        speed={0.2}
                        scale={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                          <Icon className="h-6 w-6 text-slate-900" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.specs.map((spec) => (
                          <li key={spec} className="text-xs text-slate-500 flex items-center">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                            {spec}
                          </li>
                        ))}
                      </ul>

                      {/* Hover Indicator */}
                      <div className="mt-6 flex items-center text-slate-900 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
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