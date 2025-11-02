import { test, expect } from '@playwright/test';
import { getAdminCredentials } from './helpers/auth.helper';
import { createPayloadAPI } from './helpers/api.helper';
import { createCleanupHelper } from './helpers/cleanup.helper';
import { testService, updateTestService } from './fixtures/test-data';

test.describe('CMS - Services Collection', () => {
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

  test('should read all services from collection', async ({ request }) => {
    const response = await api.getCollection(request, 'services');

    expect(response).toBeDefined();
    expect(response.docs).toBeDefined();
    expect(Array.isArray(response.docs)).toBeTruthy();
    expect(response.totalDocs).toBeGreaterThan(0);

    // Verify service structure
    const service = response.docs[0];
    expect(service).toHaveProperty('id');
    expect(service).toHaveProperty('title');
    expect(service).toHaveProperty('slug');
  });

  test('should read single service by ID', async ({ request }) => {
    // Get first service
    const allServices = await api.getCollection(request, 'services');
    const firstServiceId = allServices.docs[0].id;

    // Fetch single service
    const service = await api.getDocument(request, 'services', firstServiceId);

    expect(service).toBeDefined();
    expect(service.id).toBe(firstServiceId);
    expect(service.title).toBeDefined();
    expect(service.slug).toBeDefined();
  });

  test('should create new service', async ({ request }) => {
    const newService = await api.createDocument(request, 'services', testService);

    expect(newService).toBeDefined();
    expect(newService.id).toBeDefined();
    expect(newService.title).toBe(testService.title);
    expect(newService.slug).toBe(testService.slug);
    expect(newService.shortDescription).toBe(testService.shortDescription);
    expect(newService.order).toBe(testService.order);

    // Track for cleanup
    cleanup.trackService(newService.id);
  });

  test('should update existing service', async ({ request }) => {
    // Create service first
    const created = await api.createDocument(request, 'services', testService);
    cleanup.trackService(created.id);

    // Update it
    const updated = await api.updateDocument(request, 'services', created.id, updateTestService);

    expect(updated).toBeDefined();
    expect(updated.id).toBe(created.id);
    expect(updated.shortDescription).toBe(updateTestService.shortDescription);
    expect(updated.capabilities).toBeDefined();
    expect(updated.capabilities.length).toBeGreaterThan(0);
    expect(updated.capabilities[0].label).toBe('Updated Capability');
  });

  test('should delete service', async ({ request }) => {
    // Create service first
    const created = await api.createDocument(request, 'services', testService);

    // Delete it
    await api.deleteDocument(request, 'services', created.id);

    // Verify deletion - should throw error
    await expect(
      api.getDocument(request, 'services', created.id)
    ).rejects.toThrow();

    // Don't track for cleanup since already deleted
  });

  test('should validate slug format', async ({ request }) => {
    const invalidService = {
      ...testService,
      slug: 'Invalid Slug With Spaces!'
    };

    // Should fail validation
    await expect(
      api.createDocument(request, 'services', invalidService)
    ).rejects.toThrow();
  });

  test('should handle service ordering', async ({ request }) => {
    // Create two services with different orders
    const service1 = await api.createDocument(request, 'services', {
      ...testService,
      title: '[TEST] Service Order 1',
      slug: 'test-service-order-1',
      order: 1
    });
    cleanup.trackService(service1.id);

    const service2 = await api.createDocument(request, 'services', {
      ...testService,
      title: '[TEST] Service Order 2',
      slug: 'test-service-order-2',
      order: 2
    });
    cleanup.trackService(service2.id);

    // Fetch all and verify ordering
    const response = await api.getCollection(request, 'services', {
      sort: 'order'
    });

    const testServices = response.docs.filter((s: any) => s.title.startsWith('[TEST]'));
    expect(testServices.length).toBeGreaterThanOrEqual(2);

    // Verify order field exists
    expect(testServices[0].order).toBeDefined();
    expect(testServices[1].order).toBeDefined();
  });

  test('should store and retrieve service capabilities', async ({ request }) => {
    const serviceWithCapabilities = {
      ...testService,
      title: '[TEST] Service with Capabilities',
      slug: 'test-service-capabilities',
      capabilities: [
        { label: 'Tolerance', value: '±0.0001"', description: 'Ultra-precise tolerances' },
        { label: 'Materials', value: '150+', description: 'Wide range of materials' },
        { label: 'Capacity', value: '24/7', description: 'Round-the-clock production' }
      ]
    };

    const created = await api.createDocument(request, 'services', serviceWithCapabilities);
    cleanup.trackService(created.id);

    expect(created.capabilities).toBeDefined();
    expect(created.capabilities.length).toBe(3);
    expect(created.capabilities[0].label).toBe('Tolerance');
    expect(created.capabilities[0].value).toBe('±0.0001"');
    expect(created.capabilities[1].label).toBe('Materials');
  });

  test('should store hero section data', async ({ request }) => {
    const serviceWithHero = {
      ...testService,
      title: '[TEST] Service with Hero',
      slug: 'test-service-hero',
      hero: {
        badge: 'Premium Service',
        subtitle: 'Advanced Manufacturing Solutions'
      }
    };

    const created = await api.createDocument(request, 'services', serviceWithHero);
    cleanup.trackService(created.id);

    expect(created.hero).toBeDefined();
    expect(created.hero.badge).toBe('Premium Service');
    expect(created.hero.subtitle).toBe('Advanced Manufacturing Solutions');
  });
});
