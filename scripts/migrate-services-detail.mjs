import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const servicesData = [
  {
    title: '5-Axis Machining',
    slug: '5-axis-machining',
    description: 'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components',
    hero: {
      subtitle: 'Precision Manufacturing Excellence',
      badge: 'ADVANCED MACHINING SERVICES',
    },
    overview: {
      description: 'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications.',
      highlights: [
        { highlight: 'Complex simultaneous 5-axis contouring' },
        { highlight: '±0.0001" positioning accuracy' },
        { highlight: 'Automated tool changing and optimization' },
        { highlight: 'Real-time monitoring and quality control' },
      ],
    },
    capabilities: [
      { label: 'Simultaneous Axes', value: '5-Axis', description: 'Full simultaneous multi-axis control' },
      { label: 'Machining Accuracy', value: '±0.0001"', description: 'Precision tolerance capability' },
      { label: 'Work Envelope', value: '48" x 26" x 20"', description: 'Maximum capacity' },
      { label: 'Spindle Speed', value: '12,000 RPM', description: 'High-speed capability' },
    ],
    technicalSpecs: {
      tolerances: {
        dimensional: '±0.0001" (±0.0025mm)',
        geometric: '0.0002" (0.005mm)',
        repeatability: '±0.000050" (±0.00127mm)',
      },
      materials: [
        { material: 'Aluminum Alloys', grade: '6061-T6, 7075-T6, 2024-T3' },
        { material: 'Titanium Alloys', grade: 'Ti-6Al-4V, Ti-6Al-2Sn-4Zr-2Mo' },
        { material: 'Stainless Steel', grade: '316L, 17-4 PH, 15-5 PH' },
        { material: 'Superalloys', grade: 'Inconel 718, Inconel 625, Hastelloy X' },
      ],
    },
    process: [
      { step: 1, title: 'Programming & Setup', description: 'Advanced CAD/CAM programming with collision detection', qualityCheck: 'Program verification, toolpath simulation' },
      { step: 2, title: 'Fixturing & Workholding', description: 'Custom fixture design and precision workholding', qualityCheck: 'Fixture validation, workpiece security check' },
      { step: 3, title: 'Precision Machining', description: '5-axis simultaneous contouring with real-time monitoring', qualityCheck: 'In-process dimensional verification' },
      { step: 4, title: 'Inspection & Quality Verification', description: 'Comprehensive measurement and quality documentation', qualityCheck: 'Final dimensional verification, traceability documentation' },
    ],
    equipment: [
      { name: '5-Axis CNC Milling Machine', manufacturer: 'DMG MORI', model: 'Duraturn 2050', specs: '5-axis simultaneous capability, 12,000 RPM spindle' },
      { name: 'CMM Coordinate Measuring Machine', manufacturer: 'ZEISS', model: 'Accura II', specs: 'High-precision measurement, automated probe changing' },
    ],
    seo: {
      metaTitle: '5-Axis CNC Machining Services | Precision Manufacturing',
      metaDescription: 'Advanced 5-axis simultaneous machining for aerospace and defense. ±0.0001" tolerances. ISO 9001 & AS9100D certified.',
    },
    services: [
      {
        title: 'Complex Aerospace Components',
        description: 'Advanced 5-axis machining for turbine blades, impellers, and complex geometries requiring continuous contouring.',
        iconName: 'Settings',
        features: [
          { feature: 'Turbine blade manufacturing' },
          { feature: 'Impeller machining' },
          { feature: 'Complex curve generation' },
          { feature: 'Simultaneous 5-axis contouring' },
        ],
        image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=90',
        capabilities: [
          { capability: 'Hermle C42U 5-axis machining center' },
          { capability: 'Heidenhain iTNC 530 control' },
          { capability: '±0.0001" positioning accuracy' },
          { capability: 'Automatic tool changer (60 tools)' },
        ],
      },
      {
        title: 'Precision Defense Parts',
        description: 'High-precision machining of defense components with complex angles and tight tolerances for critical applications.',
        iconName: 'Shield',
        features: [
          { feature: 'Defense component machining' },
          { feature: 'Complex angle programming' },
          { feature: 'Tight tolerance manufacturing' },
          { feature: 'ITAR compliance' },
        ],
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=90',
        capabilities: [
          { capability: 'ITAR registered facility' },
          { capability: 'Security clearance available' },
          { capability: 'Traceability documentation' },
          { capability: 'Quality assurance protocols' },
        ],
      },
      {
        title: 'Prototype Development',
        description: 'Rapid prototyping and low-volume production using advanced 5-axis capabilities for complex part geometries.',
        iconName: 'Zap',
        features: [
          { feature: 'Rapid prototyping' },
          { feature: 'Complex geometry machining' },
          { feature: 'Material optimization' },
          { feature: 'Design validation' },
        ],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',
        capabilities: [
          { capability: 'CAD/CAM integration' },
          { capability: 'Multiple material capability' },
          { capability: 'Surface finish optimization' },
          { capability: 'Dimensional verification' },
        ],
      },
      {
        title: 'Production Machining',
        description: 'High-volume production capabilities with consistent quality and repeatability for complex manufactured parts.',
        iconName: 'Cog',
        features: [
          { feature: 'High-volume production' },
          { feature: 'Process optimization' },
          { feature: 'Quality consistency' },
          { feature: 'Automated workflows' },
        ],
        image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=90',
        capabilities: [
          { capability: 'Statistical process control' },
          { capability: 'Automated inspection' },
          { capability: 'Production scheduling' },
          { capability: 'Continuous improvement' },
        ],
      },
    ],
    materials: [
      {
        category: 'Aluminum Alloys',
        types: [
          { type: '6061-T6' },
          { type: '7075-T6' },
          { type: '2024-T3' },
          { type: 'Mic-6 tooling plate' },
        ],
        applications: 'Aerospace structures, defense components, tooling',
      },
      {
        category: 'Titanium Alloys',
        types: [
          { type: 'Ti-6Al-4V' },
          { type: 'Ti-6Al-2Sn-4Zr-2Mo' },
          { type: 'Commercial pure titanium' },
        ],
        applications: 'Aerospace engines, medical implants, defense',
      },
      {
        category: 'Stainless Steel',
        types: [
          { type: '316L' },
          { type: '17-4 PH' },
          { type: '15-5 PH' },
          { type: '304/304L' },
        ],
        applications: 'Food processing, medical, marine applications',
      },
      {
        category: 'Superalloys',
        types: [
          { type: 'Inconel 718' },
          { type: 'Inconel 625' },
          { type: 'Hastelloy X' },
          { type: 'Waspaloy' },
        ],
        applications: 'High-temperature aerospace, power generation',
      },
    ],
    processes: [
      {
        title: 'Programming & Setup',
        description: 'Advanced CAD/CAM programming with collision detection and optimization for complex 5-axis toolpaths.',
        features: [
          { feature: 'Mastercam programming' },
          { feature: 'Tool path optimization' },
          { feature: 'Collision avoidance' },
          { feature: 'Simulation verification' },
        ],
      },
      {
        title: 'Fixturing & Workholding',
        description: 'Custom fixture design and precision workholding solutions for complex part geometries.',
        features: [
          { feature: 'Custom fixture design' },
          { feature: 'Modular workholding' },
          { feature: 'Part accessibility optimization' },
          { feature: 'Vibration dampening' },
        ],
      },
      {
        title: 'Quality Assurance',
        description: 'In-process monitoring and final inspection ensuring dimensional accuracy and surface finish requirements.',
        features: [
          { feature: 'CMM inspection' },
          { feature: 'Surface finish measurement' },
          { feature: 'GD&T verification' },
          { feature: 'Statistical analysis' },
        ],
      },
      {
        title: 'Finishing Operations',
        description: 'Secondary operations including deburring, surface treatments, and assembly preparation.',
        features: [
          { feature: 'Precision deburring' },
          { feature: 'Surface treatments' },
          { feature: 'Assembly preparation' },
          { feature: 'Packaging coordination' },
        ],
      },
    ],
  },
  {
    title: 'Adaptive Machining',
    slug: 'adaptive-machining',
    description: 'Real-time adaptive machining technology that optimizes tool paths and parameters for superior surface finish and tool life',
    hero: {
      subtitle: 'Intelligent Manufacturing Technology',
      badge: 'ADVANCED ADAPTIVE CONTROL',
    },
    overview: {
      description: 'Next-generation adaptive machining technology that monitors and adjusts cutting parameters in real-time for optimized tool life, surface finish, and productivity.',
      highlights: [
        { highlight: 'Real-time cutting force monitoring' },
        { highlight: 'Automatic feed rate optimization' },
        { highlight: 'Predictive tool wear analysis' },
        { highlight: '30-40% improvement in tool life' },
      ],
    },
    capabilities: [
      { label: 'Tool Life Extension', value: '40%', description: 'Extended tool utilization through adaptive control' },
      { label: 'Surface Finish', value: 'Ra 8-32', description: 'Optimized finish with reduced secondary operations' },
      { label: 'Feed Rate Optimization', value: 'Dynamic', description: 'Real-time adjustment for maximum efficiency' },
      { label: 'Material Compatibility', value: 'Universal', description: 'Works with all machineable materials' },
    ],
    technicalSpecs: {
      tolerances: {
        dimensional: '±0.0005" (±0.012mm)',
        geometric: '0.0005" (0.012mm)',
        repeatability: '±0.0002" (±0.005mm)',
      },
      materials: [
        { material: 'Aluminum Alloys', grade: 'All common grades' },
        { material: 'Titanium Alloys', grade: 'All grades including difficult-to-machine types' },
        { material: 'Stainless Steel', grade: 'All grades' },
        { material: 'Cast Iron', grade: 'All types' },
      ],
    },
    process: [
      { step: 1, title: 'Material & Setup Analysis', description: 'Analyze material properties and optimize initial parameters', qualityCheck: 'Material properties verified, initial cutting parameters set' },
      { step: 2, title: 'Adaptive Machining Cycle', description: 'Real-time monitoring and automatic parameter adjustment', qualityCheck: 'Cutting force monitoring, feed rate optimization' },
      { step: 3, title: 'Predictive Maintenance', description: 'Monitor tool wear and predict tool change points', qualityCheck: 'Tool condition monitoring, proactive tool changes' },
      { step: 4, title: 'Quality Inspection', description: 'Final verification of all surfaces and dimensions', qualityCheck: 'Dimensional verification, finish check' },
    ],
    equipment: [
      { name: 'Milling Machine with Adaptive Control', manufacturer: 'Haas', model: 'VF-4 with Fusion Adaptive', specs: 'Real-time force monitoring, automatic feed rate control' },
      { name: 'Tool Condition Monitoring System', manufacturer: 'Scytec Dataman', specs: 'Predictive tool wear analysis, automated tool management' },
    ],
    seo: {
      metaTitle: 'Adaptive Machining & Smart Manufacturing | Precision Tooling',
      metaDescription: 'Next-generation adaptive machining with real-time optimization. 40% tool life extension. Superior surface finish. Lower costs.',
    },
  },
  {
    title: 'Metrology Services',
    slug: 'metrology',
    description: 'Precision measurement and dimensional inspection services for critical manufacturing components',
    hero: {
      subtitle: 'Precision Measurement Excellence',
      badge: 'ADVANCED METROLOGY SERVICES',
    },
    overview: {
      description: 'Comprehensive metrology services delivering precise dimensional verification, statistical analysis, and quality assurance documentation for all manufacturing applications.',
      highlights: [
        { highlight: 'Coordinate measuring machine (CMM) inspection' },
        { highlight: 'Statistical process control (SPC)' },
        { highlight: 'Traceability to NIST standards' },
        { highlight: 'Comprehensive quality documentation' },
      ],
    },
    capabilities: [
      { label: 'Measurement Accuracy', value: '±0.0001"', description: 'Ultra-precision measurement capability' },
      { label: 'CMM Probing', value: 'Multi-Sensor', description: 'Optical and contact probing for complex geometries' },
      { label: 'SPC Analysis', value: 'Real-Time', description: 'Statistical process control with immediate feedback' },
      { label: 'Documentation', value: 'Full Traceability', description: 'Complete measurement records and certifications' },
    ],
    technicalSpecs: {
      tolerances: {
        dimensional: '±0.00005" (±0.00127mm)',
        geometric: '0.0001" (0.0025mm)',
        repeatability: '±0.000025" (±0.0006mm)',
      },
      materials: [
        { material: 'All Metals', grade: 'Ferrous and non-ferrous' },
        { material: 'Composites', grade: 'Carbon fiber, aramid reinforced' },
        { material: 'Ceramics', grade: 'Technical ceramics' },
        { material: 'Plastics', grade: 'Engineering polymers' },
      ],
    },
    process: [
      { step: 1, title: 'Measurement Planning', description: 'Develop inspection protocol based on print requirements', qualityCheck: 'Protocol review, measurement uncertainty analysis' },
      { step: 2, title: 'CMM Inspection', description: 'Automated or manual coordinate measurement', qualityCheck: 'Probe calibration verification, reference standard checks' },
      { step: 3, title: 'Statistical Analysis', description: 'SPC analysis and trend evaluation', qualityCheck: 'Data integrity verification, trend analysis' },
      { step: 4, title: 'Reporting & Documentation', description: 'Comprehensive quality reports with traceability', qualityCheck: 'Report verification, archival to NIST standards' },
    ],
    equipment: [
      { name: 'Coordinate Measuring Machine (CMM)', manufacturer: 'ZEISS', model: 'ACCURA II', specs: '±0.00005" accuracy, multi-sensor capability' },
      { name: 'Vision Inspection System', manufacturer: 'KEYENCE', specs: 'Automated optical inspection, high-speed scanning' },
    ],
    seo: {
      metaTitle: 'Precision Metrology & Dimensional Inspection | Quality Assurance',
      metaDescription: 'CMM inspection, SPC analysis, and full traceability. ±0.00005" accuracy. NIST-traceable measurements.',
    },
  },
  {
    title: 'Engineering Services',
    slug: 'engineering',
    description: 'Expert design, analysis, and manufacturing engineering support for complex precision components',
    hero: {
      subtitle: 'Design Excellence Through Expertise',
      badge: 'ADVANCED ENGINEERING SERVICES',
    },
    overview: {
      description: 'Comprehensive engineering services combining cutting-edge design tools, analysis capabilities, and manufacturing expertise to optimize your components for performance and manufacturability.',
      highlights: [
        { highlight: 'CAD/CAM design optimization' },
        { highlight: 'FEA structural and thermal analysis' },
        { highlight: 'Design for Manufacturability (DFM)' },
        { highlight: 'Tolerance stack-up analysis' },
      ],
    },
    capabilities: [
      { label: 'CAD Design', value: 'NX/Fusion', description: 'Advanced 3D modeling and parametric design' },
      { label: 'FEA Analysis', value: 'ANSYS', description: 'Structural, thermal, and fatigue analysis' },
      { label: 'Manufacturing Support', value: 'Full Support', description: 'Process selection and optimization' },
      { label: 'Design Review', value: 'Expert Review', description: 'Independent design validation and optimization' },
    ],
    technicalSpecs: {
      tolerances: {
        dimensional: 'Design per specification',
        geometric: 'GD&T analysis and optimization',
        repeatability: 'Design verification and validation',
      },
      materials: [
        { material: 'Analysis Support', grade: 'All materials' },
        { material: 'Design Services', grade: 'All industries' },
        { material: 'Consulting', grade: 'Expert support' },
      ],
    },
    process: [
      { step: 1, title: 'Design Requirements Analysis', description: 'Understand application needs and constraints', qualityCheck: 'Requirements documentation, design review plan' },
      { step: 2, title: 'Preliminary Design', description: 'Create initial design concepts with analysis', qualityCheck: 'Design review, peer evaluation' },
      { step: 3, title: 'Detailed Design & Analysis', description: 'Optimize design with FEA and manufacturing input', qualityCheck: 'Analysis verification, manufacturability review' },
      { step: 4, title: 'Design Documentation', description: 'Complete design package for manufacturing', qualityCheck: 'Drawing review, specification verification' },
    ],
    equipment: [
      { name: 'CAD Workstation', manufacturer: 'Autodesk/Siemens', model: 'Fusion/NX Professional', specs: 'Full parametric design, assembly management' },
      { name: 'FEA Analysis Software', manufacturer: 'ANSYS', specs: 'Structural, thermal, and fatigue analysis' },
    ],
    seo: {
      metaTitle: 'Engineering Design & Analysis Services | Manufacturing Expertise',
      metaDescription: 'CAD/CAM design, FEA analysis, and DFM support. Design optimization for performance and manufacturability.',
    },
  },
];

async function migrateServicesDetail() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const servicesCollection = db.collection('services');

    for (const serviceData of servicesData) {
      const existingService = await servicesCollection.findOne({ slug: serviceData.slug });

      if (existingService) {
        const result = await servicesCollection.updateOne(
          { slug: serviceData.slug },
          { $set: serviceData }
        );
        console.log(`✓ Updated service: ${serviceData.title}`);
      } else {
        const result = await servicesCollection.insertOne(serviceData);
        console.log(`✓ Inserted service: ${serviceData.title} (ID: ${result.insertedId})`);
      }
    }

    console.log('\\n✅ Services detail migration completed successfully!');
    console.log(`   Migrated ${servicesData.length} services with full detail data`);
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateServicesDetail();
