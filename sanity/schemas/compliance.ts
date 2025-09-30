export default {
  name: 'compliance',
  title: 'Compliance Page',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'badgeText', title: 'Badge Text', type: 'string' },
        { name: 'backgroundImage', title: 'Background Image URL', type: 'url' },
        { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
      ],
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
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
        {
          type: 'object',
          name: 'calloutBox',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Error', value: 'error' },
                  { title: 'Tip', value: 'tip' },
                ],
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'version',
      title: 'Document Version',
      type: 'string',
      description: 'e.g., "v1.2", "Rev C"',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Supplier Requirements', value: 'supplier' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Quality Standards', value: 'quality' },
          { title: 'Compliance', value: 'compliance' },
        ],
      },
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      version: 'version',
    },
    prepare(selection: any) {
      const { title, category, version } = selection
      return {
        title: title || 'Untitled',
        subtitle: `${category || 'Unknown'} ${version ? `(${version})` : ''}`,
      }
    },
  },
}