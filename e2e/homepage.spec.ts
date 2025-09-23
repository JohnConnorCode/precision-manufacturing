import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section', async ({ page }) => {
    // Check hero headline
    await expect(page.locator('h1')).toContainText('Precision Engineering');
    await expect(page.locator('h1')).toContainText('Aerospace Excellence');

    // Check ITAR compliance badge
    await expect(page.getByText('ITAR COMPLIANT')).toBeVisible();
    await expect(page.getByText('AS9100D CERTIFIED')).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('button', { name: /Request Quote/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Capabilities/i })).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    // Check all stat counters
    await expect(page.getByText('Years Experience')).toBeVisible();
    await expect(page.getByText('On-Time Delivery')).toBeVisible();
    await expect(page.getByText('Min Tolerance')).toBeVisible();
    await expect(page.getByText('Active Clients')).toBeVisible();
  });

  test('should display services section', async ({ page }) => {
    // Check section title
    await expect(page.getByRole('heading', { name: /Precision Manufacturing Services/i })).toBeVisible();

    // Check service cards
    const services = [
      '5-Axis Machining',
      'Adaptive Machining',
      'Metrology & Inspection',
      'Engineering Support'
    ];

    for (const service of services) {
      await expect(page.getByRole('heading', { name: service })).toBeVisible();
    }
  });

  test('should display industries section', async ({ page }) => {
    // Check section title
    await expect(page.getByRole('heading', { name: /Industries We Serve/i })).toBeVisible();

    // Check industry cards
    const industries = ['Aerospace', 'Energy & Turbines', 'Defense'];

    for (const industry of industries) {
      await expect(page.getByRole('heading', { name: industry })).toBeVisible();
    }
  });

  test('should display CTA section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Ready to Start Your Project/i })).toBeVisible();
    await expect(page.getByText(/Get a quote within 24 hours/i)).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Precision Manufacturing.*Aerospace.*Defense/i);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('ITAR-compliant');
    expect(metaDescription).toContain('aerospace');
  });
});