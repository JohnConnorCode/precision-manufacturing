import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getAllTechnicalArticles, getTechnicalArticleBySlug } from '@/lib/technical-articles';

export async function generateStaticParams() {
  const articles = getAllTechnicalArticles();
  return articles.map((article) => ({
    slug: article.metadata.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTechnicalArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | IIS',
    };
  }

  return {
    title: `${article.metadata.title} | IIS Technical Resources`,
    description: article.metadata.excerpt,
    keywords: article.metadata.tags?.join(', '),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getTechnicalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { metadata, introduction } = article;

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
      {/* Breadcrumb Navigation */}
      <nav className="py-6 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <div className="text-sm text-slate-500">
            <Link href="/resources" className="hover:text-blue-400 transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{metadata.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article>
        <header className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(metadata.difficulty)}`}>
                {metadata.difficulty}
              </span>
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {metadata.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(metadata.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              {metadata.title}
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {metadata.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {metadata.tags.map((tag: string) => (
                <span key={tag} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Introduction Section */}
        {introduction && (
          <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-slate-300 mb-6 leading-relaxed">{introduction.overview}</p>

                {introduction.learningObjectives && introduction.learningObjectives.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3">What You'll Learn</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                      {introduction.learningObjectives.map((objective: string, idx: number) => (
                        <li key={idx}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {introduction.prerequisites && introduction.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Prerequisites</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                      {introduction.prerequisites.map((prereq: string, idx: number) => (
                        <li key={idx}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 md:p-12">
              <div className="prose prose-invert prose-slate max-w-none">
                {/* Content will be rendered here - for now just a placeholder */}
                <p className="text-slate-300">Article content rendering in progress...</p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
