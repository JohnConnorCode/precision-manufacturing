'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Target, Ruler, Search, Shield, CheckCircle, Eye, Gauge } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';

export default function MetrologyPage() {
  const capabilities = [
    { label: 'Measurement Accuracy', value: '±0.00005"', description: 'CMM precision' },
    { label: 'Scanning Resolution', value: '0.001"', description: 'Laser scanning' },
    { label: 'Temperature Control', value: '68°F ±1°F', description: 'Climate controlled' },
    { label: 'Certification Level', value: 'ISO 17025', description: 'Accredited lab' }
  ];

  const services = [
    {
      title: 'Coordinate Measuring Machine (CMM)',
      description: 'High-precision dimensional inspection using state-of-the-art CMM systems for complex geometries.',
      icon: Target,
      features: ['3D coordinate measurement', 'GD&T inspection', 'Statistical analysis', 'Automated reporting'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=90',
      capabilities: [
        'Zeiss CONTURA G2 RDS CMM',
        'Working volume: 700x1000x600mm',
        'Accuracy: ±(0.9+L/350)μm',
        'VAST XXT scanning probe'
      ]
    },
    {
      title: 'Laser Scanning & Reverse Engineering',
      description: 'Advanced 3D laser scanning for rapid inspection, reverse engineering, and digital documentation.',
      icon: Search,
      features: ['Point cloud generation', 'CAD comparison', 'Surface analysis', 'Digital archiving'],
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90',
      capabilities: [
        'ATOS Triple Scan system',
        '5 megapixel resolution',
        '0.01mm accuracy',
        'Blue light technology'
      ]
    },
    {
      title: 'Optical Measurement Systems',
      description: 'Non-contact optical measurement for delicate parts and surface characteristics analysis.',
      icon: Eye,
      features: ['Surface roughness', 'Profile measurement', 'Edge detection', 'Multi-sensor integration'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
      capabilities: [
        'Keyence IM Series',
        'Sub-micron accuracy',
        'Multi-wavelength scanning',
        'Real-time analysis'
      ]
    },
    {
      title: 'Gauge & Tool Calibration',
      description: 'Comprehensive calibration services for measuring instruments and production tooling.',
      icon: Gauge,
      features: ['NIST traceable', 'Calibration certificates', 'Tool verification', 'Gage R&R studies'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
      capabilities: [
        'NIST traceable standards',
        'Environmental controls',
        'Automated calibration',
        'Digital certificates'
      ]
    }
  ];

  const inspectionTypes = [
    {
      type: 'First Article Inspection (FAI)',
      description: 'Complete dimensional verification per AS9102 requirements',
      deliverables: ['AS9102 Forms 1-3', 'Dimensional report', 'Material certificates', 'Process documentation']
    },
    {
      type: 'In-Process Inspection',
      description: 'Real-time quality monitoring during manufacturing',
      deliverables: ['Statistical control charts', 'Trend analysis', 'Process capability studies', 'Corrective actions']
    },
    {
      type: 'Final Inspection',
      description: 'Comprehensive verification before shipment',
      deliverables: ['Certificate of conformance', 'Inspection report', 'Dimensional data', 'Test results']
    },
    {
      type: 'Incoming Inspection',
      description: 'Vendor part verification and material validation',
      deliverables: ['Supplier scorecards', 'Non-conformance reports', 'Material verification', 'Dimensional check']
    }
  ];

  const qualityStandards = [
    'AS9100D Quality Management',
    'ISO 9001:2015 Certified',
    'ISO 17025 Measurement Lab',
    'NADCAP Accredited Processes',
    'ITAR Registered Facility',
    'Statistical Process Control'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Precision metrology and CMM inspection equipment"
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: "PRECISION MEASUREMENT SERVICES",
          icon: Ruler
        }}
        title={
          <>
            <span className="text-white">Precision</span> <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Metrology</span>
          </>
        }
        subtitle="Quality Assurance Excellence"
        description="Advanced measurement and inspection services ensuring dimensional accuracy and quality compliance for aerospace and defense manufacturing."
        buttons={[
          {
            label: "Get Quote",
            href: "/contact",
            variant: "primary"
          },
          {
            label: "View Services",
            href: "/services",
            variant: "secondary"
          }
        ]}
      />

      {/* Capabilities Overview */}
      <section className={styles.sectionLight}>
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

      {/* Services Grid */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Metrology Services</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Comprehensive measurement and inspection capabilities supporting all phases of manufacturing from first article to final inspection.
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

                    <div className="mb-6">
                      <h4 className={cn(theme.typography.label, "mb-3")}>Key Features</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className={cn("flex items-center", theme.typography.small)}>
                            <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className={cn(theme.typography.label, "mb-3")}>Equipment Capabilities</h4>
                      <div className="space-y-1">
                        {service.capabilities.map((capability) => (
                          <div key={capability} className={cn("flex items-center", theme.typography.small)}>
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2" />
                            {capability}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection Types */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Inspection Services</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Comprehensive inspection protocols tailored to aerospace and defense quality requirements.
            </p>
          </motion.div>

          <div className={styles.grid4Col}>
            {inspectionTypes.map((inspection, index) => (
              <motion.div
                key={inspection.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "h-full")}>
                  <h3 className={cn(theme.typography.h5, "mb-3")}>{inspection.type}</h3>
                  <p className={cn(theme.typography.small, "mb-4")}>{inspection.description}</p>

                  <div>
                    <h4 className={cn(theme.typography.label, "mb-2 text-sm")}>Deliverables</h4>
                    <div className="space-y-1">
                      {inspection.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center text-xs text-slate-600">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(theme.typography.h2, "mb-6")}>Quality Standards & Certifications</h2>
              <p className={cn(theme.typography.lead, "mb-8")}>
                Our metrology lab maintains the highest standards of accuracy and traceability, with certifications that meet aerospace and defense requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualityStandards.map((standard, index) => (
                  <motion.div
                    key={standard}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <Shield className="w-5 h-5 text-cyan-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{standard}</span>
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
                src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90"
                alt="Quality control laboratory"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Metrology Process</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Our systematic approach ensures accurate measurements and comprehensive documentation for every inspection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: '01',
                title: 'Planning',
                description: 'Review drawings and specifications'
              },
              {
                step: '02',
                title: 'Setup',
                description: 'Equipment calibration and preparation'
              },
              {
                step: '03',
                title: 'Measurement',
                description: 'Precision data collection'
              },
              {
                step: '04',
                title: 'Analysis',
                description: 'Statistical evaluation and comparison'
              },
              {
                step: '05',
                title: 'Reporting',
                description: 'Documentation and certification'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < 4 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent -translate-x-1/2" />
                )}
                <div className={cn("w-16 h-16 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10", theme.colors.primary.gradient)}>
                  {process.step}
                </div>
                <h3 className={cn(theme.typography.h5, "mb-2")}>{process.title}</h3>
                <p className={theme.typography.small}>{process.description}</p>
              </motion.div>
            ))}
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>Precision You Can Trust</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              Partner with our certified metrology lab for accurate measurements and comprehensive quality documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Request Inspection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className={styles.ctaSecondary}>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}