import { test, expect } from '@playwright/test';

/**
 * DATA INTEGRITY TESTS
 *
 * Verifies that data structure matches expectations:
 * - Lexical format for rich text
 * - Object arrays for nested data
 * - Required fields present
 */

const ADMIN_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://precision-manufacturing.vercel.app';

test.describe('Data Integrity - API Structure', () => {
  test('Services should have correct Lexical description format', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/services?depth=0&limit=1`);
    const data = await response.json();

    expect(data.docs.length).toBeGreaterThan(0);

    const service = data.docs[0];

    // Description should be Lexical format (object with root key)
    expect(service.description).toBeDefined();
    expect(typeof service.description).toBe('object');
    expect(service.description.root).toBeDefined();
    expect(service.description.root.children).toBeDefined();
    expect(Array.isArray(service.description.root.children)).toBe(true);

    console.log('✓ Service description is valid Lexical format');
  });

  test('Services should have specs as object array', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/services?depth=0&limit=1`);
    const data = await response.json();

    const service = data.docs[0];

    // Specs should be array
    expect(Array.isArray(service.specs)).toBe(true);

    if (service.specs.length > 0) {
      // Each spec should be object with 'spec' property
      const firstSpec = service.specs[0];
      expect(typeof firstSpec).toBe('object');
      expect(firstSpec.spec).toBeDefined();
      expect(typeof firstSpec.spec).toBe('string');

      console.log(`✓ Service specs format: [{ spec: "${firstSpec.spec}" }]`);
    }
  });

  test('Industries should have features as object array', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/industries?depth=0&limit=1`);
    const data = await response.json();

    expect(data.docs.length).toBeGreaterThan(0);

    const industry = data.docs[0];

    // Features should be array of objects
    expect(Array.isArray(industry.features)).toBe(true);

    if (industry.features.length > 0) {
      const firstFeature = industry.features[0];
      expect(typeof firstFeature).toBe('object');
      expect(firstFeature.feature).toBeDefined();
      expect(typeof firstFeature.feature).toBe('string');

      console.log(`✓ Industry features format: [{ feature: "${firstFeature.feature}" }]`);
    }
  });

  test('Resources should have tags as object array', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/resources?depth=0&limit=1`);
    const data = await response.json();

    expect(data.docs.length).toBeGreaterThan(0);

    const resource = data.docs[0];

    if (resource.tags && resource.tags.length > 0) {
      const firstTag = resource.tags[0];
      expect(typeof firstTag).toBe('object');
      expect(firstTag.tag).toBeDefined();

      console.log(`✓ Resource tags format: [{ tag: "${firstTag.tag}" }]`);
    }
  });

  test('All collections should have id field', async ({ request }) => {
    const collections = ['services', 'industries', 'resources'];

    for (const collection of collections) {
      const response = await request.get(`${ADMIN_URL}/api/${collection}?depth=0&limit=1`);
      const data = await response.json();

      expect(data.docs.length).toBeGreaterThan(0);

      const doc = data.docs[0];
      expect(doc.id).toBeDefined();
      expect(typeof doc.id).toBe('string');

      console.log(`✓ ${collection} has id field: ${doc.id}`);
    }
  });

  test('Services should have all required fields', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/services?depth=0&limit=1`);
    const data = await response.json();

    const service = data.docs[0];

    // Required fields
    expect(service.title).toBeDefined();
    expect(service.slug).toBeDefined();
    expect(service.description).toBeDefined();

    // Optional but expected fields
    expect(service.specs).toBeDefined();
    expect(service.capabilities).toBeDefined();

    console.log(`✓ Service "${service.title}" has all required fields`);
  });

  test('Industries should have all required fields', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/industries?depth=0&limit=1`);
    const data = await response.json();

    const industry = data.docs[0];

    // Required fields
    expect(industry.title).toBeDefined();
    expect(industry.slug).toBeDefined();
    expect(industry.description).toBeDefined();

    console.log(`✓ Industry "${industry.title}" has all required fields`);
  });

  test('Resources should have all required fields', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/resources?depth=0&limit=1`);
    const data = await response.json();

    const resource = data.docs[0];

    // Required fields
    expect(resource.title).toBeDefined();
    expect(resource.slug).toBeDefined();
    expect(resource.category).toBeDefined();

    console.log(`✓ Resource "${resource.title}" has all required fields`);
  });
});

test.describe('Data Integrity - Counts Match', () => {
  test('Services count should be exactly 4', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/services?depth=0`);
    const data = await response.json();

    expect(data.totalDocs).toBe(4);
    expect(data.docs.length).toBe(4);

    console.log(`✓ Services: ${data.totalDocs} total`);
  });

  test('Industries count should be exactly 4', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/industries?depth=0`);
    const data = await response.json();

    expect(data.totalDocs).toBe(4);
    expect(data.docs.length).toBe(4);

    console.log(`✓ Industries: ${data.totalDocs} total`);
  });

  test('Resources count should be exactly 50', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/resources?depth=0`);
    const data = await response.json();

    expect(data.totalDocs).toBe(50);

    console.log(`✓ Resources: ${data.totalDocs} total`);
  });
});

test.describe('Data Integrity - No Errors', () => {
  test('All service API calls should return 200', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/services?depth=0`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.errors).toBeUndefined();

    console.log('✓ Services API returns clean data');
  });

  test('All industry API calls should return 200', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/industries?depth=0`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.errors).toBeUndefined();

    console.log('✓ Industries API returns clean data');
  });

  test('All resource API calls should return 200', async ({ request }) => {
    const response = await request.get(`${ADMIN_URL}/api/resources?depth=0`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.errors).toBeUndefined();

    console.log('✓ Resources API returns clean data');
  });

  test('Individual service fetch should work', async ({ request }) => {
    // First get all services
    const listResponse = await request.get(`${ADMIN_URL}/api/services?depth=0&limit=1`);
    const listData = await listResponse.json();

    const firstService = listData.docs[0];

    // Fetch individual service by ID
    const response = await request.get(`${ADMIN_URL}/api/services/${firstService.id}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe(firstService.id);

    console.log(`✓ Individual service fetch works: ${data.title}`);
  });
});
