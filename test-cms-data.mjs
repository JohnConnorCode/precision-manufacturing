import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function testCMSData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✓ Connected successfully');

    const db = client.db();

    // Check services
    const servicesCount = await db.collection('services').countDocuments();
    console.log(`\n✓ Services in database: ${servicesCount}`);

    const services = await db.collection('services').find({}).limit(2).toArray();
    console.log('Sample service:', services[0]?.title || 'None');

    // Check industries
    const industriesCount = await db.collection('industries').countDocuments();
    console.log(`\n✓ Industries in database: ${industriesCount}`);

    const industries = await db.collection('industries').find({}).limit(2).toArray();
    console.log('Sample industry:', industries[0]?.title || 'None');

  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n✓ Connection closed');
  }
}

testCMSData();
