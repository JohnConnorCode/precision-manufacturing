import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

async function inspectData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('Connecting to MongoDB...\n');
    await client.connect();

    const db = client.db();

    // Inspect services structure
    console.log('=== SERVICES ===');
    const services = await db.collection('services').find({}).toArray();
    console.log(`Total: ${services.length}`);
    services.forEach(s => {
      console.log(`\n- ${s.title || s.name || 'Untitled'}`);
      console.log(`  Slug: ${s.slug}`);
      console.log(`  Keys: ${Object.keys(s).join(', ')}`);
    });

    // Inspect industries structure
    console.log('\n\n=== INDUSTRIES ===');
    const industries = await db.collection('industries').find({}).toArray();
    console.log(`Total: ${industries.length}`);
    industries.forEach(i => {
      console.log(`\n- ${i.title || i.name || 'Untitled'}`);
      console.log(`  Slug: ${i.slug}`);
      console.log(`  Keys: ${Object.keys(i).join(', ')}`);
    });

    // Check resources
    console.log('\n\n=== RESOURCES ===');
    const resourcesCount = await db.collection('resources').countDocuments();
    console.log(`Total: ${resourcesCount}`);
    if (resourcesCount > 0) {
      const resource = await db.collection('resources').findOne({});
      console.log(`Sample keys: ${Object.keys(resource).join(', ')}`);
    }

    // Check team-members
    console.log('\n\n=== TEAM MEMBERS ===');
    const teamMembers = await db.collection('team-members').find({}).toArray();
    console.log(`Total: ${teamMembers.length}`);
    if (teamMembers.length > 0) {
      teamMembers.forEach(member => {
        console.log(`  - ${member.name} (${member.title})`);
      });
    }

    // Check global collections (Payload 3.x stores each global in its own collection)
    console.log('\n\n=== GLOBALS ===');

    // Check settings global
    const settingsCount = await db.collection('settings').countDocuments();
    console.log(`settings: ${settingsCount} documents`);
    if (settingsCount > 0) {
      const settings = await db.collection('settings').findOne({});
      console.log(`  Keys: ${Object.keys(settings).filter(k => !k.startsWith('_') && !k.startsWith('$')).join(', ')}`);
    }

    // Check homepage global
    const homepageCount = await db.collection('homepage').countDocuments();
    console.log(`homepage: ${homepageCount} documents`);
    if (homepageCount > 0) {
      const homepage = await db.collection('homepage').findOne({});
      console.log(`  Keys: ${Object.keys(homepage).filter(k => !k.startsWith('_') && !k.startsWith('$')).join(', ')}`);
    }

    // Check globals collection
    const globalsCount = await db.collection('globals').countDocuments();
    console.log(`globals: ${globalsCount} documents`);
    if (globalsCount > 0) {
      const globalsList = await db.collection('globals').find({}).toArray();
      globalsList.forEach(g => {
        console.log(`  - ${g.slug || g.title || 'unnamed'}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

inspectData();
