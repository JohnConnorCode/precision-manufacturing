import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'CMM Inspection Services', value: 'cmm-inspection'},
          {title: 'CNC Machining', value: 'cnc-machining'},
          {title: 'First Article Inspection', value: 'first-article'},
          {title: 'Engineering Services', value: 'engineering'},
          {title: 'Metrology Services', value: 'metrology'},
          {title: 'Database Services', value: 'database'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Hero Title', type: 'string' },
        { name: 'subtitle', title: 'Hero Subtitle', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        { name: 'icon', title: 'Icon Name', type: 'string' },
        { name: 'badge', title: 'Badge Text', type: 'string' },
        {
          name: 'certifications',
          title: 'Certifications to Display',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: ['AS9100', 'ISO 9001', 'ITAR', 'DFARS', 'EAR']
              }
            }
          ]
        },
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Service Overview',
      type: 'object',
      fields: [
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'highlights',
          title: 'Key Highlights',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'valueProposition',
          title: 'Value Proposition',
          type: 'text',
          rows: 3,
          description: 'What makes this service unique at IIS',
        },
        {
          name: 'keyBenefits',
          title: 'Key Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'benefit', title: 'Benefit', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'icon', title: 'Icon', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        {
          name: 'tolerances',
          title: 'Achievable Tolerances',
          type: 'object',
          fields: [
            { name: 'dimensional', title: 'Dimensional Tolerance', type: 'string', description: 'e.g., ±0.0001" (±0.0025mm)' },
            { name: 'geometric', title: 'Geometric Tolerance', type: 'string', description: 'e.g., 0.0002" (0.005mm)' },
            { name: 'surface', title: 'Surface Finish', type: 'string', description: 'e.g., Ra 8-125 µin' },
            { name: 'repeatability', title: 'Measurement Repeatability', type: 'string', description: 'e.g., ±0.000050" (±0.00127mm)' },
          ],
        },
        {
          name: 'materials',
          title: 'Supported Materials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'material', title: 'Material Type', type: 'string' },
                { name: 'grade', title: 'Grade/Specification', type: 'string' },
                { name: 'properties', title: 'Key Properties', type: 'text' },
                { name: 'applications', title: 'Typical Applications', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'sizeRange',
          title: 'Size Range Capabilities',
          type: 'object',
          fields: [
            { name: 'minSize', title: 'Minimum Size', type: 'string' },
            { name: 'maxSize', title: 'Maximum Size', type: 'string' },
            { name: 'weight', title: 'Weight Range', type: 'string' },
            { name: 'complexity', title: 'Complexity Level', type: 'string' },
          ],
        },
        {
          name: 'standards',
          title: 'Applicable Standards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'standard', title: 'Standard', type: 'string' },
                { name: 'title', title: 'Standard Title', type: 'string' },
                { name: 'scope', title: 'Scope/Application', type: 'text' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'technicalDetails', title: 'Technical Details', type: 'text' },
            { name: 'certificationLevel', title: 'Certification Level', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'image', title: 'Feature Image', type: 'image' },
            {
              name: 'details',
              title: 'Feature Details',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'technicalBenefit',
              title: 'Technical Benefit',
              type: 'text',
              description: 'How this feature improves precision/quality/efficiency'
            },
            {
              name: 'metbaseIntegration',
              title: 'MetBase® Integration',
              type: 'boolean',
              description: 'Does this feature integrate with MetBase®?'
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'duration', title: 'Typical Duration', type: 'string' },
            { name: 'qualityCheck', title: 'Quality Check Points', type: 'text' },
            { name: 'toolsRequired', title: 'Tools/Equipment Required', type: 'array', of: [{type: 'string'}] },
            { name: 'deliverables', title: 'Step Deliverables', type: 'text' },
            { name: 'metbaseData', title: 'MetBase® Data Collection', type: 'text', description: 'What data is captured in MetBase®' },
          ],
        },
      ],
    }),
    defineField({
      name: 'qualityAssurance',
      title: 'Quality Assurance & Control',
      type: 'object',
      fields: [
        {
          name: 'qualityPlan',
          title: 'Quality Plan Overview',
          type: 'text',
          rows: 3,
        },
        {
          name: 'inspectionProtocol',
          title: 'Inspection Protocol',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stage', title: 'Inspection Stage', type: 'string' },
                { name: 'method', title: 'Inspection Method', type: 'string' },
                { name: 'criteria', title: 'Acceptance Criteria', type: 'text' },
                { name: 'documentation', title: 'Documentation Required', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'traceability',
          title: 'Traceability Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'certificationProcess',
          title: 'Certification Process',
          type: 'text',
          description: 'How certifications are handled for this service',
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'technology', title: 'Technology Name', type: 'string' },
            { name: 'version', title: 'Version/Model', type: 'string' },
            { name: 'application', title: 'Application', type: 'text' },
            { name: 'advantages', title: 'Key Advantages', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Equipment Name', type: 'string' },
            { name: 'manufacturer', title: 'Manufacturer', type: 'string' },
            { name: 'model', title: 'Model', type: 'string' },
            { name: 'specs', title: 'Technical Specifications', type: 'text' },
            { name: 'capabilities', title: 'Capabilities', type: 'text' },
            { name: 'accuracy', title: 'Accuracy Specifications', type: 'string' },
            { name: 'image', title: 'Equipment Image', type: 'image' },
            { name: 'certifications', title: 'Equipment Certifications', type: 'array', of: [{type: 'string'}] },
            { name: 'metbaseCompatible', title: 'MetBase® Compatible', type: 'boolean' },
          ],
        },
      ],
    }),
    defineField({
      name: 'industries',
      title: 'Industries Served',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      description: 'Link to full case studies from the case study schema',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'pricingModel',
          title: 'Pricing Model',
          type: 'string',
          options: {
            list: [
              {title: 'Per Hour', value: 'hourly'},
              {title: 'Per Project', value: 'project'},
              {title: 'Per Part', value: 'part'},
              {title: 'Quote Required', value: 'quote'},
            ],
          },
        },
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'string',
          description: 'e.g., "Starting at $150/hour" or "Contact for Quote"',
        },
        {
          name: 'factorsAffectingPrice',
          title: 'Factors Affecting Price',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'typicalTurnaround',
          title: 'Typical Turnaround Time',
          type: 'string',
          description: 'e.g., "2-5 business days" or "Same day available"',
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Service-Specific FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      description: 'Link to relevant FAQ entries',
    }),
    defineField({
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'object',
      fields: [
        {
          name: 'whitePapers',
          title: 'Related White Papers',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'whitePaper' }] }],
        },
        {
          name: 'technicalArticles',
          title: 'Related Technical Articles',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
        {
          name: 'glossaryTerms',
          title: 'Related Glossary Terms',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'glossary' }] }],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'subtitle', title: 'CTA Subtitle', type: 'text' },
        {
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Button Text', type: 'string' },
                { name: 'href', title: 'Button Link', type: 'string' },
                { name: 'variant', title: 'Button Style', type: 'string' },
                { name: 'trackingEvent', title: 'Analytics Event', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'object',
          fields: [
            { name: 'phone', title: 'Phone Number', type: 'string' },
            { name: 'email', title: 'Email Address', type: 'string' },
            { name: 'preferredContact', title: 'Preferred Contact Method', type: 'string' },
          ],
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
          validation: Rule => Rule.max(60),
          description: 'Should include primary keywords and be under 60 characters'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: Rule => Rule.max(160),
          description: 'Should include primary and secondary keywords, under 160 characters'
        },
        {
          name: 'focusKeywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Primary keywords this service page should rank for'
        },
        {
          name: 'secondaryKeywords',
          title: 'Secondary Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Supporting keywords and long-tail variations'
        },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
        {
          name: 'structuredData',
          title: 'Structured Data Settings',
          type: 'object',
          fields: [
            { name: 'serviceType', title: 'Service Type', type: 'string' },
            { name: 'areaServed', title: 'Geographic Area Served', type: 'string' },
            { name: 'availableLanguage', title: 'Available Languages', type: 'array', of: [{type: 'string'}] },
          ],
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
      name: 'contentStatus',
      title: 'Content Status',
      type: 'string',
      options: {
        list: [
          {title: 'Published', value: 'published'},
          {title: 'Draft', value: 'draft'},
          {title: 'Under Review', value: 'review'},
          {title: 'Needs Update', value: 'update'},
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'serviceCategory',
      status: 'contentStatus',
    },
    prepare(selection) {
      const {title, category, status} = selection
      const statusEmoji = status === 'published' ? '✅ ' : status === 'review' ? '👁️ ' : status === 'update' ? '🔄 ' : '✏️ '

      return {
        title: `${statusEmoji}${title}`,
        subtitle: category ? `${category} • Service Page` : 'Service Page',
      }
    },
  },
})