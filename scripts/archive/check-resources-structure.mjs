import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/?retryWrites=true&w=majority&appName=PrecisionManufacturing';

async function checkResourcesArrays() {
  const client = await MongoClient.connect(uri);
  const db = client.db('precision-manufacturing');

  const resource = await db.collection('resources').findOne({});

  console.log('Resource structure check:');
  console.log('Fields:', Object.keys(resource));
  console.log();

  // Check each field for arrays
  for (const [key, value] of Object.entries(resource)) {
    if (Array.isArray(value)) {
      console.log(`${key}: array (${value.length} items)`);
      if (value.length > 0) {
        console.log(`  First item type: ${typeof value[0]}`);
        if (typeof value[0] === 'string') {
          console.log(`  VALUE: "${value[0]}"`);
        } else if (typeof value[0] === 'object') {
          console.log(`  Keys: ${Object.keys(value[0]).join(', ')}`);
        }
      }
    }
  }

  await client.close();
}

checkResourcesArrays().catch(console.error);
