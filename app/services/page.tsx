'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { theme, styles, cn } from '@/lib/theme';
import { ArrowRight, Cog, Cpu, Target, Wrench, Shield, Award } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';

export default function ServicesPage() {
  const services = [
    {
      title: '5-Axis CNC Machining',
      description: 'Complex geometries and tight tolerances with state-of-the-art 5-axis CNC capabilities.',
      icon: Cog,
      href: '/services/5-axis-machining',
      features: ['±0.0001" Precision', 'Complex Geometries', 'Titanium & Inconel', 'Aerospace Grade'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=90'
    },
    {
      title: 'Adaptive Machining',
      description: 'Intelligent manufacturing with real-time adjustments and adaptive control systems.',
      icon: Cpu,
      href: '/services/adaptive-machining',
      features: ['Real-time Monitoring', 'Intelligent Control', 'Quality Assurance', 'Process Optimization'],
      image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1600&q=90'
    },
    {
      title: 'Precision Metrology',
      description: 'Advanced measurement and inspection services ensuring component accuracy.',
      icon: Target,
      href: '/services/metrology',
      features: ['CMM Inspection', 'Laser Scanning', 'Dimensional Analysis', 'First Article'],
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90'
    },
    {
      title: 'Engineering Services',
      description: 'Complete design, prototyping, and manufacturing engineering support.',
      icon: Wrench,
      href: '/services/engineering',
      features: ['Design Optimization', 'Rapid Prototyping', 'DFM Analysis', 'Process Development'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90'
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
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Advanced manufacturing services - precision CNC machining and quality control"
        badge={{
          text: "PRECISION MANUFACTURING SERVICES",
          icon: Shield
        }}
        title={
          <>
            <span className="text-white">Our</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Services</span>
          </>
        }
        description="Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards."
        buttons={[
          {
            label: "Request Quote",
            href: "/contact",
            variant: "primary"
          },
          {
            label: "View Capabilities",
            href: "#capabilities",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Capabilities Overview */}
      <section id="capabilities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={cn(styles.grid4Col, "mb-20")}
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
                <div className={styles.statValue}>
                  {capability.value}
                </div>
                <div className={cn(theme.typography.badge, "text-slate-700 mb-2")}>
                  {capability.label}
                </div>
                <div className={theme.typography.small}>
                  {capability.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Manufacturing Capabilities</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Comprehensive precision manufacturing services backed by advanced technology and industry certifications.
            </p>
          </motion.div>

          <div className={styles.grid2Col}>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "group h-full overflow-hidden")}>
                  <div className="relative h-64 overflow-hidden">
                    <ParallaxImagePro
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
                    <h3 className={cn(theme.typography.h4, "mb-4 group-hover:text-blue-600 transition-colors")}>
                      {service.title}
                    </h3>
                    <p className={cn(theme.typography.body, "mb-6")}>
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className={cn("flex items-center", theme.typography.small)}>
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className={cn(styles.ctaSecondary, "w-full group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900")}
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
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(theme.typography.h2, "mb-6")}>Quality Assurance</h2>
              <p className={cn(theme.typography.lead, "mb-8")}>
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
                    <span className={theme.typography.body}>{item}</span>
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
              <ParallaxImagePro
                src="https://images.unsplash.com/photo-1563770660941-906983ff0c26?auto=format&fit=crop&w=1600&q=90"
                alt="Quality assurance"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Ready to Start Your Project?</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              Partner with us for precision manufacturing solutions that meet the highest industry standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className={styles.ctaSecondary}>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}