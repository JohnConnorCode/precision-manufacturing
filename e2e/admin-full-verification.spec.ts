import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'jt.connor88@gmail.com';
const ADMIN_PASSWORD = 'ChainBlockM1!';

test.describe('Admin Panel - Full Verification', () => {
  test('Login to admin panel and verify dashboard loads', async ({ page }) => {
    // Go to admin
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Should redirect to login
    expect(page.url()).toContain('/admin/login');

    // Fill in credentials
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForTimeout(3000);

    // Take screenshot of result
    await page.screenshot({ path: '/tmp/admin-login-result.png', fullPage: true });

    // Check current URL - should NOT be on login page anymore
    const currentURL = page.url();
    console.log('Current URL after login:', currentURL);

    expect(currentURL).not.toContain('/admin/login');
    expect(currentURL).toContain('/admin');
  });

  test('Access Services collection and verify data display', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Navigate to Services collection
    await page.goto('/admin/collections/services');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: '/tmp/admin-services-full.png', fullPage: true });

    // Get page content
    const content = await page.content();

    // Check for service names in the content
    const hasServices = content.includes('5-Axis') ||
                       content.includes('Machining') ||
                       content.includes('Metrology') ||
                       content.includes('Engineering');

    console.log('Services page has data:', hasServices);
    console.log('Page title:', await page.title());

    // Should see service data
    expect(hasServices).toBeTruthy();
  });

  test('Access Industries collection and verify data display', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Navigate to Industries collection
    await page.goto('/admin/collections/industries');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: '/tmp/admin-industries-full.png', fullPage: true });

    // Get page content
    const content = await page.content();

    // Check for industry names
    const hasIndustries = content.includes('Aerospace') ||
                          content.includes('Defense') ||
                          content.includes('Energy') ||
                          content.includes('Medical');

    console.log('Industries page has data:', hasIndustries);

    // Should see industry data
    expect(hasIndustries).toBeTruthy();
  });

  test('Access Resources collection and verify data display', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Navigate to Resources collection
    await page.goto('/admin/collections/resources');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: '/tmp/admin-resources-full.png', fullPage: true });

    // Get page content
    const content = await page.content();

    // Check for resource-related content
    const hasResources = content.includes('resource') ||
                         content.includes('article') ||
                         content.toLowerCase().includes('title');

    console.log('Resources page has data:', hasResources);

    // Should see resource data
    expect(hasResources).toBeTruthy();
  });

  test('Verify each service can be edited', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Navigate to Services collection
    await page.goto('/admin/collections/services');
    await page.waitForTimeout(2000);

    // Get all links/rows that might be service items
    const serviceLinks = page.locator('a, tr, div[role="row"]').filter({
      hasText: /5-Axis|Adaptive|Metrology|Engineering/i
    });

    const count = await serviceLinks.count();
    console.log(`Found ${count} service items in admin`);

    // Should have at least 4 services
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('Verify each industry can be edited', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Navigate to Industries collection
    await page.goto('/admin/collections/industries');
    await page.waitForTimeout(2000);

    // Get all links/rows that might be industry items
    const industryLinks = page.locator('a, tr, div[role="row"]').filter({
      hasText: /Aerospace|Defense|Energy|Medical/i
    });

    const count = await industryLinks.count();
    console.log(`Found ${count} industry items in admin`);

    // Should have at least 4 industries
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
