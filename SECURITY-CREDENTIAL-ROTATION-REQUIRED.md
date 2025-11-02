# CRITICAL: Credentials Exposed in Git History

## Issue
The following files were committed to git with credentials:
- .env.production (MongoDB URI with password)
- .env.vercel* files (Vercel OIDC tokens and API credentials)

## Action Required
1. Rotate MongoDB credentials immediately
2. Update Vercel environment variables with new credentials
3. Update local .env files with new credentials
4. Revoke exposed Vercel OIDC tokens

## Current Exposed Credentials

### MongoDB
- MongoDB User: John
- MongoDB Password: TestPass123
- MongoDB Cluster: precisionmanufacturing.m1waxew.mongodb.net
- Database: precision-manufacturing

### Payload CMS
- PAYLOAD_SECRET: pXmVZ5YvyoRaLMOD2v07fiPafXaDamWqFiBsQDbDQ3g=

### Tina Cloud
- NEXT_PUBLIC_TINA_CLIENT_ID: 1776d518-92cc-4faf-acd9-2686d5a1f7e0
- TINA_TOKEN: a2e9e2e759484e4aa0b894e1c8a0a920e19b14e2

### Vercel
- Various VERCEL_OIDC_TOKEN values in .env.vercel* files

**These credentials are NO LONGER SECURE and must be rotated immediately.**

## Remediation Steps

1. **MongoDB**:
   - Go to MongoDB Atlas console
   - Delete user "John" or change password
   - Create new credentials
   - Update in Vercel environment variables

2. **Payload CMS**:
   - Generate new PAYLOAD_SECRET: `openssl rand -base64 32`
   - Update in Vercel environment variables

3. **Tina Cloud**:
   - Regenerate TINA_TOKEN in Tina Cloud dashboard
   - Update client ID if possible
   - Update in Vercel environment variables

4. **Vercel**:
   - OIDC tokens should expire automatically
   - Review Vercel project access logs for any suspicious activity

## Prevention

This issue has been fixed by:
- Updating .gitignore to exclude all .env.* files
- Removing tracked .env files from git (while keeping local copies)
- Creating this security notice

Future commits will not include environment files.
