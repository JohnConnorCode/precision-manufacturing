import { test, expect } from '@playwright/test';

test.describe('Admin Panel - Full Editing Workflow', () => {
  test('should login, view content, edit, save, and verify changes on frontend', async ({ page }) => {
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
    await page.waitForURL(/\/admin/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/admin/);

    // 6. Navigate to Services collection
    await page.click('text=Services');
    await page.waitForLoadState('networkidle');

    // 7. Verify services are listed
    const servicesCount = await page.locator('tbody tr').count();
    expect(servicesCount).toBeGreaterThan(0);
    console.log(`Found ${servicesCount} services in admin panel`);

    // 8. Click on first service to edit
    await page.locator('tbody tr').first().click();
    await page.waitForLoadState('networkidle');

    // 9. Verify we can see the service title field with content
    const titleField = page.locator('input[name="title"]');
    await expect(titleField).toBeVisible();
    const currentTitle = await titleField.inputValue();
    console.log(`Current service title: ${currentTitle}`);
    expect(currentTitle.length).toBeGreaterThan(0);

    // 10. Make a test edit (add a marker we can check)
    const testMarker = ' [TEST EDIT]';
    await titleField.fill(currentTitle + testMarker);

    // 11. Save the changes
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000); // Wait for save to complete

    // 12. Verify save succeeded (look for success message)
    const successMessage = page.locator('text=/saved|success/i');
    await expect(successMessage).toBeVisible({ timeout: 5000 });

    // 13. Navigate to frontend services page
    await page.goto('/services');
    await page.waitForLoadState('networkidle');

    // 14. Verify the edited content appears on frontend
    const frontendContent = await page.content();
    expect(frontendContent).toContain(testMarker);
    console.log('✅ Edit successfully propagated to frontend');

    // 15. Clean up - go back to admin and restore original title
    await page.goto('/admin');
    await page.click('text=Services');
    await page.waitForLoadState('networkidle');
    await page.locator('tbody tr').first().click();
    await page.waitForLoadState('networkidle');

    const titleFieldCleanup = page.locator('input[name="title"]');
    await titleFieldCleanup.fill(currentTitle); // Restore original
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);

    console.log('✅ Full editing workflow complete and verified');
  });

  test('should show current content when opening globals for editing', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
    await page.fill('input[name="password"]', 'ChainBlockM1!');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin/, { timeout: 10000 });

    // Navigate to globals
    await page.click('text=Homepage');
    await page.waitForLoadState('networkidle');

    // Verify we can see hero content
    const heroTitle = page.locator('input[name="hero.title"], textarea[name="hero.title"]').first();
    await expect(heroTitle).toBeVisible({ timeout: 10000 });

    const heroContent = await heroTitle.inputValue();
    console.log(`Homepage hero title: ${heroContent}`);

    // Should contain real content, not placeholder
    expect(heroContent.length).toBeGreaterThan(20);
    expect(heroContent.toLowerCase()).toContain('precision');

    console.log('✅ Current homepage content is visible in admin panel');
  });
});
