'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Wrench, Lightbulb, Cog, Shield, CheckCircle, Settings, Layers, FileText } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';

export default function EngineeringPage() {
  const capabilities = [
    { label: 'Design Projects', value: '500+', description: 'Completed annually' },
    { label: 'CAD Software', value: '12+', description: 'Platforms supported' },
    { label: 'Prototype Time', value: '48hrs', description: 'Rapid turnaround' },
    { label: 'DFM Analysis', value: '100%', description: 'Manufacturing optimized' }
  ];

  const services = [
    {
      title: 'Design for Manufacturing (DFM)',
      description: 'Optimize part designs for efficient manufacturing while maintaining performance requirements.',
      icon: Settings,
      features: ['Cost optimization', 'Tolerance analysis', 'Material selection', 'Process optimization'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=90',
      benefits: [
        'Reduced manufacturing costs',
        'Improved producibility',
        'Shorter lead times',
        'Enhanced quality'
      ]
    },
    {
      title: 'Rapid Prototyping',
      description: 'Fast-track product development with advanced prototyping technologies and processes.',
      icon: Lightbulb,
      features: ['3D printing', 'CNC prototypes', 'Functional testing', 'Design validation'],
      image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1600&q=90',
      benefits: [
        'Accelerated development',
        'Design verification',
        'Risk mitigation',
        'Faster time-to-market'
      ]
    },
    {
      title: 'CAD/CAM Programming',
      description: 'Expert programming services for complex machining operations and toolpath optimization.',
      icon: Layers,
      features: ['Multi-axis programming', 'Toolpath optimization', 'Simulation & verification', 'Post-processing'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=90',
      benefits: [
        'Optimized cycle times',
        'Improved surface finish',
        'Reduced tool wear',
        'Minimized setup time'
      ]
    },
    {
      title: 'Process Development',
      description: 'Comprehensive manufacturing process development and optimization for new products.',
      icon: Cog,
      features: ['Process planning', 'Tooling design', 'Fixture development', 'Quality planning'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
      benefits: [
        'Robust processes',
        'Quality assurance',
        'Cost effectiveness',
        'Scalable production'
      ]
    }
  ];

  const designCapabilities = [
    {
      category: 'CAD Software Expertise',
      tools: [
        'SolidWorks Premium',
        'Siemens NX',
        'Autodesk Inventor',
        'CATIA V5/V6',
        'Fusion 360',
        'KeyShot Rendering'
      ]
    },
    {
      category: 'CAM Programming',
      tools: [
        'Mastercam',
        'NX CAM',
        'PowerMill',
        'EdgeCAM',
        'HSMWorks',
        'FeatureCAM'
      ]
    },
    {
      category: 'Simulation & Analysis',
      tools: [
        'SolidWorks Simulation',
        'ANSYS Workbench',
        'Autodesk CFD',
        'VERICUT',
        'CGTech Simulation',
        'Machining Advisor'
      ]
    },
    {
      category: 'Prototyping Technologies',
      tools: [
        'FDM 3D Printing',
        'SLA Stereolithography',
        'SLS Laser Sintering',
        'CNC Prototyping',
        'Sheet Metal Prototypes',
        'Rapid Tooling'
      ]
    }
  ];

  const projectTypes = [
    {
      type: 'New Product Development',
      description: 'Complete design and development from concept to production',
      timeline: '4-12 weeks',
      deliverables: ['Concept design', '3D models', 'Drawings', 'Prototypes', 'Manufacturing plan']
    },
    {
      type: 'Design Optimization',
      description: 'Improve existing designs for better performance or manufacturability',
      timeline: '2-6 weeks',
      deliverables: ['DFM analysis', 'Revised designs', 'Cost analysis', 'Process improvements']
    },
    {
      type: 'Reverse Engineering',
      description: 'Recreate CAD models from existing parts or legacy components',
      timeline: '1-4 weeks',
      deliverables: ['3D scanning', 'CAD models', 'Technical drawings', 'Material analysis']
    },
    {
      type: 'Tooling & Fixture Design',
      description: 'Custom tooling solutions for manufacturing processes',
      timeline: '2-8 weeks',
      deliverables: ['Tooling design', 'Fixture models', 'Assembly drawings', 'Manufacturing specs']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Advanced CAD engineering and design services workstation"
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: "COMPREHENSIVE DESIGN SERVICES",
          icon: Wrench
        }}
        title={
          <>
            <span className="text-white">Engineering</span> <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </>
        }
        subtitle="From Concept to Production"
        description="Complete engineering solutions from initial concept through final production, including design optimization, rapid prototyping, and manufacturing process development."
        buttons={[
          {
            label: "Start Project",
            href: "/contact",
            variant: "primary"
          },
          {
            label: "View Capabilities",
            href: "/services",
            variant: "secondary"
          }
        ]}
      />

      {/* Capabilities Overview */}
      <section className={`${styles.sectionLight} bg-slate-900/5`}>
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

      {/* Engineering Services */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Engineering Capabilities</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              From initial concept to production-ready designs, our engineering team delivers comprehensive solutions optimized for manufacturing excellence.
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className={cn(theme.typography.label, "mb-3")}>Services</h4>
                        <div className="space-y-2">
                          {service.features.map((feature) => (
                            <div key={feature} className={cn("flex items-center", theme.typography.small)}>
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className={cn(theme.typography.label, "mb-3")}>Benefits</h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit) => (
                            <div key={benefit} className={cn("flex items-center", theme.typography.small)}>
                              <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
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

      {/* Design Capabilities */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Design & Manufacturing Tools</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              State-of-the-art software and technologies supporting every phase of product development.
            </p>
          </motion.div>

          <div className={styles.grid4Col}>
            {designCapabilities.map((capability, index) => (
              <motion.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "p-6 h-full")}>
                  <h3 className={cn(theme.typography.h5, "mb-4")}>{capability.category}</h3>
                  <div className="space-y-2">
                    {capability.tools.map((tool) => (
                      <div key={tool} className={cn("flex items-center", theme.typography.small)}>
                        <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />
                        {tool}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Project Types</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Flexible engagement models to meet diverse engineering needs from concept development to production optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={project.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "p-8 h-full")}>
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-slate-600 mr-3" />
                    <h3 className={cn(theme.typography.h4)}>{project.type}</h3>
                  </div>

                  <p className={cn(theme.typography.body, "mb-4")}>{project.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className={cn(theme.typography.label, "text-sm")}>Timeline:</span>
                      <p className={theme.typography.small}>{project.timeline}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className={cn(theme.typography.label, "mb-3")}>Typical Deliverables</h4>
                    <div className="space-y-2">
                      {project.deliverables.map((deliverable) => (
                        <div key={deliverable} className={cn("flex items-center", theme.typography.small)}>
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
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

      {/* Engineering Process */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Our Engineering Process</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Structured approach ensuring successful project outcomes from initial consultation to final delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Requirements analysis and project planning'
              },
              {
                step: '02',
                title: 'Concept Design',
                description: 'Initial design concepts and feasibility study'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Detailed design and engineering analysis'
              },
              {
                step: '04',
                title: 'Prototyping',
                description: 'Rapid prototypes and design validation'
              },
              {
                step: '05',
                title: 'Optimization',
                description: 'DFM analysis and design refinement'
              },
              {
                step: '06',
                title: 'Production',
                description: 'Manufacturing support and documentation'
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
                {index < 5 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent -translate-x-1/2" />
                )}
                <div className={cn("w-16 h-16 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10", theme.colors.primary.gradient)}>
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>Ready to Start Your Project?</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              Partner with our engineering team to transform your concepts into production-ready designs optimized for manufacturing success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Start Engineering Project
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