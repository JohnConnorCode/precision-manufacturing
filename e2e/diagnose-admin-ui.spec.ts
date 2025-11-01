import { test, expect } from '@playwright/test';

test('diagnose admin UI rendering', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errors: string[] = [];

  // Capture console logs
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  // Capture errors
  page.on('pageerror', error => {
    errors.push(`PAGE ERROR: ${error.message}`);
  });

  console.log('\n=== Opening Admin Panel ===');
  await page.goto('http://localhost:3000/admin');

  await page.waitForTimeout(5000);

  // Take screenshot
  await page.screenshot({ path: '/tmp/admin-screenshot.png', fullPage: true });
  console.log('Screenshot saved to /tmp/admin-screenshot.png');

  // Get the page HTML
  const html = await page.content();
  console.log('\n=== Page Title ===');
  console.log(await page.title());

  // Check for common admin elements
  console.log('\n=== Looking for Admin Elements ===');
  const hasPayloadLogo = await page.locator('[class*="payload"]').count();
  const hasNav = await page.locator('nav').count();
  const hasSidebar = await page.locator('[class*="sidebar"], [class*="nav"]').count();
  const hasServices = await page.locator('text=Services').count();
  const hasIndustries = await page.locator('text=Industries').count();

  console.log(`Payload elements found: ${hasPayloadLogo}`);
  console.log(`Nav elements found: ${hasNav}`);
  console.log(`Sidebar/nav elements found: ${hasSidebar}`);
  console.log(`"Services" text found: ${hasServices} times`);
  console.log(`"Industries" text found: ${hasIndustries} times`);

  // Print all text content
  console.log('\n=== Visible Text (first 1000 chars) ===');
  const bodyText = await page.locator('body').textContent();
  console.log(bodyText?.substring(0, 1000));

  // Check for errors
  console.log('\n=== Browser Errors ===');
  if (errors.length > 0) {
    console.log(errors.join('\n'));
  } else {
    console.log('No JavaScript errors detected');
  }

  // Print relevant console messages
  console.log('\n=== Console Messages (errors and warnings only) ===');
  const relevantMessages = consoleMessages.filter(msg =>
    msg.includes('[error]') || msg.includes('[warning]') || msg.includes('import')
  );
  if (relevantMessages.length > 0) {
    console.log(relevantMessages.join('\n'));
  } else {
    console.log('No relevant console messages');
  }

  // Check if we're on login page
  const isLoginPage = await page.locator('input[type="email"], input[type="password"]').count() > 0;
  console.log('\n=== Page Type ===');
  console.log(isLoginPage ? 'LOGIN PAGE' : 'DASHBOARD PAGE');
});
