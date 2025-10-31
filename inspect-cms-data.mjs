import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function inspectData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...\n');
    await client.connect();

    const db = client.db();

    // Inspect services structure
    console.log('=== SERVICES ===');
    const services = await db.collection('services').find({}).toArray();
    console.log(`Total: ${services.length}`);
    services.forEach(s => {
      console.log(`\n- ${s.title || s.name || 'Untitled'}`);
      console.log(`  Slug: ${s.slug}`);
      console.log(`  Keys: ${Object.keys(s).join(', ')}`);
    });

    // Inspect industries structure
    console.log('\n\n=== INDUSTRIES ===');
    const industries = await db.collection('industries').find({}).toArray();
    console.log(`Total: ${industries.length}`);
    industries.forEach(i => {
      console.log(`\n- ${i.title || i.name || 'Untitled'}`);
      console.log(`  Slug: ${i.slug}`);
      console.log(`  Keys: ${Object.keys(i).join(', ')}`);
    });

    // Check resources
    console.log('\n\n=== RESOURCES ===');
    const resourcesCount = await db.collection('resources').countDocuments();
    console.log(`Total: ${resourcesCount}`);
    if (resourcesCount > 0) {
      const resource = await db.collection('resources').findOne({});
      console.log(`Sample keys: ${Object.keys(resource).join(', ')}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

inspectData();
