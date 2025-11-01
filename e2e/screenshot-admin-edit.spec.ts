import { test, expect } from '@playwright/test';

test.describe('Admin Edit Page Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Login to admin
    await page.goto('http://localhost:3000/admin/login');
    await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
    await page.fill('input[name="password"]', 'ChainBlockM1!');
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/admin');
  });

  test('screenshot service edit page', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/collections/services');
    await page.waitForLoadState('networkidle');

    // Click the first service row to edit
    const firstService = page.locator('table tbody tr').first();
    await firstService.click();

    // Wait for navigation to edit page
    await page.waitForURL('**/admin/collections/services/**', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshot of edit page
    await page.screenshot({
      path: '/tmp/admin-service-edit.png',
      fullPage: true
    });
  });

  test('screenshot navigation global edit page', async ({ page }) => {
    // Go to navigation global directly
    await page.goto('http://localhost:3000/admin/globals/navigation');
    await page.waitForLoadState('networkidle');

    // Check if we got redirected to login
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      // Login again if session was lost
      await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
      await page.fill('input[name="password"]', 'ChainBlockM1!');
      await page.click('button:has-text("Login")');
      await page.waitForURL('**/admin/globals/navigation', { timeout: 10000 });
      await page.waitForLoadState('networkidle');
    }

    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: '/tmp/admin-navigation-edit.png',
      fullPage: true
    });
  });
});
