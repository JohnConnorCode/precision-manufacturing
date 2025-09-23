'use client';

import { motion } from 'framer-motion';
import ServiceHero from '@/components/sections/ServiceHero';
import ServiceFeatures from '@/components/sections/ServiceFeatures';
import ServiceCTA from '@/components/sections/ServiceCTA';
import ServiceProcess from '@/components/sections/ServiceProcess';
import ServiceTech from '@/components/sections/ServiceTech';
import ServiceTestimonials from '@/components/sections/ServiceTestimonials';
import { Brain, TrendingUp, AlertTriangle, Shield, Cpu, LineChart } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function PredictiveAnalyticsPage() {
  const features = [
    {
      title: 'Machine Learning Models',
      description: 'Advanced AI algorithms predict equipment failures before they occur.',
      icon: Brain
    },
    {
      title: 'Trend Analysis',
      description: 'Real-time monitoring and analysis of manufacturing trends and patterns.',
      icon: TrendingUp
    },
    {
      title: 'Anomaly Detection',
      description: 'Instant identification of deviations from normal operating parameters.',
      icon: AlertTriangle
    },
    {
      title: 'Preventive Maintenance',
      description: 'Schedule maintenance based on actual equipment condition, not time intervals.',
      icon: Shield
    },
    {
      title: 'IoT Integration',
      description: 'Seamless connection with sensors and manufacturing equipment.',
      icon: Cpu
    },
    {
      title: 'Performance Optimization',
      description: 'Data-driven insights to maximize production efficiency.',
      icon: LineChart
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

  const stats = [
    { value: '85%', label: 'Reduction in Unplanned Downtime' },
    { value: '40%', label: 'Decrease in Maintenance Costs' },
    { value: '99.9%', label: 'Prediction Accuracy' },
    { value: '24/7', label: 'Real-time Monitoring' }
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <ServiceHero
        title="Predictive Analytics"
        subtitle="AI-Powered Manufacturing Intelligence"
        description="Harness the power of artificial intelligence and machine learning to predict equipment failures, optimize production schedules, and maximize operational efficiency."
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        primaryButtonText="Schedule Demo"
        primaryButtonHref="/contact"
        secondaryButtonText="View Case Studies"
        secondaryButtonHref="/case-studies"
      />

      {/* Stats Section */}
      <motion.section {...fadeInUp} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <ServiceFeatures features={features} />

      <ServiceProcess steps={processSteps} />

      {/* Benefits Section */}
      <motion.section {...fadeInUp} className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transform Your Manufacturing Operations</h2>
            <p className="text-lg text-muted-foreground">
              Our predictive analytics platform delivers measurable results across your entire operation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Reduce Costs</h3>
              <p className="text-muted-foreground">
                Minimize expensive emergency repairs and reduce inventory costs through accurate demand forecasting.
              </p>
            </div>
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Increase Uptime</h3>
              <p className="text-muted-foreground">
                Predict and prevent equipment failures before they occur, maximizing production availability.
              </p>
            </div>
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Improve Quality</h3>
              <p className="text-muted-foreground">
                Identify quality issues early in the production process and adjust parameters in real-time.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <ServiceTech technologies={technologies} />

      <ServiceTestimonials />

      <ServiceCTA
        title="Ready to Predict the Future?"
        description="Let's discuss how predictive analytics can transform your manufacturing operations."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Download Whitepaper"
        secondaryButtonHref="/resources/predictive-analytics-whitepaper"
      />
    </main>
  );
}