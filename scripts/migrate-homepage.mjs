import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

const homepageData = {
  hero: {
    mainTitle: 'PRECISION MANUFACTURING',
    subTitle: 'SERVICES',
    tagline: 'Innovative Precision Machining & Manufacturing Excellence Since 1995',
    badges: [
      { badge: 'Advanced CNC Machining' },
      { badge: 'Precision Metrology' },
      { badge: 'Engineering Excellence' },
      { badge: '3 Sigma Yield' }
    ],
    ctaPrimary: {
      text: 'Get Quote',
      href: '/contact?interest=quote'
    },
    ctaSecondary: {
      text: 'View Capabilities',
      href: '/services'
    }
  },
  stats: {
    title: 'Operational Excellence',
    subtitle: 'THE NUMBERS SPEAK FOR THEMSELVES',
    stats: [
      { value: '30+', label: 'Years Experience' },
      { value: '99.97%', label: 'On-Time Delivery' },
      { value: '±0.0001"', label: 'Min Tolerance' },
      { value: '500+', label: 'Active Clients' }
    ]
  },
  cta: {
    title: 'Start Your Precision Manufacturing Project',
    subtitle: 'From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.'
  },
  technicalSpecs: {
    title: 'Precision By The Numbers',
    subtitle: 'Industry-leading capabilities backed by decades of aerospace and defense manufacturing expertise'
  },
  imageShowcase: {
    header: {
      eyebrow: 'Manufacturing Excellence',
      title: 'Precision',
      titleHighlight: 'Delivered',
      description: 'From concept to completion, we deliver aerospace-grade components with uncompromising precision'
    },
    showcaseImages: [
      {
        src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
        title: 'Aerospace Components',
        category: 'Turbine Blades',
        href: '/services/5-axis-machining'
      },
      {
        src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
        title: 'Defense Systems',
        category: 'ITAR Certified',
        href: '/services/adaptive-machining'
      },
      {
        src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=90',
        title: 'Precision Metrology',
        category: 'Quality Control',
        href: '/services/metrology'
      }
    ],
    stats: [
      { iconName: 'Award', value: 'AS9100D', label: 'Certified Quality', color: 'text-blue-600' },
      { iconName: 'Shield', value: 'ITAR', label: 'Registered', color: 'text-blue-600' },
      { iconName: 'Clock', value: '24/7', label: 'Production', color: 'text-indigo-600' },
      { iconName: 'Target', value: '±0.0001"', label: 'Tolerance', color: 'text-blue-600' }
    ],
    cta: {
      title: 'Get Started Today',
      description: 'Let\'s discuss how we can deliver precision manufacturing solutions for your needs',
      buttons: [
        { text: 'Request Quote', href: '/contact', variant: 'primary' },
        { text: 'Learn More', href: '/about', variant: 'secondary' }
      ]
    }
  },
  resources: {
    header: {
      badge: 'Technical Resources & Knowledge Base',
      title: 'Master Precision Manufacturing',
      description: 'Comprehensive technical article series covering CMM inspection, FAI procedures, GD&T fundamentals, CNC manufacturing, AS9100 quality management, and MetBase quality systems.'
    },
    featuredSeries: [
      {
        title: 'CMM Inspection Mastery',
        slug: 'cmm-inspection-mastery',
        description: 'Master coordinate measuring machine setup, programming, and measurement strategies for precision inspection.',
        articleCount: 4,
        readTime: '34 min',
        difficulty: 'Intermediate',
        icon: '📐',
        gradient: 'from-blue-600 via-blue-500 to-indigo-600'
      },
      {
        title: 'First Article Inspection Excellence',
        slug: 'first-article-inspection-fai-excellence',
        description: 'Complete AS9102 FAI requirements, documentation, and approval processes for aerospace manufacturing.',
        articleCount: 3,
        readTime: '26 min',
        difficulty: 'Advanced',
        icon: '✓',
        gradient: 'from-blue-600 via-blue-500 to-indigo-600'
      },
      {
        title: 'GD&T Fundamentals',
        slug: 'gdt-fundamentals-and-application',
        description: 'Comprehensive Geometric Dimensioning and Tolerancing training for precision manufacturing applications.',
        articleCount: 4,
        readTime: '35 min',
        difficulty: 'Beginner',
        icon: '⊕',
        gradient: 'from-blue-600 via-blue-500 to-indigo-600'
      }
    ],
    cta: {
      title: 'Explore Our Complete Knowledge Base',
      description: 'CNC Manufacturing Precision, AS9100 Quality Management, MetBase Quality Systems, and more.',
      buttons: [
        { text: 'View All Series', href: '/resources/series', variant: 'primary' },
        { text: 'Browse Resources', href: '/resources', variant: 'secondary' }
      ]
    }
  }
};

async function migrateHomepage() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✓ Connected');

    const db = client.db();

    // Check if homepage global already exists
    const existing = await db.collection('globals').findOne({ globalType: 'homepage' });

    if (existing) {
      console.log('⚠️  Homepage global already exists, updating...');
      await db.collection('globals').updateOne(
        { globalType: 'homepage' },
        { $set: homepageData }
      );
      console.log('✓ Homepage global updated');
    } else {
      console.log('📝 Creating homepage global...');
      await db.collection('globals').insertOne({
        globalType: 'homepage',
        ...homepageData
      });
      console.log('✓ Homepage global created');
    }

    console.log('\n✅ Homepage migration complete!');
    console.log('\nYou can now edit homepage content at: http://localhost:3000/admin/globals/homepage');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateHomepage();
