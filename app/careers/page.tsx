'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Briefcase, Award, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { theme, styles, cn } from '@/lib/theme';

export default function CareersPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented engineers and technicians who share your passion for precision manufacturing excellence'
    },
    {
      icon: Award,
      title: 'Professional Development',
      description: 'Access to continuous training, certifications, and opportunities to advance your career in precision manufacturing'
    },
    {
      icon: Heart,
      title: 'Comprehensive Benefits',
      description: 'Competitive health insurance, 401(k) matching, paid time off, and a commitment to work-life balance'
    },
    {
      icon: Briefcase,
      title: 'Industry Leadership',
      description: 'Be part of a company at the forefront of aerospace and defense precision manufacturing technology'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We demand the highest standards in everything we do—from components to customer service'
    },
    {
      title: 'Innovation',
      description: 'We invest in cutting-edge technology and encourage our team to think creatively'
    },
    {
      title: 'Integrity',
      description: 'We operate with transparency and honesty in all our business relationships'
    },
    {
      title: 'Teamwork',
      description: 'Success comes from collaboration and mutual respect across all departments'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Careers at Integrated Inspection Systems - Join our team"
        badge={{
          text: "CAREERS",
          icon: Users
        }}
        title={
          <span className="text-white">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Team</span>
          </span>
        }
        description="Build your career with a leader in precision manufacturing. We're looking for talented individuals who share our commitment to excellence, innovation, and quality."
        buttons={[
          {
            label: "Explore Opportunities",
            href: "#opportunities",
            variant: "primary"
          },
          {
            label: "Contact HR",
            href: "/contact?interest=career",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* About Working Here */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={cn(theme.typography.h2, "mb-6")}>Why Work at IIS?</h2>
              <p className={cn(theme.typography.lead, "mb-6")}>
                Since 1995, Integrated Inspection Systems has been a trusted leader in precision manufacturing for aerospace, defense, and advanced industries. We're proud of our 30-year legacy of quality, innovation, and team excellence.
              </p>
              <p className={cn(theme.typography.body, "text-slate-600 mb-8")}>
                Our team of 150+ skilled professionals works in a state-of-the-art facility using cutting-edge technology including 5-axis CNC machining, adaptive manufacturing, and advanced metrology. We maintain AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance—standards that reflect our commitment to excellence.
              </p>
              <p className={cn(theme.typography.body, "text-slate-600")}>
                We're looking for engineers, technicians, machinists, and quality professionals who want to make a real impact in precision manufacturing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=90"
                alt="Manufacturing facility and team"
                className="w-full h-96 rounded-lg object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Benefits & Opportunities</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              We invest in our team because our people are our greatest asset
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, "h-full")}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600/10">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className={cn(theme.typography.h4, "mb-2")}>{benefit.title}</h3>
                        <p className={cn(theme.typography.body, "text-slate-600")}>{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Our Core Values</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              These principles guide how we work, innovate, and collaborate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className={cn(styles.featureCard)}>
                  <h3 className={cn(theme.typography.h4, "mb-3")}>{value.title}</h3>
                  <p className={cn(theme.typography.body, "text-slate-600")}>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section id="opportunities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Current Opportunities</h2>
            <p className={cn(theme.typography.lead, "max-w-3xl mx-auto")}>
              We're growing and actively hiring talented professionals. Don't see your ideal position? Let us know—we're always interested in exceptional talent.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className={cn(styles.featureCard)}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className={cn(theme.typography.h4, "mb-2")}>Manufacturing Engineering</h3>
                    <p className={cn(theme.typography.body, "text-slate-600 mb-3")}>
                      Work on advanced manufacturing processes, 5-axis CNC programming, and process optimization for aerospace components
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Full-time</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Clackamas, OR</span>
                    </div>
                  </div>
                  <Link href="/contact?interest=career" className="flex-shrink-0">
                    <Button className={styles.ctaPrimary}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className={cn(styles.featureCard)}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className={cn(theme.typography.h4, "mb-2")}>Quality Engineer</h3>
                    <p className={cn(theme.typography.body, "text-slate-600 mb-3")}>
                      Ensure quality excellence through CMM inspection, GD&T analysis, and first article inspection on aerospace projects
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Full-time</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Clackamas, OR</span>
                    </div>
                  </div>
                  <Link href="/contact?interest=career" className="flex-shrink-0">
                    <Button className={styles.ctaPrimary}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className={cn(styles.featureCard)}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className={cn(theme.typography.h4, "mb-2")}>CNC Machinist</h3>
                    <p className={cn(theme.typography.body, "text-slate-600 mb-3")}>
                      Operate and optimize 5-axis CNC machines producing precision aerospace components. Requires AS9100 experience.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Full-time</span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Clackamas, OR</span>
                    </div>
                  </div>
                  <Link href="/contact?interest=career" className="flex-shrink-0">
                    <Button className={styles.ctaPrimary}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className={cn(theme.typography.h2, "mb-6")}>Ready to Join IIS?</h2>
            <p className={cn(theme.typography.lead, "mb-8")}>
              Whether you see an open position or want to let us know about your interest, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={styles.ctaPrimary} asChild>
                <Link href="/contact?interest=career">
                  Contact HR <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={styles.ctaSecondary} asChild>
                <Link href="/about">Learn About IIS</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
