import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const careersData = {
  globalType: 'careers',
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Careers at Integrated Inspection Systems - Join our team',
    badge: 'CAREERS',
    badgeIconName: 'Users',
    title: 'Join Our',
    titleHighlight: 'Team',
    description: 'Build your career with a leader in precision manufacturing. We\'re looking for talented individuals who share our commitment to excellence, innovation, and quality.',
    buttons: [
      { label: 'Explore Opportunities', href: '#opportunities', variant: 'primary' },
      { label: 'Contact HR', href: '/contact?interest=career', variant: 'secondary' }
    ]
  },
  whyWorkHere: {
    heading: 'Why Work at IIS?',
    paragraph1: 'Since 1995, Integrated Inspection Systems has been a trusted leader in precision manufacturing for aerospace, defense, and advanced industries. We\'re proud of our 30-year legacy of quality, innovation, and team excellence.',
    paragraph2: 'Our team of 150+ skilled professionals works in a state-of-the-art facility using cutting-edge technology including 5-axis CNC machining, adaptive manufacturing, and advanced metrology. We maintain AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance—standards that reflect our commitment to excellence.',
    paragraph3: 'We\'re looking for engineers, technicians, machinists, and quality professionals who want to make a real impact in precision manufacturing.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=90',
    imageAlt: 'Manufacturing facility and team'
  },
  benefits: {
    heading: 'Benefits & Opportunities',
    description: 'We invest in our team because our people are our greatest asset',
    items: [
      {
        iconName: 'Users',
        title: 'Collaborative Culture',
        description: 'Work with talented engineers and technicians who share your passion for precision manufacturing excellence'
      },
      {
        iconName: 'Award',
        title: 'Professional Development',
        description: 'Access to continuous training, certifications, and opportunities to advance your career in precision manufacturing'
      },
      {
        iconName: 'Heart',
        title: 'Comprehensive Benefits',
        description: 'Competitive health insurance, 401(k) matching, paid time off, and a commitment to work-life balance'
      },
      {
        iconName: 'Briefcase',
        title: 'Industry Leadership',
        description: 'Be part of a company at the forefront of aerospace and defense precision manufacturing technology'
      }
    ]
  },
  values: {
    heading: 'Our Core Values',
    description: 'These principles guide how we work, innovate, and collaborate',
    items: [
      {
        title: 'Excellence',
        description: 'We demand the highest standards in everything we do—from components to customer service'
      },
      {
        title: 'Innovation',
        description: 'We invest in cutting-edge technology and encourage our team to think creatively'
      },
      {
        title: 'Integrity',
        description: 'We operate with transparency and honesty in all our business relationships'
      },
      {
        title: 'Teamwork',
        description: 'Success comes from collaboration and mutual respect across all departments'
      }
    ]
  },
  opportunities: {
    heading: 'Current Opportunities',
    description: 'We\'re growing and actively hiring talented professionals. Don\'t see your ideal position? Let us know—we\'re always interested in exceptional talent.',
    positions: [
      {
        title: 'Manufacturing Engineering',
        description: 'Work on advanced manufacturing processes, 5-axis CNC programming, and process optimization for aerospace components',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      },
      {
        title: 'Quality Engineer',
        description: 'Ensure quality excellence through CMM inspection, GD&T analysis, and first article inspection on aerospace projects',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      },
      {
        title: 'CNC Machinist',
        description: 'Operate and optimize 5-axis CNC machines producing precision aerospace components. Requires AS9100 experience.',
        type: 'Full-time',
        location: 'Clackamas, OR',
        link: '/contact?interest=career'
      }
    ]
  },
  cta: {
    heading: 'Ready to Join IIS?',
    description: 'Whether you see an open position or want to let us know about your interest, we\'d love to hear from you.',
    buttons: [
      { label: 'Contact HR', href: '/contact?interest=career', variant: 'primary' },
      { label: 'Learn About IIS', href: '/about', variant: 'outline' }
    ]
  }
};

async function migrateCareers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const globalsCollection = db.collection('globals');

    const existingCareers = await globalsCollection.findOne({ globalType: 'careers' });

    if (existingCareers) {
      const result = await globalsCollection.updateOne(
        { globalType: 'careers' },
        { $set: careersData }
      );
      console.log('✓ Updated existing careers global');
      console.log(`  Modified ${result.modifiedCount} document`);
    } else {
      const result = await globalsCollection.insertOne(careersData);
      console.log('✓ Inserted new careers global');
      console.log(`  Inserted ID: ${result.insertedId}`);
    }

    console.log('\n✅ Careers page migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateCareers();
