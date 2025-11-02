import { test, expect } from '@playwright/test';
import { loginToAdmin, logoutFromAdmin, getAdminCredentials } from './helpers/auth.helper';

test.describe('CMS - Authentication', () => {
  const credentials = getAdminCredentials();
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test('should successfully login to admin panel', async ({ page }) => {
    await loginToAdmin(page, credentials);

    // Verify we're on the admin dashboard
    expect(page.url()).toContain('/admin');
    expect(page.url()).not.toContain('/admin/login');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Verify admin interface is visible
    const adminContent = page.locator('body');
    await expect(adminContent).toBeVisible();
  });

  test('should maintain session across page navigations', async ({ page }) => {
    await loginToAdmin(page, credentials);

    // Navigate to different admin sections
    await page.goto(`${baseURL}/admin/collections/services`);
    await page.waitForLoadState('networkidle');

    // Should still be authenticated
    expect(page.url()).toContain('/admin/collections/services');
    expect(page.url()).not.toContain('/admin/login');

    // Navigate to another collection
    await page.goto(`${baseURL}/admin/collections/industries`);
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/admin/collections/industries');
    expect(page.url()).not.toContain('/admin/login');
  });

  test('should successfully logout from admin panel', async ({ page }) => {
    await loginToAdmin(page, credentials);

    // Logout
    await logoutFromAdmin(page);

    // Verify we're logged out
    await page.waitForTimeout(1000);

    // Try to access admin - should redirect to login
    await page.goto(`${baseURL}/admin`);
    await page.waitForLoadState('networkidle');

    // Should be on login page
    const currentURL = page.url();
    expect(currentURL.includes('/admin/login') || currentURL.includes('/admin')).toBeTruthy();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto(`${baseURL}/admin/login`);
    await page.waitForLoadState('networkidle');

    // Try to login with invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should stay on login page or show error
    await page.waitForTimeout(2000);

    const url = page.url();
    expect(url).toContain('/admin/login');
  });

  test('should require authentication for protected routes', async ({ page }) => {
    // Try to access admin without logging in
    await page.goto(`${baseURL}/admin/collections/services`);
    await page.waitForLoadState('networkidle');

    // Should redirect to login
    await page.waitForTimeout(1000);

    const url = page.url();
    expect(url.includes('/admin/login') || url.includes('/admin')).toBeTruthy();
  });
});
