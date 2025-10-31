import { test, expect } from '@playwright/test';

test('Test admin login and dashboard access', async ({ page }) => {
  const errors: string[] = [];

  page.on('pageerror', error => {
    errors.push(error.message);
  });

  // Go to login page
  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Verify login form exists
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();

  console.log('✅ Login form loaded');

  // Try to access dashboard without login (should redirect to login)
  await page.goto('https://precision-manufacturing.vercel.app/admin', {
    waitUntil: 'networkidle'
  });

  const currentUrl = page.url();
  console.log(`Current URL after trying to access /admin: ${currentUrl}`);

  // Check if we can see the collections/dashboard
  const bodyText = await page.textContent('body');

  if (bodyText?.includes('Collections') || bodyText?.includes('Dashboard')) {
    console.log('✅ Admin dashboard is accessible');
  } else if (currentUrl.includes('/login')) {
    console.log('⚠️  Redirected to login (expected - need credentials)');
  } else {
    console.log('❌ Unexpected state');
    console.log('Body preview:', bodyText?.substring(0, 200));
  }

  // Take screenshot
  await page.screenshot({ path: 'admin-dashboard-test.png', fullPage: true });

  console.log('\nErrors encountered:', errors.length > 0 ? errors : 'None');
});
