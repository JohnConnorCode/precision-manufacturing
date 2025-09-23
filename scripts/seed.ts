// Seed script for initial Sanity content
// Run with: npx tsx scripts/seed.ts

import 'dotenv/config';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN, // Needs write permissions
  apiVersion: '2025-01-01',
  useCdn: false,
});

async function seedContent() {
  console.log('🌱 Seeding Sanity content...\n');

  // Site Settings
  await client.createIfNotExists({
    _type: 'siteSettings',
    _id: 'site-settings',
    siteName: 'Precision Manufacturing',
    contactInfo: {
      email: 'contact@precisionmfg.com',
      phone: '+1 (555) 123-4567',
      address: '123 Aerospace Blvd\nIndustry City, CA 90210',
    },
    socials: {
      linkedin: 'https://linkedin.com/company/precisionmfg',
      twitter: 'https://twitter.com/precisionmfg',
      facebook: 'https://facebook.com/precisionmfg',
    },
    defaultSEO: {
      title: 'Precision Manufacturing | Aerospace & Defense Supplier',
      description: 'ITAR-compliant precision manufacturing for aerospace, defense, and energy industries.',
    },
  });
  console.log('✅ Site settings created');

  // Home Page
  await client.createIfNotExists({
    _type: 'page',
    _id: 'page-home',
    title: 'Home',
    slug: { current: 'home' },
    hero: {
      headline: 'Precision Engineering for Aerospace Excellence',
      subhead: 'Advanced manufacturing solutions with tolerances to ±0.0001". Trusted by aerospace, defense, and energy leaders.',
      cta: {
        text: 'Request Quote',
        link: '/contact',
      },
    },
    seo: {
      title: 'Precision Manufacturing | Aerospace & Defense Supplier',
      description: 'ITAR-compliant precision manufacturing with 5-axis machining, adaptive manufacturing, and ultra-precision tolerances.',
    },
  });
  console.log('✅ Home page created');

  // About Page
  await client.createIfNotExists({
    _type: 'page',
    _id: 'page-about',
    title: 'About',
    slug: { current: 'about' },
    hero: {
      headline: '25+ Years of Precision Excellence',
      subhead: 'From our state-of-the-art facility, we deliver mission-critical components to the worlds most demanding industries.',
    },
    seo: {
      title: 'About Us | Precision Manufacturing',
      description: 'Learn about our 25+ year history, certifications, and commitment to aerospace manufacturing excellence.',
    },
  });
  console.log('✅ About page created');

  // Services
  const services = [
    {
      _id: 'service-5-axis',
      title: '5-Axis Machining',
      slug: { current: '5-axis-machining' },
      intro: 'Complex geometries with unmatched precision. Simultaneous multi-axis control for aerospace components.',
      icon: 'Cog',
      capabilities: [
        { title: 'Complex Geometries', description: 'Intricate parts in single setup' },
        { title: 'Tight Tolerances', description: '±0.0001" achievable' },
        { title: 'Large Parts', description: 'Up to 60" envelope' },
      ],
      specHighlights: [
        { spec: 'Tolerance', value: '±0.0001"' },
        { spec: 'Max Part Size', value: '60" x 40" x 30"' },
        { spec: 'Materials', value: 'Titanium, Inconel, Aluminum' },
      ],
    },
    {
      _id: 'service-adaptive',
      title: 'Adaptive Machining',
      slug: { current: 'adaptive-machining' },
      intro: 'Real-time adjustments based on in-process measurements. Ensuring consistency across production runs.',
      icon: 'Cpu',
      capabilities: [
        { title: 'In-Process Verification', description: 'Real-time measurement and adjustment' },
        { title: 'Automated Compensation', description: 'Tool wear and thermal compensation' },
        { title: 'Zero Defects', description: 'Closed-loop quality control' },
      ],
      specHighlights: [
        { spec: 'Measurement Accuracy', value: '0.00005"' },
        { spec: 'Cycle Time Reduction', value: 'Up to 40%' },
        { spec: 'First Pass Yield', value: '99.97%' },
      ],
    },
    {
      _id: 'service-metrology',
      title: 'Metrology & Inspection',
      slug: { current: 'metrology' },
      intro: 'Complete dimensional verification with CMM and laser scanning. AS9102 first article inspection.',
      icon: 'Gauge',
      capabilities: [
        { title: 'CMM Programming', description: 'Automated inspection routines' },
        { title: 'First Article', description: 'AS9102 compliant FAI' },
        { title: 'GD&T Analysis', description: 'Complete geometric verification' },
      ],
      specHighlights: [
        { spec: 'CMM Accuracy', value: '0.00005"' },
        { spec: 'Scanning Speed', value: '500,000 pts/sec' },
        { spec: 'Reporting', value: 'AS9102, PPAP, custom' },
      ],
    },
  ];

  for (const service of services) {
    await client.createIfNotExists({
      _type: 'service',
      ...service,
    });
    console.log(`✅ Service created: ${service.title}`);
  }

  // Industries
  const industries = [
    {
      _id: 'industry-aerospace',
      title: 'Aerospace',
      slug: { current: 'aerospace' },
      problem: 'Aerospace components demand absolute precision, with zero tolerance for failure in extreme conditions.',
      solution: 'We deliver AS9100D certified manufacturing with documented processes, full traceability, and rigorous quality control.',
      tolerances: {
        standard: '±0.005"',
        precision: '±0.001"',
        ultra: '±0.0001"',
      },
      certifications: ['AS9100D', 'NADCAP', 'FAA Repair Station', 'Boeing D1-9000'],
    },
    {
      _id: 'industry-energy',
      title: 'Energy & Turbines',
      slug: { current: 'energy' },
      problem: 'Power generation requires components that withstand extreme temperatures and pressures for decades.',
      solution: 'Specialized in superalloy machining with advanced cooling strategies and surface finish optimization.',
      tolerances: {
        standard: '±0.010"',
        precision: '±0.002"',
        ultra: '±0.0005"',
      },
      certifications: ['ISO 9001:2015', 'API Q1', 'ASME NQA-1'],
    },
    {
      _id: 'industry-defense',
      title: 'Defense',
      slug: { current: 'defense' },
      problem: 'Defense systems require absolute reliability with strict security and compliance requirements.',
      solution: 'ITAR-registered facility with cleared personnel and segregated production areas for classified programs.',
      tolerances: {
        standard: '±0.005"',
        precision: '±0.001"',
        ultra: '±0.0001"',
      },
      certifications: ['ITAR Registered', 'NIST 800-171', 'ISO 9001:2015'],
    },
  ];

  for (const industry of industries) {
    await client.createIfNotExists({
      _type: 'industry',
      ...industry,
    });
    console.log(`✅ Industry created: ${industry.title}`);
  }

  // Legal Documents
  await client.createIfNotExists({
    _type: 'legalDoc',
    _id: 'legal-terms',
    type: 'terms',
    title: 'Terms & Conditions',
    version: '2.0',
    effectiveDate: '2024-01-01',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'These Terms and Conditions govern all purchase orders, contracts, and agreements between Precision Manufacturing and its customers.',
          },
        ],
      },
    ],
  });
  console.log('✅ Terms & Conditions created');

  await client.createIfNotExists({
    _type: 'legalDoc',
    _id: 'legal-supplier',
    type: 'supplier_requirements',
    title: 'Supplier Quality Requirements',
    version: '3.0',
    effectiveDate: '2024-01-01',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'All suppliers must maintain compliance with AS9100D, ISO 9001:2015, and applicable ITAR/EAR regulations.',
          },
        ],
      },
    ],
  });
  console.log('✅ Supplier Requirements created');

  // Sample Blog Post
  await client.createIfNotExists({
    _type: 'post',
    _id: 'post-aerospace-tolerances',
    title: 'Understanding Aerospace Tolerances: A Complete Guide',
    slug: { current: 'aerospace-tolerances-guide' },
    excerpt: 'Explore the critical importance of tight tolerances in aerospace manufacturing.',
    tags: ['aerospace', 'tolerances', 'quality'],
    author: 'Engineering Team',
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'In aerospace manufacturing, precision is not just a goal—it is an absolute requirement.',
          },
        ],
      },
    ],
  });
  console.log('✅ Sample blog post created');

  console.log('\n✨ Seeding complete! Your Sanity dataset is ready.');
  console.log('📝 Note: Add your SANITY_WRITE_TOKEN to .env.local to run this script');
}

seedContent().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});