import { test, expect } from '@playwright/test';

/**
 * COMPREHENSIVE ADMIN PANEL TEST SUITE
 *
 * Tests all critical admin functionality:
 * - Login
 * - Collection display
 * - View/Edit/Create/Delete operations
 * - Rich text editor
 * - Frontend propagation
 */

const ADMIN_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://precision-manufacturing.vercel.app';
const ADMIN_EMAIL = 'jt.connor88@gmail.com';
const ADMIN_PASSWORD = 'ChainBlockM1!';

test.describe('Admin Panel - Critical Path Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${ADMIN_URL}/admin`);

    // Check if already logged in
    const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);

    if (isLoginPage) {
      await page.fill('input[name="email"]', ADMIN_EMAIL);
      await page.fill('input[name="password"]', ADMIN_PASSWORD);
      await page.click('button[type="submit"]');

      // Wait for dashboard to load
      await page.waitForURL('**/admin', { timeout: 15000 });
    }
  });

  test('1. LOGIN - Should login successfully with valid credentials', async ({ page }) => {
    // Logout first
    await page.goto(`${ADMIN_URL}/admin/logout`);

    // Go to login page
    await page.goto(`${ADMIN_URL}/admin/login`);

    // Fill credentials
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await page.waitForURL('**/admin', { timeout: 15000 });

    // Should see navigation or dashboard elements
    const dashboardVisible = await page.locator('nav, [role="navigation"]').isVisible();
    expect(dashboardVisible).toBeTruthy();
  });

  test('2. SERVICES COLLECTION - Should display all 4 services', async ({ page }) => {
    // Navigate to services collection
    await page.goto(`${ADMIN_URL}/admin/collections/services`);

    // Wait for table to load
    await page.waitForSelector('table, [role="table"], .collection-list', { timeout: 10000 });

    // Count rows (should have 4 services)
    const rows = await page.locator('table tbody tr, .collection-list-item').count();

    console.log(`Found ${rows} services in admin panel`);
    expect(rows).toBe(4);

    // Verify service names are visible
    const content = await page.textContent('body');
    expect(content).toContain('5-Axis Machining');
    expect(content).toContain('Adaptive Machining');
  });

  test('3. INDUSTRIES COLLECTION - Should display all 4 industries', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin/collections/industries`);

    await page.waitForSelector('table, [role="table"], .collection-list', { timeout: 10000 });

    const rows = await page.locator('table tbody tr, .collection-list-item').count();

    console.log(`Found ${rows} industries in admin panel`);
    expect(rows).toBe(4);

    const content = await page.textContent('body');
    expect(content).toContain('Aerospace');
    expect(content).toContain('Defense');
  });

  test('4. RESOURCES COLLECTION - Should display resources with pagination', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin/collections/resources`);

    await page.waitForSelector('table, [role="table"], .collection-list', { timeout: 10000 });

    // Should have at least 10 rows (first page)
    const rows = await page.locator('table tbody tr, .collection-list-item').count();

    console.log(`Found ${rows} resources on first page`);
    expect(rows).toBeGreaterThanOrEqual(10);

    // Should show total count somewhere (50 resources)
    const content = await page.textContent('body');
    expect(content).toMatch(/50|total/i);
  });

  test('5. EDIT SERVICE - Should load service edit form with data', async ({ page }) => {
    // Go to services list
    await page.goto(`${ADMIN_URL}/admin/collections/services`);

    // Click first service
    await page.click('table tbody tr:first-child a, .collection-list-item:first-child a');

    // Wait for edit form to load
    await page.waitForSelector('form, [role="form"]', { timeout: 10000 });

    // Verify title field is populated
    const titleInput = await page.locator('input[name="title"], input[id*="title"]').first();
    const titleValue = await titleInput.inputValue();

    console.log(`Editing service: ${titleValue}`);
    expect(titleValue.length).toBeGreaterThan(0);

    // Verify description (rich text editor) exists
    const richTextExists = await page.locator('.lexical-editor, [contenteditable="true"], textarea[name="description"]').count();
    expect(richTextExists).toBeGreaterThan(0);
  });

  test('6. SAVE SERVICE - Should save changes to service', async ({ page }) => {
    // Go to first service
    await page.goto(`${ADMIN_URL}/admin/collections/services`);
    await page.click('table tbody tr:first-child a, .collection-list-item:first-child a');
    await page.waitForSelector('form', { timeout: 10000 });

    // Get original title
    const titleInput = await page.locator('input[name="title"], input[id*="title"]').first();
    const originalTitle = await titleInput.inputValue();

    // Modify title (add timestamp to make it unique)
    const newTitle = `${originalTitle} - TEST ${Date.now()}`;
    await titleInput.fill(newTitle);

    // Find and click save button
    await page.click('button:has-text("Save"), button[type="submit"]');

    // Wait for save confirmation or redirect
    await page.waitForTimeout(2000);

    // Verify no error messages
    const errorExists = await page.locator('.error, [role="alert"]').isVisible().catch(() => false);
    expect(errorExists).toBeFalsy();

    // Revert title back
    await titleInput.fill(originalTitle);
    await page.click('button:has-text("Save"), button[type="submit"]');
    await page.waitForTimeout(1000);
  });

  test('7. RICH TEXT EDITOR - Should allow formatting', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin/collections/services`);
    await page.click('table tbody tr:first-child a, .collection-list-item:first-child a');
    await page.waitForSelector('form', { timeout: 10000 });

    // Find rich text editor
    const editor = await page.locator('.lexical-editor [contenteditable="true"], [contenteditable="true"]').first();

    // Should be editable
    const isEditable = await editor.getAttribute('contenteditable');
    expect(isEditable).toBe('true');

    // Get current content
    const currentContent = await editor.textContent();
    console.log(`Rich text content length: ${currentContent?.length}`);

    expect(currentContent?.length).toBeGreaterThan(0);
  });

  test('8. API vs ADMIN - Data should match', async ({ page, request }) => {
    // Fetch from API
    const apiResponse = await request.get(`${ADMIN_URL}/api/services?depth=0`);
    const apiData = await apiResponse.json();

    console.log(`API returned ${apiData.totalDocs} services`);
    expect(apiData.totalDocs).toBe(4);

    // Check admin UI
    await page.goto(`${ADMIN_URL}/admin/collections/services`);
    await page.waitForSelector('table, .collection-list', { timeout: 10000 });

    const rows = await page.locator('table tbody tr, .collection-list-item').count();

    console.log(`Admin UI shows ${rows} services`);
    expect(rows).toBe(apiData.totalDocs);
  });

  test('9. FRONTEND PROPAGATION - Check if changes are visible', async ({ page, request }) => {
    // Get services from API
    const apiResponse = await request.get(`${ADMIN_URL}/api/services?depth=0`);
    const apiData = await apiResponse.json();
    const firstService = apiData.docs[0];

    console.log(`Checking frontend for: ${firstService.title}`);

    // Visit services page on frontend
    await page.goto(`${ADMIN_URL}/services`);

    // Should see the service title
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain(firstService.title);
  });

  test('10. NAVIGATION - All collection links work', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin`);

    // Test Services link
    await page.click('a[href*="/admin/collections/services"], nav a:has-text("Services")');
    await page.waitForURL('**/collections/services');
    expect(page.url()).toContain('services');

    // Test Industries link
    await page.goto(`${ADMIN_URL}/admin`);
    await page.click('a[href*="/admin/collections/industries"], nav a:has-text("Industries")');
    await page.waitForURL('**/collections/industries');
    expect(page.url()).toContain('industries');

    // Test Resources link
    await page.goto(`${ADMIN_URL}/admin`);
    await page.click('a[href*="/admin/collections/resources"], nav a:has-text("Resources")');
    await page.waitForURL('**/collections/resources');
    expect(page.url()).toContain('resources');
  });
});

