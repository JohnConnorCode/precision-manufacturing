import { createClient } from '@sanity/client';
import { getAllTechnicalArticles } from '../lib/technical-articles';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

async function migrateArticles() {
  const articles = getAllTechnicalArticles();

  console.log(`Migrating ${articles.length} articles to Sanity...`);

  for (const article of articles) {
    const { metadata, content } = article;

    // Convert markdown content to Sanity blocks
    const blocks = content.split('\n\n').map((paragraph, index) => ({
      _type: 'block',
      _key: `block-${index}`,
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: paragraph.replace(/^#+\s*/, '').replace(/\*\*/g, ''),
        }
      ],
    }));

    const sanityDoc = {
      _type: 'resource',
      _id: `resource-${metadata.slug}`,
      title: metadata.title,
      slug: {
        _type: 'slug',
        current: metadata.slug,
      },
      excerpt: metadata.excerpt,
      category: metadata.category,
      difficulty: metadata.difficulty,
      readTime: metadata.readTime,
      author: metadata.author || 'IIS Technical Team',
      publishDate: metadata.date,
      featured: metadata.featured || false,
      tags: metadata.tags || [],
      content: blocks,
      seoTitle: metadata.seoTitle || metadata.title,
      seoDescription: metadata.seoDescription || metadata.excerpt,
      contentStatus: 'published',
    };

    try {
      await client.createOrReplace(sanityDoc);
      console.log(`✓ Migrated: ${metadata.title}`);
    } catch (error) {
      console.error(`✗ Failed to migrate ${metadata.title}:`, error);
    }
  }

  console.log('Migration complete!');
}

migrateArticles().catch(console.error);
