import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getIndustriesFromDB } from '@/lib/direct-cms-access';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function IndustriesPage() {
  const industries = (await getIndustriesFromDB()) || [] as any[];

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90"
        imageAlt="Industrial manufacturing - precision components for critical industries"
        title={
          <span className="text-white">
            Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">We Serve</span>
          </span>
        }
        description="Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision."
        buttons={[
          {
            label: "Explore Industries",
            href: "#industries",
            variant: "primary"
          },
          {
            label: "Industry Consultation",
            href: "/contact",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Industries Grid */}
      <section id="industries" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Core Industries</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.
            </p>
          </div>

          <div className="space-y-8">
            {industries.map((industry: any) => (
              <div key={industry.title} className="bg-white border border-slate-200 rounded-lg p-8">
                <h3 className="text-3xl font-bold mb-4">{industry.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                  {industry.description}
                </p>
                <Button asChild variant="outline">
                  <Link href={industry.href}>
                    Learn More About {industry.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner with Industry Experts</h2>
            <p className="text-xl text-slate-600 mb-8">
              Join the industry leaders who trust us with their most critical manufacturing requirements. Let&apos;s discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