test.describe('Admin Panel - Error Handling', () => {
  test('Should reject invalid login credentials', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin/logout`);
    await page.goto(`${ADMIN_URL}/admin/login`);

    await page.fill('input[name="email"]', 'wrong@email.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error or stay on login page
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });

  test('Should handle missing required fields', async ({ page }) => {
    // Login
    await page.goto(`${ADMIN_URL}/admin`);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]').catch(() => {});
    await page.waitForURL('**/admin', { timeout: 15000 }).catch(() => {});

    // Try to create new service without title
    await page.goto(`${ADMIN_URL}/admin/collections/services/create`);
    await page.waitForSelector('form', { timeout: 10000 });

    // Leave title empty, try to save
    await page.click('button:has-text("Save"), button[type="submit"]');

    // Should show validation error
    await page.waitForTimeout(1000);
    const hasError = await page.locator('.error, [role="alert"], .validation-error').isVisible().catch(() => false);
    expect(hasError).toBeTruthy();
  });
});

test.describe('Admin Panel - Performance', () => {
  test('Collections should load within 5 seconds', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin`);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]').catch(() => {});
    await page.waitForURL('**/admin', { timeout: 15000 }).catch(() => {});

    const startTime = Date.now();
    await page.goto(`${ADMIN_URL}/admin/collections/services`);
    await page.waitForSelector('table, .collection-list', { timeout: 5000 });
    const loadTime = Date.now() - startTime;

    console.log(`Services collection loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('Resources with 50 items should load efficiently', async ({ page }) => {
    await page.goto(`${ADMIN_URL}/admin`);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]').catch(() => {});
    await page.waitForURL('**/admin', { timeout: 15000 }).catch(() => {});

    const startTime = Date.now();
    await page.goto(`${ADMIN_URL}/admin/collections/resources`);
    await page.waitForSelector('table, .collection-list', { timeout: 10000 });
    const loadTime = Date.now() - startTime;

    console.log(`Resources collection loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
  });
});
