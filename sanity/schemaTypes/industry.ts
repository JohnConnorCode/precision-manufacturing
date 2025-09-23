import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'Industry Problem',
      type: 'text',
      description: 'What challenges does this industry face?',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      description: 'How we solve these challenges',
    }),
    defineField({
      name: 'tolerances',
      title: 'Tolerances',
      type: 'object',
      fields: [
        defineField({
          name: 'standard',
          title: 'Standard Tolerance',
          type: 'string',
        }),
        defineField({
          name: 'precision',
          title: 'Precision Tolerance',
          type: 'string',
        }),
        defineField({
          name: 'ultra',
          title: 'Ultra-Precision Tolerance',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Required Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'challenge',
              title: 'Challenge',
              type: 'text',
            }),
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'text',
            }),
            defineField({
              name: 'result',
              title: 'Result',
              type: 'text',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
        }),
      ],
    }),
  ],
});