import { Page } from '@playwright/test';

export interface AdminCredentials {
  email: string;
  password: string;
}

export async function loginToAdmin(page: Page, credentials: AdminCredentials): Promise<void> {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  await page.goto(`${baseURL}/admin/login`);
  await page.waitForLoadState('networkidle');

  // Fill in credentials
  await page.fill('input[name="email"]', credentials.email);
  await page.fill('input[name="password"]', credentials.password);

  // Submit login form
  await page.click('button[type="submit"]');

  // Wait for redirect to admin dashboard
  await page.waitForURL('**/admin', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}

export async function logoutFromAdmin(page: Page): Promise<void> {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  // Navigate to admin if not already there
  if (!page.url().includes('/admin')) {
    await page.goto(`${baseURL}/admin`);
  }

  // Look for account menu and logout button
  const accountButton = page.locator('button[aria-label="Account"], button:has-text("Account"), [data-testid="account-menu"]').first();

  if (await accountButton.isVisible()) {
    await accountButton.click();
    await page.waitForTimeout(500);

    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")').first();
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await page.waitForURL('**/admin/login', { timeout: 5000 });
    }
  }
}

export async function ensureAuthenticated(page: Page, credentials: AdminCredentials): Promise<void> {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  // Check if already authenticated
  await page.goto(`${baseURL}/admin`);
  await page.waitForLoadState('networkidle');

  // If redirected to login page, authenticate
  if (page.url().includes('/admin/login')) {
    await loginToAdmin(page, credentials);
  }
}

export function getAdminCredentials(): AdminCredentials {
  return {
    email: process.env.PAYLOAD_ADMIN_EMAIL || 'test@test.com',
    password: process.env.PAYLOAD_ADMIN_PASSWORD || 'testtest'
  };
}
