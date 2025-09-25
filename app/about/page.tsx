'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Factory, Award, TrendingUp, CheckCircle, Target, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { theme, styles, cn } from '@/lib/theme';

export default function AboutPage() {
  const companyStats = [
    { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
    { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
    { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
    { label: 'Facility Size', value: '45,000', description: 'Square feet' }
  ];

  const timeline = [
    {
      year: '1993',
      title: 'Company Founded',
      description: 'Started as a small precision machining shop focusing on aerospace components'
    },
    {
      year: '1998',
      title: 'AS9100 Certification',
      description: 'Achieved aerospace quality certification and expanded defense contracts'
    },
    {
      year: '2005',
      title: 'Facility Expansion',
      description: 'Doubled facility size and added 5-axis CNC machining capabilities'
    },
    {
      year: '2012',
      title: 'ITAR Registration',
      description: 'Secured ITAR registration for defense manufacturing programs'
    },
    {
      year: '2018',
      title: 'Technology Innovation',
      description: 'Implemented adaptive machining and Industry 4.0 technologies'
    },
    {
      year: '2023',
      title: 'Sustainability Initiative',
      description: 'Launched comprehensive environmental sustainability program'
    }
  ];

  const values = [
    {
      title: 'Quality Excellence',
      description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.',
      icon: Award,
      principles: [
        'Zero-defect manufacturing mindset',
        'Continuous improvement culture',
        'Customer satisfaction focus',
        'Industry-leading standards'
      ]
    },
    {
      title: 'Innovation Leadership',
      description: 'Pioneering advanced manufacturing technologies and processes to stay ahead of industry demands.',
      icon: Zap,
      principles: [
        'Technology investment',
        'Process optimization',
        'Research & development',
        'Future-ready solutions'
      ]
    },
    {
      title: 'Reliability & Trust',
      description: 'Building long-term partnerships through consistent performance and transparent communication.',
      icon: Target,
      principles: [
        'On-time delivery commitment',
        'Transparent communication',
        'Long-term partnerships',
        'Dependable performance'
      ]
    },
    {
      title: 'Team Excellence',
      description: 'Investing in our people through training, development, and creating a culture of excellence.',
      icon: Users,
      principles: [
        'Skilled workforce development',
        'Safety-first culture',
        'Continuous training',
        'Team collaboration'
      ]
    }
  ];

  const leadership = [
    {
      name: 'John Anderson',
      title: 'Chief Executive Officer',
      experience: '25+ years',
      background: 'Former aerospace engineer with extensive manufacturing leadership experience',
      focus: 'Strategic vision and operational excellence'
    },
    {
      name: 'Sarah Mitchell',
      title: 'Chief Operating Officer',
      experience: '20+ years',
      background: 'Manufacturing operations expert with lean manufacturing expertise',
      focus: 'Production efficiency and quality systems'
    },
    {
      name: 'David Chen',
      title: 'Chief Technology Officer',
      experience: '18+ years',
      background: 'Advanced manufacturing technology and automation specialist',
      focus: 'Technology innovation and process optimization'
    },
    {
      name: 'Maria Rodriguez',
      title: 'Quality Director',
      experience: '22+ years',
      background: 'Quality management systems and aerospace certification expert',
      focus: 'Quality assurance and regulatory compliance'
    }
  ];

  const certifications = [
    'AS9100D Aerospace Quality Management',
    'ISO 9001:2015 Quality Management',
    'ITAR International Traffic in Arms',
    'NADCAP National Aerospace Defense',
    'ISO 14001 Environmental Management',
    'OSHA Safety Management System'
  ];

  const capabilities = [
    {
      category: 'Manufacturing',
      items: ['5-axis CNC machining', 'Adaptive manufacturing', 'Precision metrology', 'Surface treatments']
    },
    {
      category: 'Engineering',
      items: ['Design for manufacturing', 'Rapid prototyping', 'CAD/CAM programming', 'Process development']
    },
    {
      category: 'Quality',
      items: ['First article inspection', 'Statistical process control', 'Material traceability', 'Certification support']
    },
    {
      category: 'Industries',
      items: ['Aerospace systems', 'Defense platforms', 'Energy infrastructure', 'Industrial equipment']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80"
        imageAlt="Precision manufacturing facility - 30 years of excellence"
        badge={{
          text: "PRECISION MANUFACTURING SINCE 1993",
          icon: Factory
        }}
        title={
          <span className="text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Our Company</span>
          </span>
        }
        description="Three decades of precision manufacturing excellence, serving aerospace, defense, and energy industries with unwavering commitment to quality and innovation."
        buttons={[
          {
            label: "Our Capabilities",
            href: "#capabilities",
            variant: "primary"
          },
          {
            label: "Contact Our Team",
            href: "/contact",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Company Stats */}
      <section id="stats" className={`${styles.sectionLight} bg-slate-900/5`}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  Founded in 1993, we began as a small precision machining shop with a vision to become the most trusted manufacturer of critical aerospace components. What started with a handful of employees and basic CNC equipment has grown into a state-of-the-art facility serving the most demanding industries.
                </p>
                <p>
                  Our journey has been marked by continuous investment in technology, people, and processes. We've built our reputation on delivering zero-defect components while maintaining the personal service and attention to detail that our customers value.
                </p>
                <p>
                  Today, we're proud to be a certified AS9100D manufacturer, ITAR-registered facility, and trusted partner to Fortune 500 companies worldwide. Our commitment to excellence drives everything we do.
                </p>
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
                alt="Manufacturing facility"
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three decades of growth, innovation, and excellence in precision manufacturing.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-300 h-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                      <div className="text-2xl font-bold text-slate-900 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide our decisions, shape our culture, and drive our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-slate-700" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-slate-600 mb-6">{value.description}</p>

                  <div className="space-y-3">
                    {value.principles.map((principle) => (
                      <div key={principle} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {principle}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation, quality, and growth across all aspects of our business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                    <div className="text-lg font-semibold text-slate-700 mb-1">{leader.title}</div>
                    <div className="text-sm text-slate-500">{leader.experience}</div>
                  </div>

                  <p className="text-slate-600 mb-4">{leader.background}</p>

                  <div className="border-l-4 border-slate-300 pl-4">
                    <div className="text-sm font-semibold text-slate-800 mb-1">Focus Area</div>
                    <div className="text-sm text-slate-600">{leader.focus}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Certifications */}
      <section id="capabilities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Core Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-4">{capability.category}</h3>
                      <div className="space-y-2">
                        {capability.items.map((item) => (
                          <div key={item} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Certifications & Standards</h2>
              <div className="space-y-4">
                {certifications.map((certification, index) => (
                  <motion.div
                    key={certification}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <Award className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{certification}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4">Commitment to Excellence</h3>
                <p className="text-slate-600">
                  Our certifications represent more than compliance—they reflect our unwavering commitment to quality, safety, and continuous improvement in everything we do.
                </p>
              </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner with Us</h2>
            <p className="text-xl text-slate-600 mb-8">
              Experience the difference that three decades of precision manufacturing excellence can make for your critical components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}