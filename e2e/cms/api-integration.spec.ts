import { test, expect } from '@playwright/test';
import { getAdminCredentials } from './helpers/auth.helper';
import { createPayloadAPI } from './helpers/api.helper';

test.describe('CMS - API Integration', () => {
  let api: ReturnType<typeof createPayloadAPI>;
  const credentials = getAdminCredentials();
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

  test.beforeEach(async ({ request }) => {
    api = createPayloadAPI();
    await api.authenticate(request, credentials);
  });

  test('should successfully call Payload API endpoints', async ({ request }) => {
    // Test multiple API endpoints
    const endpoints = [
      '/api/services',
      '/api/industries',
      '/api/resources',
      '/api/globals/site-settings',
      '/api/globals/navigation'
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`${baseURL}${endpoint}`, {
        headers: api.getAuthHeaders()
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });

  test('should handle API pagination correctly', async ({ request }) => {
    // Test pagination with services
    const page1 = await api.getCollection(request, 'services', {
      limit: 2,
      page: 1
    });

    expect(page1).toBeDefined();
    expect(page1.docs).toBeDefined();
    expect(page1.limit).toBe(2);
    expect(page1.page).toBe(1);
    expect(page1.totalPages).toBeDefined();

    // If there are more than 2 services, test page 2
    if (page1.totalDocs && page1.totalDocs > 2) {
      const page2 = await api.getCollection(request, 'services', {
        limit: 2,
        page: 2
      });

      expect(page2.page).toBe(2);
      expect(page2.docs).toBeDefined();

      // Documents on page 2 should be different from page 1
      if (page2.docs && page1.docs && page2.docs.length > 0 && page1.docs.length > 0) {
        expect(page2.docs[0].id).not.toBe(page1.docs[0].id);
      }
    }
  });

  test('should handle API error responses gracefully', async ({ request }) => {
    // Try to fetch non-existent document
    const response = await request.get(`${baseURL}/api/services/nonexistent-id-12345`, {
      headers: api.getAuthHeaders()
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });

  test('should support API filtering and sorting', async ({ request }) => {
    // Test sorting by order field
    const sortedServices = await api.getCollection(request, 'services', {
      sort: 'order',
      limit: 10
    });

    expect(sortedServices.docs).toBeDefined();
    if (sortedServices.docs) {
      expect(sortedServices.docs.length).toBeGreaterThan(0);
    }

    // Verify sorting (if order field exists)
    if (sortedServices.docs && sortedServices.docs.length > 1) {
      const firstOrder = sortedServices.docs[0].order;
      const secondOrder = sortedServices.docs[1].order;

      if (firstOrder !== undefined && secondOrder !== undefined) {
        expect(firstOrder).toBeLessThanOrEqual(secondOrder);
      }
    }

    // Test filtering
    const filteredResources = await api.getCollection(request, 'resources', {
      where: {
        difficulty: { equals: 'intermediate' }
      }
    });

    expect(filteredResources.docs).toBeDefined();

    // All returned resources should have intermediate difficulty
    if (filteredResources.docs) {
      filteredResources.docs.forEach((resource: any) => {
        if (resource.difficulty) {
          expect(resource.difficulty).toBe('intermediate');
        }
      });
    }
  });
});
