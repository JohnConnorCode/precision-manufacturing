import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Executive Summary',
      type: 'text',
      rows: 4,
      description: 'Brief overview for listings and SEO (100-200 characters)',
      validation: Rule => Rule.required().min(100).max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: Rule => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          description: 'Use generic name if confidential (e.g., "Major Aerospace OEM")',
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string',
          options: {
            list: [
              {title: 'Aerospace', value: 'aerospace'},
              {title: 'Defense', value: 'defense'},
              {title: 'Medical Device', value: 'medical'},
              {title: 'Energy', value: 'energy'},
              {title: 'Manufacturing', value: 'manufacturing'},
              {title: 'Government', value: 'government'},
            ],
          },
        },
        {
          name: 'logo',
          title: 'Client Logo',
          type: 'image',
          description: 'Optional - only if permission granted',
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge & Requirements',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Challenge Overview',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required(),
        },
        {
          name: 'technicalRequirements',
          title: 'Technical Requirements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'requirement', type: 'string', title: 'Requirement'},
                {name: 'specification', type: 'string', title: 'Specification'},
              ],
            },
          ],
        },
        {
          name: 'constraints',
          title: 'Constraints & Challenges',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'IIS Solution',
      type: 'object',
      fields: [
        {
          name: 'approach',
          title: 'Solution Approach',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required(),
        },
        {
          name: 'servicesUsed',
          title: 'Services Utilized',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  'CMM Inspection',
                  'First Article Inspection',
                  'Precision Machining',
                  'Engineering Services',
                  'Metrology Services',
                  'Fixture Design',
                  'MetBase® Integration',
                  'Process Development',
                  'Statistical Analysis',
                ],
              },
            },
          ],
        },
        {
          name: 'equipmentUsed',
          title: 'Equipment & Technology',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'processFlow',
          title: 'Process Flow',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'step', type: 'number', title: 'Step Number'},
                {name: 'description', type: 'string', title: 'Description'},
                {name: 'duration', type: 'string', title: 'Duration'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results & Metrics',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Results Overview',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required(),
        },
        {
          name: 'metrics',
          title: 'Key Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'metric', type: 'string', title: 'Metric Name'},
                {name: 'before', type: 'string', title: 'Before'},
                {name: 'after', type: 'string', title: 'After'},
                {name: 'improvement', type: 'string', title: 'Improvement %'},
              ],
            },
          ],
        },
        {
          name: 'timeline',
          title: 'Project Timeline',
          type: 'object',
          fields: [
            {name: 'duration', type: 'string', title: 'Total Duration'},
            {name: 'deliveryTime', type: 'string', title: 'Delivery vs Schedule'},
          ],
        },
        {
          name: 'qualityMetrics',
          title: 'Quality Achievements',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 3,
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Author Title',
          type: 'string',
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      industry: 'client.industry',
      featured: 'featured',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, industry, featured} = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: industry ? `${industry} • Case Study` : 'Case Study',
        media: selection.media,
      }
    },
  },
})