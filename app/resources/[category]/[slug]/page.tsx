import { notFound } from 'next/navigation';
import { getResource, getRelatedResources, getCategoryInfo } from '@/lib/sanity-resources';
import { ArticleContent } from '@/components/resources/article-content';

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const resource = await getResource(resolvedParams.slug);
  const categoryInfo = getCategoryInfo(resolvedParams.category);

  if (!resource || !categoryInfo || resource.category !== resolvedParams.category) {
    notFound();
  }

  const relatedResources = await getRelatedResources(
    resolvedParams.slug,
    resolvedParams.category,
    3
  );

  return (
    <ArticleContent
      resource={resource}
      category={resolvedParams.category}
      categoryInfo={categoryInfo}
      relatedResources={relatedResources}
    />
  );
}
