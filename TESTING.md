# Admin Panel Testing Guide

This document describes the comprehensive test suite for the Payload CMS admin panel.

## Test Suites

### 1. Admin Full Workflow (`e2e/admin-full-workflow.spec.ts`)

**Tests critical user workflows:**
- ✅ Login functionality
- ✅ Collection display (Services, Industries, Resources)
- ✅ Edit forms load with data
- ✅ Save functionality
- ✅ Rich text editor
- ✅ API vs Admin data consistency
- ✅ Frontend propagation
- ✅ Navigation
- ✅ Error handling
- ✅ Performance (load times)

**Run with:**
```bash
npm run test:admin
```

### 2. Data Integrity (`e2e/admin-data-integrity.spec.ts`)

**Verifies data structure:**
- ✅ Lexical format for descriptions
- ✅ Object arrays (not string arrays)
- ✅ Required fields present
- ✅ Correct document counts
- ✅ No API errors
- ✅ Individual document fetch

**Run with:**
```bash
npm run test:data
```

## Running Tests

### Quick Test (Data Integrity Only)
```bash
# Fast API-only tests (no browser UI)
npm run test:data
```

### Full Admin Workflow
```bash
# Tests actual admin panel UI
npm run test:admin
```

### All Tests with Report
```bash
# Runs everything, generates HTML report
npm run test:all
```

## Quick Verification (30 seconds)

```bash
# Test data structure on production
PLAYWRIGHT_BASE_URL=https://precision-manufacturing.vercel.app npm run test:data

# If all 15 tests pass, data structure is perfect ✅
```
