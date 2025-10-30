import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
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
  }),
})
