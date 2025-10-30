# Deployment Guide - Precision Manufacturing CMS

## Quick Start

```bash
# 1. Verify build passes locally
npm run build

# 2. Deploy to Vercel
vercel --prod

# 3. Verify deployment
curl -I https://precision-manufacturing.vercel.app
```

---

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All TypeScript errors fixed
- [x] Production build completes successfully
- [x] No console errors in browser
- [x] All routes return 200 status codes

### ✅ Content Verification
- [x] All CMS collections migrated (Services, Industries, Resources, Globals)
- [x] 50 Resources articles verified
- [x] Navigation and Footer data populated
- [x] Images loading correctly

### ✅ Testing
- [x] Local dev server working (`npm run dev`)
- [x] Production build working (`npm run build`)
- [x] All pages accessible
- [x] CMS admin panel accessible at `/admin`

---

## Environment Variables

### Required Environment Variables

Create `.env.production` file:

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/precision-manufacturing

# Payload CMS Secret (generate with: openssl rand -base64 32)
PAYLOAD_SECRET=your-secret-key-minimum-32-characters

# Server URL
NEXT_PUBLIC_SERVER_URL=https://precision-manufacturing.vercel.app

# Environment
NODE_ENV=production
```

### Setting Environment Variables in Vercel

```bash
# Using Vercel CLI
vercel env add MONGODB_URI production
vercel env add PAYLOAD_SECRET production
vercel env add NEXT_PUBLIC_SERVER_URL production

# Or via Vercel Dashboard:
# https://vercel.com/your-team/precision-manufacturing/settings/environment-variables
```

**Important:**
- Never commit `.env.production` to Git
- Use different `PAYLOAD_SECRET` for production vs development
- Ensure MongoDB IP whitelist allows Vercel IPs (or use 0.0.0.0/0)

---

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally (if not already installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project (first time only)
vercel link

# 4. Set environment variables (first time only)
vercel env add MONGODB_URI production
vercel env add PAYLOAD_SECRET production
vercel env add NEXT_PUBLIC_SERVER_URL production

# 5. Deploy to production
vercel --prod

# 6. Verify deployment
curl -I https://precision-manufacturing.vercel.app
```

### Option 2: Deploy via Git Push (Auto-Deploy)

```bash
# 1. Commit your changes
git add .
git commit -m "Deploy CMS migration to production"

# 2. Push to main branch
git push origin main

# 3. Vercel will auto-deploy
# Monitor at: https://vercel.com/dashboard
```

### Option 3: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Import Project"
3. Select Git repository
4. Configure environment variables
5. Click "Deploy"

---

## Post-Deployment Verification

### 1. Basic Availability Check

```bash
# Homepage
curl -I https://precision-manufacturing.vercel.app

# About page
curl -I https://precision-manufacturing.vercel.app/about

# Resources
curl -I https://precision-manufacturing.vercel.app/resources

# Admin panel
curl -I https://precision-manufacturing.vercel.app/admin
```

All should return `HTTP/2 200` or `HTTP/2 307` (redirect for admin).

### 2. Content Verification

```bash
# Check resources are loading
curl -s https://precision-manufacturing.vercel.app/resources | grep -o "article\|resource" | wc -l
# Should return > 50

# Check article count on category page
curl -s https://precision-manufacturing.vercel.app/resources/manufacturing-processes | grep -o "Articles"
# Should show "16 Articles"
```

### 3. CMS Admin Panel Check

1. Navigate to: `https://precision-manufacturing.vercel.app/admin`
2. Login with admin credentials
3. Verify you can see all collections
4. Test editing a Resource article
5. Verify changes appear on frontend (within 1 hour due to ISR)

### 4. Performance Check

```bash
# Run Lighthouse audit
npx lighthouse https://precision-manufacturing.vercel.app --view

# Target Scores:
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 90
# - SEO: > 95
```

### 5. SEO Verification

```bash
# Check meta tags
curl -s https://precision-manufacturing.vercel.app | grep -o '<meta name="description"'
curl -s https://precision-manufacturing.vercel.app | grep -o '<meta property="og:'

# Check sitemap
curl -I https://precision-manufacturing.vercel.app/sitemap.xml

# Check robots.txt
curl https://precision-manufacturing.vercel.app/robots.txt
```

---

## Monitoring & Logs

### View Deployment Logs

```bash
# Via Vercel CLI
vercel logs https://precision-manufacturing.vercel.app --since 1h

# Filter for errors only
vercel logs https://precision-manufacturing.vercel.app --since 1h | grep -i error
```

### Via Vercel Dashboard

1. Go to: https://vercel.com/your-team/precision-manufacturing
2. Click on latest deployment
3. View "Build Logs" and "Runtime Logs"

### MongoDB Atlas Monitoring

1. Go to: https://cloud.mongodb.com
2. Navigate to your cluster
3. Click "Metrics" tab
4. Monitor:
   - Connection count
   - Query execution time
   - Document read/write rates

---

## Rollback Procedures

### Rollback via Vercel Dashboard

