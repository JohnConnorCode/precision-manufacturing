import { test, expect } from '@playwright/test';

test('Admin page shows Tina Cloud editor when configured', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Should show "Loading Tina CMS Editor" instead of setup guide
  await page.waitForSelector('text=Loading Tina CMS Editor', { timeout: 10000 });
  
  // Verify setup guide is NOT showing
  const setupGuideCount = await page.locator('text=Setup Required').count();
  expect(setupGuideCount).toBe(0);
  
  // Verify loading message is visible
  expect(await page.textContent('text=Loading Tina CMS Editor')).toBeTruthy();
});

test('Admin page does not show setup guide when credentials are set', async ({ page }) => {
  await page.goto('http://localhost:3001/admin');
  
  // Wait a moment for page to load
  await page.waitForTimeout(2000);
  
  // Setup guide should NOT be present
  const setupGuide = await page.locator('text=Tina Cloud Setup Guide').count();
  expect(setupGuide).toBe(0);
  
  // Should be on editor loading state
  const isLoading = await page.locator('text=Loading').count();
  expect(isLoading).toBeGreaterThan(0);
});
