import { test } from '@playwright/test';

test('Inspect CSS styling of input fields', async ({ page }) => {
  const email = 'jt.connor88@gmail.com';
  const password = 'ChainBlockM1!';

  // Login
  await page.goto('https://precision-manufacturing.vercel.app/admin/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/admin', { timeout: 15000 });

  // Navigate to About global
  await page.goto('https://precision-manufacturing.vercel.app/admin/globals/about');
  await page.waitForTimeout(5000);

  // Get the first text input
  const input = page.locator('input[name="hero.badge"]').first();

  // Get computed styles
  const styles = await input.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      border: computed.border,
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      opacity: computed.opacity,
      visibility: computed.visibility,
      display: computed.display
    };
  });

  console.log('\n=== INPUT FIELD STYLES ===');
  console.log(JSON.stringify(styles, null, 2));

  // Check the parent container
  const parentStyles = await input.evaluate((el) => {
    const parent = el.parentElement;
    if (!parent) return null;
    const computed = window.getComputedStyle(parent);
    return {
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      className: parent.className
    };
  });

  console.log('\n=== PARENT CONTAINER STYLES ===');
  console.log(JSON.stringify(parentStyles, null, 2));

  // Check if there's a theme/dark mode setting
  const htmlClasses = await page.evaluate(() => {
    return {
      html: document.documentElement.className,
      body: document.body.className,
      dataTheme: document.documentElement.getAttribute('data-theme')
    };
  });

  console.log('\n=== PAGE THEME ===');
  console.log(JSON.stringify(htmlClasses, null, 2));

  // Try to find any Payload theme configuration
  const payloadConfig = await page.evaluate(() => {
    // Check for any global Payload config
    return {
      hasPayload: typeof (window as any).payload !== 'undefined',
      theme: (window as any).payload?.theme || 'not found'
    };
  });

  console.log('\n=== PAYLOAD CONFIG ===');
  console.log(JSON.stringify(payloadConfig, null, 2));
});
