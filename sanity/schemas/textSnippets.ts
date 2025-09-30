import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textSnippets',
  title: 'Text Snippets & Global Content',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Content Category',
      type: 'string',
      options: {
        list: [
          {title: 'Navigation & Menus', value: 'navigation'},
          {title: 'Buttons & CTAs', value: 'buttons'},
          {title: 'Form Labels & Messages', value: 'forms'},
          {title: 'Error & Success Messages', value: 'messages'},
          {title: 'Footer Content', value: 'footer'},
          {title: 'Header Content', value: 'header'},
          {title: 'Loading & Status Text', value: 'status'},
          {title: 'Modal & Popup Content', value: 'modals'},
          {title: 'Tooltips & Help Text', value: 'help'},
          {title: 'Legal & Compliance', value: 'legal'},
          {title: 'Marketing Copy', value: 'marketing'},
          {title: 'Technical Terms', value: 'technical'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'snippetKey',
      title: 'Snippet Key/ID',
      type: 'string',
      description: 'Unique identifier for developers (e.g., "header.cta.button", "form.contact.submit")',
      validation: Rule => Rule.required().regex(/^[a-z0-9]+(\.[a-z0-9]+)*$/, {
        name: 'snippet key',
        invert: false,
      }),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Human-readable name for content editors',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text Content',
          type: 'string',
          description: 'Main text content',
        },
        {
          name: 'richText',
          title: 'Rich Text Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
              ],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Numbered', value: 'number'},
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
          ],
          description: 'Use this for content that needs formatting',
        },
        {
          name: 'altText',
          title: 'Alternative Text',
          type: 'string',
          description: 'Alternative text for accessibility or fallbacks',
        },
        {
          name: 'href',
          title: 'Link URL',
          type: 'url',
          description: 'If this content is a link',
        },
        {
          name: 'target',
          title: 'Link Target',
          type: 'string',
          options: {
            list: [
              {title: 'Same window', value: '_self'},
              {title: 'New window', value: '_blank'},
            ],
          },
          hidden: ({parent}: {parent: any}) => !parent?.href,
        },
      ],
    }),
    defineField({
      name: 'context',
      title: 'Usage Context',
      type: 'text',
      rows: 2,
      description: 'Where and how this content is used on the site',
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'object',
      fields: [
        {
          name: 'spanish',
          title: 'Spanish',
          type: 'string',
        },
        {
          name: 'french',
          title: 'French',
          type: 'string',
        },
        // Add more languages as needed
      ],
      description: 'Future-proofing for internationalization',
    }),
    defineField({
      name: 'variants',
      title: 'Content Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Variant Name',
              type: 'string',
              description: 'e.g., "Mobile", "Desktop", "Tablet"',
            },
            {
              name: 'content',
              title: 'Variant Content',
              type: 'string',
            },
            {
              name: 'condition',
              title: 'When to Use',
              type: 'string',
              description: 'Condition for using this variant',
            },
          ],
        },
      ],
      description: 'Different versions for different contexts/devices',
    }),
    defineField({
      name: 'seoRelevant',
      title: 'SEO Relevant',
      type: 'boolean',
      description: 'Is this content important for SEO?',
      initialValue: false,
    }),
    defineField({
      name: 'characterLimit',
      title: 'Character Limit',
      type: 'number',
      description: 'Maximum characters allowed (for validation)',
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Plain Text', value: 'text'},
          {title: 'Rich Text/HTML', value: 'rich'},
          {title: 'Button Text', value: 'button'},
          {title: 'Link Text', value: 'link'},
          {title: 'Label', value: 'label'},
          {title: 'Placeholder', value: 'placeholder'},
          {title: 'Error Message', value: 'error'},
          {title: 'Success Message', value: 'success'},
          {title: 'Warning Message', value: 'warning'},
          {title: 'Tooltip', value: 'tooltip'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedBy',
      title: 'Updated By',
      type: 'string',
      description: 'Who last updated this content',
    }),
    defineField({
      name: 'approvalRequired',
      title: 'Requires Approval',
      type: 'boolean',
      description: 'Does this content need approval before publishing?',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Content Status',
      type: 'string',
      options: {
        list: [
          {title: 'Live', value: 'live'},
          {title: 'Draft', value: 'draft'},
          {title: 'Pending Review', value: 'review'},
          {title: 'Approved', value: 'approved'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
      description: 'Notes for content editors/developers',
    }),
  ],
  orderings: [
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'snippetKey', direction: 'asc'},
      ],
    },
    {
      title: 'Snippet Key',
      name: 'key',
      by: [
        {field: 'snippetKey', direction: 'asc'},
      ],
    },
    {
      title: 'Last Updated',
      name: 'updated',
      by: [
        {field: 'lastUpdated', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      key: 'snippetKey',
      name: 'displayName',
      category: 'category',
      status: 'status',
      content: 'content.text',
    },
    prepare(selection) {
      const {key, name, category, status, content} = selection
      const statusEmoji = status === 'live' ? '🟢 ' : status === 'approved' ? '✅ ' : status === 'review' ? '👁️ ' : status === 'draft' ? '✏️ ' : '📦 '

      return {
        title: `${statusEmoji}${name}`,
        subtitle: `${key} • ${category}`,
        description: content ? content.substring(0, 60) + '...' : '',
      }
    },
  },
})