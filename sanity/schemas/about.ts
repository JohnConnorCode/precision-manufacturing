export default {
  name: 'about',
  title: 'About Page',
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
      name: 'companyStats',
      title: 'Company Statistics',
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
      name: 'companyStory',
      title: 'Company Story Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'content', title: 'Story Content', type: 'array', of: [{ type: 'block' }] },
        { name: 'image', title: 'Story Image URL', type: 'url' },
        { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
      ],
    },
    {
      name: 'timeline',
      title: 'Company Timeline',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'timelineItems',
          title: 'Timeline Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'year', title: 'Year', type: 'string' },
                { name: 'title', title: 'Event Title', type: 'string' },
                { name: 'description', title: 'Event Description', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      title: 'Company Values Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'values',
          title: 'Company Values',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Value Title', type: 'string' },
                { name: 'description', title: 'Value Description', type: 'text' },
                { name: 'icon', title: 'Icon Name', type: 'string' },
                {
                  name: 'principles',
                  title: 'Key Principles',
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
      name: 'leadership',
      title: 'Leadership Team Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'leaders',
          title: 'Leadership Team',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'title', title: 'Job Title', type: 'string' },
                { name: 'experience', title: 'Years of Experience', type: 'string' },
                { name: 'background', title: 'Background', type: 'text' },
                { name: 'focus', title: 'Focus Area', type: 'string' },
                { name: 'image', title: 'Profile Image', type: 'image' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'capabilities',
      title: 'Core Capabilities Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        {
          name: 'capabilityGroups',
          title: 'Capability Groups',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'category', title: 'Category', type: 'string' },
                {
                  name: 'items',
                  title: 'Capability Items',
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
      name: 'certifications',
      title: 'Certifications Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text' },
        {
          name: 'certifications',
          title: 'Certifications List',
          type: 'array',
          of: [{ type: 'string' }],
        },
        { name: 'commitmentTitle', title: 'Commitment Title', type: 'string' },
        { name: 'commitmentText', title: 'Commitment Text', type: 'text' },
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
        title: `About: ${title || 'Untitled'}`,
        subtitle: subtitle || 'No subtitle',
      }
    },
  },
}