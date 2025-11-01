import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function fixIndustriesFeatures() {
  const client = await MongoClient.connect(uri);
  const db = client.db('precision-manufacturing');

  console.log('\n=== FIXING INDUSTRIES FEATURES ARRAYS ===\n');

  const collection = db.collection('industries');

  // Find industries with string array features
  const industries = await collection.find({}).toArray();

  for (const industry of industries) {
    if (industry.features && Array.isArray(industry.features) && industry.features.length > 0) {
      // Check if it's a string array
      if (typeof industry.features[0] === 'string') {
        // Convert to object array
        const fixedFeatures = industry.features.map(feature => ({ feature: feature }));

        await collection.updateOne(
          { _id: industry._id },
          { $set: { features: fixedFeatures } }
        );

        console.log(`✓ Fixed: ${industry.title}`);
        console.log(`  Before: ["${industry.features[0]}", ...]`);
        console.log(`  After: [{ feature: "${industry.features[0]}" }, ...]`);
      } else {
        console.log(`✓ Already fixed: ${industry.title}`);
      }
    }
  }

  console.log('\n✅ Done!');
  await client.close();
}

fixIndustriesFeatures().catch(console.error);
