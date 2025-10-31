# Admin Panel User Guide

## ✅ Fixed Issues

### Text Visibility
- **Before**: Light gray text (#CCC) on white - nearly invisible
- **Now**: True black text (#000) with bold weight - crystal clear
- **Labels**: Uppercase with letter-spacing for professional look

### UI Layout
- **Before**: Section titles overlapped with toggle buttons
- **Now**: Proper flexbox layout with clear spacing
- **Result**: Clean, professional interface

## 🎨 Branding

Your admin panel now matches your site's branding:
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

## 📸 Media Uploads

### Uploading Images

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
- **Original**: Full resolution preserved

### Using Uploaded Images

After uploading, you'll get a URL like:
```
/media/your-image-name.jpg
```

Use this in any image field throughout the CMS.

## 🎯 Editing Workflow

### Recommended Process:

1. **Open the content you want to edit** (e.g., About page)
2. **Click Preview button** (top right)
3. **Select device size** (Mobile/Tablet/Desktop)
4. **Make your edits** in the left panel
5. **Watch changes appear** in the right preview panel
6. **When satisfied**, click **Save**
7. **Changes go live immediately**

### Tips:
- Use **Preview** to see formatting before publishing
- Test on **all device sizes** for responsive design
- **Save drafts** frequently
- Upload **optimized images** (web-ready formats)

## 🔐 Access

- **URL**: https://precision-manufacturing.vercel.app/admin
- **Email**: jt.connor88@gmail.com
- **Password**: ChainBlockM1!

## 🆘 Common Tasks

### Edit Homepage Hero:
1. Go to **Globals → Homepage**
2. Click **Preview** to see changes live
3. Edit **Hero** section fields
4. **Save**

### Add a New Service:
1. Go to **Collections → Services**
2. Click **Create New**
3. Fill in title, slug, description
4. Click **Preview** to see how it looks
5. **Save & Publish**

### Upload Company Photos:
1. Go to **Collections → Media**
2. **Create New**
3. Upload image with alt text
4. Copy the generated URL
5. Use URL in any image field

### Change Navigation:
1. Go to **Globals → Navigation**
2. Edit menu items
3. **Save** (navigation updates sitewide)

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
