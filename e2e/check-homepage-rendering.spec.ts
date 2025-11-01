import { test } from '@playwright/test';

test('check homepage content rendering and console errors', async ({ page }) => {
  const consoleMessages: string[] = [];
  const errors: string[] = [];

  // Capture console messages
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (msg.type() === 'error') {
      errors.push(text);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    errors.push(`PAGE ERROR: ${error.message}`);
  });

  console.log('\n=== NAVIGATING TO HOMEPAGE ===');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(5000);

  console.log('\n=== CONSOLE MESSAGES ===');
  consoleMessages.forEach(msg => console.log(msg));

  console.log('\n=== ERRORS ===');
  if (errors.length > 0) {
    console.log('❌ Found errors:');
    errors.forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('✅ No JavaScript errors');
  }

  // Check if sections are rendering
  console.log('\n=== CHECKING SECTION VISIBILITY ===');

  const hero = await page.locator('section').first().isVisible();
  console.log('Hero section visible:', hero);

  // Count all sections
  const sectionCount = await page.locator('section').count();
  console.log('Total sections on page:', sectionCount);

  // Check for Services section content
  const hasServicesText = await page.getByText('PRECISION').first().isVisible().catch(() => false);
  console.log('Services section title visible:', hasServicesText);

  // Check for Industries section content
  const hasIndustriesText = await page.getByText('INDUSTRY').first().isVisible().catch(() => false);
  console.log('Industries section title visible:', hasIndustriesText);

  // Check for Resources section content
  const hasResourcesText = await page.getByText('Master Precision Manufacturing').isVisible().catch(() => false);
  console.log('Resources section visible:', hasResourcesText);

  // Take a screenshot
  await page.screenshot({ path: '/tmp/homepage-check.png', fullPage: true });
  console.log('\n✅ Screenshot saved to /tmp/homepage-check.png');

  // Get HTML of services section
  const servicesSection = await page.locator('section').nth(1).innerHTML().catch(() => 'Not found');
  console.log('\n=== SERVICES SECTION HTML (first 500 chars) ===');
  console.log(servicesSection.substring(0, 500));
});
