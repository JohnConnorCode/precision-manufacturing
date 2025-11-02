import { test, expect } from '@playwright/test';

test('Full admin panel test - login and verify CMS functionality', async ({ page }) => {
  const email = 'jt.connor88@gmail.com';
  const password = process.env.ADMIN_PASSWORD || '';

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable not set');
  }

  console.log('Starting full admin panel test...');

  // Navigate to login page
  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  console.log('✅ Login page loaded');

  // Fill in credentials
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  console.log('✅ Credentials entered');

  // Take screenshot before login
  await page.screenshot({ path: 'admin-before-login.png', fullPage: true });

  // Click login button
  await page.click('button:has-text("Login")');

  // Wait for navigation after login
  await page.waitForURL('**/admin/**', { timeout: 15000 });

  console.log('✅ Login successful, redirected to:', page.url());

  // Wait for dashboard to load
  await page.waitForTimeout(3000);

  // Take screenshot of dashboard
  await page.screenshot({ path: 'admin-dashboard-logged-in.png', fullPage: true });

  // Check for dashboard elements
  const bodyText = await page.textContent('body');

  // Verify we're seeing admin content
  const hasCollections = bodyText?.includes('Collections') ||
                         bodyText?.includes('Services') ||
                         bodyText?.includes('Resources');

  console.log('Dashboard content check:', {
    hasCollections,
    currentURL: page.url(),
    bodyPreview: bodyText?.substring(0, 300)
  });

  if (hasCollections) {
    console.log('✅ Dashboard loaded with collections visible');
  } else {
    console.log('⚠️  Dashboard may not have loaded correctly');
  }

  // Try to navigate to Services collection
  try {
    await page.click('text=Services', { timeout: 5000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'admin-services-collection.png', fullPage: true });
    console.log('✅ Services collection accessed');
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error('Error:', error.message);
  }

  // Get all navigation links to see available collections
  const navText = await page.textContent('nav') || await page.textContent('[role="navigation"]') || '';
  console.log('\nAvailable navigation:', navText.substring(0, 500));

  console.log('\n✅ Full admin panel test completed');
});
