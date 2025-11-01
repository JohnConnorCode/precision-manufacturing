# Payload CMS v3 Authentication Fix

## Changes Needed

### 1. Update payload.config.ts

**Change Lines 28-31 (serverURL):**
```typescript
// FROM:
serverURL: process.env.NEXT_PUBLIC_SERVER_URL ||
          (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : 'http://localhost:3000'),

// TO:
serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
```

**Change Lines 32-41 (CSRF/CORS):**
```typescript
// FROM:
csrf: [
  process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app',
  'https://precision-manufacturing.vercel.app',
  'http://localhost:3000',
].filter(Boolean),
cors: [
  process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app',
  'https://precision-manufacturing.vercel.app',
  'http://localhost:3000',
].filter(Boolean),

// TO:
csrf: [
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
  process.env.NEXT_PUBLIC_SERVER_URL,
  'http://localhost:3000',
].filter(Boolean),
cors: [
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
  process.env.NEXT_PUBLIC_SERVER_URL,
  'http://localhost:3000',
].filter(Boolean),
```

**Change Lines 114-116 (Cookie sameSite):**
```typescript
// FROM:
cookies: {
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  domain: undefined,
},

// TO:
cookies: {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax', // Same domain deployment - always use 'lax'
  domain: undefined,
},
```

### 2. Add to .env.production

```bash
# Payload CMS
PAYLOAD_SECRET=REPLACE_WITH_STRONG_SECRET_MIN_32_CHARS
MONGODB_URI=REPLACE_WITH_YOUR_MONGODB_CONNECTION_STRING

# Server URLs (critical for auth)
PAYLOAD_PUBLIC_SERVER_URL=https://precision-manufacturing.vercel.app
NEXT_PUBLIC_SERVER_URL=https://precision-manufacturing.vercel.app

# Node Environment
NODE_ENV=production
```

### 3. Set Vercel Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `PAYLOAD_SECRET` | (generate with: `openssl rand -base64 32`) | Production |
| `MONGODB_URI` | mongodb+srv://... | Production |
| `PAYLOAD_PUBLIC_SERVER_URL` | https://precision-manufacturing.vercel.app | Production |
| `NEXT_PUBLIC_SERVER_URL` | https://precision-manufacturing.vercel.app | Production |
| `NODE_ENV` | production | Production |

### 4. Generate PAYLOAD_SECRET

```bash
openssl rand -base64 32
```

Use output as `PAYLOAD_SECRET` value.

### 5. Redeploy

After setting environment variables in Vercel:
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment
3. OR push a commit to trigger new deployment

## Why These Changes Fix Login Issues

1. **`sameSite: 'lax'`**: Correct for same-domain deployments (Vercel). `'none'` is only for cross-domain.

2. **`PAYLOAD_PUBLIC_SERVER_URL`**: Payload's convention for admin panel URLs. More reliable than `VERCEL_PROJECT_PRODUCTION_URL`.

3. **No hardcoded URLs in CSRF/CORS**: Environment-driven configuration prevents mismatches.

4. **Explicit environment variables**: Vercel needs these set in dashboard for serverless functions to access them.

## Testing After Deployment

1. Visit: https://precision-manufacturing.vercel.app/admin
2. Login with your credentials
3. Should stay logged in, not redirect back to login
4. Check browser DevTools → Application → Cookies to verify:
   - Cookie name: `payload-token`
   - Domain: `precision-manufacturing.vercel.app`
   - SameSite: `Lax`
   - Secure: ✓ (checked)

## Common Issues After Fix

**Still redirecting?**
- Clear browser cookies
- Check Vercel logs for errors
- Verify `MONGODB_URI` is correct and accessible from Vercel

**401 Unauthorized?**
- Verify `PAYLOAD_SECRET` is set in Vercel
- Check that secrets match between deployments

**CSRF errors?**
- Ensure `PAYLOAD_PUBLIC_SERVER_URL` matches your actual Vercel URL
- No trailing slashes in URLs
