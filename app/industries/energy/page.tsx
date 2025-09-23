'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Award, CheckCircle, Battery, Flame, Wind } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { theme, styles, cn } from '@/lib/theme';

export default function EnergyPage() {
  const capabilities = [
    { label: 'Energy Projects', value: '25%', description: 'Of production volume' },
    { label: 'Power Generation', value: '500MW+', description: 'Equipment supported' },
    { label: 'Operating Temperature', value: '1200°F', description: 'Maximum capability' },
    { label: 'Pressure Rating', value: '15,000 PSI', description: 'High-pressure systems' }
  ];

  const sectors = [
    {
      title: 'Power Generation',
      description: 'Critical components for gas turbines, steam turbines, and power plant systems',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      applications: [
        'Gas turbine components',
        'Steam turbine parts',
        'Generator components',
        'Heat exchanger tubes',
        'Valve bodies and stems',
        'Pump impellers'
      ],
      materials: ['Inconel 718', 'Stainless Steel 316L', 'Hastelloy C-276', 'Titanium Grade 2'],
      challenges: ['High temperature operation', 'Corrosion resistance', 'Thermal cycling', 'Precision machining']
    },
    {
      title: 'Oil & Gas',
      description: 'Downstream and upstream components for drilling, extraction, and processing',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      applications: [
        'Downhole tools',
        'Valve components',
        'Pump parts',
        'Wellhead equipment',
        'Pipeline fittings',
        'Drilling equipment'
      ],
      materials: ['Duplex Stainless', 'Inconel 625', 'Monel 400', '17-4 PH Stainless'],
      challenges: ['Corrosive environments', 'High pressure systems', 'Wear resistance', 'Material traceability']
    },
    {
      title: 'Renewable Energy',
      description: 'Components for wind, solar, and hydroelectric power generation systems',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      applications: [
        'Wind turbine components',
        'Solar tracking systems',
        'Hydroelectric parts',
        'Battery housing',
        'Power electronics',
        'Control systems'
      ],
      materials: ['Aluminum 6061', 'Stainless Steel 304', 'Carbon Steel', 'Copper Alloys'],
      challenges: ['Weather resistance', 'Long service life', 'Cost optimization', 'Environmental compliance']
    }
  ];

  const qualityStandards = [
    {
      title: 'API Standards',
      description: 'American Petroleum Institute specifications for oil and gas equipment',
      certifications: ['API 6A', 'API 16A', 'API Q1'],
      icon: Shield
    },
    {
      title: 'ASME Compliance',
      description: 'American Society of Mechanical Engineers codes and standards',
      certifications: ['ASME Section VIII', 'ASME B31.3', 'ASME Y14.5'],
      icon: Award
    },
    {
      title: 'Environmental Standards',
      description: 'Environmental and safety compliance for energy sector operations',
      certifications: ['ISO 14001', 'OSHA Compliance', 'EPA Regulations'],
      icon: CheckCircle
    }
  ];

  const capabilities_detail = [
    {
      title: 'High-Temperature Materials',
      description: 'Expertise in machining superalloys and high-temperature resistant materials',
      benefits: [
        'Inconel and Hastelloy machining',
        'Heat treatment capabilities',
        'Thermal barrier coatings',
        'High-temperature testing'
      ]
    },
    {
      title: 'Pressure Vessel Components',
      description: 'Precision manufacturing of components for high-pressure applications',
      benefits: [
        'ASME code compliance',
        'Pressure testing capabilities',
        'Weld procedure qualification',
        'Non-destructive testing'
      ]
    },
    {
      title: 'Large Component Machining',
      description: 'Capabilities for oversized energy sector components',
      benefits: [
        'Large capacity CNC machines',
        'Precision boring and turning',
        'Heavy component handling',
        'Assembly and testing'
      ]
    },
    {
      title: 'Material Traceability',
      description: 'Complete documentation and traceability for critical applications',
      benefits: [
        'Mill test certificates',
        'Chemical composition verification',
        'Heat number tracking',
        'Material property testing'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className={cn(styles.pageHeader)}>
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80"
            alt="Energy sector manufacturing"
            className="w-full h-full opacity-20"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className={`${theme.spacing.container} relative z-10`}>
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
                <Zap className="w-3 h-3 mr-2" />
                ENERGY SECTOR SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              Energy <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Manufacturing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl"
            >
              Precision components for power generation, oil & gas, and renewable energy systems. Supporting critical infrastructure with proven reliability and industry compliance.
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
                Request Energy Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Energy Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Energy Capabilities */}
      <section className={`${styles.sectionLight} bg-slate-900/5`}>
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

      {/* Energy Sectors */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Energy Sector Expertise</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive manufacturing solutions for traditional and renewable energy sectors, meeting the most demanding operational requirements.
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

                          <h4 className="font-semibold text-slate-800 mb-3">Key Challenges</h4>
                          <div className="space-y-2">
                            {sector.challenges.map((challenge) => (
                              <div key={challenge} className="flex items-center text-sm text-slate-600">
                                <Battery className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                {challenge}
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

      {/* Quality Standards */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Industry Standards & Compliance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Full compliance with energy sector regulations and quality standards ensuring reliability and safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <standard.icon className="w-8 h-8 text-slate-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{standard.title}</h3>
                  <p className="text-slate-600 mb-6">{standard.description}</p>
                  <div className="space-y-2">
                    {standard.certifications.map((cert) => (
                      <div key={cert} className="text-sm font-medium text-slate-700 bg-slate-100 rounded px-3 py-1">
                        {cert}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Capabilities */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Specialized Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced manufacturing capabilities specifically developed for the unique requirements of energy sector applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities_detail.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">{capability.title}</h3>
                  <p className="text-slate-600 mb-6">{capability.description}</p>

                  <div className="space-y-3">
                    {capability.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Power Your Energy Projects</h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with us for reliable, high-quality components that keep energy systems running efficiently and safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Request Energy Quote
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