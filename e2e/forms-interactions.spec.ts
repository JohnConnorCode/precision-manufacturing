import { test, expect } from '@playwright/test';
import { waitForAnimations } from './utils/test-helpers';

test.describe('Forms & User Interactions', () => {
  /**
   * Contact form validation
   */
  test.describe('Contact Form', () => {
    test('Contact form has all required fields', async ({ page }) => {
      await page.goto('/contact');

      // Check required form fields exist
      const nameInput = page.locator('input[name="name"], input[id="name"]');
      const emailInput = page.locator('input[name="email"], input[id="email"]');
      const messageInput = page.locator('textarea[name="message"], textarea[id="message"]');

      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();
    });

    test('Contact form validates email', async ({ page }) => {
      await page.goto('/contact');

      // Fill form with invalid email
      const nameInput = page.locator('input[name="name"], input[id="name"]').first();
      const emailInput = page.locator('input[name="email"], input[id="email"]').first();
      const messageInput = page.locator('textarea[name="message"], textarea[id="message"]').first();

      await nameInput.fill('Test User');
      await emailInput.fill('invalid-email');
      await messageInput.fill('Test message');

      // Try to submit
      const submitButton = page.locator('button[type="submit"]');
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await waitForAnimations(page, 500);

        // Should show validation error or HTML5 validation
        const isInvalid = await emailInput.evaluate(
          (el: HTMLInputElement) => !el.validity.valid
        );
        expect(isInvalid).toBe(true);
      }
    });

    test('Contact form can be filled out', async ({ page }) => {
      await page.goto('/contact');

      const nameInput = page.locator('input[name="name"], input[id="name"]').first();
      const emailInput = page.locator('input[name="email"], input[id="email"]').first();
      const messageInput = page.locator('textarea[name="message"], textarea[id="message"]').first();

      await nameInput.fill('John Doe');
      await emailInput.fill('john@example.com');
      await messageInput.fill('This is a test message about precision manufacturing.');

      // Verify values are filled
      expect(await nameInput.inputValue()).toBe('John Doe');
      expect(await emailInput.inputValue()).toBe('john@example.com');
      expect(await messageInput.inputValue()).toContain('test message');
    });
  });

  /**
   * CTA buttons and interactions
   */
  test.describe('Call-to-Action Buttons', () => {
    test('Homepage CTA buttons work', async ({ page }) => {
      await page.goto('/');

      // Find "Get Quote" button
      const quoteButton = page.locator('a').filter({ hasText: /get quote|quote/i }).first();
      if (await quoteButton.count() > 0) {
        await quoteButton.click();
        // Should navigate to contact or quote page
        expect(page.url()).toMatch(/\/(contact|quote)/);
      }
    });

    test('Service pages have contact CTAs', async ({ page }) => {
      await page.goto('/services/5-axis-machining');

      // Should have a way to contact or request quote
      const ctaButton = page.locator('a').filter({
        hasText: /contact|quote|get started|learn more/i
      }).first();

      await expect(ctaButton).toBeVisible();
    });
  });

  /**
   * Search functionality (if present)
   */
  test.describe('Search Functionality', () => {
    test('Search bar exists on resources page', async ({ page }) => {
      await page.goto('/resources');

      // Check if search exists
      const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
      if (await searchInput.count() > 0) {
        await expect(searchInput).toBeVisible();
      }
    });
  });

  /**
   * Test hover states and animations
   */
  test.describe('Interactive Elements', () => {
    test('Buttons have hover states', async ({ page }) => {
      await page.goto('/');

      const button = page.locator('button, a.button, a[class*="button"]').first();
      if (await button.count() > 0) {
        const initialStyle = await button.evaluate(el => window.getComputedStyle(el).backgroundColor);

        await button.hover();
        await waitForAnimations(page, 300);

        const hoverStyle = await button.evaluate(el => window.getComputedStyle(el).backgroundColor);

        // Style should change on hover (or have transition)
        const hasTransition = await button.evaluate(el =>
          window.getComputedStyle(el).transition !== 'all 0s ease 0s'
        );

        expect(hasTransition || initialStyle !== hoverStyle).toBe(true);
      }
    });

    test('Cards have hover effects', async ({ page }) => {
      await page.goto('/services');

      const card = page.locator('[class*="card"]').first();
      if (await card.count() > 0) {
        await card.hover();
        await waitForAnimations(page, 300);

        // Card should have some visual feedback (shadow, scale, etc.)
        const hasTransition = await card.evaluate(el =>
          window.getComputedStyle(el).transition.length > 0
        );

        expect(hasTransition).toBe(true);
      }
    });
  });

  /**
   * Test scroll animations
   */
  test.describe('Scroll Animations', () => {
    test('Sections fade in on scroll', async ({ page }) => {
      await page.goto('/');

      // Get a section that should animate
      const section = page.locator('section').nth(1);

      // Scroll it into view
      await section.scrollIntoViewIfNeeded();
      await waitForAnimations(page, 800);

      // Should be visible now
      await expect(section).toBeVisible();
    });
  });
});
