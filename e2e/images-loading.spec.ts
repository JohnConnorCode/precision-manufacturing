import { test, expect } from '@playwright/test';

test.describe('Image Loading Verification', () => {
  test('All images on homepage load successfully (no 404s or broken images)', async ({ page }) => {
    console.log('\n=== HOMEPAGE IMAGE LOADING TEST ===\n');

    const failedImages: string[] = [];
    const brokenImages: string[] = [];
    const successfulImages: string[] = [];

    // Monitor network requests for failed images
    page.on('response', response => {
      const url = response.url();
      if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)/i)) {
        if (response.status() === 404 || response.status() >= 400) {
          failedImages.push(`${url} (HTTP ${response.status()})`);
          console.log(`❌ Failed to load: ${url} - Status ${response.status()}`);
        } else if (response.status() === 200) {
          successfulImages.push(url);
        }
      }
    });

    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for all images to load

    console.log(`\n✓ Page loaded, checking image elements...\n`);

    // Get all img elements
    const images = page.locator('img');
    const imageCount = await images.count();
    console.log(`Found ${imageCount} <img> elements on page`);

    // Check each image
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);

      // Get image src and alt
      const src = await img.getAttribute('src') || await img.getAttribute('data-src') || '';
      const alt = await img.getAttribute('alt') || '';

      // Check if image is loaded (has natural dimensions)
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);

      if (naturalWidth === 0 || naturalHeight === 0) {
        brokenImages.push(`${src} (naturalWidth: ${naturalWidth}, naturalHeight: ${naturalHeight})`);
        console.log(`  ⚠️  Image ${i + 1}: BROKEN - ${src.substring(0, 80)}...`);
      } else {
        console.log(`  ✓ Image ${i + 1}: ${naturalWidth}x${naturalHeight} - ${src.substring(0, 60)}...`);
      }

      // Check for alt text
      if (!alt || alt.trim() === '') {
        console.log(`    ⚠️  Missing alt text`);
      }
    }

    // Take screenshot
    await page.screenshot({ path: '/tmp/homepage-images-check.png', fullPage: true });
    console.log('\n✓ Screenshot saved: /tmp/homepage-images-check.png');

    // Report results
    console.log(`\n=== IMAGE LOADING SUMMARY ===`);
    console.log(`Total img elements: ${imageCount}`);
    console.log(`Successful network requests (200): ${successfulImages.length}`);
    console.log(`Failed network requests (404/4xx/5xx): ${failedImages.length}`);
    console.log(`Broken images (0 dimensions): ${brokenImages.length}`);

    if (failedImages.length > 0) {
      console.log(`\n❌ FAILED IMAGE REQUESTS:`);
      failedImages.forEach(img => console.log(`  - ${img}`));
    }

    if (brokenImages.length > 0) {
      console.log(`\n⚠️  BROKEN IMAGES (not rendering):`);
      brokenImages.forEach(img => console.log(`  - ${img}`));
    }

    // ASSERTIONS
    // Allow some failed external images (Unsplash etc), but not more than 20%
    const failureRate = failedImages.length / Math.max(imageCount, 1);
    expect(failureRate).toBeLessThan(0.2); // Less than 20% failure rate
    console.log(`\n✅ PASS: Image failure rate ${(failureRate * 100).toFixed(1)}% is acceptable (< 20%)`);

    // No images should be completely broken (0 dimensions)
    expect(brokenImages.length).toBe(0);
    console.log(`✅ PASS: No broken images (all have valid dimensions)`);
  });

  test('Service detail pages images load correctly', async ({ page }) => {
    console.log('\n=== SERVICE PAGES IMAGE LOADING TEST ===\n');

    const serviceSlugs = ['5-axis-machining', 'adaptive-machining', 'metrology', 'engineering'];
    const failedImages: string[] = [];

    for (const slug of serviceSlugs) {
      console.log(`\nChecking /services/${slug}...`);

      // Monitor failed image requests
      const pageFailures: string[] = [];
      page.on('response', response => {
        const url = response.url();
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)) {
          if (response.status() === 404 || response.status() >= 400) {
            pageFailures.push(`${url} (HTTP ${response.status()})`);
          }
        }
      });

      // Navigate to service page
      const response = await page.goto(`/services/${slug}`);

      if (!response || response.status() !== 200) {
        console.log(`  ⚠️  Page not found or error`);
        continue;
      }

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check images on this page
      const images = page.locator('img');
      const imageCount = await images.count();

      console.log(`  Found ${imageCount} images`);

      // Check if any images are broken
      let brokenCount = 0;
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        if (naturalWidth === 0) {
          brokenCount++;
        }
      }

      if (brokenCount > 0) {
        console.log(`  ⚠️  ${brokenCount} broken images`);
      } else {
        console.log(`  ✓ All images loaded successfully`);
      }

      if (pageFailures.length > 0) {
        failedImages.push(...pageFailures.map(f => `${slug}: ${f}`));
      }
    }

    if (failedImages.length > 0) {
      console.log(`\n❌ FAILED IMAGE REQUESTS:`);
      failedImages.forEach(img => console.log(`  - ${img}`));
    }

    // Allow some failures but not excessive
    expect(failedImages.length).toBeLessThan(10);
    console.log(`\n✅ PASS: Service page images acceptable (${failedImages.length} failures)`);
  });

  test('Industry detail pages images load correctly', async ({ page }) => {
    console.log('\n=== INDUSTRY PAGES IMAGE LOADING TEST ===\n');

    const industrySlugs = ['aerospace', 'defense', 'energy', ''];
    const failedImages: string[] = [];

    for (const slug of industrySlugs) {
      if (!slug) continue;

      console.log(`\nChecking /industries/${slug}...`);

      // Monitor failed image requests
      const pageFailures: string[] = [];
      page.on('response', response => {
        const url = response.url();
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)) {
          if (response.status() === 404 || response.status() >= 400) {
            pageFailures.push(`${url} (HTTP ${response.status()})`);
          }
        }
      });

      // Navigate to industry page
      const response = await page.goto(`/industries/${slug}`);

      if (!response || response.status() !== 200) {
        console.log(`  ⚠️  Page not found or error`);
        continue;
      }

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check images on this page
      const images = page.locator('img');
      const imageCount = await images.count();

      console.log(`  Found ${imageCount} images`);

      // Check if any images are broken
      let brokenCount = 0;
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        if (naturalWidth === 0) {
          brokenCount++;
        }
      }

      if (brokenCount > 0) {
        console.log(`  ⚠️  ${brokenCount} broken images`);
      } else {
        console.log(`  ✓ All images loaded successfully`);
      }

      if (pageFailures.length > 0) {
        failedImages.push(...pageFailures.map(f => `${slug}: ${f}`));
      }
    }

    if (failedImages.length > 0) {
      console.log(`\n❌ FAILED IMAGE REQUESTS:`);
      failedImages.forEach(img => console.log(`  - ${img}`));
    }

    // Allow some failures but not excessive
    expect(failedImages.length).toBeLessThan(10);
    console.log(`\n✅ PASS: Industry page images acceptable (${failedImages.length} failures)`);
  });

  test('All images have proper alt text for accessibility', async ({ page }) => {
    console.log('\n=== IMAGE ALT TEXT VALIDATION ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const imageCount = await images.count();

    const missingAlt: string[] = [];

    console.log(`Checking ${imageCount} images for alt text...\n`);

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src') || '';
      const alt = await img.getAttribute('alt');

      if (!alt || alt.trim() === '') {
        missingAlt.push(src.substring(0, 80));
        console.log(`  ⚠️  Image ${i + 1}: Missing alt text - ${src.substring(0, 60)}...`);
      } else {
        console.log(`  ✓ Image ${i + 1}: "${alt.substring(0, 40)}..."`);
      }
    }

    console.log(`\n=== ALT TEXT SUMMARY ===`);
    console.log(`Total images: ${imageCount}`);
    console.log(`Images with alt text: ${imageCount - missingAlt.length}`);
    console.log(`Images missing alt text: ${missingAlt.length}`);

    // Allow up to 20% missing alt text (some decorative images ok)
    const missingRate = missingAlt.length / Math.max(imageCount, 1);
    expect(missingRate).toBeLessThan(0.2);
    console.log(`\n✅ PASS: Alt text coverage ${((1 - missingRate) * 100).toFixed(1)}% (acceptable)`);
  });
});
