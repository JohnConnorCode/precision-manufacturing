import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getAllTechnicalArticles } from '@/lib/technical-articles';

export const metadata = {
  title: 'Technical Resources | IIS Precision Manufacturing',
  description: 'Expert guides and technical articles about precision machining, CNC processes, quality control, and manufacturing best practices.',
};

export default function ResourcesPage() {
  const articles = getAllTechnicalArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resources</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Expert guides, technical specifications, and tools to help you make informed decisions
            about precision manufacturing for aerospace, defense, medical, and energy applications.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
              {articles.length} Technical Articles
            </span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.metadata.slug}
                href={`/resources/articles/${article.metadata.slug}`}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20">
                    {article.metadata.category}
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
