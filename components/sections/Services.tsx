"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: '5-Axis Machining',
    description: 'Complex geometries with unmatched precision. Simultaneous multi-axis control for aerospace components.',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Up to 60" parts', 'Titanium & exotic alloys'],
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements. Ensuring consistency across production runs.',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning. AS9102 first article inspection.',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'Full traceability'],
  },
  {
    title: 'Engineering Support',
    description: 'Design for manufacturability consultation. Process optimization and cost reduction strategies.',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Value engineering'],
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
            Precision Manufacturing Services
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
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Link href={service.href}>
                  <Card className="h-full p-6 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-border/50 group">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent-cyan/10 transition-colors">
                        <Icon className="h-6 w-6 text-accent-cyan" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-1">
                      {service.specs.map((spec) => (
                        <li key={spec} className="text-xs text-muted-foreground flex items-center">
                          <span className="w-1 h-1 bg-accent-cyan rounded-full mr-2" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}