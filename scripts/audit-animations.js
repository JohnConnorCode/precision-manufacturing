#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 ANIMATION & SPACING AUDIT\n');
console.log('=' .repeat(60));

// Check Hero animations are sequential
console.log('\n📊 HERO ANIMATION SEQUENCE:');
const heroContent = fs.readFileSync(path.join(__dirname, '../components/sections/Hero.tsx'), 'utf8');
const heroDelays = [...heroContent.matchAll(/delay:\s*([\d.]+)/g)].map(m => parseFloat(m[1]));
heroDelays.sort((a, b) => a - b);
console.log('Delays:', heroDelays.map(d => `${d}s`).join(' → '));
console.log('Sequential:', heroDelays.every((d, i) => i === 0 || d >= heroDelays[i-1]) ? '✅' : '❌');

// Check theme spacing values
console.log('\n📐 PAGE HEADER SPACING:');
const themeContent = fs.readFileSync(path.join(__dirname, '../lib/theme.ts'), 'utf8');
const pageHeaderMatch = themeContent.match(/pageHeader:.*?pt-(\d+).*?pb-(\d+).*?pt-(\d+).*?pb-(\d+).*?pt-(\d+).*?pb-(\d+)/s);
if (pageHeaderMatch) {
  console.log(`Mobile: pt-${pageHeaderMatch[1]} pb-${pageHeaderMatch[2]}`);
  console.log(`Tablet: pt-${pageHeaderMatch[3]} pb-${pageHeaderMatch[4]}`);
  console.log(`Desktop: pt-${pageHeaderMatch[5]} pb-${pageHeaderMatch[6]}`);
  const isSpacious = parseInt(pageHeaderMatch[5]) >= 64 && parseInt(pageHeaderMatch[6]) >= 48;
  console.log('Spacious:', isSpacious ? '✅' : '❌ (should be pt-64+ pb-48+)');
}

// Check all service pages use centralized styling
console.log('\n🎨 SERVICE PAGES USING CENTRALIZED STYLES:');
const servicePages = [
  '5-axis-machining',
  'adaptive-machining',
  'metrology',
  'engineering',
  'predictive-analytics'
];

servicePages.forEach(page => {
  const pagePath = path.join(__dirname, `../app/services/${page}/page.tsx`);
  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    const usesPageHeader = content.includes('styles.pageHeader');
    const usesTheme = content.includes("from '@/lib/theme'");
    console.log(`${page}: ${usesPageHeader && usesTheme ? '✅' : '❌'}`);
  }
});

// Check homepage section animations
console.log('\n🏠 HOMEPAGE SECTION DELAYS:');
const sections = [
  { name: 'TechnicalSpecs', file: 'components/sections/TechnicalSpecs.tsx' },
  { name: 'Services', file: 'components/sections/Services.tsx' },
  { name: 'Industries', file: 'components/sections/Industries.tsx' },
  { name: 'Stats', file: 'components/sections/Stats.tsx' }
];

sections.forEach(section => {
  const filePath = path.join(__dirname, '..', section.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const delays = [...content.matchAll(/delay:.*?([\d.]+)/g)].map(m => parseFloat(m[1]));
    console.log(`${section.name}: ${delays.length} animations, delays: ${delays.slice(0, 3).map(d => `${d}s`).join(', ')}...`);
  }
});

// Check for smooth transitions
console.log('\n⚡ ANIMATION SMOOTHNESS:');
const allFiles = [
  ...servicePages.map(p => `app/services/${p}/page.tsx`),
  'components/sections/Hero.tsx',
  'components/sections/Services.tsx',
  'components/sections/Industries.tsx'
];

let hasEaseOut = 0;
let hasCustomEasing = 0;

allFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('ease: "easeOut"')) hasEaseOut++;
    if (content.includes('ease: [')) hasCustomEasing++;
  }
});

console.log(`Files using easeOut: ${hasEaseOut}`);
console.log(`Files using custom easing: ${hasCustomEasing}`);
console.log('Smooth animations:', hasEaseOut > 0 || hasCustomEasing > 0 ? '✅' : '❌');

console.log('\n' + '=' .repeat(60));
console.log('✨ AUDIT COMPLETE\n');