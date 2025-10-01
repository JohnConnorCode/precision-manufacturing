# 📋 Client Handoff Document
**IIS Precision Manufacturing Website**
*Production-Ready Next.js Application*

---

## 🎯 Project Overview

Enterprise-grade manufacturing website with:
- **50 SEO-optimized technical articles**
- **Sanity CMS** for content management
- **Google Analytics** integration
- **WCAG AA accessibility** compliance
- **Mobile-first responsive design**
- **Sub-2s load times**

---

## 🔐 Access & Credentials

### Production URLs
- **Live Site**: https://iismet.com
- **Sanity Studio**: https://iismet.com/studio
- **Vercel Dashboard**: https://vercel.com/[your-team]

### Required Accounts
| Service | Purpose | Login URL |
|---------|---------|-----------|
| Vercel | Hosting & Deployment | https://vercel.com |
| Sanity | Content Management | https://sanity.io |
| Google Analytics | Traffic Analytics | https://analytics.google.com |
| GitHub | Code Repository | https://github.com/[your-org]/[repo] |

### Environment Variables (Production)
```bash
# Sanity CMS (REQUIRED)
NEXT_PUBLIC_SANITY_PROJECT_ID=ept6x5im
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=[get from sanity.io]

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://iismet.com

# Analytics & Monitoring
NEXT_PUBLIC_GA_MEASUREMENT_ID=[your-GA4-ID]

# Contact Form (Setup Needed - See Section 7)
RESEND_API_KEY=[get from resend.com]
CONTACT_EMAIL=officemgr@iismet.com
```

---

## 📝 Content Management Guide

### Accessing Sanity Studio
1. Navigate to `https://iismet.com/studio`
2. Log in with Sanity credentials
3. All content is editable through visual interface

### Content Types You Can Edit:

#### 1. Homepage Sections
- **Hero**: Main headline, tagline, CTA buttons
- **Services**: Service cards with icons, descriptions
- **Stats**: Company statistics and achievements
- **Technical Specs**: Precision capabilities showcase

#### 2. Articles (50 Published)
Located in: **Content → Articles**
- Manufacturing Processes (15 articles)
- Quality & Compliance (12 articles)
- Material Science (10 articles)
- Case Studies & Applications (13 articles)

**How to Edit an Article:**
1. Go to Studio → Articles
2. Click any article to edit
3. Update title, content, images, or metadata
4. Click "Publish" (changes go live in ~30 seconds)

#### 3. Service Pages
- 5-Axis CNC Machining
- Precision Metrology
- Adaptive Machining
- Engineering Services
- Predictive Analytics

#### 4. Industry Pages
- Aerospace
- Defense
- Medical
- Energy

#### 5. Site Settings
- Contact information
- Social media links
- Footer content
- Google Analytics ID

---

## 🚀 How to Deploy Changes

### Automatic Deployment (Recommended)
Changes to `main` branch automatically deploy to production:
1. Make changes in code or Sanity Studio
2. Push to GitHub or publish in Sanity
3. Vercel auto-deploys in 2-3 minutes
4. Check live site to verify

### Manual Deployment (If Needed)
```bash
# From command line
vercel --prod

# Or via Vercel Dashboard
1. Go to vercel.com
2. Select project
3. Click "Redeploy"
```

---

## 🔧 Technical Maintenance

### Weekly Tasks
- [ ] Check Google Analytics for traffic patterns
- [ ] Review contact form submissions
- [ ] Check Vercel deployment logs for errors
- [ ] Scan for broken links (use `npm run test:links`)

### Monthly Tasks
- [ ] Review and update article content
- [ ] Check Core Web Vitals in Google Search Console
- [ ] Update dependencies: `npm update`
- [ ] Run full test suite: `npm test`
- [ ] Backup Sanity content (automatic, but verify)

### Quarterly Tasks
- [ ] Security audit: `npm audit`
- [ ] Lighthouse performance audit
- [ ] Accessibility audit with axe DevTools
- [ ] Review and update SEO strategy
- [ ] Update certifications/badges if renewed

---

## 📧 Contact Form Setup (ACTION REQUIRED)

**Status: ⚠️ Needs Email Service Configuration**

