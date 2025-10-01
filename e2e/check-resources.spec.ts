import { test, expect } from '@playwright/test';

test('Check resources page and links', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Visit resources page
  console.log('\n=== TESTING /resources ===');
  const response = await page.goto('http://localhost:3001/resources');
  console.log(`Status: ${response?.status()}`);

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'resources-page.png', fullPage: true });

  // Find article links
  const articleLinks = await page.locator('a[href*="technical-articles"], a[href*="/resources/"]').all();
  console.log(`\nFound ${articleLinks.length} resource/article links`);

  // Get first few links
  for (let i = 0; i < Math.min(5, articleLinks.length); i++) {
    const href = await articleLinks[i].getAttribute('href');
    const text = await articleLinks[i].textContent();
    console.log(`Link ${i + 1}: ${text?.trim()} -> ${href}`);
  }

  // Try visiting first article
  if (articleLinks.length > 0) {
    const firstHref = await articleLinks[0].getAttribute('href');
    if (firstHref) {
      console.log(`\n=== TESTING FIRST ARTICLE: ${firstHref} ===`);
      const articleResponse = await page.goto(`http://localhost:3001${firstHref}`);
      console.log(`Status: ${articleResponse?.status()}`);

      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'article-page.png', fullPage: true });

      // Check for broken elements
      const h1 = await page.locator('h1').first().textContent();
      console.log(`Article title: ${h1}`);
    }
  }

  // Check for 404s or errors
  if (errors.length > 0) {
    console.log(`\n⚠️  CONSOLE ERRORS FOUND:`);
    errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
  }
});
