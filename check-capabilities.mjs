import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://connoreaster:pJ44BfTdlkODXRrI@cluster0.wtluk.mongodb.net/payload-cms?retryWrites=true&w=majority';

async function check() {
  console.log('Connecting to MongoDB...');
  const client = await MongoClient.connect(uri);
  const db = client.db();

  const services = await db.collection('services').find({}).toArray();

  console.log('\n=== CHECKING CAPABILITIES DATA IN SERVICES ===\n');

  for (const service of services) {
    console.log(`\n${service.title}:`);
    console.log('  capabilities:', service.capabilities ? JSON.stringify(service.capabilities, null, 4) : 'NOT SET');
  }

  await client.close();
}

check().catch(console.error);
