import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ - Frequently Asked Questions',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
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
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'FAQ Category',
      type: 'string',
      options: {
        list: [
          {title: 'General Services', value: 'general'},
          {title: 'CMM Inspection', value: 'cmm-inspection'},
          {title: 'CNC Machining', value: 'cnc-machining'},
          {title: 'First Article Inspection', value: 'first-article'},
          {title: 'Quality & Compliance', value: 'quality-compliance'},
          {title: 'Materials & Specifications', value: 'materials'},
          {title: 'Pricing & Timeline', value: 'pricing-timeline'},
          {title: 'Capabilities', value: 'capabilities'},
          {title: 'Certifications', value: 'certifications'},
          {title: 'MetBase Software', value: 'metbase'},
          {title: 'Industries Served', value: 'industries'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          {title: 'High - Most Asked', value: 'high'},
          {title: 'Medium - Common', value: 'medium'},
          {title: 'Low - Occasional', value: 'low'},
        ],
      },
      validation: Rule => Rule.required(),
      initialValue: 'medium',
    }),
    defineField({
      name: 'searchKeywords',
      title: 'Search Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords people might search for to find this FAQ',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
    }),
    defineField({
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'resource'},
            {type: 'whitePaper'},
            {type: 'caseStudy'},
          ],
        },
      ],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              'Procurement Managers',
              'Quality Engineers',
              'Design Engineers',
              'Manufacturing Engineers',
              'Project Managers',
              'C-Level Executives',
              'Regulatory Compliance',
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'publishStatus',
      title: 'Publish Status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'published'},
          {title: 'Draft', value: 'draft'},
          {title: 'Under Review', value: 'review'},
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Votes',
      type: 'number',
      initialValue: 0,
      description: 'Track user feedback (managed programmatically)',
      readOnly: true,
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
          rows: 2,
          validation: Rule => Rule.max(160),
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'desc'},
        {field: 'question', direction: 'asc'},
      ],
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'priority', direction: 'desc'},
      ],
    },
    {
      title: 'Most Helpful',
      name: 'helpful',
      by: [
        {field: 'helpfulCount', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      priority: 'priority',
      status: 'publishStatus',
    },
    prepare(selection) {
      const {title, category, priority, status} = selection
      const priorityEmoji = priority === 'high' ? '🔥 ' : priority === 'medium' ? '📌 ' : '📝 '
      const statusEmoji = status === 'published' ? '✅ ' : status === 'review' ? '👁️ ' : '✏️ '

      return {
        title: `${priorityEmoji}${statusEmoji}${title}`,
        subtitle: `${category} • ${priority} priority`,
      }
    },
  },
})