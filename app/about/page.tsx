'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Factory, Award, CheckCircle, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { theme, styles } from '@/lib/theme';

export default function AboutPage() {
  const companyStats = [
    { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
    { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
    { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
    { label: 'Facility Size', value: '45,000', description: 'Square feet' }
  ];

  const timeline = [
    {
      year: '1995',
      title: 'IIS Founded',
      description: 'Started in a residential basement with founders from Precision Castparts Inc. Initial focus on small business networking and quality manual development.'
    },
    {
      year: '1998',
      title: 'First CMM Purchased',
      description: 'Purchased our own Zeiss CMM and established facility in Beaverton, Oregon. Began high-volume metrology for Hewlett Packard and plastics industry.'
    },
    {
      year: '1999-2001',
      title: 'MetBase Software Development',
      description: 'Developed proprietary MetBase software to integrate CMM data, CNC machines, and vision systems. Established 3-sigma closed-loop manufacturing system.'
    },
    {
      year: '2001',
      title: 'Aerospace Transition',
      description: 'Pivoted to aerospace inspection and machining after dot-com bubble. Relocated to SE Portland 5,000 sq ft facility. Added second Sheffield CMM.'
    },
    {
      year: '2001-2008',
      title: '4-Sigma System Development',
      description: 'Invented 4-sigma targeting system using MetBase on GE, Siemens, and Alstom IGT castings. Expanded to current 20,000 sq ft facility in Clackamas, Oregon.'
    },
    {
      year: 'Present',
      title: 'Industry Leader',
      description: 'ISO 9001 and AS9100 certified, ITAR registered provider of engineering, metrology, machining, and database services for aerospace and defense.'
    }
  ];

  const values = [
    {
      title: 'Quality Excellence',
      description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.',
      icon: Award,
      principles: [
        'Zero-defect manufacturing mindset',
        'Continual improvement culture',
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
    'CMMC Cybersecurity Maturity Model Certification',
    'OSHA Safety Management System'
  ];

  const capabilities = [
    {
      category: 'Manufacturing',
      items: ['5-axis CNC machining', 'Adaptive manufacturing', 'Precision metrology', 'Surface treatments']
    },
    {
      category: 'Engineering',
      items: ['First article inspection', 'Process planning', 'CAD/CAM programming', 'Process development']
    },
    {
      category: 'Quality',
      items: ['First article inspection', 'Statistical process control', 'Material traceability', 'Certification support']
    },
    {
      category: 'Industries',
      items: ['Aerospace systems', 'Defense platforms', 'Energy infrastructure', 'Medical devices']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
        imageAlt="Precision manufacturing facility - 30 years of excellence"
        badge={{
          text: "PRECISION MANUFACTURING SINCE 1995",
          icon: Factory
        }}
        title={
          <span className="text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Our Company</span>
          </span>
        }
        description="From basement startup to industry leader. Three decades of precision manufacturing excellence serving aerospace, defense, and advanced industries with ISO 9001, AS9100, and ITAR certification."
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
                  Integrated Inspection Systems was founded in 1995, starting in a residential basement with a desk, computer, and a pair of calipers. Our founders came from Precision Castparts Inc, bringing aerospace expertise and a commitment to quality. From 1995-1996, we established cash flow through small business networking while developing a comprehensive quality manual. We then leased our first Zeiss CMM from Hanard Machine in Salem, Oregon, and began serving the plastics industry with a focus on precision metrology.
                </p>
                <p>
                  Our breakthrough came when we applied aerospace GD&amp;T principles to high-volume metrology, a capability few suppliers could match. This led us to purchase our own Zeiss CMM in late 1998 and move to Beaverton, Oregon. We developed proprietary software, MetBase, which revolutionized our ability to integrate CMM data, CNC machines, and vision systems into a closed-loop manufacturing system. By 2001, we had developed a 3-sigma machining system and relocated to our current 20,000 square foot facility in Clackamas, Oregon.
                </p>
                <p>
                  Today, we&apos;re an ISO 9001 and AS9100 certified, ITAR-registered provider of engineering, metrology, machining, and database services. Our 3-sigma manufacturing system and proprietary MetBase software enable us to deliver industry-leading precision components for aerospace, defense, and advanced industries.
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
                src="/about IIS.jpg"
                alt="IIS manufacturing facility in Clackamas, Oregon - 20,000 square feet with advanced machining and metrology equipment"
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

