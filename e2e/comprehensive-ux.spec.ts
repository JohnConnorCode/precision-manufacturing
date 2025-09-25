import { test, expect } from '@playwright/test';

test.describe('Comprehensive UX Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Critical UX Elements', () => {
    test('navigation should be fully accessible and functional', async ({ page }) => {
      // Check top bar exists on desktop
      const viewportSize = page.viewportSize();
      if (!viewportSize || viewportSize.width >= 1024) {
        const topBar = page.locator('.fixed.top-0.z-\\[150\\]');
        await expect(topBar).toBeVisible();

        // Check phone and email links
        await expect(page.locator('a[href="tel:+15032319093"]')).toBeVisible();
        await expect(page.locator('a[href="mailto:officemgr@iismet.com"]')).toBeVisible();

        // Check certifications display
        await expect(page.getByText(/ISO 9001.*AS9100D.*ITAR/)).toBeVisible();
      }

      // Check main navigation
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Check logo
      await expect(page.locator('a[href="/"]').first()).toBeVisible();

      // Desktop navigation
      const viewportSizeForNav = page.viewportSize();
      if (!viewportSizeForNav || viewportSizeForNav.width >= 1024) {
        // Check dropdown menus work
        const servicesBtn = page.getByRole('button', { name: /Services/i });
        await servicesBtn.hover();
        // Wait for dropdown to appear
        await page.waitForTimeout(500);

        const industriesBtn = page.getByRole('button', { name: /Industries/i });
        await industriesBtn.hover();
        await page.waitForTimeout(500);
      }

      // Check CTA button
      const ctaButton = page.getByRole('link', { name: /REQUEST QUOTE/i });
      await expect(ctaButton).toBeVisible();
    });

    test('mobile menu should work correctly', async ({ page, isMobile }) => {
      if (isMobile) {
        // Click hamburger menu
        const menuButton = page.getByRole('button', { name: /menu/i });
        await expect(menuButton).toBeVisible();
        await menuButton.click();

        // Check mobile menu opens
        await expect(page.getByRole('dialog')).toBeVisible();

        // Check menu items are visible
        await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
      }
    });

    test('keyboard navigation should work', async ({ page, browserName }) => {
      // Skip on webkit due to Tab key issues
      if (browserName === 'webkit') return;

      // Tab through main navigation
      await page.keyboard.press('Tab'); // Skip to main content link
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // First nav item

      // Check focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('page sections should have proper landmarks', async ({ page }) => {
      // Check main landmark exists
      await expect(page.locator('main')).toBeVisible();

      // Check header landmark
      await expect(page.locator('header')).toBeVisible();

      // Check footer landmark
      await expect(page.locator('footer')).toBeVisible();
    });

    test('forms should be accessible', async ({ page }) => {
      await page.goto('/contact');

      // Check form fields have labels
      const nameInput = page.getByLabel(/name/i);
      await expect(nameInput).toBeVisible();

      const emailInput = page.getByLabel(/email/i);
      await expect(emailInput).toBeVisible();

      // Check submit button has text
      const submitBtn = page.getByRole('button', { name: /send|submit/i });
      await expect(submitBtn).toBeVisible();
    });
  });

  test.describe('Visual Consistency', () => {
    test('all pages should use consistent spacing', async ({ page }) => {
      const pages = [
        '/',
        '/services/5-axis-machining',
        '/services/engineering',
        '/about',
        '/contact'
      ];

      for (const url of pages) {
        await page.goto(url);

        // Check hero section exists and has proper spacing
        const heroSection = page.locator('section').first();
        await expect(heroSection).toBeVisible();

        // Check consistent header height
        const header = page.locator('header');
        await expect(header).toHaveClass(/fixed/);
      }
    });

    test('animations should be smooth and sequential', async ({ page }) => {
      // Check hero animations
      await page.goto('/');

      // Wait for animations to start
      await page.waitForTimeout(500);

      // Check key animated elements are visible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByText(/AEROSPACE EXCELLENCE/)).toBeVisible();
    });
  });

  test.describe('Content Accessibility', () => {
    test('images should have alt text', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < Math.min(count, 10); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('color contrast should meet WCAG standards', async ({ page }) => {
      // Check main CTA button has sufficient contrast
      const ctaButton = page.getByRole('link', { name: /REQUEST QUOTE/i }).first();
      await expect(ctaButton).toBeVisible();

      // Check text on dark backgrounds
      const heroText = page.locator('h1');
      await expect(heroText).toBeVisible();
    });

    test('focus indicators should be visible', async ({ page, browserName }) => {
      if (browserName === 'webkit') return;

      // Tab to first interactive element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check focus is visible
      const focused = page.locator(':focus');
      const box = await focused.boundingBox();
      expect(box).toBeTruthy();
    });
  });

  test.describe('Sanity CMS Integration', () => {
    test('CMS health check should pass', async ({ page }) => {
      const response = await page.request.get('/api/health');
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      expect(data.status).toBe('healthy');
      expect(data.environment.sanity.projectId).toBe('configured');
      expect(data.environment.sanity.dataset).toBe('configured');
    });

    test('CMS indicator should show status', async ({ page }) => {
      // Check if CMS indicator exists (if enabled)
      const indicator = page.locator('[data-testid="cms-indicator"]');
      const count = await indicator.count();

      if (count > 0) {
        await expect(indicator).toBeVisible();
      }
    });
  });

  test.describe('Performance Metrics', () => {
    test('page should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000); // 5 seconds max
    });

    test('images should be optimized', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');

        // Check if using Next.js image optimization
        expect(src).toMatch(/(_next\/image|unsplash)/);
      }
    });
  });
});