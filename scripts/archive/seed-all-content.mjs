import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function seedAllContent() {
  console.log('🚀 Starting comprehensive content seeding...\n');
  console.log('⏳ Connecting to MongoDB (this may take 10-15 seconds)...\n');
  const client = await MongoClient.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000
  });
  const db = client.db();

  // 1. NAVIGATION
  console.log('📍 Seeding Navigation...');
  const navigation = {
    topBar: {
      phone: '503-231-9093',
      email: 'officemgr@iismet.com',
      certifications: 'ISO 9001 • AS9100D • ITAR REGISTERED'
    },
    mainMenu: [
      {
        label: 'Services',
        href: '/services',
        children: [
          { label: '5-Axis Machining', href: '/services/5-axis-machining' },
          { label: 'Adaptive Machining', href: '/services/adaptive-machining' },
          { label: 'Metrology', href: '/services/metrology' },
          { label: 'Engineering', href: '/services/engineering' }
        ]
      },
      {
        label: 'Industries',
        href: '/industries',
        children: [
          { label: 'Aerospace', href: '/industries/aerospace' },
          { label: 'Defense', href: '/industries/defense' },
          { label: 'Energy', href: '/industries/energy' }
        ]
      },
      {
        label: 'Resources',
        href: '/resources',
        children: [
          { label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
          { label: 'Material Science', href: '/resources/material-science' },
          { label: 'Quality & Compliance', href: '/resources/quality-compliance' },
          { label: 'Industry Applications', href: '/resources/industry-applications' },
          { label: 'Calculators & Tools', href: '/resources/calculators-tools' }
        ]
      },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      {
        label: 'Compliance',
        href: '#',
        children: [
          { label: 'Terms & Conditions', href: '/compliance/terms' },
          { label: 'Supplier Requirements', href: '/compliance/supplier-requirements' }
        ]
      },
      { label: 'Contact', href: '/contact' }
    ],
    ctaButton: {
      text: 'REQUEST QUOTE',
      href: '/contact'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('navigation').deleteMany({});
  await db.collection('navigation').insertOne(navigation);
  console.log('✅ Navigation seeded\n');

  // 2. FOOTER
  console.log('📍 Seeding Footer...');
  const footer = {
    companyInfo: {
      description: 'Precision manufacturing excellence since 1995, delivering advanced machining and engineering solutions.',
      founded: '1995',
      certifications: 'ISO 9001:2015 • AS9100D • ITAR Registered'
    },
    socialLinks: [
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Twitter', url: '#' },
      { platform: 'Facebook', url: '#' }
    ],
    servicesLinks: [
      { label: 'CNC Machining Services', href: '/services/5-axis-machining' },
      { label: 'Inspection & Metrology', href: '/services/metrology' },
      { label: 'Fixture Design', href: '/services/engineering' },
      { label: 'Metrology Services', href: '/services/metrology' },
      { label: 'Metbase®', href: '/services/adaptive-machining' }
    ],
    resourcesLinks: [
      { label: 'All Resources', href: '/resources' },
      { label: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
      { label: 'Quality & Compliance', href: '/resources/quality-compliance' },
      { label: 'Material Science', href: '/resources/material-science' }
    ],
    quickLinks: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Industries', href: '/industries' },
      { label: 'Terms & Conditions', href: '/compliance/terms' },
      { label: 'Supplier Requirements', href: '/compliance/supplier-requirements' },
      { label: 'Contact', href: '/contact' }
    ],
    contactInfo: {
      email: 'officemgr@iismet.com',
      phone: '+1 (503) 231-9093',
      address: '14310 SE Industrial Way, Clackamas, OR 97015, United States'
    },
    copyright: '© 2025 Integrated Inspection Systems, Inc. All rights reserved.',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('footer').deleteMany({});
  await db.collection('footer').insertOne(footer);
  console.log('✅ Footer seeded\n');

  // 3. ABOUT PAGE
  console.log('📍 Seeding About Page...');
  const aboutPage = {
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=90',
      badge: 'PRECISION MANUFACTURING SINCE 1995',
      title: 'About Our Company',
      description: 'Integrated Inspection Systems is a leading precision manufacturing company specializing in aerospace, defense, and high-tech industries. With nearly three decades of experience, we deliver exceptional quality and innovation in every component we produce.'
    },
    stats: [
      { label: 'Years in Business', value: '30+' },
      { label: 'Team Members', value: '150+' },
      { label: 'Annual Revenue', value: '$25M+' },
      { label: 'Facility Size', value: '45,000 sq ft' }
    ],
    story: {
      title: 'Our Story',
      content: [
        'Integrated Inspection Systems (IIS) was founded in 1995 with a vision to revolutionize precision manufacturing through innovative metrology and machining solutions. What began as a small operation focused on dimensional inspection has evolved into a comprehensive manufacturing powerhouse.',
        'Throughout our journey, we\'ve remained committed to our core values of quality, precision, and customer satisfaction. Our growth from a startup to a recognized leader in aerospace and defense manufacturing reflects our dedication to continuous improvement and technological advancement.',
        'Today, IIS operates from a state-of-the-art 45,000 square foot facility in Clackamas, Oregon, equipped with the latest CNC machining centers, coordinate measuring machines, and proprietary MetBase® software. We serve leading aerospace, defense, and energy companies worldwide.'
      ],
      image: '/about IIS.jpg'
    },
    timeline: [
      { year: '1995', title: 'IIS Founded', description: 'Integrated Inspection Systems established' },
      { year: '1998', title: 'First CMM Purchased', description: 'Expanded into precision metrology' },
      { year: '1999-2001', title: 'MetBase Software Development', description: 'Developed proprietary inspection software' },
      { year: '2001', title: 'Aerospace Transition', description: 'Shifted focus to aerospace manufacturing' },
      { year: '2001-2008', title: '4-Sigma System Development', description: 'Implemented advanced quality systems' },
      { year: 'Present', title: 'Industry Leader', description: 'Leading provider of precision manufacturing solutions' }
    ],
    values: [
      {
        title: 'Quality Excellence',
        description: 'Uncompromising commitment to quality',
        principles: [
          'Zero defect mindset',
          'Continuous improvement',
          'Statistical process control',
          'Full traceability'
        ]
      },
      {
        title: 'Innovation Leadership',
        description: 'Pioneering advanced manufacturing solutions',
        principles: [
          'Technology adoption',
          'Process optimization',
          'Custom solutions',
          'R&D investment'
        ]
      },
      {
        title: 'Reliability & Trust',
        description: 'Building lasting partnerships',
        principles: [
          'On-time delivery',
          'Transparent communication',
          'Consistent performance',
          'Long-term relationships'
        ]
      },
      {
        title: 'Team Excellence',
        description: 'Empowering our people',
        principles: [
          'Continuous training',
          'Safety first culture',
          'Career development',
          'Collaborative environment'
        ]
      }
    ],
    leadership: [
      {
        name: 'John Smith',
        title: 'Chief Executive Officer',
        experience: '25+ years',
        background: 'Former Boeing executive with extensive aerospace manufacturing experience',
        focus: 'Strategic vision and customer relationships'
      },
      {
        name: 'Sarah Johnson',
        title: 'Chief Operating Officer',
        experience: '20+ years',
        background: 'Operations excellence leader with Six Sigma Black Belt certification',
        focus: 'Process optimization and quality systems'
      },
      {
        name: 'Mike Chen',
        title: 'Chief Technology Officer',
        experience: '18+ years',
        background: 'Engineering leader specializing in advanced manufacturing technologies',
        focus: 'Technology innovation and R&D'
      },
      {
        name: 'Lisa Martinez',
        title: 'Quality Director',
        experience: '15+ years',
        background: 'Quality assurance expert with AS9100 auditor certification',
        focus: 'Quality management and regulatory compliance'
      }
    ],
    capabilities: {
      manufacturing: ['5-Axis CNC Machining', 'Adaptive Machining', 'Precision Grinding', 'EDM Services'],
      engineering: ['Design for Manufacturing', 'Process Development', 'Fixture Design', 'CAD/CAM Programming'],
      quality: ['CMM Inspection', 'First Article Inspection', 'Statistical Process Control', 'Metrology Services'],
      industries: ['Aerospace', 'Defense', 'Energy', 'Medical Devices']
    },
    certifications: [
      { name: 'AS9100D', description: 'Aerospace Quality Management' },
      { name: 'ISO 9001:2015', description: 'Quality Management System' },
      { name: 'ITAR', description: 'International Traffic in Arms Regulations' },
      { name: 'CMMC', description: 'Cybersecurity Maturity Model Certification' },
      { name: 'OSHA', description: 'Occupational Safety and Health' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('about').deleteMany({});
  await db.collection('about').insertOne(aboutPage);
  console.log('✅ About Page seeded\n');

  // 4. CONTACT PAGE
  console.log('📍 Seeding Contact Page...');
  const contactPage = {
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90',
      badge: 'GET IN TOUCH',
      title: 'Contact Us',
      description: 'Ready to discuss your precision manufacturing needs? Our team of experts is here to help bring your projects to life.'
    },
    contactInfo: {
      heading: 'Let\'s Build Something Great Together',
      description: 'Whether you need a quote, have technical questions, or want to discuss your project requirements, we\'re here to help.',
      address: {
        line1: '14310 SE Industrial Way',
        line2: 'Clackamas, OR 97015',
        line3: 'United States'
      },
      phone: '(503) 231-9093',
      email: 'officemgr@iismet.com',
      hours: {
        weekdays: 'Monday - Friday: 7:00 AM - 5:00 PM PST',
        weekend: 'Saturday - Sunday: Closed'
      }
    },
    certifications: ['AS9100D', 'ISO 9001:2015', 'ITAR Registered', 'CMMC Compliant'],
    formFields: {
      name: { label: 'Full Name', placeholder: 'John Smith', required: true },
      email: { label: 'Email', placeholder: 'john@company.com', required: true },
      phone: { label: 'Phone', placeholder: '(555) 123-4567' },
      company: { label: 'Company', placeholder: 'Your Company Name' },
      service: {
        label: 'Service Interest',
        options: ['5-Axis Machining', 'Adaptive Machining', 'Metrology', 'Engineering', 'Other']
      },
      industry: {
        label: 'Industry',
        options: ['Aerospace', 'Defense', 'Energy', 'Medical', 'Other']
      },
      message: { label: 'Message', placeholder: 'Tell us about your project...' },
      file: { label: 'Attach Files', accepts: '.pdf,.step,.stp,.iges,.igs,.dwg,.dxf' }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('contact').deleteMany({});
  await db.collection('contact').insertOne(contactPage);
  console.log('✅ Contact Page seeded\n');

  // 5. CAREERS PAGE
  console.log('📍 Seeding Careers Page...');
  const careersPage = {
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=90',
      badge: 'JOIN OUR TEAM',
      title: 'Careers at IIS',
      description: 'Build your career with a leader in precision manufacturing. We offer challenging projects, continuous learning, and a culture that values innovation and excellence.'
    },
    whyWorkHere: [
      'Cutting-edge technology and equipment',
      'Continuous training and development',
      'Competitive compensation and benefits',
      'Collaborative team environment',
      'Work on exciting aerospace and defense projects',
      'Career growth opportunities'
    ],
    benefits: [
      { category: 'Health & Wellness', items: ['Medical Insurance', 'Dental Insurance', 'Vision Insurance', 'Life Insurance'] },
      { category: 'Financial', items: ['401(k) with Match', 'Profit Sharing', 'Competitive Salaries', 'Performance Bonuses'] },
      { category: 'Work-Life Balance', items: ['Paid Time Off', 'Holidays', 'Flexible Schedules', 'Professional Development'] }
    ],
    values: [
      { name: 'Safety First', description: 'Zero-accident workplace culture' },
      { name: 'Quality Excellence', description: 'Pride in precision and accuracy' },
      { name: 'Team Collaboration', description: 'Success through teamwork' },
      { name: 'Continuous Learning', description: 'Always improving and innovating' }
    ],
    openPositions: [
      {
        title: 'CNC Machinist',
        location: 'Clackamas, OR',
        type: 'Full-time',
        description: 'Experienced CNC machinist for aerospace components'
      },
      {
        title: 'Quality Inspector',
        location: 'Clackamas, OR',
        type: 'Full-time',
        description: 'CMM programmer and quality assurance specialist'
      },
      {
        title: 'Manufacturing Engineer',
        location: 'Clackamas, OR',
        type: 'Full-time',
        description: 'Process development and optimization engineer'
      },
      {
        title: 'CAD/CAM Programmer',
        location: 'Clackamas, OR',
        type: 'Full-time',
        description: 'Programming specialist for multi-axis machining'
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('careers').deleteMany({});
  await db.collection('careers').insertOne(careersPage);
  console.log('✅ Careers Page seeded\n');

  // 6. HOMEPAGE CONTENT (Update page-content collection)
  console.log('📍 Seeding Homepage Content...');
  const homepageContent = {
    pageName: 'homepage',
    hero: {
      tagline: 'Innovative Precision Machining & Manufacturing Excellence Since 1995',
      badges: [
        'Advanced CNC Machining',
        'Precision Metrology',
        'Engineering Excellence',
        '3 Sigma Yield'
      ],
      images: [
        { url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7', focalPoint: { x: 60, y: 45 } },
        { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837', focalPoint: { x: 55, y: 50 } },
        { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', focalPoint: { x: 40, y: 50 } },
        { url: 'https://images.unsplash.com/photo-1609021908661-66fbc8517d63', focalPoint: { x: 50, y: 45 } },
        { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1', focalPoint: { x: 45, y: 50 } }
      ],
      buttons: [
        { label: 'Get Quote', href: '/contact', variant: 'primary' },
        { label: 'View Capabilities', href: '/services', variant: 'secondary' }
      ]
    },
    stats: [
      { value: '30+', label: 'Years Experience' },
      { value: '99.97%', label: 'On-Time Delivery' },
      { value: '±0.0001"', label: 'Min Tolerance' },
      { value: '500+', label: 'Active Clients' }
    ],
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
    cta: {
      badge: '30 Years of Aerospace Excellence',
      title: 'Start Your Precision Manufacturing Project',
      description: 'From prototype to production, we deliver precision components that meet the most demanding specifications.',
      buttons: [
        { label: 'Get Quote', href: '/contact', variant: 'primary' },
        { label: 'Technical Specifications', href: '/services', variant: 'secondary' }
      ],
      certifications: ['24/7 Production', 'ITAR Registered', 'AS9100D'],
      footer: 'Trusted by leading aerospace & defense contractors worldwide'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('page-content').updateOne(
    { pageName: 'homepage' },
    { $set: homepageContent },
    { upsert: true }
  );
  console.log('✅ Homepage Content seeded\n');

  // 7. INDUSTRIES PAGE CONTENT
  console.log('📍 Seeding Industries Page Content...');
  const industriesPageContent = {
    pageName: 'industries',
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2400&q=90',
      title: 'Industries We Serve',
      description: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.',
      buttons: [
        { label: 'Explore Industries', href: '#industries', variant: 'primary' },
        { label: 'Industry Consultation', href: '/contact', variant: 'secondary' }
      ]
    },
    sectionIntro: {
      title: 'Industry Expertise',
      description: 'Specialized manufacturing solutions tailored to meet the unique demands of highly regulated industries.'
    },
    bottomCta: {
      title: 'Partner with Industry Experts',
      description: 'Leverage our decades of experience and industry-specific knowledge for your next project.',
      buttons: [
        { label: 'Schedule Consultation', href: '/contact', variant: 'primary' },
        { label: 'View Our Services', href: '/services', variant: 'secondary' }
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.collection('page-content').updateOne(
    { pageName: 'industries' },
    { $set: industriesPageContent },
    { upsert: true }
  );
  console.log('✅ Industries Page Content seeded\n');

  await client.close();
  console.log('🎉 All content successfully seeded!');
  console.log('\n📊 Summary:');
  console.log('- Navigation: Menu structure, top bar, CTA');
  console.log('- Footer: Links, contact info, social media');
  console.log('- About Page: Story, timeline, team, values, capabilities');
  console.log('- Contact Page: Office info, hours, form fields');
  console.log('- Careers Page: Benefits, values, open positions');
  console.log('- Homepage: Hero, stats, CTAs');
  console.log('- Industries Page: Hero, section intros, CTAs');
  console.log('\nAll content is now in the database and ready for CMS management!');
}

seedAllContent().catch(console.error);