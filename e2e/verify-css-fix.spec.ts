import { test } from '@playwright/test';

test('Verify admin CSS is applied', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000/admin/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="email"]').fill('jt.connor88@gmail.com');
  await page.locator('input[name="password"]').fill('ChainBlockM1!');
  await page.locator('button:has-text("Login")').click();
  await page.waitForURL('**/admin');
  await page.waitForLoadState('networkidle');

  // Go directly to a service edit page
  await page.goto('http://localhost:3000/admin/collections/services/69030353f0d205b6f5595aed');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({
    path: '/tmp/admin-css-verification.png',
    fullPage: true
  });
});
