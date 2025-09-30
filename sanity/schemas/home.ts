export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'mainTitle',
          title: 'Main Title (First Line)',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          description: 'e.g., "PRECISION"'
        },
        {
          name: 'subTitle',
          title: 'Sub Title (Second Line)',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          description: 'e.g., "MANUFACTURING"'
        },
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'e.g., "Innovative Machining Since 1995"'
        },
        {
          name: 'badges',
          title: 'Certification Badges',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., "AS9100D Certified", "ITAR Registered"'
        },
        {
          name: 'ctaPrimary',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        },
        {
          name: 'ctaSecondary',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
          ],
        },
        {
          name: 'backgroundSlides',
          title: 'Background Image Slides',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image URL', type: 'url' },
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'focal', title: 'Focal Point', type: 'string', options: { list: ['center', 'top', 'bottom'] } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'technicalSpecs',
      title: 'Technical Specifications Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'specs',
          title: 'Specifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'unit', title: 'Unit', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'services',
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
              type: 'reference',
              to: [{ type: 'service' }]
            }
          ],
        },
      ],
    },
    {
      name: 'industries',
      title: 'Industries Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'industries',
          title: 'Featured Industries',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'industry' }]
            }
          ],
        },
      ],
    },
    {
      name: 'imageShowcase',
      title: 'Image Showcase Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'images',
          title: 'Showcase Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Image URL', type: 'url' },
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'title', title: 'Image Title', type: 'string' },
                { name: 'description', title: 'Image Description', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
                { name: 'icon', title: 'Icon Name', type: 'string' },
              ],
            },
          ],
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
      title: 'hero.mainTitle',
      subtitle: 'hero.subTitle',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: `Home Page: ${title || 'Untitled'}`,
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
}