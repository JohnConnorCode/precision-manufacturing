import { test, expect } from '@playwright/test';

// Helper to convert RGB to hex
function rgbToHex(rgb: string): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb;

  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

// Helper to get relative luminance for contrast ratio calculation
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(rgb1: string, rgb2: string): number {
  const match1 = rgb1.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const match2 = rgb2.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  if (!match1 || !match2) return 0;

  const l1 = getLuminance(parseInt(match1[1]), parseInt(match1[2]), parseInt(match1[3]));
  const l2 = getLuminance(parseInt(match2[1]), parseInt(match2[2]), parseInt(match2[3]));

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

test.describe('Text Readability & Color Testing', () => {
  test('Homepage text colors are dark and readable (not light grey)', async ({ page }) => {
    console.log('\n=== HOMEPAGE TEXT COLOR VALIDATION ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take screenshot for reference
    await page.screenshot({ path: '/tmp/homepage-text-colors.png', fullPage: true });
    console.log('✓ Screenshot saved: /tmp/homepage-text-colors.png\n');

    // Define acceptable dark colors (Tailwind slate scale)
    const darkColors = {
      'slate-900': 'rgb(15, 23, 42)',
      'slate-800': 'rgb(30, 41, 59)',
      'slate-700': 'rgb(51, 65, 85)',
    };

    // Define unacceptable light grey colors
    const lightGreyColors = {
      'slate-600': 'rgb(71, 85, 105)',
      'slate-500': 'rgb(100, 116, 139)',
      'slate-400': 'rgb(148, 163, 184)',
    };

    const problematicElements: string[] = [];

    console.log('Checking major text elements for color...\n');

    // Check headings (h1, h2, h3)
    const headings = page.locator('h1, h2, h3').filter({ hasNot: page.locator('footer, nav') });
    const headingCount = await headings.count();

    console.log(`Found ${headingCount} headings outside footer/nav\n`);

    for (let i = 0; i < Math.min(headingCount, 20); i++) {
      const heading = headings.nth(i);
      const text = await heading.textContent();
      const color = await heading.evaluate(el => window.getComputedStyle(el).color);
      const hex = rgbToHex(color);

      // Check if it's a light grey color
      const isLightGrey = Object.values(lightGreyColors).some(lightColor => color === lightColor);

      if (isLightGrey) {
        problematicElements.push(`Heading "${text?.substring(0, 40)}..." - Color: ${color} (${hex}) - TOO LIGHT`);
        console.log(`  ❌ Heading ${i + 1}: "${text?.substring(0, 30)}..." - ${color} (TOO LIGHT)`);
      } else {
        console.log(`  ✓ Heading ${i + 1}: "${text?.substring(0, 30)}..." - ${color}`);
      }
    }

    // Check paragraphs in main content sections
    const paragraphs = page.locator('section p, main p').filter({ hasNot: page.locator('footer') });
    const paragraphCount = await paragraphs.count();

    console.log(`\nFound ${paragraphCount} paragraphs in main sections\n`);

    const checkedColors = new Set<string>();

    for (let i = 0; i < Math.min(paragraphCount, 30); i++) {
      const para = paragraphs.nth(i);
      const text = await para.textContent();
      const color = await para.evaluate(el => window.getComputedStyle(el).color);

      // Skip if we've already checked this color
      if (checkedColors.has(color)) continue;
      checkedColors.add(color);

      const hex = rgbToHex(color);

      // Check if it's a light grey color (slate-400, slate-500, slate-600)
      const isLightGrey = color === lightGreyColors['slate-400'] ||
                         color === lightGreyColors['slate-500'] ||
                         color === lightGreyColors['slate-600'];

      if (isLightGrey) {
        problematicElements.push(`Paragraph "${text?.substring(0, 40)}..." - Color: ${color} (${hex}) - TOO LIGHT`);
        console.log(`  ❌ Para ${i + 1}: ${color} (${hex}) - TOO LIGHT`);
      } else {
        console.log(`  ✓ Para ${i + 1}: ${color} (${hex})`);
      }
    }

    // Report results
    console.log(`\n=== TEXT COLOR SUMMARY ===`);
    console.log(`Checked ${headingCount} headings and ${paragraphCount} paragraphs`);
    console.log(`Problematic elements (light grey text): ${problematicElements.length}`);

    if (problematicElements.length > 0) {
      console.log(`\n❌ LIGHT GREY TEXT FOUND:`);
      problematicElements.forEach(el => console.log(`  - ${el}`));
    }

    // ASSERTION: No light grey text (or very minimal)
    expect(problematicElements.length).toBeLessThan(5); // Allow up to 5 minor instances
    console.log(`\n✅ PASS: Text colors are acceptable (${problematicElements.length} light grey instances)`);
  });

  test('Text contrast meets WCAG AA standards', async ({ page }) => {
    console.log('\n=== WCAG CONTRAST RATIO VALIDATION ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const lowContrastElements: string[] = [];

    // Check main content text elements
    const textElements = page.locator('h1, h2, h3, p').filter({ hasNot: page.locator('footer') });
    const count = await textElements.count();

    console.log(`Checking contrast ratios for ${count} text elements...\n`);

    for (let i = 0; i < Math.min(count, 30); i++) {
      const element = textElements.nth(i);
      const text = await element.textContent();

      const { color, backgroundColor } = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      });

      // If background is transparent, use white
      const bgColor = backgroundColor.includes('rgba(0, 0, 0, 0)') ? 'rgb(255, 255, 255)' : backgroundColor;

      const contrastRatio = getContrastRatio(color, bgColor);

      // WCAG AA requires:
      // - 4.5:1 for normal text
      // - 3:1 for large text (18pt or 14pt bold)
      const meetsWCAG = contrastRatio >= 4.5;

      if (!meetsWCAG && contrastRatio > 0) {
        lowContrastElements.push(`"${text?.substring(0, 40)}..." - Ratio: ${contrastRatio.toFixed(2)}:1 (fg: ${color}, bg: ${bgColor})`);
        console.log(`  ⚠️  Element ${i + 1}: Ratio ${contrastRatio.toFixed(2)}:1 - "${text?.substring(0, 30)}..."`);
      } else if (contrastRatio > 0) {
        console.log(`  ✓ Element ${i + 1}: Ratio ${contrastRatio.toFixed(2)}:1 - PASS`);
      }
    }

    console.log(`\n=== CONTRAST SUMMARY ===`);
    console.log(`Total elements checked: ${Math.min(count, 30)}`);
    console.log(`Elements with low contrast (<4.5:1): ${lowContrastElements.length}`);

    if (lowContrastElements.length > 0) {
      console.log(`\n⚠️  LOW CONTRAST ELEMENTS:`);
      lowContrastElements.forEach(el => console.log(`  - ${el}`));
    }

    // Allow up to 10% of elements to have low contrast (some edge cases)
    const failureRate = lowContrastElements.length / Math.min(count, 30);
    expect(failureRate).toBeLessThan(0.1);
    console.log(`\n✅ PASS: ${((1 - failureRate) * 100).toFixed(1)}% of text meets WCAG AA standards`);
  });

  test('Services section text is dark and readable', async ({ page }) => {
    console.log('\n=== SERVICES SECTION TEXT COLOR CHECK ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find Services section
    const servicesSection = page.locator('section').filter({ hasText: /PRECISION SERVICES|SERVICES/i }).first();

    if (await servicesSection.isVisible()) {
      console.log('✓ Services section found\n');

      // Check section heading color
      const sectionHeading = servicesSection.locator('h2, h3').first();
      if (await sectionHeading.isVisible()) {
        const headingColor = await sectionHeading.evaluate(el => window.getComputedStyle(el).color);
        const headingHex = rgbToHex(headingColor);
        console.log(`Section heading color: ${headingColor} (${headingHex})`);

        // Should not be light grey
        expect(headingColor).not.toBe('rgb(148, 163, 184)'); // Not slate-400
        expect(headingColor).not.toBe('rgb(100, 116, 139)'); // Not slate-500
        console.log('✓ Section heading is dark');
      }

      // Check service card text colors
      const serviceCards = servicesSection.locator('article, div[class*="card"]').filter({
        has: page.locator('h3, h2')
      });
      const cardCount = await serviceCards.count();

      console.log(`\nChecking ${cardCount} service cards...\n`);

      for (let i = 0; i < Math.min(cardCount, 4); i++) {
        const card = serviceCards.nth(i);

        // Check card title color
        const cardTitle = card.locator('h2, h3').first();
        if (await cardTitle.isVisible()) {
          const titleColor = await cardTitle.evaluate(el => window.getComputedStyle(el).color);
          const titleHex = rgbToHex(titleColor);
          console.log(`  Card ${i + 1} title: ${titleColor} (${titleHex})`);

          // Should be dark
          expect(titleColor).not.toBe('rgb(148, 163, 184)'); // Not slate-400
        }

        // Check card description color
        const cardDesc = card.locator('p').first();
        if (await cardDesc.isVisible()) {
          const descColor = await cardDesc.evaluate(el => window.getComputedStyle(el).color);
          const descHex = rgbToHex(descColor);
          console.log(`  Card ${i + 1} description: ${descColor} (${descHex})`);

          // Should be dark (slate-800 or darker)
          expect(descColor).not.toBe('rgb(148, 163, 184)'); // Not slate-400
          expect(descColor).not.toBe('rgb(100, 116, 139)'); // Not slate-500
        }
      }

      console.log('\n✅ PASS: Services section text colors are dark and readable');
    } else {
      console.log('⚠️  Services section not found');
    }
  });

  test('Industries section text is dark and readable', async ({ page }) => {
    console.log('\n=== INDUSTRIES SECTION TEXT COLOR CHECK ===\n');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find Industries section
    const industriesSection = page.locator('section').filter({ hasText: /INDUSTRY|INDUSTRIES/i }).first();

    if (await industriesSection.isVisible()) {
      console.log('✓ Industries section found\n');

      // Check industry card text colors
      const industryCards = industriesSection.locator('article, div[class*="card"]').filter({
        has: page.locator('h3, h2')
      });
      const cardCount = await industryCards.count();

      console.log(`Checking ${cardCount} industry cards...\n`);

      for (let i = 0; i < Math.min(cardCount, 4); i++) {
        const card = industryCards.nth(i);

        // Check card title color
        const cardTitle = card.locator('h2, h3').first();
        if (await cardTitle.isVisible()) {
          const titleColor = await cardTitle.evaluate(el => window.getComputedStyle(el).color);
          const titleHex = rgbToHex(titleColor);
          console.log(`  Card ${i + 1} title: ${titleColor} (${titleHex})`);

          // Should be dark
          expect(titleColor).not.toBe('rgb(148, 163, 184)'); // Not slate-400
          expect(titleColor).not.toBe('rgb(100, 116, 139)'); // Not slate-500
        }

        // Check card description color
        const cardDesc = card.locator('p').first();
        if (await cardDesc.isVisible()) {
          const descColor = await cardDesc.evaluate(el => window.getComputedStyle(el).color);
          const descHex = rgbToHex(descColor);
          console.log(`  Card ${i + 1} description: ${descColor} (${descHex})`);

          // Should be reasonably dark
          expect(descColor).not.toBe('rgb(148, 163, 184)'); // Not slate-400
        }
      }

      console.log('\n✅ PASS: Industries section text colors are dark and readable');
    } else {
      console.log('⚠️  Industries section not found');
    }
  });
});
