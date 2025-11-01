import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/?retryWrites=true&w=majority&appName=PrecisionManufacturing';

async function fixSpecsArray() {
  const client = await MongoClient.connect(uri);
  const db = client.db('precision-manufacturing');

  console.log('\n=== FIXING SPECS ARRAYS ===\n');

  const collection = db.collection('services');

  // Find services with string array specs
  const services = await collection.find({}).toArray();

  for (const service of services) {
    if (service.specs && Array.isArray(service.specs) && service.specs.length > 0) {
      // Check if it's a string array
      if (typeof service.specs[0] === 'string') {
        // Convert to object array
        const fixedSpecs = service.specs.map(spec => ({ spec: spec }));

        await collection.updateOne(
          { _id: service._id },
          { $set: { specs: fixedSpecs } }
        );

        console.log(`✓ Fixed: ${service.title}`);
        console.log(`  Before: ["${service.specs[0]}", ...]`);
        console.log(`  After: [{ spec: "${service.specs[0]}" }, ...]`);
      } else {
        console.log(`✓ Already fixed: ${service.title}`);
      }
    }
  }

  console.log('\n✅ Done!');
  await client.close();
}

fixSpecsArray().catch(console.error);
