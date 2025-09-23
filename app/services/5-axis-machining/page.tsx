'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Cog, Zap, Target, Shield, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

export default function FiveAxisMachiningPage() {
  const specifications = [
    { label: 'Tolerance', value: '±0.0001"', description: 'Guaranteed precision' },
    { label: 'Materials', value: '150+', description: 'Certified alloys' },
    { label: 'Part Size', value: '40" x 30"', description: 'Maximum capacity' },
    { label: 'Speed', value: '24,000 RPM', description: 'Spindle capability' }
  ];

  const capabilities = [
    {
      title: 'Complex Geometries',
      description: 'Manufacture intricate parts with undercuts, angled features, and compound curves in a single setup.',
      icon: Target,
      features: ['Multi-sided machining', 'Reduced setup time', 'Improved accuracy', 'Complex contours']
    },
    {
      title: 'Aerospace Materials',
      description: 'Expert machining of titanium, Inconel, aluminum, and other aerospace-grade materials.',
      icon: Shield,
      features: ['Titanium alloys', 'Inconel 718/625', 'Aluminum 7075/6061', 'Stainless steel']
    },
    {
      title: 'High-Speed Machining',
      description: 'Advanced tooling strategies and cutting parameters for maximum efficiency and surface finish.',
      icon: Zap,
      features: ['Adaptive toolpaths', 'Optimized feeds/speeds', 'Superior surface finish', 'Reduced cycle times']
    },
    {
      title: 'Quality Control',
      description: 'In-process monitoring and comprehensive inspection ensuring every part meets specifications.',
      icon: CheckCircle,
      features: ['In-process probing', 'Statistical process control', 'CMM inspection', 'First article reports']
    }
  ];

  const applications = [
    {
      title: 'Turbine Components',
      description: 'Precision blades, vanes, and housings for aerospace engines',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'
    },
    {
      title: 'Landing Gear Parts',
      description: 'Critical structural components requiring exact tolerances',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80'
    },
    {
      title: 'Structural Brackets',
      description: 'Complex aerospace brackets and mounting hardware',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80'
    }
  ];

  const equipment = [
    'DMG MORI DMU 85 monoBLOCK',
    'Haas UMC-750SS 5-Axis',
    'Okuma MU-8000V Multitasking',
    'Mazak INTEGREX i-400S'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="5-axis CNC machining"
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
                <Cog className="w-3 h-3 mr-2" />
                ADVANCED CNC CAPABILITIES
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              5-Axis <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">CNC Machining</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl"
            >
              Advanced 5-axis CNC machining capabilities delivering precision aerospace components with complex geometries and tight tolerances in a single setup.
            </p>

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
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Technical Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 bg-slate-900/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {specifications.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {spec.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {spec.label}
                </div>
                <div className="text-sm text-slate-600">
                  {spec.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">5-Axis Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our advanced 5-axis machining centers enable complex part geometries with superior accuracy and efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <capability.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <h3 className="text-2xl font-bold">{capability.title}</h3>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {capability.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {capability.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Typical Applications</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From turbine components to structural brackets, our 5-axis capabilities handle the most demanding aerospace applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((application, index) => (
              <motion.div
                key={application.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48">
                    <ParallaxImage
                      src={application.image}
                      alt={application.title}
                      className="w-full h-full"
                      speed={0.2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{application.title}</h3>
                    <p className="text-slate-600">{application.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Advanced Equipment</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our facility features the latest 5-axis CNC machining centers from industry-leading manufacturers, ensuring precision and reliability for every project.
              </p>

              <div className="space-y-4">
                {equipment.map((machine, index) => (
                  <motion.div
                    key={machine}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <TrendingUp className="w-5 h-5 text-slate-600 mr-3" />
                    <span className="text-slate-700 font-medium">{machine}</span>
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
              <ParallaxImage
                src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80"
                alt="5-axis CNC machine"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From initial design review to final inspection, we ensure every 5-axis machined component meets the highest standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Design Review',
                description: 'Engineering analysis and manufacturability assessment'
              },
              {
                step: '02',
                title: 'Programming',
                description: 'CAM programming with optimized toolpaths'
              },
              {
                step: '03',
                title: 'Machining',
                description: '5-axis CNC machining with real-time monitoring'
              },
              {
                step: '04',
                title: 'Inspection',
                description: 'Comprehensive quality control and documentation'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                <p className="text-slate-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Complex Machining?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Partner with us for precision 5-axis CNC machining that meets the most demanding aerospace specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Get Quote
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