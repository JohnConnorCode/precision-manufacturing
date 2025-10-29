const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function checkData() {
  try {
    console.log('Fetching all resources...\n');

    const resources = await client.fetch(`
      *[_type == "resource"] | order(publishDate desc) {
        _id,
        title,
        slug,
        category,
        excerpt,
        difficulty,
        publishDate,
        "contentPreview": content[0..2]
      }
    `);

    console.log(`Found ${resources.length} resources\n`);

    resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.title}`);
      console.log(`   Category: ${resource.category}`);
      console.log(`   Slug: ${resource.slug?.current || 'NO SLUG'}`);
      console.log(`   Difficulty: ${resource.difficulty}`);
      console.log(`   Excerpt: ${resource.excerpt?.substring(0, 100)}...`);
      if (resource.contentPreview) {
        console.log(`   Content preview: ${JSON.stringify(resource.contentPreview[0], null, 2).substring(0, 200)}...`);
      }
      console.log('');
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

checkData();
