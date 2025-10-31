# Admin Panel User Guide - Production Ready

## ⚡ New Production Features

Your admin panel is now enterprise-grade with these powerful features:

### ✅ Flexible Image Management
- **Upload images** from your computer OR **paste external URLs**
- Choose your preferred method with a simple toggle
- Images stored in Vercel Blob (persist across deployments)
- Automatic resizing: thumbnail, card, tablet, and hero sizes

### ✅ Draft & Publish Workflow
- **Save drafts** without publishing to live site
- **Auto-save** every 30 seconds (never lose work)
- **Preview changes** before publishing
- **Version history** to rollback if needed

### ✅ Comprehensive SEO Tools
- Meta titles and descriptions with character limits
- Open Graph tags for social sharing
- Twitter Card configuration
- Canonical URLs and indexing control

### ✅ User Roles & Permissions
- **Admin**: Full access to everything
- **Editor**: Create/edit content, cannot delete
- **Viewer**: Read-only access

### ✅ Smart Validation
- Slug validation (URL-friendly format)
- Email and phone validation
- Character limits with live feedback
- Helpful error messages

## 🎨 Branding

Your admin panel matches your site's branding:
- **Header**: Dark (#0E1116) with cyan accent stripe (#22D3EE)
- **Buttons**: Cyan-to-electric blue gradient
- **Navigation**: Cyan highlights on hover and active states
- **Upload Areas**: Dashed cyan borders

## 👁️ Live Preview Feature

### How It Works

When editing content, you'll see a **"Preview"** button in the top right:

1. **Click Preview** to open side-by-side view
2. **Left Side**: Your editing fields
3. **Right Side**: Live preview of the actual page
4. **Changes Update Instantly** as you type

### Device Breakpoints

Toggle between device sizes to see responsive design:
- **📱 Mobile**: 375x667px (iPhone size)
- **📱 Tablet**: 768x1024px (iPad size)
- **💻 Desktop**: 1440x900px (laptop size)

### Available On:
- ✅ Services (live preview of /services/[slug])
- ✅ Industries (live preview of /industries/[slug])
- ✅ Homepage (live preview of /)
- ✅ About (live preview of /about)

## 📸 Flexible Image Management

### Two Ways to Add Images

**Option 1: Upload from Computer**
1. Select "Upload from Media Library" radio button
2. Click the upload field
3. Select an existing image OR upload a new one
4. Images are stored in Vercel Blob (permanent storage)

**Option 2: External URL**
1. Select "External URL" radio button
2. Paste the full image URL (must start with http:// or https://)
3. Example: `https://images.unsplash.com/photo-123456789`

### Media Collection

1. Go to **Collections → Media**
2. Click **Create New**
3. **Drag & drop** or **click to browse** for images
4. Add **Alt Text** (required for accessibility)
5. Optionally add a **Caption**
6. Click **Save**

### Image Sizes Generated Automatically:
- **Thumbnail**: 400x300px (for admin previews)
- **Card**: 768x1024px (for card layouts)
- **Tablet**: 1024px wide (for content areas)
- **Hero**: 1920x1080px (for hero sections)
- **Original**: Full resolution preserved

### Pro Tips:
- Upload images once, reuse them everywhere
- Use external URLs for temporary images
- Alt text improves SEO and accessibility
- Images persist across deployments (stored in Vercel Blob)

## 🎯 Editing Workflow (NEW: Draft & Publish)

### Professional Draft Workflow:

**Step 1: Create or Edit Content**
1. **Open the content** you want to edit (e.g., Service, Industry, Resource)
2. **Click Preview button** (top right) to see live preview
3. **Select device size** (Mobile/Tablet/Desktop)
4. **Make your edits** in the left panel

**Step 2: Save as Draft**
1. **Click "Save Draft"** (instead of "Publish")
2. Changes are **NOT live** on the website
3. **Auto-saves every 30 seconds** (never lose work)
4. You can **leave and come back** anytime

**Step 3: Review & Preview**
1. **Preview your changes** using the live preview
2. **Test on all device sizes**
3. **Check for errors** or typos
4. **Share preview link** with team members (if needed)

**Step 4: Publish When Ready**
1. **Click "Publish"** when satisfied
2. Changes **go live immediately**
3. **Previous version saved** in history

### Draft Status Indicators:
- **Draft**: Yellow badge - not published yet
- **Published**: Green badge - live on website
- **Modified**: Orange badge - published but has unpublished changes

### Version History:
- View **past versions** of any document
- **Rollback to previous version** if needed
- Up to **10 versions saved** per document
- See **who made changes** and when

### Tips:
- Use **Draft** for major changes or work-in-progress
- Use **Publish** for minor typo fixes
- Auto-save runs every 30 seconds
- Preview before publishing

## 🔐 Access

- **URL**: https://precision-manufacturing.vercel.app/admin
- **Email**: jt.connor88@gmail.com
- **Password**: ChainBlockM1!

## 🔍 SEO Optimization (NEW)

Every page now has comprehensive SEO controls in the sidebar:

### Meta Tags (Required for Google):
1. **Meta Title** (50-60 characters recommended)
   - Shown in search results
   - Appears in browser tab
   - Character counter shows live feedback

2. **Meta Description** (150-160 characters recommended)
   - Shown in search results below title
   - Encourages users to click
   - Character counter prevents truncation

### Social Sharing (Open Graph):
3. **OG Title** - Title when shared on Facebook/LinkedIn (defaults to Meta Title)
4. **OG Description** - Description when shared (defaults to Meta Description)
5. **OG Image** - Image shown in social posts (upload or URL, 1200x630px recommended)

### Twitter/X Cards:
6. **Twitter Card Type** - Summary or Summary with Large Image
7. **Twitter Title** - Title for Twitter (defaults to OG Title)
8. **Twitter Description** - Description for Twitter (defaults to OG Description)

### Advanced:
9. **Canonical URL** - Preferred URL if content exists in multiple places
10. **Prevent Indexing** - Check to hide from search engines (private pages)
11. **Focus Keywords** - Internal reference for primary keywords

### SEO Best Practices:
- Fill out **Meta Title** and **Description** for every page
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Upload **OG images** for better social sharing
- Use **focus keywords** naturally in content

## 👥 User Management (NEW)

### User Roles:
**Admin** (Full Access):
- Create, edit, and delete all content
- Manage users and roles
- Delete media files
- Access all settings

**Editor** (Content Only):
- Create and edit content
- Upload and update media
- Cannot delete anything
- Cannot manage users

**Viewer** (Read-Only):
- Browse content in admin
- View but cannot edit
- Perfect for stakeholders

### Adding Team Members:
1. Go to **Collections → Users**
2. Click **Create New**
3. Enter **Name** and **Email**
4. Set **Password**
5. Choose **Role** (Admin, Editor, or Viewer)
6. Click **Create**

### Managing Your Account:
- Click your **email** in top right
- Select **Account**
- Update name or password
- Role can only be changed by Admins

## 🆘 Common Tasks

### Edit Homepage Hero:
1. Go to **Globals → Homepage**
2. Click **Preview** to see changes live
3. Edit **Hero** section fields
4. Scroll to **SEO** section and add meta tags
5. Click **Save Draft** or **Publish**

### Add a New Service:
1. Go to **Collections → Services**
2. Click **Create New**
3. Fill in **title** (will show on page)
4. Fill in **slug** (URL-friendly, auto-validates)
5. Add **short description** and full **description**
6. Upload **images** or paste URLs
7. Fill out **SEO** section (sidebar)
8. Click **Preview** to see how it looks
9. **Save Draft** or **Publish**

### Upload Company Photos:
1. Go to **Collections → Media**
2. **Create New**
3. Upload image with **alt text** (required)
4. Add optional caption
5. **Save** - image is now in your media library
6. Use in any image field (select from media library)

### Optimize Page for SEO:
1. Edit any page (Service, Industry, Resource, Global)
2. Scroll to **SEO** section in sidebar
3. Fill out **Meta Title** (keep under 60 chars)
4. Fill out **Meta Description** (keep under 160 chars)
5. Upload **OG Image** for social sharing
6. **Publish** changes

## 🎨 Customization

The admin panel matches your brand with:
- Cyan accent colors (#22D3EE)
- Dark professional header
- Gradient action buttons
- Professional status badges
- Custom hover animations

All styling is in `admin-custom.css` and can be adjusted if needed.

## 📞 Support

If you need help:
1. Check this guide first
2. Try the **Preview** feature to see changes before saving
3. Remember: All changes are live after clicking Save
