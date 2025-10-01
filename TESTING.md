# Testing Guide

## Test Coverage Created

### 1. Route Tests (`e2e/routes.spec.ts`)
Tests all application routes for:
- 200 status responses
- Content loading
- Load time < 3 seconds
- 404 handling

**Routes Covered:**
- Homepage, About, Contact
- All service pages (5-axis, adaptive, metrology, engineering)
- All industry pages (aerospace, energy, defense)
- Resource pages (technical-articles, case-studies, white-papers)
- Compliance pages (terms, supplier-requirements)

### 2. Navigation Dropdown Tests (`e2e/navigation-dropdowns.spec.ts`)
Tests the navigation menu behavior:
- Dropdowns open on hover
- **Dropdowns stay open on click** (recently fixed)
- All dropdown links are clickable
- Navigation works correctly

**Fixes Verified:**
- Services dropdown
- Industries dropdown
- Resources dropdown
- Compliance dropdown

### 3. Footer Link Tests (`e2e/footer-links.spec.ts`)
Tests all footer links navigate correctly:
- Service links (all point to /services)
- **Resource links** (recently fixed):
  - Technical Articles → /resources/technical-articles
  - Case Studies → /resources/case-studies
  - White Papers → /resources/white-papers
- Quick links (about, industries, compliance, contact)
- Contact links (email, phone)
- Social media links present

### 4. Animation Tests (`e2e/animations.spec.ts`)
Tests sequential fade-in animations:
- **Resource article pages** (recently fixed):
  - Header section: 0.1-0.2s delay
  - Content section: 0.3-0.4s delay
  - Related articles: 0.5-0.7s delay
  - CTA section: 1.0-1.1s delay
- Homepage hero animations
- Service card animations
- Footer animations on scroll
- Navigation dropdown animations
- CTA button hover effects
- Page transitions

## Running Tests

### IMPORTANT: Port Management & Test Setup

**Before running tests, ensure the correct dev server is running:**

1. **Check what's running on port 3000:**
   \`\`\`bash
   lsof -ti:3000
   \`\`\`

2. **Start dev server (will auto-select available port):**
   \`\`\`bash
   npm run dev
   \`\`\`
   Note the port in output (e.g., "using available port 3005")

3. **Run tests against the correct port:**
   \`\`\`bash
   PLAYWRIGHT_BASE_URL=http://localhost:3005 SKIP_WEBSERVER=true npx playwright test
   \`\`\`

**Why this matters:**
- Multiple dev servers may be running on different ports
- Tests default to localhost:3000 but server might be on 3001, 3004, 3005, etc.
- Always verify server is running and specify correct port to avoid 404 errors

**Quick setup script:**
\`\`\`bash
# Kill any existing servers
pkill -f "next dev"

# Start fresh server
npm run dev > /tmp/dev.log 2>&1 &

# Wait for server
sleep 5

# Check which port was assigned
grep "Local:" /tmp/dev.log

# Run tests with correct port (replace XXXX with actual port)
PLAYWRIGHT_BASE_URL=http://localhost:XXXX SKIP_WEBSERVER=true npm test
\`\`\`

### Run All Tests
\`\`\`bash
npm test
\`\`\`

### Run Specific Test Suite
\`\`\`bash
npx playwright test e2e/navigation.spec.ts  # Consolidated, DRY test suite
npx playwright test e2e/routes.spec.ts
npx playwright test e2e/navigation-dropdowns.spec.ts
npx playwright test e2e/footer-links.spec.ts
npx playwright test e2e/animations.spec.ts
\`\`\`

### Run Tests in UI Mode (Recommended)
\`\`\`bash
npm run test:ui
\`\`\`

### Run Tests in Headed Mode (See Browser)
\`\`\`bash
npm run test:headed
\`\`\`

### Debug Specific Test
\`\`\`bash
npx playwright test e2e/footer-links.spec.ts --debug
\`\`\`

## Critical Tests for Recent Fixes

### 1. Navigation Dropdowns Don't Close on Click
\`\`\`bash
npx playwright test e2e/navigation-dropdowns.spec.ts --project=chromium
\`\`\`

**What to verify:**
- Hover over "Resources" in nav
- Click the "Resources" button
- Dropdown should stay open (NOT close)
- Click "Technical Articles" link
- Should navigate to /resources/technical-articles

### 2. Footer Links Go to Correct Pages
\`\`\`bash
npx playwright test e2e/footer-links.spec.ts --project=chromium
\`\`\`

**What to verify:**
- Scroll to footer
- Click "Technical Articles" → should go to /resources/technical-articles
- Click "Case Studies" → should go to /resources/case-studies
- Click "White Papers" → should go to /resources/white-papers
- All links should work (not 404)

### 3. Resource Pages Have Sequential Fade-ins
\`\`\`bash
npx playwright test e2e/animations.spec.ts --project=chromium
\`\`\`

**What to verify:**
- Navigate to any resource article
- Watch for sequential fade-in animations
- Header appears first (0.1-0.2s)
- Content appears second (0.3-0.4s)
- Related articles appear third (0.5-0.7s)
- CTA appears last (1.0-1.1s)

### 4. All Routes Load Successfully
\`\`\`bash
npx playwright test e2e/routes.spec.ts --project=chromium
\`\`\`

**What to verify:**
- All 18+ routes return 200 status
- No 404 errors
- Pages load in < 3 seconds
- Content renders correctly

## Test Configuration

Tests are configured to run against:
- **Local**: http://localhost:3000
- **Browsers**: Chrome, Firefox, Safari
- **Mobile**: Pixel 5, iPhone 12

## CI/CD Integration

Tests will run automatically on:
- Pull requests
- Pre-deployment
- Production deployments

## Manual Verification Checklist

Since automated tests timed out, please manually verify:

### Navigation
- [ ] Hover over "Services" - dropdown opens
- [ ] Click "Services" button - dropdown stays open
- [ ] Click "5-Axis Machining" - navigates correctly
- [ ] Repeat for Industries, Resources, Compliance

### Footer Links
- [ ] Click "Technical Articles" in footer → /resources/technical-articles
- [ ] Click "Case Studies" in footer → /resources/case-studies
- [ ] Click "White Papers" in footer → /resources/white-papers
- [ ] Click "Terms & Conditions" → /compliance/terms
- [ ] Click "Supplier Requirements" → /compliance/supplier-requirements

### Animations
- [ ] Go to any resource article
- [ ] Observe sequential fade-ins (header, content, related, CTA)
- [ ] Scroll to footer - footer animates in
- [ ] Hover over CTA buttons - smooth hover effect

### All Routes
- [ ] / (homepage)
- [ ] /about
- [ ] /services
- [ ] /services/5-axis-machining
- [ ] /services/adaptive-machining
- [ ] /services/metrology
- [ ] /services/engineering
- [ ] /industries
- [ ] /industries/aerospace
- [ ] /industries/energy
- [ ] /industries/defense
- [ ] /resources
- [ ] /resources/technical-articles
- [ ] /resources/case-studies
- [ ] /resources/white-papers
- [ ] /contact
- [ ] /compliance/terms
- [ ] /compliance/supplier-requirements

## Next Steps

1. **Run tests locally** with `npm run test:ui`
2. **Review test results** and fix any failures
3. **Add tests to CI/CD** pipeline
4. **Monitor test coverage** over time
5. **Add more tests** for new features

## Known Issues

- Tests may timeout on slow connections
- Animation tests are timing-sensitive
- Some tests require specific viewport sizes
