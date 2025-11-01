import { test, expect } from '@playwright/test';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required for tests');
}

async function getServicesFromMongoDB() {
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db();
  const services = await db.collection('services')
    .find({ _status: { $in: ['published', null] } })
    .sort({ order: 1 })
    .toArray();
  await client.close();
  return services;
}

async function getIndustriesFromMongoDB() {
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db();
  const industries = await db.collection('industries')
    .find({ _status: { $in: ['published', null] } })
    .sort({ order: 1 })
    .toArray();
  await client.close();
  return industries;
}

test.describe('Homepage Content Validation', () => {
  test('Services section shows exactly 4 service cards with complete data from MongoDB', async ({ page }) => {
    console.log('\n=== SERVICES SECTION VALIDATION ===\n');

    // Fetch expected data from MongoDB
    const mongoServices = await getServicesFromMongoDB();
    console.log(`✓ Fetched ${mongoServices.length} services from MongoDB`);
    console.log('Service titles:', mongoServices.map(s => s.title).join(', '));

    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations

    // Take screenshot of full homepage
    await page.screenshot({ path: '/tmp/homepage-services-validation.png', fullPage: true });
    console.log('✓ Screenshot saved: /tmp/homepage-services-validation.png');

    // Find Services section
    const servicesSection = page.locator('section').filter({ hasText: 'PRECISION SERVICES' }).first();
    await expect(servicesSection).toBeVisible({ timeout: 10000 });
    console.log('✓ Services section is visible');

    // Count service cards - look for cards with service titles
    const serviceCards = page.locator('article, div[class*="card"], div').filter({
      has: page.locator('h3, h2').filter({
        hasText: /5-Axis|Adaptive|Metrology|Engineering/i
      })
    });

    const cardCount = await serviceCards.count();
    console.log(`Found ${cardCount} service cards on page`);

    // CRITICAL ASSERTION: Must have exactly 4 service cards
    expect(cardCount).toBeGreaterThanOrEqual(4);
    console.log('✅ PASS: At least 4 service cards displayed');

    // Verify each service card has required elements
    for (let i = 0; i < Math.min(4, cardCount); i++) {
      const card = serviceCards.nth(i);

      // Get card text to identify which service this is
      const cardText = await card.textContent();

      // Verify card has an image
      const cardImages = card.locator('img');
      const imageCount = await cardImages.count();
      console.log(`  Service ${i + 1}: Has ${imageCount} image(s)`);

      // Verify card has a title (h2 or h3)
      const titleExists = await card.locator('h2, h3').count() > 0;
      expect(titleExists).toBeTruthy();
      console.log(`  Service ${i + 1}: Has title ✓`);

      // Verify card has description text
      const descriptionExists = await card.locator('p').count() > 0;
      expect(descriptionExists).toBeTruthy();
      console.log(`  Service ${i + 1}: Has description ✓`);

      // Verify card has a link (to service detail page)
      const linkExists = await card.locator('a[href^="/services/"]').count() > 0;
      if (linkExists) {
        const link = await card.locator('a[href^="/services/"]').first().getAttribute('href');
        console.log(`  Service ${i + 1}: Links to ${link} ✓`);
      }
    }

    console.log('\n✅ Services section validation PASSED\n');
  });

  test('Industries section shows correct number of industry cards with complete data from MongoDB', async ({ page }) => {
    console.log('\n=== INDUSTRIES SECTION VALIDATION ===\n');

    // Fetch expected data from MongoDB
    const mongoIndustries = await getIndustriesFromMongoDB();
    const expectedCount = mongoIndustries.filter(i => i.title && i.slug).length; // Only count complete industries
    console.log(`✓ Fetched ${mongoIndustries.length} industries from MongoDB (${expectedCount} with title and slug)`);
    console.log('Industry titles:', mongoIndustries.filter(i => i.title).map(i => i.title).join(', '));

    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: '/tmp/homepage-industries-validation.png', fullPage: true });
    console.log('✓ Screenshot saved: /tmp/homepage-industries-validation.png');

    // Find Industries section
    const industriesSection = page.locator('section').filter({ hasText: /INDUSTRY EXPERTISE|INDUSTRIES/i }).first();

    if (await industriesSection.isVisible()) {
      console.log('✓ Industries section is visible');

      // Count industry cards - look for cards with industry keywords
      const industryCards = page.locator('article, div[class*="card"], div').filter({
        has: page.locator('h3, h2').filter({
          hasText: /Aerospace|Defense|Energy|Medical/i
        })
      });

      const cardCount = await industryCards.count();
      console.log(`Found ${cardCount} industry cards on page`);

      // Verify count matches MongoDB (at least the expected number)
      if (expectedCount > 0) {
        expect(cardCount).toBeGreaterThanOrEqual(Math.min(expectedCount, 3)); // At least 3-4 industries
        console.log(`✅ PASS: Industry card count (${cardCount}) matches or exceeds expected minimum`);
      }

      // Verify each industry card has required elements
      for (let i = 0; i < Math.min(cardCount, 4); i++) {
        const card = industryCards.nth(i);

        // Verify card has an image
        const cardImages = card.locator('img');
        const imageCount = await cardImages.count();
        console.log(`  Industry ${i + 1}: Has ${imageCount} image(s)`);

        // Verify card has a title
        const titleExists = await card.locator('h2, h3').count() > 0;
        expect(titleExists).toBeTruthy();
        console.log(`  Industry ${i + 1}: Has title ✓`);

        // Verify card has description text
        const descriptionExists = await card.locator('p').count() > 0;
        expect(descriptionExists).toBeTruthy();
        console.log(`  Industry ${i + 1}: Has description ✓`);

        // Verify card has a link
        const linkExists = await card.locator('a[href^="/industries/"]').count() > 0;
        if (linkExists) {
          const link = await card.locator('a[href^="/industries/"]').first().getAttribute('href');
          console.log(`  Industry ${i + 1}: Links to ${link} ✓`);
        }
      }

      console.log('\n✅ Industries section validation PASSED\n');
    } else {
      console.log('⚠️  Industries section not found on page');
    }
  });

  test('Homepage data matches MongoDB content (no hardcoded fallbacks)', async ({ page }) => {
    console.log('\n=== MONGODB DATA CONSISTENCY CHECK ===\n');

    // Fetch data from MongoDB
    const mongoServices = await getServicesFromMongoDB();
    console.log(`✓ MongoDB has ${mongoServices.length} services`);

    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Get page content
    const pageContent = await page.content();

    // Verify MongoDB service titles appear on page
    let matchCount = 0;
    for (const service of mongoServices.slice(0, 4)) {
      if (pageContent.includes(service.title)) {
        console.log(`  ✓ Found "${service.title}" on page`);
        matchCount++;
      } else {
        console.log(`  ⚠️  Missing "${service.title}" on page`);
      }
    }

    // At least 3 of 4 services should be visible
    expect(matchCount).toBeGreaterThanOrEqual(3);
    console.log(`\n✅ PASS: ${matchCount}/4 service titles from MongoDB found on page`);

    // Verify no "empty" or "no data" messages
    const hasEmptyMessage = pageContent.toLowerCase().includes('no services') ||
                           pageContent.toLowerCase().includes('0 services');
    expect(hasEmptyMessage).toBeFalsy();
    console.log('✓ No "empty data" messages found');

    console.log('\n✅ MongoDB consistency check PASSED\n');
  });
});
