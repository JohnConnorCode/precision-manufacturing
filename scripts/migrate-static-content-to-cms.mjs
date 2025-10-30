import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

// REAL content from static components
const servicesData = [
  {
    title: '5-Axis CNC Machining',
    slug: '5-axis-machining',
    description: 'Complex geometries with unmatched precision for aerospace components',
    shortDescription: 'Complex geometries with unmatched precision for aerospace components',
    specs: ['±0.0001" tolerance', 'Titanium & super alloys', 'Up to 60" parts'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
    highlight: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Adaptive Machining',
    slug: 'adaptive-machining',
    description: 'Real-time adjustments based on in-process measurements',
    shortDescription: 'Real-time adjustments based on in-process measurements',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90',
    highlight: false,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Metrology & Inspection',
    slug: 'metrology',
    description: 'Complete dimensional verification with CMM and laser scanning',
    shortDescription: 'Complete dimensional verification with CMM and laser scanning',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'AS9102 certified'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90',
    highlight: false,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Engineering Support',
    slug: 'engineering',
    description: 'Design optimization and manufacturing consultation',
    shortDescription: 'Design optimization and manufacturing consultation',
    specs: ['DFM analysis', 'Process planning', 'Cost optimization'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90',
    highlight: false,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const industriesData = [
  {
    title: 'Defense & Government',
    slug: 'defense',
    description: 'ITAR-compliant manufacturing for defense contractors and government agencies. Secure, certified production.',
    shortDescription: 'ITAR-compliant manufacturing for defense contractors and government agencies',
    features: ['ITAR registered', 'Secure facility', 'Rapid prototyping'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Energy & Power',
    slug: 'energy',
    description: 'Critical components for power generation and renewable energy. High-temperature alloys and superalloy expertise.',
    shortDescription: 'Critical components for power generation and renewable energy',
    features: ['Superalloy expertise', 'Large part capability', 'Field service support'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Aerospace & Aviation',
    slug: 'aerospace',
    description: 'Precision components for commercial and military aircraft. AS9100D certified production.',
    shortDescription: 'Precision components for commercial and military aircraft',
    features: ['AS9100D certified', 'NADCAP accredited', 'Zero defect delivery'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function migrate() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();

    // Clear existing data
    await db.collection('services').deleteMany({});
    await db.collection('industries').deleteMany({});
    console.log('🗑️  Cleared existing services and industries');

    // Insert services
    const servicesResult = await db.collection('services').insertMany(servicesData);
    console.log(`✅ Inserted ${servicesResult.insertedCount} services`);

    // Insert industries
    const industriesResult = await db.collection('industries').insertMany(industriesData);
    console.log(`✅ Inserted ${industriesResult.insertedCount} industries`);

    // Get the IDs
    const services = await db.collection('services').find({}).sort({ order: 1 }).toArray();
    const industries = await db.collection('industries').find({}).sort({ order: 1 }).toArray();

    console.log('\n📋 Services IDs:');
    services.forEach(s => console.log(`  - ${s.title}: ${s._id}`));

    console.log('\n📋 Industries IDs:');
    industries.forEach(i => console.log(`  - ${i.title}: ${i._id}`));

    // Update homepage with services and industries blocks
    const homepage = await db.collection('homepage').findOne({});
    if (homepage) {
      await db.collection('homepage').updateOne(
        { _id: homepage._id },
        {
          $set: {
            layout: [
              {
                blockType: 'services',
                blockName: 'Services Section',
                services: services.map(s => s._id),
                heading: 'PRECISION SERVICES',
                subheading: 'Four core service pillars delivering unmatched precision and reliability'
              },
              {
                blockType: 'industries',
                blockName: 'Industries Section',
                industries: industries.map(i => i._id),
                heading: 'INDUSTRY LEADERS',
                subheading: 'Three decades of trusted partnerships in mission-critical sectors'
              }
            ],
            updatedAt: new Date()
          }
        }
      );
      console.log('\n✅ Updated homepage with services and industries blocks');
    }

    console.log('\n🎉 Migration complete!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

migrate();
