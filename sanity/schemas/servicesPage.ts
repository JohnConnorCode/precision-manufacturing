export default {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'badgeText', title: 'Badge Text', type: 'string' },
        { name: 'backgroundImage', title: 'Background Image URL', type: 'url' },
        { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
        {
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
                { name: 'variant', title: 'Style', type: 'string', options: { list: ['primary', 'secondary'] } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'capabilities',
      title: 'Capabilities Overview',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'services',
          title: 'Featured Services',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Service Title', type: 'string' },
                { name: 'description', title: 'Service Description', type: 'text' },
                { name: 'icon', title: 'Icon Name', type: 'string' },
                { name: 'href', title: 'Link to Service Page', type: 'string' },
                { name: 'image', title: 'Service Image URL', type: 'url' },
                {
                  name: 'features',
                  title: 'Key Features',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'qualityAssurance',
      title: 'Quality Assurance Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        { name: 'image', title: 'Quality Image URL', type: 'url' },
        { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
        {
          name: 'qualityPoints',
          title: 'Quality Points',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        {
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Text', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
                { name: 'variant', title: 'Style', type: 'string', options: { list: ['primary', 'secondary'] } },
              ],
            },
          ],
        },
      ],
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
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: `Services: ${title || 'Untitled'}`,
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
}