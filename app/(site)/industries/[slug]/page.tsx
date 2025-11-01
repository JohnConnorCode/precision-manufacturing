import { getIndustryBySlugFromCMS } from '@/lib/get-cms-data-direct';
import { IndustryContent } from '../industry-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
import Link from 'next/link';
import { draftMode } from 'next/headers';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const industryData = await getIndustryBySlugFromCMS(slug, isDraft);

  if (!industryData) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
    };
  }

  return {
    title: industryData.seo?.metaTitle || industryData.title,
    description: industryData.seo?.metaDescription || industryData.description,
    openGraph: {
      title: industryData.seo?.metaTitle || industryData.title,
      description: industryData.seo?.metaDescription || industryData.description,
    },
  };
}

// No build-time path generation; resolve at request time

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const industryData = await getIndustryBySlugFromCMS(slug, isDraft);

  if (!industryData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(theme.typography.h1, 'mb-4')}>Industry Not Found</h1>
          <p className={cn(theme.typography.body, 'text-slate-600 mb-8')}>
            The industry you're looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/industries">View All Industries</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <IndustryContent industryData={industryData} slug={slug} />;
}
