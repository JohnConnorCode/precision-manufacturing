'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Cpu, Zap, TrendingUp, Shield, CheckCircle, Activity, Brain } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';

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
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
      challenges: ['Complex geometries', 'Difficult materials', 'Tight tolerances', 'Surface requirements']
    },
    {
      title: 'Defense System Parts',
      description: 'High-reliability components for mission-critical defense applications',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
      challenges: ['Material hardness', 'Precision requirements', 'Traceability', 'Quality standards']
    },
    {
      title: 'Energy Sector Components',
      description: 'Power generation and oil & gas industry precision components',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
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
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Smart adaptive machining with AI control systems"
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: "INTELLIGENT MANUFACTURING",
          icon: Cpu
        }}
        title={
          <>
            <span className="text-white">Adaptive</span> <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">Machining</span>
          </>
        }
        subtitle="AI-Driven Manufacturing Excellence"
        description="Next-generation manufacturing technology that continuously adapts and optimizes machining processes in real-time for superior quality and efficiency."
        buttons={[
          {
            label: "Start Project",
            href: "/contact",
            variant: "primary"
          },
          {
            label: "View Services",
            href: "/services",
            variant: "secondary"
          }
        ]}
      />

      {/* Performance Metrics */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.grid4Col}
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
                <div className={styles.statValue}>
                  {metric.value}
                </div>
                <div className={cn(theme.typography.badge, "text-slate-700 mb-2")}>
                  {metric.label}
                </div>
                <div className={theme.typography.small}>
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Smart Manufacturing Technology</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Our adaptive machining systems combine advanced sensors, AI algorithms, and real-time control to optimize every aspect of the manufacturing process.
            </p>
          </motion.div>

          <div className={styles.grid2Col}>
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "h-full")}>
                  <div className="flex items-center mb-6">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mr-4", theme.colors.primary.gradient)}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={cn(theme.typography.h4)}>{tech.title}</h3>
                  </div>

                  <p className={cn(theme.typography.body, "mb-6")}>
                    {tech.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className={cn(theme.typography.label, "mb-3")}>Features</h4>
                      <div className="space-y-2">
                        {tech.features.map((feature) => (
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
                        {tech.benefits.map((benefit) => (
                          <div key={benefit} className={cn("flex items-center", theme.typography.small)}>
                            <CheckCircle className="w-4 h-4 text-cyan-600 mr-2 flex-shrink-0" />
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
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Industry Applications</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Adaptive machining technology delivers superior results across demanding industrial applications requiring exceptional precision and reliability.
            </p>
          </motion.div>

          <div className={styles.grid3Col}>
            {applications.map((application, index) => (
              <motion.div
                key={application.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard, "overflow-hidden")}>
                  <div className="relative h-48">
                    <ParallaxImagePro
                      src={application.image}
                      alt={application.title}
                      className="w-full h-full"
                      speed={0.2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className={cn(theme.typography.h5, "mb-3")}>{application.title}</h3>
                    <p className={cn(theme.typography.body, "mb-4")}>{application.description}</p>
                    <div>
                      <h4 className={cn(theme.typography.label, "mb-2")}>Key Challenges</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {application.challenges.map((challenge) => (
                          <div key={challenge} className={cn("flex items-center", theme.typography.small)}>
                            <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-2" />
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
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Adaptive Process Flow</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              Our adaptive machining process continuously learns and optimizes throughout the manufacturing cycle.
            </p>
          </motion.div>

          <div className={styles.grid4Col}>
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
                <div className={cn("w-16 h-16 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10", theme.colors.primary.gradient)}>
                  {step.step}
                </div>
                <h3 className={cn(theme.typography.h5, "mb-3")}>{step.title}</h3>
                <p className={theme.typography.body}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Summary */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(theme.typography.h2, "mb-6")}>Adaptive Advantage</h2>
              <p className={cn(theme.typography.lead, "mb-8")}>
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
                    className="border-l-4 border-blue-300 pl-4"
                  >
                    <h3 className={cn(theme.typography.h6, "mb-2")}>{benefit.title}</h3>
                    <p className={theme.typography.body}>{benefit.description}</p>
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
              <ParallaxImagePro
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=90"
                alt="Smart manufacturing control"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
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
            <h2 className={cn(theme.typography.h2, "mb-6")}>Experience Adaptive Manufacturing</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              Discover how our intelligent manufacturing systems can transform your production capabilities and quality outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary}>
                Schedule Demo
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