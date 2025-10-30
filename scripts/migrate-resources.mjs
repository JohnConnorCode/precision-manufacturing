import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/precision-manufacturing';

// Content directories to process
const CONTENT_DIRECTORIES = [
  {
    path: 'content/resources/manufacturing-processes',
    category: 'manufacturing-processes',
    expectedCount: 16,
  },
  {
    path: 'content/resources/industry-applications',
    category: 'industry-applications',
    expectedCount: 9,
  },
  {
    path: 'content/resources/quality-compliance',
    category: 'quality-compliance',
    expectedCount: 9,
  },
  {
    path: 'content/resources/material-science',
    category: 'material-science',
    expectedCount: 8,
  },
  {
    path: 'content/resources/calculators-tools',
    category: 'calculators-tools',
    expectedCount: 8,
  },
];

/**
 * Convert filename to slug
 * e.g., "5-axis-cnc-machining-aerospace-guide.mdx" -> "5-axis-cnc-machining-aerospace-guide"
 */
function filenameToSlug(filename) {
  return filename.replace(/\.mdx?$/, '');
}

/**
 * Map category display name to slug
 */
function mapCategoryToSlug(categoryName) {
  const categoryMap = {
    'Manufacturing Processes': 'manufacturing-processes',
    'Industry Applications': 'industry-applications',
    'Quality & Compliance': 'quality-compliance',
    'Quality Compliance': 'quality-compliance',
    'Material Science': 'material-science',
    'Calculators & Tools': 'calculators-tools',
    'Calculators Tools': 'calculators-tools',
  };

  return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
}

/**
 * Convert markdown content to Slate-compatible rich text format
 * For now, we'll store as simple text blocks - can be enhanced later
 */
function convertMarkdownToSlate(markdown) {
  // Split by paragraphs and create basic Slate structure
  const paragraphs = markdown.split('\n\n').filter(p => p.trim());

  return paragraphs.map(paragraph => {
    const trimmed = paragraph.trim();

    // Check if it's a heading
    if (trimmed.startsWith('#')) {
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#+\s*/, '');
      return {
        type: `h${Math.min(level, 6)}`,
        children: [{ text }],
      };
    }

    // Regular paragraph
    return {
      type: 'paragraph',
      children: [{ text: trimmed }],
    };
  });
}

/**
 * Parse a single MDX file and extract frontmatter + content
 */
function parseMDXFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    return {
      frontmatter,
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Transform MDX data to Payload CMS format
 */
function transformToPayloadFormat(filename, mdxData, categorySlug) {
  const { frontmatter, content } = mdxData;

  // Generate slug from filename
  const slug = filenameToSlug(filename);

  // Map category from frontmatter or use directory category
  const category = frontmatter.category
    ? mapCategoryToSlug(frontmatter.category)
    : categorySlug;

  // Convert tags array from ["CNC", "Aerospace"] format to [{tag: "CNC"}, {tag: "Aerospace"}]
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.map(tag => ({ tag: String(tag).trim() }))
    : [];

  // Parse publishDate
  let publishDate = new Date();
  if (frontmatter.publishDate) {
    publishDate = new Date(frontmatter.publishDate);
    // If invalid date, use current date
    if (isNaN(publishDate.getTime())) {
      publishDate = new Date();
    }
  }

  // Convert content to Slate format
  const richTextContent = convertMarkdownToSlate(content);

  // Build the document structure matching Payload schema
  const document = {
    title: frontmatter.title || 'Untitled',
    slug,
    excerpt: frontmatter.excerpt || '',
    content: richTextContent,
    category,
    difficulty: frontmatter.difficulty || 'Intermediate',
    readTime: frontmatter.readTime || '10 min read',
    publishDate,
    author: frontmatter.author || 'IIS Technical Team',
    featured: frontmatter.featured === true || frontmatter.featured === 'true',
    tags,
    seo: {
      metaTitle: frontmatter.seoTitle || frontmatter.title || '',
      metaDescription: frontmatter.seoDescription || frontmatter.excerpt || '',
    },
    // Payload CMS metadata
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return document;
}

/**
 * Read all MDX files from a directory
 */
function readMDXFiles(directoryPath) {
  const fullPath = path.join(process.cwd(), directoryPath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`);
    return [];
  }

  const files = fs.readdirSync(fullPath);
  const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

  return mdxFiles.map(file => ({
    filename: file,
    fullPath: path.join(fullPath, file),
  }));
}

/**
 * Main migration function
 */
async function migrateResources() {
  console.log('========================================');
  console.log('MDX Resources Migration to Payload CMS');
  console.log('========================================\n');

  let client;
  let totalFiles = 0;
  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();
    const collection = db.collection('resources');

    // Create index on slug for faster upserts
    await collection.createIndex({ slug: 1 }, { unique: true });

    // Process each content directory
    for (const directory of CONTENT_DIRECTORIES) {
      console.log(`\n📁 Processing: ${directory.path}`);
      console.log(`   Category: ${directory.category}`);
      console.log(`   Expected: ${directory.expectedCount} files`);

      const files = readMDXFiles(directory.path);
      console.log(`   Found: ${files.length} files\n`);

      if (files.length !== directory.expectedCount) {
        console.warn(`   ⚠️  Warning: Expected ${directory.expectedCount} files, found ${files.length}\n`);
      }

      totalFiles += files.length;

      // Process each file
      for (const { filename, fullPath } of files) {
        try {
          // Parse MDX file
          const mdxData = parseMDXFile(fullPath);

          if (!mdxData) {
            errors.push({ file: filename, error: 'Failed to parse MDX file' });
            errorCount++;
            console.log(`   ❌ ${filename} - Failed to parse`);
            continue;
          }

          // Transform to Payload format
          const document = transformToPayloadFormat(filename, mdxData, directory.category);

          // Upsert to MongoDB (update if exists, insert if new)
          const result = await collection.updateOne(
            { slug: document.slug },
            { $set: document },
            { upsert: true }
          );

          const action = result.upsertedCount > 0 ? 'Created' : 'Updated';
          console.log(`   ✅ ${action}: ${document.title}`);
          console.log(`      Slug: ${document.slug}`);
          console.log(`      Category: ${document.category}`);
          console.log(`      Difficulty: ${document.difficulty}`);
          console.log(`      Featured: ${document.featured}`);
          console.log(`      Tags: ${document.tags.map(t => t.tag).join(', ')}`);
          console.log('');

          successCount++;
        } catch (error) {
          errors.push({ file: filename, error: error.message });
          errorCount++;
          console.log(`   ❌ ${filename} - Error: ${error.message}\n`);
        }
      }
    }

    // Print summary
    console.log('\n========================================');
    console.log('Migration Summary');
    console.log('========================================');
    console.log(`Total files found: ${totalFiles}`);
    console.log(`✅ Successfully migrated: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(({ file, error }) => {
        console.log(`   - ${file}: ${error}`);
      });
    }

    // Verify by category
    console.log('\n📊 Articles by Category:');
    for (const directory of CONTENT_DIRECTORIES) {
      const count = await collection.countDocuments({ category: directory.category });
      console.log(`   ${directory.category}: ${count} articles`);
    }

    // Count featured articles
    const featuredCount = await collection.countDocuments({ featured: true });
    console.log(`\n⭐ Featured articles: ${featuredCount}`);

    console.log('\n✅ Migration complete!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

// Run migration
migrateResources().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
