import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'defaultSEO',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Default Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Default Description',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
        }),
      ],
    }),
  ],
});