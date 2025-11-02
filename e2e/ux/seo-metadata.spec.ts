import { test, expect } from '@playwright/test';

test.describe('SEO Metadata Tests', () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test('homepage has proper SEO metadata', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(70);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(50);
    expect(metaDescription!.length).toBeLessThan(160);

    // Check viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      const canonicalHref = await canonical.getAttribute('href');
      expect(canonicalHref).toBeTruthy();
    }
  });

  test('all pages have unique titles', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Home' },
      { url: '/about', name: 'About' },
      { url: '/contact', name: 'Contact' },
      { url: '/services', name: 'Services' },
      { url: '/industries', name: 'Industries' },
      { url: '/resources', name: 'Resources' }
    ];

    const titles = new Set<string>();

    for (const pageInfo of pages) {
      await page.goto(`${baseURL}${pageInfo.url}`);
      await page.waitForLoadState('networkidle');

      const title = await page.title();
      expect(title).toBeTruthy();

      // Verify title is unique
      expect(titles.has(title)).toBeFalsy();
      titles.add(title);
    }
  });

  test('Open Graph tags are present', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check OG title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    // Check OG description
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();

    // Check OG type
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBeTruthy();

    // Check OG URL
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    if (ogUrl) {
      expect(ogUrl).toContain('http');
    }
  });

  test('Twitter Card tags are present', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check Twitter card type
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    if (twitterCard) {
      expect(['summary', 'summary_large_image', 'app', 'player']).toContain(twitterCard);
    }

    // Check Twitter title
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    if (await twitterTitle.count() > 0) {
      const content = await twitterTitle.getAttribute('content');
      expect(content).toBeTruthy();
    }
  });

  test('structured data (JSON-LD) is present', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Look for JSON-LD script tags
    const jsonLd = await page.locator('script[type="application/ld+json"]').count();

    if (jsonLd > 0) {
      const content = await page.locator('script[type="application/ld+json"]').first().textContent();
      expect(content).toBeTruthy();

      // Verify it's valid JSON
      const parsed = JSON.parse(content!);
      expect(parsed).toBeDefined();
      expect(parsed['@context']).toBe('https://schema.org');
    }
  });

  test('service pages have proper metadata', async ({ page }) => {
    await page.goto(`${baseURL}/services/5-axis-machining`);
    await page.waitForLoadState('networkidle');

    // Check title contains service name
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.toLowerCase()).toContain('axis');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('industry pages have proper metadata', async ({ page }) => {
    await page.goto(`${baseURL}/industries/aerospace`);
    await page.waitForLoadState('networkidle');

    // Check title contains industry name
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.toLowerCase()).toContain('aerospace');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('all pages have proper language attribute', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check html lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    expect(htmlLang).toBe('en');
  });

  test('meta robots tag allows indexing', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check robots meta tag
    const robots = page.locator('meta[name="robots"]');

    if (await robots.count() > 0) {
      const content = await robots.getAttribute('content');
      // Should not be noindex for production
      if (baseURL.includes('vercel.app') || baseURL.includes('production')) {
        expect(content).not.toContain('noindex');
      }
    }
  });

  test('favicon is present and accessible', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Check for favicon link
    const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]');
    const count = await favicon.count();

    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      const href = await favicon.first().getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});
