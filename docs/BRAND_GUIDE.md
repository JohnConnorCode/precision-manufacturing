# Brand Guide - Precision Manufacturing

## Visual Identity

### Core Values
- **Precision**: Every pixel, every tolerance, every interaction
- **Trust**: ITAR-compliant, aerospace-grade quality
- **Innovation**: Adaptive manufacturing, cutting-edge technology
- **Excellence**: Zero-defect delivery, continuous improvement

## Color System

### Primary Palette
```css
--brand-bg: #0E1116;        /* Deep space black */
--brand-fg: #E8ECF1;        /* Titanium white */
--brand-muted: #A9B2BD;     /* Machined aluminum */
--brand-accent: #22D3EE;    /* Electric cyan - primary accent */
--brand-accent-electric: #00D4FF; /* Pure electric blue */
```

### Semantic Colors
- **Success**: `#10B981` (green-500)
- **Warning**: `#F59E0B` (amber-500)
- **Error**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

### Usage Guidelines
- Primary accent (`brand-accent`) for CTAs, links, active states
- Electric accent sparingly for hover states and special emphasis
- Maintain 4.5:1 contrast ratio minimum (WCAG AA)
- Dark backgrounds for hero sections, light for content areas

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale
- **Hero**: 4.5rem (72px) - Bold 700
- **H1**: 3rem (48px) - Bold 700
- **H2**: 2.25rem (36px) - Semibold 600
- **H3**: 1.875rem (30px) - Semibold 600
- **H4**: 1.5rem (24px) - Medium 500
- **Body**: 1rem (16px) - Regular 400
- **Small**: 0.875rem (14px) - Regular 400
- **Caption**: 0.75rem (12px) - Regular 400

### Line Heights
- **Tight** (1.25): Headlines, hero text
- **Normal** (1.5): Body copy
- **Relaxed** (1.75): Long-form content

## Spacing System

### Base Unit: 4px
```
0.25rem (4px)   - xs
0.5rem (8px)    - sm
1rem (16px)     - base
1.5rem (24px)   - md
2rem (32px)     - lg
3rem (48px)     - xl
4rem (64px)     - 2xl
6rem (96px)     - 3xl
```

### Container
- Max width: 1200px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Grid: 12 columns with 24px gap

## Components

### Buttons
```css
/* Primary */
.btn-primary {
  background: var(--brand-accent);
  color: var(--brand-bg);
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 500;
}

/* Secondary */
.btn-secondary {
  background: transparent;
  border: 1px solid var(--brand-accent);
  color: var(--brand-accent);
}

/* Tertiary */
.btn-tertiary {
  background: transparent;
  color: var(--brand-accent);
  text-decoration: underline;
}
```

### Cards
```css
.card {
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border);
}

.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}
```

### Badges
```css
.badge {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--brand-accent) / 0.1;
  color: var(--brand-accent);
  border: 1px solid var(--brand-accent) / 0.2;
}
```

## Motion Guidelines

### Core Principles
- **Purposeful**: Every animation serves a function
- **Subtle**: Enhance, don't distract
- **Performant**: 60fps target, GPU-accelerated
- **Accessible**: Respect prefers-reduced-motion

### Standard Timings
- **Instant**: 100ms (hover states)
- **Fast**: 200ms (micro-interactions)
- **Normal**: 450ms (page transitions)
- **Slow**: 900ms (complex animations)

### Easing Functions
- **easeOut**: Default for most animations
- **easeInOut**: Page transitions
- **linear**: Progress indicators

### Animation Presets
```javascript
// Fade In Up
duration: 0.45s, ease: easeOut, y: 20px → 0

// Stagger Children
staggerChildren: 0.08s, delayChildren: 0.1s

// Border Sweep
duration: 0.9s, scaleX: 0 → 1, origin: left
```

## Grid System

### Desktop (1280px+)
- 12 columns
- 24px gap
- Max width: 1200px

### Tablet (768px - 1279px)
- 8 columns
- 20px gap
- Fluid width with 32px margins

### Mobile (< 768px)
- 4 columns
- 16px gap
- Fluid width with 16px margins

## Icon System

Using Lucide React icons:
- Size: 20px (default), 24px (medium), 32px (large)
- Stroke width: 1.5px
- Color: Inherit from parent
- Consistent metaphors across the site

## Photography & Imagery

### Style Guidelines
- High contrast, industrial aesthetic
- Focus on precision and detail
- Avoid generic stock photos
- ITAR compliance - no restricted components
- Prefer diagrams and technical illustrations

### Image Optimization
- Format: WebP with JPEG fallback
- Sizes: Responsive srcset
- Loading: Lazy load below fold
- Alt text: Descriptive for accessibility

## Voice & Tone

### Brand Voice
- **Professional**: Industry expertise without jargon
- **Confident**: We deliver on our promises
- **Precise**: Exact specifications, clear communication
- **Innovative**: Forward-thinking solutions

### Copy Guidelines
- Lead with benefits, support with features
- Use active voice
- Be specific about capabilities (tolerances, certifications)
- Avoid superlatives without data
- Include trust signals (ITAR, AS9100D, etc.)

### Key Messages
1. "Precision to ±0.0001 inch"
2. "ITAR-compliant, AS9100D certified"
3. "Zero-defect delivery"
4. "24/7 production capability"
5. "Adaptive manufacturing technology"

## Accessibility Standards

### WCAG 2.1 Level AA
- Color contrast: 4.5:1 minimum
- Focus indicators: Visible and consistent
- Touch targets: 44x44px minimum
- Alt text: All images and icons
- Semantic HTML: Proper heading hierarchy

### Keyboard Navigation
- Tab order: Logical flow
- Skip links: To main content
- Focus trapping: In modals/dialogs
- Escape key: Closes overlays

## Implementation Checklist

### Design Tokens
- [ ] CSS variables defined in globals.css
- [ ] Tailwind config aligned with brand
- [ ] Component library using tokens
- [ ] Dark mode variables set

### Components
- [ ] Buttons (primary, secondary, tertiary)
- [ ] Cards with hover states
- [ ] Navigation (desktop/mobile)
- [ ] Forms with validation states
- [ ] Modals and dialogs
- [ ] Loading states

### Motion
- [ ] Animation presets imported
- [ ] Reduced motion support
- [ ] Page transitions
- [ ] Micro-interactions
- [ ] Loading indicators

### Quality Assurance
- [ ] Cross-browser testing
- [ ] Responsive breakpoints
- [ ] Accessibility audit
- [ ] Performance metrics
- [ ] Brand consistency review