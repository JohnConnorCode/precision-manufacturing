import { test, expect } from '@playwright/test';

test('Diagnose admin panel loading', async ({ page }) => {
  console.log('=== ADMIN PANEL DIAGNOSTIC ===\n');

  // Capture console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Capture page errors
  const pageErrors: string[] = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  // Go to admin login
  console.log('1. Loading admin login page...');
  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for page to settle
  await page.waitForTimeout(5000);

  console.log('\n2. Page Info:');
  console.log('   - Title:', await page.title());
  console.log('   - URL:', page.url());

  // Check DOM state
  console.log('\n3. DOM Elements:');
  const emailInput = await page.locator('input[name="email"]').count();
  const passwordInput = await page.locator('input[name="password"]').count();
  const submitButton = await page.locator('button[type="submit"]').count();
  const payloadRoot = await page.locator('#payload-root, [id*="payload"]').count();

  console.log('   - Email input found:', emailInput > 0);
  console.log('   - Password input found:', passwordInput > 0);
  console.log('   - Submit button found:', submitButton > 0);
  console.log('   - Payload root element found:', payloadRoot > 0);

  // Check for loading states
  const loadingElements = await page.locator('[class*="loading"], [class*="spinner"]').count();
  console.log('   - Loading indicators:', loadingElements);

  // Check body content
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n4. Page Text (first 300 chars):', bodyText.substring(0, 300));

  // Check for React/Next errors
  console.log('\n5. JavaScript Errors:');
  console.log('   - Console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(err => console.log('     *', err));
  }
  console.log('   - Page errors:', pageErrors.length);
  if (pageErrors.length > 0) {
    pageErrors.forEach(err => console.log('     *', err));
  }

  // Take screenshot
  await page.screenshot({ path: 'admin-login-debug.png', fullPage: true });
  console.log('\n6. Screenshot saved to: admin-login-debug.png');

  // Check network requests
  console.log('\n7. Checking for failed network requests...');
  const failedRequests: string[] = [];
  page.on('response', response => {
    if (!response.ok() && response.url().includes('admin')) {
      failedRequests.push(`${response.status()} - ${response.url()}`);
    }
  });

  // Check if scripts loaded
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script[src]'))
      .map(s => (s as HTMLScriptElement).src)
      .filter(src => src.includes('_next'));
  });
  console.log('   - Next.js scripts loaded:', scripts.length);

  console.log('\n=== DIAGNOSTIC COMPLETE ===');
});
