import { Suspense } from 'react';
import { draftMode } from 'next/headers';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';
import { getIndustry, getRelatedIndustries } from '@/lib/sanity-pages';
import { urlForImage } from '@/sanity/lib/sanity';

interface IndustryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    preview?: string;
  };
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const isDraft = draftMode().isEnabled;
  const industry = await getIndustry(params.slug, isDraft);

  if (!industry) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
    };
  }

  return {
    title: industry.seo?.metaTitle || industry.title,
    description: industry.seo?.metaDescription || industry.overview?.description,
    openGraph: {
      title: industry.seo?.metaTitle || industry.title,
      description: industry.seo?.metaDescription || industry.overview?.description,
      images: industry.seo?.ogImage ? [{ url: urlForImage(industry.seo.ogImage).url() }] : [],
    },
  };
}

export default async function IndustryPage({ params, searchParams }: IndustryPageProps) {
  const isDraft = draftMode().isEnabled;
  const industry = await getIndustry(params.slug, isDraft);
  const relatedIndustries = await getRelatedIndustries(params.slug, 3);

  if (!industry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, "mb-4")}>Industry Not Found</h1>
          <p className={cn(theme.typography.body, "text-slate-600 mb-8")}>
            The industry you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/industries">View All Industries</Link>
          </Button>
        </div>
      </div>
    );
  }

  const heroImage = industry.hero?.backgroundImage
    ? urlForImage(industry.hero.backgroundImage).url()
    : 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2400&q=90';

  return (
    <div className="min-h-screen bg-background">
      {isDraft && (
        <div className="sticky top-0 z-50 bg-yellow-100 border-b-2 border-yellow-400 px-4 py-2 text-sm font-medium text-yellow-800">
          📝 Preview Mode Active - Changes not yet published
          <Link href="/api/exit-preview" className="ml-4 underline hover:no-underline">
            Exit Preview
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        backgroundImage={heroImage}
        imageAlt={industry.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: industry.hero?.badge || 'INDUSTRY',
          icon: Zap,
        }}
        title={
          <>
            <span className="text-white">{industry.title}</span>
          </>
        }
        subtitle={industry.hero?.subtitle}
        description={industry.overview?.description}
        buttons={
          industry.cta?.buttons?.map((btn: any) => ({
            label: btn.text,
            href: btn.href,
            variant: btn.variant || 'primary',
          })) || [
            {
              label: 'Get Consultation',
              href: '/contact',
              variant: 'primary',
            },
          ]
        }
      />

      {/* Market Overview */}
      {industry.overview && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <div className={styles.grid2Col}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className={cn(theme.typography.h2, 'mb-6')}>Market Overview</h2>
                <p className={cn(theme.typography.lead, 'mb-6')}>
                  {industry.overview.description}
                </p>

                {industry.overview.marketSize && (
                  <div className="mb-6">
                    <h3 className={cn(theme.typography.h4, 'mb-2')}>Market Size</h3>
                    <p className={cn(theme.typography.body)}>
                      {industry.overview.marketSize}
                    </p>
                  </div>
                )}

                {industry.overview.keyDrivers && industry.overview.keyDrivers.length > 0 && (
                  <div>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>Key Market Drivers</h3>
                    <div className="space-y-3">
                      {industry.overview.keyDrivers.map((driver: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={cn(theme.typography.body)}>{driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {industry.overview?.challenges && industry.overview.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 p-8 rounded-lg"
                >
                  <h3 className={cn(theme.typography.h3, 'mb-6')}>Key Challenges</h3>
                  <div className="space-y-4">
                    {industry.overview.challenges.map((challenge: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className={cn(theme.typography.body)}>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {industry.capabilities && industry.capabilities.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Our Capabilities</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Specialized capabilities for {industry.title} requirements
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {industry.capabilities.map((capability: any, index: number) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full group')}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Award className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className={cn(theme.typography.h4)}>{capability.title}</h3>
                    </div>

                    <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
                      {capability.description}
                    </p>

                    {capability.technicalDetails && capability.technicalDetails.length > 0 && (
                      <div className="pt-4 border-t border-slate-200">
                        <p className={cn(theme.typography.small, 'font-semibold text-slate-700 mb-2')}>
                          Technical Details
                        </p>
                        <ul className="space-y-2">
                          {capability.technicalDetails.map((detail: string, idx: number) => (
                            <li key={idx} className={cn(theme.typography.small, 'text-slate-600')}>
                              • {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regulatory & Compliance */}
      {industry.regulatory && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Regulatory & Compliance</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Full compliance with industry standards and regulations
              </p>
            </motion.div>

            {industry.regulatory.certifications && industry.regulatory.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className={cn(theme.typography.h3, 'mb-8 text-center')}>Certifications</h3>
                <div className={styles.grid2Col}>
                  {industry.regulatory.certifications.map((cert: any, index: number) => (
                    <Card key={cert.name} className={cn(styles.featureCard)}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Award className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h4 className={cn(theme.typography.h4, 'mb-2')}>{cert.name}</h4>
                          <p className={cn(theme.typography.body, 'text-slate-600 mb-3')}>
                            {cert.description}
                          </p>
                          {cert.scope && (
                            <p className={cn(theme.typography.small, 'text-slate-600')}>
                              <strong>Scope:</strong> {cert.scope}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {industry.regulatory.standards && industry.regulatory.standards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className={cn(theme.typography.h3, 'mb-8 text-center')}>Industry Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {industry.regulatory.standards.map((standard: any, index: number) => (
                    <Card key={standard.name} className={cn(styles.featureCard, 'text-center')}>
                      <h4 className={cn(theme.typography.h4, 'mb-2')}>{standard.name}</h4>
                      <p className={cn(theme.typography.body, 'text-slate-600')}>
                        {standard.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Applications */}
      {industry.applications && industry.applications.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Industry Applications</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Real-world applications and use cases
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8">
              {industry.applications.map((app: any, index: number) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'p-8')}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className={cn(theme.typography.h4, 'mb-2')}>{app.name}</h3>
                        <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
                          {app.description}
                        </p>
                        {app.requirements && app.requirements.length > 0 && (
                          <div>
                            <p className={cn(theme.typography.small, 'font-semibold text-slate-700 mb-2')}>
                              Key Requirements
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {app.requirements.map((req: string, idx: number) => (
                                <div key={idx} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                  <span className={cn(theme.typography.small, 'text-slate-600')}>
                                    {req}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Industries */}
      {relatedIndustries && relatedIndustries.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Related Industries</h2>
            </motion.div>

            <div className={styles.grid3Col}>
              {relatedIndustries.map((rel: any, index: number) => (
                <motion.div
                  key={rel._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/industries/${rel.slug?.current}`}>
                    <Card className={cn(styles.featureCard, 'h-full group cursor-pointer')}>
                      <h3 className={cn(theme.typography.h4, 'mb-2 group-hover:text-blue-600 transition-colors')}>
                        {rel.title}
                      </h3>
                      <p className={cn(theme.typography.body, 'text-slate-600 mb-4')}>
                        {rel.overview?.description || 'Manufacturing solutions for ' + rel.title}
                      </p>
                      <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform">
                        <span className={theme.typography.label}>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className={cn(theme.typography.h2, 'mb-6')}>Ready to Get Started?</h2>
            <p className={cn(theme.typography.lead, 'max-w-2xl mx-auto mb-8')}>
              Contact us today to learn how we can support your {industry.title} needs
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
