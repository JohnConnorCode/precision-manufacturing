import type { Field } from 'payload'
import { flexibleImageField } from './flexibleImage'

/**
 * Comprehensive SEO Field Group
 *
 * Provides all necessary SEO fields for optimal search engine visibility:
 * - Meta tags (title, description)
 * - Open Graph tags (for social sharing)
 * - Twitter Card data
 * - Canonical URL
 * - Indexing controls
 *
 * Usage:
 * ```typescript
 * import { seoField } from './fields/seo'
 *
 * fields: [
 *   seoField
 * ]
 * ```
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO & Social Sharing',
  admin: {
    position: 'sidebar',
    description: 'Configure how this page appears in search engines and when shared on social media',
  },
  fields: [
    // Basic Meta Tags
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Title shown in search results and browser tabs (50-60 characters recommended)',
        placeholder: 'Your compelling page title',
      },
      validate: (value: string | string[] | null | undefined) => {
        if (!value) return true;
        const str = Array.isArray(value) ? value.join('') : value;
        return str.length <= 60 ? true : 'Meta title should be 60 characters or less for optimal display in search results';
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Description shown in search results (150-160 characters recommended)',
        placeholder: 'A concise description that encourages users to click',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return value.length <= 160 ? true : 'Meta description should be 160 characters or less for optimal display in search results';
      },
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    {
      name: 'ogTitle',
      type: 'text',
      label: 'Open Graph Title',
      admin: {
        description: 'Title when shared on social media (defaults to Meta Title if empty)',
        placeholder: 'Leave empty to use Meta Title',
      },
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      label: 'Open Graph Description',
      admin: {
        description: 'Description when shared on social media (defaults to Meta Description if empty)',
        placeholder: 'Leave empty to use Meta Description',
      },
    },
    {
      name: 'ogImageGroup',
      type: 'group',
      label: 'Open Graph Image',
      admin: {
        description: 'Image shown when shared on social media (recommended: 1200x630px)',
      },
      fields: flexibleImageField('ogImage', {
        label: 'Social Share Image',
        description: 'Upload or provide URL for the image shown when this page is shared (1200x630px recommended)',
      }),
    },

    // Twitter Card
    {
      name: 'twitterCard',
      type: 'select',
      label: 'Twitter Card Type',
      defaultValue: 'summary_large_image',
      options: [
        {
          label: 'Summary with Large Image',
          value: 'summary_large_image',
        },
        {
          label: 'Summary',
          value: 'summary',
        },
      ],
      admin: {
        description: 'How this page appears when shared on Twitter/X',
      },
    },
    {
      name: 'twitterTitle',
      type: 'text',
      label: 'Twitter Title',
      admin: {
        description: 'Title for Twitter/X (defaults to OG Title or Meta Title if empty)',
        placeholder: 'Leave empty to use OG Title',
      },
    },
    {
      name: 'twitterDescription',
      type: 'textarea',
      label: 'Twitter Description',
      admin: {
        description: 'Description for Twitter/X (defaults to OG Description or Meta Description if empty)',
        placeholder: 'Leave empty to use OG Description',
      },
    },

    // Advanced SEO
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL',
      admin: {
        description: 'The preferred URL for this page (leave empty to auto-generate)',
        placeholder: 'https://example.com/preferred-url',
      },
      validate: (value: string | string[] | null | undefined) => {
        if (!value) return true;
        const url = Array.isArray(value) ? value[0] : value;
        if (!url) return true;
        return /^https?:\/\//.test(url) ? true : 'Please provide a valid URL (must start with http:// or https://)';
      },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      label: 'Prevent Indexing',
      defaultValue: false,
      admin: {
        description: 'Check this to prevent search engines from indexing this page (useful for private or duplicate pages)',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Focus Keywords',
      admin: {
        description: 'Primary keywords for this page (for internal reference, not used in meta tags)',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

/**
 * Helper function to get meta title with fallback
 */
export const getMetaTitle = (
  seoData: any,
  fallbackTitle: string
): string => {
  return seoData?.metaTitle || fallbackTitle || 'IIS Precision Manufacturing'
}

/**
 * Helper function to get meta description with fallback
 */
export const getMetaDescription = (
  seoData: any,
  fallbackDescription: string
): string => {
  return seoData?.metaDescription || fallbackDescription || 'Precision manufacturing excellence since 1995'
}

/**
 * Helper function to get OG title with fallback chain
 */
export const getOgTitle = (
  seoData: any,
  fallbackTitle: string
): string => {
  return seoData?.ogTitle || seoData?.metaTitle || fallbackTitle || 'IIS Precision Manufacturing'
}

/**
 * Helper function to get OG description with fallback chain
 */
export const getOgDescription = (
  seoData: any,
  fallbackDescription: string
): string => {
  return seoData?.ogDescription || seoData?.metaDescription || fallbackDescription || 'Precision manufacturing excellence since 1995'
}

/**
 * Helper function to get Twitter title with fallback chain
 */
export const getTwitterTitle = (
  seoData: any,
  fallbackTitle: string
): string => {
  return seoData?.twitterTitle || seoData?.ogTitle || seoData?.metaTitle || fallbackTitle || 'IIS Precision Manufacturing'
}

/**
 * Helper function to get Twitter description with fallback chain
 */
export const getTwitterDescription = (
  seoData: any,
  fallbackDescription: string
): string => {
  return seoData?.twitterDescription || seoData?.ogDescription || seoData?.metaDescription || fallbackDescription || 'Precision manufacturing excellence since 1995'
}
