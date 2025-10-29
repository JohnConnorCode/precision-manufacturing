import { getMDXFile, getAllMDXFiles } from '@/lib/mdx-utils';
import { ServiceContent } from '../service-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
import Link from 'next/link';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const mdx = await getMDXFile('services', slug);

  if (!mdx) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  const { frontmatter } = mdx;

  return {
    title: frontmatter.seo?.metaTitle || frontmatter.title,
    description: frontmatter.seo?.metaDescription || frontmatter.description,
    openGraph: {
      title: frontmatter.seo?.metaTitle || frontmatter.title,
      description: frontmatter.seo?.metaDescription || frontmatter.description,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllMDXFiles('services');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const mdx = await getMDXFile('services', slug);

  if (!mdx) {
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

  const { frontmatter, content } = mdx;

  return <ServiceContent frontmatter={frontmatter} content={content} slug={slug} />;
}
