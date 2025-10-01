import { test, expect } from '@playwright/test';
import { allRoutes, getRoutesByType } from './config/routes';
import { TestHelpers } from './utils/test-helpers';

test.describe('Comprehensive Route Testing', () => {
  /**
   * Test all routes load successfully
   */
  test.describe('Route Loading', () => {
    for (const route of allRoutes) {
      test(`${route.name} (${route.path}) loads successfully`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await helpers.validateRouteLoads(route);
      });
    }
  });

  /**
   * Test all routes have expected content
   */
  test.describe('Content Validation', () => {
    for (const route of allRoutes.filter(r => r.type !== 'studio')) {
      test(`${route.name} has expected content`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await page.goto(route.path);
        await helpers.validateContent(route);
      });
    }
  });

  /**
   * Test all routes have required HTML elements
   */
  test.describe('Required Elements', () => {
    for (const route of allRoutes.filter(r => r.requiredElements && r.requiredElements.length > 0)) {
      test(`${route.name} has required elements`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await page.goto(route.path);
        await helpers.validateRequiredElements(route);
      });
    }
  });

  /**
   * Test SEO meta tags on all routes
   */
  test.describe('SEO Meta Tags', () => {
    for (const route of allRoutes.filter(r => r.requiredMetaTags)) {
      test(`${route.name} has correct meta tags`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await page.goto(route.path);
        await helpers.validateMetaTags(route);
      });
    }
  });

  /**
   * Test structured data on pages
   */
  test.describe('Structured Data', () => {
    const pagesWithStructuredData = getRoutesByType('page').filter(r => r.path === '/' || r.path === '/about');

    for (const route of pagesWithStructuredData) {
      test(`${route.name} has valid structured data`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await page.goto(route.path);
        await helpers.validateStructuredData();
      });
    }
  });

  /**
   * Test images on all routes
   */
  test.describe('Image Validation', () => {
    const routesWithImages = [
      ...allRoutes.filter(r => r.path === '/'),
      ...allRoutes.filter(r => r.path.startsWith('/industries')),
      ...allRoutes.filter(r => r.path.startsWith('/services')),
    ];

    for (const route of routesWithImages) {
      test(`${route.name} images load correctly`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await page.goto(route.path, { waitUntil: 'networkidle' });
        await helpers.validateImages();
      });
    }
  });

  /**
   * Comprehensive validation on key pages
   */
  test.describe('Full Page Validation', () => {
    const keyPages = allRoutes.filter(r =>
      ['/', '/about', '/services', '/industries', '/contact'].includes(r.path)
    );

    for (const route of keyPages) {
      test(`${route.name} passes comprehensive validation`, async ({ page }) => {
        const helpers = new TestHelpers(page);
        await helpers.validatePage(route);
      });
    }
  });

  /**
   * Test 404 handling
   */
  test('404 page returns correct status', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');
    expect(response?.status()).toBe(404);
  });

  /**
   * Test no console errors on key pages
   */
  test.describe('Console Error Check', () => {
    const criticalPages = ['/', '/about', '/contact'];

    for (const path of criticalPages) {
      test(`${path} loads without console errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });

        await page.goto(path);
        await page.waitForLoadState('networkidle');

        expect(errors, `Console errors found on ${path}: ${JSON.stringify(errors)}`).toHaveLength(0);
      });
    }
  });
});
