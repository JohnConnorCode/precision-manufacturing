import { test, expect } from '@playwright/test';

test('Setup guide displays when Tina Cloud not configured', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Wait for content to load
  await page.waitForSelector('text=Setup Required', { timeout: 10000 });
  
  // Verify setup guide sections
  expect(await page.textContent('text=Setup Required')).toBeTruthy();
  expect(await page.textContent('text=Tina CMS Editor')).toBeTruthy();
  expect(await page.textContent('text=Quick Setup')).toBeTruthy();
  expect(await page.textContent('text=Sign up for Tina Cloud')).toBeTruthy();
});

test('Setup guide shows all required steps', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  await page.waitForSelector('text=Setup Required', { timeout: 10000 });
  
  // Verify all setup steps are visible
  expect(await page.textContent('text=Create a new project')).toBeTruthy();
  expect(await page.textContent('text=Get API credentials')).toBeTruthy();
  expect(await page.textContent('text=Add to environment variables')).toBeTruthy();
  expect(await page.textContent('text=Redeploy')).toBeTruthy();
});

test('Setup guide links to documentation', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  await page.waitForSelector('text=TINA_CLOUD_SETUP.md', { timeout: 10000 });
  
  // Verify help resources are shown
  expect(await page.textContent('text=Detailed Guide')).toBeTruthy();
  expect(await page.textContent('text=Pricing')).toBeTruthy();
  expect(await page.textContent('text=Free tier available')).toBeTruthy();
});

test('Setup guide explains features', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  await page.waitForSelector('text=What You Get', { timeout: 10000 });
  
  // Verify feature list
  expect(await page.textContent('text=Professional visual editor')).toBeTruthy();
  expect(await page.textContent('text=User management')).toBeTruthy();
  expect(await page.textContent('text=Git integration')).toBeTruthy();
});
