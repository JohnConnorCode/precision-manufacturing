'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';

interface ServiceContentProps {
  frontmatter: any;
  content: React.ReactNode;
  slug: string;
}

export function ServiceContent({ frontmatter, content, slug }: ServiceContentProps) {
  const service = frontmatter as any;
  const heroImage = service.hero?.backgroundImage
    ? service.hero.backgroundImage
    : 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=90';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={service.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: service.hero?.badge || 'SERVICE',
          icon: Zap,
        }}
        title={<span className="text-white">{service.title}</span>}
        subtitle={service.hero?.subtitle}
        description={service.overview?.description}
        buttons={[
          {
            label: 'Get Quote',
            href: '/contact',
            variant: 'primary',
          },
          {
            label: 'Learn More',
            href: '#details',
            variant: 'secondary',
          },
        ]}
      />

      {/* Capabilities Overview */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.grid4Col}
            >
              {service.capabilities.map((capability: any, index: number) => (
                <motion.div
                  key={capability.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={styles.statValue}>{capability.value}</div>
                  <div className={cn(theme.typography.badge, 'text-slate-700 mb-2')}>
                    {capability.label}
                  </div>
                  <div className={theme.typography.small}>{capability.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Rest of the content components... */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className={cn(theme.typography.body, 'max-w-3xl prose prose-sm')}>
            {content}
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
            className="text-center"
          >
            <h2 className={cn(theme.typography.h2, 'mb-6')}>Ready to Get Started?</h2>
            <p className={cn(theme.typography.lead, 'max-w-2xl mx-auto mb-8')}>
              Contact us today to learn how we can support your {service.title} needs
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
