'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowLeft, Share2, Download, Eye, Calendar, Tag } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { notFound } from 'next/navigation';
import { getResource, getRelatedResources, getCategoryInfo } from '@/lib/sanity-resources';
import { PortableTextContent } from '@/components/portable-text-components';

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const resource = await getResource(resolvedParams.slug);
  const categoryInfo = getCategoryInfo(resolvedParams.category);

  if (!resource || !categoryInfo || resource.category !== resolvedParams.category) {
    notFound();
  }

  const relatedResources = await getRelatedResources(
    resolvedParams.slug,
    resolvedParams.category,
    3
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const handleShare = () => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://iismet.com'}/resources/${resolvedParams.category}/${resolvedParams.slug}`;
    if (typeof navigator !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: resource.title,
          text: resource.excerpt,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Breadcrumb Navigation */}
      <section className="py-6 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href={`/resources/${resolvedParams.category}`} className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {categoryInfo.title}
          </Link>
          <nav className="text-sm text-slate-500">
            <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <Link href={`/resources/${resolvedParams.category}`} className="hover:text-blue-400 transition-colors">{categoryInfo.title}</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{resource.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {resource.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {resource.author}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              {resource.title}
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {resource.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag: string) => (
                  <span key={tag} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 md:p-12">
              <PortableTextContent value={resource.content} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Articles */}
      {relatedResources.length > 0 && (
        <section className="py-16 px-4 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedResources.map((related, index) => (
                  <Link key={related._id} href={`/resources/${resolvedParams.category}/${related.slug.current}`}>
                    <motion.div
                      className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <span className="text-blue-400 text-sm">{categoryInfo.title}</span>
                      <h3 className="text-lg font-bold text-white mt-2 mb-2 line-clamp-2">{related.title}</h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{related.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {related.readTime}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(related.difficulty)}`}>
                          {related.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Apply these insights to your next precision manufacturing project.
                Our team is ready to help you implement these best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <PremiumButton size="lg">
                    Request Technical Consultation
                  </PremiumButton>
                </Link>
                <Link href="/contact?interest=quote">
                  <PremiumButton size="lg" variant="secondary">
                    Get Quote
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

