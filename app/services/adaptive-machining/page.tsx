'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Cpu, Zap, TrendingUp, Shield, CheckCircle, Activity, Brain } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

export default function AdaptiveMachiningPage() {
  const metrics = [
    { label: 'Cycle Time Reduction', value: '35%', description: 'Average improvement' },
    { label: 'Tool Life Extension', value: '60%', description: 'Optimized parameters' },
    { label: 'Quality Improvement', value: '99.8%', description: 'First-pass yield' },
    { label: 'Real-time Monitoring', value: '24/7', description: 'Continuous oversight' }
  ];

  const technologies = [
    {
      title: 'Real-Time Process Monitoring',
      description: 'Advanced sensor networks continuously monitor cutting forces, vibration, temperature, and tool condition.',
      icon: Activity,
      features: ['Force sensors', 'Vibration monitoring', 'Temperature tracking', 'Tool wear detection'],
      benefits: ['Early problem detection', 'Reduced scrap', 'Improved surface finish', 'Predictive maintenance']
    },
    {
      title: 'Intelligent Control Systems',
      description: 'AI-powered algorithms automatically adjust cutting parameters for optimal performance and quality.',
      icon: Brain,
      features: ['Machine learning', 'Adaptive algorithms', 'Parameter optimization', 'Predictive analytics'],
      benefits: ['Optimal performance', 'Reduced operator intervention', 'Consistent quality', 'Process optimization']
    },
    {
      title: 'Dynamic Tool Path Adjustment',
      description: 'Real-time toolpath modification based on material conditions and cutting feedback.',
      icon: TrendingUp,
      features: ['Path optimization', 'Feed rate adjustment', 'Stepover modification', 'Depth control'],
      benefits: ['Improved efficiency', 'Better surface finish', 'Extended tool life', 'Reduced cycle time']
    },
    {
      title: 'Quality Assurance Integration',
      description: 'Continuous quality monitoring with automatic corrections and process validation.',
      icon: Shield,
      features: ['In-process inspection', 'Statistical control', 'Automatic correction', 'Quality prediction'],
      benefits: ['Zero-defect manufacturing', 'Reduced inspection time', 'Lower cost of quality', 'Process certification']
    }
  ];

  const applications = [
    {
      title: 'Aerospace Engine Components',
      description: 'Critical turbine parts requiring exceptional precision and surface quality',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
      challenges: ['Complex geometries', 'Difficult materials', 'Tight tolerances', 'Surface requirements']
    },
    {
      title: 'Defense System Parts',
      description: 'High-reliability components for mission-critical defense applications',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
      challenges: ['Material hardness', 'Precision requirements', 'Traceability', 'Quality standards']
    },
    {
      title: 'Energy Sector Components',
      description: 'Power generation and oil & gas industry precision components',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
      challenges: ['Large part size', 'Complex features', 'Material properties', 'Durability requirements']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Setup & Calibration',
      description: 'System calibration and baseline parameter establishment'
    },
    {
      step: '02',
      title: 'Real-Time Monitoring',
      description: 'Continuous data collection and process monitoring'
    },
    {
      step: '03',
      title: 'Adaptive Control',
      description: 'AI-driven parameter adjustments and optimization'
    },
    {
      step: '04',
      title: 'Quality Validation',
      description: 'Automated inspection and process validation'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&q=80"
            alt="Adaptive machining technology"
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
                <Cpu className="w-3 h-3 mr-2" />
                INTELLIGENT MANUFACTURING
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-white"
            >
              Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">Machining</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-400 mb-12 max-w-3xl"
            >
              Next-generation manufacturing technology that continuously adapts and optimizes machining processes in real-time for superior quality and efficiency.
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
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold"
              >
                <Link href="/contact">
                  Schedule Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-slate-900/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-slate-600">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Manufacturing Technology</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our adaptive machining systems combine advanced sensors, AI algorithms, and real-time control to optimize every aspect of the manufacturing process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <tech.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <h3 className="text-2xl font-bold">{tech.title}</h3>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {tech.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Features</h4>
                      <div className="space-y-2">
                        {tech.features.map((feature) => (
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
                        {tech.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
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
            <h2 className="text-4xl font-bold mb-6">Industry Applications</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Adaptive machining technology delivers superior results across demanding industrial applications requiring exceptional precision and reliability.
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
                    <p className="text-slate-600 mb-4">{application.description}</p>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Key Challenges</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {application.challenges.map((challenge) => (
                          <div key={challenge} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                            {challenge}
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

      {/* Process Flow */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Adaptive Process Flow</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our adaptive machining process continuously learns and optimizes throughout the manufacturing cycle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent -translate-x-1/2" />
                )}
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Summary */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Adaptive Advantage</h2>
              <p className="text-lg text-slate-600 mb-8">
                Our adaptive machining technology delivers measurable improvements in quality, efficiency, and cost-effectiveness across all manufacturing operations.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Reduced Cycle Times',
                    description: 'AI-optimized cutting parameters reduce machining time by up to 35%'
                  },
                  {
                    title: 'Improved Quality',
                    description: 'Real-time monitoring and correction achieve 99.8% first-pass yields'
                  },
                  {
                    title: 'Extended Tool Life',
                    description: 'Adaptive control extends cutting tool life by an average of 60%'
                  },
                  {
                    title: 'Lower Operating Costs',
                    description: 'Reduced waste, rework, and maintenance costs improve profitability'
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-slate-300 pl-4"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
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
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                alt="Smart manufacturing control"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Adaptive Manufacturing</h2>
            <p className="text-xl text-slate-600 mb-8">
              Discover how our intelligent manufacturing systems can transform your production capabilities and quality outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Schedule Demo
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