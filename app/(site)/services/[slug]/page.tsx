import { getServiceBySlugFromCMS } from '@/lib/get-cms-data-direct';
import { ServiceContent } from '../service-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
import Link from 'next/link';
import { draftMode } from 'next/headers';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const serviceData = await getServiceBySlugFromCMS(slug, isDraft);

  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: serviceData.seo?.metaTitle || serviceData.title,
    description: serviceData.seo?.metaDescription || serviceData.description,
    openGraph: {
      title: serviceData.seo?.metaTitle || serviceData.title,
      description: serviceData.seo?.metaDescription || serviceData.description,
    },
  };
}

// No build-time path generation; resolve at request time

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const serviceData = await getServiceBySlugFromCMS(slug, isDraft);

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, 'mb-4')}>Service Not Found</h1>
          <p className={cn(theme.typography.body, 'text-slate-600 mb-8')}>
            The service you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ServiceContent serviceData={serviceData} slug={slug} />;
}
