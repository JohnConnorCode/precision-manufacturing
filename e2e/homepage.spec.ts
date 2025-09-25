import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the hero section', async ({ page }) => {
    // Check hero headline - now in all caps
    await expect(page.locator('h1')).toContainText('PRECISION');
    await expect(page.locator('h1')).toContainText('MANUFACTURING');
    // Check tagline - using more flexible selector
    await expect(page.getByText('Innovative Machining Since 1995')).toBeVisible();

    // Check certification badges in the hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection.locator('span').filter({ hasText: 'ITAR Registered' })).toBeVisible();
    await expect(heroSection.locator('span').filter({ hasText: 'AS9100D Certified' })).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Start Your Project/i })).toBeVisible();
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
    // Check section title - updated to match new design
    await expect(page.getByText('PRECISION SERVICES')).toBeVisible();

    // Check service cards are present
    const serviceSection = page.locator('section').filter({ has: page.getByText('PRECISION SERVICES') });
    const serviceCards = serviceSection.locator('.group');
    await expect(serviceCards).toHaveCount(4);
  });

  test('should display industries section', async ({ page }) => {
    // Check section title - updated to match new design
    await expect(page.getByText('INDUSTRY LEADERS')).toBeVisible();

    // Check industry cards are present
    const industrySection = page.locator('section').filter({ has: page.getByText('INDUSTRY LEADERS') });
    const industryCards = industrySection.locator('.group');
    await expect(industryCards.first()).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Ready to Start Your Project/i })).toBeVisible();
    await expect(page.getByText(/Get a quote within 24 hours/i)).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/IIS.*Innovative Industrial Solutions.*Precision Manufacturing/i);

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('ITAR-registered');
    expect(metaDescription).toContain('aerospace');
  });
});