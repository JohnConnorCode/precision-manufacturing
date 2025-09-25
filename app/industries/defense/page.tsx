'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Shield, Lock, Target, CheckCircle, Award, Eye, Zap } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';

export default function DefensePage() {
  const capabilities = [
    { label: 'Defense Contracts', value: '200+', description: 'Active defense programs' },
    { label: 'Security Clearance', value: 'Secret', description: 'DoD cleared facility' },
    { label: 'ITAR Compliance', value: '100%', description: 'Fully registered' },
    { label: 'Quality Rating', value: '99.8%', description: 'Defense supplier score' }
  ];

  const components = [
    {
      category: 'Weapons Systems',
      description: 'Critical components for advanced weapons platforms requiring extreme precision and reliability',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940',
      parts: [
        'Missile guidance components',
        'Fire control systems',
        'Targeting assemblies',
        'Launcher mechanisms',
        'Precision optics mounts',
        'Electronic warfare components'
      ],
      materials: ['Titanium Ti-6Al-4V', 'Aluminum 7075-T651', 'Steel 4340', 'Inconel 718'],
      requirements: ['Shock resistance', 'Temperature cycling', 'EMI shielding', 'Corrosion protection']
    },
    {
      category: 'Vehicle & Platform Components',
      description: 'Heavy-duty components for military vehicles, ships, and ground-based defense systems',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
      parts: [
        'Armored vehicle components',
        'Tank transmission parts',
        'Naval system housings',
        'Radar mount assemblies',
        'Antenna positioning systems',
        'Communications equipment'
      ],
      materials: ['Steel AISI 4140', 'Aluminum 5083-H131', 'Bronze C95400', 'Stainless 17-4 PH'],
      requirements: ['Ballistic resistance', 'Environmental sealing', 'Vibration tolerance', 'Long service life']
    },
    {
      category: 'Surveillance & Intelligence',
      description: 'Precision components for intelligence gathering and surveillance systems requiring utmost accuracy',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
      parts: [
        'Optical instrument housings',
        'Sensor mounts and gimbals',
        'Camera stabilization systems',
        'Antenna feed assemblies',
        'Signal processing enclosures',
        'Night vision components'
      ],
      materials: ['Aluminum 6061-T6', 'Magnesium AZ31B', 'Invar 36', 'Kovar 29-17'],
      requirements: ['Dimensional stability', 'Thermal management', 'Electromagnetic compatibility', 'Optical precision']
    }
  ];

  const securityCompliance = [
    {
      title: 'ITAR Registration',
      description: 'International Traffic in Arms Regulations',
      scope: 'Authorized for manufacturing defense articles and providing defense services',
      icon: Shield,
      details: ['State Department registration', 'Export license compliance', 'Personnel screening', 'Secure facility protocols']
    },
    {
      title: 'NISPOM Compliance',
      description: 'National Industrial Security Program Operating Manual',
      scope: 'Full compliance with classified information handling requirements',
      icon: Lock,
      details: ['Facility security clearance', 'Personnel security clearances', 'Information security protocols', 'Visitor access controls']
    },
    {
      title: 'CMMC Readiness',
      description: 'Cybersecurity Maturity Model Certification',
      scope: 'Comprehensive cybersecurity framework implementation',
      icon: Eye,
      details: ['Network security controls', 'Access control systems', 'Data protection measures', 'Incident response procedures']
    }
  ];

  const qualityStandards = [
    'AS9100D Quality Management',
    'ISO 9001:2015 Certified',
    'DCMA Quality Assurance',
    'MIL-STD Compliance',
    'First Article Inspection',
    'Statistical Process Control'
  ];

  const defenseBenefits = [
    {
      title: 'Security & Compliance',
      description: 'Comprehensive security measures and regulatory compliance for defense manufacturing',
      icon: Shield,
      benefits: [
        'ITAR registered facility with secure protocols',
        'Personnel security clearances up to Secret level',
        'Cybersecurity controls and data protection',
        'Visitor access controls and facility security'
      ]
    },
    {
      title: 'Mission-Critical Quality',
      description: 'Uncompromising quality standards for defense applications where failure is not an option',
      icon: Target,
      benefits: [
        'Zero-defect manufacturing processes',
        'Extensive testing and validation protocols',
        'Complete traceability and documentation',
        'Statistical process control implementation'
      ]
    },
    {
      title: 'Specialized Capabilities',
      description: 'Advanced manufacturing capabilities specifically developed for defense requirements',
      icon: Zap,
      benefits: [
        'Exotic material expertise and processing',
        'Complex geometry machining capabilities',
        'Environmental and stress testing',
        'Rapid prototyping for urgent requirements'
      ]
    }
  ];

  const contractTypes = [
    {
      type: 'Prime Contractor',
      description: 'Direct contracts with DoD agencies and military branches',
      deliverables: ['Complete system assemblies', 'Technical data packages', 'Program management', 'Logistics support']
    },
    {
      type: 'Subcontractor',
      description: 'Supporting major defense contractors with specialized components',
      deliverables: ['Precision machined parts', 'Assembly services', 'Testing and validation', 'Supply chain management']
    },
    {
      type: 'Research & Development',
      description: 'Prototype development and technology demonstration programs',
      deliverables: ['Concept validation', 'Prototype manufacturing', 'Design optimization', 'Technology transfer']
    },
    {
      type: 'Sustainment',
      description: 'Ongoing support for fielded defense systems',
      deliverables: ['Replacement parts', 'Upgrade components', 'Repair services', 'Obsolescence management']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80"
        imageAlt="Defense manufacturing - secure precision components for national security"
        badge={{
          text: "DEFENSE MANUFACTURING EXCELLENCE",
          icon: Shield
        }}
        title={
          <>
            Defense <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600">Systems</span>
          </>
        }
        description="Trusted defense contractor delivering mission-critical components for national security applications. ITAR registered facility with full security clearance and compliance protocols."
        buttons={[
          {
            label: "Request Defense Quote",
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

      {/* Defense Capabilities */}
      <section id="capabilities" className={`${styles.sectionLight} bg-slate-900/5`}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Defense Component Expertise</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized manufacturing capabilities for critical defense applications, from weapons systems to surveillance equipment.
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
                <Card className="overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
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
                        <h3 className="text-2xl font-bold text-white">{component.category}</h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-8">
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        {component.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-3">Typical Components</h4>
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
                          <h4 className="font-semibold text-slate-800 mb-3">Materials</h4>
                          <div className="space-y-2 mb-4">
                            {component.materials.map((material) => (
                              <div key={material} className="flex items-center text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {material}
                              </div>
                            ))}
                          </div>

                          <h4 className="font-semibold text-slate-800 mb-3">Key Requirements</h4>
                          <div className="space-y-2">
                            {component.requirements.map((requirement) => (
                              <div key={requirement} className="flex items-center text-sm text-slate-600">
                                <Target className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
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

      {/* Security & Compliance */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Security & Compliance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive security measures and regulatory compliance ensuring protection of sensitive defense information and technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {securityCompliance.map((compliance, index) => (
              <motion.div
                key={compliance.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <compliance.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{compliance.title}</h3>
                  <p className="text-slate-600 mb-4 text-center">{compliance.description}</p>
                  <p className="text-sm text-slate-500 font-medium mb-6 text-center">{compliance.scope}</p>

                  <div className="space-y-2">
                    {compliance.details.map((detail) => (
                      <div key={detail} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
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
                  <Award className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{standard}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contract Types */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Defense Contract Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive contracting capabilities supporting all phases of defense system lifecycles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contractTypes.map((contract, index) => (
              <motion.div
                key={contract.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-bold mb-3">{contract.type}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{contract.description}</p>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">Deliverables</h4>
                    <div className="space-y-1">
                      {contract.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center text-xs text-slate-600">
                          <div className="w-1 h-1 bg-slate-400 rounded-full mr-2" />
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

      {/* Defense Benefits */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Defense Manufacturing Advantages</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized capabilities and proven processes delivering mission-critical results for national defense applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defenseBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-red-600" />
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
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Secure Defense Manufacturing Partner</h2>
            <p className="text-xl text-slate-300 mb-8">
              Trust your most critical defense components to a proven partner with comprehensive security protocols and manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold">
                Request Security Briefing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white font-semibold">
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}