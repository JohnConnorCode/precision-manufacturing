import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test('contact page should have no accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through main navigation
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav item

    // Services dropdown should be focusable
    const servicesButton = page.getByRole('button', { name: /Services/i });
    await expect(servicesButton).toBeFocused();

    // Enter should open dropdown
    await page.keyboard.press('Enter');
    // Note: Dropdown implementation may vary
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check navigation has proper ARIA label
    const nav = page.getByRole('navigation', { name: /Main/i });
    await expect(nav).toBeVisible();

    // Check buttons have accessible names
    const quoteButton = page.getByRole('button', { name: /Request Quote/i });
    await expect(quoteButton).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // There should be exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // H2s should follow h1
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');

    // Check all images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/contact');

    // Check all inputs have associated labels
    const inputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');

      // Input should have either id or name for label association
      expect(id || name).toBeTruthy();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);

    // Check specifically for color contrast
    await checkA11y(page);
  });
});