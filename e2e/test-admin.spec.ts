import { test, expect } from '@playwright/test';

test('Payload admin login page loads', async ({ page }) => {
  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Wait for the Payload logo
  await page.waitForSelector('.graphic-logo', { timeout: 10000 });
  
  // Check for email/username field
  const hasEmailField = await page.locator('input[name="email"], input[type="email"]').count();
  const hasUsernameField = await page.locator('input[name="username"]').count();
  
  console.log('Email fields found:', hasEmailField);
  console.log('Username fields found:', hasUsernameField);
  
  // Check for password field
  const passwordFields = await page.locator('input[type="password"]').count();
  console.log('Password fields found:', passwordFields);
  
  // Check for login button
  const loginButtons = await page.locator('button:has-text("Login"), button[type="submit"]').count();
  console.log('Login buttons found:', loginButtons);
  
  // Take a screenshot
  await page.screenshot({ path: 'admin-login.png', fullPage: true });
  
  expect(hasEmailField + hasUsernameField).toBeGreaterThan(0);
  expect(passwordFields).toBeGreaterThan(0);
});
