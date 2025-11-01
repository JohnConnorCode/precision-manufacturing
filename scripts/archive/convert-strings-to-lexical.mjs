import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required');
}

// Convert plain string to Lexical JSON format
function stringToLexical(text) {
  if (!text || typeof text !== 'string') return null;

  return {
    root: {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: text,
              type: 'text'
            }
          ]
        }
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  };
}

async function convertDescriptions() {
  const client = await MongoClient.connect(uri);
  const db = client.db('precision-manufacturing');

  console.log('\n=== CONVERTING PLAIN STRINGS TO LEXICAL JSON ===\n');

  // Collections to convert
  const collections = ['services', 'industries'];

  for (const collectionName of collections) {
    try {
      const collection = db.collection(collectionName);

      // Find all documents where description is a plain string (not an object)
      const docs = await collection.find({ description: { $type: 'string' } }).toArray();

      if (docs.length === 0) {
        console.log(`✅ ${collectionName}: All descriptions already in Lexical format`);
        continue;
      }

      console.log(`🔧 ${collectionName}: Found ${docs.length} documents with plain string descriptions`);

      // Update each document
      for (const doc of docs) {
        const lexicalDescription = stringToLexical(doc.description);

        await collection.updateOne(
          { _id: doc._id },
          { $set: { description: lexicalDescription } }
        );

        console.log(`   ✓ Updated: ${doc.title || doc.slug || doc._id}`);
      }

      console.log(`✅ ${collectionName}: Converted ${docs.length} descriptions\n`);
    } catch (error) {
      console.log(`⚠️  ${collectionName}: ${error.message}\n`);
    }
  }

  console.log('=== VERIFICATION ===\n');

  // Verify services collection
  const service = await db.collection('services').findOne({});
  if (service) {
    console.log('Sample service description type:', typeof service.description);
    console.log('Is object:', typeof service.description === 'object');
    console.log('Has root key:', service.description && 'root' in service.description);
  }

  await client.close();
  console.log('\n✅ Conversion complete!');
}

convertDescriptions().catch(console.error);
