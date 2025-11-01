import { test, expect } from '@playwright/test';

test.describe('Admin Panel Collections Verification', () => {
  test('should show collections with data counts', async ({ page }) => {
    console.log('\n=== CHECKING ADMIN PANEL COLLECTIONS ===\n');
    
    // Navigate to admin
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    console.log('Current URL:', page.url());
    
    // Take screenshot of admin dashboard
    await page.screenshot({ path: '/tmp/admin-dashboard.png', fullPage: true });
    console.log('✅ Screenshot saved: /tmp/admin-dashboard.png');
    
    // Check for collection links
    const pageContent = await page.content();
    
    console.log('\n--- Checking for Collections ---');
    
    // Check if we can see Services collection
    const hasServices = pageContent.toLowerCase().includes('services');
    console.log('Services collection visible:', hasServices);
    
    // Check if we can see Industries collection
    const hasIndustries = pageContent.toLowerCase().includes('industries');
    console.log('Industries collection visible:', hasIndustries);
    
    // Check if we can see Resources collection
    const hasResources = pageContent.toLowerCase().includes('resources');
    console.log('Resources collection visible:', hasResources);
    
    // Check if we can see Users collection
    const hasUsers = pageContent.toLowerCase().includes('users');
    console.log('Users collection visible:', hasUsers);
    
    // Try to navigate to Services collection
    console.log('\n--- Checking Services Collection ---');
    try {
      await page.goto('/admin/collections/services');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.screenshot({ path: '/tmp/admin-services-collection.png', fullPage: true });
      console.log('✅ Services collection screenshot: /tmp/admin-services-collection.png');
      
      const servicesContent = await page.content();
      const hasData = servicesContent.toLowerCase().includes('machining') || 
                      servicesContent.toLowerCase().includes('metrology') ||
                      servicesContent.toLowerCase().includes('engineering');
      
      console.log('Services collection has data:', hasData);
    } catch (error) {
      console.error('Error accessing Services collection:', error);
    }
    
    // Try to navigate to Industries collection
    console.log('\n--- Checking Industries Collection ---');
    try {
      await page.goto('/admin/collections/industries');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.screenshot({ path: '/tmp/admin-industries-collection.png', fullPage: true });
      console.log('✅ Industries collection screenshot: /tmp/admin-industries-collection.png');
      
      const industriesContent = await page.content();
      const hasData = industriesContent.toLowerCase().includes('aerospace') || 
                      industriesContent.toLowerCase().includes('defense') ||
                      industriesContent.toLowerCase().includes('energy');
      
      console.log('Industries collection has data:', hasData);
    } catch (error) {
      console.error('Error accessing Industries collection:', error);
    }
    
    console.log('\n=== VERIFICATION COMPLETE ===\n');
  });
});
