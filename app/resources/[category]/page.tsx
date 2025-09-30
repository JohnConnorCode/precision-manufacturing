import Link from 'next/link';
import { Clock, ArrowLeft, Eye, BookOpen } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getCategoryInfo, getAllCategories } from '@/lib/content';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryInfo = getCategoryInfo(resolvedParams.category);
  const articles = getArticlesByCategory(resolvedParams.category);

  if (!categoryInfo) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const featuredArticle = articles.find(article => article.metadata.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Breadcrumb and Back Navigation */}
      <section className="py-8 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <nav className="text-sm text-slate-500">
            <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{categoryInfo.title}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {categoryInfo.title}
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mb-8">
              {categoryInfo.description}
            </p>
            <div className="text-slate-400">
              <span className="bg-slate-800 px-3 py-1 rounded-full text-sm">
                {articles.length} articles available
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
              <Link href={`/resources/${resolvedParams.category}/${featuredArticle.slug}`}>
                <div
                  className="group bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-8 hover:border-blue-600/50 transition-all duration-300"
                  
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.metadata.readTime}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(featuredArticle.metadata.difficulty)}`}>
                        {featuredArticle.metadata.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {featuredArticle.metadata.title}
                  </h3>

                  <p className="text-slate-300 text-lg mb-6">
                    {featuredArticle.metadata.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {featuredArticle.metadata.tags.map(tag => (
                        <span key={tag} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-400 font-medium">
                      Read Article
                      <BookOpen className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <AnimatedSection key={article.slug} delay={index * 0.1}>
                  <Link href={`/resources/${resolvedParams.category}/${article.slug}`}>
                    <article
                      className="group h-full bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300"
                      
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <Clock className="w-4 h-4" />
                          {article.metadata.readTime}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(article.metadata.difficulty)}`}>
                          {article.metadata.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.metadata.title}
                      </h3>

                      <p className="text-slate-400 mb-4 line-clamp-3">
                        {article.metadata.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.metadata.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <span className="text-slate-500 text-sm">
                          {new Date(article.metadata.publishDate).toLocaleDateString()}
                        </span>
                        <div className="flex items-center text-blue-400 text-sm font-medium">
                          Read More
                          <Eye className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Help with Your Project?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Our technical experts are ready to discuss your specific requirements
                and provide personalized guidance for your precision manufacturing needs.
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