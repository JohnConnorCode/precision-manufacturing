import { test, expect } from '@playwright/test';
import { mainNavLinks } from './config/routes';
import { waitForAnimations } from './utils/test-helpers';

test.describe('Navigation Functionality', () => {
  /**
   * Test main navigation links work
   */
  test.describe('Header Navigation', () => {
    for (const link of mainNavLinks) {
      test(`${link.label} navigation link works`, async ({ page }) => {
        await page.goto('/');

        const navLink = page.locator(`a[href="${link.href}"]`).first();
        await expect(navLink).toBeVisible();

        await Promise.all([
          page.waitForURL(`**${link.href}`),
          navLink.click()
        ]);

        expect(page.url()).toContain(link.href);
      });
    }
  });

  /**
   * Test dropdown menus
   */
  test.describe('Dropdown Menus', () => {
    test('Services dropdown opens and works', async ({ page }) => {
      await page.goto('/');

      // Find and hover services button
      const servicesButton = page.locator('button').filter({ hasText: /services/i }).first();
      await servicesButton.hover();
      await waitForAnimations(page, 300);

      // Click a service link
      const fiveAxisLink = page.locator('a[href="/services/5-axis-machining"]');
      await expect(fiveAxisLink).toBeVisible();
      await fiveAxisLink.click();

      await expect(page).toHaveURL('/services/5-axis-machining');
    });

    test('Industries dropdown opens and works', async ({ page }) => {
      await page.goto('/');

      // Find and hover industries button
      const industriesButton = page.locator('button').filter({ hasText: /industries/i }).first();
      await industriesButton.hover();
      await waitForAnimations(page, 300);

      // Click aerospace link
      const aerospaceLink = page.locator('a[href="/industries/aerospace"]');
      await expect(aerospaceLink).toBeVisible();
      await aerospaceLink.click();

      await expect(page).toHaveURL('/industries/aerospace');
    });

    test('Resources dropdown opens and works', async ({ page }) => {
      await page.goto('/');

      // Find and hover resources button
      const resourcesButton = page.locator('button').filter({ hasText: /resources/i }).first();
      await resourcesButton.hover();
      await waitForAnimations(page, 300);

      // Click any resource link
      const resourceLink = page.locator('a[href^="/resources/"]').first();
      await expect(resourceLink).toBeVisible();
      await resourceLink.click();

      expect(page.url()).toMatch(/\/resources\/.+/);
    });
  });

  /**
   * Test footer navigation
   */
  test.describe('Footer Navigation', () => {
    test('Footer links navigate correctly', async ({ page }) => {
      await page.goto('/');

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await waitForAnimations(page, 500);

      // Test footer about link
      const footerAbout = page.locator('footer a[href="/about"]');
      if (await footerAbout.count() > 0) {
        await footerAbout.first().click();
        await expect(page).toHaveURL('/about');
      }
    });

    test('Footer is present on all pages', async ({ page }) => {
      const pages = ['/', '/about', '/services', '/contact'];

      for (const path of pages) {
        await page.goto(path);
        const footer = page.locator('footer');
        await expect(footer, `Footer not found on ${path}`).toBeVisible();
      }
    });
  });

  /**
   * Test mobile navigation
   */
  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('Mobile menu opens and closes', async ({ page }) => {
      await page.goto('/');

      // Find mobile menu button
      const menuButton = page.locator('button[aria-label="Open menu"]');
      await expect(menuButton).toBeVisible();

      // Open menu
      await menuButton.click();
      await waitForAnimations(page, 500);

      // Check menu dialog is visible
      const mobileNav = page.locator('[role="dialog"]');
      await expect(mobileNav).toBeVisible();

      // Close menu
      const closeButton = page.locator('button[aria-label="Close menu"]');
      await closeButton.click();
      await waitForAnimations(page, 500);

      // Menu should be hidden
      await expect(mobileNav).not.toBeVisible();
    });

    test('Mobile menu links work', async ({ page }) => {
      await page.goto('/');

      // Open mobile menu
      const menuButton = page.locator('button[aria-label="Open menu"]');
      await menuButton.click();
      await waitForAnimations(page, 500);

      // Click About link in mobile menu
      const aboutLink = page.locator('[role="dialog"] a[href="/about"]');
      await aboutLink.click();

      await expect(page).toHaveURL('/about');
    });
  });

  /**
   * Test logo links back to homepage
   */
  test('Logo links back to homepage', async ({ page }) => {
    await page.goto('/about');

    const logo = page.locator('header a[href="/"]').first();
    await logo.click();

    await expect(page).toHaveURL('/');
  });

  /**
   * Test breadcrumb navigation (if present)
   */
  test('Service pages have working navigation', async ({ page }) => {
    await page.goto('/services/5-axis-machining');

    // Should have link back to services
    const servicesLink = page.locator('a[href="/services"]').first();
    if (await servicesLink.count() > 0) {
      await servicesLink.click();
      await expect(page).toHaveURL('/services');
    }
  });
});
