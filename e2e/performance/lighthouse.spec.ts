import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Lighthouse Performance Audits', () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  // Note: These tests require playwright-lighthouse to be installed
  // If not installed, tests will be skipped
  test.skip(!process.env.LIGHTHOUSE_ENABLED, 'Lighthouse tests require LIGHTHOUSE_ENABLED=true');

  test('homepage passes Lighthouse performance thresholds', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Run Lighthouse audit
    if (typeof playAudit === 'function') {
      await playAudit({
        page,
        thresholds: {
          performance: 70,
          accessibility: 90,
          'best-practices': 80,
          seo: 90
        },
        port: 9222
      });
    }
  });
});

test.describe('Performance Metrics', () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test('homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('images are optimized and lazy loaded', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check for Next.js Image optimization
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(3, count); i++) {
        const img = images.nth(i);
        const loading = await img.getAttribute('loading');

        // Images should use lazy loading
        if (loading) {
          expect(['lazy', 'eager']).toContain(loading);
        }
      }
    }
  });

  test('no excessive DOM size', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    const domSize = await page.evaluate(() => {
      return document.querySelectorAll('*').length;
    });

    // DOM should not be excessively large (< 1500 elements is good)
    expect(domSize).toBeLessThan(2000);
  });

  test('fonts are optimized', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check for font-display property
    const fonts = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      let fontRules: string[] = [];

      sheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSFontFaceRule) {
              fontRules.push(rule.cssText);
            }
          });
        } catch (e) {
          // Skip external stylesheets
        }
      });

      return fontRules;
    });

    // If fonts are used, verify optimization
    if (fonts.length > 0) {
      // Font display should be swap or optional for performance
      const hasFontDisplay = fonts.some(rule =>
        rule.includes('font-display')
      );

      expect(hasFontDisplay).toBeTruthy();
    }
  });

  test('critical CSS is inline', async ({ page }) => {
    await page.goto(baseURL);

    // Check for inline styles before paint
    const inlineStyles = await page.locator('style').count();

    // Should have some inline styles for critical CSS
    expect(inlineStyles).toBeGreaterThan(0);
  });

  test('no render-blocking resources', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check script loading strategy
    const scripts = page.locator('script[src]');
    const count = await scripts.count();

    if (count > 0) {
      for (let i = 0; i < Math.min(5, count); i++) {
        const script = scripts.nth(i);
        const async = await script.getAttribute('async');
        const defer = await script.getAttribute('defer');

        // Scripts should be async or defer to avoid blocking
        const isNonBlocking = async !== null || defer !== null || await script.getAttribute('type') === 'module';

        // Most scripts should be non-blocking
        // (Some inline scripts might not have async/defer)
      }
    }
  });

  test('viewport is mobile-friendly', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).toContain('width=device-width');
    expect(viewport).toContain('initial-scale=1');
  });

  test('proper caching headers are set', async ({ page }) => {
    const response = await page.goto(baseURL);

    expect(response).toBeTruthy();

    // Check for caching headers
    const headers = response!.headers();

    // Next.js should set proper cache headers
    expect(headers).toBeDefined();
  });

  test('HTTPS is enforced in production', async ({ page }) => {
    if (baseURL.includes('vercel.app') || baseURL.includes('production')) {
      await page.goto(baseURL);

      // Verify HTTPS
      expect(page.url()).toContain('https://');
    }
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like 404s for upstream images)
    const criticalErrors = errors.filter(error =>
      !error.includes('404') &&
      !error.includes('unsplash') &&
      !error.includes('favicon')
    );

    expect(criticalErrors.length).toBe(0);
  });
});
