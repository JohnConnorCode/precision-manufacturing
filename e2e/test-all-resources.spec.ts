import { test, expect } from '@playwright/test';
import { getAllTechnicalArticles } from '../lib/technical-articles';

const articles = getAllTechnicalArticles();

test.describe('Resources Pages - Complete Test Suite', () => {

  test('Resources index page loads successfully', async ({ page }) => {
    const response = await page.goto('/resources');
    expect(response?.status()).toBe(200);

    // Check title
    await expect(page.locator('h1')).toContainText('Technical');

    // Check article count
    const articleCount = await page.locator('a[href*="/resources/articles/"]').count();
    console.log(`Found ${articleCount} article links on resources page`);
    expect(articleCount).toBe(articles.length);
  });

  test('All article pages load successfully', async ({ page }) => {
    const results: { slug: string; status: number; title: string | null; error?: string }[] = [];

    for (const article of articles) {
      try {
        const url = `/resources/articles/${article.metadata.slug}`;
        const response = await page.goto(url, { timeout: 30000 });
        const status = response?.status() || 0;

        // Get page title
        const title = await page.locator('h1').first().textContent({ timeout: 5000 }).catch(() => null);

        results.push({
          slug: article.metadata.slug,
          status,
          title,
        });

        // Log progress
        console.log(`${results.length}/${articles.length} - ${article.metadata.slug}: ${status} ${status === 200 ? '✓' : '✗'}`);

        // Expect 200 status
        expect(status, `Article ${article.metadata.slug} should return 200`).toBe(200);

        // Expect h1 to be present
        expect(title, `Article ${article.metadata.slug} should have h1 title`).toBeTruthy();

      } catch (error) {
        results.push({
          slug: article.metadata.slug,
          status: 0,
          title: null,
          error: String(error),
        });
        console.error(`✗ FAILED: ${article.metadata.slug} - ${error}`);
      }
    }

    // Summary
    const successful = results.filter(r => r.status === 200).length;
    const failed = results.filter(r => r.status !== 200);

    console.log(`\n=== SUMMARY ===`);
    console.log(`Total: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log(`\nFailed articles:`);
      failed.forEach(f => console.log(`  - ${f.slug}: ${f.status || 'ERROR'}`));
    }

    // All must pass
    expect(failed.length, 'All articles must load successfully').toBe(0);
  });

  test('404 page works for invalid article', async ({ page }) => {
    const response = await page.goto('/resources/articles/invalid-article-slug');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h2')).toContainText('404');
  });

  test('Article navigation breadcrumbs work', async ({ page }) => {
    // Test first article
    await page.goto(`/resources/articles/${articles[0].metadata.slug}`);

    // Check breadcrumb exists
    const breadcrumb = page.locator('nav a[href="/resources"]').first();
    await expect(breadcrumb).toBeVisible();

    // Click breadcrumb
    await breadcrumb.click();
    await page.waitForLoadState('networkidle');

    // Should be back on resources page
    expect(page.url()).toContain('/resources');
  });
});
