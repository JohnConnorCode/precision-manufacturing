import { test, expect } from '@playwright/test';

test('check actual admin content is displayed', async ({ page }) => {
  console.log('\n=== LOGGING IN ===');

  await page.goto('http://localhost:3000/admin');
  await page.waitForTimeout(2000);

  // Login
  await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
  await page.fill('input[name="password"]', 'ChainBlockM1!');
  await page.click('button[type="submit"]');

  await page.waitForTimeout(5000);

  const url = page.url();
  console.log('Current URL:', url);

  // Take screenshot of dashboard
  await page.screenshot({ path: '/tmp/admin-dashboard.png', fullPage: true });
  console.log('Dashboard screenshot: /tmp/admin-dashboard.png');

  // Try to navigate directly to Services collection
  console.log('\n=== NAVIGATING TO SERVICES COLLECTION ===');
  await page.goto('http://localhost:3000/admin/collections/services');
  await page.waitForTimeout(3000);

  // Get the full HTML
  const html = await page.content();

  // Check for actual service names in the HTML
  const has5Axis = html.includes('5-Axis') || html.includes('5 Axis');
  const hasAdaptive = html.includes('Adaptive');
  const hasMetrology = html.includes('Metrology');
  const hasCNC = html.includes('CNC');

  console.log('\n=== SERVICES PAGE CONTENT CHECK ===');
  console.log('Has "5-Axis":', has5Axis);
  console.log('Has "Adaptive":', hasAdaptive);
  console.log('Has "Metrology":', hasMetrology);
  console.log('Has "CNC":', hasCNC);

  // Check for empty state messages
  const hasNoResults = html.includes('No Services') ||
                        html.includes('No results') ||
                        html.includes('no documents found') ||
                        html.includes('Create your first');
  console.log('Shows empty state:', hasNoResults);

  // Take screenshot of services page
  await page.screenshot({ path: '/tmp/admin-services.png', fullPage: true });
  console.log('\nServices page screenshot: /tmp/admin-services.png');

  // Get visible text on page
  const bodyText = await page.textContent('body');

  if (has5Axis || hasAdaptive || hasMetrology) {
    console.log('\n✅ SUCCESS: Services collection shows actual data!');
  } else if (hasNoResults) {
    console.log('\n❌ FAILURE: Services collection is EMPTY');
  } else {
    console.log('\n⚠️  UNCLEAR: Cannot determine if data is showing');
    console.log('\nFirst 1000 chars of visible text:');
    console.log(bodyText?.substring(0, 1000));
  }
});
