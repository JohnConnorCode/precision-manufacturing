import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Precision Manufacturing',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
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
      slug: 'services',
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
          unique: true,
          admin: {
            description: 'URL slug for this service (e.g., "5-axis-machining")',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hero',
          type: 'group',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'badge',
              type: 'text',
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'overview',
          type: 'group',
          fields: [
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                {
                  name: 'highlight',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          name: 'capabilities',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'technicalSpecs',
          type: 'group',
          fields: [
            {
              name: 'tolerances',
              type: 'group',
              fields: [
                { name: 'dimensional', type: 'text' },
                { name: 'geometric', type: 'text' },
                { name: 'repeatability', type: 'text' },
              ],
            },
            {
              name: 'materials',
              type: 'array',
              fields: [
                { name: 'material', type: 'text' },
                { name: 'grade', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'process',
          type: 'array',
          fields: [
            { name: 'step', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'qualityCheck', type: 'text' },
          ],
        },
        {
          name: 'equipment',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'manufacturer', type: 'text' },
            { name: 'model', type: 'text' },
            { name: 'specs', type: 'textarea' },
          ],
        },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'body',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'industries',
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
          unique: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hero',
          type: 'group',
          fields: [
            { name: 'subtitle', type: 'text' },
            { name: 'badge', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
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
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'technicalDetails',
              type: 'array',
              fields: [{ name: 'detail', type: 'text' }],
            },
          ],
        },
        {
          name: 'regulatory',
          type: 'group',
          fields: [
            {
              name: 'certifications',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'scope', type: 'text' },
              ],
            },
            {
              name: 'standards',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'applications',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            {
              name: 'requirements',
              type: 'array',
              fields: [{ name: 'requirement', type: 'text' }],
            },
          ],
        },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'body',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'description', type: 'textarea' },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: 'public/uploads',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/precision-manufacturing',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
