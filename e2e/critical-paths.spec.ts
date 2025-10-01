import { test, expect } from '@playwright/test';

test.describe('Critical Path Testing - Manual Verification', () => {
  test('Homepage loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out external API errors we can't control
        const isExternalError =
          text.includes('Access-Control-Allow-Origin') ||
          text.includes('Failed to load resource') ||
          text.includes('net::ERR_');

        if (!isExternalError) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors, `Console errors found: ${JSON.stringify(errors)}`).toHaveLength(0);
  });

  test('Navigation links are clickable and work', async ({ page }) => {
    await page.goto('/');

    // Test main nav links
    const aboutLink = page.locator('a[href="/about"]').first();
    await expect(aboutLink).toBeVisible();

    await Promise.all([
      page.waitForURL('**/about'),
      aboutLink.click()
    ]);
    await expect(page).toHaveURL('/about');

    await page.goto('/');
    const servicesLink = page.locator('a[href="/services"]').first();
    await Promise.all([
      page.waitForURL('**/services'),
      servicesLink.click()
    ]);
    await expect(page).toHaveURL('/services');
  });

  test('Footer links navigate correctly', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Test a footer link
    const footerAbout = page.locator('footer a[href="/about"]');
    if (await footerAbout.count() > 0) {
      await Promise.all([
        page.waitForURL('**/about'),
        footerAbout.first().click()
      ]);
      await expect(page).toHaveURL('/about');
    }
  });

  test('Contact form exists and has required fields', async ({ page }) => {
    await page.goto('/contact');

    // Check form elements exist
    await expect(page.locator('input[name="name"], input[id="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[id="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], textarea[id="message"]')).toBeVisible();
  });

  test('Resource articles load with content', async ({ page }) => {
    await page.goto('/resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide');

    // Should have article content
    const content = await page.textContent('body');
    expect(content!.length).toBeGreaterThan(2000);

    // Should have no 404 or error messages
    expect(content).not.toContain('404');
    expect(content).not.toContain('Page Not Found');
  });

  test('Sanity Studio is accessible', async ({ page }) => {
    const response = await page.goto('/studio');
    expect(response?.status()).toBeLessThan(400);
  });

  test('All images have alt tags', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('Mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for mobile menu button specifically (not desktop nav buttons)
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Menu dialog should be visible
    const mobileNav = page.locator('[role="dialog"]');
    await expect(mobileNav).toBeVisible();
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Give images more time to load
    await page.waitForTimeout(2000);

    const images = await page.locator('img').all();
    let failedImages: string[] = [];

    for (const img of images) {
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);

      // Skip external images (Unsplash, etc) as we can't control their availability/speed
      // Skip icons and small decorative images (they might be inline SVGs or data URIs)
      const isExternalImage = src?.includes('unsplash.com') || src?.includes('images.unsplash');
      const isIcon = src?.includes('lucide') || src?.startsWith('data:');

      if (!isIcon && !isExternalImage && naturalWidth === 0) {
        failedImages.push(src || 'unknown');
      }
    }

    expect(failedImages, `Failed to load images: ${failedImages.join(', ')}`).toHaveLength(0);
  });

  test('SEO meta tags are present', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });
});
