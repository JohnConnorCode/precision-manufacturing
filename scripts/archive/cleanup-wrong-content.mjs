import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function cleanup() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    console.log('🗑️  Cleaning up incorrect database entries...\n');

    // Delete Predictive Analytics service
    const servicesResult = await db.collection('services').deleteOne({ slug: 'predictive-analytics' });
    console.log(`Deleted Predictive Analytics service: ${servicesResult.deletedCount} document(s)`);

    // Delete Medical industry
    const industriesResult = await db.collection('industries').deleteOne({ slug: 'medical' });
    console.log(`Deleted Medical industry: ${industriesResult.deletedCount} document(s)`);

    console.log('\n✅ Cleanup complete!');
    console.log('\nRemaining content:');

    const servicesCount = await db.collection('services').countDocuments();
    const industriesCount = await db.collection('industries').countDocuments();

    console.log(`- Services: ${servicesCount}`);
    console.log(`- Industries: ${industriesCount}`);

    // List remaining services
    const services = await db.collection('services').find({}, { projection: { title: 1, slug: 1 } }).toArray();
    console.log('\nServices:');
    services.forEach(s => console.log(`  - ${s.title} (${s.slug})`));

    // List remaining industries
    const industries = await db.collection('industries').find({}, { projection: { title: 1, slug: 1 } }).toArray();
    console.log('\nIndustries:');
    industries.forEach(i => console.log(`  - ${i.title} (${i.slug})`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

cleanup();
