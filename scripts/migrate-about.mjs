import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const aboutData = {
  globalType: 'about',
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    imageAlt: 'Precision manufacturing facility - 30 years of excellence',
    badge: 'PRECISION MANUFACTURING SINCE 1995',
    badgeIconName: 'Factory',
    title: 'About',
    titleHighlight: 'Our Company',
    description: 'From basement startup to industry leader. Three decades of precision manufacturing excellence serving aerospace, defense, and advanced industries with ISO 9001, AS9100, and ITAR certification.',
    buttons: [
      {
        label: 'Our Capabilities',
        href: '#capabilities',
        variant: 'primary'
      },
      {
        label: 'Contact Our Team',
        href: '/contact',
        variant: 'secondary'
      }
    ]
  },
  companyStats: [
    { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
    { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
    { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
    { label: 'Facility Size', value: '45,000', description: 'Square feet' }
  ],
  story: {
    title: 'Our Story',
    paragraph1: 'Integrated Inspection Systems was founded in 1995, starting in a residential basement with a desk, computer, and a pair of calipers. Our founders came from Precision Castparts Inc, bringing aerospace expertise and a commitment to quality. From 1995-1996, we established cash flow through small business networking while developing a comprehensive quality manual. We then leased our first Zeiss CMM from Hanard Machine in Salem, Oregon, and began serving the plastics industry with a focus on precision metrology.',
    paragraph2: 'Our breakthrough came when we applied aerospace GD&T principles to high-volume metrology, a capability few suppliers could match. This led us to purchase our own Zeiss CMM in late 1998 and move to Beaverton, Oregon. We developed proprietary software, MetBase, which revolutionized our ability to integrate CMM data, CNC machines, and vision systems into a closed-loop manufacturing system. By 2001, we had developed a 3-sigma machining system and relocated to our current 20,000 square foot facility in Clackamas, Oregon.',
    paragraph3: 'Today, we\'re an ISO 9001 and AS9100 certified, ITAR-registered provider of engineering, metrology, machining, and database services. Our 3-sigma manufacturing system and proprietary MetBase software enable us to deliver industry-leading precision components for aerospace, defense, and advanced industries.',
    image: '/about IIS.jpg',
    imageAlt: 'IIS manufacturing facility in Clackamas, Oregon - 20,000 square feet with advanced machining and metrology equipment'
  },
  timeline: {
    title: 'Our Journey',
    description: 'Three decades of growth, innovation, and excellence in precision manufacturing.',
    milestones: [
      {
        year: '1995',
        title: 'IIS Founded',
        description: 'Started in a residential basement with founders from Precision Castparts Inc. Initial focus on small business networking and quality manual development.'
      },
      {
        year: '1998',
        title: 'First CMM Purchased',
        description: 'Purchased our own Zeiss CMM and established facility in Beaverton, Oregon. Began high-volume metrology for Hewlett Packard and plastics industry.'
      },
      {
        year: '1999-2001',
        title: 'MetBase Software Development',
        description: 'Developed proprietary MetBase software to integrate CMM data, CNC machines, and vision systems. Established 3-sigma closed-loop manufacturing system.'
      },
      {
        year: '2001',
        title: 'Aerospace Transition',
        description: 'Pivoted to aerospace inspection and machining after dot-com bubble. Relocated to SE Portland 5,000 sq ft facility. Added second Sheffield CMM.'
      },
      {
        year: '2001-2008',
        title: '4-Sigma System Development',
        description: 'Invented 4-sigma targeting system using MetBase on GE, Siemens, and Alstom IGT castings. Expanded to current 20,000 sq ft facility in Clackamas, Oregon.'
      },
      {
        year: 'Present',
        title: 'Industry Leader',
        description: 'ISO 9001 and AS9100 certified, ITAR registered provider of engineering, metrology, machining, and database services for aerospace and defense.'
      }
    ]
  },
  values: {
    title: 'Our Values',
    description: 'The principles that guide our decisions, shape our culture, and drive our commitment to excellence.',
    items: [
      {
        title: 'Quality Excellence',
        description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.',
        iconName: 'Award',
        principles: [
          { principle: 'Zero-defect manufacturing mindset' },
          { principle: 'Continual improvement culture' },
          { principle: 'Customer satisfaction focus' },
          { principle: 'Industry-leading standards' }
        ]
      },
      {
        title: 'Innovation Leadership',
        description: 'Pioneering advanced manufacturing technologies and processes to stay ahead of industry demands.',
        iconName: 'Zap',
        principles: [
          { principle: 'Technology investment' },
          { principle: 'Process optimization' },
          { principle: 'Research & development' },
          { principle: 'Future-ready solutions' }
        ]
      },
      {
        title: 'Reliability & Trust',
        description: 'Building long-term partnerships through consistent performance and transparent communication.',
        iconName: 'Target',
        principles: [
          { principle: 'On-time delivery commitment' },
          { principle: 'Transparent communication' },
          { principle: 'Long-term partnerships' },
          { principle: 'Dependable performance' }
        ]
      },
      {
        title: 'Team Excellence',
        description: 'Investing in our people through training, development, and creating a culture of excellence.',
        iconName: 'Users',
        principles: [
          { principle: 'Skilled workforce development' },
          { principle: 'Safety-first culture' },
          { principle: 'Continual training' },
          { principle: 'Team collaboration' }
        ]
      }
    ]
  },
  leadership: {
    title: 'Leadership Team',
    description: 'Experienced leaders driving innovation, quality, and growth across all aspects of our business.',
    team: [
      {
        name: 'John Anderson',
        title: 'Chief Executive Officer',
        experience: '25+ years',
        background: 'Former aerospace engineer with extensive manufacturing leadership experience',
        focus: 'Strategic vision and operational excellence'
      },
      {
        name: 'Sarah Mitchell',
        title: 'Chief Operating Officer',
        experience: '20+ years',
        background: 'Manufacturing operations expert with lean manufacturing expertise',
        focus: 'Production efficiency and quality systems'
      },
      {
        name: 'David Chen',
        title: 'Chief Technology Officer',
        experience: '18+ years',
        background: 'Advanced manufacturing technology and automation specialist',
        focus: 'Technology innovation and process optimization'
      },
      {
        name: 'Maria Rodriguez',
        title: 'Quality Director',
        experience: '22+ years',
        background: 'Quality management systems and aerospace certification expert',
        focus: 'Quality assurance and regulatory compliance'
      }
    ]
  },
  capabilities: {
    title: 'Core Capabilities',
    categories: [
      {
        category: 'Manufacturing',
        items: [
          { item: '5-axis CNC machining' },
          { item: 'Adaptive manufacturing' },
          { item: 'Precision metrology' },
          { item: 'Surface treatments' }
        ]
      },
      {
        category: 'Engineering',
        items: [
          { item: 'First article inspection' },
          { item: 'Process planning' },
          { item: 'CAD/CAM programming' },
          { item: 'Process development' }
        ]
      },
      {
        category: 'Quality',
        items: [
          { item: 'First article inspection' },
          { item: 'Statistical process control' },
          { item: 'Material traceability' },
          { item: 'Certification support' }
        ]
      },
      {
        category: 'Industries',
        items: [
          { item: 'Aerospace systems' },
          { item: 'Defense platforms' },
          { item: 'Energy infrastructure' },
          { item: 'Medical devices' }
        ]
      }
    ]
  },
  certifications: {
    title: 'Certifications & Standards',
    items: [
      { certification: 'AS9100D Aerospace Quality Management' },
      { certification: 'ISO 9001:2015 Quality Management' },
      { certification: 'ITAR International Traffic in Arms' },
      { certification: 'CMMC Cybersecurity Maturity Model Certification' },
      { certification: 'OSHA Safety Management System' }
    ],
    commitmentTitle: 'Commitment to Excellence',
    commitmentDescription: 'Our certifications represent more than compliance—they reflect our unwavering commitment to quality, safety, and continual improvement in everything we do.'
  },
  cta: {
    title: 'Partner with Us',
    description: 'Experience the difference that three decades of precision manufacturing excellence can make for your critical components.',
    buttons: [
      {
        label: 'Start Your Project',
        href: '/contact',
        variant: 'primary'
      },
      {
        label: 'Explore Our Services',
        href: '/services',
        variant: 'secondary'
      }
    ]
  }
};

async function migrateAbout() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const globalsCollection = db.collection('globals');

    // Check if about global already exists
    const existingAbout = await globalsCollection.findOne({ globalType: 'about' });

    if (existingAbout) {
      // Update existing about global
      const result = await globalsCollection.updateOne(
        { globalType: 'about' },
        { $set: aboutData }
      );
      console.log('✓ Updated existing about global');
      console.log(`  Modified ${result.modifiedCount} document`);
    } else {
      // Insert new about global
      const result = await globalsCollection.insertOne(aboutData);
      console.log('✓ Inserted new about global');
      console.log(`  Inserted ID: ${result.insertedId}`);
    }

    console.log('\n✅ About page migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateAbout();
