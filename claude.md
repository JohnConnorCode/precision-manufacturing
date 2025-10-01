# Claude Code Guidelines for This Project

## Testing Setup and Port Management

### Critical: Always Verify Dev Server Before Testing

**Problem:** Next.js automatically assigns available ports when the default port (3000) is in use. This can lead to tests running against the wrong server or a non-existent server, causing false 404 errors.

### Pre-Test Checklist

1. **Check which ports are in use:**
   ```bash
   lsof -ti:3000
   lsof -ti:3001
   lsof -ti:3004
   lsof -ti:3005
   ```

2. **Start dev server and note the port:**
   ```bash
   npm run dev > /tmp/dev-current.log 2>&1 &
   sleep 5
   grep "Local:" /tmp/dev-current.log
   ```

3. **Use the correct port for testing:**
   ```bash
   # If server is on port 3005
   PLAYWRIGHT_BASE_URL=http://localhost:3005 SKIP_WEBSERVER=true npx playwright test
   ```

### When Tests Fail with 404s

**First check:** Is the dev server actually running?
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3005/
```

**Second check:** Are tests pointing to the right port?
- Look for `PLAYWRIGHT_BASE_URL` in test commands
- Check `playwright.config.ts` for baseURL setting
- Verify server port in logs

### Test Organization

**Current Test Structure:**
- `e2e/navigation.spec.ts` - **Primary DRY test suite** (21 tests per browser = 105 total)
- `e2e/routes.spec.ts.bak` - Backed up (redundant)
- `e2e/all-routes-comprehensive.spec.ts.bak` - Backed up (redundant)
- `e2e/debug-nav.spec.ts.bak` - Backed up (debugging only)
- `e2e/navigation-dropdowns.spec.ts` - Navigation menu behavior
- `e2e/footer-links.spec.ts` - Footer link validation
- `e2e/animations.spec.ts` - Animation timing tests
- `e2e/critical-paths.spec.ts` - Critical user journeys
- `e2e/basic-ux.spec.ts` - Basic UX checks
- `e2e/verify-fixes.spec.ts` - Fix verification tests

**Principle:** Keep tests DRY - avoid duplicate route testing across multiple files.

### Route Testing Best Practices

**All verified working routes:**
```
Main:
  / (homepage)
  /about
  /contact

Services:
  /services
  /services/5-axis-machining
  /services/adaptive-machining
  /services/metrology
  /services/engineering

Industries:
  /industries
  /industries/aerospace
  /industries/defense
  /industries/energy

Resources:
  /resources
  /resources/manufacturing-processes
  /resources/material-science
  /resources/quality-compliance
  /resources/industry-applications
  /resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide

Compliance:
  /compliance/terms
  /compliance/supplier-requirements
```

## Project Architecture

### Key Technologies
- **Next.js 15.5.3** with App Router
- **Webpack** (Turbopack disabled due to CSS panic bug)
- **React Server Components** (default)
- **Client Components** (`'use client'`) for:
  - Framer Motion animations
  - Interactive UI elements
  - Form handling

### Important Constraints

**1. Async Client Components Are Invalid**
```typescript
// ❌ WRONG - Cannot mix 'use client' with async
'use client';
export default async function Page() { ... }

// ✅ CORRECT - Server component (no 'use client')
export default async function Page() { ... }

// ✅ CORRECT - Client component (no async)
'use client';
export default function Page() { ... }
```

**2. Analytics Integration**
- Do not use placeholder IDs like `"XXXXXXX"` or `"G-XXXXXXXXXX"`
- Either pass real IDs or omit the props entirely
- Placeholder IDs cause JavaScript runtime errors

**3. Turbopack Known Issues**
- CSS panic errors in Next.js 15.5.3
- Use webpack instead: `"dev": "next dev"` (no --turbopack flag)

## Known Issues & Workarounds

### 1. Webpack Cache Errors
```
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack
```
**Solution:** This is a non-critical warning. Cache will rebuild on next compile.

### 2. Image Quality Warnings
```
Image with src "..." is using quality "100" which is not configured
```
**Solution:** Add to `next.config.js`:
```javascript
images: {
  qualities: [30, 50, 75, 90, 95, 100]
}
```

### 3. Deprecated onLoadingComplete
```
Image is using deprecated "onLoadingComplete" property
```
**Solution:** Replace with `onLoad` event handler

### 4. Upstream Image 404s
Some Unsplash images return 404. This doesn't break the app but shows in logs.

## Development Workflow

### Starting Development
```bash
# Clean start
pkill -f "next dev"
rm -rf .next
npm run dev
```

### Running Tests
```bash
# Start server first
npm run dev > /tmp/dev.log 2>&1 &
sleep 5

# Note the port from logs
PORT=$(grep -oP 'localhost:\K[0-9]+' /tmp/dev.log | head -1)

# Run tests
PLAYWRIGHT_BASE_URL=http://localhost:$PORT SKIP_WEBSERVER=true npm test
```

### Before Committing
1. Run focused test suite: `npx playwright test e2e/navigation.spec.ts`
2. Verify build: `npm run build`
3. Check for TypeScript errors: `npx tsc --noEmit`

## Routes & Navigation Status

✅ **All routes working** (verified 2025-10-01)
✅ **Navigation links functional** (all dropdowns, footer links)
✅ **Client-side routing operational** (Next.js Link components)
✅ **404 handling working** (custom 404 page)
✅ **Animations smooth** (Framer Motion properly configured)

## Performance Notes

- Initial compilation: ~10s (acceptable for Next.js 15)
- Subsequent hot reloads: 1-5s
- Page load times: < 3s for all routes
- Image optimization: Working (some 404s on external images)

## Common Pitfalls to Avoid

1. **Don't assume port 3000 is available** - always check logs
2. **Don't mix async + 'use client'** - pick one pattern
3. **Don't use Turbopack** - known to crash on this project
4. **Don't duplicate test coverage** - keep tests DRY
5. **Don't commit with placeholder analytics IDs** - causes runtime errors
6. **Don't skip port verification** - tests will fail mysteriously

## Success Criteria

When making changes, verify:
- [ ] Dev server starts without errors
- [ ] All routes return 200 (not 404)
- [ ] Navigation tests pass (e2e/navigation.spec.ts)
- [ ] No TypeScript errors
- [ ] No runtime JavaScript errors in browser console
- [ ] Build completes successfully (`npm run build`)
