'use client';

import { useEffect, useState } from 'react';
import { draftMode } from 'next/headers';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';
import HeroSection from '@/components/ui/hero-section';
import { getService, getRelatedServices } from '@/lib/sanity-pages';
import { urlForImage } from '@/sanity/lib/sanity';

interface ServicePageProps {
  params: {
    slug: string;
  };
  searchParams: {
    preview?: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps) {
  const isDraft = draftMode().isEnabled;
  const service = await getService(params.slug, isDraft);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.overview?.description,
    openGraph: {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.overview?.description,
      images: service.seo?.ogImage ? [{ url: urlForImage(service.seo.ogImage).url() }] : [],
    },
  };
}

export default async function ServicePage({ params, searchParams }: ServicePageProps) {
  const isDraft = draftMode().isEnabled;
  const service = await getService(params.slug, isDraft);
  const relatedServices = await getRelatedServices(params.slug, 3);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, "mb-4")}>Service Not Found</h1>
          <p className={cn(theme.typography.body, "text-slate-600 mb-8")}>
            The service you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const heroImage = service.hero?.backgroundImage
    ? urlForImage(service.hero.backgroundImage).url()
    : 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=90';

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
        imageAlt={service.title}
        height="large"
        alignment="center"
        showScrollIndicator={true}
        badge={{
          text: service.hero?.badge || 'SERVICE',
          icon: Zap,
        }}
        title={
          <>
            <span className="text-white">{service.title}</span>
          </>
        }
        subtitle={service.hero?.subtitle}
        description={service.overview?.description}
        buttons={
          service.cta?.buttons?.map((btn: any) => ({
            label: btn.text,
            href: btn.href,
            variant: btn.variant || 'primary',
          })) || [
            {
              label: 'Get Quote',
              href: '/contact',
              variant: 'primary',
            },
          ]
        }
      />

      {/* Capabilities Overview */}
      {service.capabilities && service.capabilities.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.grid4Col}
            >
              {service.capabilities.map((capability: any, index: number) => (
                <motion.div
                  key={capability.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={styles.statValue}>{capability.value}</div>
                  <div className={cn(theme.typography.badge, 'text-slate-700 mb-2')}>
                    {capability.label}
                  </div>
                  <div className={theme.typography.small}>{capability.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Service Features</h2>
              <p className={cn(theme.typography.lead, 'max-w-3xl mx-auto')}>
                Comprehensive capabilities designed to meet the most demanding requirements.
              </p>
            </motion.div>

            <div className={styles.grid2Col}>
              {service.features.map((feature: any, index: number) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'group h-full overflow-hidden')}>
                    {feature.image && (
                      <div className="relative h-64 overflow-hidden">
                        <ParallaxImagePro
                          src={urlForImage(feature.image).url()}
                          alt={feature.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          speed={0.2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="p-8">
                      <h3
                        className={cn(
                          theme.typography.h4,
                          'mb-4 group-hover:text-blue-600 transition-colors'
                        )}
                      >
                        {feature.title}
                      </h3>
                      <p className={cn(theme.typography.body, 'mb-6')}>{feature.description}</p>

                      {feature.details && feature.details.length > 0 && (
                        <div className="mb-6">
                          <h4 className={cn(theme.typography.label, 'mb-3')}>Key Features</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {feature.details.map((detail: string) => (
                              <div key={detail} className={cn('flex items-center', theme.typography.small)}>
                                <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {feature.technicalBenefit && (
                        <div className="pt-4 border-t border-slate-200">
                          <p className={cn(theme.typography.small, 'text-slate-600')}>
                            <strong>Technical Benefit:</strong> {feature.technicalBenefit}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs Section */}
      {service.technicalSpecs && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Technical Specifications</h2>
            </motion.div>

            <div className={styles.grid2Col}>
              {/* Tolerances */}
              {service.technicalSpecs.tolerances && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>Tolerances</h3>
                    <div className="space-y-3">
                      {service.technicalSpecs.tolerances.dimensional && (
                        <div>
                          <p className={cn(theme.typography.small, 'font-semibold text-slate-700')}>
                            Dimensional
                          </p>
                          <p className={cn(theme.typography.body, 'text-slate-600')}>
                            {service.technicalSpecs.tolerances.dimensional}
                          </p>
                        </div>
                      )}
                      {service.technicalSpecs.tolerances.geometric && (
                        <div>
                          <p className={cn(theme.typography.small, 'font-semibold text-slate-700')}>
                            Geometric
                          </p>
                          <p className={cn(theme.typography.body, 'text-slate-600')}>
                            {service.technicalSpecs.tolerances.geometric}
                          </p>
                        </div>
                      )}
                      {service.technicalSpecs.tolerances.repeatability && (
                        <div>
                          <p className={cn(theme.typography.small, 'font-semibold text-slate-700')}>
                            Repeatability
                          </p>
                          <p className={cn(theme.typography.body, 'text-slate-600')}>
                            {service.technicalSpecs.tolerances.repeatability}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Materials */}
              {service.technicalSpecs.materials && service.technicalSpecs.materials.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h4, 'mb-4')}>Supported Materials</h3>
                    <div className="space-y-4">
                      {service.technicalSpecs.materials.map((material: any) => (
                        <div key={material.material}>
                          <p className={cn(theme.typography.small, 'font-semibold text-slate-700')}>
                            {material.material}
                          </p>
                          {material.grade && (
                            <p className={cn(theme.typography.small, 'text-slate-600')}>
                              Grade: {material.grade}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.process && service.process.length > 0 && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Our Process</h2>
            </motion.div>

            <div className="space-y-6">
              {service.process.map((step: any, index: number) => (
                <motion.div
                  key={`${step.step}-${step.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard)}>
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                          <span className="text-lg font-bold text-blue-600">{step.step}</span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className={cn(theme.typography.h4, 'mb-2')}>{step.title}</h3>
                        <p className={cn(theme.typography.body, 'text-slate-600 mb-3')}>
                          {step.description}
                        </p>
                        {step.qualityCheck && (
                          <p className={cn(theme.typography.small, 'text-slate-600')}>
                            <strong>QC Points:</strong> {step.qualityCheck}
                          </p>
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

      {/* Equipment Section */}
      {service.equipment && service.equipment.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Equipment & Technology</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.equipment.map((equip: any, index: number) => (
                <motion.div
                  key={equip.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full')}>
                    <h3 className={cn(theme.typography.h4, 'mb-2')}>{equip.name}</h3>
                    {equip.manufacturer && (
                      <p className={cn(theme.typography.small, 'text-slate-600 mb-3')}>
                        {equip.manufacturer} {equip.model}
                      </p>
                    )}
                    {equip.specs && (
                      <p className={cn(theme.typography.small, 'text-slate-600 mb-3')}>
                        {equip.specs}
                      </p>
                    )}
                    {equip.accuracy && (
                      <p className={cn(theme.typography.small, 'text-blue-600 font-medium')}>
                        Accuracy: {equip.accuracy}
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {service.cta && (
        <section className={theme.spacing.section}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>
                {service.cta.title || 'Ready to Get Started?'}
              </h2>
              <p className={cn(theme.typography.lead, 'mb-8')}>
                {service.cta.subtitle ||
                  'Contact our team to discuss your project requirements and get a detailed quote.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className={styles.ctaPrimary} asChild>
                  <Link href="/contact">
                    Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className={styles.ctaSecondary} asChild>
                  <Link href="/services">View Other Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className={styles.sectionLight}>
          <div className={theme.spacing.container}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={cn(theme.typography.h2, 'mb-6')}>Related Services</h2>
            </motion.div>

            <div className={styles.grid3Col}>
              {relatedServices.map((related: any, index: number) => (
                <motion.div
                  key={related._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'h-full flex flex-col')}>
                    <h3 className={cn(theme.typography.h4, 'mb-3 flex-grow')}>
                      {related.title}
                    </h3>
                    {related.overview?.description && (
                      <p className={cn(theme.typography.body, 'text-slate-600 mb-4 flex-grow')}>
                        {related.overview.description.substring(0, 100)}...
                      </p>
                    )}
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/services/${related.slug.current}`}>
                        Learn More <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
