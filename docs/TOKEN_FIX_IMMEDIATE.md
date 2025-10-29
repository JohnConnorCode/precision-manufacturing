# URGENT: Fix Token Permissions in 2 Minutes

## The Issue ⚠️

Your `SANITY_WRITE_TOKEN` in `.env.local` is missing the **"create" permission**.

### Proof
```
✅ READ permission: Working
❌ CREATE permission: Missing
```

### Impact
- ❌ Cannot populate services to Sanity
- ❌ Cannot populate industries to Sanity
- ✅ But everything else is ready to go

---

## Fix It Now (2 Minutes)

### Step 1: Open Sanity Management Console
Go to: **https://manage.sanity.io**

### Step 2: Select Your Project
- You'll see a list of projects
- Click on **ept6x5im** (or "Precision Manufacturing")

### Step 3: Navigate to Tokens
- Click **Settings** in left sidebar
- Click **API & Webhooks** (or **Integrations**)
- Click **Tokens**

### Step 4: Edit Your Token
- Look for the token starting with: `skqGXNV9...`
- Click the **three-dot menu (⋮)** next to it
- Click **Edit** (or **Update permissions**)

### Step 5: Enable Required Permissions
Check these boxes:
- ✓ **Create**
- ✓ **Read** (probably already checked)
- ✓ **Update** (probably already checked)
- ✓ **Delete** (probably already checked)

### Step 6: Save and Copy
- Click **Save** or **Update**
- Click **Copy** to copy the full token value
- The token will start with: `sk...` (same as before, but with updated permissions)

### Step 7: Update .env.local
Open `/Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing/.env.local`

Find this line:
```
SANITY_WRITE_TOKEN=skqGXNV9lqOe2XEN5XTed1FRrXpVxni8Lh0R81M975WC2tOfRpQftGdm8viOyrgBZ6XsQKF0OjL6FYvXae2vy72MpUlDOiRpeKU3pBR4CTqvMzh8OJmwMj5Wvfni8PnMXyFLnxFmnjfqcnx6fpexle7b0SpQpN6MK4hsWEv4zsOycbsQhazj
```

Replace it with your new token:
```
SANITY_WRITE_TOKEN=[paste-the-new-token-here]
```

---

## Verify the Fix

Once you've updated `.env.local`, run:

```bash
cd /Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing
set -a && source .env.local && set +a
node scripts/verify-token-permissions.mjs
```

You should see:
```
✅ READ permission: Working
✅ CREATE permission: Working
✅ UPDATE permission: Working
✅ DELETE permission: Working
```

---

## Next Steps (Automatic After Fix)

Once token permissions are fixed, I will automatically:

1. **Restart dev server**
2. **Run Phase 1 migration** - Creates 4 service documents in Sanity
3. **Test all 4 service pages** - Verify they render from Sanity
4. **Commit Phase 1** - Complete first milestone
5. **Build Phase 2** - Create dynamic industry page component
6. **Run Phase 2 migration** - Creates 4 industry documents
7. **Test all 4 industry pages** - Verify they render from Sanity
8. **Commit Phase 2** - Second milestone complete

---

## Timeline After Token Fix

- **5 minutes**: Run Phase 1 migration script
- **5 minutes**: Test service pages
- **1 minute**: Commit Phase 1
- **4-5 hours**: Build and execute Phase 2 (industry pages)
- **1 minute**: Commit Phase 2

**Total to fully functional CMS**: ~5 hours

---

## Help

If you get stuck:

1. **Can't find tokens page?**
   - Go to https://manage.sanity.io
   - Click your profile → go to organization settings
   - Look for "API Tokens" or "API & Webhooks"

2. **Token looks the same?**
   - That's okay! The permissions are updated even if the string looks identical
   - Just paste it into `.env.local` and test

3. **Still getting "Insufficient permissions"?**
   - Double-check all 4 scopes are checked: Create, Read, Update, Delete
   - Try refreshing the Sanity console and editing again
   - Make sure you're editing the right token (should start with `skqGXNV9...`)

4. **Want to test without Sanity UI?**
   - I've created a verification script
   - Run: `node scripts/verify-token-permissions.mjs`
   - It will tell you exactly what's missing

---

## Summary

**What To Do:**
1. Go to https://manage.sanity.io
2. Edit token to add "create" permission
3. Update `.env.local`

**Time Required:** 2 minutes

**Result:** Phase 1 migration will complete immediately, then Phase 2 can execute

---

Done! Let me know when the token is fixed and I'll execute the rest automatically.
