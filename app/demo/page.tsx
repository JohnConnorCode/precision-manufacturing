'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { Factory, Zap, Shield, Cpu, Settings, Award, Users, TrendingUp, Brain, Gauge, Target, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DemoPage() {
  // Demo data for showcasing capabilities
  const demoCapabilities = [
    {
      title: '5-Axis CNC Machining',
      description: 'Advanced multi-axis machining for complex geometries',
      icon: Settings,
      features: ['±0.0001" tolerance', 'Titanium & exotic alloys', 'Complex 3D contours'],
      image: 'https://images.unsplash.com/photo-1565117650576-09f9469ac3b2?w=800&q=90'
    },
    {
      title: 'Adaptive Manufacturing',
      description: 'AI-powered real-time process optimization',
      icon: Brain,
      features: ['Machine learning', 'Predictive analytics', 'Quality prediction'],
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=90'
    },
    {
      title: 'Precision Metrology',
      description: 'Advanced measurement and quality validation',
      icon: Target,
      features: ['CMM inspection', 'Laser scanning', 'ISO 17025 certified'],
      image: 'https://images.unsplash.com/photo-1537462589942-f3e10db0e074?w=800&q=90'
    },
    {
      title: 'Engineering Services',
      description: 'Complete design and prototyping solutions',
      icon: Layers,
      features: ['CAD/CAM', 'DFM analysis', 'Rapid prototyping'],
      image: 'https://images.unsplash.com/photo-1581092918482-a8fee14d45f0?w=800&q=90'
    }
  ];

  const demoMetrics = [
    { label: 'On-Time Delivery', value: '99.8%', icon: TrendingUp },
    { label: 'First Pass Yield', value: '99.97%', icon: Award },
    { label: 'Active Programs', value: '200+', icon: Factory },
    { label: 'Years Experience', value: '30+', icon: Users }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Understanding your requirements and specifications'
    },
    {
      step: '02',
      title: 'Engineering',
      description: 'Design optimization and DFM analysis'
    },
    {
      step: '03',
      title: 'Production',
      description: 'Precision manufacturing with real-time monitoring'
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description: 'Comprehensive inspection and validation'
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'On-time delivery with complete documentation'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=2400&q=95"
        imageAlt="Precision manufacturing demo showcase"
        badge={{
          text: 'INTERACTIVE DEMO',
          icon: Zap
        }}
        title={
          <>
            Experience{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Precision Manufacturing
            </span>
          </>
        }
        subtitle="Explore Our Capabilities"
        description="Interactive demonstration of our advanced manufacturing technologies, quality systems, and industry-leading capabilities."
        buttons={[
          {
            label: 'Start Consultation',
            href: '/contact',
            variant: 'primary'
          },
          {
            label: 'Download Brochure',
            href: '#download',
            variant: 'secondary'
          }
        ]}
        height="large"
        alignment="center"
        showScrollIndicator={true}
      />

      {/* Live Metrics Dashboard */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Real-Time Performance Metrics</h2>
            <p className="text-xl text-slate-600">Live data from our production floor</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <Icon className="w-10 h-10 text-cyan-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {metric.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Capabilities Showcase */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Interactive Capability Explorer</h2>
            <p className="text-xl text-slate-600">Click to explore each manufacturing capability</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={capability.image}
                        alt={capability.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{capability.title}</h3>
                      <p className="text-slate-600 mb-4">{capability.description}</p>
                      <div className="space-y-2">
                        {capability.features.map((feature) => (
                          <div key={feature} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4 w-full group-hover:bg-cyan-600 transition-colors">
                        Explore This Capability
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Process Timeline</h2>
            <p className="text-xl text-slate-600">From concept to delivery in 5 optimized steps</p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="p-6 text-center bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Viewer Placeholder */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">3D Part Viewer</h2>
            <p className="text-xl text-slate-600">Interact with precision-manufactured components</p>
          </motion.div>

          <Card className="p-12 bg-gradient-to-br from-slate-100 to-slate-50">
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Cpu className="w-20 h-20 mx-auto mb-4 animate-pulse" />
                <p className="text-2xl font-bold mb-2">3D Model Viewer</p>
                <p className="text-slate-300">Interactive component visualization coming soon</p>
                <Button className="mt-6" variant="outline">
                  Request CAD Files
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Experience the precision manufacturing difference with a personalized consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-slate-100">
                Schedule Live Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Download Capabilities Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}