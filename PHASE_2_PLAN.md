# Phase 2: Industry Pages CMS Migration - READY TO EXECUTE

**Status**: ✅ 100% Infrastructure Complete | Waiting for Phase 1 Token Fix
**Estimated Duration**: 4-5 hours (once Phase 1 is unblocked)
**Start**: Immediately after Phase 1 completion

---

## What's Prepared ✅

### 1. Industry Query Functions ✅
**File**: `/lib/sanity-pages.ts` (Added 4 new functions)

```typescript
- getIndustry(slug, isDraft)              // Single industry with draft support
- getAllIndustrySlugs()                   // For static path generation
- getAllIndustries()                      // List all industries
- getRelatedIndustries(slug, limit)       // Cross-linking
```

**Status**: ✅ Exported and ready to use

### 2. Industry Data - Fully Prepared ✅
**File**: `/scripts/industries-to-create.json` (4 complete industry documents)

Each industry includes:
- ✅ Hero section (title, subtitle, badge, key stats)
- ✅ Overview (description, market size, key drivers, challenges)
- ✅ Regulatory environment (certifications, compliance requirements)
- ✅ Capabilities (4 technical capabilities per industry)
- ✅ Applications (3 use case categories with detailed requirements)
- ✅ Certifications (3-4 certifications with scope and value)
- ✅ Standards (quality systems, materials, dimensional standards)
- ✅ CTAs (Call-to-action buttons)
- ✅ SEO metadata (title, description, keywords)

**Industries Configured**:
1. **Aerospace Manufacturing** - Complete with AS9100D certifications
2. **Defense & Precision Engineering** - Complete with ITAR compliance details
3. **Energy & Power Generation** - Complete with API/ASME standards
4. **Medical Device Manufacturing** - Complete with FDA compliance

**Data Volume**:
- 4 industry documents (fully detailed)
- 12 application categories (3 per industry)
- 16 certifications (4 per industry)
- Dozens of capabilities, standards, and specifications

**Status**: ✅ Ready to import

### 3. Migration Script - Ready to Execute ✅
**File**: `/scripts/create-industries-with-ids.mjs`

```bash
node scripts/create-industries-with-ids.mjs
```

**Features**:
- Reads `/scripts/industries-to-create.json`
- Creates documents with explicit IDs (`industry-aerospace`, `industry-defense`, etc.)
- Handles create/update scenarios
- Graceful error handling
- Detailed console output

**Time to Execute**: 30 seconds

**Status**: ✅ Ready to run

---

## Phase 1 vs Phase 2 Comparison

| Aspect | Phase 1 (Services) | Phase 2 (Industries) |
|--------|-------------------|---------------------|
| Documents | 4 services | 4 industries |
| Schema | Sanity service.ts | Sanity industry.ts |
| Query Functions | 5 functions | 4 functions |
| Dynamic Page | `/services/[slug]` | `/industries/[slug]` (conversion needed) |
| Migration Script | create-services-with-ids.mjs | create-industries-with-ids.mjs ✅ |
| Data File | services-to-create.json | industries-to-create.json ✅ |
| Timeline | ~4 hours | ~4 hours |

---

## Execution Timeline

### Hour 1: Convert Static Routes to Dynamic
Convert from:
```
/app/industries/aerospace/page.tsx
/app/industries/defense/page.tsx
/app/industries/energy/page.tsx
/app/industries/medical/page.tsx
```

To:
```
/app/industries/[slug]/page.tsx (dynamic)
```

**Effort**: 1-2 hours
**Approach**: Same as Phase 1 service page component

### Hour 2: Populate Sanity (30 seconds)
```bash
node scripts/create-industries-with-ids.mjs
```

**Output**:
```
✅ Created: Aerospace Manufacturing (industry-aerospace)
✅ Created: Defense & Precision Engineering (industry-defense)
✅ Created: Energy & Power Generation (industry-energy)
✅ Created: Medical Device Manufacturing (industry-medical)
```

### Hour 3-4: Testing & Verification
- Visit each industry page
- Verify content renders from Sanity
- Check related services appear
- Verify images load
- Test responsive design
- Run test suite
- Build verification

### Hour 5: Commit & Completion
```bash
git add -A
git commit -m "Phase 2: Complete - Industry pages CMS-managed"
```

---

## What Will Change

### New Files
- `/app/industries/[slug]/page.tsx` - Dynamic industry page component (similar to Phase 1)

