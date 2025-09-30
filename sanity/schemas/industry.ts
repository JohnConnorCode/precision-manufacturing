import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'industry',
  title: 'Industry Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Industry Name',
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
      name: 'industryCode',
      title: 'Industry Classification',
      type: 'string',
      options: {
        list: [
          {title: 'Aerospace & Defense', value: 'aerospace-defense'},
          {title: 'Medical Device & Healthcare', value: 'medical-device'},
          {title: 'Energy & Utilities', value: 'energy'},
          {title: 'Government & Public Sector', value: 'government'},
          {title: 'General Manufacturing', value: 'manufacturing'},
          {title: 'Research & Development', value: 'research'},
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
          name: 'keyStats',
          title: 'Key Industry Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Statistic Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'context', title: 'Context/Source', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Industry Overview',
      type: 'object',
      fields: [
        { name: 'description', title: 'Industry Description', type: 'text', rows: 4 },
        {
          name: 'marketSize',
          title: 'Market Size & Growth',
          type: 'text',
          description: 'Market data and growth trends',
        },
        {
          name: 'keyDrivers',
          title: 'Key Market Drivers',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'challenges',
          title: 'Industry Challenges',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'challenge', title: 'Challenge', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'iisSolution', title: 'How IIS Addresses This', type: 'text' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'regulatoryEnvironment',
      title: 'Regulatory Environment',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Regulatory Overview',
          type: 'text',
          rows: 3,
        },
        {
          name: 'requiredCertifications',
          title: 'Required Certifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'certification', title: 'Certification', type: 'string' },
                { name: 'authority', title: 'Certifying Authority', type: 'string' },
                { name: 'scope', title: 'Scope/Application', type: 'text' },
                { name: 'iisCompliance', title: 'IIS Compliance Status', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'complianceRequirements',
          title: 'Key Compliance Requirements',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'requirement', title: 'Requirement', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'impact', title: 'Impact on Manufacturing', type: 'text' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'capabilities',
      title: 'Industry-Specific Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Capability Label', type: 'string' },
            { name: 'value', title: 'Value/Specification', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'certificationRequired', title: 'Certification Required', type: 'boolean' },
            { name: 'typicalTolerances', title: 'Typical Tolerances', type: 'string' },
            { name: 'materialCompatibility', title: 'Material Compatibility', type: 'array', of: [{type: 'string'}] },
          ],
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Applications & Use Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Application Category', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Application Image', type: 'image' },
            {
              name: 'parts',
              title: 'Parts/Components',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'technicalRequirements',
              title: 'Technical Requirements',
              type: 'object',
              fields: [
                { name: 'tolerances', title: 'Required Tolerances', type: 'string' },
                { name: 'materials', title: 'Common Materials', type: 'array', of: [{type: 'string'}] },
                { name: 'standards', title: 'Applicable Standards', type: 'array', of: [{type: 'string'}] },
                { name: 'volume', title: 'Typical Volume Requirements', type: 'string' },
              ],
            },
            {
              name: 'iisExpertise',
              title: 'IIS Expertise & Value',
              type: 'text',
              description: 'How IIS specifically excels in this application',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Industry Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'certification', title: 'Certification', type: 'string' },
            { name: 'certifyingBody', title: 'Certifying Body', type: 'string' },
            { name: 'scope', title: 'Scope of Certification', type: 'text' },
            { name: 'renewalPeriod', title: 'Renewal Period', type: 'string' },
            { name: 'iisStatus', title: 'IIS Certification Status', type: 'string' },
            { name: 'businessValue', title: 'Business Value', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'standards',
      title: 'Industry Standards & Requirements',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'qualitySystems',
          title: 'Quality Management Systems',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'standard', title: 'Standard', type: 'string' },
                { name: 'title', title: 'Standard Title', type: 'string' },
                { name: 'scope', title: 'Scope & Application', type: 'text' },
                { name: 'iisImplementation', title: 'IIS Implementation', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'materials',
          title: 'Material Standards & Specifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'material', title: 'Material Type', type: 'string' },
                { name: 'specifications', title: 'Key Specifications', type: 'array', of: [{type: 'string'}] },
                { name: 'testingRequirements', title: 'Testing Requirements', type: 'text' },
                { name: 'iisCapabilities', title: 'IIS Capabilities', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'dimensionalStandards',
          title: 'Dimensional & Geometric Standards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'standard', title: 'Standard', type: 'string' },
                { name: 'application', title: 'Application Area', type: 'string' },
                { name: 'toleranceClass', title: 'Tolerance Classes', type: 'text' },
                { name: 'measurementMethods', title: 'Measurement Methods', type: 'text' },
              ],
            },
          ],
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
      description: 'Link to case studies from the main case study schema',
    }),
    {
      name: 'partners',
      title: 'Industry Partners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Partner Name', type: 'string' },
            { name: 'logo', title: 'Partner Logo', type: 'image' },
            { name: 'description', title: 'Partnership Details', type: 'text' },
          ],
        },
      ],
    },
    defineField({
      name: 'equipment',
      title: 'Industry-Specific Equipment',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Equipment Name', type: 'string' },
            { name: 'manufacturer', title: 'Manufacturer', type: 'string' },
            { name: 'capability', title: 'Primary Capability', type: 'text' },
            { name: 'specs', title: 'Technical Specifications', type: 'text' },
            { name: 'industryApplications', title: 'Industry-Specific Applications', type: 'text' },
            { name: 'certifications', title: 'Equipment Certifications', type: 'array', of: [{type: 'string'}] },
            { name: 'metbaseIntegration', title: 'MetBase® Integration', type: 'boolean' },
            { name: 'competitiveAdvantage', title: 'Competitive Advantage', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedServices',
      title: 'Key Services for This Industry',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      description: 'Link to services most relevant to this industry',
    }),
    defineField({
      name: 'relatedResources',
      title: 'Industry Resources',
      type: 'object',
      fields: [
        {
          name: 'whitePapers',
          title: 'Industry White Papers',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'whitePaper' }] }],
        },
        {
          name: 'technicalArticles',
          title: 'Technical Articles',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'resource' }] }],
        },
        {
          name: 'glossaryTerms',
          title: 'Industry Glossary Terms',
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
          name: 'industrySpecificCTA',
          title: 'Industry-Specific CTA Text',
          type: 'text',
          description: 'Tailored call-to-action messaging for this industry',
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
          description: 'Include industry keywords and location',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: Rule => Rule.max(160),
          description: 'Include industry-specific services and certifications',
        },
        {
          name: 'industryKeywords',
          title: 'Industry Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Primary industry-specific keywords',
        },
        {
          name: 'complianceKeywords',
          title: 'Compliance & Certification Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Keywords related to industry compliance and certifications',
        },
        { name: 'ogImage', title: 'Social Share Image', type: 'image' },
        {
          name: 'structuredData',
          title: 'Industry Structured Data',
          type: 'object',
          fields: [
            { name: 'industryCategory', title: 'Industry Category', type: 'string' },
            { name: 'serviceArea', title: 'Service Area', type: 'string' },
            { name: 'certifications', title: 'Key Certifications', type: 'array', of: [{type: 'string'}] },
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
      code: 'industryCode',
      status: 'contentStatus',
    },
    prepare(selection) {
      const {title, code, status} = selection
      const statusEmoji = status === 'published' ? '✅ ' : status === 'review' ? '👁️ ' : status === 'update' ? '🔄 ' : '✏️ '

      return {
        title: `${statusEmoji}${title}`,
        subtitle: code ? `${code} • Industry Page` : 'Industry Page',
      }
    },
  },
})