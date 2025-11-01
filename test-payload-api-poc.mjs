/**
 * POC Validation Script
 *
 * Compares MongoDB direct access vs Payload Local API to verify:
 * 1. Both return data successfully
 * 2. Same data structure
 * 3. Same number of records
 * 4. Performance comparison
 */

// Need to use dynamic import since we're dealing with TypeScript files
async function runComparison() {
  console.log('=== PAYLOAD API POC VALIDATION ===\n');

  try {
    console.log('1. Testing Direct MongoDB Access (current method)...');
    console.time('MongoDB Direct');

    // Import and test MongoDB version
    const { getServicesFromCMS: getServicesMongo } = await import('./lib/get-cms-data-direct.ts');
    const mongoServices = await getServicesMongo(false);

    console.timeEnd('MongoDB Direct');
    console.log(`   ✓ Fetched ${mongoServices.length} services`);
    console.log(`   ✓ Sample service: "${mongoServices[0]?.title}"`);
    console.log(`   ✓ Structure: ${Object.keys(mongoServices[0] || {}).join(', ')}\n`);

    console.log('2. Testing Payload Local API (new method)...');
    console.time('Payload API');

    // Import and test Payload version
    const { getServicesFromCMS: getServicesPayload } = await import('./lib/get-cms-data-payload.ts');
    const payloadServices = await getServicesPayload(false);

    console.timeEnd('Payload API');
    console.log(`   ✓ Fetched ${payloadServices.length} services`);
    console.log(`   ✓ Sample service: "${payloadServices[0]?.title}"`);
    console.log(`   ✓ Structure: ${Object.keys(payloadServices[0] || {}).join(', ')}\n`);

    console.log('3. Comparison Results:');
    console.log(`   Record count match: ${mongoServices.length === payloadServices.length ? '✅' : '❌'}`);

    // Check if structures match
    const mongoKeys = Object.keys(mongoServices[0] || {}).sort();
    const payloadKeys = Object.keys(payloadServices[0] || {}).sort();
    const structureMatch = JSON.stringify(mongoKeys) === JSON.stringify(payloadKeys);
    console.log(`   Structure match: ${structureMatch ? '✅' : '❌'}`);

    if (structureMatch) {
      console.log(`   Both return: ${mongoKeys.join(', ')}`);
    }

    // Check if first title matches
    const titleMatch = mongoServices[0]?.title === payloadServices[0]?.title;
    console.log(`   First title match: ${titleMatch ? '✅' : '❌'}`);

    if (!titleMatch) {
      console.log(`      MongoDB: "${mongoServices[0]?.title}"`);
      console.log(`      Payload: "${payloadServices[0]?.title}"`);
    }

    console.log('\n=== POC VALIDATION RESULTS ===');

    if (mongoServices.length === payloadServices.length && structureMatch) {
      console.log('✅ SUCCESS: Payload API returns same data structure as MongoDB');
      console.log('✅ Migration pattern is proven to work');
      console.log('\n📝 Next Steps:');
      console.log('   1. Update imports in app pages to use lib/get-cms-data-payload');
      console.log('   2. Test all pages work correctly');
      console.log('   3. Gradually roll out to production');
      console.log('   4. Archive lib/get-cms-data-direct after validation period');
    } else {
      console.log('⚠️  WARNING: Data structure differences detected');
      console.log('   Review output above and adjust transformation logic');
    }

  } catch (error) {
    console.error('\n❌ ERROR during POC validation:');
    console.error(error.message);

    if (error.message.includes('Cannot find module')) {
      console.log('\n💡 Tip: Make sure to run this from project root with .env loaded');
      console.log('   MONGODB_URI must be set in environment');
    }
  }
}

// Load environment variables
import { config } from 'dotenv';
config();

if (!process.env.MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI environment variable is required');
  console.log('\n💡 Solution: Create .env file with MONGODB_URI');
  process.exit(1);
}

runComparison().then(() => {
  console.log('\n✓ POC validation complete');
  process.exit(0);
}).catch(error => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
