export const testService = {
  title: '[TEST] 5-Axis CNC Testing',
  slug: 'test-5-axis-cnc-testing',
  shortDescription: 'Test service for automated testing purposes',
  description: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is a test service created during automated testing.',
              type: 'text',
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  },
  order: 999,
  hero: {
    badge: 'Test Badge',
    subtitle: 'Test Subtitle'
  },
  overview: {
    description: 'Test overview description'
  },
  capabilities: [
    {
      label: 'Test Capability',
      value: '100%',
      description: 'Test capability description'
    }
  ],
  highlight: false
};

export const testIndustry = {
  title: '[TEST] Aerospace Testing',
  slug: 'test-aerospace-testing',
  shortDescription: 'Test industry for automated testing purposes',
  description: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is a test industry created during automated testing.',
              type: 'text',
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  },
  order: 999,
  hero: {
    badge: 'Test Badge',
    subtitle: 'Test Subtitle'
  },
  overview: {
    description: 'Test overview description',
    marketSize: '$100B',
    keyDrivers: [
      { driver: 'Test driver 1' },
      { driver: 'Test driver 2' }
    ],
    challenges: [
      { challenge: 'Test challenge 1' }
    ]
  },
  features: [
    { feature: 'Test feature 1' },
    { feature: 'Test feature 2' }
  ]
};

export const testResource = {
  title: '[TEST] CNC Machining Guide',
  slug: 'test-cnc-machining-guide',
  excerpt: 'Test resource for automated testing purposes',
  content: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'This is a test resource article created during automated testing.',
              type: 'text',
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1
        }
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  },
  category: 'manufacturing-processes',
  difficulty: 'intermediate',
  readTime: '5 min read',
  publishDate: new Date().toISOString(),
  author: 'Test Author',
  featured: false,
  tags: [
    { tag: 'test' },
    { tag: 'automation' }
  ]
};

export const testTeamMember = {
  name: '[TEST] John Doe',
  title: 'Test Engineer',
  bio: 'This is a test team member created during automated testing.',
  order: 999,
  email: 'test@example.com'
};

export const updateTestService = {
  shortDescription: 'Updated test service description',
  capabilities: [
    {
      label: 'Updated Capability',
      value: '200%',
      description: 'Updated capability description'
    }
  ]
};

export const updateTestIndustry = {
  shortDescription: 'Updated test industry description',
  overview: {
    description: 'Updated overview description',
    marketSize: '$200B',
    keyDrivers: [
      { driver: 'Updated driver 1' }
    ]
  }
};

export const updateTestResource = {
  excerpt: 'Updated test resource excerpt',
  difficulty: 'advanced',
  readTime: '10 min read'
};

// SEO test data
export const testSEO = {
  title: 'Test SEO Title',
  description: 'Test SEO description for automated testing',
  keywords: 'test, automation, cms',
  ogTitle: 'Test OG Title',
  ogDescription: 'Test OG description'
};

// Global settings test data
export const testGlobalUpdate = {
  company: {
    tagline: 'Test Tagline - Automated Testing'
  }
};
