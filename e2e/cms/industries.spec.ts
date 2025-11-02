import { test, expect } from '@playwright/test';
import { getAdminCredentials } from './helpers/auth.helper';
import { createPayloadAPI } from './helpers/api.helper';
import { createCleanupHelper } from './helpers/cleanup.helper';
import { testIndustry, updateTestIndustry } from './fixtures/test-data';

test.describe('CMS - Industries Collection', () => {
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

  test('should read all industries from collection', async ({ request }) => {
    const response = await api.getCollection(request, 'industries');

    expect(response).toBeDefined();
    expect(response.docs).toBeDefined();
    expect(Array.isArray(response.docs)).toBeTruthy();
    expect(response.totalDocs).toBeGreaterThan(0);

    // Verify industry structure
    const industry = response.docs?.[0];
    if (!industry) return;
    expect(industry).toHaveProperty('id');
    expect(industry).toHaveProperty('title');
    expect(industry).toHaveProperty('slug');
  });

  test('should read single industry by ID', async ({ request }) => {
    const allIndustries = await api.getCollection(request, 'industries');
    const firstIndustryId = allIndustries.docs?.[0]?.id;
    if (!firstIndustryId) return;

    const industry = await api.getDocument(request, 'industries', firstIndustryId);

    expect(industry).toBeDefined();
    expect(industry.id).toBe(firstIndustryId);
    expect(industry.title).toBeDefined();
    expect(industry.slug).toBeDefined();
  });

  test('should create new industry', async ({ request }) => {
    const newIndustry = await api.createDocument(request, 'industries', testIndustry);

    expect(newIndustry).toBeDefined();
    expect(newIndustry.id).toBeDefined();
    expect(newIndustry.title).toBe(testIndustry.title);
    expect(newIndustry.slug).toBe(testIndustry.slug);
    expect(newIndustry.shortDescription).toBe(testIndustry.shortDescription);

    cleanup.trackIndustry(newIndustry.id);
  });

  test('should update industry description and overview', async ({ request }) => {
    const created = await api.createDocument(request, 'industries', testIndustry);
    cleanup.trackIndustry(created.id);

    const updated = await api.updateDocument(request, 'industries', created.id, updateTestIndustry);

    expect(updated).toBeDefined();
    expect(updated.id).toBe(created.id);
    expect(updated.shortDescription).toBe(updateTestIndustry.shortDescription);
    expect(updated.overview).toBeDefined();
    expect(updated.overview.description).toBe('Updated overview description');
    expect(updated.overview.marketSize).toBe('$200B');
  });

  test('should delete industry', async ({ request }) => {
    const created = await api.createDocument(request, 'industries', testIndustry);

    await api.deleteDocument(request, 'industries', created.id);

    await expect(
      api.getDocument(request, 'industries', created.id)
    ).rejects.toThrow();
  });

  test('should store and retrieve features array', async ({ request }) => {
    const industryWithFeatures = {
      ...testIndustry,
      title: '[TEST] Industry with Features',
      slug: 'test-industry-features',
      features: [
        { feature: 'High precision machining' },
        { feature: 'Quality inspection' },
        { feature: 'Rapid prototyping' }
      ]
    };

    const created = await api.createDocument(request, 'industries', industryWithFeatures);
    cleanup.trackIndustry(created.id);

    expect(created.features).toBeDefined();
    expect(created.features.length).toBe(3);
    expect(created.features[0].feature).toBe('High precision machining');
    expect(created.features[1].feature).toBe('Quality inspection');
  });

  test('should store overview with market data', async ({ request }) => {
    const industryWithMarketData = {
      ...testIndustry,
      title: '[TEST] Industry with Market Data',
      slug: 'test-industry-market-data',
      overview: {
        description: 'Comprehensive market overview',
        marketSize: '$500B',
        keyDrivers: [
          { driver: 'Technological advancement' },
          { driver: 'Regulatory compliance' }
        ],
        challenges: [
          { challenge: 'Supply chain complexity' },
          { challenge: 'Skilled labor shortage' }
        ]
      }
    };

    const created = await api.createDocument(request, 'industries', industryWithMarketData);
    cleanup.trackIndustry(created.id);

    expect(created.overview).toBeDefined();
    expect(created.overview.marketSize).toBe('$500B');
    expect(created.overview.keyDrivers).toBeDefined();
    expect(created.overview.keyDrivers.length).toBe(2);
    expect(created.overview.challenges).toBeDefined();
    expect(created.overview.challenges.length).toBe(2);
  });

  test('should handle industry ordering', async ({ request }) => {
    const industry1 = await api.createDocument(request, 'industries', {
      ...testIndustry,
      title: '[TEST] Industry Order 1',
      slug: 'test-industry-order-1',
      order: 10
    });
    cleanup.trackIndustry(industry1.id);

    const industry2 = await api.createDocument(request, 'industries', {
      ...testIndustry,
      title: '[TEST] Industry Order 2',
      slug: 'test-industry-order-2',
      order: 20
    });
    cleanup.trackIndustry(industry2.id);

    const response = await api.getCollection(request, 'industries', {
      sort: 'order'
    });

    if (!response.docs) return;
    const testIndustries = response.docs.filter((i: any) => i.title.startsWith('[TEST]'));
    expect(testIndustries.length).toBeGreaterThanOrEqual(2);
    expect(testIndustries[0].order).toBeDefined();
  });

  test('should store regulatory information', async ({ request }) => {
    const industryWithRegulatory = {
      ...testIndustry,
      title: '[TEST] Industry with Regulatory',
      slug: 'test-industry-regulatory',
      regulatory: [
        {
          title: 'AS9100',
          description: 'Aerospace quality management',
          details: [
            { detail: 'ISO 9001 foundation' },
            { detail: 'Aerospace-specific requirements' }
          ]
        }
      ]
    };

    const created = await api.createDocument(request, 'industries', industryWithRegulatory);
    cleanup.trackIndustry(created.id);

    expect(created.regulatory).toBeDefined();
    expect(created.regulatory.length).toBe(1);
    expect(created.regulatory[0].title).toBe('AS9100');
    expect(created.regulatory[0].details).toBeDefined();
    expect(created.regulatory[0].details.length).toBe(2);
  });
});
