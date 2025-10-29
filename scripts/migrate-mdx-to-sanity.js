const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { JSDOM } = require('jsdom');
const { htmlToBlocks } = require('@sanity/block-tools');
const { createClient } = require('@sanity/client');

// Get Sanity config from env
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN, // Need write token
});

// Schema for block content
const blockContentType = {
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
    { title: 'H4', value: 'h4' },
    { title: 'Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Code', value: 'code' },
    ],
    annotations: [
      {
        title: 'URL',
        name: 'link',
        type: 'object',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
          },
        ],
      },
    ],
  },
};

function markdownToPortableText(markdown) {
  try {
    // Convert markdown to HTML
    const html = marked.parse(markdown);

    // Create DOM from HTML
    const dom = new JSDOM(html);

    // Convert HTML to Portable Text blocks
    const blocks = htmlToBlocks(html, blockContentType, {
      parseHtml: (htmlString) => new JSDOM(htmlString).window.document,
    });

    return blocks;
  } catch (error) {
    console.error('Error converting markdown:', error);
    return [];
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getCategorySlug(category) {
  const categoryMap = {
    'Manufacturing Processes': 'manufacturing-processes',
    'Material Science': 'material-science',
    'Quality & Compliance': 'quality-compliance',
    'Quality Compliance': 'quality-compliance',
    'Industry Applications': 'industry-applications',
    'Calculators & Tools': 'calculators-tools',
    'Calculators Tools': 'calculators-tools',
  };
  return categoryMap[category] || slugify(category);
}

async function migrateMDXFiles() {
  const contentDir = path.join(__dirname, '../content/resources');
  const categories = fs.readdirSync(contentDir);

  let totalProcessed = 0;
  let totalSuccess = 0;
  let totalFailed = 0;

  console.log('Starting MDX to Sanity migration...\n');

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);

    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'));

    console.log(`\n📁 Processing category: ${category} (${files.length} files)`);

    for (const file of files) {
      totalProcessed++;
      const filePath = path.join(categoryPath, file);

      try {
        // Read and parse MDX file
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        // Create slug from filename
        const slug = file.replace('.mdx', '');

        // Convert markdown content to Portable Text
        const portableTextContent = markdownToPortableText(content);

        // Prepare Sanity document
        const document = {
          _type: 'resource',
          title: frontmatter.title,
          slug: {
            _type: 'slug',
            current: slug,
          },
          excerpt: frontmatter.excerpt || '',
          category: getCategorySlug(frontmatter.category || category),
          difficulty: frontmatter.difficulty || 'Intermediate',
          readTime: frontmatter.readTime || '10 min read',
          author: frontmatter.author || 'IIS Technical Team',
          publishDate: frontmatter.publishDate || new Date().toISOString(),
          featured: frontmatter.featured || false,
          tags: frontmatter.tags || [],
          content: portableTextContent,
          seoTitle: frontmatter.seoTitle || frontmatter.title,
          seoDescription: frontmatter.seoDescription || frontmatter.excerpt,
        };

        // Check if document already exists
        const existing = await client.fetch(
          `*[_type == "resource" && slug.current == $slug][0]`,
          { slug }
        );

        if (existing) {
          // Update existing document
          await client
            .patch(existing._id)
            .set(document)
            .commit();
          console.log(`✅ Updated: ${frontmatter.title}`);
        } else {
          // Create new document
          await client.create(document);
          console.log(`✅ Created: ${frontmatter.title}`);
        }

        totalSuccess++;

      } catch (error) {
        totalFailed++;
        console.error(`❌ Failed: ${file}`);
        console.error(`   Error: ${error.message}`);
      }
    }
  }

  console.log(`\n\n=== Migration Complete ===`);
  console.log(`Total processed: ${totalProcessed}`);
  console.log(`Successful: ${totalSuccess}`);
  console.log(`Failed: ${totalFailed}`);
}

// Check if we have a Sanity token
if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_API_TOKEN) {
  console.error('❌ Error: SANITY_WRITE_TOKEN not found in environment variables');
  console.error('Please add SANITY_WRITE_TOKEN to your .env.local file');
  console.error('\nYou can get a token from: https://www.sanity.io/manage');
  process.exit(1);
}

// Run migration
migrateMDXFiles().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});
