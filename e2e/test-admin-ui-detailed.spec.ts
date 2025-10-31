import { test, expect } from '@playwright/test';

test('Detailed check of admin panel UI - check for content in fields', async ({ page }) => {
  const email = 'jt.connor88@gmail.com';
  const password = 'ChainBlockM1!';

  // Login
  await page.goto('https://precision-manufacturing.vercel.app/admin/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/admin', { timeout: 15000 });

  console.log('✅ Logged in\n');

  // Go directly to About global
  await page.goto('https://precision-manufacturing.vercel.app/admin/globals/about');
  await page.waitForTimeout(5000); // Wait longer for content to load

  // Take screenshot
  await page.screenshot({ path: 'admin-about-detailed.png', fullPage: true });

  // Check for specific content
  const bodyText = await page.textContent('body');

  console.log('=== CHECKING FOR CONTENT IN PAGE ===');
  console.log('Has "PRECISION MANUFACTURING SINCE 1995":', bodyText?.includes('PRECISION MANUFACTURING SINCE 1995'));
  console.log('Has "About Our Company":', bodyText?.includes('About Our Company'));
  console.log('Has "30+":', bodyText?.includes('30+'));
  console.log('Has "aerospace":', bodyText?.includes('aerospace'));

  // Check input values
  const inputs = await page.locator('input[type="text"], textarea').all();
  console.log(`\nFound ${inputs.length} input fields`);

  for (let i = 0; i < Math.min(inputs.length, 10); i++) {
    const value = await inputs[i].inputValue().catch(() => '');
    const placeholder = await inputs[i].getAttribute('placeholder').catch(() => '');
    if (value) {
      console.log(`Input ${i}: "${value.substring(0, 50)}..."`);
    } else if (placeholder) {
      console.log(`Input ${i}: [empty, placeholder: "${placeholder}"]`);
    }
  }
});
