import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const industriesData = [
  {
    title: 'Aerospace Manufacturing',
    slug: 'aerospace',
    description: 'Mission-critical precision components for commercial and defense aerospace applications',
    hero: {
      subtitle: 'Excellence in Flight-Critical Manufacturing',
      badge: 'AEROSPACE & DEFENSE',
    },
    overview: {
      description: 'Delivering precision aerospace components that meet the most stringent quality and reliability requirements for commercial and defense aircraft systems.',
      marketSize: 'Global aerospace manufacturing market exceeds $500 billion annually',
      keyDrivers: [
        { driver: 'Growing commercial air travel demand' },
        { driver: 'Advanced aircraft development programs' },
        { driver: 'Modernization of existing fleets' },
        { driver: 'Increased drone and UAV adoption' },
      ],
      challenges: [
        { challenge: 'Extreme precision tolerance requirements' },
        { challenge: 'Complex material specifications' },
        { challenge: 'Rigorous certification processes' },
        { challenge: 'Supply chain compliance demands' },
      ],
    },
    capabilities: [
      {
        title: 'Precision Machining',
        description: 'Complex aerospace component manufacturing with ±0.0001" tolerances',
        technicalDetails: [
          { detail: '5-axis simultaneous machining' },
          { detail: '±0.0001" positioning accuracy' },
          { detail: 'Aerospace-grade material expertise' },
        ],
      },
      {
        title: 'Titanium Processing',
        description: 'Advanced titanium and superalloy machining for engines',
        technicalDetails: [
          { detail: 'High-temperature material expertise' },
          { detail: 'Specialized cooling strategies' },
          { detail: 'Engine component capability' },
        ],
      },
      {
        title: 'Assembly Support',
        description: 'Sub-assembly fabrication and integration',
        technicalDetails: [
          { detail: 'Complex multi-part assemblies' },
          { detail: 'Fastener installation services' },
          { detail: 'Complete traceability' },
        ],
      },
    ],
    regulatory: {
      certifications: [
        {
          name: 'AS9100D',
          description: 'Aerospace Quality Management System',
          scope: 'Covers all aspects of aerospace component manufacturing',
        },
        {
          name: 'NADCAP',
          description: 'National Aerospace and Defense Contractors Accreditation Program',
          scope: 'Advanced processes including welding, heat treating, and testing',
        },
        {
          name: 'ITAR',
          description: 'International Traffic in Arms Regulations',
          scope: 'Export control compliance for defense components',
        },
      ],
      standards: [
        { name: 'FAA Part 21', description: 'Federal Aviation Administration certification requirements' },
        { name: 'AS/EN 9100', description: 'Quality management system for aerospace' },
        { name: 'ISO 9001', description: 'General quality management system' },
      ],
    },
    applications: [
      {
        name: 'Engine Components',
        description: 'Turbine blades, compressor housings, and fuel system components for both commercial and military aircraft',
        requirements: [
          { requirement: 'Extreme precision tolerances' },
          { requirement: 'High-temperature material capability' },
          { requirement: 'Complex geometry support' },
        ],
      },
      {
        name: 'Landing Gear Systems',
        description: 'Structural components, actuators, and assemblies for aircraft landing systems',
        requirements: [
          { requirement: 'High-strength material expertise' },
          { requirement: 'Stress concentration analysis' },
          { requirement: 'Complete traceability' },
        ],
      },
      {
        name: 'Flight Control Surfaces',
        description: 'Structural ribs, spars, and skin components for wings and control surfaces',
        requirements: [
          { requirement: 'Aluminum alloy expertise' },
          { requirement: 'Weight optimization' },
          { requirement: 'Fatigue resistance' },
        ],
      },
    ],
    components: [
      {
        category: 'Engine Components',
        description: 'Critical turbine and engine parts requiring extreme precision and material expertise',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
        parts: [
          { part: 'Turbine blades and vanes' },
          { part: 'Combustor liners' },
          { part: 'Compressor components' },
          { part: 'Engine mounts and brackets' },
        ],
        materials: [
          { material: 'Inconel 718/625' },
          { material: 'Titanium Ti-6Al-4V' },
          { material: 'Hastelloy X' },
        ],
        requirements: [
          { requirement: 'High temperature resistance' },
          { requirement: 'Fatigue resistance' },
          { requirement: 'Precise airfoil geometry' },
        ],
      },
      {
        category: 'Structural Components',
        description: 'Airframe and structural parts demanding exceptional strength and weight optimization',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
        parts: [
          { part: 'Wing brackets and fittings' },
          { part: 'Landing gear components' },
          { part: 'Fuselage frames' },
        ],
        materials: [
          { material: 'Aluminum 7075-T6' },
          { material: 'Titanium Ti-6Al-4V' },
          { material: 'Steel 15-5 PH' },
        ],
        requirements: [
          { requirement: 'High strength-to-weight ratio' },
          { requirement: 'Corrosion resistance' },
          { requirement: 'Fatigue life' },
        ],
      },
    ],
    qualityStandards: [
      { standard: 'First Article Inspection (AS9102)' },
      { standard: 'Statistical Process Control (SPC)' },
      { standard: 'Coordinate Measuring Machine (CMM)' },
      { standard: 'Material Test Certificates' },
      { standard: 'Certificate of Conformance' },
      { standard: 'Traceability Documentation' },
    ],
    processBenefits: [
      {
        title: 'Advanced Manufacturing',
        description: 'Cutting-edge 5-axis CNC machining for complex aerospace geometries',
        features: [
          { feature: 'Simultaneous 5-axis contouring' },
          { feature: '±0.0001" tolerance capability' },
          { feature: 'Automated tool changing' },
        ],
      },
      {
        title: 'Material Expertise',
        description: 'Specialized processing of aerospace-grade titanium and superalloys',
        features: [
          { feature: 'High-temperature material capability' },
          { feature: 'Stress relief processing' },
          { feature: 'Surface finish optimization' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Aerospace Manufacturing Services | Precision Aerospace Components',
      metaDescription: 'Mission-critical aerospace components with AS9100D, NADCAP, and ITAR certifications. ±0.0001" tolerances for commercial and defense aircraft.',
    },
  },
  {
    title: 'Defense Manufacturing',
    slug: 'defense',
    description: 'Security-cleared manufacturing for defense and military applications',
    hero: {
      subtitle: 'Trusted Defense Manufacturing Partner',
      badge: 'DEFENSE & SECURITY',
    },
    overview: {
      description: 'ITAR-registered facility delivering mission-critical components for defense and security applications with complete traceability.',
      marketSize: 'Global defense manufacturing exceeds $400 billion annually',
      keyDrivers: [
        { driver: 'Military modernization programs' },
        { driver: 'Increased defense spending' },
        { driver: 'Advanced weapons systems development' },
      ],
      challenges: [
        { challenge: 'Stringent security requirements' },
        { challenge: 'Export control compliance' },
        { challenge: 'Rapid technology evolution' },
      ],
    },
    capabilities: [
      {
        title: 'ITAR Compliance',
        description: 'Fully registered and compliant with International Traffic in Arms Regulations',
        technicalDetails: [
          { detail: 'Secure facility access control' },
          { detail: 'Export control documentation' },
          { detail: 'Personnel security clearance' },
        ],
      },
      {
        title: 'Precision Manufacturing',
        description: 'High-precision components for weapons systems and defense platforms',
        technicalDetails: [
          { detail: '±0.0001" tolerance capability' },
          { detail: 'Complex geometry machining' },
          { detail: 'Complete traceability' },
        ],
      },
    ],
    regulatory: {
      certifications: [
        { name: 'ITAR', description: 'International Traffic in Arms Regulations', scope: 'Defense article manufacturing and handling' },
        { name: 'AS9100D', description: 'Aerospace Quality Management', scope: 'Defense component manufacturing' },
      ],
      standards: [
        { name: 'DFARS', description: 'Defense Federal Acquisition Regulation Supplement' },
        { name: 'MIL-STD-45662', description: 'Calibration System Requirements' },
      ],
    },
    applications: [
      {
        name: 'Weapons Systems',
        description: 'Precision components for advanced weapons platforms',
        requirements: [
          { requirement: 'Extreme reliability' },
          { requirement: 'Harsh environment capability' },
          { requirement: 'Complete traceability' },
        ],
      },
    ],
    components: [],
    qualityStandards: [
      { standard: 'First Article Inspection' },
      { standard: 'Full Traceability Documentation' },
      { standard: 'Material Certification' },
    ],
    processBenefits: [],
    seo: {
      metaTitle: 'Defense Manufacturing Services | ITAR Registered Facility',
      metaDescription: 'Security-cleared defense manufacturing with ITAR compliance. Mission-critical components for defense and military applications.',
    },
  },
  {
    title: 'Energy Manufacturing',
    slug: 'energy',
    description: 'High-performance components for power generation and energy systems',
    hero: {
      subtitle: 'Powering the Future of Energy',
      badge: 'ENERGY & POWER GENERATION',
    },
    overview: {
      description: 'Precision manufacturing for power generation, renewable energy, and traditional energy systems requiring extreme reliability.',
      marketSize: 'Global energy equipment market exceeds $300 billion annually',
      keyDrivers: [
        { driver: 'Renewable energy expansion' },
        { driver: 'Grid modernization' },
        { driver: 'Power plant efficiency upgrades' },
      ],
      challenges: [
        { challenge: 'High-temperature operation' },
        { challenge: 'Corrosion resistance requirements' },
        { challenge: 'Long service life demands' },
      ],
    },
    capabilities: [
      {
        title: 'Turbine Components',
        description: 'High-temperature turbine blades and housings',
        technicalDetails: [
          { detail: 'Superalloy machining' },
          { detail: 'High-temperature capability' },
          { detail: 'Complex cooling passages' },
        ],
      },
    ],
    regulatory: {
      certifications: [
        { name: 'ISO 9001', description: 'Quality Management System', scope: 'Energy component manufacturing' },
      ],
      standards: [
        { name: 'ASME', description: 'American Society of Mechanical Engineers standards' },
      ],
    },
    applications: [
      {
        name: 'Power Generation',
        description: 'Components for gas turbines and power generation equipment',
        requirements: [
          { requirement: 'High-temperature resistance' },
          { requirement: 'Corrosion resistance' },
          { requirement: 'Extended service life' },
        ],
      },
    ],
    components: [],
    qualityStandards: [
      { standard: 'Material Certification' },
      { standard: 'Dimensional Inspection' },
      { standard: 'Non-Destructive Testing' },
    ],
    processBenefits: [],
    seo: {
      metaTitle: 'Energy Manufacturing Services | Power Generation Components',
      metaDescription: 'High-performance energy components for power generation and renewable energy systems. Extreme reliability and long service life.',
    },
  },
  {
    title: 'Medical Manufacturing',
    slug: 'medical',
    description: 'Precision medical devices and surgical instruments',
    hero: {
      subtitle: 'Excellence in Medical Device Manufacturing',
      badge: 'MEDICAL & HEALTHCARE',
    },
    overview: {
      description: 'FDA-compliant manufacturing of precision medical devices, surgical instruments, and implantable components.',
      marketSize: 'Global medical device market exceeds $450 billion annually',
      keyDrivers: [
        { driver: 'Aging population demographics' },
        { driver: 'Advanced surgical techniques' },
        { driver: 'Minimally invasive procedures' },
      ],
      challenges: [
        { challenge: 'FDA regulatory compliance' },
        { challenge: 'Biocompatibility requirements' },
        { challenge: 'Sterility and cleanliness' },
      ],
    },
    capabilities: [
      {
        title: 'Medical Device Manufacturing',
        description: 'Precision components for surgical instruments and medical devices',
        technicalDetails: [
          { detail: 'Micro-precision machining' },
          { detail: 'Biocompatible materials' },
          { detail: 'Clean room capability' },
        ],
      },
    ],
    regulatory: {
      certifications: [
        { name: 'ISO 13485', description: 'Medical Device Quality Management', scope: 'Medical device manufacturing' },
      ],
      standards: [
        { name: 'FDA 21 CFR Part 820', description: 'Quality System Regulation for medical devices' },
      ],
    },
    applications: [
      {
        name: 'Surgical Instruments',
        description: 'Precision surgical tools and instruments',
        requirements: [
          { requirement: 'Biocompatibility' },
          { requirement: 'Sterilization capability' },
          { requirement: 'Precision tolerances' },
        ],
      },
    ],
    components: [],
    qualityStandards: [
      { standard: 'Device History Record (DHR)' },
      { standard: 'Design History File (DHF)' },
      { standard: 'Full Traceability' },
    ],
    processBenefits: [],
    seo: {
      metaTitle: 'Medical Device Manufacturing | FDA Compliant Precision Components',
      metaDescription: 'FDA-compliant medical device manufacturing. ISO 13485 certified for surgical instruments and implantable components.',
    },
  },
];

async function migrateIndustriesDetail() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const industriesCollection = db.collection('industries');

    for (const industryData of industriesData) {
      const existingIndustry = await industriesCollection.findOne({ slug: industryData.slug });

      if (existingIndustry) {
        const result = await industriesCollection.updateOne(
          { slug: industryData.slug },
          { $set: industryData }
        );
        console.log(`✓ Updated industry: ${industryData.title}`);
      } else {
        const result = await industriesCollection.insertOne(industryData);
        console.log(`✓ Inserted industry: ${industryData.title} (ID: ${result.insertedId})`);
      }
    }

    console.log('\\n✅ Industries detail migration completed successfully!');
    console.log(`   Migrated ${industriesData.length} industries with full detail data`);
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateIndustriesDetail();
