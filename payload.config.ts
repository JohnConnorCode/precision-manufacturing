import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://precision-manufacturing.vercel.app',
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'light',
    css: path.resolve(dirname, 'admin-custom.css'),
    livePreview: {
      url: ({ data, documentSlug, locale }) => {
        // Generate preview URL based on collection/global
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
      auth: true,
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
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
      access: {
        read: () => true,
      },
    },
    {
      slug: 'services',
      admin: {
        useAsTitle: 'title',
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
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'shortDescription',
          type: 'textarea',
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        // Detailed page content structure
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'backgroundImage', type: 'text' },
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
            { name: 'image', type: 'text' },
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
        {
          name: 'seo',
          type: 'group',
          admin: { position: 'sidebar' },
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'image',
          type: 'text',
        },
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
      access: {
        read: () => true,
      },
    },
    {
      slug: 'industries',
      admin: {
        useAsTitle: 'title',
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
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'shortDescription',
          type: 'textarea',
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'backgroundImage', type: 'text' },
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
            { name: 'image', type: 'text' },
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
        {
          name: 'seo',
          type: 'group',
          admin: { position: 'sidebar' },
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'image',
          type: 'text',
        },
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
      access: {
        read: () => true,
      },
    },
    {
      slug: 'resources',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'textarea',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'difficulty',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
        {
          name: 'readTime',
          type: 'text',
        },
        {
          name: 'publishDate',
          type: 'date',
        },
        {
          name: 'author',
          type: 'text',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
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
      ],
    },
  ],
  globals: [
    {
      slug: 'navigation',
      fields: [
        {
          name: 'topBar',
          type: 'group',
          fields: [
            { name: 'phone', type: 'text' },
            { name: 'phoneLink', type: 'text' },
            { name: 'email', type: 'text' },
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
              fields: [{ name: 'text', type: 'text' }],
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
          name: 'technicalSpecs',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'imageShowcase',
          type: 'array',
          fields: [
            { name: 'image', type: 'text' },
            { name: 'alt', type: 'text' },
          ],
        },
        {
          name: 'resources',
          type: 'array',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'href', type: 'text' },
            { name: 'description', type: 'text' },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'primaryText', type: 'text' },
            { name: 'primaryHref', type: 'text' },
            { name: 'secondaryText', type: 'text' },
            { name: 'secondaryHref', type: 'text' },
          ],
        },
      ],
      access: {
        read: () => true,
      },
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
            { name: 'email', type: 'text' },
            { name: 'phone', type: 'text' },
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
            { name: 'backgroundImage', type: 'text' },
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
            { name: 'image', type: 'text' },
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
            { name: 'primaryText', type: 'text' },
            { name: 'primaryHref', type: 'text' },
            { name: 'secondaryText', type: 'text' },
            { name: 'secondaryHref', type: 'text' },
          ],
        },
      ],
    },
    {
      slug: 'contact',
      fields: [
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'backgroundImage', type: 'text' },
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
            { name: 'phone', type: 'text' },
            { name: 'phoneLink', type: 'text' },
            { name: 'email', type: 'text' },
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
      ],
    },
    {
      slug: 'careers',
      fields: [
        { name: 'hero', type: 'group', fields: [
          { name: 'backgroundImage', type: 'text' },
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
      ],
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
          { name: 'email', type: 'text' },
          { name: 'phone', type: 'text' },
        ]},
      ],
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
      ],
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
            { name: 'backgroundImage', type: 'text' },
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
      ],
    },
  ],
  editor: lexicalEditor({}),
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
})
