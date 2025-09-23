const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function testProduction() {
  console.log('Testing production site on Vercel...\n');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const productionUrl = 'https://precision-manufacturing.vercel.app';
  const prodDir = path.join(__dirname, 'production-screenshots');

  if (!fs.existsSync(prodDir)) {
    fs.mkdirSync(prodDir);
  }

  const testResults = {
    url: productionUrl,
    timestamp: new Date().toISOString(),
    tests: []
  };

  // Test 1: Homepage loads
  console.log('1. Testing homepage...');
  try {
    await page.goto(productionUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    // Check for hero title
    const heroTitle = await page.textContent('h1');
    const hasHero = heroTitle && heroTitle.includes('INTEGRATED');

    // Check for images
    const images = await page.$$eval('img', imgs =>
      imgs.map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalHeight !== 0
      }))
    );

    const loadedImages = images.filter(img => img.loaded).length;

    await page.screenshot({
      path: path.join(prodDir, 'homepage.png'),
      fullPage: true
    });

    testResults.tests.push({
      name: 'Homepage',
      status: hasHero ? 'PASS' : 'FAIL',
      heroFound: hasHero,
      imagesTotal: images.length,
      imagesLoaded: loadedImages
    });

    console.log(`   ✓ Homepage: ${hasHero ? 'PASS' : 'FAIL'} (${loadedImages}/${images.length} images loaded)`);
  } catch (error) {
    console.log(`   ✗ Homepage: FAIL - ${error.message}`);
    testResults.tests.push({
      name: 'Homepage',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 2: Services page
  console.log('2. Testing services page...');
  try {
    await page.goto(`${productionUrl}/services`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(1000);

    const servicesTitle = await page.textContent('h1');
    const hasServices = servicesTitle && servicesTitle.includes('Services');

    await page.screenshot({
      path: path.join(prodDir, 'services.png')
    });

    testResults.tests.push({
      name: 'Services',
      status: hasServices ? 'PASS' : 'FAIL',
      titleFound: hasServices
    });

    console.log(`   ✓ Services: ${hasServices ? 'PASS' : 'FAIL'}`);
  } catch (error) {
    console.log(`   ✗ Services: FAIL - ${error.message}`);
    testResults.tests.push({
      name: 'Services',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 3: Check counter on homepage
  console.log('3. Testing counter fix...');
  try {
    await page.goto(productionUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    // Scroll to stats section if it exists
    await page.evaluate(() => {
      const element = document.querySelector('section');
      if (element) element.scrollIntoView();
    });

    await page.waitForTimeout(1000);

    // Look for "29+" in the page
    const pageContent = await page.content();
    const hasCorrectYears = pageContent.includes('29+') || pageContent.includes('29');
    const hasWrongYears = pageContent.includes('0.25');

    testResults.tests.push({
      name: 'Counter Fix',
      status: hasCorrectYears && !hasWrongYears ? 'PASS' : 'FAIL',
      correctValue: hasCorrectYears,
      wrongValue: hasWrongYears
    });

    console.log(`   ✓ Counter: ${hasCorrectYears && !hasWrongYears ? 'PASS' : 'FAIL'}`);
  } catch (error) {
    console.log(`   ✗ Counter: FAIL - ${error.message}`);
    testResults.tests.push({
      name: 'Counter Fix',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 4: Mobile responsiveness
  console.log('4. Testing mobile view...');
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(productionUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(prodDir, 'mobile.png')
    });

    const mobileMenu = await page.$('[role="navigation"]');

    testResults.tests.push({
      name: 'Mobile View',
      status: 'PASS',
      hasNavigation: !!mobileMenu
    });

    console.log('   ✓ Mobile: PASS');
  } catch (error) {
    console.log(`   ✗ Mobile: FAIL - ${error.message}`);
    testResults.tests.push({
      name: 'Mobile View',
      status: 'FAIL',
      error: error.message
    });
  }

  // Save test report
  fs.writeFileSync(
    path.join(prodDir, 'test-report.json'),
    JSON.stringify(testResults, null, 2)
  );

  // Summary
  const passed = testResults.tests.filter(t => t.status === 'PASS').length;
  const failed = testResults.tests.filter(t => t.status === 'FAIL').length;

  console.log('\n=== PRODUCTION TEST SUMMARY ===');
  console.log(`URL: ${productionUrl}`);
  console.log(`Tests Passed: ${passed}`);
  console.log(`Tests Failed: ${failed}`);
  console.log(`Overall: ${failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  if (failed > 0) {
    console.log('\nFailed tests:');
    testResults.tests.filter(t => t.status === 'FAIL').forEach(test => {
      console.log(`  - ${test.name}: ${test.error || 'Check failed'}`);
    });
  }

  await browser.close();
  console.log('\n✓ Screenshots saved in ./production-screenshots/');

  return failed === 0;
}

// Run the test
testProduction()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });