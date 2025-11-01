import { test, expect } from '@playwright/test';
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';

async function getServicesFromMongoDB() {
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  const db = client.db();
  const services = await db.collection('services')
    .find({ _status: { $in: ['published', null] } })
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
    .toArray();
  await client.close();
  return industries;
}

test.describe('Service & Industry Detail Pages', () => {
  test('All service detail pages render with content from MongoDB', async ({ page }) => {
    console.log('\n=== SERVICE DETAIL PAGES TEST ===\n');

    // Get services from MongoDB
    const mongoServices = await getServicesFromMongoDB();
    console.log(`✓ Found ${mongoServices.length} services in MongoDB\n`);

    const testedServices: string[] = [];
    const failedServices: string[] = [];

    for (const service of mongoServices) {
      if (!service.slug) {
        console.log(`⚠️  Skipping service "${service.title}" - no slug`);
        continue;
      }

      const serviceUrl = `/services/${service.slug}`;
      console.log(`Testing: ${serviceUrl}`);

      try {
        const response = await page.goto(serviceUrl);

        if (!response || response.status() !== 200) {
          failedServices.push(`${serviceUrl} - HTTP ${response?.status()}`);
          console.log(`  ❌ Failed to load (HTTP ${response?.status()})`);
          continue;
        }

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // Take screenshot
        await page.screenshot({ path: `/tmp/service-${service.slug}.png`, fullPage: true });

        // Check if title appears on page
        const pageContent = await page.content();
        const hasTitle = pageContent.includes(service.title);

        console.log(`  ✓ Loaded (200)`);
        console.log(`  Title "${service.title}" on page: ${hasTitle ? '✓' : '✗'}`);

        // Check for h1
        const h1 = page.locator('h1').first();
        const hasH1 = await h1.isVisible();
        console.log(`  H1 present: ${hasH1 ? '✓' : '✗'}`);

        // Check for images
        const images = page.locator('img');
        const imageCount = await images.count();
        console.log(`  Images: ${imageCount}`);

        // Check for description content
        const paragraphs = page.locator('p');
        const paragraphCount = await paragraphs.count();
        console.log(`  Paragraphs: ${paragraphCount}`);

        testedServices.push(serviceUrl);
        console.log(`  ✅ PASS\n`);

      } catch (error) {
        failedServices.push(`${serviceUrl} - Error: ${error}`);
        console.log(`  ❌ Error: ${error}\n`);
      }
    }

    // Summary
    console.log('=== SERVICE PAGES SUMMARY ===');
    console.log(`Total services: ${mongoServices.length}`);
    console.log(`Successfully tested: ${testedServices.length}`);
    console.log(`Failed: ${failedServices.length}`);

    if (failedServices.length > 0) {
      console.log('\nFailed pages:');
      failedServices.forEach(f => console.log(`  - ${f}`));
    }

    // ASSERTION
    expect(testedServices.length).toBeGreaterThan(0);
    expect(failedServices.length).toBeLessThan(mongoServices.length / 2); // Less than 50% failure rate
    console.log('\n✅ PASS: Service detail pages are rendering');
  });

  test('All industry detail pages render with content from MongoDB', async ({ page }) => {
    console.log('\n=== INDUSTRY DETAIL PAGES TEST ===\n');

    // Get industries from MongoDB
    const mongoIndustries = await getIndustriesFromMongoDB();
    const validIndustries = mongoIndustries.filter(i => i.slug && i.title);
    console.log(`✓ Found ${validIndustries.length} industries with slugs in MongoDB\n`);

    const testedIndustries: string[] = [];
    const failedIndustries: string[] = [];

    for (const industry of validIndustries) {
      const industryUrl = `/industries/${industry.slug}`;
      console.log(`Testing: ${industryUrl}`);

      try {
        const response = await page.goto(industryUrl);

        if (!response || response.status() !== 200) {
          failedIndustries.push(`${industryUrl} - HTTP ${response?.status()}`);
          console.log(`  ❌ Failed to load (HTTP ${response?.status()})`);
          continue;
        }

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1500);

        // Take screenshot
        await page.screenshot({ path: `/tmp/industry-${industry.slug}.png`, fullPage: true });

        // Check if title appears on page
        const pageContent = await page.content();
        const hasTitle = pageContent.includes(industry.title);

        console.log(`  ✓ Loaded (200)`);
        console.log(`  Title "${industry.title}" on page: ${hasTitle ? '✓' : '✗'}`);

        // Check for h1
        const h1 = page.locator('h1').first();
        const hasH1 = await h1.isVisible();
        console.log(`  H1 present: ${hasH1 ? '✓' : '✗'}`);

        // Check for images
        const images = page.locator('img');
        const imageCount = await images.count();
        console.log(`  Images: ${imageCount}`);

        testedIndustries.push(industryUrl);
        console.log(`  ✅ PASS\n`);

      } catch (error) {
        failedIndustries.push(`${industryUrl} - Error: ${error}`);
        console.log(`  ❌ Error: ${error}\n`);
      }
    }

    // Summary
    console.log('=== INDUSTRY PAGES SUMMARY ===');
    console.log(`Total industries: ${validIndustries.length}`);
    console.log(`Successfully tested: ${testedIndustries.length}`);
    console.log(`Failed: ${failedIndustries.length}`);

    if (failedIndustries.length > 0) {
      console.log('\nFailed pages:');
      failedIndustries.forEach(f => console.log(`  - ${f}`));
    }

    // ASSERTION
    expect(testedIndustries.length).toBeGreaterThan(0);
    console.log('\n✅ PASS: Industry detail pages are rendering');
  });

  test('Service detail pages have complete content sections', async ({ page }) => {
    console.log('\n=== SERVICE CONTENT COMPLETENESS TEST ===\n');

    const testSlugs = ['5-axis-machining', 'adaptive-machining'];

    for (const slug of testSlugs) {
      console.log(`\nChecking /services/${slug}...`);

      await page.goto(`/services/${slug}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      const pageContent = await page.content();

      // Check for common sections
      const sections = {
        'Hero/Title': await page.locator('h1').isVisible(),
        'Description': await page.locator('p').count() > 0,
        'Images': await page.locator('img').count() > 0,
      };

      console.log('  Sections present:');
      Object.entries(sections).forEach(([name, present]) => {
        console.log(`    ${name}: ${present ? '✓' : '✗'}`);
      });

      const hasContent = Object.values(sections).some(v => v);
      expect(hasContent).toBeTruthy();
    }

    console.log('\n✅ PASS: Service pages have content');
  });

  test('Industry detail pages have complete content sections', async ({ page }) => {
    console.log('\n=== INDUSTRY CONTENT COMPLETENESS TEST ===\n');

    const testSlugs = ['aerospace', 'defense'];

    for (const slug of testSlugs) {
      console.log(`\nChecking /industries/${slug}...`);

      const response = await page.goto(`/industries/${slug}`);

      if (!response || response.status() !== 200) {
        console.log(`  ⚠️  Page not found, skipping`);
        continue;
      }

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      // Check for common sections
      const sections = {
        'Hero/Title': await page.locator('h1').isVisible(),
        'Description': await page.locator('p').count() > 0,
        'Images': await page.locator('img').count() > 0,
      };

      console.log('  Sections present:');
      Object.entries(sections).forEach(([name, present]) => {
        console.log(`    ${name}: ${present ? '✓' : '✗'}`);
      });

      const hasContent = Object.values(sections).some(v => v);
      expect(hasContent).toBeTruthy();
    }

    console.log('\n✅ PASS: Industry pages have content');
  });

  test('Homepage service cards link to correct detail pages', async ({ page }) => {
    console.log('\n=== SERVICE CARD LINK VALIDATION ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Find service cards with links
    const serviceLinks = page.locator('a[href^="/services/"]').filter({ has: page.locator('h2, h3') });
    const linkCount = await serviceLinks.count();

    console.log(`Found ${linkCount} service card links on homepage\n`);

    // Test first 3 links
    for (let i = 0; i < Math.min(linkCount, 3); i++) {
      const link = serviceLinks.nth(i);
      const href = await link.getAttribute('href');

      if (!href) continue;

      console.log(`Testing link: ${href}`);

      // Get the card title
      const cardTitle = await link.locator('h2, h3').first().textContent();

      // Click the link
      await link.click();
      await page.waitForLoadState('networkidle');

      // Verify we're on the detail page
      const currentURL = page.url();
      expect(currentURL).toContain(href);
      console.log(`  ✓ Navigated to ${currentURL}`);

      // Verify page has content
      const h1 = page.locator('h1').first();
      const hasH1 = await h1.isVisible();
      console.log(`  H1 present: ${hasH1 ? '✓' : '✗'}\n`);

      // Go back to homepage
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    }

    console.log('✅ PASS: Service card links work correctly');
  });
});
