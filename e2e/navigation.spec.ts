import { test, expect } from '@playwright/test';

test.describe('Navigation & Route Tests', () => {
  const routes = {
    main: [
      { path: '/', name: 'Homepage' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
    ],
    services: [
      { path: '/services', name: 'Services' },
      { path: '/services/5-axis-machining', name: '5-Axis Machining' },
      { path: '/services/adaptive-machining', name: 'Adaptive Machining' },
      { path: '/services/metrology', name: 'Metrology' },
      { path: '/services/engineering', name: 'Engineering' },
    ],
    industries: [
      { path: '/industries', name: 'Industries' },
      { path: '/industries/aerospace', name: 'Aerospace' },
      { path: '/industries/defense', name: 'Defense' },
      { path: '/industries/energy', name: 'Energy' },
    ],
    resources: [
      { path: '/resources', name: 'Resources' },
      { path: '/resources/manufacturing-processes', name: 'Manufacturing Processes' },
      { path: '/resources/material-science', name: 'Material Science' },
      { path: '/resources/quality-compliance', name: 'Quality & Compliance' },
      { path: '/resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide', name: 'Sample Article' },
    ],
    compliance: [
      { path: '/compliance/terms', name: 'Terms' },
      { path: '/compliance/supplier-requirements', name: 'Supplier Requirements' },
    ],
  };

  const allRoutes = [
    ...routes.main,
    ...routes.services,
    ...routes.industries,
    ...routes.resources,
    ...routes.compliance,
  ];

  // Test all routes load successfully
  for (const route of allRoutes) {
    test(`${route.name} (${route.path}) loads`, async ({ page }) => {
      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBeLessThan(400);

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
      expect(content!.length).toBeGreaterThan(100);
    });
  }

  // Test 404 handling
  test('404 page works', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
  });

  // Test navigation links work
  test('Homepage links navigate correctly', async ({ page }) => {
    await page.goto('/');

    // Click About link
    await page.click('a[href="/about"]');
    await page.waitForURL('/about');
    expect(page.url()).toContain('/about');

    // Go back and click Services
    await page.goto('/');
    await page.click('a[href="/services"]');
    await page.waitForURL('/services');
    expect(page.url()).toContain('/services');
  });
});
