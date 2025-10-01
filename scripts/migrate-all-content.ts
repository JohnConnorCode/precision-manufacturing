import { client } from '../sanity/lib/sanity';

// Home Page Content
const homePageData = {
  _type: 'home',
  hero: {
    mainTitle: 'PRECISION',
    subTitle: 'MANUFACTURING',
    tagline: 'Innovative Machining Since 1995',
    badges: [
      'Advanced CNC Machining',
      'Precision Metrology',
      'Engineering Excellence',
      'AS9100D Certified',
      'ITAR Registered'
    ],
    ctaPrimary: {
      text: 'Start Your Project',
      href: '/contact'
    },
    ctaSecondary: {
      text: 'View Capabilities',
      href: '/services'
    },
    backgroundSlides: [
      {
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2400&q=95',
        alt: 'Advanced 5-axis CNC machining center',
        focal: 'center'
      },
      {
        image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=2400&q=95',
        alt: 'Precision metrology and inspection',
        focal: 'center'
      },
      {
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2400&q=95',
        alt: 'Automated manufacturing systems',
        focal: 'center'
      }
    ]
  },
  technicalSpecs: {
    title: 'Technical Specifications',
    subtitle: 'Industry-leading precision and capabilities',
    specs: [
      { label: 'Tolerance', value: '±0.0001"', unit: 'inches' },
      { label: 'Material Range', value: '150+', unit: 'certified materials' },
      { label: 'Machine Capacity', value: '5-axis', unit: 'CNC capability' },
      { label: 'Facility Size', value: '45,000', unit: 'sq ft' }
    ]
  },
  stats: {
    title: 'Industry Leadership',
    subtitle: 'Three decades of manufacturing excellence',
    stats: [
      { value: '30+', label: 'Years Experience', description: 'Serving critical industries', icon: 'Calendar' },
      { value: '150+', label: 'Team Members', description: 'Skilled professionals', icon: 'Users' },
      { value: '99.8%', label: 'Quality Rate', description: 'Zero defect commitment', icon: 'Award' },
      { value: '24/7', label: 'Production', description: 'Continuous operations', icon: 'Clock' }
    ]
  },
  cta: {
    title: 'Ready to Start Your Next Project?',
    subtitle: 'Partner with us for precision manufacturing solutions that exceed expectations.',
    buttons: [
      { text: 'Get Quote', href: '/contact', variant: 'primary' },
      { text: 'View Services', href: '/services', variant: 'secondary' }
    ]
  },
  seo: {
    metaTitle: 'IIS Precision Manufacturing - Advanced CNC Machining Services',
    metaDescription: 'Leading precision manufacturing services for aerospace, defense, and energy industries. AS9100D certified with ITAR registration and 30+ years of experience.',
    keywords: [
      'precision manufacturing',
      'CNC machining',
      'aerospace manufacturing',
      'defense manufacturing',
      'AS9100D certified',
      'ITAR registered'
    ]
  }
};

