import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/?retryWrites=true&w=majority&appName=PrecisionManufacturing';

async function checkDatabases() {
  const client = await MongoClient.connect(uri);

  console.log('\n=== CHECKING ALL DATABASES ===');
  const adminDb = client.db().admin();
  const dbs = await adminDb.listDatabases();

  dbs.databases.forEach(db => {
    console.log(`Database: ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
  });

  console.log('\n=== COLLECTIONS IN precision-manufacturing ===');
  const db = client.db('precision-manufacturing');
  const collections = await db.listCollections().toArray();
  collections.forEach(col => {
    console.log(`- ${col.name}`);
  });

  console.log('\n=== SAMPLE SERVICE DOCUMENT ===');
  const service = await db.collection('services').findOne({});
  if (service) {
    console.log('Keys:', Object.keys(service).join(', '));
    console.log('Title:', service.title);
    console.log('Has _id:', !!service._id);
    console.log('Has id (no underscore):', !!service.id);
  } else {
    console.log('No services found');
  }

  await client.close();
}

checkDatabases().catch(console.error);
