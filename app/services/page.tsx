'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Cog, Cpu, Target, Wrench, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

export default function ServicesPage() {
  const services = [
    {
      title: '5-Axis CNC Machining',
      description: 'Complex geometries and tight tolerances with state-of-the-art 5-axis CNC capabilities.',
      icon: Cog,
      href: '/services/5-axis-machining',
      features: ['±0.0001" Precision', 'Complex Geometries', 'Titanium & Inconel', 'Aerospace Grade'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
      title: 'Adaptive Machining',
      description: 'Intelligent manufacturing with real-time adjustments and adaptive control systems.',
      icon: Cpu,
      href: '/services/adaptive-machining',
      features: ['Real-time Monitoring', 'Intelligent Control', 'Quality Assurance', 'Process Optimization'],
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
    },
    {
      title: 'Precision Metrology',
      description: 'Advanced measurement and inspection services ensuring component accuracy.',
      icon: Target,
      href: '/services/metrology',
      features: ['CMM Inspection', 'Laser Scanning', 'Dimensional Analysis', 'First Article'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
      title: 'Engineering Services',
      description: 'Complete design, prototyping, and manufacturing engineering support.',
      icon: Wrench,
      href: '/services/engineering',
      features: ['Design Optimization', 'Rapid Prototyping', 'DFM Analysis', 'Process Development'],
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
    }
  ];

  const capabilities = [
    { label: 'Materials Certified', value: '150+', description: 'Aerospace & defense grade materials' },
    { label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed dimensional accuracy' },
    { label: 'Production Capacity', value: '24/7', description: 'Continuous manufacturing capability' },
    { label: 'Quality System', value: 'AS9100D', description: 'Full aerospace certification' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80"
            alt="Manufacturing services"
            className="w-full h-full opacity-15"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
                <Shield className="w-3 h-3 mr-2" />
                PRECISION MANUFACTURING SERVICES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto"
            >
              Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="group px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold"
              >
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="py-20 bg-slate-900/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {capability.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {capability.label}
                </div>
                <div className="text-sm text-slate-600">
                  {capability.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Manufacturing Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive precision manufacturing services backed by advanced technology and industry certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden">
                    <ParallaxImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      speed={0.2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-slate-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
                    >
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Quality Assurance</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our comprehensive quality management system ensures every component meets or exceeds specifications with full traceability and documentation.
              </p>

              <div className="space-y-4">
                {[
                  'AS9100D aerospace quality management',
                  'ISO 9001:2015 certified processes',
                  'ITAR registered for defense contracts',
                  'NADCAP accredited special processes'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <Award className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                alt="Quality assurance"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with us for precision manufacturing solutions that meet the highest industry standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}