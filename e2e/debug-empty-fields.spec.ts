import { test, expect } from '@playwright/test';

test('Debug why fields appear empty in admin UI', async ({ page, context }) => {
  const email = 'jt.connor88@gmail.com';
  const password = 'ChainBlockM1!';

  // Capture console logs and errors
  const consoleLogs: string[] = [];
  const errors: string[] = [];

  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    consoleLogs.push(text);
    if (msg.type() === 'error') {
      console.error(text);
    }
  });

  page.on('pageerror', error => {
    errors.push(error.message);
    console.error('PAGE ERROR:', error.message);
  });

  // Intercept API calls to see what data is being fetched
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/globals/about')) {
      console.log(`\n=== API RESPONSE: ${url} ===`);
      console.log('Status:', response.status());
      try {
        const json = await response.json();
        console.log('Response data preview:', JSON.stringify(json).substring(0, 500));
      } catch (e) {
        console.log('Could not parse JSON');
      }
    }
  });

  // Login
  console.log('=== LOGGING IN ===');
  await page.goto('https://precision-manufacturing.vercel.app/admin/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Login")');
  await page.waitForURL('**/admin', { timeout: 15000 });

  console.log('✅ Logged in\n');

  // Navigate to About global
  console.log('=== NAVIGATING TO ABOUT GLOBAL ===');
  await page.goto('https://precision-manufacturing.vercel.app/admin/globals/about');
  await page.waitForTimeout(8000); // Wait for data to load

  await page.screenshot({ path: 'debug-about-before.png', fullPage: true });

  // Check what's in the DOM
  console.log('\n=== CHECKING DOM ELEMENTS ===');

  // Look for any inputs with specific names/IDs related to hero fields
  const heroFields = [
    'hero.backgroundImage',
    'hero.badge',
    'hero.title',
    'hero.description'
  ];

  for (const fieldName of heroFields) {
    // Try different selectors
    const selectors = [
      `input[name="${fieldName}"]`,
      `input[id*="${fieldName}"]`,
      `textarea[name="${fieldName}"]`,
      `[data-path="${fieldName}"] input`,
      `[data-path="${fieldName}"] textarea`
    ];

    for (const selector of selectors) {
      const element = page.locator(selector).first();
      const count = await element.count();
      if (count > 0) {
        const value = await element.inputValue().catch(() => '');
        console.log(`${fieldName} (${selector}):`, value ? `"${value.substring(0, 80)}..."` : '[EMPTY]');
        break;
      }
    }
  }

  // Get all text inputs and check their values
  console.log('\n=== ALL INPUT VALUES ===');
  const allInputs = await page.locator('input[type="text"], textarea').all();
  for (let i = 0; i < Math.min(15, allInputs.length); i++) {
    const value = await allInputs[i].inputValue().catch(() => '');
    const name = await allInputs[i].getAttribute('name').catch(() => '');
    if (value) {
      console.log(`Input ${i} [name="${name}"]: "${value.substring(0, 60)}..."`);
    } else {
      console.log(`Input ${i} [name="${name}"]: [EMPTY]`);
    }
  }

  // Check if there's a loading state
  const loadingElements = await page.locator('[class*="loading"], [class*="spinner"]').count();
  console.log('\nLoading indicators:', loadingElements);

  // Check for error messages
  const errorMessages = await page.locator('[class*="error"], [role="alert"]').count();
  console.log('Error messages:', errorMessages);

  console.log('\n=== CONSOLE ERRORS ===');
  console.log('Total errors:', errors.length);
  errors.forEach(e => console.log('  -', e));

  console.log('\n=== CRITICAL CONSOLE LOGS ===');
  const criticalLogs = consoleLogs.filter(log =>
    log.includes('error') ||
    log.includes('failed') ||
    log.includes('undefined') ||
    log.includes('null')
  );
  criticalLogs.slice(0, 10).forEach(log => console.log('  -', log));
});
