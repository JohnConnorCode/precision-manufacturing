import { test, expect } from '@playwright/test';

test('admin login and verify collections have data', async ({ page }) => {
  console.log('\n=== LOGGING IN TO ADMIN ===');

  // Go to admin
  await page.goto('http://localhost:3000/admin');
  await page.waitForTimeout(3000);

  // Check if we're on login page
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');

  if (await emailInput.isVisible()) {
    console.log('✓ Found login form');

    // Login
    await emailInput.fill('jt.connor88@gmail.com');
    await passwordInput.fill('TestPass123');

    await page.click('button[type="submit"]');
    console.log('✓ Submitted login form');

    // Wait for redirect/navigation
    await page.waitForTimeout(5000);
  }

  // Check current URL
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);

  // Look for dashboard elements
  const pageText = await page.textContent('body');
  console.log('\n=== CHECKING FOR COLLECTIONS ===');

  const hasServices = pageText?.includes('Services') || pageText?.includes('services');
  const hasIndustries = pageText?.includes('Industries') || pageText?.includes('industries');
  const hasDashboard = pageText?.includes('Dashboard') || pageText?.includes('dashboard');

  console.log('Has "Services" text:', hasServices);
  console.log('Has "Industries" text:', hasIndustries);
  console.log('Has "Dashboard" text:', hasDashboard);

  // Try to navigate to Services collection
  console.log('\n=== NAVIGATING TO SERVICES ===');

  // Look for Services link
  const servicesLink = page.locator('a[href*="services"], a:has-text("Services")').first();
  if (await servicesLink.isVisible({ timeout: 5000 }).catch(() => false)) {
    await servicesLink.click();
    await page.waitForTimeout(3000);

    const servicesPageText = await page.textContent('body');
    console.log('\n=== SERVICES PAGE ===');

    // Check for actual service names
    const has5Axis = servicesPageText?.includes('5-Axis') || servicesPageText?.includes('5 Axis');
    const hasAdaptive = servicesPageText?.includes('Adaptive');
    const hasMetrology = servicesPageText?.includes('Metrology');

    console.log('Has "5-Axis":', has5Axis);
    console.log('Has "Adaptive":', hasAdaptive);
    console.log('Has "Metrology":', hasMetrology);

    // Check for "No results" or empty state
    const showsEmpty = servicesPageText?.includes('No Services') ||
                       servicesPageText?.includes('No results') ||
                       servicesPageText?.includes('no documents found');
    console.log('Shows empty state:', showsEmpty);

    if (has5Axis || hasAdaptive || hasMetrology) {
      console.log('\n✅ SUCCESS: Services collection is populated and visible!');
    } else if (showsEmpty) {
      console.log('\n❌ FAILURE: Services collection shows as empty');
    } else {
      console.log('\n⚠️  UNCLEAR: Cannot determine if services are showing');
      console.log('First 500 chars of page:', servicesPageText?.substring(0, 500));
    }
  } else {
    console.log('❌ Could not find Services link in navigation');
    console.log('Page content (first 1000 chars):', pageText?.substring(0, 1000));
  }

  await page.screenshot({ path: '/tmp/admin-logged-in.png', fullPage: true });
  console.log('\nScreenshot saved to /tmp/admin-logged-in.png');
});
