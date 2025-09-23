export default {
  name: 'service',
  title: 'Service Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        { name: 'icon', title: 'Icon Name', type: 'string' },
        { name: 'badge', title: 'Badge Text', type: 'string' },
      ],
    },
    {
      name: 'overview',
      title: 'Service Overview',
      type: 'object',
      fields: [
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'highlights',
          title: 'Key Highlights',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'capabilities',
      title: 'Capabilities',
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
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'image', title: 'Feature Image', type: 'image' },
            {
              name: 'details',
              title: 'Feature Details',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    {
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'equipment',
      title: 'Equipment List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Equipment Name', type: 'string' },
            { name: 'specs', title: 'Specifications', type: 'text' },
            { name: 'image', title: 'Equipment Image', type: 'image' },
          ],
        },
      ],
    },
    {
      name: 'industries',
      title: 'Industries Served',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
    },
    {
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Case Study Title', type: 'string' },
            { name: 'client', title: 'Client Name', type: 'string' },
            { name: 'challenge', title: 'Challenge', type: 'text' },
            { name: 'solution', title: 'Solution', type: 'text' },
            { name: 'results', title: 'Results', type: 'text' },
            { name: 'image', title: 'Case Study Image', type: 'image' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'subtitle', title: 'CTA Subtitle', type: 'text' },
        {
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Button Text', type: 'string' },
                { name: 'href', title: 'Button Link', type: 'string' },
                { name: 'variant', title: 'Button Style', type: 'string' },
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
      ],
    },
  ],
}