// About Page Content
const aboutPageData = {
  _type: 'about',
  hero: {
    title: 'About Our Company',
    subtitle: 'Three decades of precision manufacturing excellence, serving aerospace, defense, and energy industries with unwavering commitment to quality and innovation.',
    badgeText: 'PRECISION MANUFACTURING SINCE 1993',
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    imageAlt: 'Precision manufacturing facility - 30 years of excellence',
    buttons: [
      { label: 'Our Capabilities', href: '#capabilities', variant: 'primary' },
      { label: 'Contact Our Team', href: '/contact', variant: 'secondary' }
    ]
  },
  companyStats: [
    { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
    { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
    { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
    { label: 'Facility Size', value: '45,000', description: 'Square feet' }
  ],
  companyStory: {
    title: 'Our Story',
    content: [
      {
        _type: 'block',
        _key: 'story1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'story1span',
            text: 'Founded in 1993, we began as a small precision machining shop with a vision to become the most trusted manufacturer of critical aerospace components. What started with a handful of employees and basic CNC equipment has grown into a state-of-the-art facility serving the most demanding industries.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'story2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'story2span',
            text: 'Our journey has been marked by continuous investment in technology, people, and processes. We\'ve built our reputation on delivering zero-defect components while maintaining the personal service and attention to detail that our customers value.'
          }
        ]
      }
    ],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    imageAlt: 'Manufacturing facility'
  },
  timeline: {
    title: 'Our Journey',
    subtitle: 'Three decades of growth, innovation, and excellence in precision manufacturing.',
    timelineItems: [
      {
        year: '1993',
        title: 'Company Founded',
        description: 'Started as a small precision machining shop focusing on aerospace components'
      },
      {
        year: '1998',
        title: 'AS9100 Certification',
        description: 'Achieved aerospace quality certification and expanded defense contracts'
      },
      {
        year: '2005',
        title: 'Facility Expansion',
        description: 'Doubled facility size and added 5-axis CNC machining capabilities'
      },
      {
        year: '2012',
        title: 'ITAR Registration',
        description: 'Secured ITAR registration for defense manufacturing programs'
      },
      {
        year: '2018',
        title: 'Technology Innovation',
        description: 'Implemented adaptive machining and Industry 4.0 technologies'
      },
      {
        year: '2023',
        title: 'Sustainability Initiative',
        description: 'Launched comprehensive environmental sustainability program'
      }
    ]
  },
  seo: {
    metaTitle: 'About IIS Precision Manufacturing - 30 Years of Excellence',
    metaDescription: 'Learn about our 30-year journey in precision manufacturing, serving aerospace, defense, and energy industries with AS9100D certification and ITAR registration.',
    keywords: ['precision manufacturing history', 'aerospace manufacturer', 'AS9100D certified', 'ITAR registered', 'manufacturing excellence']
  }
};

// Services Page Content
const servicesPageData = {
  _type: 'servicesPage',
  hero: {
    title: 'Our Services',
    subtitle: 'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.',
    badgeText: 'PRECISION MANUFACTURING SERVICES',
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Advanced manufacturing services - precision CNC machining and quality control',
    buttons: [
      { label: 'Request Quote', href: '/contact', variant: 'primary' },
      { label: 'View Capabilities', href: '#capabilities', variant: 'secondary' }
    ]
  },
  capabilities: [
    { label: 'Materials Certified', value: '150+', description: 'Aerospace & defense grade materials' },
    { label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed dimensional accuracy' },
    { label: 'Production Capacity', value: '24/7', description: 'Continuous manufacturing capability' },
    { label: 'Quality System', value: 'AS9100D', description: 'Full aerospace certification' }
  ],
  servicesSection: {
    title: 'Manufacturing Capabilities',
    subtitle: 'Comprehensive precision manufacturing services backed by advanced technology and industry certifications.',
    services: [
      {
        title: '5-Axis CNC Machining',
        description: 'Complex geometries and tight tolerances with state-of-the-art 5-axis CNC capabilities.',
        icon: 'Cog',
        href: '/services/5-axis-machining',
        features: ['±0.0001" Precision', 'Complex Geometries', 'Titanium & Inconel', 'Aerospace Grade'],
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Adaptive Machining',
        description: 'Intelligent manufacturing with real-time adjustments and adaptive control systems.',
        icon: 'Cpu',
        href: '/services/adaptive-machining',
        features: ['Real-time Monitoring', 'Intelligent Control', 'Quality Assurance', 'Process Optimization'],
        image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1600&q=90'
      },
      {
        title: 'Precision Metrology',
        description: 'Advanced measurement and inspection services ensuring component accuracy.',
        icon: 'Target',
        href: '/services/metrology',
        features: ['CMM Inspection', 'Laser Scanning', 'Dimensional Analysis', 'First Article'],
        image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90'
      }
    ]
  },
  seo: {
    metaTitle: 'Precision Manufacturing Services - CNC Machining & Quality Control',
    metaDescription: 'Advanced precision manufacturing services including 5-axis CNC machining, adaptive manufacturing, and precision metrology. AS9100D certified with ITAR registration.',
    keywords: ['precision manufacturing services', '5-axis CNC machining', 'adaptive machining', 'precision metrology', 'AS9100D certified']
  }
};

// Industries Page Content
const industriesPageData = {
  _type: 'industriesPage',
  hero: {
    title: 'Industries We Serve',
    subtitle: 'Precision manufacturing solutions for the most demanding sectors, backed by industry certifications and decades of specialized experience.',
    badgeText: 'INDUSTRY EXPERTISE',
    backgroundImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Advanced manufacturing for multiple industries',
    buttons: [
      { label: 'Discuss Your Project', href: '/contact', variant: 'primary' },
      { label: 'View Capabilities', href: '#capabilities', variant: 'secondary' }
    ]
  },
  seo: {
    metaTitle: 'Industries Served - Aerospace, Defense, Energy Manufacturing',
    metaDescription: 'Precision manufacturing for aerospace, defense, energy, and industrial sectors. AS9100D certified with ITAR registration and specialized industry expertise.',
    keywords: ['aerospace manufacturing', 'defense manufacturing', 'energy sector manufacturing', 'industrial manufacturing', 'precision components']
  }
};

// Contact Page Content
const contactPageData = {
  _type: 'contact',
  hero: {
    title: 'Contact Us',
    subtitle: 'Ready to discuss your precision manufacturing needs? Our team of experts is here to help you achieve your project goals.',
    badgeText: 'GET IN TOUCH',
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90',
    imageAlt: 'Contact our precision manufacturing experts'
  },
  contactInfo: {
    title: 'Get in Touch',
    subtitle: 'Multiple ways to reach our precision manufacturing experts',
    offices: [
      {
        title: 'Corporate Headquarters',
        address: '123 Manufacturing Drive\nPrecision City, PC 12345\nUnited States',
        phone: '+1 (555) 123-4567',
        email: 'info@iisprecision.com',
        hours: 'Monday - Friday: 7:00 AM - 6:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: Closed',
        isPrimary: true
      }
    ]
  },
  seo: {
    metaTitle: 'Contact IIS Precision Manufacturing - Get Quote Today',
    metaDescription: 'Contact our precision manufacturing experts for quotes and project discussions. AS9100D certified with ITAR registration. Call (555) 123-4567 or email today.',
    keywords: ['contact precision manufacturing', 'manufacturing quote', 'aerospace manufacturing contact', 'precision machining inquiry']
  }
};

async function migrateAllContent() {
  try {
    console.log('Starting content migration to Sanity...');

    // Create Home Page
    console.log('Creating Home page...');
    const homeResult = await client.create(homePageData);
    console.log('✅ Home page created:', homeResult._id);

    // Create About Page
    console.log('Creating About page...');
    const aboutResult = await client.create(aboutPageData);
    console.log('✅ About page created:', aboutResult._id);

    // Create Services Page
    console.log('Creating Services page...');
    const servicesResult = await client.create(servicesPageData);
    console.log('✅ Services page created:', servicesResult._id);

    // Create Industries Page
    console.log('Creating Industries page...');
    const industriesResult = await client.create(industriesPageData);
    console.log('✅ Industries page created:', industriesResult._id);

    // Create Contact Page
    console.log('Creating Contact page...');
    const contactResult = await client.create(contactPageData);
    console.log('✅ Contact page created:', contactResult._id);

    console.log('🎉 All content migration completed successfully!');
    console.log('📝 Summary:');
    console.log(`   - Home Page: ${homeResult._id}`);
    console.log(`   - About Page: ${aboutResult._id}`);
    console.log(`   - Services Page: ${servicesResult._id}`);
    console.log(`   - Industries Page: ${industriesResult._id}`);
    console.log(`   - Contact Page: ${contactResult._id}`);

  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  }
}

// Run the migration
if (require.main === module) {
  migrateAllContent()
    .then(() => {
      console.log('Migration script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

export { migrateAllContent };