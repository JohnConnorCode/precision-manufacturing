import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Request a Quote/i })).toBeVisible();

    // Check form fields
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Company/i)).toBeVisible();
    await expect(page.getByLabel(/Phone/i)).toBeVisible();
    await expect(page.getByLabel(/Service/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show validation errors
    await expect(page.getByText(/Name is required/i)).toBeVisible();
    await expect(page.getByText(/Email is required/i)).toBeVisible();
    await expect(page.getByText(/Company is required/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    await page.getByLabel(/Email/i).fill('invalid-email');
    await page.getByLabel(/Name/i).fill('John Doe');
    await page.getByLabel(/Company/i).fill('Test Corp');
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show email validation error
    await expect(page.getByText(/Invalid email/i)).toBeVisible();
  });

  test('should successfully submit valid form', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/Name/i).fill('John Doe');
    await page.getByLabel(/Email/i).fill('john@example.com');
    await page.getByLabel(/Company/i).fill('Test Corporation');
    await page.getByLabel(/Phone/i).fill('+1 555-123-4567');
    await page.getByLabel(/Service/i).selectOption('5-axis-machining');
    await page.getByLabel(/Message/i).fill('I need a quote for precision parts.');

    // Submit the form
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Should show success message
    await expect(page.getByText(/Thank you for your inquiry/i)).toBeVisible({ timeout: 10000 });
  });

  test('should display contact information', async ({ page }) => {
    // Check contact details section
    await expect(page.getByText(/\+1 \(555\) 123-4567/)).toBeVisible();
    await expect(page.getByText(/contact@precisionmfg.com/)).toBeVisible();
    await expect(page.getByText(/123 Aerospace Blvd/)).toBeVisible();
  });

  test('should have proper form accessibility', async ({ page }) => {
    // All inputs should be keyboard accessible
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // Skip header

    const firstInput = page.getByLabel(/Name/i);
    await firstInput.focus();
    await expect(firstInput).toBeFocused();

    // Tab through all form fields
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/Email/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/Company/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/Phone/i)).toBeFocused();
  });

  test('should handle special characters in input', async ({ page }) => {
    // Test with special characters
    await page.getByLabel(/Name/i).fill("O'Connor & Associates");
    await page.getByLabel(/Email/i).fill('test+special@example.com');
    await page.getByLabel(/Company/i).fill('Company & Co. "Special"');
    await page.getByLabel(/Message/i).fill('Testing special chars: <>&"\'');

    // Form should handle these without errors
    await page.getByRole('button', { name: /Send Message/i }).click();
    await expect(page.getByText(/Thank you for your inquiry/i)).toBeVisible({ timeout: 10000 });
  });
});