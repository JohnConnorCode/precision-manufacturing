import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import { getAllSeries, getSeriesBySlug } from '@/lib/technical-articles';

export async function generateStaticParams() {
  const series = getAllSeries();
  return series.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return {
    title: `${series.title} | Technical Series | IIS`,
    description: series.description,
  };
}

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const series = getSeriesBySlug(params.slug);

  if (!series) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">{series.category}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
            {series.title}
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {series.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">{series.articleCount} Articles</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">{series.totalReadTime} min total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {series.articles.map((article, index) => (
              <Link
                key={article.metadata.slug}
                href={`/resources/articles/${article.metadata.slug}`}
                className="group block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-start gap-6">
                  {/* Order Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-600/30 flex items-center justify-center">
                    <span className="text-xl font-black text-blue-400">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        article.metadata.difficulty === 'Beginner'
                          ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                          : article.metadata.difficulty === 'Intermediate'
                          ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                          : 'bg-red-400/10 text-red-400 border border-red-400/20'
                      }`}>
                        {article.metadata.difficulty}
                      </span>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.metadata.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {article.metadata.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {article.metadata.excerpt}
                    </p>

                    <div className="flex items-center text-blue-400 text-sm font-medium">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
