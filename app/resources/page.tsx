import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Eye } from 'lucide-react';
import { PremiumButton } from '@/components/ui/premium-button';
import AnimatedSection from '@/components/ui/animated-section';
import { getAllResources, getFeaturedResources, categoryInfo } from '@/lib/sanity-resources';

export default async function ResourcesPage() {
  const allResources = await getAllResources();
  const featuredResources = await getFeaturedResources();

  // Group resources by category
  const resourcesByCategory = allResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof allResources>);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resources</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mb-8">
              Expert guides, technical specifications, and tools to help you make informed decisions
              about precision manufacturing for aerospace, defense, medical, and energy applications.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                {allResources.length} Technical Articles
              </span>
              <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                {Object.keys(categoryInfo).length} Categories
              </span>
              <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
                Interactive Tools
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-16 px-4 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-white mb-8">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredResources.slice(0, 3).map((resource, index) => (
                  <AnimatedSection key={resource._id} delay={index * 0.1}>
                    <Link href={`/resources/${resource.category}/${resource.slug.current}`}>
                      <article
                        className="group h-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                          {resource.title}
                        </h3>

                        <p className="text-slate-400 mb-4 line-clamp-3">
                          {resource.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-slate-400 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {resource.readTime}
                          </div>
                          <div className="flex items-center text-blue-400 text-sm font-medium">
                            Read Article
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
      )}

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-12">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(categoryInfo).map(([slug, category], index) => {
                const categoryResources = resourcesByCategory[slug] || [];
                const categoryFeatured = categoryResources.find(r => r.featured);

                return (
                  <AnimatedSection key={slug} delay={index * 0.1}>
                    <Link href={`/resources/${slug}`}>
                      <div
                        className="group bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-blue-600/50 transition-all duration-300 h-full hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <BookOpen className="w-8 h-8 text-blue-600" />
                          <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded-full text-xs">
                            {categoryResources.length} articles
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                          {category.title}
                        </h3>

                        <p className="text-slate-400 mb-6">
                          {category.description}
                        </p>

                        {categoryFeatured && (
                          <div className="pt-4 border-t border-slate-800">
                            <p className="text-sm text-slate-500 mb-2">Featured:</p>
                            <p className="text-sm text-slate-300 line-clamp-2">
                              {categoryFeatured.title}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center text-blue-400 font-medium mt-6">
                          Browse Category
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-8">Latest Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allResources.slice(0, 9).map((resource, index) => (
                <AnimatedSection key={resource._id} delay={index * 0.05}>
                  <Link href={`/resources/${resource.category}/${resource.slug.current}`}>
                    <article
                      className="group h-full bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-blue-400 text-xs uppercase tracking-wide">
                          {categoryInfo[resource.category as keyof typeof categoryInfo]?.title}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {resource.title}
                      </h3>

                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                        {resource.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <span className="text-slate-500 text-xs">
                          {new Date(resource.publishDate).toLocaleDateString()}
                        </span>
                        <div className="flex items-center text-slate-400 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.readTime}
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Expert Guidance?
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Our engineering team is ready to help you with your precision manufacturing challenges
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <PremiumButton size="lg">
                    Get Technical Support
                  </PremiumButton>
                </Link>
                <Link href="/contact?interest=quote">
                  <PremiumButton size="lg" variant="secondary">
                    Request Quote
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