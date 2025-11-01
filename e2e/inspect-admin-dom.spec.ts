import { test } from '@playwright/test';

test('Inspect admin DOM structure', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000/admin/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="email"]').fill('jt.connor88@gmail.com');
  await page.locator('input[name="password"]').fill('ChainBlockM1!');
  await page.locator('button:has-text("Login")').click();
  await page.waitForURL('**/admin');
  await page.waitForLoadState('networkidle');

  // Go to a service edit page
  await page.goto('http://localhost:3000/admin/collections/services/69030353f0d205b6f5595aed');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Inspect header classes
  const header = await page.locator('header').first();
  const headerClass = await header.getAttribute('class');
  console.log('Header classes:', headerClass);

  // Inspect nav classes
  const nav = await page.locator('nav').first();
  const navClass = await nav.getAttribute('class');
  console.log('Nav classes:', navClass);

  // Inspect collapsible/toggle elements
  const collapsibles = await page.locator('[class*="collapsible"]').all();
  for (let i = 0; i < Math.min(3, collapsibles.length); i++) {
    const cls = await collapsibles[i].getAttribute('class');
    console.log(`Collapsible ${i} classes:`, cls);
  }

  // Inspect text inputs
  const textInputs = await page.locator('input[type="text"]').all();
  if (textInputs.length > 0) {
    const inputClass = await textInputs[0].getAttribute('class');
    console.log('Text input classes:', inputClass);
  }

  // Inspect textarea
  const textareas = await page.locator('textarea').all();
  if (textareas.length > 0) {
    const textareaClass = await textareas[0].getAttribute('class');
    console.log('Textarea classes:', textareaClass);
  }

  // Inspect rich text editor
  const richText = await page.locator('[contenteditable="true"]').all();
  if (richText.length > 0) {
    const richTextClass = await richText[0].getAttribute('class');
    console.log('Rich text editor classes:', richTextClass);
  }

  // Inspect buttons
  const buttons = await page.locator('button').all();
  for (let i = 0; i < Math.min(5, buttons.length); i++) {
    const btnClass = await buttons[i].getAttribute('class');
    const btnText = await buttons[i].textContent();
    console.log(`Button ${i} ("${btnText?.trim()}"): ${btnClass}`);
  }

  // Get full HTML of a collapsible section for detailed analysis
  const firstCollapsible = page.locator('[class*="collapsible"]').first();
  const html = await firstCollapsible.innerHTML();
  console.log('\n=== FULL COLLAPSIBLE HTML ===');
  console.log(html.substring(0, 1000)); // First 1000 chars
});
