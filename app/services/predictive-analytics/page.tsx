'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Brain, TrendingUp, AlertTriangle, Shield, Cpu, LineChart, CheckCircle, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';

export default function PredictiveAnalyticsPage() {
  const capabilities = [
    { label: 'Downtime Reduction', value: '85%', description: 'Average improvement' },
    { label: 'Maintenance Savings', value: '40%', description: 'Cost reduction' },
    { label: 'Prediction Accuracy', value: '99.9%', description: 'AI model precision' },
    { label: 'Monitoring', value: '24/7', description: 'Real-time analysis' }
  ];

  const services = [
    {
      title: 'Machine Learning Models',
      description: 'Advanced AI algorithms predict equipment failures before they occur.',
      icon: Brain,
      features: ['Failure prediction', 'Pattern recognition', 'Anomaly detection', 'Performance forecasting'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      capabilities: [
        'TensorFlow & PyTorch models',
        'Neural network architectures',
        'Time series analysis',
        'Predictive maintenance algorithms'
      ]
    },
    {
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring and analysis of manufacturing data streams.',
      icon: TrendingUp,
      features: ['IoT sensor integration', 'Live dashboards', 'Alert systems', 'Performance metrics'],
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
      capabilities: [
        'Apache Kafka streaming',
        'InfluxDB time-series database',
        'Grafana visualization',
        'MQTT protocol support'
      ]
    },
    {
      title: 'Preventive Maintenance',
      description: 'Schedule maintenance based on actual equipment condition and predictions.',
      icon: Shield,
      features: ['Condition-based scheduling', 'Resource optimization', 'Risk assessment', 'Cost analysis'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      capabilities: [
        'Predictive maintenance models',
        'Failure mode analysis',
        'Maintenance optimization',
        'Spare parts forecasting'
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Deploy IoT sensors and connect to existing equipment data streams.'
    },
    {
      step: 2,
      title: 'Model Training',
      description: 'Train machine learning models on historical and real-time production data.'
    },
    {
      step: 3,
      title: 'Pattern Recognition',
      description: 'Identify patterns and correlations that indicate potential issues.'
    },
    {
      step: 4,
      title: 'Predictive Insights',
      description: 'Generate actionable predictions for maintenance and optimization.'
    },
    {
      step: 5,
      title: 'Continuous Improvement',
      description: 'Refine models based on outcomes for increasing accuracy.'
    }
  ];

  const technologies = [
    'TensorFlow',
    'Apache Kafka',
    'Time Series Analysis',
    'Neural Networks',
    'Edge Computing',
    'Cloud Analytics',
    'MQTT Protocol',
    'InfluxDB'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <main className="relative min-h-screen bg-slate-950">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90"
        imageAlt="AI-powered predictive analytics dashboard display"
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: "AI-POWERED MANUFACTURING INTELLIGENCE",
          icon: Brain
        }}
        title={
          <>
            Predictive <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Analytics</span>
          </>
        }
        subtitle="Smart Manufacturing Intelligence"
        description="Harness the power of artificial intelligence and machine learning to predict equipment failures, optimize production schedules, and maximize operational efficiency."
        buttons={[
          {
            label: "Get Started",
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

      {/* Stats Section */}
      <motion.section {...fadeInUp} className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {capabilities.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Predictive Analytics Capabilities</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              Transform your manufacturing operations with data-driven insights and AI-powered predictions.
            </p>
          </motion.div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={cn("grid md:grid-cols-2 gap-12 items-center",
                  index % 2 === 1 && "md:flex-row-reverse")}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <service.icon className="w-8 h-8 text-cyan-400" />
                    <h3 className={cn(theme.typography.h3, "text-cyan-400")}>
                      {service.title}
                    </h3>
                  </div>

                  <p className={cn(theme.typography.body, "text-slate-400 mb-6")}>
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                      Key Features
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                      Technologies
                    </h4>
                    <div className="space-y-2">
                      {service.capabilities.map((capability) => (
                        <div key={capability} className="text-sm text-slate-400">
                          • {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={cn("relative h-96 rounded-lg overflow-hidden",
                  index % 2 === 1 ? "md:order-1" : "")}>
                  <ParallaxImagePro
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Implementation Process</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              Our systematic approach ensures successful deployment of predictive analytics in your operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Transform Your Manufacturing Operations</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              Our predictive analytics platform delivers measurable results across your entire operation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <BarChart3 className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Reduce Costs</h3>
              <p className="text-slate-400">
                Minimize expensive emergency repairs and reduce inventory costs through accurate demand forecasting.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Increase Uptime</h3>
              <p className="text-slate-400">
                Predict and prevent equipment failures before they occur, maximizing production availability.
              </p>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <Shield className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">Improve Quality</h3>
              <p className="text-slate-400">
                Identify quality issues early in the production process and adjust parameters in real-time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Technology Stack</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              Built on industry-leading technologies for reliability and performance.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg px-6 py-3"
              >
                <span className="text-sm text-slate-300">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Predict the Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let\'s discuss how predictive analytics can transform your manufacturing operations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/resources/predictive-analytics-whitepaper">
                Download Whitepaper
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}