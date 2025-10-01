import { Page, expect } from '@playwright/test';
import type { RouteConfig } from '../config/routes';

/**
 * Reusable test utilities for DRY E2E testing
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Validate that a route loads successfully with expected HTTP status
   */
  async validateRouteLoads(route: RouteConfig, expectedStatus = 200) {
    const response = await this.page.goto(route.path, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    if (expectedStatus === 200) {
      expect(response?.status()).toBeLessThan(400);
    } else {
      expect(response?.status()).toBe(expectedStatus);
    }
  }

  /**
   * Validate expected content is present on the page
   */
  async validateContent(route: RouteConfig) {
    const content = await this.page.textContent('body');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(100);

    // Check for expected content strings
    for (const expectedText of route.expectedContent) {
      expect(content, `Expected content "${expectedText}" not found on ${route.path}`).toContain(expectedText);
    }
  }

  /**
   * Validate required HTML elements exist
   */
  async validateRequiredElements(route: RouteConfig) {
    if (!route.requiredElements) return;

    for (const selector of route.requiredElements) {
      const element = this.page.locator(selector).first();
      await expect(element, `Required element "${selector}" not found on ${route.path}`).toBeAttached();
    }
  }

  /**
   * Validate SEO meta tags
   */
  async validateMetaTags(route: RouteConfig) {
    if (!route.requiredMetaTags) return;

    // Title validation
    if (route.requiredMetaTags.title) {
      const title = await this.page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title).toMatch(route.requiredMetaTags.title);
    }

    // Description validation
    if (route.requiredMetaTags.description) {
      const description = await this.page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect(description, `Meta description missing on ${route.path}`).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
    }

    // OG Image validation
    if (route.requiredMetaTags.ogImage) {
      const ogImage = await this.page
        .locator('meta[property="og:image"]')
        .getAttribute('content');
      expect(ogImage, `OG image missing on ${route.path}`).toBeTruthy();
    }
  }

  /**
   * Validate all images have alt tags and load successfully
   */
  async validateImages() {
    const images = await this.page.locator('img').all();

    for (const img of images) {
      // Check alt tag exists
      const alt = await img.getAttribute('alt');
      expect(alt, 'Image missing alt tag').toBeTruthy();

      // Check image loaded (has natural width > 0)
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth, `Image failed to load: ${await img.getAttribute('src')}`).toBeGreaterThan(0);
    }
  }

  /**
   * Check for console errors
   */
  async validateNoConsoleErrors() {
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await this.page.waitForLoadState('networkidle');
    expect(errors, `Console errors found: ${JSON.stringify(errors)}`).toHaveLength(0);
  }

  /**
   * Validate structured data (JSON-LD)
   */
  async validateStructuredData() {
    const jsonLd = await this.page.locator('script[type="application/ld+json"]').first();
    if (await jsonLd.count() > 0) {
      const content = await jsonLd.textContent();
      expect(content).toBeTruthy();

      // Validate it's valid JSON
      expect(() => JSON.parse(content!)).not.toThrow();

      const data = JSON.parse(content!);
      expect(data).toBeTruthy();
      expect(data['@context']).toBe('https://schema.org');
    }
  }

  /**
   * Validate navigation is present and working
   */
  async validateNavigation() {
    // Check header exists
    const header = this.page.locator('header');
    await expect(header).toBeVisible();

    // Check main nav links are present
    const aboutLink = this.page.locator('a[href="/about"]').first();
    await expect(aboutLink).toBeAttached();
  }

  /**
   * Validate footer is present
   */
  async validateFooter() {
    const footer = this.page.locator('footer');
    await expect(footer).toBeAttached();
  }

  /**
   * Comprehensive page validation
   */
  async validatePage(route: RouteConfig) {
    await this.validateRouteLoads(route);
    await this.validateContent(route);
    await this.validateRequiredElements(route);
    await this.validateMetaTags(route);

    if (route.type === 'page' || route.type === 'article') {
      await this.validateNavigation();
      await this.validateFooter();
      await this.validateStructuredData();
    }
  }
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page, ms = 1000) {
  await page.waitForTimeout(ms);
}

/**
 * Scroll to bottom of page
 */
export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await waitForAnimations(page, 500);
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `/tmp/${name}-${timestamp}.png`,
    fullPage: true
  });
}
