'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, Lock, Award, CheckCircle, Target, Radar, Truck } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

export default function DefensePage() {
  const capabilities = [
    { label: 'Defense Programs', value: '50+', description: 'Active contracts' },
    { label: 'Security Clearance', value: 'Secret', description: 'Facility cleared personnel' },
    { label: 'ITAR Compliance', value: '100%', description: 'Registered and compliant' },
    { label: 'Defense Experience', value: '25+', description: 'Years serving defense' }
  ];

  const sectors = [
    {
      title: 'Weapons Systems',
      description: 'Critical components for advanced weapons platforms and munitions systems',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      applications: [
        'Missile components',
        'Gun system parts',
        'Fire control systems',
        'Targeting equipment',
        'Guidance systems',
        'Ordnance components'
      ],
      materials: ['Titanium Ti-6Al-4V', 'Inconel 718', 'Steel 4340', 'Aluminum 7075'],
      requirements: ['Shock resistance', 'Temperature extremes', 'Precision timing', 'Reliability']
    },
    {
      title: 'Radar & Electronics',
      description: 'Precision components for radar systems, communications, and electronic warfare',
      icon: Radar,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      applications: [
        'Radar antenna systems',
        'Electronics housings',
        'Waveguide components',
        'RF components',
        'Communications gear',
        'EW systems'
      ],
      materials: ['Aluminum 6061', 'Copper alloys', 'Magnesium AZ31', 'Beryllium copper'],
      requirements: ['EMI shielding', 'Thermal management', 'Signal integrity', 'Environmental sealing']
    },
    {
      title: 'Vehicle Systems',
      description: 'Components for military vehicles, armor systems, and mobile platforms',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
      applications: [
        'Armor components',
        'Vehicle drivetrain',
        'Suspension systems',
        'Hydraulic components',
        'Engine parts',
        'Track systems'
      ],
      materials: ['Armor steel', 'Titanium alloys', 'High-strength steel', 'Aluminum armor'],
      requirements: ['Ballistic protection', 'Weight optimization', 'Durability', 'Maintainability']
    }
  ];

  const securityFeatures = [
    {
      title: 'ITAR Registration',
      description: 'Full compliance with International Traffic in Arms Regulations',
      features: [
        'Registered manufacturing facility',
        'ITAR-cleared personnel',
        'Secure data handling',
        'Export control compliance'
      ]
    },
    {
      title: 'Facility Security',
      description: 'Comprehensive security measures protecting classified information',
      features: [
        'Controlled access systems',
        'Security cameras and monitoring',
        'Cleared personnel only areas',
        'Document control procedures'
      ]
    },
    {
      title: 'Supply Chain Security',
      description: 'Verified supply chain with trusted vendors and materials',
      features: [
        'Approved vendor list',
        'Material traceability',
        'Source verification',
        'Counterfeit prevention'
      ]
    },
    {
      title: 'Quality Assurance',
      description: 'Defense-specific quality standards and documentation',
      features: [
        'MIL-SPEC compliance',
        'AS9100D certification',
        'First article inspection',
        'Statistical process control'
      ]
    }
  ];

  const certifications = [
    {
      title: 'ITAR Registered',
      description: 'International Traffic in Arms Regulations compliance',
      scope: 'Manufacturing and export of defense articles',
      icon: Shield
    },
    {
      title: 'DFARS Compliant',
      description: 'Defense Federal Acquisition Regulation Supplement',
      scope: 'Supply chain security and specialty metals compliance',
      icon: Lock
    },
    {
      title: 'Security Clearance',
      description: 'Facility and personnel security clearances',
      scope: 'Handling of classified defense information',
      icon: Award
    }
  ];

  const qualityStandards = [
    'MIL-STD-45662 Calibration',
    'MIL-STD-105 Sampling',
    'AS9102 First Article',
    'ANSI/NCSL Z540-1',
    'Statistical Process Control',
    'Certificate of Conformance'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&q=80"
            alt="Defense manufacturing"
            className="w-full h-full opacity-20"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
                <Shield className="w-3 h-3 mr-2" />
                DEFENSE MANUFACTURING SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              Defense <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Systems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl"
            >
              Mission-critical components for defense systems with full ITAR compliance and security clearance. Trusted partner for weapons systems, electronics, and vehicle platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold"
              >
                Request Defense Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Security Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Defense Capabilities */}
      <section className="py-20 bg-slate-900/5">
        <div className="container">
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
          </div>
        </div>
      </section>

      {/* Defense Sectors */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Defense System Components</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized manufacturing for critical defense applications requiring the highest levels of precision, reliability, and security compliance.
            </p>
          </motion.div>

          <div className="space-y-12">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden">
                      <ParallaxImage
                        src={sector.image}
                        alt={sector.title}
                        className="w-full h-full"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <sector.icon className="w-8 h-8 text-white mr-3" />
                        <h3 className="text-2xl font-bold text-white">{sector.title}</h3>
                      </div>
                    </div>

                    <div className="lg:col-span-3 p-8">
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        {sector.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-3">Applications</h4>
                          <div className="space-y-2">
                            {sector.applications.map((application) => (
                              <div key={application} className="flex items-center text-sm text-slate-600">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                                {application}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-800 mb-3">Materials</h4>
                          <div className="space-y-2 mb-4">
                            {sector.materials.map((material) => (
                              <div key={material} className="flex items-center text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {material}
                              </div>
                            ))}
                          </div>

                          <h4 className="font-semibold text-slate-800 mb-3">Critical Requirements</h4>
                          <div className="space-y-2">
                            {sector.requirements.map((requirement) => (
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
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Security & Compliance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive security measures and regulatory compliance ensuring the protection of sensitive defense information and materials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 mb-6">{feature.description}</p>

                  <div className="space-y-3">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-center text-sm text-slate-600">
                        <Shield className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Defense Quality Standards</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Military specifications and quality standards ensuring components meet the rigorous requirements of defense applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <Award className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{standard}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Secure Defense Manufacturing</h2>
            <p className="text-xl text-slate-600 mb-8">
              Trust your mission-critical components to a proven defense contractor with full security compliance and industry expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Request Defense Quote
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