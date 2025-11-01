import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

const navigationData = {
  topBar: {
    phone: '503-231-9093',
    phoneLink: 'tel:+15032319093',
    email: 'officemgr@iismet.com',
    emailLink: 'mailto:officemgr@iismet.com',
    certifications: 'ISO 9001 • AS9100D • ITAR REGISTERED'
  },
  menuItems: [
    {
      name: 'Services',
      href: '/services',
      children: [
        { name: '5-Axis Machining', href: '/services/5-axis-machining', description: 'Complex geometries with precision' },
        { name: 'Adaptive Machining', href: '/services/adaptive-machining', description: 'Real-time process adjustments' },
        { name: 'Metrology & Inspection', href: '/services/metrology', description: 'Complete dimensional verification' },
        { name: 'Engineering Support', href: '/services/engineering', description: 'Design for manufacturability' }
      ]
    },
    {
      name: 'Industries',
      href: '/industries',
      children: [
        { name: 'Aerospace', href: '/industries/aerospace', description: 'Critical aerospace components' },
        { name: 'Energy & Turbines', href: '/industries/energy', description: 'Power generation solutions' },
        { name: 'Defense', href: '/industries/defense', description: 'ITAR compliant manufacturing' }
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      children: [
        { name: 'Manufacturing Processes', href: '/resources/manufacturing-processes', description: 'CNC machining guides and techniques' },
        { name: 'Material Science', href: '/resources/material-science', description: 'Aerospace alloys and properties' },
        { name: 'Quality & Compliance', href: '/resources/quality-compliance', description: 'AS9100D and ITAR guidance' },
        { name: 'Industry Applications', href: '/resources/industry-applications', description: 'Real-world case studies' },
        { name: 'Calculators & Tools', href: '/resources/calculators-tools', description: 'Interactive calculators' }
      ]
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Careers',
      href: '/careers'
    },
    {
      name: 'Compliance',
      href: '#',
      children: [
        { name: 'Terms & Conditions', href: '/compliance/terms', description: 'Purchase order terms' },
        { name: 'Supplier Requirements', href: '/compliance/supplier-requirements', description: 'Supplier guidelines' }
      ]
    },
    {
      name: 'Contact',
      href: '/contact'
    }
  ],
  cta: {
    text: 'REQUEST QUOTE',
    href: '/contact'
  }
};

async function migrateNavigation() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✓ Connected');

    const db = client.db();

    // Check if navigation global already exists
    const existing = await db.collection('globals').findOne({ globalType: 'navigation' });

    if (existing) {
      console.log('⚠️  Navigation global already exists, updating...');
      await db.collection('globals').updateOne(
        { globalType: 'navigation' },
        { $set: navigationData }
      );
      console.log('✓ Navigation global updated');
    } else {
      console.log('📝 Creating navigation global...');
      await db.collection('globals').insertOne({
        globalType: 'navigation',
        ...navigationData
      });
      console.log('✓ Navigation global created');
    }

    console.log('\n✅ Navigation migration complete!');
    console.log('\nYou can now edit navigation content at: http://localhost:3000/admin/globals/navigation');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateNavigation();
