"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import FloatingElement from '@/components/ui/floating-element';
import ParallaxImage from '@/components/ui/parallax-image';

const services = [
  {
    title: '5-Axis Machining',
    description: 'Complex geometries with unmatched precision. Simultaneous multi-axis control for aerospace components.',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Up to 60" parts', 'Titanium & exotic alloys'],
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements. Ensuring consistency across production runs.',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning. AS9102 first article inspection.',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'Full traceability'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'Engineering Support',
    description: 'Design for manufacturability consultation. Process optimization and cost reduction strategies.',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Value engineering'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Services() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0} duration={15} distance={40} className="absolute top-20 left-10">
          <Sparkles className="w-8 h-8 text-accent-cyan/20" />
        </FloatingElement>
        <FloatingElement delay={2} duration={20} distance={50} className="absolute bottom-20 right-20">
          <Zap className="w-10 h-10 text-accent-electric/20" />
        </FloatingElement>
        <FloatingElement delay={1} duration={18} distance={35} className="absolute top-1/2 left-1/3">
          <div className="w-3 h-3 bg-accent-cyan/30 rounded-full blur-sm" />
        </FloatingElement>
      </div>

      {/* Parallax Background Image */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80"
          alt="Manufacturing background"
          className="w-full h-full opacity-5"
          speed={0.3}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30 mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            CORE CAPABILITIES
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            PRECISION MANUFACTURING
            <span className="block text-accent-cyan mt-2">SERVICES</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Industry-leading capabilities backed by decades of aerospace expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Link href={service.href}>
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-accent-cyan/20 group relative">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Parallax Image Background */}
                    <div className="absolute inset-0 overflow-hidden">
                      <ParallaxImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        speed={0.2}
                        scale={false}
                      />
                    </div>

                    <div className="relative p-6">
                      <FloatingElement delay={index * 0.2} duration={8} distance={10}>
                        <div className="mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-accent-cyan to-accent-electric rounded-xl flex items-center justify-center shadow-lg shadow-accent-cyan/25 group-hover:scale-110 transition-transform duration-500">
                            <Icon className="h-7 w-7 text-background" />
                          </div>
                        </div>
                      </FloatingElement>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.specs.map((spec, i) => (
                          <motion.li
                            key={spec}
                            className="text-xs text-muted-foreground flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <span className="w-2 h-2 bg-accent-cyan rounded-full mr-2 group-hover:animate-pulse" />
                            {spec}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services" className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-electric transition-colors font-semibold">
            View All Capabilities
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}