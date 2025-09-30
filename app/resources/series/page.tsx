import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Target } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';
import { getAllSeries } from '@/lib/technical-articles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Article Series | Integrated Inspection Systems',
  description: 'Comprehensive technical article series covering CMM inspection, FAI procedures, GD&T fundamentals, CNC manufacturing, AS9100 quality management, and MetBase quality systems.',
  openGraph: {
    title: 'Technical Article Series | Integrated Inspection Systems',
    description: 'Comprehensive technical article series covering precision manufacturing, quality control, and inspection techniques.',
    type: 'website',
  },
};

export default function SeriesIndexPage() {
  const allSeries = getAllSeries();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'cmm-inspection': 'from-blue-600 to-cyan-600',
      'first-article': 'from-purple-600 to-pink-600',
      'gdt-fundamentals': 'from-green-600 to-emerald-600',
      'cnc-manufacturing': 'from-orange-600 to-red-600',
      'as9100-quality': 'from-indigo-600 to-purple-600',
      'metbase-quality': 'from-yellow-600 to-orange-600',
    };
    return colors[category] || 'from-slate-600 to-slate-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="py-16 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection disabled={true}>
            <div className="mb-6">
              <Link href="/resources" className="text-blue-400 hover:text-blue-300 transition-colors">
                ← Back to Resources
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Technical Article Series
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mb-8 leading-relaxed">
              Comprehensive, multi-part article series covering essential precision manufacturing topics. Each series
              provides in-depth technical knowledge, practical implementation guidance, and real-world application
              strategies for quality and manufacturing professionals.
            </p>
            <div className="text-slate-400">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
                {allSeries.length} series • {allSeries.reduce((total, s) => total + s.articleCount, 0)} articles
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Series Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allSeries.map((series, index) => (
              <AnimatedSection disabled={true} key={series.slug} delay={index * 0.1}>
                <Link href={`/resources/series/${series.slug}`}>
                  <article
                    className="group h-full bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    {/* Series Header with Gradient */}
                    <div className={`bg-gradient-to-r ${getCategoryColor(series.category)} p-6`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {series.articleCount}-Part Series
                        </span>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <Clock className="w-4 h-4" />
                          {series.totalReadTime} min
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {series.title}
                      </h2>
                    </div>

                    {/* Series Content */}
                    <div className="p-6">
                      <p className="text-slate-300 mb-6 leading-relaxed">
                        {series.description}
                      </p>

                      {/* Article List Preview */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          <span className="font-medium">Series Topics:</span>
                        </div>
                        {series.articles.slice(0, 3).map((article, idx) => (
                          <div key={article.metadata.slug} className="flex items-start gap-3 text-slate-400 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium text-slate-300">
                              {idx + 1}
                            </span>
                            <span className="line-clamp-1">{article.metadata.title}</span>
                          </div>
                        ))}
                        {series.articleCount > 3 && (
                          <div className="text-slate-500 text-sm pl-9">
                            + {series.articleCount - 3} more articles
                          </div>
                        )}
                      </div>

                      {/* View Series Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                          <BookOpen className="w-4 h-4" />
                          <span>View Series</span>
                        </div>
                        <div className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                          <ArrowRight className="w-5 h-5" />
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

      {/* Series Benefits Section */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection disabled={true}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Follow Our Technical Series?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Structured Learning</h3>
                <p className="text-slate-400">
                  Each series follows a logical progression from fundamentals to advanced topics, ensuring comprehensive
                  understanding.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Practical Application</h3>
                <p className="text-slate-400">
                  Real-world examples, case studies, and implementation strategies you can apply directly to your
                  manufacturing operations.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Industry Standards</h3>
                <p className="text-slate-400">
                  Content aligned with AS9100, ISO standards, and industry best practices for aerospace and precision
                  manufacturing.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}