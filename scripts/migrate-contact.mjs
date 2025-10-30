import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const contactData = {
  globalType: 'contact',
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=80',
    imageAlt: 'Contact our precision manufacturing team',
    badge: 'GET STARTED',
    badgeIconName: 'Activity',
    title: 'Contact',
    titleHighlight: 'Our Team',
    description: 'Connect with Integrated Inspection Systems for precision manufacturing solutions, technical consultations, and project quotes.',
    buttonLabel: 'Start Your Project',
    buttonHref: '#contact-form'
  },
  contactInfo: {
    heading: 'Get in Touch',
    description: 'Our engineering team is ready to discuss your precision manufacturing needs.',
    addressLine1: 'Integrated Inspection Systems, Inc.',
    addressLine2: '12345 Precision Way',
    addressLine3: 'Torrance, CA 90501',
    phone: '(503) 231-9093',
    phoneLink: 'tel:+15032319093',
    email: 'officemgr@iismet.com',
    hoursLine1: 'Monday - Friday: 7:00 AM - 5:00 PM PST',
    hoursLine2: '24/7 Production Facility'
  },
  certifications: [
    { certification: 'AS9100D' },
    { certification: 'ISO 9001:2015' },
    { certification: 'ITAR Registered' },
    { certification: 'CMMC Compliant' }
  ],
  bottomStats: [
    { iconName: 'pulse', text: 'Quote Response in 24 Hours', animated: true },
    { iconName: 'Award', text: '30+ Years | 1000+ Projects', animated: false },
    { iconName: 'Shield', text: '99.8% First-Pass Yield', animated: false },
    { iconName: 'CheckCircle', text: 'AS9100D | ITAR Certified', animated: false }
  ]
};

async function migrateContact() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const globalsCollection = db.collection('globals');

    const existingContact = await globalsCollection.findOne({ globalType: 'contact' });

    if (existingContact) {
      const result = await globalsCollection.updateOne(
        { globalType: 'contact' },
        { $set: contactData }
      );
      console.log('✓ Updated existing contact global');
      console.log(`  Modified ${result.modifiedCount} document`);
    } else {
      const result = await globalsCollection.insertOne(contactData);
      console.log('✓ Inserted new contact global');
      console.log(`  Inserted ID: ${result.insertedId}`);
    }

    console.log('\n✅ Contact page migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateContact();
