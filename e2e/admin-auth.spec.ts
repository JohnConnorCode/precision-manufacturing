import { test, expect } from '@playwright/test';

test('Admin page shows login form initially', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Wait for the page to load
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  
  // Verify login form is visible
  expect(await page.textContent('text=Admin Password')).toBeTruthy();
  expect(await page.locator('input[type="password"]').count()).toBe(1);
  expect(await page.textContent('button:has-text("Login")')).toBeTruthy();
});

test('Admin page rejects incorrect password', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Wait for the page to load
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  
  // Enter wrong password
  await page.fill('input[type="password"]', 'WrongPassword123');
  await page.click('button:has-text("Login")');
  
  // Check for error message
  await page.waitForSelector('text=Invalid password', { timeout: 5000 });
  expect(await page.textContent('text=Invalid password')).toBeTruthy();
});

test('Admin page accepts correct password', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Wait for the page to load
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  
  // Enter correct password (from .env.local)
  await page.fill('input[type="password"]', 'ChangeMeToSecurePassword123!');
  await page.click('button:has-text("Login")');
  
  // Wait for dashboard to appear
  await page.waitForSelector('text=Welcome to Tina CMS', { timeout: 10000 });
  
  // Verify dashboard is showing
  expect(await page.textContent('text=Welcome to Tina CMS')).toBeTruthy();
  expect(await page.textContent('text=Tina CMS Admin')).toBeTruthy();
  expect(await page.locator('button:has-text("Logout")').count()).toBe(1);
});

test('Admin dashboard shows content management info', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Login first
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  await page.fill('input[type="password"]', 'ChangeMeToSecurePassword123!');
  await page.click('button:has-text("Login")');
  
  // Wait for dashboard
  await page.waitForSelector('text=Welcome to Tina CMS', { timeout: 10000 });
  
  // Verify key sections are visible
  expect(await page.textContent('text=Content Management')).toBeTruthy();
  expect(await page.textContent('text=Services')).toBeTruthy();
  expect(await page.textContent('text=Industries')).toBeTruthy();
  expect(await page.textContent('text=Auto-Deploy')).toBeTruthy();
});

test('Logout button clears session', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Login first
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  await page.fill('input[type="password"]', 'ChangeMeToSecurePassword123!');
  await page.click('button:has-text("Login")');
  
  // Wait for dashboard
  await page.waitForSelector('text=Logout', { timeout: 10000 });
  
  // Click logout
  await page.click('button:has-text("Logout")');
  
  // Wait for login form to reappear
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  
  // Verify back at login page
  expect(await page.textContent('text=Admin Password')).toBeTruthy();
});

test('Session persists after page reload', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Login
  await page.waitForSelector('text=Admin Password', { timeout: 10000 });
  await page.fill('input[type="password"]', 'ChangeMeToSecurePassword123!');
  await page.click('button:has-text("Login")');
  
  // Wait for dashboard
  await page.waitForSelector('text=Welcome to Tina CMS', { timeout: 10000 });
  
  // Reload page
  await page.reload();
  
  // Should still be logged in
  await page.waitForSelector('text=Welcome to Tina CMS', { timeout: 10000 });
  expect(await page.textContent('text=Welcome to Tina CMS')).toBeTruthy();
});