1. Go to: https://vercel.com/your-team/precision-manufacturing
2. Click "Deployments" tab
3. Find previous working deployment
4. Click "⋮" menu → "Promote to Production"
5. Confirm promotion

### Rollback via CLI

```bash
# 1. List recent deployments
vercel ls precision-manufacturing

# 2. Promote previous deployment to production
vercel promote <deployment-url> --prod
```

### Rollback via Git

```bash
# 1. Revert to previous commit
git revert HEAD

# 2. Push to trigger auto-deploy
git push origin main
```

### Database Rollback (If Needed)

```bash
# Restore from MongoDB Atlas backup
# 1. Go to https://cloud.mongodb.com
# 2. Navigate to cluster → "Backup" tab
# 3. Select backup snapshot
# 4. Click "Restore"
# 5. Choose restore target
```

---

## Common Issues & Solutions

### Issue 1: MongoDB Connection Timeout

**Error:** `MongoNetworkError: connection timed out`

**Solution:**
```bash
# 1. Check MongoDB Atlas IP whitelist
# Go to: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

# 2. Verify MONGODB_URI is correct
vercel env ls

# 3. Test connection locally
MONGODB_URI="your-uri" node -e "require('mongodb').MongoClient.connect(process.env.MONGODB_URI, (err) => console.log(err || 'Connected'))"
```

### Issue 2: Environment Variables Not Set

**Error:** `PAYLOAD_SECRET is required`

**Solution:**
```bash
# List current environment variables
vercel env ls

# Add missing variables
vercel env add PAYLOAD_SECRET production

# Redeploy to apply
vercel --prod --force
```

### Issue 3: Build Fails on Deployment

**Error:** `Error: Build failed`

**Solution:**
```bash
# 1. Test build locally first
npm run build

# 2. If local build passes but Vercel build fails, check:
vercel logs <deployment-url> | grep -i "error"

# 3. Common causes:
# - Missing environment variables
# - Different Node.js version (check package.json engines)
# - Cache issues (force rebuild):
vercel --prod --force
```

### Issue 4: ISR Not Updating Content

**Error:** Content changes not appearing on frontend

**Solution:**
```bash
# 1. Wait 1 hour (revalidate: 3600)
# OR

# 2. Manually trigger revalidation by calling the page URL
curl https://precision-manufacturing.vercel.app/resources?revalidate=1

# 3. Or reduce revalidate time in code (for faster updates):
# Edit page.tsx files:
export const revalidate = 600; // 10 minutes instead of 1 hour
```

### Issue 5: Images Not Loading

**Error:** Images showing broken or 404

**Solution:**
```bash
# 1. Check image domains in next.config.js
# Ensure images.remotePatterns includes all domains

# 2. For local images, ensure they're in /public directory

# 3. For CMS images, verify uploads are working:
# - Test image upload in admin panel
# - Check MongoDB for media collection
```

---

## Performance Optimization

### Enable Vercel Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Configure Image Optimization

Already configured in `next.config.js`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'source.unsplash.com' },
  ],
  formats: ['image/avif', 'image/webp'],
}
```

### Enable Edge Runtime (Optional)

For faster global performance, consider Edge Runtime for API routes:

```typescript
// app/api/[slug]/route.ts
export const runtime = 'edge';
```

---

## Security Checklist

- [x] `PAYLOAD_SECRET` is strong (32+ characters)
- [x] MongoDB credentials not committed to Git
- [x] `.env.production` in `.gitignore`
- [x] MongoDB IP whitelist configured
- [x] HTTPS enforced (automatic on Vercel)
- [x] Admin panel requires authentication
- [ ] Rate limiting configured (optional)
- [ ] Content Security Policy headers (optional)

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs: `vercel logs --since 24h | grep -i error`
- Check uptime: `curl -I https://precision-manufacturing.vercel.app`

**Weekly:**
- Review MongoDB performance metrics
- Check Vercel analytics dashboard
- Test admin panel functionality

**Monthly:**
- Update dependencies: `npm update`
- Run security audit: `npm audit`
- Test backup restoration procedure
- Review and optimize ISR revalidate times

---

## Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Payload CMS: https://payloadcms.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

### Vercel Support
- Dashboard: https://vercel.com/support
- Status Page: https://www.vercel-status.com
- Community: https://github.com/vercel/vercel/discussions

### MongoDB Support
- Support Portal: https://support.mongodb.com
- Community Forums: https://www.mongodb.com/community/forums

---

## Emergency Contacts

**Deployment Issues:**
- Vercel Support: support@vercel.com
- MongoDB Support: https://support.mongodb.com

**Code Issues:**
- Repository: https://github.com/your-org/precision-manufacturing
- Developer: [Your contact info]

---

## Changelog

### 2025-10-30 - Initial CMS Deployment
- ✅ Migrated all content to Payload CMS 3.61.1 + MongoDB
- ✅ Deployed 70+ pages (Homepage, Services, Industries, Resources)
- ✅ Configured ISR with 1-hour revalidation
- ✅ Fixed all TypeScript errors
- ✅ Verified production build successful
- ✅ All routes returning 200 status codes
