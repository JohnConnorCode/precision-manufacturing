import Link from 'next/link';
import { Clock, ArrowLeft, BookOpen, CheckCircle2, Target, Users, Briefcase } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { notFound } from 'next/navigation';
import { getSeriesBySlug, getAllSeries } from '@/lib/technical-articles';
import type { Metadata } from 'next';

interface SeriesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((series) => ({
    slug: series.slug,
  }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const series = getSeriesBySlug(resolvedParams.slug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return {
    title: `${series.title} | Integrated Inspection Systems`,
    description: series.description,
    openGraph: {
      title: `${series.title} | Integrated Inspection Systems`,
      description: series.description,
      type: 'website',
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const resolvedParams = await params;
  const series = getSeriesBySlug(resolvedParams.slug);

  if (!series) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  // Aggregate learning objectives from all articles
  const allLearningObjectives = series.articles.flatMap(
    article => article.introduction.learningObjectives.slice(0, 2)
  ).slice(0, 6);

  // Get unique target audiences
  const targetAudiences = Array.from(
    new Set(series.articles.flatMap(article => article.metadata.targetAudience))
  ).slice(0, 4);

  // Get unique industries
  const industries = Array.from(
    new Set(series.articles.flatMap(article => article.metadata.industries))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Breadcrumb and Back Navigation */}
      <section className="relative py-8 px-4 border-b border-blue-600/10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0}>
            <Link href="/resources" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
            <nav className="text-sm text-slate-500">
              <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
              <span className="mx-2">/</span>
              <Link href="/resources/series" className="hover:text-blue-400 transition-colors">Series</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-300">{series.title}</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      {/* Series Header */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-600/20">
                <BookOpen className="w-4 h-4 text-blue-400" />
                {series.articleCount}-Part Technical Series
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">
                {series.title}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
              {series.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            {/* Series Stats */}
            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <span>{series.articleCount} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <span>~{series.totalReadTime} min total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <span>Professional certification-aligned</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Series Overview Grid */}
      <section className="relative py-12 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Learning Objectives */}
            <AnimatedSection delay={0.5} className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">What You'll Learn</h3>
              </div>
              <ul className="space-y-2">
                {allLearningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Target Audience */}
            <AnimatedSection delay={0.6} className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Target Audience</h3>
              </div>
              <ul className="space-y-2">
                {targetAudiences.map((audience, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Industries */}
            <AnimatedSection delay={0.7} className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Industries</h3>
              </div>
              <ul className="space-y-2">
                {industries.map((industry, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-blue-400">•</span>
                    <span>{industry}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Series Articles */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.8}>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8">
              Series Articles
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {series.articles.map((article, index) => (
              <AnimatedSection key={article.metadata.slug} delay={0.9 + index * 0.1}>
                <Link href={`/resources/technical-articles/${article.metadata.slug}`}>
                  <article
                    className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-8 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 hover:translate-x-2 hover:scale-[1.01]"
                  >
                      <div className="flex items-start gap-6">
                        {/* Article Number */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {article.metadata.seriesOrder || index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(article.metadata.difficulty)}`}>
                              {article.metadata.difficulty}
                            </span>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <Clock className="w-4 h-4" />
                              {article.metadata.readTime}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {article.metadata.title}
                          </h3>

                          <p className="text-slate-400 mb-4 leading-relaxed">
                            {article.metadata.excerpt}
                          </p>

                          {/* Learning Objectives Preview */}
                          {article.introduction.learningObjectives.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm text-slate-500 mb-2">Key Learning Objectives:</p>
                              <ul className="space-y-1">
                                {article.introduction.learningObjectives.slice(0, 3).map((objective, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                                    <CheckCircle2 className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                    <span>{objective}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {article.metadata.tags.slice(0, 4).map(tag => (
                              <span key={tag} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow Indicator */}
                        <div className="flex-shrink-0">
                          <div className="text-slate-400 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection disabled={true}>
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Apply These Techniques?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Our technical experts can help you implement these advanced manufacturing and quality
                control strategies in your precision manufacturing operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <PremiumButton size="lg">
                    Get Technical Support
                  </PremiumButton>
                </Link>
                <Link href="/resources">
                  <PremiumButton size="lg" variant="secondary">
                    Browse All Resources
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}