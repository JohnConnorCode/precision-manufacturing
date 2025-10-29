import Link from 'next/link';
import { Clock, ArrowRight, Lightbulb } from 'lucide-react';
import HeroSection from '@/components/ui/hero-section';

export const metadata = {
  title: 'Technical Resources | IIS Precision Manufacturing',
  description: 'Expert guides and technical articles about precision machining, CNC processes, quality control, and manufacturing best practices.',
};

export default async function ResourcesPage() {
  // TODO: Migrate resources to MDX format or static data
  const resources: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=90"
        imageAlt="Technical resources and manufacturing knowledge"
        badge={{
          text: "TECHNICAL KNOWLEDGE CENTER"
        }}
        title={
          <>
            <span className="text-white">Master</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Precision Manufacturing
            </span>
          </>
        }
        description={`Expert guides, technical specifications, and tools to help you make informed decisions about precision manufacturing for aerospace, defense, medical, and energy applications. ${resources.length} technical articles available.`}
      />

      {/* Articles Grid */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background via-slate-50/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
              <Lightbulb className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Browse Knowledge Base</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Resources</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              In-depth guides and technical documentation for precision manufacturing excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Link
                key={resource._id}
                href={`/resources/${resource.category}/${resource.slug.current}`}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
                    resource.difficulty === 'Beginner'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : resource.difficulty === 'Intermediate'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    {resource.difficulty}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                    <span>{resource.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                  {resource.excerpt}
                </p>

                <div className="flex items-center text-blue-600 text-sm font-medium">
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
