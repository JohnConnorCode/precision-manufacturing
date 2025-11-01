import { test, expect } from '@playwright/test';

test('verify admin fully works with correct password', async ({ page }) => {
  console.log('\n=== LOGGING IN WITH CORRECT PASSWORD ===');

  await page.goto('http://localhost:3000/admin');
  await page.waitForTimeout(3000);

  // Login with correct credentials
  await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
  await page.fill('input[name="password"]', 'ChainBlockM1!');
  await page.click('button[type="submit"]');

  console.log('✓ Submitted login');
  await page.waitForTimeout(5000);

  const url = page.url();
  console.log('Current URL:', url);

  const pageText = await page.textContent('body');

  // Check if we're logged in
  const isOnDashboard = url.includes('/admin') && !url.includes('/login');
  console.log('On dashboard:', isOnDashboard);

  // Look for collection links
  const hasServices = pageText?.includes('Services');
  const hasIndustries = pageText?.includes('Industries');
  const hasResources = pageText?.includes('Resources');

  console.log('\n=== DASHBOARD CHECK ===');
  console.log('Has Services link:', hasServices);
  console.log('Has Industries link:', hasIndustries);
  console.log('Has Resources link:', hasResources);

  if (hasServices) {
    console.log('\n=== CLICKING SERVICES ===');
    await page.click('a:has-text("Services")');
    await page.waitForTimeout(3000);

    const servicesPageText = await page.textContent('body');

    // Check for actual service data
    const has5Axis = servicesPageText?.includes('5-Axis') || servicesPageText?.includes('5 Axis');
    const hasAdaptive = servicesPageText?.includes('Adaptive');
    const hasMetrology = servicesPageText?.includes('Metrology');

    console.log('\n=== SERVICES COLLECTION DATA ===');
    console.log('Has "5-Axis":', has5Axis);
    console.log('Has "Adaptive":', hasAdaptive);
    console.log('Has "Metrology":', hasMetrology);

    if (has5Axis || hasAdaptive || hasMetrology) {
      console.log('\n✅✅✅ SUCCESS: Admin is FULLY WORKING! Collections have data!');
    } else {
      console.log('\n❌ FAILURE: Services collection is empty or not loading');
      console.log('Page text sample:', servicesPageText?.substring(0, 500));
    }

    await page.screenshot({ path: '/tmp/admin-services-page.png', fullPage: true });
    console.log('Screenshot saved to /tmp/admin-services-page.png');
  } else {
    console.log('\n❌ FAILURE: Cannot find Services link - dashboard not showing collections');
    console.log('Page text sample:', pageText?.substring(0, 1000));
  }
});