### Quick Setup with Resend (Recommended)
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Verify your domain `iismet.com`
3. Get API key from dashboard
4. Add to Vercel environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   CONTACT_EMAIL=officemgr@iismet.com
   ```
5. Redeploy site

**Alternative Email Services:**
- SendGrid (free tier: 100 emails/day)
- AWS SES (more complex setup, very cheap)
- Postmark (developer-friendly)

**Form Location**: `/contact` page
**Backend API**: `/api/contact` (already built, just needs email service)

---

## 📊 Analytics & Monitoring

### Google Analytics 4
**Dashboard**: https://analytics.google.com

**Key Metrics to Track:**
- Page views & unique visitors
- Top performing articles
- Conversion rate (contact form submissions)
- Traffic sources (organic, direct, referral)
- Bounce rate & time on page

**Custom Events Tracked:**
- CTA button clicks
- Article reads (scroll depth)
- PDF downloads
- Form submissions

### Vercel Analytics (Included)
- Real-time visitor data
- Performance metrics
- Edge function logs

---

## 🛡️ Security & Performance

### Current Status
✅ HTTPS enabled (automatic via Vercel)
✅ Image optimization (Next.js Image)
✅ Automatic code splitting
✅ CDN caching enabled
✅ Gzip/Brotli compression

### Recommended Additions
#### 1. Error Monitoring (Setup Sentry)
```bash
# Install Sentry
npm install --save @sentry/nextjs
npx @sentry/wizard -i nextjs

