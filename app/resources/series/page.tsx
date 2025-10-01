import Link from 'next/link';
import { Clock, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';
import { getAllSeries } from '@/lib/technical-articles';

export const metadata = {
  title: 'Article Series | Technical Resources | IIS',
  description: 'Browse our comprehensive technical article series on precision manufacturing, CMM inspection, FAI procedures, GD&T, CNC machining, and AS9100 quality management.',
};

export default function SeriesListPage() {
  const series = getAllSeries();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Technical Learning Series</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            Article Series
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Comprehensive technical series covering every aspect of precision manufacturing,
            from fundamentals to advanced topics. Each series is designed to build your expertise
            progressively.
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
              {series.length} Complete Series
            </span>
            <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
              {series.reduce((sum, s) => sum + s.articleCount, 0)} Total Articles
            </span>
          </div>
        </div>
      </section>

      {/* Series Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/resources/series/${s.slug}`}
                className="group h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover:scale-[1.02]"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-600/20">
                      {s.category}
                    </span>
                    <span className="bg-blue-600/10 backdrop-blur-sm text-blue-400 border border-blue-600/20 px-3 py-1 rounded-full text-sm font-medium">
                      {s.articleCount} Articles
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{s.totalReadTime} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
