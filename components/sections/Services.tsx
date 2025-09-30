"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/animated-section';
import { cardHover } from '@/lib/animations';

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

interface ServicesProps {
  data?: any;
}

export default function Services({ data }: ServicesProps) {
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
        <AnimatedSection className="text-center mb-16 md:mb-20">
          {/* Section Context */}
          <p className="text-sm font-bold text-slate-600 uppercase tracking-[0.2em] mb-2">
            COMPREHENSIVE MANUFACTURING SOLUTIONS
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-slate-900">PRECISION</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> SERVICES</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto font-medium mb-4">
            Four core service pillars delivering unmatched precision and reliability
          </p>

          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            From complex 5-axis machining to advanced metrology, our integrated services ensure
            your most critical components meet the strictest aerospace and defense standards
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedSection
                key={service.title}
                delay={index * 0.1}
                className="group"
                whileHover={{
                  scale: 1.01,
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
              >
                <Link href={service.href} className="block h-full">
                  <Card className={`h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/20 border-slate-200 bg-white relative ${
                    service.highlight ? 'ring-2 ring-blue-600/20' : ''
                  }`}>
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Floating Icon with Premium Effect */}
                      <motion.div
                        className="absolute bottom-4 left-4"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-600/50 transition-shadow duration-300">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </motion.div>

                      {service.highlight && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {service.specs.map((spec) => (
                          <li key={spec} className="flex items-start text-xs text-slate-600">
                            <CheckCircle className="h-3 w-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-indigo-600 transition-colors duration-300">
                        <span>Learn More</span>
                        <motion.div
                          className="ml-1"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Call to Action */}
        <AnimatedSection delay={0.4} className="text-center mt-16 md:mt-20">
          <p className="text-lg text-slate-700 mb-6">
            Need custom manufacturing solutions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Discuss Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}