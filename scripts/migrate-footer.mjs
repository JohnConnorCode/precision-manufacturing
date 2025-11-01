import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

const footerData = {
  company: {
    description: 'Precision manufacturing and metrology solutions for aerospace, defense, and advanced industries.',
    foundedYear: '1995',
    certifications: 'ISO 9001:2015 • AS9100D • ITAR Registered'
  },
  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#'
  },
  servicesLinks: [
    { label: 'Machining', href: '/services' },
    { label: 'Inspection', href: '/services' },
    { label: 'Fixture Design', href: '/services' },
    { label: 'Metrology', href: '/services' },
    { label: 'Metbase®', href: '/services' }
  ],
  resourcesLinks: [
    { label: 'All Resources', href: '/resources' },
    { label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
    { label: 'Quality & Compliance', href: '/resources/quality-compliance' },
    { label: 'Material Science', href: '/resources/material-science' }
  ],
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Industries', href: '/industries' },
    { label: 'Terms & Conditions', href: '/compliance/terms' },
    { label: 'Supplier Requirements', href: '/compliance/supplier-requirements' },
    { label: 'Contact', href: '/contact' }
  ],
  contact: {
    email: 'officemgr@iismet.com',
    phone: '+1 (503) 231-9093',
    phoneLink: 'tel:+15032319093',
    address: '14310 SE Industrial Way\nClackamas, OR 97015\nUnited States'
  },
  copyright: '© {year} Integrated Inspection Systems, Inc. All rights reserved.'
};

async function migrateFooter() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✓ Connected');

    const db = client.db();

    // Check if footer global already exists
    const existing = await db.collection('globals').findOne({ globalType: 'footer' });

    if (existing) {
      console.log('⚠️  Footer global already exists, updating...');
      await db.collection('globals').updateOne(
        { globalType: 'footer' },
        { $set: footerData }
      );
      console.log('✓ Footer global updated');
    } else {
      console.log('📝 Creating footer global...');
      await db.collection('globals').insertOne({
        globalType: 'footer',
        ...footerData
      });
      console.log('✓ Footer global created');
    }

    console.log('\n✅ Footer migration complete!');
    console.log('\nYou can now edit footer content at: http://localhost:3000/admin/globals/footer');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateFooter();