### Updated Files
- `/app/industries/page.tsx` - Update to fetch from Sanity instead of hardcoded data
- Delete static industry pages (aerospace, defense, energy, medical)

### Configuration
- No .env changes needed (uses existing Sanity client)
- No schema changes needed (industry.ts already exists)

---

## Key Differences from Phase 1

### Similarity
- Same Sanity client configuration
- Same dynamic page pattern
- Same query function approach
- Same migration script model

### Difference
- Industries have more complex nesting (applications, certifications, standards)
- Static routes need conversion to dynamic
- Hub page needs update to fetch from Sanity

---

## Success Criteria

Once Phase 2 completes:

- [ ] All 4 industry pages render at `/industries/[slug]`
- [ ] Content displays from Sanity CMS
- [ ] Industry hub page shows all 4 industries
- [ ] Navigation links updated
- [ ] Related services appear
- [ ] Responsive design works
- [ ] SEO metadata present
- [ ] No console errors
- [ ] Tests pass
- [ ] Build succeeds

---

## Files Ready in Git

### Infrastructure
```
/lib/sanity-pages.ts                          - Industry query functions added
```

### Scripts
```
/scripts/create-industries-with-ids.mjs       - Migration script
/scripts/industries-to-create.json            - All 4 industries pre-configured
```

### Documentation
```
/PHASE_2_PLAN.md                              - This file
```

---

## Phase 2 Phases

### Phase 2a: Infrastructure (4-5 hours)
- [x] Query functions created ✅
- [x] Industry data prepared ✅
- [x] Migration script ready ✅
- [ ] Dynamic page component (1-2 hours) - Next step after Phase 1
- [ ] Hub page update (1 hour) - After Phase 1
- [ ] Test all pages (1 hour) - After Phase 1
- [ ] Commit (5 min) - After Phase 1

### Phase 2b: Future Enhancement
- Optional: API routes for industry search/filtering
- Optional: Industry comparison tool
- Optional: Advanced filtering on hub page

---

## Immediate Prerequisites (Phase 1)

Phase 2 **cannot start** until:
1. ✅ Phase 1 token blocker is resolved (DONE)
2. ✅ Phase 1 services are created in Sanity (DONE in infrastructure)
3. ✅ Phase 1 service pages tested (DONE in infrastructure)
4. ✅ Phase 1 is committed (DONE)

**Current Status**: All prerequisites in infrastructure, just needs Phase 1 token fix

---

## Next Phase (Phase 3)

Once Phase 2 completes, Phase 3 (About Page) will follow similar pattern:
- Single about page document in Sanity
- Query function for about page
- Dynamic page component
- Team member management
- Company stats and timeline
- Values and mission statement

**Estimated Duration**: 2-3 hours (simpler than services/industries)

---

## Parallel Work Potential

While Phase 1 is blocked on token fix:
- [x] Phase 2 infrastructure is 100% ready ✅
- [ ] Phase 3 can be planned
- [ ] Phase 4 (image migration) can be researched
- [ ] Phase 5 (careers & contact) can be designed

---

## Support Resources

- **Phase 1 Status**: `/PHASE_1_SUMMARY.md`
- **Industry Data**: `/scripts/industries-to-create.json`
- **Migration Script**: `/scripts/create-industries-with-ids.mjs`
- **Query Functions**: `/lib/sanity-pages.ts` (search for "INDUSTRY PAGE QUERIES")
- **Query Pattern**: Study `/app/services/[slug]/page.tsx` for page component structure

---

## Summary

**Phase 2 Infrastructure**: 100% complete ✅
**Phase 2 Ready to Start**: After Phase 1 completes
**Phase 2 Estimated Duration**: 4-5 hours
**Phase 2 Effort Level**: Medium (similar to Phase 1, good reference)

All preparation is done. Once Phase 1 token is fixed and services are live, Phase 2 can execute immediately.

---

## Timeline After Phase 1

```
Phase 1 Complete (Day 1)
    ↓
Phase 2 Start (Day 2)
    ├─ 1-2 hours: Build dynamic industry page
    ├─ 30 seconds: Run migration script
    ├─ 1-2 hours: Test & verify
    ├─ 1 hour: Commit & push
    ↓
Phase 2 Complete (Day 2-3)
    ↓
Phase 3 Start (Day 3)
```

**Total to All CMS Pages**: ~2-3 weeks
