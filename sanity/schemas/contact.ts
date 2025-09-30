export default {
  name: 'contact',
  title: 'Contact Page',
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
      ],
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'offices',
          title: 'Office Locations',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Office Title', type: 'string' },
                { name: 'address', title: 'Address', type: 'text' },
                { name: 'phone', title: 'Phone', type: 'string' },
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'hours', title: 'Business Hours', type: 'text' },
                { name: 'isPrimary', title: 'Primary Office', type: 'boolean' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contactForm',
      title: 'Contact Form Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Form Title', type: 'string' },
        { name: 'subtitle', title: 'Form Subtitle', type: 'text' },
        { name: 'successMessage', title: 'Success Message', type: 'text' },
        { name: 'errorMessage', title: 'Error Message', type: 'text' },
        {
          name: 'fields',
          title: 'Form Fields Configuration',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Field Name', type: 'string' },
                { name: 'label', title: 'Field Label', type: 'string' },
                { name: 'type', title: 'Field Type', type: 'string', options: { list: ['text', 'email', 'tel', 'textarea', 'select'] } },
                { name: 'required', title: 'Required', type: 'boolean' },
                { name: 'placeholder', title: 'Placeholder', type: 'string' },
                {
                  name: 'options',
                  title: 'Select Options',
                  type: 'array',
                  of: [{ type: 'string' }],
                  hidden: ({ parent }: { parent: any }) => parent?.type !== 'select',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'capabilities',
      title: 'Capabilities Overview',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'capabilities',
          title: 'Capability Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Capability Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'icon', title: 'Icon Name', type: 'string' },
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
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'testimonials',
          title: 'Customer Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'quote', title: 'Quote', type: 'text' },
                { name: 'author', title: 'Author Name', type: 'string' },
                { name: 'company', title: 'Company', type: 'string' },
                { name: 'title', title: 'Author Title', type: 'string' },
                { name: 'image', title: 'Author Image', type: 'image' },
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
        title: `Contact: ${title || 'Untitled'}`,
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
}