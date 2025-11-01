import { test } from '@playwright/test';

test('Inspect actual applied styles', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000/admin/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="email"]').fill('jt.connor88@gmail.com');
  await page.locator('input[name="password"]').fill('ChainBlockM1!');
  await page.locator('button:has-text("Login")').click();
  await page.waitForURL('**/admin');
  await page.waitForLoadState('networkidle');

  // Go to service edit page
  await page.goto('http://localhost:3000/admin/collections/services/69030353f0d205b6f5595aed');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Check what CSS is actually loaded
  const loadedStyles = await page.evaluate(() => {
    const stylesheets = Array.from(document.styleSheets);
    const customSheet = stylesheets.find(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        return rules.some(rule => rule.cssText.includes('brand-cyan'));
      } catch (e) {
        return false;
      }
    });

    if (customSheet) {
      console.log('Found custom stylesheet at:', customSheet.href);
      return true;
    }
    return false;
  });

  console.log('Custom stylesheet loaded:', loadedStyles);

  // Check computed styles on header
  const headerStyles = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) {
      const computed = window.getComputedStyle(header);
      return {
        background: computed.background,
        backgroundColor: computed.backgroundColor,
        borderBottom: computed.borderBottom,
      };
    }
    return null;
  });

  console.log('Header computed styles:', JSON.stringify(headerStyles, null, 2));

  // List all loaded stylesheets
  const allSheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(sheet => ({
      href: sheet.href,
      rules: sheet.cssRules?.length || 0,
    }));
  });

  console.log('All stylesheets:', JSON.stringify(allSheets, null, 2));
});
