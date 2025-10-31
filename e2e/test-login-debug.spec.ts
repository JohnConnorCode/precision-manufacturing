import { test, expect } from '@playwright/test';

test('Debug admin login with detailed error capture', async ({ page }) => {
  const email = 'jt.connor88@gmail.com';
  const password = 'ChainBlockM1!';

  const consoleMessages: string[] = [];
  const errors: string[] = [];
  const networkErrors: string[] = [];

  // Capture all console messages
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    consoleMessages.push(text);
    console.log(text);
  });

  // Capture page errors
  page.on('pageerror', error => {
    errors.push(error.message);
    console.error('PAGE ERROR:', error.message);
  });

  // Capture network failures
  page.on('requestfailed', request => {
    networkErrors.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
    console.error('NETWORK ERROR:', request.url(), request.failure()?.errorText);
  });

  // Capture responses
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/') || url.includes('/login')) {
      console.log(`API Response: ${response.status()} ${url}`);
      if (response.status() >= 400) {
        try {
          const body = await response.text();
          console.log('Error response body:', body.substring(0, 500));
        } catch (e) {
          // Ignore
        }
      }
    }
  });

  // Navigate to login page
  await page.goto('https://precision-manufacturing.vercel.app/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  console.log('\n=== FILLING IN CREDENTIALS ===');

  // Fill in credentials
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page.screenshot({ path: 'login-before-submit.png', fullPage: true });

  console.log('\n=== CLICKING LOGIN BUTTON ===');

  // Click login and wait for response
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('/api/') || response.url().includes('/login')),
    page.click('button:has-text("Login")'),
  ]);

  console.log('Login response:', response.status(), response.url());

  try {
    const responseBody = await response.json();
    console.log('Login response body:', JSON.stringify(responseBody, null, 2));
  } catch (e) {
    console.log('Could not parse response as JSON');
  }

  // Wait a bit for any redirects
  await page.waitForTimeout(5000);

  const finalUrl = page.url();
  console.log('\n=== FINAL STATE ===');
  console.log('Final URL:', finalUrl);

  // Check for error messages on the page
  const bodyText = await page.textContent('body');
  if (bodyText?.toLowerCase().includes('incorrect') || bodyText?.toLowerCase().includes('error')) {
    console.log('ERROR MESSAGE ON PAGE:', bodyText.match(/.{0,100}(incorrect|error).{0,100}/i)?.[0]);
  }

  await page.screenshot({ path: 'login-after-submit.png', fullPage: true });

  console.log('\n=== SUMMARY ===');
  console.log('Console messages:', consoleMessages.length);
  console.log('Page errors:', errors.length);
  console.log('Network errors:', networkErrors.length);
  console.log('Logged in successfully?', !finalUrl.includes('/login'));
});
