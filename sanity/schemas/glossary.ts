import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'glossary',
  title: 'Technical Glossary',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Technical Term',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'acronym',
      title: 'Acronym/Abbreviation',
      type: 'string',
      description: 'If the term is an acronym (e.g., CMM, GD&T, FAI)',
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(50).max(500),
      description: 'Clear, concise definition (50-500 characters)',
    }),
    defineField({
      name: 'detailedExplanation',
      title: 'Detailed Explanation',
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
      ],
      description: 'Optional extended explanation with examples, images, etc.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Measurement & Metrology', value: 'measurement'},
          {title: 'CNC Machining', value: 'machining'},
          {title: 'Quality Control', value: 'quality'},
          {title: 'Materials & Properties', value: 'materials'},
          {title: 'Geometric Dimensioning & Tolerancing', value: 'gdt'},
          {title: 'Manufacturing Processes', value: 'processes'},
          {title: 'Industry Standards', value: 'standards'},
          {title: 'Certifications & Compliance', value: 'compliance'},
          {title: 'Software & Technology', value: 'technology'},
          {title: 'General Manufacturing', value: 'general'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Primary Industry Context',
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
              'All Industries',
            ],
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'difficulty',
      title: 'Complexity Level',
      type: 'string',
      options: {
        list: [
          {title: 'Basic - General Understanding', value: 'basic'},
          {title: 'Intermediate - Industry Knowledge', value: 'intermediate'},
          {title: 'Advanced - Technical Expertise', value: 'advanced'},
          {title: 'Expert - Specialist Knowledge', value: 'expert'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'alternativeTerms',
      title: 'Alternative Terms/Synonyms',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Other terms that mean the same thing',
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'glossary'}],
        },
      ],
      description: 'Link to other glossary terms',
    }),
    defineField({
      name: 'standards',
      title: 'Related Standards',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Industry standards that reference this term (e.g., AS9100, ISO 9001)',
    }),
    defineField({
      name: 'examples',
      title: 'Real-World Examples',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'context', type: 'string', title: 'Context/Situation'},
            {name: 'example', type: 'text', title: 'Example Description'},
            {name: 'image', type: 'image', title: 'Example Image'},
          ],
        },
      ],
    }),
    defineField({
      name: 'formula',
      title: 'Mathematical Formula',
      type: 'object',
      fields: [
        {
          name: 'formula',
          title: 'Formula',
          type: 'string',
          description: 'Mathematical formula (use LaTeX notation)',
        },
        {
          name: 'variables',
          title: 'Variable Definitions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'variable', type: 'string', title: 'Variable'},
                {name: 'definition', type: 'string', title: 'Definition'},
                {name: 'unit', type: 'string', title: 'Unit'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'commonMistakes',
      title: 'Common Mistakes/Misconceptions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Common errors or misunderstandings about this term',
    }),
    defineField({
      name: 'searchFrequency',
      title: 'Search Frequency',
      type: 'string',
      options: {
        list: [
          {title: 'Very High - Daily searches', value: 'very-high'},
          {title: 'High - Weekly searches', value: 'high'},
          {title: 'Medium - Monthly searches', value: 'medium'},
          {title: 'Low - Occasional searches', value: 'low'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'reviewDate',
      title: 'Next Review Date',
      type: 'date',
      description: 'When this definition should be reviewed for accuracy',
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
        {
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Alphabetical',
      name: 'alphabetical',
      by: [
        {field: 'term', direction: 'asc'},
      ],
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'term', direction: 'asc'},
      ],
    },
    {
      title: 'Search Frequency',
      name: 'frequency',
      by: [
        {field: 'searchFrequency', direction: 'desc'},
        {field: 'term', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'term',
      acronym: 'acronym',
      category: 'category',
      frequency: 'searchFrequency',
    },
    prepare(selection) {
      const {title, acronym, category, frequency} = selection
      const frequencyEmoji = frequency === 'very-high' ? '🔥 ' : frequency === 'high' ? '📈 ' : frequency === 'medium' ? '📊 ' : '📉 '
      const displayTitle = acronym ? `${title} (${acronym})` : title

      return {
        title: `${frequencyEmoji}${displayTitle}`,
        subtitle: `${category} • ${frequency} frequency`,
      }
    },
  },
})