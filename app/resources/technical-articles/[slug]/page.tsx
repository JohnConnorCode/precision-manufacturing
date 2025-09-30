import Link from 'next/link';
import { Clock, ArrowLeft, User, Calendar, Tag, CheckCircle2, BookOpen, ArrowRight, Target, Users } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { notFound } from 'next/navigation';
import { getTechnicalArticleBySlug, getAllTechnicalArticles, getTechnicalArticlesBySeries } from '@/lib/technical-articles';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';

interface TechnicalArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allArticles = getAllTechnicalArticles();
  return allArticles.map((article) => ({
    slug: article.metadata.slug,
  }));
}

export async function generateMetadata({ params }: TechnicalArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getTechnicalArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      type: 'article',
    },
    alternates: {
      canonical: article.seo.canonicalUrl,
    },
  };
}

export default async function TechnicalArticlePage({ params }: TechnicalArticlePageProps) {
  const resolvedParams = await params;
  const article = getTechnicalArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Get other articles in the series if this is part of a series
  const seriesArticles = article.metadata.series
    ? getTechnicalArticlesBySeries(article.metadata.series)
    : [];

  const currentIndex = seriesArticles.findIndex(a => a.metadata.slug === article.metadata.slug);
  const previousArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < seriesArticles.length - 1 ? seriesArticles[currentIndex + 1] : null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

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
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0}>
            {article.metadata.series && article.metadata.seriesSlug ? (
              <>
                <Link
                  href={`/resources/series/${article.metadata.seriesSlug}`}
                  className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {article.metadata.series}
                </Link>
                <nav className="text-sm text-slate-500">
                  <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
                  <span className="mx-2">/</span>
                  <Link href="/resources/series" className="hover:text-blue-400 transition-colors">Series</Link>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/resources/series/${article.metadata.seriesSlug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {article.metadata.series}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-slate-300">Article {article.metadata.seriesOrder}</span>
                </nav>
              </>
            ) : (
              <>
                <Link href="/resources" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Link>
                <nav className="text-sm text-slate-500">
                  <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
                  <span className="mx-2">/</span>
                  <span className="text-slate-300">{article.metadata.category}</span>
                </nav>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Article Header */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.1}>
            {/* Meta Information */}
            <div className="flex flex-wrap gap-3 mb-6">
              {article.metadata.series && article.metadata.seriesSlug && (
                <Link
                  href={`/resources/series/${article.metadata.seriesSlug}`}
                  className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-600/20 hover:border-blue-600/40 transition-colors"
                >
                  {article.metadata.series} • Part {article.metadata.seriesOrder}
                </Link>
              )}
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(article.metadata.difficulty)}`}>
                {article.metadata.difficulty}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 leading-tight">
              {article.metadata.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            {/* Excerpt */}
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {article.metadata.excerpt}
            </p>

            {/* Author and Meta */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm border-t border-b border-slate-800 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.metadata.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.metadata.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.metadata.readTime}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-8 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Learning Objectives */}
            <AnimatedSection delay={0.5} className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Learning Objectives</h2>
              </div>
              <ul className="space-y-3">
                {article.introduction.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Target Audience & Prerequisites */}
            <AnimatedSection delay={0.6} className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Target Audience</h2>
              </div>
              <ul className="space-y-2 mb-6">
                {article.metadata.targetAudience.map((audience, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300">
                    <span className="text-blue-400">•</span>
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>

              {article.introduction.prerequisites.length > 0 && (
                <>
                  <h3 className="text-sm font-bold text-slate-400 mb-2">Prerequisites:</h3>
                  <ul className="space-y-1">
                    {article.introduction.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                        <span>•</span>
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </AnimatedSection>
          </div>

          {/* Overview */}
          <AnimatedSection delay={0.7} className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border border-blue-600/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">Overview</h2>
            <div className="text-slate-300 leading-relaxed prose prose-invert max-w-none">
              {article.introduction.overview.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.8}>
            <article className="prose prose-invert prose-lg max-w-none">
              <div className="text-slate-300 leading-relaxed space-y-8">
                {article.content.map((section: any, index: number) => (
                  <div key={index} className="mb-8">
                    {section.type === 'heading' && (
                      <h2 className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0">
                        {section.content}
                      </h2>
                    )}
                    {section.type === 'subheading' && (
                      <h3 className="text-2xl font-bold text-white mb-4 mt-8">
                        {section.content}
                      </h3>
                    )}
                    {section.type === 'paragraph' && (
                      <p className="text-slate-300 leading-relaxed mb-4">
                        {section.content}
                      </p>
                    )}
                    {section.type === 'list' && (
                      <ul className="space-y-3 mb-6">
                        {section.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.type === 'callout' && (
                      <div className={`rounded-xl p-6 my-8 border ${
                        section.style === 'warning' ? 'bg-yellow-600/10 border-yellow-600/20' :
                        section.style === 'tip' ? 'bg-green-600/10 border-green-600/20' :
                        section.style === 'info' ? 'bg-blue-600/10 border-blue-600/20' :
                        'bg-slate-800/50 border-slate-700'
                      }`}>
                        <p className="text-slate-200 font-medium">{section.content}</p>
                      </div>
                    )}
                    {section.type === 'code' && (
                      <pre className="bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-x-auto">
                        <code className="text-slate-300 text-sm">{section.content}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </article>
          </AnimatedSection>
        </div>
      </section>

      {/* Tags */}
      <section className="relative py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={0.9}>
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-white">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.metadata.tags.map(tag => (
                <span key={tag} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-700 hover:border-blue-600/50 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Series Navigation */}
      {seriesArticles.length > 1 && (
        <section className="relative py-12 px-4 bg-slate-900/30 border-y border-blue-600/10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={1.0}>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">Series Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {previousArticle && (
                  <Link href={`/resources/technical-articles/${previousArticle.metadata.slug}`}>
                    <div
                      className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 hover:-translate-x-1"
                    >
                      <div className="text-slate-400 text-sm mb-2">← Previous</div>
                      <h3 className="text-white font-bold mb-1 group-hover:text-blue-400 transition-colors">
                        Part {previousArticle.metadata.seriesOrder}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2">
                        {previousArticle.metadata.title}
                      </p>
                    </div>
                  </Link>
                )}

                {nextArticle && (
                  <Link href={`/resources/technical-articles/${nextArticle.metadata.slug}`}>
                    <div
                      className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 md:col-start-2 hover:translate-x-1"
                    >
                      <div className="text-slate-400 text-sm mb-2 text-right">Next →</div>
                      <h3 className="text-white font-bold mb-1 text-right group-hover:text-blue-400 transition-colors">
                        Part {nextArticle.metadata.seriesOrder}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 text-right">
                        {nextArticle.metadata.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {article.relatedContent.relatedArticles && article.relatedContent.relatedArticles.length > 0 && (
        <section className="relative py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={1.1}>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">Related Articles</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedContent.relatedArticles.map((related, index) => (
                <AnimatedSection key={related.slug} delay={1.2 + index * 0.1}>
                  <Link href={`/resources/technical-articles/${related.slug}`}>
                    <div
                      className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-600/10 rounded-xl p-6 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 h-full hover:-translate-y-1"
                    >
                      <h3 className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-3">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {related.readTime}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-16 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection delay={1.5}>
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
                Need Help Implementing These Strategies?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Our technical experts are ready to provide personalized guidance for your precision
                manufacturing and quality control challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <PremiumButton size="lg">
                    Get Technical Support
                  </PremiumButton>
                </Link>
                {article.metadata.series && article.metadata.seriesSlug && (
                  <Link href={`/resources/series/${article.metadata.seriesSlug}`}>
                    <PremiumButton size="lg" variant="secondary">
                      View Full Series
                    </PremiumButton>
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}