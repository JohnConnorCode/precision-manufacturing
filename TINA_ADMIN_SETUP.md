# Tina CMS Admin Setup & Usage

## Overview

Tina CMS provides a **visual editor UI** for non-technical users to edit all content in your website without touching code or Markdown. All content is automatically committed to Git and deployed via Vercel.

**No external Tina Cloud subscription needed** - uses local Git mode!

---

## Setup (One-Time Configuration)

### 1. Set Admin Password

Edit `.env.local` and `.env.production`:

```bash
NEXT_PUBLIC_TINA_ADMIN_PASSWORD=YourSecurePassword123!
```

Choose a **strong password** - this is how you protect the editor from public access.

### 2. Deploy to Vercel

Add the same environment variable to Vercel:

```bash
vercel env add NEXT_PUBLIC_TINA_ADMIN_PASSWORD
# Enter your secure password when prompted
```

Or via Vercel Dashboard:
- Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_TINA_ADMIN_PASSWORD` = `YourSecurePassword123!`

### 3. Access the Admin Panel

Once deployed, go to:
```
https://yourdomain.com/admin
```

You'll see a login screen. Enter your password to access the visual editor.

---

## How Non-Technical Users Edit Content

### Login

1. Go to `https://yourdomain.com/admin`
2. Enter the admin password
3. You're logged in! (stays logged in for your browser session)

### Edit Services

1. In the left sidebar, click **"Services"**
2. Choose a service to edit (e.g., "5-Axis Machining")
3. Edit in the form:
   - **Title** - Service name
   - **Description** - Short summary
   - **Hero Image** - Upload or paste image URL
   - **Overview** - Market overview and key drivers
   - **Technical Specs** - Tolerances, materials, equipment
   - **Body Content** - Rich text editor for detailed content
4. Click **"Save"** → Automatically commits and deploys!

### Edit Industries

1. Click **"Industries"** in sidebar
2. Choose an industry (e.g., "Aerospace")
3. Edit:
   - **Title**, **Description**, **Hero Image**
   - **Overview** - Market size, key drivers, challenges
   - **Capabilities** - What you offer for this industry
   - **Regulatory** - Certifications and standards
   - **Applications** - Real-world use cases
   - **Body Content** - Detailed information
4. Click **"Save"**

### Rich Text Editor Features

When editing the body content, you get:
- **Bold**, *Italic*, `Code`
- **Headings** (H1, H2, H3, etc.)
- **Lists** (bullet points, numbered lists)
- **Links** - Add hyperlinks to other pages
- **Images** - Drag-and-drop upload
- **Blockquotes** - For highlights

### Image Upload

In any image field:
1. **Drag and drop** an image directly
2. OR click the field and select from computer
3. Image is automatically optimized and saved to `/public/uploads/`
4. Reference appears in the form

---

## How It Works Behind the Scenes

```
User edits in Tina Admin UI
           ↓
      Click "Save"
           ↓
  Tina commits changes to Git
           ↓
  Vercel detects new commit
           ↓
  Auto-rebuilds and deploys
           ↓
  Changes live in 2-3 minutes
```

### All Changes Are in Git

Every edit creates a git commit:
```
commit a1b2c3d4e5f6
Author: Tina Admin <noreply@tina.io>
Date:   2025-01-29 14:23:45 -0800

    Update Aerospace industry content

    - Updated market size and key drivers
    - Added new certifications
    - Enhanced capability descriptions
```

You can see all edits in GitHub → Commits → All History

---

## Logout

Click the **"Logout"** button (bottom right of admin panel) to log out.

Next time you visit `/admin`, you'll need to enter the password again.

---

## Changing the Password

1. Update `.env.local` and `.env.production`:
   ```bash
   NEXT_PUBLIC_TINA_ADMIN_PASSWORD=NewSecurePassword123!
   ```

2. If using Vercel:
   - Update in Vercel Dashboard → Environment Variables
   - Redeploy the site

3. Next time anyone visits `/admin`, they'll need to use the new password

---

## Troubleshooting

### Admin Panel Shows Blank/White Screen
- **Check browser console** (F12) for errors
- **Hard refresh** (Ctrl+Shift+R)
- **Clear localStorage**: Developer Tools → Application → LocalStorage → Clear All
- **Check `.env` variables** are set correctly

### "Invalid Password" Error
- Make sure password matches exactly (case-sensitive)
- Check you're using the right environment (dev vs. production)
- If production, verify Vercel environment variables are set

### Changes Not Appearing After Save
- Wait 2-3 minutes for Vercel rebuild
- Go to Vercel Dashboard → Deployments to check status
- If stuck, manually trigger redeploy in Vercel

### Images Not Uploading
- File must be < 5MB
- Allowed formats: JPG, PNG, GIF, WebP
- Browser must allow localStorage (not in private mode)
- Check `/public/uploads/` folder exists

---

## File Structure After Edits

When you edit content, Tina updates these files:

```
content/
├── services/
│   ├── 5-axis-machining.mdx      ← Updated by Tina
│   ├── adaptive-machining.mdx     ← Updated by Tina
│   ├── metrology.mdx
│   └── engineering.mdx
├── industries/
│   ├── aerospace.mdx              ← Updated by Tina
│   ├── defense.mdx
│   ├── energy.mdx
│   └── medical.mdx
└── pages/
    └── (ready for future pages)

public/
└── uploads/
    ├── aerospace-hero.jpg         ← Images uploaded via Tina
    └── ...
```

---

## Best Practices

✅ **DO:**
- Edit from the visual editor when possible (easier for non-tech)
- Save regularly (editor autosaves but explicitly save before leaving)
- Test changes on production after deploy
- Keep passwords secure and change occasionally
- Use descriptive image file names

❌ **DON'T:**
- Edit `.mdx` files directly if you're not technical
- Use special characters in passwords
- Share the admin password in email or chat
- Upload very large images (resize first)
- Leave the admin panel open on shared computers

---

## Advanced: Manual Git Edits (For Developers)

You can still edit `.mdx` files directly in code if needed:

```bash
git clone https://github.com/iismet/precision-manufacturing.git
code content/services/5-axis-machining.mdx
# Make changes
git add content/
git commit -m "Update service content"
git push origin main
```

Vercel auto-deploys, and Tina will reflect your changes next time it loads.

---

## Support

- **Is the admin loading?** Check browser console (F12) for errors
- **Is the password wrong?** Check `.env.local` or Vercel settings
- **Are changes not deploying?** Check Vercel dashboard for build errors
- **Need to reset everything?** Delete localStorage and try logging in again

---

## Next Steps

1. ✅ Set `NEXT_PUBLIC_TINA_ADMIN_PASSWORD` in `.env.local`
2. ✅ Deploy to Vercel (add same env var there)
3. ✅ Visit `https://yourdomain.com/admin`
4. ✅ Log in with your password
5. ✅ Start editing!

That's it! The visual editor is ready for your marketing team to use.
