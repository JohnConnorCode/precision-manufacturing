export default {
  name: 'industry',
  title: 'Industry Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Industry Name',
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
      title: 'Industry Overview',
      type: 'text',
    },
    {
      name: 'capabilities',
      title: 'Industry Capabilities',
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
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Application Category', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Application Image', type: 'image' },
            {
              name: 'parts',
              title: 'Parts/Components',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      title: 'Industry Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'standards',
      title: 'Industry Standards',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'qualitySystems',
          title: 'Quality Systems',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'materials',
          title: 'Material Expertise',
          type: 'array',
          of: [{ type: 'string' }],
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
            { name: 'client', title: 'Client', type: 'string' },
            { name: 'challenge', title: 'Challenge', type: 'text' },
            { name: 'solution', title: 'Solution', type: 'text' },
            { name: 'results', title: 'Results', type: 'text' },
            { name: 'image', title: 'Case Study Image', type: 'image' },
            {
              name: 'metrics',
              title: 'Success Metrics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'metric', title: 'Metric', type: 'string' },
                    { name: 'value', title: 'Value', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'partners',
      title: 'Industry Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Partner Name', type: 'string' },
            { name: 'logo', title: 'Partner Logo', type: 'image' },
            { name: 'description', title: 'Partnership Details', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'equipment',
      title: 'Specialized Equipment',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Equipment Name', type: 'string' },
            { name: 'capability', title: 'Capability', type: 'text' },
            { name: 'specs', title: 'Specifications', type: 'text' },
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