# Sanity CMS Setup Guide

## ✅ Current Setup Status

Your Sanity integration is **fully configured** and ready for content! Here's what's been set up:

### Project Structure
```
/sanity/
├── config.ts                 # Main Sanity configuration
├── schemaTypes/             # Content schemas
│   ├── index.ts            # Schema exports
│   ├── page.ts             # Generic pages
│   ├── service.ts          # Service offerings
│   ├── industry.ts         # Industry pages
│   ├── legalDoc.ts         # Terms, policies
│   ├── post.ts             # Blog/knowledge base
│   ├── lead.ts             # Contact form submissions
│   ├── siteSettings.ts     # Global settings
│   └── blockContent.ts     # Rich text configuration
/lib/
├── sanity.client.ts        # Sanity client for fetching
└── sanity.queries.ts       # GROQ queries
/app/studio/[[...tool]]/
├── page.tsx                # Studio UI page
└── layout.tsx              # Studio layout (no header/footer)
/scripts/
└── seed.ts                 # Initial content seeder
```

## 🚀 Quick Start

### 1. Get Your Sanity Project ID

**Option A: Create New Project (CLI)**
```bash
npm install -g sanity@latest
sanity login
sanity init --dataset production
```

**Option B: Use Existing Project**
Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → Settings → Project ID

### 2. Update Environment Variables

Edit `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01

# Optional: For draft content preview
SANITY_READ_TOKEN=sk_prod_xxxxx

# For seeding script only (don't commit!)
SANITY_WRITE_TOKEN=sk_prod_xxxxx
```

### 3. Configure CORS

In Sanity Dashboard → API → CORS Origins, add:
- `http://localhost:3000` (development)
- `http://localhost:3002` (if using alt port)
- `https://your-domain.vercel.app` (staging)
- `https://your-production-domain.com` (production)

### 4. Access Sanity Studio

```bash
npm run dev
# Visit http://localhost:3000/studio
```

The Studio is now available at `/studio` - no separate process needed!

### 5. Seed Initial Content (Optional)

Get a write token from Sanity → API → Tokens → Add Token (Editor or Admin role)

```bash
# Add SANITY_WRITE_TOKEN to .env.local
npx tsx scripts/seed.ts
```

This creates:
- Site settings
- Home & About pages
- 3 Services (5-axis, adaptive, metrology)
- 3 Industries (aerospace, energy, defense)
- Legal documents
- Sample blog post

## 📝 Content Types

### Pages (`page`)
Generic pages with flexible sections
- Home, About, etc.
- Hero section with headline, subhead, CTA
- Dynamic content sections

### Services (`service`)
- Title, slug, intro
- Capabilities list
- Specification highlights
- Image gallery
- SEO metadata

### Industries (`industry`)
- Problem/solution text
- Tolerance specifications
- Required certifications
- Case studies

### Legal Documents (`legalDoc`)
- Terms & Conditions
- Supplier Requirements
- Privacy Policy
- Cookie Policy
- Version control & effective dates

### Blog Posts (`post`)
- Knowledge base articles
- Technical guides
- Company news
- SEO optimized

### Site Settings (`siteSettings`)
- Global configuration
- Contact info
- Social links
- Default SEO

## 🔧 Common Tasks

### Fetch Content in Pages

```tsx
// app/[slug]/page.tsx
import { sanityClient } from '@/lib/sanity.client';
import { pageBySlugQuery } from '@/lib/sanity.queries';

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await sanityClient.fetch(pageBySlugQuery, {
    slug: params.slug
  });

  if (!page) notFound();

  return (
    <main>
      <h1>{page.hero?.headline || page.title}</h1>
      {/* Render content */}
    </main>
  );
}
```

### Render Portable Text

```tsx
import { PortableText } from '@portabletext/react';

<PortableText value={page.body} />
```

### Display Images

```tsx
import { urlFor } from '@/lib/sanity.client';

<img
  src={urlFor(page.hero.media).width(1920).url()}
  alt={page.hero.headline}
/>
```

### Dynamic Routes from CMS

```tsx
// app/services/[slug]/page.tsx
import { sanityClient } from '@/lib/sanity.client';

export async function generateStaticParams() {
  const services = await sanityClient.fetch(
    `*[_type == "service"]{ slug }`
  );

  return services.map((service) => ({
    slug: service.slug.current,
  }));
}
```

## 🔄 Revalidation

### On-Demand Revalidation (Webhooks)

1. In Sanity: Manage → Webhooks → Create
2. URL: `https://your-domain.com/api/revalidate`
3. Trigger on: Create, Update, Delete
4. Filter by type: page, service, industry, etc.

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Revalidate based on document type
  if (body._type === 'page') {
    revalidatePath(`/${body.slug.current}`);
  }

  return NextResponse.json({ revalidated: true });
}
```

### Time-based Revalidation

```tsx
// In fetch options
export const revalidate = 60; // Revalidate every 60 seconds
```

## 🔒 Security

### Studio Authentication

For production, add middleware to protect `/studio`:

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) {
    const auth = request.headers.get('authorization');

    if (!auth || !validateAuth(auth)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Studio"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/studio/:path*',
};
```

### API Tokens

- **Read tokens**: Can be exposed to browser (for draft preview)
- **Write tokens**: Server-side only! Never commit to repo
- Use environment variables and `.env.local` (gitignored)

## 🐛 Troubleshooting

### "Project ID undefined"
- Check `.env.local` has correct values
- Restart dev server after changing env vars
- Ensure no typos in variable names

### CORS Errors
- Add your URL to Sanity → API → CORS Origins
- Include protocol (http:// or https://)
- No trailing slash

### Studio Blank/Loading Forever
- Verify project ID and dataset match
- Check browser console for errors
- Ensure you're logged into Sanity

### Query Returns Null
- Check dataset name (production vs development)
- Verify document exists in Studio
- Check slug matches exactly (case-sensitive)
- Use Vision plugin in Studio to test queries

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run typecheck`

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/groq-query-cheat-sheet)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router)
- [Portable Text Guide](https://www.sanity.io/guides/portable-text)

## 🎯 Next Steps

1. **Create Sanity Project**: Get your project ID
2. **Update .env.local**: Add your project credentials
3. **Configure CORS**: Add your domains
4. **Access Studio**: Visit `/studio` and create content
5. **Test Frontend**: Verify content appears on pages
6. **Deploy**: Push to production with env vars

---

**Need Help?**
- Check console errors first
- Test queries in Studio Vision tab
- Verify environment variables are loaded
- Ensure CORS is configured for your domain