"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, GraduationCap, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { PremiumButton } from '@/components/ui/premium-button';

const featuredSeries = [
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
];

export default function Resources() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10">
        <AnimatedSection disabled className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Technical Resources & Knowledge Base
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white"
          >
            Master Precision Manufacturing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive technical article series covering CMM inspection, FAI procedures, GD&T fundamentals,
            CNC manufacturing, AS9100 quality management, and MetBase quality systems.
          </motion.p>
        </AnimatedSection>

        {/* Featured Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredSeries.map((series, index) => (
            <AnimatedSection disabled key={series.slug}>
              <Link href={`/resources/series/${series.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover:scale-[1.02]"
                >
                  {/* Series Header */}
                  <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl">{series.icon}</span>
                      <span className="bg-blue-600/10 backdrop-blur-sm text-blue-400 border border-blue-600/20 px-3 py-1 rounded-full text-sm font-medium">
                        {series.articleCount} Articles
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {series.title}
                    </h3>
                  </div>

                  {/* Series Content */}
                  <div className="p-6">
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {series.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{series.readTime}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          series.difficulty === 'Beginner' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                          series.difficulty === 'Intermediate' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                          'bg-red-400/10 text-red-400 border border-red-400/20'
                        }`}>
                          {series.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
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

        {/* Additional Series & CTA */}
        <AnimatedSection disabled>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 border border-blue-600/20 rounded-2xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">6 Complete Series • 21+ Technical Articles</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Explore Our Complete Knowledge Base
                </h3>
                <p className="text-lg text-slate-300">
                  CNC Manufacturing Precision, AS9100 Quality Management, MetBase Quality Systems, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/resources/series">
                  <PremiumButton size="lg">
                    <BookOpen className="w-5 h-5" />
                    View All Series
                  </PremiumButton>
                </Link>
                <Link href="/resources">
                  <PremiumButton size="lg" variant="secondary">
                    Browse Resources
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Structured Learning',
              description: 'Progressive curriculum from fundamentals to advanced topics'
            },
            {
              icon: <GraduationCap className="w-6 h-6" />,
              title: 'Industry Standards',
              description: 'Aligned with AS9100, ISO, and aerospace best practices'
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: 'Practical Application',
              description: 'Real-world examples and implementation strategies'
            },
          ].map((benefit, index) => (
            <AnimatedSection disabled key={benefit.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center p-6 bg-slate-900/30 rounded-xl border border-slate-800/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 text-blue-400 mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}