import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import { flexibleImageField } from './fields/flexibleImage'
import { seoField } from './fields/seo'
import {
  contentCollectionAccess,
  userCollectionAccess,
  mediaCollectionAccess,
  globalAccess,
  canManageContent,
} from './lib/access-control'
import {
  validateSlug,
  validateEmail,
  validatePhone,
  fieldDescriptions,
} from './lib/field-validation'
import { emailAdapter } from './lib/email-adapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ||
             process.env.NEXT_PUBLIC_SERVER_URL ||
             'http://localhost:3000',
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        Dashboard: {
          Component: '/components/admin/HelpDashboard#default',
        },
      },
    },
    meta: {
      titleSuffix: '- IIS Precision Manufacturing',
      description: 'Advanced precision machining and manufacturing management system',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.ico',
        },
      ],
    },
    theme: 'light',
    livePreview: {
      url: ({ data, locale, ...args }) => {
        // Generate preview URL based on collection/global
        const documentSlug = (args as any).documentSlug;
        const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app';

        if (documentSlug === 'services') {
          return `${baseURL}/services/${data?.slug || ''}`;
        }
        if (documentSlug === 'industries') {
          return `${baseURL}/industries/${data?.slug || ''}`;
        }
        if (documentSlug === 'resources') {
          return `${baseURL}/resources/${data?.category || 'manufacturing-processes'}/${data?.slug || ''}`;
        }
        if (documentSlug === 'homepage') {
          return `${baseURL}/`;
        }
        if (documentSlug === 'about') {
          return `${baseURL}/about`;
        }
        if (documentSlug === 'contact') {
          return `${baseURL}/contact`;
        }

        return baseURL;
      },
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [
    {
      slug: 'users',
      auth: {
        tokenExpiration: 7200, // 2 hours
        cookies: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          domain: undefined,
        },
      },
      admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'role'],
      },
      access: userCollectionAccess,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name of the user',
          },
        },
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'editor',
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Editor',
              value: 'editor',
            },
            {
              label: 'Viewer',
              value: 'viewer',
            },
          ],
          access: {
            // Only admins can change roles
            create: canManageContent as any,
            update: canManageContent as any,
          },
          admin: {
            position: 'sidebar',
            description: 'Admin: Full access | Editor: Create/edit content | Viewer: Read-only',
          },
        },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: 'public/media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 1024,
            position: 'centre',
          },
          {
            name: 'tablet',
            width: 1024,
            height: undefined,
            position: 'centre',
          },
          {
            name: 'hero',
            width: 1920,
            height: 1080,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
        disableLocalStorage: true, // Use Vercel Blob instead
      },
      admin: {
        description: 'Upload and manage images for use throughout the site. Images are stored in Vercel Blob for persistence.',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          admin: {
            description: 'Alternative text for accessibility and SEO (e.g., "CNC machine processing aerospace component")',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional caption or credit for the image',
          },
        },
      ],
      access: mediaCollectionAccess,
    },
    {
      slug: 'services',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'shortDescription', 'order'],
        livePreview: {
          url: ({ data }) => {
            const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app';
            return `${baseURL}/services/${data?.slug || ''}`;
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: fieldDescriptions.title,
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
            description: fieldDescriptions.slug,
          },
          validate: validateSlug,
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          admin: {
            description: fieldDescriptions.shortDescription,
          },
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
          admin: {
            description: fieldDescriptions.description,
          },
        },
        // Detailed page content structure
        {
          name: 'hero',
          type: 'group',
          fields: [
            ...flexibleImageField('backgroundImage', {
              label: 'Background Image',
              description: 'Upload an image or provide a URL for the hero background',
            }),
            { name: 'badge', type: 'text' },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'overview',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'capabilities',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'services',
          label: 'Service Offerings',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'iconName', type: 'text' },
            ...flexibleImageField('image', {
              label: 'Service Image',
              description: 'Upload an image or provide a URL for this service offering'
            }),
            {
              name: 'bullets',
              type: 'array',
              fields: [{ name: 'text', type: 'text' }],
            },
          ],
        },
        {
          name: 'technicalSpecs',
          type: 'array',
          fields: [
            { name: 'spec', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'note', type: 'text' },
          ],
        },
        {
          name: 'process',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text' }],
            },
          ],
        },
        {
          name: 'equipment',
          type: 'array',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'details', type: 'text' },
          ],
        },
        {
          name: 'materials',
          type: 'array',
          fields: [
            { name: 'category', type: 'text' },
            {
              name: 'types',
              type: 'array',
              fields: [{ name: 'type', type: 'text' }],
            },
            { name: 'applications', type: 'text' },
          ],
        },
        {
          name: 'processes',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text' }],
            },
          ],
        },
        seoField,
        {
          name: 'order',
          type: 'number',
          admin: {
            position: 'sidebar',
            description: fieldDescriptions.order,
          },
        },
        ...flexibleImageField('image', {
          label: 'Service Card Image',
          description: 'Upload an image or provide a URL for the service card display'
        }),
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'specs',
          type: 'array',
          fields: [
            {
              name: 'spec',
              type: 'text',
            },
          ],
        },
      ],
      access: contentCollectionAccess,
    },
    {
      slug: 'industries',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'shortDescription', 'order'],
        livePreview: {
          url: ({ data }) => {
            const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app';
            return `${baseURL}/industries/${data?.slug || ''}`;
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: fieldDescriptions.title,
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
            description: fieldDescriptions.slug,
          },
          validate: validateSlug,
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          admin: {
            description: fieldDescriptions.shortDescription,
          },
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
          admin: {
            description: fieldDescriptions.description,
          },
        },
        {
          name: 'hero',
          type: 'group',
          fields: [
            ...flexibleImageField('backgroundImage', {
              label: 'Hero Background Image',
              description: 'Upload an image or provide a URL for the industry hero background'
            }),
            { name: 'badge', type: 'text' },
            { name: 'subtitle', type: 'text' },
          ],
        },
        {
          name: 'overview',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
            { name: 'marketSize', type: 'text' },
            {
              name: 'keyDrivers',
              type: 'array',
              fields: [{ name: 'driver', type: 'text' }],
            },
            {
              name: 'challenges',
              type: 'array',
              fields: [{ name: 'challenge', type: 'text' }],
            },
          ],
        },
        {
          name: 'capabilities',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'regulatory',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'details',
              type: 'array',
              fields: [{ name: 'detail', type: 'text' }],
            },
          ],
        },
        {
          name: 'applications',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text' }],
            },
          ],
        },
        {
          name: 'components',
          type: 'array',
          fields: [
            { name: 'category', type: 'text' },
            { name: 'description', type: 'textarea' },
            ...flexibleImageField('image', {
              label: 'Component Image',
              description: 'Upload an image or provide a URL for this component category'
            }),
            {
              name: 'parts',
              type: 'array',
              fields: [{ name: 'part', type: 'text' }],
            },
            {
              name: 'materials',
              type: 'array',
              fields: [{ name: 'material', type: 'text' }],
            },
            {
              name: 'requirements',
              type: 'array',
              fields: [{ name: 'requirement', type: 'text' }],
            },
          ],
        },
        {
          name: 'qualityStandards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'details',
              type: 'array',
              fields: [{ name: 'detail', type: 'text' }],
            },
          ],
        },
        {
          name: 'processBenefits',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text' }],
            },
          ],
        },
        seoField,
        {
          name: 'order',
          type: 'number',
          admin: {
            position: 'sidebar',
            description: fieldDescriptions.order,
          },
        },
        ...flexibleImageField('image', {
          label: 'Industry Card Image',
          description: 'Upload an image or provide a URL for the industry card display'
        }),
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
      ],
      access: contentCollectionAccess,
    },
    {
      slug: 'team-members',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'title', 'order'],
      },
      access: contentCollectionAccess,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'order', type: 'number', required: true, defaultValue: 0 },
        { name: 'linkedin', type: 'text' },
        { name: 'email', type: 'text', validate: validateEmail },
      ],
    },
    {
      slug: 'resources',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'category', 'difficulty', 'publishDate'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: fieldDescriptions.title,
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: fieldDescriptions.slug,
          },
          validate: validateSlug,
        },
        {
          name: 'excerpt',
          type: 'textarea',
          admin: {
            description: fieldDescriptions.excerpt,
          },
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
          admin: {
            description: fieldDescriptions.content,
          },
        },
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: {
            description: fieldDescriptions.category,
          },
        },
        {
          name: 'difficulty',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
          admin: {
            description: fieldDescriptions.difficulty,
          },
        },
        {
          name: 'readTime',
          type: 'text',
          admin: {
            description: fieldDescriptions.readTime,
          },
        },
        {
          name: 'publishDate',
          type: 'date',
          admin: {
            description: fieldDescriptions.publishDate,
          },
        },
        {
          name: 'author',
          type: 'text',
          admin: {
            description: fieldDescriptions.author,
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: fieldDescriptions.featured,
          },
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
        seoField,
      ],
      access: contentCollectionAccess,
    },
  ],
  globals: [
    {
      slug: 'site-settings',
      access: globalAccess,
      fields: [
        {
          name: 'company',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', required: true, defaultValue: 'IIS - Integrated Inspection Systems' },
            { name: 'legalName', type: 'text', defaultValue: 'IIS Precision Manufacturing' },
            { name: 'tagline', type: 'text', defaultValue: 'Precision Machining & CMM Inspection Services' },
            { name: 'description', type: 'textarea', required: true },
            { name: 'foundingYear', type: 'text', defaultValue: '1993' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            { name: 'phone', type: 'text', required: true },
            { name: 'email', type: 'text', required: true, validate: validateEmail },
            { name: 'address', type: 'textarea', required: true },
            { name: 'city', type: 'text' },
            { name: 'state', type: 'text' },
            { name: 'zip', type: 'text' },
            { name: 'country', type: 'text', defaultValue: 'United States' },
          ],
        },
        {
          name: 'social',
          type: 'group',
          fields: [
            { name: 'linkedin', type: 'text' },
            { name: 'twitter', type: 'text' },
            { name: 'facebook', type: 'text' },
            { name: 'twitterHandle', type: 'text', defaultValue: '@iisprecision' },
          ],
        },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'defaultTitle', type: 'text' },
            { name: 'defaultDescription', type: 'textarea' },
            { name: 'defaultKeywords', type: 'textarea' },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
            { name: 'googleAnalyticsId', type: 'text' },
            { name: 'googleVerificationCode', type: 'text' },
          ],
        },
      ],
    },
    {
      slug: 'ui-text',
      access: globalAccess,
      fields: [
        {
          name: 'buttons',
          type: 'group',
          fields: [
            { name: 'getQuote', type: 'text', defaultValue: 'Get Quote' },
            { name: 'contactUs', type: 'text', defaultValue: 'Contact Us Today' },
            { name: 'viewServices', type: 'text', defaultValue: 'View Services' },
            { name: 'viewIndustries', type: 'text', defaultValue: 'View Industries' },
            { name: 'learnMore', type: 'text', defaultValue: 'Learn More' },
          ],
        },
        {
          name: 'sections',
          type: 'group',
          fields: [
            { name: 'ctaHeading', type: 'text', defaultValue: 'Ready to Get Started?' },
            { name: 'ctaDescription', type: 'textarea' },
            { name: 'serviceOfferings', type: 'text', defaultValue: 'Service Offerings' },
            { name: 'ourCapabilities', type: 'text', defaultValue: 'Our Capabilities' },
          ],
        },
      ],
    },
    {
      slug: 'navigation',
      access: globalAccess,
      fields: [
        {
          name: 'topBar',
          type: 'group',
          fields: [
            {
              name: 'phone',
              type: 'text',
              validate: validatePhone,
              admin: {
                description: fieldDescriptions.phone,
              },
            },
            { name: 'phoneLink', type: 'text' },
            {
              name: 'email',
              type: 'text',
              validate: validateEmail,
              admin: {
                description: fieldDescriptions.email,
              },
            },
            { name: 'emailLink', type: 'text' },
            { name: 'certifications', type: 'text' },
          ],
        },
        {
          name: 'menuItems',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            {
              name: 'children',
              type: 'array',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'href', type: 'text' },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'text', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      slug: 'homepage',
      admin: {
        livePreview: {
          url: () => {
            const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app';
            return baseURL;
          },
        },
      },
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'headline', type: 'text' },
            { name: 'subheadline', type: 'textarea' },
            {
              name: 'badges',
              type: 'array',
              fields: [{ name: 'badge', type: 'text' }],
            },
          ],
        },
        {
          name: 'heroEnhanced',
          type: 'group',
          label: 'Enhanced Hero Section',
          fields: [
            { name: 'mainTitle', type: 'text', defaultValue: 'PRECISION MANUFACTURING' },
            { name: 'subtitle', type: 'text', defaultValue: 'SERVICES' },
            { name: 'tagline', type: 'textarea' },
            {
              name: 'slides',
              type: 'array',
              fields: [
                ...flexibleImageField('image'),
                { name: 'alt', type: 'text', required: true },
              ],
            },
            {
              name: 'badges',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'number', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
        {
          name: 'servicesSection',
          type: 'group',
          label: 'Services Section',
          admin: {
            description: 'Content for the services section on the homepage',
          },
          fields: [
            { name: 'eyebrow', type: 'text', admin: { description: 'Small text above the heading (e.g., "Our Services")' } },
            { name: 'heading', type: 'text', admin: { description: 'Main section heading' } },
            { name: 'description', type: 'textarea', admin: { description: 'Section description' } },
            { name: 'subdescription', type: 'text', admin: { description: 'Additional descriptive text below the main description' } },
          ],
        },
        {
          name: 'industriesSection',
          type: 'group',
          label: 'Industries Section',
          admin: {
            description: 'Content for the industries section on the homepage',
          },
          fields: [
            { name: 'eyebrow', type: 'text', admin: { description: 'Small text above the heading (e.g., "Industries We Serve")' } },
            { name: 'heading', type: 'text', admin: { description: 'Main section heading' } },
            { name: 'description', type: 'textarea', admin: { description: 'Section description' } },
            { name: 'subdescription', type: 'text', admin: { description: 'Additional descriptive text below the main description' } },
          ],
        },
        {
          name: 'technicalSpecs',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name (e.g., "Gauge", "Zap", "Shield")' } },
            { name: 'gradient', type: 'text', admin: { description: 'Tailwind gradient classes (e.g., "from-blue-600 to-indigo-600")' } },
          ],
        },
        {
          name: 'imageShowcase',
          type: 'group',
          label: 'Image Showcase Section',
          admin: {
            description: 'Complete image showcase section with header, images, stats, and CTA',
          },
          fields: [
            {
              name: 'header',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'Small text above title (e.g., "Manufacturing Excellence")' } },
                { name: 'title', type: 'text', admin: { description: 'Main title (e.g., "Precision")' } },
                { name: 'titleHighlight', type: 'text', admin: { description: 'Highlighted part of title (e.g., "Delivered")' } },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'showcaseImages',
              type: 'array',
              fields: [
                ...flexibleImageField('image', {
                  label: 'Showcase Image',
                  description: 'Upload an image or provide a URL for the image showcase'
                }),
                { name: 'alt', type: 'text' },
                { name: 'title', type: 'text', admin: { description: 'Image overlay title' } },
                { name: 'category', type: 'text', admin: { description: 'Image category/subtitle' } },
                { name: 'href', type: 'text', admin: { description: 'Link URL when image is clicked' } },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name' } },
                { name: 'value', type: 'text', admin: { description: 'Stat value (e.g., "AS9100D", "99.9%")' } },
                { name: 'label', type: 'text', admin: { description: 'Stat label' } },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'buttons',
                  type: 'array',
                  fields: [
                    { name: 'text', type: 'text' },
                    { name: 'href', type: 'text' },
                    { name: 'variant', type: 'select', options: [
                      { label: 'Primary', value: 'primary' },
                      { label: 'Secondary', value: 'secondary' },
                    ]},
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'resourcesSection',
          type: 'group',
          label: 'Resources Section',
          admin: {
            description: 'Complete resources section with header, featured series, benefits, and CTA',
          },
          fields: [
            {
              name: 'header',
              type: 'group',
              fields: [
                { name: 'badge', type: 'text', admin: { description: 'Badge text (e.g., "Technical Resources & Knowledge Base")' } },
                { name: 'title', type: 'text', admin: { description: 'Main section title' } },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'featuredSeries',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'slug', type: 'text', required: true, admin: { description: 'URL slug for the series' } },
                { name: 'description', type: 'textarea' },
                { name: 'articleCount', type: 'number', admin: { description: 'Number of articles in the series' } },
                { name: 'readTime', type: 'text', admin: { description: 'Total reading time (e.g., "34 min")' } },
                {
                  name: 'difficulty',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                  ],
                },
                { name: 'icon', type: 'text', admin: { description: 'Emoji or icon character' } },
                { name: 'gradient', type: 'text', admin: { description: 'Tailwind gradient classes' } },
              ],
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Benefits Grid',
              fields: [
                { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name' } },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'text' },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'text' },
                {
                  name: 'buttons',
                  type: 'array',
                  fields: [
                    { name: 'text', type: 'text' },
                    { name: 'href', type: 'text' },
                    { name: 'variant', type: 'select', options: [
                      { label: 'Primary', value: 'primary' },
                      { label: 'Secondary', value: 'secondary' },
                    ]},
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'textarea' },
          ],
        },
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'footer',
      fields: [
        {
          name: 'company',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
            { name: 'foundedYear', type: 'text' },
            { name: 'certifications', type: 'text' },
          ],
        },
        {
          name: 'social',
          type: 'group',
          fields: [
            { name: 'linkedin', type: 'text' },
            { name: 'twitter', type: 'text' },
            { name: 'facebook', type: 'text' },
          ],
        },
        {
          name: 'servicesLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'resourcesLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'quickLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            {
              name: 'email',
              type: 'text',
              validate: validateEmail,
              admin: {
                description: fieldDescriptions.email,
              },
            },
            {
              name: 'phone',
              type: 'text',
              validate: validatePhone,
              admin: {
                description: fieldDescriptions.phone,
              },
            },
            { name: 'phoneLink', type: 'text' },
            { name: 'address', type: 'textarea' },
          ],
        },
        { name: 'copyright', type: 'text' },
      ],
    },
    {
      slug: 'about',
      admin: {
        livePreview: {
          url: () => {
            const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app';
            return `${baseURL}/about`;
          },
        },
      },
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            ...flexibleImageField('backgroundImage', {
              label: 'Hero Background Image',
              description: 'Upload an image or provide a URL for the about page hero background'
            }),
            { name: 'imageAlt', type: 'text' },
            { name: 'badge', type: 'text' },
            { name: 'badgeIconName', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'titleHighlight', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
                { name: 'variant', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'companyStats',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'story',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'paragraph1', type: 'textarea' },
            { name: 'paragraph2', type: 'textarea' },
            { name: 'paragraph3', type: 'textarea' },
            ...flexibleImageField('image', {
              label: 'Story Image',
              description: 'Upload an image or provide a URL for the company story section'
            }),
            { name: 'imageAlt', type: 'text' },
          ],
        },
        {
          name: 'timeline',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'text' },
            {
              name: 'milestones',
              type: 'array',
              fields: [
                { name: 'year', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'values',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'text' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'iconName', type: 'text' },
                {
                  name: 'bullets',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text' }],
                },
              ],
            },
          ],
        },
        {
          name: 'capabilities',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              fields: [{ name: 'item', type: 'text' }],
            },
          ],
        },
        {
          name: 'certifications',
          type: 'array',
          fields: [{ name: 'certification', type: 'text' }],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
                { name: 'variant', type: 'text' },
              ],
            },
          ],
        },
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'contact',
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            ...flexibleImageField('backgroundImage', {
              label: 'Hero Background Image',
              description: 'Upload an image or provide a URL for the contact page hero background'
            }),
            { name: 'imageAlt', type: 'text' },
            { name: 'badge', type: 'text' },
            { name: 'badgeIconName', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'titleHighlight', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'buttonLabel', type: 'text' },
            { name: 'buttonHref', type: 'text' },
          ],
        },
        {
          name: 'contactInfo',
          type: 'group',
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'addressLine1', type: 'text' },
            { name: 'addressLine2', type: 'text' },
            { name: 'addressLine3', type: 'text' },
            {
              name: 'phone',
              type: 'text',
              validate: validatePhone,
              admin: {
                description: fieldDescriptions.phone,
              },
            },
            { name: 'phoneLink', type: 'text' },
            {
              name: 'email',
              type: 'text',
              validate: validateEmail,
              admin: {
                description: fieldDescriptions.email,
              },
            },
            { name: 'hoursLine1', type: 'text' },
            { name: 'hoursLine2', type: 'text' },
          ],
        },
        { name: 'certifications', type: 'array', fields: [{ name: 'certification', type: 'text' }] },
        {
          name: 'bottomStats',
          type: 'array',
          fields: [
            { name: 'iconName', type: 'text' },
            { name: 'text', type: 'text' },
            { name: 'animated', type: 'checkbox', defaultValue: false },
          ],
        },
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'careers',
      fields: [
        { name: 'hero', type: 'group', fields: [
          ...flexibleImageField('backgroundImage', {
            label: 'Hero Background Image',
            description: 'Upload an image or provide a URL for the careers page hero background'
          }),
          { name: 'badge', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'whyWorkHere', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'benefits', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'values', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'opportunities', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'location', type: 'text' },
          { name: 'type', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'cta', type: 'group', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
          { name: 'primaryText', type: 'text' },
          { name: 'primaryHref', type: 'text' },
        ]},
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'terms',
      fields: [
        { name: 'header', type: 'group', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'sections', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'content', type: 'richText', editor: lexicalEditor({}) },
        ]},
        { name: 'contact', type: 'group', fields: [
          {
            name: 'email',
            type: 'text',
            validate: validateEmail,
            admin: {
              description: fieldDescriptions.email,
            },
          },
          {
            name: 'phone',
            type: 'text',
            validate: validatePhone,
            admin: {
              description: fieldDescriptions.phone,
            },
          },
        ]},
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'supplier-requirements',
      fields: [
        { name: 'hero', type: 'group', fields: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'textarea' },
        ]},
        { name: 'sections', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'content', type: 'richText', editor: lexicalEditor({}) },
        ]},
        { name: 'requirements', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'items', type: 'array', fields: [{ name: 'item', type: 'text' }] },
        ]},
        { name: 'additionalSections', type: 'array', fields: [
          { name: 'title', type: 'text' },
          { name: 'content', type: 'textarea' },
        ]},
        { name: 'footerNote', type: 'text' },
        seoField,
      ],
      access: globalAccess,
    },
    {
      slug: 'page-content',
      admin: {
        description: 'Store page-level content like capabilities, quality assurance, hero sections, etc.',
      },
      fields: [
        {
          name: 'pageName',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'Unique identifier for the page (e.g., "services", "industries", "about")',
          },
        },
        {
          name: 'capabilities',
          label: 'Capabilities/Stats',
          type: 'array',
          admin: {
            description: 'Company-wide capabilities or statistics (e.g., "150+ Materials", "24/7 Production")',
          },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'qualityAssurance',
          label: 'Quality Assurance/Certifications',
          type: 'array',
          admin: {
            description: 'Quality certifications and standards',
          },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'hero',
          type: 'group',
          admin: {
            description: 'Hero section content',
          },
          fields: [
            ...flexibleImageField('backgroundImage', {
              label: 'Hero Background Image',
              description: 'Upload an image or provide a URL for the page hero background'
            }),
            { name: 'badge', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'buttons',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'href', type: 'text' },
                { name: 'variant', type: 'select', options: [
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                ]},
              ],
            },
          ],
        },
        {
          name: 'sections',
          type: 'array',
          admin: {
            description: 'Additional page sections',
          },
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'content', type: 'richText', editor: lexicalEditor({}) },
          ],
        },
        seoField,
      ],
      access: globalAccess,
    },
  ],
  editor: lexicalEditor({}),
  email: emailAdapter,
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
    connectOptions: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
