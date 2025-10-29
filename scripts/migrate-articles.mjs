import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

async function migrateArticles() {
  const articlesDir = path.join(__dirname, '../content/technical-articles');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

  console.log(`\nFound ${files.length} articles to migrate...\n`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const filePath = path.join(articlesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const article = JSON.parse(content);

      // Generate a unique _id based on slug
      const _id = `resource-${article.slug.current}`;

      const doc = {
        ...article,
        _id,
        contentStatus: 'published',
      };

      await client.createOrReplace(doc);
      console.log(`✓ ${article.title}`);
      success++;
    } catch (error) {
      console.error(`✗ Failed to migrate ${file}:`, error.message);
      failed++;
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Migration Complete!`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✓ Success: ${success}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

migrateArticles().catch(console.error);
