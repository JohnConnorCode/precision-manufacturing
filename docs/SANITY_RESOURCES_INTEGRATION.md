# Sanity CMS Resources Integration

## Overview

All technical resources and articles are now integrated with Sanity CMS, providing a robust content management system for the IIS precision manufacturing website.

## Architecture

### Content Structure

The resources are managed through Sanity CMS with the following structure:

1. **Resource Schema** (`/sanity/schemas/resource.ts`)
   - Title, slug, excerpt
   - Category (Manufacturing Processes, Material Science, Quality & Compliance, Industry Applications, Calculators & Tools)
   - Difficulty levels (Beginner, Intermediate, Advanced)
   - Rich content with Portable Text
   - Custom components (CalloutBox, TechnicalSpecs, CTAButton, Code blocks)
   - SEO metadata

2. **Data Fetching** (`/lib/sanity-resources.ts`)
   - Server-side data fetching functions
   - Category filtering
   - Related articles
   - Featured content

3. **Rendering** (`/components/portable-text-components.tsx`)
   - Custom Portable Text components
   - Syntax highlighting for code blocks
   - Interactive components integration

## Migration Process

### Running the Migration

To migrate existing MDX content to Sanity:

1. **Set up Sanity API token**:
   ```bash
   # Create a token at https://www.sanity.io/manage
   export SANITY_API_TOKEN="your-token-here"
   ```

2. **Run migration script**:
   ```bash
   npm run migrate:content
   ```

This will:
- Read all MDX files from `/content/resources/`
- Convert MDX content to Portable Text format
- Create documents in Sanity CMS
- Preserve all metadata and relationships

## Content Management

### Accessing Sanity Studio

Navigate to `/studio` to access the Sanity Studio interface where you can:
- Create new resources
- Edit existing content
- Manage categories and tags
- Preview content changes

### Creating New Resources

1. Go to Sanity Studio (`/studio`)
2. Click on "Technical Resources"
3. Click "Create new"
4. Fill in required fields:
   - Title
   - Slug (auto-generated from title)
   - Category
   - Difficulty level
   - Content (using rich text editor)

### Content Components

The following custom components are available in Portable Text:

#### CalloutBox
```
Type: info | warning | success | error | tip
Title: Component title
Content: Message text
```

#### TechnicalSpecs
```
Specifications array with:
- Label
- Value
- Unit
```

#### CTAButton
```
Text: Button label
Href: Link destination
Variant: primary | secondary
```

#### Code Block
```
Language: javascript | typescript | python | json | bash | text
Code: The code content
```

## Page Implementation

### Resources List Page
- **File**: `/app/resources/page-sanity.tsx`
- Fetches all resources from Sanity
- Groups by category
- Shows featured content
- Server-side rendered

### Category Page
- **File**: `/app/resources/[category]/page-sanity.tsx`
- Filters resources by category
- Shows category-specific featured content

### Article Page
- **File**: `/app/resources/[category]/[slug]/page-sanity.tsx`
- Renders individual resource
- Shows related articles
- Full Portable Text rendering

## API Functions

### getAllResources()
Fetches all resources ordered by publish date

### getResourcesByCategory(category)
Fetches resources filtered by category

### getResource(slug)
Fetches a single resource by slug

### getRelatedResources(currentSlug, category, limit)
Fetches related resources in the same category

### getFeaturedResources()
Fetches all featured resources

## Content Created

The following high-quality technical content has been created:

### Manufacturing Processes
- 5-Axis CNC Machining for Aerospace Components
- Adaptive Machining Technology Guide

### Material Science
- Aerospace Alloy Selection Guide

### Quality & Compliance
- AS9100D Compliance Checklist
- Advanced Metrology and Inspection Services

### Industry Applications
- ITAR Compliance Guide for Defense Manufacturing
- Energy Turbine Components Manufacturing
- Medical Device Precision Manufacturing

### Interactive Tools
- ISO 286 Tolerance Calculator
- Material Selection Tool
- Compliance Checklist Tracker

## SEO Optimization

Each resource includes:
- SEO-optimized title and description
- Open Graph metadata
- Twitter card data
- Canonical URLs
- Structured data markup

## Performance Considerations

- Resources are server-side rendered for SEO
- Sanity CDN enabled for fast content delivery
- Images optimized through Sanity's image pipeline
- Portable Text components lazy-loaded

## Deployment

To deploy changes:

1. **Update content in Sanity Studio**
2. **Changes are immediately live** (no rebuild required for content)
3. **For schema changes**:
   ```bash
   npm run build
   npm run deploy
   ```

## Troubleshooting

### Content not appearing
- Check Sanity Studio for published status
- Verify API credentials in environment variables
- Check browser console for errors

### Migration issues
- Ensure SANITY_API_TOKEN is set
- Verify file paths in migration script
- Check Sanity project ID and dataset

### Styling issues
- Verify Tailwind classes in portable-text-components.tsx
- Check dark mode compatibility
- Inspect component rendering in browser

## Future Enhancements

1. **Search functionality** - Full-text search across resources
2. **User engagement** - Comments and ratings
3. **PDF generation** - Automatic PDF versions of articles
4. **Analytics integration** - Track popular content
5. **A/B testing** - Content optimization
6. **Multi-language support** - Internationalization

## Support

For issues or questions:
- Check Sanity documentation: https://www.sanity.io/docs
- Review Next.js documentation: https://nextjs.org/docs
- Contact IIS technical team