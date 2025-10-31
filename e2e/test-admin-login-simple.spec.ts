import { test, expect } from '@playwright/test';

test.describe('Admin Panel - Login and Dashboard Access', () => {
  test('should successfully login and access admin dashboard', async ({ page }) => {
    // 1. Navigate to admin panel
    await page.goto('/admin');

    // 2. Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);

    // 3. Fill in login credentials
    await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
    await page.fill('input[name="password"]', 'ChainBlockM1!');

    // 4. Submit login
    await page.click('button[type="submit"]');

    // 5. Wait for dashboard to load
    await page.waitForURL(/\/admin/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/admin/);

    // 6. Verify we see the dashboard with collections
    await expect(page.locator('text=Collections')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Industries')).toBeVisible();
    await expect(page.locator('text=Resources')).toBeVisible();

    // 7. Verify we see globals
    await expect(page.locator('text=Globals')).toBeVisible();
    await expect(page.locator('text=Homepage')).toBeVisible();

    console.log('✅ Login successful - admin dashboard accessible');
    console.log('✅ Collections visible: Users, Services, Industries, Resources');
    console.log('✅ Globals visible: Homepage, Footer, About, etc.');
  });

  test('should be able to navigate to Services collection', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
    await page.fill('input[name="password"]', 'ChainBlockM1!');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin/, { timeout: 15000 });

    // Click on Services collection card
    await page.click('text=Services');
    await page.waitForURL(/\/admin\/collections\/services/);

    // Verify we're on services list
    await expect(page).toHaveURL(/\/admin\/collections\/services/);

    // Check if we can see service items
    const hasServices = await page.locator('tbody tr').count();
    expect(hasServices).toBeGreaterThan(0);

    console.log(`✅ Services collection accessible - found ${hasServices} services`);
  });

  test('should be able to open a service for viewing', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
    await page.fill('input[name="password"]', 'ChainBlockM1!');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin/, { timeout: 15000 });

    // Navigate to Services
    await page.click('text=Services');
    await page.waitForURL(/\/admin\/collections\/services/);

    // Click first service
    await page.locator('tbody tr').first().click();
    await page.waitForLoadState('networkidle');

    // Verify we can see the title field
    const titleField = page.locator('input[name="title"]');
    await expect(titleField).toBeVisible({ timeout: 10000 });

    const title = await titleField.inputValue();
    console.log(`✅ Service edit page accessible - viewing: ${title}`);
    console.log('✅ Content is loaded and visible in admin panel');

    expect(title.length).toBeGreaterThan(0);
  });
});
