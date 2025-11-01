import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function seedPageContent() {
  console.log('Connecting to MongoDB...');
  const client = await MongoClient.connect(uri);
  const db = client.db();

  // Services page content
  const servicesPageContent = {
    pageName: 'services',
    capabilities: [
      {
        label: 'Materials Certified',
        value: '150+',
        description: 'Aerospace & defense grade materials'
      },
      {
        label: 'Precision Tolerance',
        value: '±0.0001"',
        description: 'Guaranteed dimensional accuracy'
      },
      {
        label: 'Production Capacity',
        value: '24/7',
        description: 'Continuous manufacturing capability'
      },
      {
        label: 'Quality System',
        value: 'AS9100D',
        description: 'Full aerospace certification'
      }
    ],
    qualityAssurance: [
      {
        title: 'AS9100D aerospace quality management',
        description: ''
      },
      {
        title: 'ISO 9001:2015 certified processes',
        description: ''
      },
      {
        title: 'ITAR registered for defense contracts',
        description: ''
      },
      {
        title: 'CMMC compliant for cybersecurity',
        description: ''
      }
    ],
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90',
      badge: 'PRECISION MANUFACTURING SERVICES',
      title: 'Our Services',
      subtitle: '',
      description: 'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.',
      buttons: [
        {
          label: 'Request Quote',
          href: '/contact',
          variant: 'primary'
        },
        {
          label: 'View Core Competencies',
          href: '#capabilities',
          variant: 'secondary'
        }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Check if services page content already exists
  const existing = await db.collection('page-content').findOne({ pageName: 'services' });

  if (existing) {
    console.log('Services page content already exists. Updating...');
    await db.collection('page-content').updateOne(
      { pageName: 'services' },
      { $set: servicesPageContent }
    );
    console.log('✅ Updated services page content');
  } else {
    console.log('Creating services page content...');
    await db.collection('page-content').insertOne(servicesPageContent);
    console.log('✅ Created services page content');
  }

  // Verify the data
  const result = await db.collection('page-content').findOne({ pageName: 'services' });
  console.log('\n=== VERIFICATION ===');
  console.log('Page Name:', result.pageName);
  console.log('Capabilities count:', result.capabilities?.length);
  console.log('Quality Assurance count:', result.qualityAssurance?.length);
  console.log('Hero configured:', !!result.hero);

  await client.close();
  console.log('\n✅ Seed complete!');
}

seedPageContent().catch(console.error);
