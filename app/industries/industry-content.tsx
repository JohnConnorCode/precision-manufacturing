'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';
import React from 'react';

interface IndustryContentProps {
  frontmatter: any;
  content: React.ReactNode;
  slug: string;
}

export function IndustryContent({ frontmatter, content, slug }: IndustryContentProps) {
  const industry = frontmatter as any;

  const heroImage = industry.hero?.backgroundImage
    ? industry.hero.backgroundImage
    : 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2400&q=90';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={industry.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: industry.hero?.badge || 'INDUSTRY',
          icon: Zap,
        }}
        title={<span className="text-white">{industry.title}</span>}
        subtitle={industry.hero?.subtitle}
        description={industry.overview?.description}
        buttons={[
          {
            label: 'Get Consultation',
            href: '/contact',
            variant: 'primary',
          },
        ]}
      />

      {/* Market Overview */}
      {industry.overview && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <div className={styles.grid2Col}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className={cn(theme.typography.h2, 'mb-6')}>Market Overview</h2>
                <p className={cn(theme.typography.lead, 'mb-6')}>
                  {industry.overview.description}
                </p>

                {industry.overview.marketSize && (
                  <div className="mb-6">
                    <h3 className={cn(theme.typography.h4, 'mb-2')}>Market Size</h3>
                    <p className={cn(theme.typography.body)}>
                      {industry.overview.marketSize}
                    </p>
                  </div>
                )}

                {industry.overview.keyDrivers && industry.overview.keyDrivers.length > 0 && (
                  <div>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>Key Market Drivers</h3>
                    <div className="space-y-3">
                      {industry.overview.keyDrivers.map((driver: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={cn(theme.typography.body)}>{driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {industry.overview?.challenges && industry.overview.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 p-8 rounded-lg"
                >
                  <h3 className={cn(theme.typography.h3, 'mb-6')}>Key Challenges</h3>
                  <div className="space-y-4">
                    {industry.overview.challenges.map((challenge: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className={cn(theme.typography.body)}>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
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
              Contact us today to learn how we can support your {industry.title} needs
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
