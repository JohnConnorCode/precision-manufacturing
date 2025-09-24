"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: '5-Axis CNC Machining',
    description: 'Complex geometries with unmatched precision for aerospace components',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Titanium & exotic alloys', 'Up to 60" parts'],
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=90',
    highlight: true
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=90'
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'AS9102 certified'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90'
  },
  {
    title: 'Engineering Support',
    description: 'Design optimization and manufacturing consultation',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Cost optimization'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90'
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="container relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold text-cyan-600 uppercase tracking-[0.2em] mb-4"
          >
            Core Capabilities
          </motion.p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-slate-900">Precision</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"> Manufacturing</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Advanced manufacturing solutions for aerospace, defense, and high-tech industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="group"
              >
                <Link href={service.href} className="block h-full">
                  <Card className={`h-full overflow-hidden transition-all duration-500 hover:shadow-2xl border-slate-200 bg-white relative ${
                    service.highlight ? 'ring-2 ring-cyan-500/20' : ''
                  }`}>
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Floating Icon */}
                      <motion.div
                        className="absolute bottom-4 left-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                          <Icon className="h-6 w-6 text-cyan-600" />
                        </div>
                      </motion.div>

                      {service.highlight && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {service.specs.map((spec) => (
                          <li key={spec} className="flex items-start text-xs text-slate-500">
                            <CheckCircle className="h-3 w-3 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-cyan-600 font-semibold text-sm">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-lg text-slate-600 mb-6">
            Need custom manufacturing solutions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Discuss Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}