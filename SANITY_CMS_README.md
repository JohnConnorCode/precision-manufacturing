# Sanity CMS Setup Guide

## Overview
This site is integrated with Sanity CMS for content management. All page content can be edited through the Sanity Studio interface.

## Access the CMS
- **Production Studio**: https://precision-manufacturing.vercel.app/studio
- **Local Studio**: http://localhost:3000/studio

## Project Details
- **Project ID**: `ept6x5im`
- **Dataset**: `production`
- **API Version**: `2024-01-01`

## Content Structure

### Home Page
- Hero section with slides and CTAs
- Statistics/capabilities
- Call-to-action section
- SEO settings

### Service Pages
Each service page includes:
- Hero section with background image
- Overview and highlights
- Capabilities and specifications
- Features with details
- Process steps
- Technologies and equipment
- Case studies
- Related industries

### Industry Pages
Each industry page includes:
- Hero section
- Industry overview
- Capabilities specific to industry
- Applications and use cases
- Certifications and standards
- Case studies with metrics
- Partners and equipment

### Global Settings
- Company information
- Navigation menus
- Footer content
- Social media links
- Default SEO settings

## How to Add/Edit Content

1. **Access the Studio**
   - Click the "Edit Content" button (bottom-right of any page)
   - Or navigate directly to `/studio`

2. **Create Content**
   - In the Studio, select the document type you want to edit
   - Fill in the required fields
   - Save and publish your changes

3. **Preview Changes**
   - Changes are reflected on the site within 60 seconds
   - The site uses ISR (Incremental Static Regeneration) for optimal performance

## Content Guidelines

### Images
- Use high-quality images (minimum 1920x1080 for hero images)
- Optimize images before uploading
- Always add alt text for accessibility

### SEO
- Each page should have unique meta title and description
- Keep meta titles under 60 characters
- Keep meta descriptions under 160 characters

### Service/Industry Pages
- Maintain consistent structure across similar pages
- Use the slug field to define the URL path
- Ensure all required fields are filled

## Development

### Fetching Data
Pages automatically fetch data from Sanity. Example:

```typescript
import { client } from '@/sanity/lib/sanity';
import { homePageQuery } from '@/sanity/lib/queries';

const data = await client.fetch(homePageQuery);
```

### Revalidation
- Pages revalidate every 60 seconds
- This ensures fresh content while maintaining performance

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ept6x5im
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

## Troubleshooting

### Content Not Appearing
1. Ensure content is published (not just saved as draft)
2. Wait 60 seconds for cache revalidation
3. Check browser console for any errors

### Studio Not Loading
1. Verify environment variables are set
2. Check that you're logged into Sanity
3. Clear browser cache and cookies

### Images Not Displaying
1. Ensure images are uploaded to Sanity's CDN
2. Check that image references are properly formatted
3. Verify image URLs are accessible

## Support
For CMS-related issues, check:
- Sanity documentation: https://www.sanity.io/docs
- Project repository for technical issues