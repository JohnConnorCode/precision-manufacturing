'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Plane, Shield, Award, CheckCircle, Gauge, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';

export default function AerospacePage() {
  const capabilities = [
    { label: 'Aerospace Volume', value: '85%', description: 'Of total production' },
    { label: 'Active Programs', value: '150+', description: 'Ongoing aerospace projects' },
    { label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed accuracy' },
    { label: 'AS9100D Compliance', value: '100%', description: 'Full certification' }
  ];

  const components = [
    {
      category: 'Engine Components',
      description: 'Critical turbine and engine parts requiring extreme precision and material expertise',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      parts: [
        'Turbine blades and vanes',
        'Combustor liners',
        'Compressor components',
        'Engine mounts and brackets',
        'Fuel system components',
        'Heat exchanger parts'
      ],
      materials: ['Inconel 718/625', 'Titanium Ti-6Al-4V', 'Hastelloy X', 'Waspaloy'],
      requirements: ['High temperature resistance', 'Fatigue resistance', 'Precise airfoil geometry', 'Surface finish requirements']
    },
    {
      category: 'Structural Components',
      description: 'Airframe and structural parts demanding exceptional strength and weight optimization',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
      parts: [
        'Wing brackets and fittings',
        'Landing gear components',
        'Fuselage frames',
        'Control surface hinges',
        'Structural joints',
        'Fastener components'
      ],
      materials: ['Aluminum 7075-T6', 'Titanium Ti-6Al-4V', 'Steel 15-5 PH', '17-4 PH Stainless'],
      requirements: ['High strength-to-weight ratio', 'Corrosion resistance', 'Fatigue life', 'Dimensional stability']
    },
    {
      category: 'Avionics & Electronics',
      description: 'Precision housings and components for aerospace electronics and control systems',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      parts: [
        'Radar components',
        'Electronics housings',
        'Antenna assemblies',
        'Connector bodies',
        'Heat sinks',
        'Waveguide components'
      ],
      materials: ['Aluminum 6061-T6', 'Magnesium AZ31', 'Copper alloys', 'Kovar alloy'],
      requirements: ['EMI shielding', 'Thermal management', 'Dimensional accuracy', 'Surface conductivity']
    }
  ];

  const certifications = [
    {
      title: 'AS9100D',
      description: 'Aerospace Quality Management System',
      scope: 'Design, development, and manufacturing of precision aerospace components',
      icon: Award
    },
    {
      title: 'NADCAP',
      description: 'National Aerospace and Defense Contractors Accreditation Program',
      scope: 'Special processes including heat treating and chemical processing',
      icon: Shield
    },
    {
      title: 'ITAR',
      description: 'International Traffic in Arms Regulations',
      scope: 'Manufacturing and handling of defense-related articles and services',
      icon: Target
    }
  ];

  const qualityStandards = [
    'First Article Inspection (AS9102)',
    'Statistical Process Control (SPC)',
    'Coordinate Measuring Machine (CMM)',
    'Material Test Certificates',
    'Certificate of Conformance',
    'Traceability Documentation'
  ];

  const processBenefits = [
    {
      title: 'Advanced Manufacturing',
      description: '5-axis CNC machining for complex geometries and tight tolerances',
      icon: Gauge,
      benefits: [
        'Single-setup machining reduces tolerances stack-up',
        'Complex contours and undercuts in one operation',
        'Superior surface finish capabilities',
        'Reduced setup time and improved accuracy'
      ]
    },
    {
      title: 'Material Expertise',
      description: 'Specialized knowledge in aerospace-grade materials and their properties',
      icon: Zap,
      benefits: [
        'Optimized cutting parameters for exotic materials',
        'Heat treatment and stress relief processes',
        'Material traceability and certification',
        'Corrosion-resistant surface treatments'
      ]
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive quality control throughout the manufacturing process',
      icon: CheckCircle,
      benefits: [
        'In-process inspection and monitoring',
        'Statistical process control implementation',
        'First article inspection per AS9102',
        'Complete documentation and traceability'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2400&q=90"
        imageAlt="Aerospace manufacturing - precision machined aircraft components"
        badge={{
          text: "AEROSPACE MANUFACTURING EXCELLENCE",
          icon: Plane
        }}
        title={
          <span className="text-white">
            Aerospace <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Components</span>
          </span>
        }
        description="Trusted partner for critical aerospace components, delivering precision-machined parts for commercial and military aircraft with full AS9100D compliance and ITAR registration."
        buttons={[
          {
            label: "Request Aerospace Quote",
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

      {/* Aerospace Capabilities */}
      <section id="capabilities" className={`${styles.sectionLight} bg-slate-900/5`}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.grid4Col}
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

      {/* Component Categories */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Aerospace Component Expertise</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Specialized manufacturing capabilities for critical aerospace applications, from engine components to structural assemblies.
            </p>
          </motion.div>

          <div className="space-y-12">
            {components.map((component, index) => (
              <motion.div
                key={component.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "overflow-hidden")}>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    {/* Image Section */}
                    <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden">
                      <ParallaxImagePro
                        src={component.image}
                        alt={component.category}
                        className="w-full h-full"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className={cn(theme.typography.h3, "text-white")}>{component.category}</h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-8">
                      <p className={cn(theme.typography.lead, "mb-6")}>
                        {component.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className={cn(theme.typography.label, "mb-3")}>Typical Components</h4>
                          <div className="space-y-2">
                            {component.parts.map((part) => (
                              <div key={part} className="flex items-center text-sm text-slate-600">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                                {part}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className={cn(theme.typography.label, "mb-3")}>Materials</h4>
                          <div className="space-y-2 mb-4">
                            {component.materials.map((material) => (
                              <div key={material} className="flex items-center text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {material}
                              </div>
                            ))}
                          </div>

                          <h4 className={cn(theme.typography.label, "mb-3")}>Key Requirements</h4>
                          <div className="space-y-2">
                            {component.requirements.map((requirement) => (
                              <div key={requirement} className="flex items-center text-sm text-slate-600">
                                <Target className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                {requirement}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Aerospace Certifications</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Full compliance with aerospace industry standards and regulations ensuring the highest quality and security requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <cert.icon className="w-8 h-8 text-slate-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                  <p className="text-slate-600 mb-4">{cert.description}</p>
                  <p className="text-sm text-slate-500 font-medium">{cert.scope}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Quality Standards & Documentation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {qualityStandards.map((standard, index) => (
                <motion.div
                  key={standard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center p-4 bg-white rounded-lg border border-slate-200"
                >
                  <Shield className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{standard}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Aerospace Manufacturing Advantages</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced capabilities and proven processes delivering superior results for critical aerospace applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-slate-700" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 mb-6">{benefit.description}</p>

                  <div className="space-y-3">
                    {benefit.benefits.map((item) => (
                      <div key={item} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner with Aerospace Experts</h2>
            <p className="text-xl text-slate-600 mb-8">
              Trust your critical aerospace components to a proven manufacturing partner with decades of experience and industry-leading certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Request Aerospace Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}