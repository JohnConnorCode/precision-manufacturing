import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whitePaper',
  title: 'White Papers & Technical Documents',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'White Paper Title',
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
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 5,
      description: 'Executive summary of the white paper (200-300 characters)',
      validation: Rule => Rule.required().min(200).max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'category',
      title: 'Document Category',
      type: 'string',
      options: {
        list: [
          {title: 'Technical Research', value: 'research'},
          {title: 'Industry Analysis', value: 'analysis'},
          {title: 'Process Innovation', value: 'innovation'},
          {title: 'Compliance Guide', value: 'compliance'},
          {title: 'Technology Review', value: 'technology'},
          {title: 'Best Practices', value: 'best-practices'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'industries',
      title: 'Target Industries',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              'Aerospace',
              'Defense',
              'Medical Device',
              'Energy',
              'Manufacturing',
              'Government',
            ],
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'difficulty',
      title: 'Technical Level',
      type: 'string',
      options: {
        list: [
          {title: 'Executive Overview', value: 'executive'},
          {title: 'Technical Manager', value: 'manager'},
          {title: 'Engineering Professional', value: 'engineer'},
          {title: 'Specialist/Expert', value: 'expert'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g., "15 min read"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Author Name'},
            {name: 'title', type: 'string', title: 'Professional Title'},
            {name: 'company', type: 'string', title: 'Company'},
            {name: 'bio', type: 'text', title: 'Brief Bio'},
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publication Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
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
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: Rule => Rule.required(),
            },
          ],
        },
        {
          name: 'dataTable',
          title: 'Data Table',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Table Title',
              type: 'string',
            },
            {
              name: 'headers',
              title: 'Column Headers',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'rows',
              title: 'Table Rows',
              type: 'array',
              of: [
                {
                  type: 'array',
                  of: [{type: 'string'}],
                },
              ],
            },
          ],
        },
        {
          name: 'chart',
          title: 'Chart/Graph',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Chart Type',
              type: 'string',
              options: {
                list: ['bar', 'line', 'pie', 'scatter'],
              },
            },
            {
              name: 'title',
              title: 'Chart Title',
              type: 'string',
            },
            {
              name: 'data',
              title: 'Chart Data (JSON)',
              type: 'text',
              description: 'Chart data in JSON format',
            },
          ],
        },
        {
          name: 'keyTakeaway',
          title: 'Key Takeaway Box',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Takeaway Title',
              type: 'string',
            },
            {
              name: 'points',
              title: 'Key Points',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'downloadable',
      title: 'Downloadable Resources',
      type: 'object',
      fields: [
        {
          name: 'pdfFile',
          title: 'PDF Version',
          type: 'file',
          options: {
            accept: '.pdf',
          },
        },
        {
          name: 'supplementaryFiles',
          title: 'Supplementary Files',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', type: 'string', title: 'File Title'},
                {name: 'file', type: 'file', title: 'File'},
                {name: 'description', type: 'string', title: 'Description'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'leadMagnet',
      title: 'Lead Generation Settings',
      type: 'object',
      fields: [
        {
          name: 'requiresEmail',
          title: 'Require Email for Download',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'gatingType',
          title: 'Content Gating',
          type: 'string',
          options: {
            list: [
              {title: 'Free Access', value: 'free'},
              {title: 'Email Required', value: 'email'},
              {title: 'Contact Form Required', value: 'contact'},
            ],
          },
          initialValue: 'free',
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
      title: 'Featured White Paper',
      type: 'boolean',
      initialValue: false,
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
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      media: 'coverImage',
    },
    prepare(selection) {
      const {title, category, featured} = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category ? `${category} • White Paper` : 'White Paper',
        media: selection.media,
      }
    },
  },
})