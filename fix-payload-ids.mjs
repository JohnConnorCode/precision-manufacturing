import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/?retryWrites=true&w=majority&appName=PrecisionManufacturing';

async function addIdFields() {
  const client = await MongoClient.connect(uri);
  const db = client.db('precision-manufacturing');

  console.log('\n=== ADDING id FIELDS TO ALL COLLECTIONS ===\n');

  // Collections to fix
  const collections = ['services', 'industries', 'resources', 'homepage', 'users', 'payload-preferences', 'payload-migrations'];

  for (const collectionName of collections) {
    try {
      const collection = db.collection(collectionName);

      // Find all documents without an 'id' field
      const docs = await collection.find({ id: { $exists: false } }).toArray();

      if (docs.length === 0) {
        console.log(`✅ ${collectionName}: All documents already have 'id' field`);
        continue;
      }

      console.log(`🔧 ${collectionName}: Found ${docs.length} documents missing 'id' field`);

      // Update each document to add id field matching _id
      for (const doc of docs) {
        await collection.updateOne(
          { _id: doc._id },
          { $set: { id: doc._id.toString() } }
        );
      }

      console.log(`✅ ${collectionName}: Updated ${docs.length} documents\n`);
    } catch (error) {
      console.log(`⚠️  ${collectionName}: ${error.message}\n`);
    }
  }

  console.log('=== VERIFYING RESULTS ===\n');

  // Verify services collection
  const service = await db.collection('services').findOne({});
  if (service) {
    console.log('Sample service after fix:');
    console.log('  _id:', service._id);
    console.log('  id:', service.id);
    console.log('  title:', service.title);
    console.log('  Match:', service._id.toString() === service.id ? '✅' : '❌');
  }

  await client.close();
  console.log('\n✅ Done!');
}

addIdFields().catch(console.error);
