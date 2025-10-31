import { test } from '@playwright/test';

test('Capture admin panel console errors', async ({ page }) => {
  const errors: string[] = [];
  const logs: string[] = [];

  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    logs.push(text);
    console.log(text);
  });

  page.on('pageerror', error => {
    const errorText = `PAGE ERROR: ${error.message}\n${error.stack}`;
    errors.push(errorText);
    console.error(errorText);
  });

  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  await page.waitForTimeout(5000);

  console.log('\n=== ALL ERRORS ===');
  errors.forEach(e => console.log(e));

  await page.screenshot({ path: 'admin-error.png', fullPage: true });
});
