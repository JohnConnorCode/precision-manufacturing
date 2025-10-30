import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/precision-manufacturing';

/**
 * Verify the resources migration
 */
async function verifyMigration() {
  console.log('========================================');
  console.log('Resources Migration Verification');
  console.log('========================================\n');

  let client;

  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const collection = db.collection('resources');

    // Total count
    const totalCount = await collection.countDocuments();
    console.log(`📊 Total articles: ${totalCount}\n`);

    // Count by category
    console.log('Articles by Category:');
    const categories = [
      'manufacturing-processes',
      'industry-applications',
      'quality-compliance',
      'material-science',
      'calculators-tools',
    ];

    for (const category of categories) {
      const count = await collection.countDocuments({ category });
      const sample = await collection.findOne({ category }, { projection: { title: 1, slug: 1 } });
      console.log(`  ${category}: ${count} articles`);
      if (sample) {
        console.log(`    Sample: "${sample.title}" (slug: ${sample.slug})`);
      }
    }

    // Featured articles
    console.log('\n⭐ Featured Articles:');
    const featuredCount = await collection.countDocuments({ featured: true });
    console.log(`  Total: ${featuredCount}`);

    // Difficulty distribution
    console.log('\n📈 Difficulty Distribution:');
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    for (const difficulty of difficulties) {
      const count = await collection.countDocuments({ difficulty });
      console.log(`  ${difficulty}: ${count} articles`);
    }

    // Sample article details
    console.log('\n📝 Sample Article (Full Details):');
    const sampleArticle = await collection.findOne(
      { slug: '5-axis-cnc-machining-aerospace-guide' }
    );

    if (sampleArticle) {
      console.log(`  Title: ${sampleArticle.title}`);
      console.log(`  Slug: ${sampleArticle.slug}`);
      console.log(`  Category: ${sampleArticle.category}`);
      console.log(`  Difficulty: ${sampleArticle.difficulty}`);
      console.log(`  Author: ${sampleArticle.author}`);
      console.log(`  Read Time: ${sampleArticle.readTime}`);
      console.log(`  Featured: ${sampleArticle.featured}`);
      console.log(`  Publish Date: ${sampleArticle.publishDate}`);
      console.log(`  Tags: ${sampleArticle.tags.map(t => t.tag).join(', ')}`);
      console.log(`  Excerpt: ${sampleArticle.excerpt.substring(0, 100)}...`);
      console.log(`  Content blocks: ${sampleArticle.content.length}`);
      console.log(`  SEO Title: ${sampleArticle.seo.metaTitle}`);
      console.log(`  SEO Description: ${sampleArticle.seo.metaDescription.substring(0, 100)}...`);
    }

    // Verify tags
    console.log('\n🏷️  Tag Analysis:');
    const articlesWithTags = await collection.countDocuments({ tags: { $exists: true, $ne: [] } });
    console.log(`  Articles with tags: ${articlesWithTags}`);

    // Get most common tags
    const tagAggregation = await collection.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags.tag', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    console.log('  Top 10 tags:');
    tagAggregation.forEach(({ _id, count }) => {
      console.log(`    - ${_id}: ${count} articles`);
    });

    // Check for missing required fields
    console.log('\n🔍 Data Quality Check:');
    const missingTitle = await collection.countDocuments({ title: { $exists: false } });
    const missingSlug = await collection.countDocuments({ slug: { $exists: false } });
    const missingExcerpt = await collection.countDocuments({ excerpt: { $exists: false } });
    const missingContent = await collection.countDocuments({ content: { $exists: false } });
    const missingCategory = await collection.countDocuments({ category: { $exists: false } });

    console.log(`  Missing title: ${missingTitle}`);
    console.log(`  Missing slug: ${missingSlug}`);
    console.log(`  Missing excerpt: ${missingExcerpt}`);
    console.log(`  Missing content: ${missingContent}`);
    console.log(`  Missing category: ${missingCategory}`);

    if (missingTitle + missingSlug + missingExcerpt + missingContent + missingCategory === 0) {
      console.log('  ✅ All required fields present!');
    } else {
      console.log('  ⚠️  Some required fields are missing!');
    }

    console.log('\n✅ Verification complete!');

  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

// Run verification
verifyMigration().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
