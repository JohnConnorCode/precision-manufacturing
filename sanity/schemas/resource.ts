import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Technical Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description for listings and SEO',
      validation: Rule => Rule.required().min(50).max(300),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'CMM Inspection Techniques', value: 'cmm-inspection'},
          {title: 'CNC Machining Processes', value: 'cnc-machining'},
          {title: 'First Article Inspection', value: 'first-article'},
          {title: 'GD&T & Tolerancing', value: 'gdt-tolerancing'},
          {title: 'Material Science & Properties', value: 'material-science'},
          {title: 'Quality & Compliance', value: 'quality-compliance'},
          {title: 'MetBase® Integration', value: 'metbase-integration'},
          {title: 'Industry Applications', value: 'industry-applications'},
          {title: 'Calculators & Tools', value: 'calculators-tools'},
          {title: 'Standards & Certifications', value: 'standards-certifications'},
          {title: 'Process Optimization', value: 'process-optimization'},
          {title: 'Equipment & Technology', value: 'equipment-technology'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'How-To Guide', value: 'how-to'},
          {title: 'Technical Specification', value: 'technical-spec'},
          {title: 'Best Practices', value: 'best-practices'},
          {title: 'Troubleshooting Guide', value: 'troubleshooting'},
          {title: 'Process Documentation', value: 'process-doc'},
          {title: 'Equipment Guide', value: 'equipment-guide'},
          {title: 'Standards Overview', value: 'standards-overview'},
          {title: 'Calculator/Tool', value: 'calculator'},
          {title: 'Case Study Analysis', value: 'case-analysis'},
          {title: 'Industry Report', value: 'industry-report'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'Beginner'},
          {title: 'Intermediate', value: 'Intermediate'},
          {title: 'Advanced', value: 'Advanced'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "10 min read"',
      validation: Rule => Rule.required(),
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
              'Quality Engineers',
              'Manufacturing Engineers',
              'Design Engineers',
              'Procurement Managers',
              'Project Managers',
              'Technicians',
              'C-Level Executives',
              'Regulatory Compliance',
              'Students/Researchers',
            ],
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'industries',
      title: 'Relevant Industries',
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
              'All Industries',
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author Information',
      type: 'object',
      fields: [
        { name: 'name', title: 'Author Name', type: 'string', initialValue: 'IIS Technical Team' },
        { name: 'title', title: 'Professional Title', type: 'string' },
        { name: 'bio', title: 'Author Bio', type: 'text' },
        { name: 'image', title: 'Author Image', type: 'image' },
      ],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false,
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
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What knowledge/experience is needed to understand this content',
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What readers will learn from this article',
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
          name: 'technicalSpecs',
          title: 'Technical Specifications',
          type: 'object',
          fields: [
            {
              name: 'specs',
              title: 'Specifications',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'value', type: 'string', title: 'Value'},
                    {name: 'unit', type: 'string', title: 'Unit'},
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'calloutBox',
          title: 'Callout Box',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Info', value: 'info'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Success', value: 'success'},
                  {title: 'Error', value: 'error'},
                  {title: 'Tip', value: 'tip'},
                ],
              },
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
            },
          ],
        },
        {
          name: 'codeBlock',
          title: 'Code Block',
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  {title: 'JavaScript', value: 'javascript'},
                  {title: 'TypeScript', value: 'typescript'},
                  {title: 'Python', value: 'python'},
                  {title: 'JSON', value: 'json'},
                  {title: 'Bash', value: 'bash'},
                  {title: 'Plain Text', value: 'text'},
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
            },
          ],
        },
        {
          name: 'toleranceTable',
          title: 'Tolerance Table',
          type: 'object',
          fields: [
            { name: 'title', title: 'Table Title', type: 'string' },
            { name: 'description', title: 'Table Description', type: 'text' },
            {
              name: 'headers',
              title: 'Column Headers',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'rows',
              title: 'Table Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Row Cells',
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
          name: 'processFlow',
          title: 'Process Flow Diagram',
          type: 'object',
          fields: [
            { name: 'title', title: 'Process Title', type: 'string' },
            { name: 'description', title: 'Process Description', type: 'text' },
            {
              name: 'steps',
              title: 'Process Steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'stepNumber', title: 'Step Number', type: 'number' },
                    { name: 'title', title: 'Step Title', type: 'string' },
                    { name: 'description', title: 'Step Description', type: 'text' },
                    { name: 'duration', title: 'Duration', type: 'string' },
                    { name: 'tools', title: 'Tools Required', type: 'array', of: [{ type: 'string' }] },
                    { name: 'qualityCheck', title: 'Quality Check Points', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'equipmentSpec',
          title: 'Equipment Specification',
          type: 'object',
          fields: [
            { name: 'equipmentName', title: 'Equipment Name', type: 'string' },
            { name: 'manufacturer', title: 'Manufacturer', type: 'string' },
            { name: 'model', title: 'Model', type: 'string' },
            { name: 'image', title: 'Equipment Image', type: 'image' },
            {
              name: 'specifications',
              title: 'Technical Specifications',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'parameter', title: 'Parameter', type: 'string' },
                    { name: 'value', title: 'Value', type: 'string' },
                    { name: 'unit', title: 'Unit', type: 'string' },
                    { name: 'tolerance', title: 'Tolerance', type: 'string' },
                  ],
                },
              ],
            },
            { name: 'applications', title: 'Typical Applications', type: 'text' },
            { name: 'advantages', title: 'Key Advantages', type: 'text' },
          ],
        },
        {
          name: 'materialData',
          title: 'Material Data Sheet',
          type: 'object',
          fields: [
            { name: 'materialName', title: 'Material Name', type: 'string' },
            { name: 'grade', title: 'Grade/Specification', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'properties',
              title: 'Material Properties',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'property', title: 'Property', type: 'string' },
                    { name: 'value', title: 'Value', type: 'string' },
                    { name: 'unit', title: 'Unit', type: 'string' },
                    { name: 'testMethod', title: 'Test Method', type: 'string' },
                  ],
                },
              ],
            },
            { name: 'applications', title: 'Typical Applications', type: 'text' },
            { name: 'machiningConsiderations', title: 'Machining Considerations', type: 'text' },
          ],
        },
        {
          name: 'standardReference',
          title: 'Standard Reference',
          type: 'object',
          fields: [
            { name: 'standardNumber', title: 'Standard Number', type: 'string' },
            { name: 'title', title: 'Standard Title', type: 'string' },
            { name: 'organization', title: 'Standards Organization', type: 'string' },
            { name: 'scope', title: 'Scope & Application', type: 'text' },
            { name: 'keyRequirements', title: 'Key Requirements', type: 'array', of: [{ type: 'string' }] },
            { name: 'iisCompliance', title: 'IIS Compliance Notes', type: 'text' },
          ],
        },
        {
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
            },
            {
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                ],
              },
              initialValue: 'primary',
            },
            {
              name: 'trackingEvent',
              title: 'Analytics Event',
              type: 'string',
              description: 'Event name for analytics tracking',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'object',
      fields: [
        {
          name: 'relatedArticles',
          title: 'Related Articles',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
        {
          name: 'relatedServices',
          title: 'Related Services',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'service' }] }],
        },
        {
          name: 'relatedCaseStudies',
          title: 'Related Case Studies',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
        },
        {
          name: 'relatedGlossary',
          title: 'Related Glossary Terms',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'glossary' }] }],
        },
      ],
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
          description: 'Title for search engines (50-60 characters)',
          validation: Rule => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Meta description for search engines (150-160 characters)',
          validation: Rule => Rule.max(160),
        },
        {
          name: 'focusKeywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Primary keywords this article should rank for',
        },
        {
          name: 'secondaryKeywords',
          title: 'Secondary Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Supporting keywords and long-tail variations',
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional canonical URL for SEO',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Custom image for social media sharing',
        },
        {
          name: 'structuredData',
          title: 'Structured Data',
          type: 'object',
          fields: [
            { name: 'articleType', title: 'Article Type', type: 'string', options: { list: ['TechnicalArticle', 'HowTo', 'Guide', 'Report'] } },
            { name: 'wordCount', title: 'Word Count', type: 'number' },
            { name: 'expertise', title: 'Expertise Level', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'performance',
      title: 'Content Performance',
      type: 'object',
      fields: [
        { name: 'views', title: 'Page Views', type: 'number', readOnly: true },
        { name: 'engagement', title: 'Engagement Rate', type: 'number', readOnly: true },
        { name: 'downloads', title: 'Downloads', type: 'number', readOnly: true },
        { name: 'shares', title: 'Social Shares', type: 'number', readOnly: true },
        { name: 'feedbackScore', title: 'User Feedback Score', type: 'number', readOnly: true },
      ],
      description: 'Performance metrics (managed programmatically)',
    }),
    defineField({
      name: 'contentStatus',
      title: 'Content Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
          { title: 'Under Review', value: 'review' },
          { title: 'Needs Update', value: 'update' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      contentType: 'contentType',
      authorName: 'author.name',
      featured: 'featured',
      status: 'contentStatus',
    },
    prepare(selection) {
      const {title, category, contentType, authorName, featured, status} = selection
      const statusEmoji = status === 'published' ? '✅ ' : status === 'review' ? '👁️ ' : status === 'update' ? '🔄 ' : '✏️ '
      const featuredIcon = featured ? '⭐ ' : ''

      return {
        title: `${statusEmoji}${featuredIcon}${title}`,
        subtitle: `${contentType || category} • ${authorName || 'IIS Technical Team'}`,
      }
    },
  },
})