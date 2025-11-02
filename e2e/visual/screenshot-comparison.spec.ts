import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test('homepage visual regression', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Wait for animations to complete
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('services page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/services`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('services.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('industries page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/industries`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('industries.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('about page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/about`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('about.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('contact page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/contact`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('contact.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('resources page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/resources`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('resources.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('service detail page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/services/5-axis-machining`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('service-detail.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  test('industry detail page visual regression', async ({ page }) => {
    await page.goto(`${baseURL}/industries/aerospace`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('industry-detail.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });
});
