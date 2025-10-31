import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function checkUsers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');

    const userCount = await usersCollection.countDocuments();
    console.log(`\n📊 Users in database: ${userCount}`);

    if (userCount === 0) {
      console.log('\n⚠️  No users found! You need to create a user first.');
      console.log('Run: npm run payload generate:user');
    } else {
      const users = await usersCollection.find({}).toArray();
      console.log('\n👥 Users:');
      users.forEach(user => {
        console.log(`  - ${user.email || user.name || 'Unknown'}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkUsers();
