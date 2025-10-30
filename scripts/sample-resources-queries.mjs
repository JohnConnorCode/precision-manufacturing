import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/precision-manufacturing';

/**
 * Sample queries demonstrating how to access migrated resources
 */
async function sampleQueries() {
  console.log('========================================');
  console.log('Sample Resource Queries');
  console.log('========================================\n');

  let client;

  try {
    // Connect to MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const collection = db.collection('resources');

    // Query 1: Get all featured articles
    console.log('1️⃣ Featured Articles:');
    console.log('   Query: { featured: true }');
    const featured = await collection
      .find({ featured: true })
      .project({ title: 1, category: 1, difficulty: 1 })
      .limit(5)
      .toArray();
    console.log(`   Found: ${featured.length} (showing first 5)`);
    featured.forEach(article => {
      console.log(`   - ${article.title} [${article.category}] (${article.difficulty})`);
    });

    // Query 2: Get articles by category
    console.log('\n2️⃣ Articles in "Manufacturing Processes" category:');
    console.log('   Query: { category: "manufacturing-processes" }');
    const manufacturingArticles = await collection
      .find({ category: 'manufacturing-processes' })
      .project({ title: 1, difficulty: 1, readTime: 1 })
      .limit(3)
      .toArray();
    console.log(`   Found: ${manufacturingArticles.length} (showing first 3)`);
    manufacturingArticles.forEach(article => {
      console.log(`   - ${article.title} (${article.difficulty}) - ${article.readTime}`);
    });

    // Query 3: Get articles by difficulty
    console.log('\n3️⃣ Beginner-friendly articles:');
    console.log('   Query: { difficulty: "Beginner" }');
    const beginnerArticles = await collection
      .find({ difficulty: 'Beginner' })
      .project({ title: 1, category: 1, readTime: 1 })
      .toArray();
    console.log(`   Found: ${beginnerArticles.length} articles`);
    beginnerArticles.forEach(article => {
      console.log(`   - ${article.title} [${article.category}] - ${article.readTime}`);
    });

    // Query 4: Get articles by tag
    console.log('\n4️⃣ Articles tagged with "Aerospace":');
    console.log('   Query: { "tags.tag": "Aerospace" }');
    const aerospaceArticles = await collection
      .find({ 'tags.tag': 'Aerospace' })
      .project({ title: 1, category: 1, tags: 1 })
      .limit(5)
      .toArray();
    console.log(`   Found: ${aerospaceArticles.length} (showing first 5)`);
    aerospaceArticles.forEach(article => {
      const tags = article.tags.map(t => t.tag).join(', ');
      console.log(`   - ${article.title}`);
      console.log(`     Tags: ${tags}`);
    });

    // Query 5: Get article by slug
    console.log('\n5️⃣ Get specific article by slug:');
    console.log('   Query: { slug: "5-axis-cnc-machining-aerospace-guide" }');
    const specificArticle = await collection.findOne({
      slug: '5-axis-cnc-machining-aerospace-guide'
    });
    if (specificArticle) {
      console.log(`   ✅ Found: ${specificArticle.title}`);
      console.log(`   Author: ${specificArticle.author}`);
      console.log(`   Published: ${specificArticle.publishDate.toLocaleDateString()}`);
      console.log(`   Excerpt: ${specificArticle.excerpt.substring(0, 100)}...`);
    }

    // Query 6: Search articles by title (text search)
    console.log('\n6️⃣ Search articles with "Titanium" in title:');
    console.log('   Query: { title: { $regex: "Titanium", $options: "i" } }');
    const titaniumArticles = await collection
      .find({ title: { $regex: 'Titanium', $options: 'i' } })
      .project({ title: 1, category: 1, difficulty: 1 })
      .toArray();
    console.log(`   Found: ${titaniumArticles.length} articles`);
    titaniumArticles.forEach(article => {
      console.log(`   - ${article.title} [${article.category}]`);
    });

    // Query 7: Get recent articles (sorted by publishDate)
    console.log('\n7️⃣ Most recently published articles:');
    console.log('   Query: Sort by publishDate descending');
    const recentArticles = await collection
      .find({})
      .sort({ publishDate: -1 })
      .project({ title: 1, publishDate: 1, category: 1 })
      .limit(5)
      .toArray();
    console.log(`   Found: ${recentArticles.length} (showing first 5)`);
    recentArticles.forEach(article => {
      const date = article.publishDate.toLocaleDateString();
      console.log(`   - ${article.title} (${date})`);
    });

    // Query 8: Complex query - Advanced articles in Aerospace category with specific tags
    console.log('\n8️⃣ Complex Query: Advanced Manufacturing Process articles:');
    console.log('   Query: { category: "manufacturing-processes", difficulty: "Advanced" }');
    const complexQuery = await collection
      .find({
        category: 'manufacturing-processes',
        difficulty: 'Advanced'
      })
      .project({ title: 1, readTime: 1, tags: 1 })
      .limit(3)
      .toArray();
    console.log(`   Found: ${complexQuery.length} (showing first 3)`);
    complexQuery.forEach(article => {
      const tags = article.tags.map(t => t.tag).slice(0, 3).join(', ');
      console.log(`   - ${article.title}`);
      console.log(`     Read Time: ${article.readTime} | Tags: ${tags}`);
    });

    // Query 9: Aggregation - Count articles by difficulty in each category
    console.log('\n9️⃣ Aggregation: Articles by Category & Difficulty:');
    const aggregation = await collection.aggregate([
      {
        $group: {
          _id: { category: '$category', difficulty: '$difficulty' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.category': 1, '_id.difficulty': 1 } }
    ]).toArray();

    const categoryMap = {};
    aggregation.forEach(item => {
      const cat = item._id.category;
      if (!categoryMap[cat]) categoryMap[cat] = {};
      categoryMap[cat][item._id.difficulty] = item.count;
    });

    Object.entries(categoryMap).forEach(([category, difficulties]) => {
      console.log(`   ${category}:`);
      Object.entries(difficulties).forEach(([difficulty, count]) => {
        console.log(`     - ${difficulty}: ${count}`);
      });
    });

    // Query 10: Full-text search simulation (excerpt + title)
    console.log('\n🔟 Full-text search for "quality control":');
    console.log('   Query: Text search in title and excerpt');
    const searchResults = await collection
      .find({
        $or: [
          { title: { $regex: 'quality control', $options: 'i' } },
          { excerpt: { $regex: 'quality control', $options: 'i' } }
        ]
      })
      .project({ title: 1, category: 1, excerpt: 1 })
      .limit(3)
      .toArray();
    console.log(`   Found: ${searchResults.length} articles`);
    searchResults.forEach(article => {
      console.log(`   - ${article.title} [${article.category}]`);
      console.log(`     ${article.excerpt.substring(0, 80)}...`);
    });

    console.log('\n✅ Sample queries complete!');

  } catch (error) {
    console.error('\n❌ Query failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

// Run sample queries
sampleQueries().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
