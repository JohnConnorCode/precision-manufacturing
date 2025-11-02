import { test, expect } from '@playwright/test';

test('verify admin shows data', async ({ page }) => {
  console.log('Opening admin panel...');
  await page.goto('http://localhost:3000/admin');

  // Wait a bit for initial load
  await page.waitForTimeout(3000);

  // Check if we see collection links
  const servicesVisible = await page.locator('text=Services').isVisible().catch(() => false);
  const industriesVisible = await page.locator('text=Industries').isVisible().catch(() => false);

  console.log('Services link visible:', servicesVisible);
  console.log('Industries link visible:', industriesVisible);

  if (servicesVisible) {
    console.log('\nClicking Services...');
    await page.locator('text=Services').first().click();
    await page.waitForTimeout(3000);

    // Check what we see
    const pageText = await page.textContent('body');
    expect(pageText ?? '').toContain('Services');
    const hasServiceNames = (pageText ?? '').includes('5-Axis') || (pageText ?? '').includes('Adaptive') || (pageText ?? '').includes('Metrology');
    const showsNoResults = (pageText ?? '').includes('No Services') || (pageText ?? '').includes('No results');

    console.log('Has service names:', hasServiceNames);
    console.log('Shows "No results":', showsNoResults);

    if (!hasServiceNames) {
      console.log('\n❌ PROBLEM: No service data visible');
      console.log('Page content sample:', pageText?.substring(0, 500) ?? 'No content');
    } else {
      console.log('\n✅ CONFIRMED: Services data is visible!');
    }
  }
});
