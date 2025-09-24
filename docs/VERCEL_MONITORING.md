# Vercel Deployment Monitoring Setup

## Overview
This document outlines the automated Vercel deployment monitoring system implemented for the Precision Manufacturing website. The system provides real-time visibility into deployment status and automatic failure detection.

## Available Monitoring Scripts

### 1. CLI-Based Monitoring (`vercel-monitor.sh`)
Location: `/scripts/vercel-monitor.sh`

**Features:**
- Uses Vercel CLI for deployment status checks
- Monitors deployments in real-time with 10-second intervals
- Provides colored output for different states
- Automatically detects and reports errors
- Shows production aliases when deployment succeeds

**Usage:**
```bash
npm run vercel:monitor
# or
./scripts/vercel-monitor.sh
```

**What it does:**
1. Fetches latest deployment using `vercel ls`
2. Extracts deployment URL and status
3. If deployment is building/queued, monitors until completion
4. Reports success with production URLs or failure with error details
5. Times out after 10 minutes if deployment doesn't complete

### 2. API-Based Monitoring (`vercel-api-monitor.js`)
Location: `/scripts/vercel-api-monitor.js`

**Features:**
- Uses Vercel REST API for detailed deployment information
- Provides more comprehensive deployment metadata
- Shows function logs and build logs on failure
- Better suited for CI/CD integration

**Usage:**
```bash
npm run vercel:api
# or
node scripts/vercel-api-monitor.js
```

**Required Environment Variable:**
```bash
VERCEL_TOKEN=your_vercel_token_here
```

### 3. Combined Deploy & Monitor
**Usage:**
```bash
npm run deploy        # Deploys and monitors with CLI
npm run deploy:monitor # Deploys and monitors with API
```

## Health Check Endpoint
Location: `/app/api/health/route.ts`

Provides real-time environment status:
```bash
curl https://precision-manufacturing.vercel.app/api/health
```

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-24T07:02:31.149Z",
  "environment": {
    "sanity": {
      "projectId": "configured",
      "dataset": "configured",
      "apiVersion": "configured"
    },
    "node_env": "production",
    "vercel": "true"
  }
}
```

## Environment Variables Configuration

### Required Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=ept6x5im
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
VERCEL_TOKEN=your_token_here
```

### Setting Variables in Vercel
**Important:** Ensure no newlines are added to variable values

Correct way to set variables:
```bash
echo -n "ept6x5im" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
echo -n "production" | vercel env add NEXT_PUBLIC_SANITY_DATASET production
echo -n "2025-01-01" | vercel env add SANITY_API_VERSION production
```

## Troubleshooting

### Common Issues

#### 1. "projectId can only contain only a-z, 0-9 and dashes"
**Cause:** Environment variables have newline characters appended
**Fix:** Use `echo -n` when setting variables or remove trailing newlines in Vercel dashboard

#### 2. Monitoring script can't find deployments
**Cause:** Script redirecting stderr to /dev/null, missing output
**Fix:** Change `2>/dev/null` to `2>&1` in script

#### 3. API monitoring requires token
**Cause:** VERCEL_TOKEN not set
**Fix:** Generate token at https://vercel.com/account/tokens and add to environment

### Verifying Deployment Status

1. **Quick status check:**
```bash
vercel ls --yes | head -5
```

2. **Detailed deployment info:**
```bash
vercel inspect <deployment-url>
```

3. **Check production status:**
```bash
curl -I https://precision-manufacturing.vercel.app
```

4. **View deployment logs:**
```bash
vercel logs <deployment-url>
```

## Best Practices

1. **Always monitor deployments** - Don't assume deployments succeed
2. **Use health endpoint** - Verify environment variables post-deployment
3. **Check Sanity Studio** - Ensure `/studio` route is accessible
4. **Monitor build logs** - Watch for warnings that might indicate future issues
5. **Keep scripts updated** - Maintain monitoring scripts as Vercel CLI evolves

## Integration with CI/CD

For automated deployments, add to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Deploy to Vercel
  run: npm run deploy:monitor
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Monitoring Commands Summary

```bash
# Quick deployment status
npm run vercel:check

# Full monitoring with CLI
npm run vercel:monitor

# API-based monitoring
npm run vercel:api

# Deploy and monitor
npm run deploy

# Check health
curl https://precision-manufacturing.vercel.app/api/health
```

## Support

For issues with deployment monitoring:
1. Check this documentation first
2. Verify environment variables are set correctly
3. Ensure Vercel CLI is up to date: `npm i -g vercel@latest`
4. Check Vercel status page: https://www.vercel-status.com/