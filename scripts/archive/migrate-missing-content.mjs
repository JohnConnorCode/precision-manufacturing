import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

// Content from old site (Sept 25, 2025)
const servicesContent = {
  '5-axis-machining': {
    excerpt: 'Complex geometries and tight tolerances with state-of-the-art 5-axis CNC capabilities.',
    features: ['±0.0001" Precision', 'Complex Geometries', 'Titanium & Inconel', 'Aerospace Grade']
  },
  'adaptive-machining': {
    excerpt: 'Intelligent manufacturing with real-time adjustments and adaptive control systems.',
    features: ['Real-time Monitoring', 'Intelligent Control', 'Quality Assurance', 'Process Optimization']
  },
  'metrology': {
    excerpt: 'Advanced measurement and inspection services ensuring component accuracy.',
    features: ['CMM Inspection', 'Laser Scanning', 'Dimensional Analysis', 'First Article']
  },
  'engineering': {
    excerpt: 'Complete design, prototyping, and manufacturing engineering support.',
    features: ['Design Optimization', 'Rapid Prototyping', 'DFM Analysis', 'Process Development']
  }
};

const industriesContent = {
  'aerospace': {
    excerpt: 'Critical flight components and systems requiring the highest precision and reliability standards.',
    applications: ['Engine components', 'Landing gear', 'Structural parts', 'Avionics housings'],
    certifications: ['AS9100D', 'NADCAP', 'ITAR']
  },
  'defense': {
    excerpt: 'Mission-critical components for defense systems with stringent security and quality requirements.',
    applications: ['Weapon systems', 'Radar components', 'Vehicle parts', 'Electronics'],
    certifications: ['ITAR', 'DFARS', 'Security clearance']
  },
  'energy': {
    excerpt: 'Precision components for power generation, oil & gas, and renewable energy systems.',
    applications: ['Turbine parts', 'Valve components', 'Pump housings', 'Generator parts'],
    certifications: ['API', 'ASME', 'ISO 9001']
  }
};

async function migrateContent() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    console.log('🔄 Migrating missing content from old site...\n');

    // Update Services
    console.log('=== UPDATING SERVICES ===');
    for (const [slug, content] of Object.entries(servicesContent)) {
      const result = await db.collection('services').updateOne(
        { slug },
        { $set: { excerpt: content.excerpt, features: content.features } }
      );
      console.log(`✅ Updated ${slug}: ${result.modifiedCount} document(s)`);
    }

    // Update Industries
    console.log('\n=== UPDATING INDUSTRIES ===');
    for (const [slug, content] of Object.entries(industriesContent)) {
      const result = await db.collection('industries').updateOne(
        { slug },
        {
          $set: {
            excerpt: content.excerpt,
            applications: content.applications,
            certifications: content.certifications
          }
        }
      );
      console.log(`✅ Updated ${slug}: ${result.modifiedCount} document(s)`);
    }

    console.log('\n✅ Migration complete!');
    console.log('\nVerifying updated content...\n');

    // Verify Services
    const services = await db.collection('services').find({}, {
      projection: { title: 1, excerpt: 1, features: 1, slug: 1 }
    }).toArray();
    console.log('=== SERVICES ===');
    services.forEach(s => {
      console.log(`\n${s.title}:`);
      console.log(`  Excerpt: ${s.excerpt ? '✅' : '❌'}`);
      console.log(`  Features: ${s.features?.length || 0}/4`);
    });

    // Verify Industries
    const industries = await db.collection('industries').find({}, {
      projection: { title: 1, excerpt: 1, applications: 1, certifications: 1, slug: 1 }
    }).toArray();
    console.log('\n\n=== INDUSTRIES ===');
    industries.forEach(i => {
      console.log(`\n${i.title}:`);
      console.log(`  Excerpt: ${i.excerpt ? '✅' : '❌'}`);
      console.log(`  Applications: ${i.applications?.length || 0}/4`);
      console.log(`  Certifications: ${i.certifications?.length || 0}/3`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

migrateContent();
