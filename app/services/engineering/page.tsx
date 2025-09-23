'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Wrench, Lightbulb, Cog, Shield, CheckCircle, Settings, Layers, FileText } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';

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
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
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
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
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
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
        <div className="absolute inset-0 -z-10">
          <ParallaxImagePro
            src="https://images.unsplash.com/photo-1581091877018-dac6a371d50f?w=2400&q=85"
            alt="Advanced CAD engineering and design services"
            className="w-full h-full"
            gradient="dark"
            speed={0.4}
            scale={true}
            blur={true}
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
                <Wrench className="w-3 h-3 mr-2" />
                COMPREHENSIVE DESIGN SERVICES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl"
            >
              Complete engineering solutions from concept to production, including design optimization, rapid prototyping, and manufacturing process development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pb-8"
            >
              <Button
                size="lg"
                className="group px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold"
              >
                Start Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Engineering Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Overview */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineering Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From initial concept to production-ready designs, our engineering team delivers comprehensive solutions optimized for manufacturing excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
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
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-slate-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Services</h4>
                        <div className="space-y-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center text-sm text-slate-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Benefits</h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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
            <h2 className="text-4xl font-bold mb-6">Design & Manufacturing Tools</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              State-of-the-art software and technologies supporting every phase of product development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designCapabilities.map((capability, index) => (
              <motion.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-bold mb-4">{capability.category}</h3>
                  <div className="space-y-2">
                    {capability.tools.map((tool) => (
                      <div key={tool} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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
            <h2 className="text-4xl font-bold mb-6">Project Types</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-slate-600 mr-3" />
                    <h3 className="text-xl font-bold">{project.type}</h3>
                  </div>

                  <p className="text-slate-600 mb-4">{project.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm font-semibold text-slate-800">Timeline:</span>
                      <p className="text-sm text-slate-600">{project.timeline}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Typical Deliverables</h4>
                    <div className="space-y-2">
                      {project.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
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
            <h2 className="text-4xl font-bold mb-6">Our Engineering Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{process.title}</h3>
                <p className="text-sm text-slate-600">{process.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with our engineering team to transform your concepts into production-ready designs optimized for manufacturing success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Start Engineering Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}