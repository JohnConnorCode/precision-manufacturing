import { getMDXFile, getAllMDXFiles } from '@/lib/mdx-utils';
import { IndustryContent } from '../industry-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/theme';
import { theme } from '@/lib/theme';
import Link from 'next/link';

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const mdx = await getMDXFile('industries', slug);

  if (!mdx) {
    return {
      title: 'Industry Not Found',
      description: 'The requested industry could not be found.',
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
  const slugs = getAllMDXFiles('industries');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const mdx = await getMDXFile('industries', slug);

  if (!mdx) {
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

  const { frontmatter, content } = mdx;

  return <IndustryContent frontmatter={frontmatter} content={content} slug={slug} />;
}
