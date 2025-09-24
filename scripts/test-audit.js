#!/usr/bin/env node

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function runTests() {
  console.log('🧪 COMPREHENSIVE TEST AUDIT\n');
  console.log('=' .repeat(60));

  const testSuites = [
    { name: 'Navigation UX', command: 'PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npx playwright test e2e/navigation.spec.ts --reporter=json' },
    { name: 'Accessibility', command: 'PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npx playwright test e2e/accessibility.spec.ts --reporter=json' },
    { name: 'Homepage', command: 'PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npx playwright test e2e/homepage.spec.ts --reporter=json' },
    { name: 'Performance', command: 'PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npx playwright test e2e/performance.spec.ts --reporter=json' },
    { name: 'Contact Form', command: 'PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npx playwright test e2e/contact-form.spec.ts --reporter=json' }
  ];

  const results = {
    passed: [],
    failed: [],
    totalTests: 0,
    totalPassed: 0,
    totalFailed: 0
  };

  for (const suite of testSuites) {
    console.log(`\n📊 Testing ${suite.name}...`);
    try {
      const { stdout } = await execPromise(suite.command);
      const data = JSON.parse(stdout);

      const passed = data.suites.flatMap(s =>
        s.specs.filter(spec => spec.ok).map(spec => spec.title)
      );
      const failed = data.suites.flatMap(s =>
        s.specs.filter(spec => !spec.ok).map(spec => ({
          title: spec.title,
          error: spec.tests?.[0]?.results?.[0]?.error?.message || 'Unknown error'
        }))
      );

      results.passed.push(...passed);
      results.failed.push(...failed.map(f => `${suite.name}: ${f.title}`));
      results.totalTests += passed.length + failed.length;
      results.totalPassed += passed.length;
      results.totalFailed += failed.length;

      console.log(`  ✅ Passed: ${passed.length}`);
      console.log(`  ❌ Failed: ${failed.length}`);

      if (failed.length > 0) {
        console.log('  Failed tests:');
        failed.forEach(f => {
          console.log(`    - ${f.title}`);
          if (f.error) {
            console.log(`      Error: ${f.error.split('\n')[0]}`);
          }
        });
      }
    } catch (error) {
      console.log(`  ⚠️ Suite failed to run: ${error.message}`);
    }
  }

  console.log('\n' + '=' .repeat(60));
  console.log('📈 SUMMARY\n');
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.totalPassed} (${((results.totalPassed/results.totalTests)*100).toFixed(1)}%)`);
  console.log(`Failed: ${results.totalFailed} (${((results.totalFailed/results.totalTests)*100).toFixed(1)}%)`);

  // Critical issues
  console.log('\n🚨 CRITICAL ISSUES TO FIX:');

  const criticalPatterns = {
    'Accessibility violations': /accessibility|ARIA|color-contrast|landmark/i,
    'Navigation failures': /navigate|dropdown|menu|header/i,
    'Sanity CMS': /sanity|cms/i,
    'Keyboard support': /keyboard|Tab|focus/i,
    'Mobile responsiveness': /mobile|responsive/i
  };

  Object.entries(criticalPatterns).forEach(([category, pattern]) => {
    const matches = results.failed.filter(f => pattern.test(f));
    if (matches.length > 0) {
      console.log(`\n${category} (${matches.length} failures):`);
      matches.slice(0, 3).forEach(m => console.log(`  - ${m}`));
      if (matches.length > 3) console.log(`  ... and ${matches.length - 3} more`);
    }
  });

  console.log('\n' + '=' .repeat(60));
  console.log('✨ AUDIT COMPLETE\n');

  // Return exit code based on failures
  process.exit(results.totalFailed > 0 ? 1 : 0);
}

runTests().catch(console.error);