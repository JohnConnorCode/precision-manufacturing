# IMMEDIATE ACTION - Fix Studio & Populate Sanity

## Step 1: Restart Dev Server (2 minutes)

The studio header issue is now fixed. Restart:

```bash
# Kill the current server
pkill -f "next dev"
sleep 2

# Start fresh
npm run dev
```

Wait for it to say "ready - started server on 0.0.0.0:3000"

---

## Step 2: Test the Migration (30 seconds)

Just try running the migration script. It might actually work:

```bash
node scripts/create-services-with-ids.mjs
```

**If you see:**
```
✅ Created: 5-Axis Machining
✅ Created: Adaptive Machining
✅ Created: Metrology Services
✅ Created: Engineering Services
```

**Then SKIP Step 3 and go to Step 4.** Your token actually has the permissions.

---

## Step 3: Fix Token Permissions (IF migration fails)

**Only do this if the migration script in Step 2 gives you a permission error.**

### Option A: Direct API Access (Recommended)

Go directly to: **https://manage.sanity.io/projects**

1. You'll see a list of projects
2. Click on **ept6x5im** (or "Precision Manufacturing")
3. In the left sidebar, find **API** or **Integrations** → **API**
4. Look for **Tokens**
5. Find your token (starts with: `skqGXNV9lqOe2XEN5XTed1FRrX...`)
6. Click the **three-dot menu (⋮)** next to it
7. Click **Edit** or **Update permissions**
8. Check these boxes:
   - ✓ Create
   - ✓ Read
   - ✓ Update
   - ✓ Delete
9. Click **Save** or **Update**
10. **Copy the full token** (it might show a new version)
11. Paste into `.env.local` replacing the old value

### Option B: If That Doesn't Work

Just tell me and I'll create an alternative authentication method. Don't waste time on this.

---

## Step 4: Run Migration

```bash
node scripts/create-services-with-ids.mjs
```

You should see:
```
Creating 4 services with explicit IDs...
✅ Created: 5-Axis Machining (service-5-axis-machining)
✅ Created: Adaptive Machining (service-adaptive-machining)
✅ Created: Metrology Services (service-metrology)
✅ Created: Engineering Services (service-engineering)

✨ Service creation/update complete!
```

If it works, skip to Step 6.

---

## Step 5: Verify It Worked

```bash
# Visit the service page
curl -s http://localhost:3000/services/5-axis-machining | grep "5-Axis Machining"
```

Should output the page HTML with "5-Axis Machining" in it.

Or just open in browser: **http://localhost:3000/services/5-axis-machining**

---

## Step 6: Commit This Work

```bash
git add -A
git commit -m "Phase 1 Complete: Fix studio config and populate services"
```

---

## That's It

All 4 service pages are now live and pulling from Sanity CMS. No more code deployments needed for content changes.

Next: Phase 2 (industry pages) - we build that the same way, should take 4-5 hours.

---

## If Something Goes Wrong

Just run these and tell me what happens:

```bash
# Check token is set
echo $SANITY_WRITE_TOKEN

# Test with verbose output
node scripts/create-services-with-ids.mjs 2>&1 | head -20
```

Tell me what the error is and I'll fix it.
