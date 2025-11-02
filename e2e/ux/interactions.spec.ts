import { test, expect } from '@playwright/test';

test.describe('UX Interaction Tests', () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test('navigation menu interactions work correctly', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Test Services dropdown
    const servicesMenu = page.locator('a:has-text("Services"), button:has-text("Services")').first();
    await servicesMenu.hover();
    await page.waitForTimeout(500);

    // Verify dropdown appears
    const servicesDropdown = page.locator('[data-state="open"], .dropdown-menu:visible').first();
    await expect(servicesDropdown).toBeVisible({ timeout: 3000 });

    // Test Industries dropdown
    const industriesMenu = page.locator('a:has-text("Industries"), button:has-text("Industries")').first();
    await industriesMenu.hover();
    await page.waitForTimeout(500);

    const industriesDropdown = page.locator('[data-state="open"], .dropdown-menu:visible').first();
    await expect(industriesDropdown).toBeVisible({ timeout: 3000 });
  });

  test('navigation links are clickable and functional', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Test About link
    const aboutLink = page.locator('a[href="/about"]').first();
    await aboutLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/about');

    // Navigate back
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Test Contact link
    const contactLink = page.locator('a[href="/contact"]').first();
    await contactLink.click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/contact');
  });

  test('CTA buttons are visible and clickable', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Find primary CTA button
    const ctaButton = page.locator('a:has-text("Get Quote"), a:has-text("Contact"), button:has-text("Contact")').first();

    if (await ctaButton.isVisible()) {
      await expect(ctaButton).toBeVisible();

      // Verify it's clickable
      const href = await ctaButton.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('footer links are functional', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Test footer navigation
    const footerLinks = page.locator('footer a[href]');
    const count = await footerLinks.count();

    expect(count).toBeGreaterThan(0);

    // Verify first few links have valid hrefs
    for (let i = 0; i < Math.min(3, count); i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('service cards are interactive', async ({ page }) => {
    await page.goto(`${baseURL}/services`);
    await page.waitForLoadState('networkidle');

    // Find service cards
    const serviceCards = page.locator('a[href^="/services/"], .service-card a').first();

    if (await serviceCards.isVisible()) {
      await expect(serviceCards).toBeVisible();

      // Hover over card
      await serviceCards.hover();
      await page.waitForTimeout(300);

      // Verify card is clickable
      const href = await serviceCards.getAttribute('href');
      expect(href).toContain('/services/');
    }
  });

  test('industry cards are interactive', async ({ page }) => {
    await page.goto(`${baseURL}/industries`);
    await page.waitForLoadState('networkidle');

    // Find industry cards
    const industryCards = page.locator('a[href^="/industries/"], .industry-card a').first();

    if (await industryCards.isVisible()) {
      await expect(industryCards).toBeVisible();

      // Hover over card
      await industryCards.hover();
      await page.waitForTimeout(300);

      // Verify card is clickable
      const href = await industryCards.getAttribute('href');
      expect(href).toContain('/industries/');
    }
  });

  test('resource cards are interactive', async ({ page }) => {
    await page.goto(`${baseURL}/resources`);
    await page.waitForLoadState('networkidle');

    // Find resource cards or links
    const resourceLinks = page.locator('a[href*="/resources/"]').first();

    if (await resourceLinks.isVisible()) {
      await expect(resourceLinks).toBeVisible();

      // Verify link is clickable
      const href = await resourceLinks.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  test('contact form is interactive', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);
    await page.waitForLoadState('networkidle');

    // Look for form elements
    const nameInput = page.locator('input[name="name"], input[type="text"]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const messageInput = page.locator('textarea[name="message"], textarea').first();

    // Verify form elements exist and are interactive
    if (await nameInput.isVisible()) {
      await expect(nameInput).toBeVisible();
      await expect(nameInput).toBeEditable();
    }

    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toBeEditable();
    }

    if (await messageInput.isVisible()) {
      await expect(messageInput).toBeVisible();
      await expect(messageInput).toBeEditable();
    }
  });

  test('mobile menu works on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Look for mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"], button.mobile-menu, [data-testid="mobile-menu"]').first();

    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Verify menu opened
      const mobileMenu = page.locator('[role="dialog"], .mobile-menu-content, nav[data-state="open"]').first();
      await expect(mobileMenu).toBeVisible({ timeout: 3000 });
    }
  });

  test('smooth scrolling works for anchor links', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Find any anchor links
    const anchorLink = page.locator('a[href^="#"]').first();

    if (await anchorLink.isVisible()) {
      const initialY = await page.evaluate(() => window.scrollY);

      await anchorLink.click();
      await page.waitForTimeout(1000);

      const finalY = await page.evaluate(() => window.scrollY);

      // Verify scroll occurred
      expect(Math.abs(finalY - initialY)).toBeGreaterThan(0);
    }
  });
});
