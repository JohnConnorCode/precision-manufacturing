# Vercel Blob Storage Setup

## Getting Your BLOB_READ_WRITE_TOKEN

### Step 1: Access Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **precision-manufacturing** project

### Step 2: Create Blob Store
1. Click **Storage** tab in the left sidebar
2. Click **Create Database** button
3. Select **Blob** from the options
4. Click **Create** (default settings are fine)

### Step 3: Copy Token
After creating the Blob store:
1. You'll see **Environment Variables** section
2. Copy the value of `BLOB_READ_WRITE_TOKEN`
3. It will look like: `vercel_blob_rw_XXXXXXXXXXXXXXXX`

### Step 4: Add to Environment Variables
1. Go to **Settings** → **Environment Variables** in Vercel
2. Add new variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: (paste the token you copied)
   - **Environments**: Check Production, Preview, and Development

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**

## Testing Image Upload

Once deployed:
1. Go to `https://precision-manufacturing.vercel.app/admin`
2. Login with your credentials
3. Navigate to **Collections** → **Media**
4. Click **Create New**
5. Upload a test image
6. Click **Save**

The image should:
- Upload successfully
- Show thumbnail in admin
- Persist across deployments (stored in Vercel Blob, not filesystem)

## Troubleshooting

**Upload fails with "Cannot upload to read-only filesystem"**:
- The BLOB_READ_WRITE_TOKEN is missing or incorrect
- Check environment variables in Vercel dashboard
- Redeploy after adding the token

**Images disappear after deployment**:
- Blob storage is not configured correctly
- Verify the plugin is in payload.config.ts (line 1079-1087)
- Check that `disableLocalStorage: true` is set in media collection (line 115)

**Token not found error**:
- Add BLOB_READ_WRITE_TOKEN to all environments (Production, Preview, Development)
- Redeploy to apply the new environment variable

## Current Configuration Status

✅ **payload.config.ts**: Vercel Blob plugin configured (lines 1079-1087)
✅ **Media collection**: Local storage disabled, ready for Blob (line 115)
✅ **Package installed**: @payloadcms/storage-vercel-blob@3.59.1

🔲 **Environment variable**: BLOB_READ_WRITE_TOKEN needs to be added in Vercel dashboard
