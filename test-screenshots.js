const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
  // Create screenshots directory
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // List of pages to capture
  const pages = [
    { path: '/', name: 'home' },
    { path: '/services', name: 'services' },
    { path: '/services/5-axis-machining', name: '5-axis-machining' },
    { path: '/services/adaptive-machining', name: 'adaptive-machining' },
    { path: '/services/metrology', name: 'metrology' },
    { path: '/services/engineering', name: 'engineering' },
    { path: '/about', name: 'about' },
    { path: '/contact', name: 'contact' },
    { path: '/industries', name: 'industries' },
    { path: '/industries/aerospace', name: 'aerospace' },
    { path: '/industries/defense', name: 'defense' },
    { path: '/industries/energy', name: 'energy' }
  ];

  const baseUrl = 'http://localhost:3000';

  for (const pageInfo of pages) {
    console.log(`Capturing ${pageInfo.name}...`);

    try {
      // Navigate to page
      await page.goto(baseUrl + pageInfo.path, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for animations to complete
      await page.waitForTimeout(2000);

      // Capture full page screenshot
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-full.png`),
        fullPage: true
      });

      // Capture viewport screenshot
      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-viewport.png`)
      });

      // Mobile viewport
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(500);

      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-mobile.png`)
      });

      // Reset to desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      console.log(`✓ ${pageInfo.name} captured successfully`);
    } catch (error) {
      console.error(`✗ Error capturing ${pageInfo.name}:`, error.message);
    }
  }

  // Test specific elements
  console.log('\nTesting specific elements...');

  // Check homepage hero images
  await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const heroImages = await page.$$eval('.bg-background-slider img', imgs =>
    imgs.map(img => ({
      src: img.src,
      loaded: img.complete && img.naturalHeight !== 0
    }))
  );

  const servicesImages = await page.$$eval('section img', imgs =>
    imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      loaded: img.complete && img.naturalHeight !== 0
    }))
  );

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    url: baseUrl,
    pages: pages.length,
    heroImages: heroImages.length,
    totalImages: servicesImages.length,
    imagesLoaded: servicesImages.filter(img => img.loaded).length,
    imagesFailed: servicesImages.filter(img => !img.loaded).length,
    failedImages: servicesImages.filter(img => !img.loaded)
  };

  // Save report
  fs.writeFileSync(
    path.join(screenshotDir, 'test-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n=== Test Report ===');
  console.log(`Pages tested: ${report.pages}`);
  console.log(`Total images found: ${report.totalImages}`);
  console.log(`Images loaded: ${report.imagesLoaded}`);
  console.log(`Images failed: ${report.imagesFailed}`);

  if (report.imagesFailed > 0) {
    console.log('\nFailed images:');
    report.failedImages.forEach(img => {
      console.log(`  - ${img.alt || 'No alt'}: ${img.src}`);
    });
  }

  await browser.close();
  console.log('\n✓ All screenshots captured in ./screenshots/');
}

// Run the test
captureScreenshots().catch(console.error);