import { test, expect } from '@playwright/test';
import { getAdminCredentials } from './helpers/auth.helper';
import { createPayloadAPI } from './helpers/api.helper';

test.describe('CMS - Global Settings', () => {
  let api: ReturnType<typeof createPayloadAPI>;
  const credentials = getAdminCredentials();

  test.beforeEach(async ({ request }) => {
    api = createPayloadAPI();
    await api.authenticate(request, credentials);
  });

  test('should read site settings global', async ({ request }) => {
    const siteSettings = await api.getGlobal(request, 'site-settings');

    expect(siteSettings).toBeDefined();
    expect(siteSettings.company).toBeDefined();
    expect(siteSettings.company.name).toBeDefined();
    expect(siteSettings.contact).toBeDefined();
    expect(siteSettings.contact.email).toBeDefined();
    expect(siteSettings.contact.phone).toBeDefined();
    expect(siteSettings.social).toBeDefined();
  });

  test('should read navigation global', async ({ request }) => {
    const navigation = await api.getGlobal(request, 'navigation');

    expect(navigation).toBeDefined();
    expect(navigation.topBar).toBeDefined();
    expect(navigation.menuItems).toBeDefined();
    expect(Array.isArray(navigation.menuItems)).toBeTruthy();
    expect(navigation.menuItems.length).toBeGreaterThan(0);

    // Verify menu item structure
    const firstMenuItem = navigation.menuItems[0];
    expect(firstMenuItem).toHaveProperty('name');
    expect(firstMenuItem).toHaveProperty('href');
  });

  test('should read footer global', async ({ request }) => {
    const footer = await api.getGlobal(request, 'footer');

    expect(footer).toBeDefined();
    expect(footer.company).toBeDefined();
    expect(footer.social).toBeDefined();
    expect(footer.contact).toBeDefined();
    expect(footer.contact.email).toBeDefined();
    expect(footer.contact.phone).toBeDefined();
  });

  test('should read and validate homepage global', async ({ request }) => {
    const homepage = await api.getGlobal(request, 'homepage');

    expect(homepage).toBeDefined();
    expect(homepage.hero || homepage.heroEnhanced).toBeDefined();

    if (homepage.stats) {
      expect(Array.isArray(homepage.stats)).toBeTruthy();
    }

    if (homepage.technicalSpecs) {
      expect(Array.isArray(homepage.technicalSpecs)).toBeTruthy();
    }
  });

  test('should read ui-text global', async ({ request }) => {
    const uiText = await api.getGlobal(request, 'ui-text');

    expect(uiText).toBeDefined();

    if (uiText.buttons) {
      expect(uiText.buttons).toBeDefined();
      expect(typeof uiText.buttons).toBe('object');
    }

    if (uiText.sections) {
      expect(uiText.sections).toBeDefined();
      expect(typeof uiText.sections).toBe('object');
    }
  });
});
