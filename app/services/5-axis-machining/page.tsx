'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Settings, Zap, Layers, Shield, CheckCircle, Cog, Target } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { theme, styles, cn } from '@/lib/theme';

export default function FiveAxisMachiningPage() {
  const capabilities = [
    { label: 'Simultaneous Axes', value: '5-Axis', description: 'Full simultaneous' },
    { label: 'Machining Accuracy', value: '±0.0001"', description: 'Precision tolerance' },
    { label: 'Work Envelope', value: '48" x 26" x 20"', description: 'Maximum capacity' },
    { label: 'Spindle Speed', value: '12,000 RPM', description: 'High-speed capability' }
  ];

  const services = [
    {
      title: 'Complex Aerospace Components',
      description: 'Advanced 5-axis machining for turbine blades, impellers, and complex geometries requiring continuous contouring.',
      icon: Settings,
      features: ['Turbine blade manufacturing', 'Impeller machining', 'Complex curve generation', 'Simultaneous 5-axis contouring'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      capabilities: [
        'Hermle C42U 5-axis machining center',
        'Heidenhain iTNC 530 control',
        '±0.0001" positioning accuracy',
        'Automatic tool changer (60 tools)'
      ]
    },
    {
      title: 'Precision Defense Parts',
      description: 'High-precision machining of defense components with complex angles and tight tolerances for critical applications.',
      icon: Shield,
      features: ['Defense component machining', 'Complex angle programming', 'Tight tolerance manufacturing', 'ITAR compliance'],
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940',
      capabilities: [
        'ITAR registered facility',
        'Security clearance available',
        'Traceability documentation',
        'Quality assurance protocols'
      ]
    },
    {
      title: 'Prototype Development',
      description: 'Rapid prototyping and low-volume production using advanced 5-axis capabilities for complex part geometries.',
      icon: Zap,
      features: ['Rapid prototyping', 'Complex geometry machining', 'Material optimization', 'Design validation'],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
      capabilities: [
        'CAD/CAM integration',
        'Multiple material capability',
        'Surface finish optimization',
        'Dimensional verification'
      ]
    },
    {
      title: 'Production Machining',
      description: 'High-volume production capabilities with consistent quality and repeatability for complex manufactured parts.',
      icon: Cog,
      features: ['High-volume production', 'Process optimization', 'Quality consistency', 'Automated workflows'],
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
      capabilities: [
        'Statistical process control',
        'Automated inspection',
        'Production scheduling',
        'Continuous improvement'
      ]
    }
  ];

  const materials = [
    {
      category: 'Aluminum Alloys',
      types: ['6061-T6', '7075-T6', '2024-T3', 'Mic-6 tooling plate'],
      applications: 'Aerospace structures, defense components, tooling'
    },
    {
      category: 'Titanium Alloys',
      types: ['Ti-6Al-4V', 'Ti-6Al-2Sn-4Zr-2Mo', 'Commercial pure titanium'],
      applications: 'Aerospace engines, medical implants, defense'
    },
    {
      category: 'Stainless Steel',
      types: ['316L', '17-4 PH', '15-5 PH', '304/304L'],
      applications: 'Food processing, medical, marine applications'
    },
    {
      category: 'Superalloys',
      types: ['Inconel 718', 'Inconel 625', 'Hastelloy X', 'Waspaloy'],
      applications: 'High-temperature aerospace, power generation'
    }
  ];

  const processes = [
    {
      title: 'Programming & Setup',
      description: 'Advanced CAD/CAM programming with collision detection and optimization for complex 5-axis toolpaths.',
      features: ['Mastercam programming', 'Tool path optimization', 'Collision avoidance', 'Simulation verification']
    },
    {
      title: 'Fixturing & Workholding',
      description: 'Custom fixture design and precision workholding solutions for complex part geometries.',
      features: ['Custom fixture design', 'Modular workholding', 'Part accessibility optimization', 'Vibration dampening']
    },
    {
      title: 'Quality Assurance',
      description: 'In-process monitoring and final inspection ensuring dimensional accuracy and surface finish requirements.',
      features: ['CMM inspection', 'Surface finish measurement', 'GD&T verification', 'Statistical analysis']
    },
    {
      title: 'Finishing Operations',
      description: 'Secondary operations including deburring, surface treatments, and assembly preparation.',
      features: ['Precision deburring', 'Surface treatments', 'Assembly preparation', 'Packaging coordination']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className={cn(styles.pageHeader)}>
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="5-axis machining center"
            className="w-full h-full opacity-20"
            speed={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className={cn(theme.spacing.container, "relative z-10")}>
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
              <span className={theme.components.badge.dark}>
                <Target className="w-3 h-3 mr-2" />
                ADVANCED MACHINING SERVICES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={cn(styles.pageTitle)}
            >
              5-Axis <span className={cn(theme.effects.gradient.text, "from-blue-400 to-cyan-400")}>Machining</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={cn(styles.pageSubtitle, "mb-8")}
            >
              Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Precision manufacturing with uncompromising quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pb-8"
            >
              <Button
                size="lg"
                className={cn(styles.ctaPrimary, "group")}
              >
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className={cn(styles.ctaSecondary, "border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white")}
              >
                <Link href="/contact">
                  Technical Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            <h2 className={cn(theme.typography.h2, "mb-6")}>5-Axis Machining Services</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Comprehensive 5-axis machining capabilities for complex components requiring precision and reliability in aerospace and defense applications.
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
                      <h4 className={cn(theme.typography.label, "mb-3")}>Capabilities</h4>
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

      {/* Materials Section */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Material Capabilities</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Expert machining across a wide range of materials from standard aluminum to exotic superalloys.
            </p>
          </motion.div>

          <div className={styles.grid4Col}>
            {materials.map((material, index) => (
              <motion.div
                key={material.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "h-full")}>
                  <h3 className={cn(theme.typography.h5, "mb-3")}>{material.category}</h3>

                  <div className="mb-4">
                    <h4 className={cn(theme.typography.label, "mb-2 text-sm")}>Available Types</h4>
                    <div className="space-y-1">
                      {material.types.map((type) => (
                        <div key={type} className="flex items-center text-xs text-slate-600">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={cn(theme.typography.label, "mb-2 text-sm")}>Applications</h4>
                    <p className="text-xs text-slate-600">{material.applications}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Manufacturing Process</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Our comprehensive approach ensures optimal results from initial programming through final inspection.
            </p>
          </motion.div>

          <div className={styles.grid4Col}>
            {processes.map((process, index) => (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "h-full")}>
                  <div className={cn("w-12 h-12 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4", theme.colors.primary.gradient)}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className={cn(theme.typography.h5, "mb-3")}>{process.title}</h3>
                  <p className={cn(theme.typography.small, "mb-4")}>{process.description}</p>

                  <div>
                    <h4 className={cn(theme.typography.label, "mb-2 text-sm")}>Key Elements</h4>
                    <div className="space-y-1">
                      {process.features.map((feature) => (
                        <div key={feature} className="flex items-center text-xs text-slate-600">
                          <CheckCircle className="w-3 h-3 text-cyan-500 mr-2 flex-shrink-0" />
                          {feature}
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

      {/* Call to Action */}
      <section className={styles.sectionDark}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(theme.typography.h2, "mb-6 text-white")}>Ready for Complex Machining?</h2>
            <p className={cn(theme.typography.lead, "text-slate-300 mb-8")}>
              Partner with IIS for advanced 5-axis machining solutions that meet the most demanding aerospace and defense requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Get Technical Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className={cn(styles.ctaSecondary, "border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white")}>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}