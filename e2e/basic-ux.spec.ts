import { test, expect } from '@playwright/test';

test.describe('Basic UX Tests', () => {
  test('homepage loads with header, main content, and footer', async ({ page }) => {
    await page.goto('/');

    // Check basic structure exists
    const html = await page.content();
    expect(html).toContain('<header');
    expect(html).toContain('<main');
    expect(html).toContain('<footer');
    expect(html).toContain('INTEGRATED');
    expect(html).toContain('INSPECTION');
    expect(html).toContain('SYSTEMS');
  });

  test('all main routes return 200', async ({ page }) => {
    const routes = [
      '/', '/about', '/contact', '/services', '/industries', '/resources'
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);
    }
  });

  test('pages have correct titles', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/IIS/);

    await page.goto('/about');
    await expect(page).toHaveTitle(/IIS/);
  });
});
