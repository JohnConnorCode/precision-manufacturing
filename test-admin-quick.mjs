import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
page.on('pageerror', error => errors.push(error.message));

await page.goto('https://precision-manufacturing.vercel.app/admin/login');
await page.waitForTimeout(5000);

const emailVisible = await page.locator('input[name="email"]').isVisible().catch(() => false);

console.log('Email field visible:', emailVisible);
console.log('Errors:', errors.length > 0 ? errors : 'None');

await browser.close();
