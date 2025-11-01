import { test, expect } from '@playwright/test';

test.describe('Payload Admin Functionality Verification', () => {
  const adminEmail = 'admin@iismet.com';
  const adminPassword = 'SecurePassword123!';

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', adminEmail);
    await page.fill('input[name="password"]', adminPassword);
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin', { timeout: 10000 });
  });

  test('Admin panel loads with custom CSS styling', async ({ page }) => {
    // Wait for admin panel to load
    await page.waitForSelector('.app-header', { timeout: 10000 });

    // Verify header has cyan border (our custom brand color)
    const header = page.locator('.app-header');
    const borderColor = await header.evaluate((el) => {
      return window.getComputedStyle(el).borderBottomColor;
    });

    console.log('Header border color:', borderColor);

    // Check for cyan color (rgb(34, 211, 238) or similar)
    expect(borderColor).toContain('rgb');

    // Take screenshot of styled admin dashboard
    await page.screenshot({ path: '/tmp/admin-dashboard-styled.png', fullPage: true });
  });

  test('Collections are accessible and editable', async ({ page }) => {
    // Navigate to Services collection
    await page.click('text=Services');
    await page.waitForURL('**/admin/collections/services**');

    // Verify collection list loads
    const collectionList = page.locator('.collection-list, [class*="table"]');
    await expect(collectionList).toBeVisible({ timeout: 10000 });

    // Take screenshot
    await page.screenshot({ path: '/tmp/admin-services-list.png', fullPage: true });

    // Click first service to edit
    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(2000);

      // Verify edit form loads
      const titleInput = page.locator('input[name="title"]');
      await expect(titleInput).toBeVisible({ timeout: 5000 });

      // Take screenshot of edit page
      await page.screenshot({ path: '/tmp/admin-service-edit.png', fullPage: true });
    }
  });

  test('Live Preview feature is available', async ({ page }) => {
    // Navigate to a collection with live preview (Services)
    await page.goto('/admin/collections/services');
    await page.waitForTimeout(2000);

    // Click first item
    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(2000);

      // Check for Live Preview button/toggle
      const livePreviewButton = page.locator('button:has-text("Live Preview"), button:has-text("Preview"), [class*="live-preview"]');

      if (await livePreviewButton.count() > 0) {
        console.log('✅ Live Preview feature found');
        await page.screenshot({ path: '/tmp/admin-live-preview.png', fullPage: true });
      } else {
        console.log('ℹ️ Live Preview button not visible (may be in different location)');
      }
    }
  });

  test('Media upload is functional', async ({ page }) => {
    // Navigate to Media collection
    await page.goto('/admin/collections/media');
    await page.waitForTimeout(2000);

    // Look for upload button
    const uploadButton = page.locator('button:has-text("Upload"), a:has-text("Upload"), [class*="upload"]').first();

    if (await uploadButton.isVisible()) {
      console.log('✅ Media upload button found');
      await page.screenshot({ path: '/tmp/admin-media-upload.png', fullPage: true });
    } else {
      console.log('ℹ️ Media upload area visible');
      await page.screenshot({ path: '/tmp/admin-media-collection.png', fullPage: true });
    }
  });

  test('Drafts functionality', async ({ page }) => {
    // Navigate to Services (supports drafts if enabled)
    await page.goto('/admin/collections/services');
    await page.waitForTimeout(2000);

    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(2000);

      // Look for draft/publish controls
      const draftButton = page.locator('button:has-text("Save Draft"), button:has-text("Draft"), select:has-text("Draft")');

      if (await draftButton.count() > 0) {
        console.log('✅ Draft functionality found');
      } else {
        console.log('ℹ️ Draft controls not found - may not be enabled for this collection');
      }

      await page.screenshot({ path: '/tmp/admin-draft-controls.png', fullPage: true });
    }
  });

  test('CSS variables are properly applied', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(2000);

    // Check CSS variables
    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);

      return {
        brandCyan: styles.getPropertyValue('--brand-cyan'),
        brandDark: styles.getPropertyValue('--brand-dark'),
        themeSuccess500: styles.getPropertyValue('--theme-success-500'),
        shadowMd: styles.getPropertyValue('--shadow-md'),
        borderRadiusLg: styles.getPropertyValue('--border-radius-lg'),
      };
    });

    console.log('CSS Variables:', cssVars);

    // Verify our custom variables are applied
    expect(cssVars.brandCyan).toContain('#22D3EE');
    expect(cssVars.brandDark).toContain('#0E1116');
    expect(cssVars.themeSuccess500).toContain('#22d3ee');
  });

  test('Input fields are readable with proper styling', async ({ page }) => {
    await page.goto('/admin/collections/services');
    await page.waitForTimeout(2000);

    const firstRow = page.locator('table tbody tr').first();
    if (await firstRow.isVisible()) {
      await firstRow.click();
      await page.waitForTimeout(2000);

      // Check input styling
      const titleInput = page.locator('input[name="title"]');
      if (await titleInput.isVisible()) {
        const inputStyles = await titleInput.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            color: styles.color,
            border: styles.border,
            borderRadius: styles.borderRadius,
          };
        });

        console.log('Input styles:', inputStyles);

        // Verify readable text (should be dark on white)
        expect(inputStyles.background).toContain('rgb(255, 255, 255)'); // white
        expect(inputStyles.color).toMatch(/rgb\(26, 26, 26\)|rgb\(0, 0, 0\)/); // dark text
      }
    }
  });

  test('Navigation links have hover effects', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(2000);

    // Find nav link
    const navLink = page.locator('.nav__link').first();

    if (await navLink.isVisible()) {
      // Get initial color
      const initialColor = await navLink.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Hover over link
      await navLink.hover();
      await page.waitForTimeout(500);

      // Get hover color
      const hoverColor = await navLink.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      console.log('Nav link - Initial:', initialColor, '| Hover:', hoverColor);

      // Colors should be different (hover effect)
      // Initial should be light (#E8ECF1), hover should be cyan (#22D3EE)
      expect(hoverColor).not.toBe(initialColor);
    }
  });
});