# Add SENTRY_DSN to .env
SENTRY_DSN=[your-dsn]
```

#### 2. Security Headers (Already Configured)
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

#### 3. Rate Limiting
Contact form has basic rate limiting (5 requests/minute/IP)

---

## 🎨 Brand Assets & Guidelines

### Color Palette
```css
--primary: #2563eb (Blue 600)
--secondary: #6366f1 (Indigo 600)
--accent: #3b82f6 (Blue 500)
--dark: #0f172a (Slate 950)
--text: #cbd5e1 (Slate 300)
```

### Typography
- **Headings**: Font Inter (Black weight)
- **Body**: Font Inter (Regular/Medium)
- **Monospace**: SF Mono / Cascadia Code

### Logo Files
- SVG: Statistical bell curve design
- Located in `/components/logos/`
- Variants: Standard, Animated, Statistical

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Site Not Updating After Publish
1. Check Vercel deployment status
2. Clear browser cache (Cmd+Shift+R)
3. Check Sanity Studio publish status
4. Wait 30-60 seconds for CDN cache refresh

#### Contact Form Not Working
1. Verify `RESEND_API_KEY` in Vercel env vars
2. Check `/api/contact` logs in Vercel dashboard
3. Test email deliverability at resend.com
4. Check spam folder for test emails

#### Images Not Loading
1. Verify Sanity image URLs are accessible
2. Check Next.js image domains in `next.config.js`
3. Review Vercel function logs for errors
4. Test image CDN: images.unsplash.com

#### Slow Page Load
1. Run Lighthouse audit: Chrome DevTools → Lighthouse
2. Check Vercel Analytics for slowest pages
3. Review image sizes (should be < 500KB)
4. Check third-party scripts loading

---

## 📞 Support Contacts

### Development Team
- **Primary Developer**: [Your Name/Company]
- **Email**: [contact email]
- **Response Time**: 24-48 hours

### Service Providers
| Service | Support | Documentation |
|---------|---------|---------------|
| Vercel | support@vercel.com | https://vercel.com/docs |
| Sanity | support@sanity.io | https://sanity.io/docs |
| Next.js | github.com/vercel/next.js | https://nextjs.org/docs |

---

## ✅ Pre-Launch Checklist

### Content
- [x] All 50 articles published
- [x] Company information accurate
- [x] Contact details correct
- [x] Service descriptions complete
- [x] Industry pages populated

### Technical
- [x] SSL certificate active
- [x] robots.txt configured
- [x] Sitemap.xml generated
- [x] 404 page styled
- [x] Favicon installed
- [x] Meta tags optimized
- [x] Structured data verified
- [x] Mobile responsive
- [x] Cross-browser tested
- [x] Accessibility audit passed

### SEO
- [x] Google Search Console verified
- [x] Google Analytics installed
- [x] OpenGraph images set
- [x] Twitter cards configured
- [x] Schema.org markup complete
- [x] Canonical URLs set
- [x] Alt tags on all images

### Performance
- [x] Lighthouse score > 90
- [x] Core Web Vitals passing
- [x] Image optimization enabled
- [x] Code splitting configured
- [x] CDN caching active

### Security
- [x] Environment variables secured
- [x] API keys in env only
- [x] CORS configured
- [x] Rate limiting enabled
- [x] Security headers set

### Post-Launch (Week 1)
- [ ] Submit sitemap to Google
- [ ] Setup Google Business Profile
- [ ] Configure email service (Resend)
- [ ] Test contact form end-to-end
- [ ] Setup error monitoring (Sentry)
- [ ] Create content calendar
- [ ] Train team on Sanity Studio

---

## 📚 Additional Resources

### Documentation
- **Main README**: `/README.md`
- **Sanity Guide**: `/SANITY_CMS_README.md`
- **API Documentation**: `/docs/API.md` (if needed)

### Video Tutorials (Recommended)
Create short screencasts for:
1. How to edit homepage content (5 min)
2. How to publish a new article (10 min)
3. How to update service pages (5 min)
4. How to view analytics (5 min)

### Training Session Agenda (1 hour)
1. **Sanity Studio Overview** (20 min)
   - Navigating the interface
   - Editing existing content
   - Publishing workflow

2. **Content Best Practices** (15 min)
   - SEO-friendly article writing
   - Image optimization tips
   - Accessibility guidelines

3. **Analytics Review** (15 min)
   - Reading Google Analytics
   - Understanding key metrics
   - Setting up custom reports

4. **Q&A + Troubleshooting** (10 min)

---

## 🎉 Launch Day Protocol

### T-24 Hours
- [ ] Final content review
- [ ] Test all forms and CTAs
- [ ] Verify analytics tracking
- [ ] Check mobile experience
- [ ] Run full test suite
- [ ] Backup current state

### Launch Day
- [ ] Deploy to production
- [ ] Verify DNS propagation
- [ ] Test from multiple locations
- [ ] Monitor error logs
- [ ] Check analytics real-time
- [ ] Send launch announcement

### T+24 Hours
- [ ] Review analytics data
- [ ] Check for broken links
- [ ] Monitor Core Web Vitals
- [ ] Review user feedback
- [ ] Document any issues

---

## 📈 Growth & Optimization

### Content Strategy
**Goal**: Publish 2 new articles per month

**Topics to Cover:**
- Customer success stories
- Technical deep-dives
- Industry trend analysis
- Manufacturing process guides
- Compliance updates

### SEO Roadmap
**Months 1-3**: Build authority
- Focus on long-tail keywords
- Internal linking optimization
- Backlink acquisition

**Months 4-6**: Scale content
- Expand article library to 75+
- Create pillar pages
- Build topic clusters

**Months 7-12**: Dominate niche
- Target competitive keywords
- Guest posting strategy
- Local SEO optimization

---

## 🔒 Backup & Disaster Recovery

### Automatic Backups
- **Code**: GitHub (commits every change)
- **Content**: Sanity (automatic versioning)
- **Deployment**: Vercel (rollback anytime)

### Manual Backup (Monthly Recommended)
```bash
# Export Sanity content
npm run sanity:export

# Save to external storage
# File saved to: backups/[date]-export.tar.gz
```

### Disaster Recovery Steps
1. **Site Down**: Vercel auto-heals, check status.vercel.com
2. **Content Lost**: Restore from Sanity versioning
3. **Code Issue**: Rollback in Vercel dashboard
4. **DNS Issue**: Verify DNS records at domain registrar

### Recovery Time Objectives (RTO)
- **Site outage**: < 5 minutes (automatic)
- **Content restoration**: < 30 minutes (manual)
- **Full rebuild**: < 2 hours (from scratch)

---

## 💡 Tips for Success

### Content
- Keep articles between 1,500-2,500 words
- Use technical terms but explain them
- Include real examples and case studies
- Update old articles every 6 months
- Add multimedia (images, videos) regularly

### SEO
- Focus on user intent, not just keywords
- Build high-quality backlinks
- Monitor Google Search Console weekly
- Update meta descriptions based on CTR
- Create compelling page titles

### Performance
- Compress images before uploading
- Limit third-party scripts
- Monitor Core Web Vitals monthly
- Test on real devices regularly
- Keep dependencies updated

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintained By**: [Your Team]

---

*This site represents cutting-edge web development practices for manufacturing. Built with performance, accessibility, and SEO as core principles.*
