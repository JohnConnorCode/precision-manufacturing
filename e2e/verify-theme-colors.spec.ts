import { test, expect } from '@playwright/test';

test('Verify admin theme colors are applied', async ({ page }) => {
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

  // Check header background color
  const header = page.locator('header.app-header').first();
  const headerBg = await header.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('Header background:', headerBg);

  // Check header border color
  const headerBorder = await header.evaluate((el) => {
    return window.getComputedStyle(el).borderBottomColor;
  });
  console.log('Header border:', headerBorder);

  // Check nav background
  const nav = page.locator('nav.nav__wrap').first();
  const navBg = await nav.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });
  console.log('Nav background:', navBg);

  // Check CSS variable values
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const styles = window.getComputedStyle(root);
    return {
      brandCyan: styles.getPropertyValue('--brand-cyan').trim(),
      brandDark: styles.getPropertyValue('--brand-dark').trim(),
      themeSuccess500: styles.getPropertyValue('--theme-success-500').trim(),
      themeElevation0: styles.getPropertyValue('--theme-elevation-0').trim(),
    };
  });
  console.log('CSS Variables:', cssVars);

  // Check if a submit button has cyan gradient
  const submitButton = page.locator('button[type="submit"]').first();
  if (await submitButton.count() > 0) {
    const buttonBg = await submitButton.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });
    console.log('Submit button background:', buttonBg);
  }

  // Check text input styling
  const textInput = page.locator('input[type="text"]').first();
  if (await textInput.count() > 0) {
    const inputStyles = await textInput.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.backgroundColor,
        color: styles.color,
        border: styles.border,
      };
    });
    console.log('Text input styles:', inputStyles);
  }

  // Check if admin-custom.css is loaded
  const customCssLoaded = await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    return sheets.some(sheet => {
      try {
        return sheet.href?.includes('admin-custom.css') ||
               Array.from(sheet.cssRules).some(rule =>
                 rule.cssText.includes('--brand-cyan')
               );
      } catch (e) {
        return false;
      }
    });
  });
  console.log('Custom CSS loaded:', customCssLoaded);

  // Take a closer screenshot of just the header and first form section
  await page.screenshot({
    path: '/tmp/admin-header-close.png',
    clip: { x: 0, y: 0, width: 1280, height: 600 }
  });
});
