import { test, expect } from '@playwright/test'

// Pages to validate visually. Keep list focused and high-signal.
const PAGES: { path: string; name: string }[] = [
  { path: '/', name: 'home' },
  { path: '/services/5-axis-machining', name: 'service-5-axis' },
  { path: '/industries/aerospace', name: 'industry-aerospace' },
  { path: '/resources', name: 'resources' },
]

test.describe('Visual regression', () => {
  test.beforeEach(async ({ page }) => {
    // Stabilize animations/transitions for consistent screenshots
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; caret-color: transparent !important; }' })
  })

  for (const p of PAGES) {
    test(`page: ${p.name}`, async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'networkidle' })
      // Allow fonts/images to settle a moment
      await page.waitForTimeout(500)

      // Mask known dynamic regions (e.g., background slider if present)
      const masks = [] as any[]
      const bgSlider = page.locator('.bg-background-slider')
      if (await bgSlider.count()) masks.push(bgSlider)

      await expect(page).toHaveScreenshot(`${p.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
        timeout: 30000,
        mask: masks,
      })
    })
  }
})

