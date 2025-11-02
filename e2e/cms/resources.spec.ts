import { test, expect } from '@playwright/test';
import { getAdminCredentials } from './helpers/auth.helper';
import { createPayloadAPI } from './helpers/api.helper';
import { createCleanupHelper } from './helpers/cleanup.helper';
import { testResource, updateTestResource, testSEO } from './fixtures/test-data';

test.describe('CMS - Resources Collection', () => {
  let api: ReturnType<typeof createPayloadAPI>;
  let cleanup: ReturnType<typeof createCleanupHelper>;
  const credentials = getAdminCredentials();

  test.beforeEach(async ({ request }) => {
    api = createPayloadAPI();
    cleanup = createCleanupHelper();
    await api.authenticate(request, credentials);
  });

  test.afterEach(async ({ request }) => {
    await cleanup.cleanupAll(request, api);
  });

  test('should read all resources from collection', async ({ request }) => {
    const response = await api.getCollection(request, 'resources');

    expect(response).toBeDefined();
    expect(response.docs).toBeDefined();
    expect(Array.isArray(response.docs)).toBeTruthy();

    if (response.docs && response.docs.length > 0) {
      const resource = response.docs[0];
      expect(resource).toHaveProperty('id');
      expect(resource).toHaveProperty('title');
      expect(resource).toHaveProperty('slug');
      expect(resource).toHaveProperty('category');
    }
  });

  test('should filter resources by category', async ({ request }) => {
    // Create test resources in different categories
    const resource1 = await api.createDocument(request, 'resources', {
      ...testResource,
      title: '[TEST] Manufacturing Resource',
      slug: 'test-manufacturing-resource',
      category: 'manufacturing-processes'
    });
    cleanup.trackResource(resource1.id);

    const resource2 = await api.createDocument(request, 'resources', {
      ...testResource,
      title: '[TEST] Material Science Resource',
      slug: 'test-material-resource',
      category: 'material-science'
    });
    cleanup.trackResource(resource2.id);

    // Filter by category
    const manufacturingResources = await api.getCollection(request, 'resources', {
      where: {
        category: { equals: 'manufacturing-processes' }
      }
    });

    expect(manufacturingResources.docs).toBeDefined();
    if (!manufacturingResources.docs) return;
    const testManufacturing = manufacturingResources.docs.filter((r: any) =>
      r.title.startsWith('[TEST]') && r.category === 'manufacturing-processes'
    );
    expect(testManufacturing.length).toBeGreaterThan(0);
  });

  test('should create new resource article', async ({ request }) => {
    const newResource = await api.createDocument(request, 'resources', testResource);

    expect(newResource).toBeDefined();
    expect(newResource.id).toBeDefined();
    expect(newResource.title).toBe(testResource.title);
    expect(newResource.slug).toBe(testResource.slug);
    expect(newResource.category).toBe(testResource.category);
    expect(newResource.excerpt).toBe(testResource.excerpt);
    expect(newResource.difficulty).toBe(testResource.difficulty);

    cleanup.trackResource(newResource.id);
  });

  test('should update resource content and metadata', async ({ request }) => {
    const created = await api.createDocument(request, 'resources', testResource);
    cleanup.trackResource(created.id);

    const updated = await api.updateDocument(request, 'resources', created.id, updateTestResource);

    expect(updated).toBeDefined();
    expect(updated.id).toBe(created.id);
    expect(updated.excerpt).toBe(updateTestResource.excerpt);
    expect(updated.difficulty).toBe(updateTestResource.difficulty);
    expect(updated.readTime).toBe(updateTestResource.readTime);
  });

  test('should delete resource article', async ({ request }) => {
    const created = await api.createDocument(request, 'resources', testResource);

    await api.deleteDocument(request, 'resources', created.id);

    await expect(
      api.getDocument(request, 'resources', created.id)
    ).rejects.toThrow();
  });

  test('should store and retrieve SEO fields', async ({ request }) => {
    const resourceWithSEO = {
      ...testResource,
      title: '[TEST] Resource with SEO',
      slug: 'test-resource-seo',
      seo: testSEO
    };

    const created = await api.createDocument(request, 'resources', resourceWithSEO);
    cleanup.trackResource(created.id);

    expect(created.seo).toBeDefined();
    expect(created.seo.title).toBe(testSEO.title);
    expect(created.seo.description).toBe(testSEO.description);
    expect(created.seo.keywords).toBe(testSEO.keywords);
  });

  test('should store rich text content', async ({ request }) => {
    const created = await api.createDocument(request, 'resources', testResource);
    cleanup.trackResource(created.id);

    expect(created.content).toBeDefined();
    expect(created.content.root).toBeDefined();
    expect(created.content.root.children).toBeDefined();
    expect(Array.isArray(created.content.root.children)).toBeTruthy();
  });

  test('should handle tags array', async ({ request }) => {
    const resourceWithTags = {
      ...testResource,
      title: '[TEST] Resource with Tags',
      slug: 'test-resource-tags',
      tags: [
        { tag: 'cnc' },
        { tag: 'machining' },
        { tag: 'aerospace' },
        { tag: 'precision' }
      ]
    };

    const created = await api.createDocument(request, 'resources', resourceWithTags);
    cleanup.trackResource(created.id);

    expect(created.tags).toBeDefined();
    expect(created.tags.length).toBe(4);
    expect(created.tags[0].tag).toBe('cnc');
    expect(created.tags[3].tag).toBe('precision');
  });

  test('should support difficulty levels', async ({ request }) => {
    const difficulties = ['beginner', 'intermediate', 'advanced'];

    for (const difficulty of difficulties) {
      const resource = await api.createDocument(request, 'resources', {
        ...testResource,
        title: `[TEST] ${difficulty} Resource`,
        slug: `test-${difficulty}-resource`,
        difficulty
      });
      cleanup.trackResource(resource.id);

      expect(resource.difficulty).toBe(difficulty);
    }
  });

  test('should store author and publish date', async ({ request }) => {
    const resourceWithMeta = {
      ...testResource,
      title: '[TEST] Resource with Metadata',
      slug: 'test-resource-metadata',
      author: 'John Smith',
      publishDate: '2025-11-01T12:00:00.000Z',
      readTime: '8 min read'
    };

    const created = await api.createDocument(request, 'resources', resourceWithMeta);
    cleanup.trackResource(created.id);

    expect(created.author).toBe('John Smith');
    expect(created.publishDate).toBeDefined();
    expect(created.readTime).toBe('8 min read');
  });

  test('should support featured flag', async ({ request }) => {
    const featuredResource = {
      ...testResource,
      title: '[TEST] Featured Resource',
      slug: 'test-featured-resource',
      featured: true
    };

    const created = await api.createDocument(request, 'resources', featuredResource);
    cleanup.trackResource(created.id);

    expect(created.featured).toBe(true);

    // Query for featured resources
    const featured = await api.getCollection(request, 'resources', {
      where: {
        featured: { equals: true }
      }
    });

    if (!featured.docs) return;
    expect(featured.docs.some((r: any) => r.id === created.id)).toBeTruthy();
  });
});
