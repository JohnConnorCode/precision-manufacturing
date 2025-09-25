import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');

    // Check that Next.js Image optimization is working
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');

      // Next.js optimized images should use _next/image
      if (src && !src.startsWith('data:') && !src.startsWith('http')) {
        expect(src).toContain('_next/image');
      }
    }
  });

  test('should have proper cache headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();

    // Check cache control headers
    expect(headers?.['cache-control']).toBeDefined();
  });

  test('should lazy load below-the-fold content', async ({ page }) => {
    await page.goto('/');

    // Check that animations are present (indicates lazy loading)
    const animatedElements = page.locator('[style*="opacity: 0"]');
    const count = await animatedElements.count();

    // Should have some elements waiting to animate in
    expect(count).toBeGreaterThan(0);
  });

  test('should have minimal JavaScript bundle size', async ({ page }) => {
    const coverage = await page.coverage.startJSCoverage();
    await page.goto('/');
    const jsCoverage = await page.coverage.stopJSCoverage();

    const totalBytes = jsCoverage.reduce((total, entry) => {
      return total + (entry.source?.length || 0);
    }, 0);

    // JavaScript should be under 500KB
    expect(totalBytes).toBeLessThan(500 * 1024);
  });

  test('should have optimized CSS', async ({ page }) => {
    const coverage = await page.coverage.startCSSCoverage();
    await page.goto('/');
    const cssCoverage = await page.coverage.stopCSSCoverage();

    const totalBytes = cssCoverage.reduce((total, entry) => {
      return total + (entry.text?.length || 0);
    }, 0);

    // CSS should be under 100KB
    expect(totalBytes).toBeLessThan(100 * 1024);
  });

  test('should handle slow network gracefully', async ({ page, browserName }) => {
    // Skip this test in WebKit as it doesn't support CDP
    test.skip(browserName === 'webkit', 'WebKit does not support CDP');

    const client = await page.context().newCDPSession(page);

    // Simulate slow 3G
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (500 * 1024) / 8, // 500 kb/s
      uploadThroughput: (500 * 1024) / 8,
      latency: 400,
    });

    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    // Should still load within 10 seconds on slow 3G
    expect(loadTime).toBeLessThan(10000);
  });
});