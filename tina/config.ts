import { defineConfig } from 'tinacms';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  branch:
    process.env.TINA_GIT_BRANCH ||
    process.env.HEAD ||
    'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputDir: 'admin',
    publicDir: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        label: 'Services',
        name: 'service',
        path: 'content/services',
        format: 'mdx',
        ui: {
          router: ({ document }) => {
            return `/services/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: 'object',
            list: false,
            name: 'frontmatter',
            label: 'Service Meta',
            ui: {
              itemProps: (item) => ({ label: item?.title }),
            },
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Service Title',
                isTitle: true,
                required: true,
              },
              {
                type: 'string',
                name: 'slug',
                label: 'URL Slug',
                description: 'Used in URL: /services/{slug}',
                required: true,
              },
              {
                type: 'string',
                name: 'description',
                label: 'Short Description',
                ui: { component: 'textarea' },
              },
              {
                type: 'object',
                name: 'hero',
                label: 'Hero Section',
                fields: [
                  {
                    type: 'string',
                    name: 'subtitle',
                    label: 'Hero Subtitle',
                  },
                  {
                    type: 'string',
                    name: 'badge',
                    label: 'Badge Text',
                  },
                  {
                    type: 'image',
                    name: 'backgroundImage',
                    label: 'Hero Background Image',
                  },
                ],
              },
              {
                type: 'object',
                name: 'overview',
                label: 'Overview Section',
                fields: [
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Overview Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'highlights',
                    label: 'Key Highlights',
                    list: true,
                  },
                ],
              },
              {
                type: 'object',
                list: true,
                name: 'capabilities',
                label: 'Capabilities',
                ui: {
                  itemProps: (item) => ({ label: item?.label }),
                },
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Capability Name',
                  },
                  {
                    type: 'string',
                    name: 'value',
                    label: 'Value/Metric',
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    ui: { component: 'textarea' },
                  },
                ],
              },
              {
                type: 'object',
                name: 'technicalSpecs',
                label: 'Technical Specifications',
                fields: [
                  {
                    type: 'object',
                    name: 'tolerances',
                    label: 'Tolerances',
                    fields: [
                      {
                        type: 'string',
                        name: 'dimensional',
                        label: 'Dimensional Tolerance',
                      },
                      {
                        type: 'string',
                        name: 'geometric',
                        label: 'Geometric Tolerance',
                      },
                      {
                        type: 'string',
                        name: 'repeatability',
                        label: 'Repeatability',
                      },
                    ],
                  },
                  {
                    type: 'object',
                    list: true,
                    name: 'materials',
                    label: 'Supported Materials',
                    fields: [
                      {
                        type: 'string',
                        name: 'material',
                        label: 'Material Name',
                      },
                      {
                        type: 'string',
                        name: 'grade',
                        label: 'Grade/Specification',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'object',
                list: true,
                name: 'process',
                label: 'Process Steps',
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  {
                    type: 'number',
                    name: 'step',
                    label: 'Step Number',
                  },
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Step Title',
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Step Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'qualityCheck',
                    label: 'Quality Checkpoints',
                  },
                ],
              },
              {
                type: 'object',
                list: true,
                name: 'equipment',
                label: 'Equipment & Technology',
                ui: {
                  itemProps: (item) => ({ label: item?.name }),
                },
                fields: [
                  {
                    type: 'string',
                    name: 'name',
                    label: 'Equipment Name',
                  },
                  {
                    type: 'string',
                    name: 'manufacturer',
                    label: 'Manufacturer',
                  },
                  {
                    type: 'string',
                    name: 'model',
                    label: 'Model',
                  },
                  {
                    type: 'string',
                    name: 'specs',
                    label: 'Specifications',
                    ui: { component: 'textarea' },
                  },
                ],
              },
              {
                type: 'object',
                name: 'seo',
                label: 'SEO Metadata',
                fields: [
                  {
                    type: 'string',
                    name: 'metaTitle',
                    label: 'Meta Title',
                  },
                  {
                    type: 'string',
                    name: 'metaDescription',
                    label: 'Meta Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'image',
                    name: 'ogImage',
                    label: 'Open Graph Image',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Service Body Content',
            isBody: true,
          },
        ],
      },
      {
        label: 'Industries',
        name: 'industry',
        path: 'content/industries',
        format: 'mdx',
        ui: {
          router: ({ document }) => {
            return `/industries/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: 'object',
            list: false,
            name: 'frontmatter',
            label: 'Industry Meta',
            ui: {
              itemProps: (item) => ({ label: item?.title }),
            },
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Industry Title',
                isTitle: true,
                required: true,
              },
              {
                type: 'string',
                name: 'slug',
                label: 'URL Slug',
                description: 'Used in URL: /industries/{slug}',
                required: true,
              },
              {
                type: 'string',
                name: 'description',
                label: 'Industry Description',
                ui: { component: 'textarea' },
              },
              {
                type: 'object',
                name: 'hero',
                label: 'Hero Section',
                fields: [
                  {
                    type: 'string',
                    name: 'subtitle',
                    label: 'Hero Subtitle',
                  },
                  {
                    type: 'string',
                    name: 'badge',
                    label: 'Badge Text',
                  },
                  {
                    type: 'image',
                    name: 'backgroundImage',
                    label: 'Hero Background Image',
                  },
                ],
              },
              {
                type: 'object',
                name: 'overview',
                label: 'Market Overview',
                fields: [
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Overview Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'marketSize',
                    label: 'Market Size',
                  },
                  {
                    type: 'string',
                    name: 'keyDrivers',
                    label: 'Key Market Drivers',
                    list: true,
                  },
                  {
                    type: 'string',
                    name: 'challenges',
                    label: 'Key Challenges',
                    list: true,
                  },
                ],
              },
              {
                type: 'object',
                list: true,
                name: 'capabilities',
                label: 'Capabilities',
                ui: {
                  itemProps: (item) => ({ label: item?.title }),
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Capability Title',
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'technicalDetails',
                    label: 'Technical Details',
                    list: true,
                  },
                ],
              },
              {
                type: 'object',
                name: 'regulatory',
                label: 'Regulatory & Compliance',
                fields: [
                  {
                    type: 'object',
                    list: true,
                    name: 'certifications',
                    label: 'Certifications',
                    ui: {
                      itemProps: (item) => ({ label: item?.name }),
                    },
                    fields: [
                      {
                        type: 'string',
                        name: 'name',
                        label: 'Certification Name',
                      },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        ui: { component: 'textarea' },
                      },
                      {
                        type: 'string',
                        name: 'scope',
                        label: 'Scope',
                      },
                    ],
                  },
                  {
                    type: 'object',
                    list: true,
                    name: 'standards',
                    label: 'Industry Standards',
                    ui: {
                      itemProps: (item) => ({ label: item?.name }),
                    },
                    fields: [
                      {
                        type: 'string',
                        name: 'name',
                        label: 'Standard Name',
                      },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'object',
                list: true,
                name: 'applications',
                label: 'Industry Applications',
                ui: {
                  itemProps: (item) => ({ label: item?.name }),
                },
                fields: [
                  {
                    type: 'string',
                    name: 'name',
                    label: 'Application Name',
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'requirements',
                    label: 'Requirements',
                    list: true,
                  },
                ],
              },
              {
                type: 'object',
                name: 'seo',
                label: 'SEO Metadata',
                fields: [
                  {
                    type: 'string',
                    name: 'metaTitle',
                    label: 'Meta Title',
                  },
                  {
                    type: 'string',
                    name: 'metaDescription',
                    label: 'Meta Description',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'image',
                    name: 'ogImage',
                    label: 'Open Graph Image',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Industry Body Content',
            isBody: true,
          },
        ],
      },
      {
        label: 'Pages',
        name: 'page',
        path: 'content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'object',
            list: false,
            name: 'frontmatter',
            label: 'Page Meta',
            ui: {
              itemProps: (item) => ({ label: item?.title }),
            },
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Page Title',
                isTitle: true,
                required: true,
              },
              {
                type: 'string',
                name: 'slug',
                label: 'URL Slug',
                required: true,
              },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                ui: { component: 'textarea' },
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Page Content',
            isBody: true,
          },
        ],
      },
    ],
  },
});
