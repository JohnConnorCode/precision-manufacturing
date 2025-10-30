import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import readline from 'readline';

// Load environment variables
dotenv.config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/precision-manufacturing';

/**
 * Prompt for user confirmation
 */
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

/**
 * Reset the resources collection
 * WARNING: This will delete all resources documents!
 */
async function resetResourcesCollection() {
  console.log('========================================');
  console.log('⚠️  RESET RESOURCES COLLECTION');
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

    // Count current documents
    const currentCount = await collection.countDocuments();
    console.log(`Current resources collection has ${currentCount} documents.\n`);

    if (currentCount === 0) {
      console.log('ℹ️  Collection is already empty. Nothing to reset.');
      return;
    }

    // Ask for confirmation
    console.log('⚠️  WARNING: This will DELETE ALL resources documents!');
    console.log('⚠️  This action CANNOT be undone!\n');

    const answer = await askQuestion('Are you sure you want to continue? (yes/no): ');

    if (answer.toLowerCase() !== 'yes') {
      console.log('\n❌ Reset cancelled. No changes made.');
      return;
    }

    // Double confirmation for safety
    const confirmAnswer = await askQuestion('\n⚠️  Type "DELETE ALL RESOURCES" to confirm: ');

    if (confirmAnswer !== 'DELETE ALL RESOURCES') {
      console.log('\n❌ Reset cancelled. Confirmation text did not match.');
      return;
    }

    console.log('\n🗑️  Deleting all resources...');

    // Delete all documents
    const deleteResult = await collection.deleteMany({});

    console.log(`✅ Deleted ${deleteResult.deletedCount} documents`);

    // Verify collection is empty
    const finalCount = await collection.countDocuments();
    console.log(`📊 Final count: ${finalCount} documents\n`);

    if (finalCount === 0) {
      console.log('✅ Resources collection has been reset successfully!');
      console.log('\nYou can now re-run the migration:');
      console.log('  node scripts/migrate-resources.mjs');
    } else {
      console.log('⚠️  Warning: Collection still contains documents!');
    }

  } catch (error) {
    console.error('\n❌ Reset failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

/**
 * Alternative: Delete specific articles by slug
 */
async function deleteSpecificArticles(slugs) {
  console.log('========================================');
  console.log('Delete Specific Articles');
  console.log('========================================\n');

  let client;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const collection = db.collection('resources');

    console.log(`Attempting to delete ${slugs.length} articles...\n`);

    let deletedCount = 0;
    for (const slug of slugs) {
      const result = await collection.deleteOne({ slug });
      if (result.deletedCount > 0) {
        console.log(`✅ Deleted: ${slug}`);
        deletedCount++;
      } else {
        console.log(`ℹ️  Not found: ${slug}`);
      }
    }

    console.log(`\n📊 Summary: Deleted ${deletedCount} of ${slugs.length} articles`);

  } catch (error) {
    console.error('\n❌ Delete failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

/**
 * Alternative: Delete by category
 */
async function deleteByCategory(category) {
  console.log('========================================');
  console.log(`Delete Articles in Category: ${category}`);
  console.log('========================================\n');

  let client;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const collection = db.collection('resources');

    const count = await collection.countDocuments({ category });
    console.log(`Found ${count} articles in category "${category}"\n`);

    if (count === 0) {
      console.log('ℹ️  No articles found. Nothing to delete.');
      return;
    }

    const answer = await askQuestion(`Delete all ${count} articles in this category? (yes/no): `);

    if (answer.toLowerCase() !== 'yes') {
      console.log('\n❌ Delete cancelled.');
      return;
    }

    const result = await collection.deleteMany({ category });
    console.log(`\n✅ Deleted ${result.deletedCount} articles from category "${category}"`);

  } catch (error) {
    console.error('\n❌ Delete failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === '--help' || command === '-h') {
  console.log(`
Usage:
  node scripts/reset-resources-collection.mjs [command] [options]

Commands:
  (no command)              Reset entire resources collection (with confirmation)
  --delete-slugs <slugs>    Delete specific articles by slug (comma-separated)
  --delete-category <cat>   Delete all articles in a category
  --help, -h                Show this help message

Examples:
  # Reset entire collection (delete all)
  node scripts/reset-resources-collection.mjs

  # Delete specific articles
  node scripts/reset-resources-collection.mjs --delete-slugs "slug1,slug2,slug3"

  # Delete all articles in a category
  node scripts/reset-resources-collection.mjs --delete-category "manufacturing-processes"

Safety:
  - The reset command requires double confirmation
  - Specific deletes are immediate (use with caution)
  - Always backup your data before running destructive operations
  `);
  process.exit(0);
}

// Execute based on command
if (command === '--delete-slugs') {
  const slugsArg = args[1];
  if (!slugsArg) {
    console.error('Error: Please provide comma-separated slugs');
    console.error('Example: --delete-slugs "slug1,slug2,slug3"');
    process.exit(1);
  }
  const slugs = slugsArg.split(',').map(s => s.trim());
  deleteSpecificArticles(slugs).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} else if (command === '--delete-category') {
  const category = args[1];
  if (!category) {
    console.error('Error: Please provide a category');
    console.error('Example: --delete-category "manufacturing-processes"');
    process.exit(1);
  }
  deleteByCategory(category).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} else {
  // Default: reset entire collection
  resetResourcesCollection().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
