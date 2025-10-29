# Tina Cloud Setup Guide

## What is Tina Cloud?

Tina Cloud is the **professional visual editor** for your website content. It provides:
- 🎨 **Visual Editor** - Drag-and-drop, WYSIWYG content editing
- 👥 **User Management** - Multiple team members with different permissions
- 🔐 **Authentication** - Professional OAuth-based login
- 📁 **Git Integration** - Automatic commits when content saves
- 🖼️ **Image Management** - Upload and manage images easily
- 📊 **Real-time Collaboration** - Multiple users editing simultaneously
- 📱 **Responsive Editor** - Works on desktop, tablet, mobile

**Cost**: Free tier ($0) for testing, $29/month for teams

---

## Step 1: Register for Tina Cloud (5 minutes)

### 1a. Go to Tina Cloud

Visit: **https://app.tina.io/register**

### 1b. Sign Up

You'll need:
- Email address (work email recommended)
- Password
- Organization name (use "IIS" or "Precision Manufacturing")

### 1c. Verify Email

Check your email and click the verification link

### 1d. You're In!

You'll see the Tina Cloud dashboard

---

## Step 2: Create a New Project (5 minutes)

### 2a. Click "New Project"

On the Tina Cloud dashboard, click the "New Project" button

### 2b. Configure Your Project

**Project Name**: `precision-manufacturing`

**GitHub Connection**:
- Click "Connect GitHub"
- Authorize Tina to access your GitHub account
- Select the `iismet/precision-manufacturing` repository

### 2c. Review Configuration

Tina will auto-detect:
- ✅ Your Tina config at `/tina/config.ts`
- ✅ Content at `/content/services/` and `/content/industries/`
- ✅ Build directory

### 2d. Create Project

Click "Create Project" - this takes 2-3 minutes

---

## Step 3: Get Your API Credentials (2 minutes)

### 3a. Go to Project Settings

In your Tina Cloud project dashboard, click **Settings** (gear icon)

### 3b. Find API Keys

Look for **"API Keys"** or **"Authentication"** section

### 3c. Copy Credentials

You'll see:
```
TINA_CLIENT_ID = xxxxxxxxxxxxxxxx
TINA_TOKEN = xxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Copy both - you'll need them in the next step

### 3d. Keep Them Secret!

Treat these like passwords:
- Don't commit them to Git
- Don't share them in email or chat
- Only store in `.env.local` and Vercel environment variables

---

## Step 4: Add Credentials to Your Site (5 minutes)

### 4a. Update `.env.local`

Edit `.env.local` in your project root:

```bash
# Tina Cloud Configuration
TINA_PUBLIC_IS_LOCAL=false
TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
TINA_GIT_BRANCH=main
```

Replace the placeholder values with your actual credentials from Step 3c

### 4b. Update `.env.production`

Edit `.env.production`:

```bash
# Tina Cloud Configuration
TINA_PUBLIC_IS_LOCAL=false
TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
TINA_GIT_BRANCH=main
```

### 4c. Update `.env.production.local` (If exists)

Same credentials

### 4d. Save Files

Don't commit `.env.local` to Git! It's already in `.gitignore`

---

## Step 5: Deploy to Vercel (5 minutes)

### 5a. Add Environment Variables to Vercel

Go to your Vercel project: **https://vercel.com/projects**

1. Click on `precision-manufacturing` project
2. Go to **Settings** → **Environment Variables**
3. Add three variables:

```
TINA_PUBLIC_IS_LOCAL = false
TINA_CLIENT_ID = your_client_id_here
TINA_TOKEN = your_token_here
```

### 5b. Deploy

Push your code to GitHub:

```bash
git add .
git commit -m "Configure Tina Cloud integration"
git push origin main
```

Vercel automatically deploys when you push to `main`

### 5c. Wait for Deployment

Check Vercel dashboard - deployment should complete in 2-3 minutes

---

## Step 6: Access Your Visual Editor (1 minute)

Once deployed, visit:

```
https://yourdomain.com/admin
```

(or for localhost testing: `http://localhost:3000/admin`)

### 6a. You'll See the Login Screen

Tina Cloud's professional login interface

### 6b. Log In

Use your Tina Cloud account email and password

### 6c. Visual Editor Loads

After login, you'll see:
- 📁 **Collections** panel on left (Services, Industries, Pages)
- ✏️ **Visual Editor** in the center
- 📋 **Forms** for structured data

---

## How to Edit Content (Non-Technical Users)

### Edit a Service

1. Go to `/admin`
2. Log in with your Tina Cloud account
3. Click **"Services"** in the left panel
4. Choose a service (e.g., "5-Axis Machining")
5. Edit in the visual form:
   - Title, description, hero image
   - Technical specs, capabilities
   - Rich text body content
6. Click **"Save"** (top right)
7. ✅ Content automatically commits to Git and deploys!

### Edit an Industry

1. Click **"Industries"** in the left panel
2. Choose an industry (e.g., "Aerospace")
3. Edit the form:
   - Market overview
   - Regulatory certifications
   - Applications and capabilities
4. Click **"Save"**
5. ✅ Changes go live in 2-3 minutes!

### Upload Images

1. In any image field, click to upload
2. Drag and drop or browse for file
3. Image automatically optimized and stored
4. Reference appears in the content

### Rich Text Editing

When editing body content:
- **Bold**, *Italic*, `Code`
- **Headings** (H1, H2, H3)
- **Lists** (bullets and numbered)
- **Links** - add URLs to other pages
- **Images** - drag and drop inline
- **Blockquotes** - highlight important text

