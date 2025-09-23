export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
    },
    {
      name: 'founded',
      title: 'Year Founded',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            { name: 'street', title: 'Street', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'state', title: 'State', type: 'string' },
            { name: 'zip', title: 'ZIP Code', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' },
          ],
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'object',
          fields: [
            { name: 'weekdays', title: 'Weekdays', type: 'string' },
            { name: 'saturday', title: 'Saturday', type: 'string' },
            { name: 'sunday', title: 'Sunday', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    },
    {
      name: 'navigation',
      title: 'Main Navigation',
      type: 'object',
      fields: [
        {
          name: 'mainMenu',
          title: 'Main Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link', type: 'string' },
                {
                  name: 'submenu',
                  title: 'Submenu Items',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'href', title: 'Link', type: 'string' },
                        { name: 'description', title: 'Description', type: 'string' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'ctaButton',
          title: 'Header CTA Button',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'href', title: 'Button Link', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
        },
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Column Title', type: 'string' },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'href', title: 'Link', type: 'string' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'certifications',
          title: 'Certification Badges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Certification Name', type: 'string' },
                { name: 'logo', title: 'Badge Image', type: 'image' },
              ],
            },
          ],
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        { name: 'defaultTitle', title: 'Default Meta Title', type: 'string' },
        { name: 'titleTemplate', title: 'Title Template', type: 'string' },
        { name: 'defaultDescription', title: 'Default Meta Description', type: 'text' },
        { name: 'siteUrl', title: 'Site URL', type: 'url' },
        { name: 'defaultOgImage', title: 'Default OG Image', type: 'image' },
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        },
      ],
    },
  ],
}