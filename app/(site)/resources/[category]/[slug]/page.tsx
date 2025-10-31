import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getResourceBySlugFromCMS } from '@/lib/get-cms-data-direct';
import { SlateRenderer } from '@/components/slate-renderer';
import { draftMode } from 'next/headers';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const resource = await getResourceBySlugFromCMS(slug, isDraft);

  if (!resource) {
    return {
      title: 'Resource Not Found | IIS',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: resource.seo?.metaTitle || `${resource.title} | IIS`,
    description: resource.seo?.metaDescription || resource.excerpt,
    openGraph: {
      title: resource.seo?.metaTitle || resource.title,
      description: resource.seo?.metaDescription || resource.excerpt,
    },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const resource = await getResourceBySlugFromCMS(slug, isDraft);

  if (!resource) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Advanced': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  // Format category name for display
  const categoryDisplayName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="py-6 px-4 border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-muted-foreground hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <div className="text-sm text-muted-foreground">
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <Link href={`/resources/${category}`} className="hover:text-blue-600 transition-colors">{categoryDisplayName}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{resource.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article>
        <header className="py-12 px-4 bg-gradient-to-b from-background to-slate-50/30 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              <div className="flex items-center gap-4 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {resource.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
              {resource.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {resource.excerpt}
            </p>

            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {resource.tags.map((tagObj: any) => {
                  const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                  return (
                    <span key={tagText} className="bg-blue-600/10 text-blue-600 border border-blue-600/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tagText}
                    </span>
                  );
                })}
              </div>
            )}

            {resource.author && (
              <p className="text-sm text-muted-foreground">
                By <span className="font-medium text-foreground">{resource.author}</span>
              </p>
            )}
          </div>
        </header>

        {/* Article Content */}
        <section className="py-8 px-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
              {resource.content && Array.isArray(resource.content) ? (
                <SlateRenderer content={resource.content} />
              ) : (
                <p className="text-slate-500 text-center">Content format not supported. Please view this resource in the admin panel.</p>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contact us to discuss your precision manufacturing needs and learn how we can help bring your project to life.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact Us Today
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
