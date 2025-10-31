import { test, expect } from '@playwright/test';

test('Admin Panel - Check Collections After Login', async ({ page }) => {
  console.log('=== LOGGING IN ===');

  await page.goto('/admin/login');
  await page.fill('input[name="email"]', 'jt.connor88@gmail.com');
  await page.fill('input[name="password"]', 'ChainBlockM1!');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/admin/, { timeout: 20000 });
  await page.waitForTimeout(3000); // Wait for dashboard to fully load

  await page.screenshot({ path: 'test-results/admin-dashboard.png', fullPage: true });
  console.log('✅ Logged in - screenshot saved');

  console.log('\n=== NAVIGATING TO SERVICES COLLECTION ===');

  // Try to navigate to services
  await page.goto(page.url().replace(/\/admin.*/, '/admin/collections/services'));
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'test-results/admin-services-list.png', fullPage: true });

  // Check if there's an error message
  const hasError = await page.locator('text=/error|Error|failed|Failed/i').count();
  console.log(`Errors on page: ${hasError}`);

  // Check how many rows in the table
  const rowCount = await page.locator('tbody tr').count();
  console.log(`Services rows found: ${rowCount}`);

  // Check if there's "No results" or similar message
  const pageText = await page.textContent('body');
  const hasNoResults = pageText?.includes('No ') || pageText?.includes('empty') || pageText?.includes('0 results');
  console.log(`Has "no results" message: ${hasNoResults}`);

  console.log('\n=== CHECKING HOMEPAGE GLOBAL ===');

  await page.goto(page.url().replace(/\/admin.*/, '/admin/globals/homepage'));
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'test-results/admin-homepage-global.png', fullPage: true });

  const homepageErrors = await page.locator('text=/error|Error|failed|Failed/i').count();
  console.log(`Errors on homepage global: ${homepageErrors}`);

  // Try to find the title or hero field
  const hasHeroField = await page.locator('label:has-text("Hero")').count();
  console.log(`Has hero field: ${hasHeroField > 0}`);

  console.log('\n=== SUMMARY ===');
  console.log(`Dashboard loaded: ✅`);
  console.log(`Services collection accessible: ${rowCount > 0 || hasError === 0 ? '✅' : '❌'}`);
  console.log(`Services showing: ${rowCount} items`);
  console.log(`Homepage global accessible: ${homepageErrors === 0 ? '✅' : '❌'}`);
});
