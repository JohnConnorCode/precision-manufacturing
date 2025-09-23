import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate through main menu items', async ({ page }) => {
    // Test Services dropdown
    await page.getByRole('button', { name: /Services/i }).hover();

    // Test Industries dropdown
    await page.getByRole('button', { name: /Industries/i }).hover();

    // Test About link
    const aboutLink = page.getByRole('link', { name: /About/i, exact: true });
    await expect(aboutLink).toBeVisible();

    // Test Compliance dropdown
    await page.getByRole('button', { name: /Compliance/i }).hover();

    // Test Contact link
    await page.getByRole('link', { name: /Contact/i }).click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check company info
    await expect(page.getByText('PRECISION MFG')).toBeVisible();
    await expect(page.getByText(/Advancing aerospace/i)).toBeVisible();

    // Check footer sections
    await expect(page.getByRole('heading', { name: /Services/i }).last()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Industries/i }).last()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Company/i })).toBeVisible();
  });

  test('should have responsive mobile menu', async ({ page, isMobile }) => {
    if (isMobile) {
      // Click hamburger menu
      await page.getByRole('button', { name: /menu/i }).click();

      // Check mobile menu is visible
      await expect(page.getByRole('dialog')).toBeVisible();
    }
  });

  test('header should stick on scroll', async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Header should still be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/fixed/);
  });
});