---

## Managing Users (Team Leads)

### Add Team Members

1. In Tina Cloud dashboard, click **"Team"**
2. Click **"Invite Member"**
3. Enter team member's email
4. Select role:
   - **Admin** - Full access, can manage users
   - **Editor** - Can edit all content
   - **Viewer** - Read-only access

### Set Permissions

Permissions are managed per collection:
- Services: Who can edit
- Industries: Who can edit
- etc.

---

## Troubleshooting

### "Invalid Credentials" Error

**Problem**: Tina Cloud login fails

**Solution**:
1. Verify credentials in `.env.local`
2. Check TINA_CLIENT_ID and TINA_TOKEN are correct
3. Hard refresh browser (Ctrl+Shift+R)
4. Clear browser localStorage:
   - Developer Tools (F12) → Application → LocalStorage
   - Delete all entries
   - Try again

### "Git Connection Failed"

**Problem**: Changes not committing to GitHub

**Solution**:
1. In Tina Cloud, go to Settings → GitHub
2. Verify GitHub connection is authorized
3. Check repository access permissions
4. Reconnect GitHub if needed

### "Changes Not Appearing on Website"

**Problem**: Edited content but site shows old version

**Solution**:
1. Wait 2-3 minutes for Vercel to rebuild
2. Check Vercel Deployments dashboard
3. Hard refresh website (Ctrl+Shift+R)
4. If still not showing, manually trigger Vercel redeploy

### "Images Not Uploading"

**Problem**: Upload button greyed out or fails

**Solution**:
1. File must be < 5MB
2. Allowed formats: JPG, PNG, GIF, WebP
3. Browser must allow localStorage (not private mode)
4. Try different image file

### "Can't Log In"

**Problem**: Login page keeps rejecting credentials

**Solution**:
1. Verify you're using Tina Cloud account (not website admin password)
2. Reset password at https://app.tina.io/forgot
3. Check email for verification links
4. Try different browser

---

## Behind the Scenes: How It Works

### When You Click "Save"

```
You edit content in Tina visual editor
            ↓
        Click "Save"
            ↓
Tina Cloud validates content
            ↓
        Commits to Git
            ↓
Vercel detects new commit
            ↓
        Rebuilds site
            ↓
Changes live in 2-3 minutes!
```

### Git Commits

Every edit creates a commit:
```
commit a1b2c3d4e5f6
Author: User Name <user@example.com>
Date:   2025-01-29 14:23:45 -0800

    Update Aerospace industry content

    - Updated market size and key drivers
    - Added new certifications
    - Enhanced capability descriptions
```

You can see all edits on GitHub → Commits → All History

---

## Pricing

### Free Tier
- ✅ 1 user
- ✅ 2 sites
- ✅ Community support
- Cost: **$0/month**

### Team Tier
- ✅ 5 users
- ✅ Unlimited sites
- ✅ Priority support
- Cost: **$29/month** (billed annually)

### Business Tier
- ✅ Unlimited users
- ✅ Unlimited sites
- ✅ Advanced support
- Cost: **Custom pricing**

**Free tier is perfect for testing!**

---

## Common Questions

### Q: Do I need technical knowledge?
**A**: No! Tina Cloud's visual editor is made for non-technical users. Just log in and edit.

### Q: Is my password safe?
**A**: Yes! Tina Cloud uses industry-standard OAuth authentication. Your credentials are never stored on our server.

### Q: Can multiple people edit at the same time?
**A**: Yes! Tina Cloud supports real-time collaboration. Multiple users can edit different pages simultaneously.

### Q: What if I make a mistake?
**A**: All changes are in Git history. You can revert to any previous version on GitHub.

### Q: Where are my images stored?
**A**: Images are stored in your Vercel deployment and referenced in your Git repository.

### Q: Can I use Tina Cloud with a custom domain?
**A**: Yes! Your domain points to Vercel, which serves the site. Tina Cloud handles the `/admin` editor.

### Q: What happens if Tina Cloud goes down?
**A**: Your content is safe in Git. Even if Tina Cloud is unavailable, your deployed site keeps running.

### Q: Can I export my content?
**A**: Yes! Your content is in standard Markdown files in Git. You can always export or migrate to another CMS.

---

## Support & Resources

### Tina Cloud Help
- **Documentation**: https://tina.io/docs/
- **Community Chat**: https://discord.gg/tinacms
- **Email Support**: support@tina.io

### Your Site Setup
- **GitHub**: https://github.com/iismet/precision-manufacturing
- **Vercel**: https://vercel.com/projects
- **Content Location**: `/content/services/` and `/content/industries/`

---

## Next Steps

1. ✅ Sign up for Tina Cloud (Step 1)
2. ✅ Create project (Step 2)
3. ✅ Get credentials (Step 3)
4. ✅ Add to environment variables (Step 4)
5. ✅ Deploy to Vercel (Step 5)
6. ✅ Visit `/admin` and start editing (Step 6)

**Estimated total time**: 30 minutes

**Questions?** Ask your technical team for help with Steps 4-5 (environment variables and deployment).

---

## Security Notes

✅ **DO**:
- Store credentials in `.env.local` (not in Git)
- Use strong Tina Cloud account password
- Add only necessary team members
- Review who can edit what content
- Change password occasionally

❌ **DON'T**:
- Share TINA_CLIENT_ID and TINA_TOKEN
- Commit credentials to Git
- Use simple passwords
- Leave credentials in browser history
- Share credentials via email

---

That's it! You now have a professional visual CMS for your marketing team. 🎉
