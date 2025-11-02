"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, GraduationCap, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { PremiumButton } from '@/components/ui/premium-button';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';

// Hardcoded fallback data
const defaultResourcesData = {
  header: {
    badge: 'Technical Resources & Knowledge Base',
    title: 'Master Precision Manufacturing',
    description: 'Comprehensive technical article series covering CMM inspection, FAI procedures, GD&T fundamentals, CNC manufacturing, AS9100 quality management, and MetBase quality systems.'
  },
  featuredSeries: [
    {
      title: 'CMM Inspection Mastery',
      slug: 'cmm-inspection-mastery',
      description: 'Master coordinate measuring machine setup, programming, and measurement strategies for precision inspection.',
      articleCount: 4,
      readTime: '34 min',
      difficulty: 'Intermediate',
      icon: '📐',
      gradient: 'from-blue-600 via-blue-500 to-indigo-600',
    },
    {
      title: 'First Article Inspection Excellence',
      slug: 'first-article-inspection-fai-excellence',
      description: 'Complete AS9102 FAI requirements, documentation, and approval processes for aerospace manufacturing.',
      articleCount: 3,
      readTime: '26 min',
      difficulty: 'Advanced',
      icon: '✓',
      gradient: 'from-blue-600 via-blue-500 to-indigo-600',
    },
    {
      title: 'GD&T Fundamentals',
      slug: 'gdt-fundamentals-and-application',
      description: 'Comprehensive Geometric Dimensioning and Tolerancing training for precision manufacturing applications.',
      articleCount: 4,
      readTime: '35 min',
      difficulty: 'Beginner',
      icon: '⊕',
      gradient: 'from-blue-600 via-blue-500 to-indigo-600',
    },
  ],
  cta: {
    title: 'Explore Our Complete Knowledge Base',
    description: 'CNC Manufacturing Precision, AS9100 Quality Management, MetBase Quality Systems, and more.',
    buttons: [
      { text: 'View All Series', href: '/resources/series', variant: 'primary' },
      { text: 'Browse Resources', href: '/resources', variant: 'secondary' }
    ]
  }
};

interface ResourcesProps {
  data?: typeof defaultResourcesData | null;
}

export default function Resources({ data }: ResourcesProps) {
  // Use CMS data if available, otherwise fall back to hardcoded defaults
  const resourcesData = data || defaultResourcesData;
  return (
    <section className={`relative ${spacing.section} ${colors.bgLight} overflow-hidden`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className={`${spacing.containerWide} relative z-10`}>
        <AnimatedSection className={`text-center ${spacing.headingBottom}`}>
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            {resourcesData.header.badge}
          </p>

          <h2 className={`${typography.sectionHeading} mb-6`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {resourcesData.header.title}
            </span>
          </h2>

          <p className={`${typography.descriptionMuted} max-w-3xl mx-auto`}>
            {resourcesData.header.description}
          </p>
        </AnimatedSection>

        {/* Featured Series Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${spacing.grid} mb-12`}>
          {resourcesData.featuredSeries.map((series, index) => (
            <AnimatedSection key={series.slug} delay={index * 0.1} className="group">
              <Link href={`/resources/series/${series.slug}`}>
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`h-full bg-white border ${colors.borderLight} ${borderRadius.card} overflow-hidden hover:border-blue-600/50 hover:shadow-xl transition-all duration-300`}
                >
                  {/* Series Header */}
                  <div className={`p-6 border-b ${colors.borderLight}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl">{series.icon}</span>
                      <span className={`bg-blue-600/10 text-blue-600 border border-blue-600/20 px-3 py-1 ${borderRadius.pill} text-sm font-medium`}>
                        {series.articleCount} Articles
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold ${colors.textDark} mb-2`}>
                      {series.title}
                    </h3>
                  </div>

                  {/* Series Content */}
                  <div className="p-6">
                    <p className={`${colors.textMedium} mb-6 leading-relaxed`}>
                      {series.description}
                    </p>

                    <div className={`flex items-center justify-between pt-4 border-t ${colors.borderLight}`}>
                      <div className={`flex items-center gap-4 text-sm ${colors.textMedium}`}>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{series.readTime}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          series.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border border-green-200' :
                          series.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {series.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        <span className="text-sm">Explore</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className={`bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-blue-600/5 border border-blue-600/20 ${borderRadius.card} p-8 md:p-12 text-center`}>
            <h3 className={`text-2xl md:text-3xl font-bold ${colors.textDark} mb-3`}>
              {resourcesData.cta.title}
            </h3>
            <p className={`text-lg ${colors.textMedium} mb-6`}>
              {resourcesData.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {resourcesData.cta.buttons.map((button, index) => (
                <Link key={button.text} href={button.href}>
                  <PremiumButton size="lg" variant={button.variant === 'primary' ? 'default' : 'secondary'}>
                    {index === 0 && <BookOpen className="w-5 h-5" />}
                    {button.text}
                  </PremiumButton>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}