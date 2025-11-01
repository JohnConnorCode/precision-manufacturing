import { test } from '@playwright/test';

test('Capture admin edit pages for debugging', async ({ page }) => {
  // Go directly to login
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Login
  await page.locator('input[name="email"]').fill('jt.connor88@gmail.com');
  await page.locator('input[name="password"]').fill('ChainBlockM1!');
  await page.locator('button:has-text("Login")').click();

  // Wait for dashboard
  await page.waitForURL('**/admin', { timeout: 15000 });
  await page.waitForTimeout(2000);

  // Go to services list
  await page.goto('http://localhost:3000/admin/collections/services');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Get the first service ID from the URL after clicking
  const rows = await page.locator('table tbody tr').all();
  if (rows.length > 0) {
    await rows[0].click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Capture edit page
    await page.screenshot({
      path: '/tmp/admin-edit-service-DEBUG.png',
      fullPage: true
    });
  }
});
