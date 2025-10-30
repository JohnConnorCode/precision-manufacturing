# Resources Migration Script Documentation

## Overview

This document describes the `migrate-resources.mjs` script that migrates all 50 MDX resource files from the local filesystem into the MongoDB `resources` collection used by Payload CMS.

## Migration Summary

**Execution Date**: 2025-10-30
**Status**: ✅ Complete Success
**Total Files**: 50/50 migrated successfully
**Errors**: 0

### Articles by Category

| Category | Count | Files |
|----------|-------|-------|
| **Manufacturing Processes** | 16 | content/resources/manufacturing-processes/ |
| **Industry Applications** | 9 | content/resources/industry-applications/ |
| **Quality & Compliance** | 9 | content/resources/quality-compliance/ |
| **Material Science** | 8 | content/resources/material-science/ |
| **Calculators & Tools** | 8 | content/resources/calculators-tools/ |

### Article Statistics

- **Difficulty Distribution**:
  - Beginner: 1 article
  - Intermediate: 19 articles
  - Advanced: 30 articles

- **Featured Articles**: 50 (100%)

- **Top Tags**:
  - Manufacturing (27 articles)
  - Aerospace (11 articles)
  - Quality (10 articles)
  - Machining (8 articles)
  - Precision (7 articles)

## Script Features

### 1. MDX Parsing
- Uses `gray-matter` to extract frontmatter and content
- Handles both `.mdx` and `.md` file extensions
- Preserves all frontmatter metadata

### 2. Data Transformation
- **Slug Generation**: Converts filename to URL-friendly slug
  - Example: `5-axis-cnc-machining-aerospace-guide.mdx` → `5-axis-cnc-machining-aerospace-guide`

- **Category Mapping**: Normalizes category names
  - "Manufacturing Processes" → `manufacturing-processes`
  - "Quality & Compliance" → `quality-compliance`
  - Etc.

- **Tags Conversion**: Transforms array format
  - From: `["CNC", "Aerospace", "5-Axis"]`
  - To: `[{tag: "CNC"}, {tag: "Aerospace"}, {tag: "5-Axis"}]`

- **Date Parsing**: Converts string dates to Date objects
  - Handles invalid dates gracefully with fallback to current date

### 3. Content Conversion
- Converts Markdown content to Slate-compatible rich text format
- Creates structured content blocks:
  - Headings (h1-h6)
  - Paragraphs
  - Preserves content structure

### 4. MongoDB Operations
- **Upsert Strategy**: Uses `updateOne` with `upsert: true`
  - Creates new document if slug doesn't exist
  - Updates existing document if slug already exists
  - Prevents duplicates on re-run

- **Indexing**: Creates unique index on `slug` field for performance

### 5. Schema Mapping

Maps MDX frontmatter to Payload CMS schema:

```javascript
{
  title: "Article Title",
  slug: "article-slug",
  excerpt: "Brief summary...",
  content: [...], // Slate rich text blocks
  category: "manufacturing-processes",
  difficulty: "Intermediate",
  readTime: "12 min read",
  publishDate: Date object,
  author: "IIS Technical Team",
  featured: true,
  tags: [{tag: "Tag1"}, {tag: "Tag2"}],
  seo: {
    metaTitle: "SEO Title",
    metaDescription: "SEO Description"
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

### Prerequisites

1. **Environment Variables** (`.env.local`):
   ```bash
   MONGODB_URI=mongodb+srv://...
   PAYLOAD_SECRET=your-secret
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

2. **Dependencies** (already installed):
   - `gray-matter` - MDX frontmatter parsing
   - `mongodb` - MongoDB driver
   - `dotenv` - Environment variable loading

### Running the Migration

```bash
# Migrate all resources
node scripts/migrate-resources.mjs

# Verify migration
node scripts/verify-resources-migration.mjs
```

### Re-running the Migration

The script is **safe to re-run** multiple times:
- Uses upsert to avoid duplicates
- Updates existing records based on slug
- No data loss on re-execution

## File Structure

```
scripts/
├── migrate-resources.mjs              # Main migration script
├── verify-resources-migration.mjs     # Verification script
└── RESOURCES_MIGRATION_README.md      # This file

content/resources/
├── manufacturing-processes/           # 16 MDX files
├── industry-applications/             # 9 MDX files
├── quality-compliance/                # 9 MDX files
├── material-science/                  # 8 MDX files
└── calculators-tools/                 # 8 MDX files
```

## Verification Results

All quality checks passed:

✅ All 50 files processed successfully
✅ All required fields present (title, slug, excerpt, content, category)
✅ No missing or malformed data
✅ Proper category distribution
✅ All tags properly formatted
✅ SEO metadata preserved
✅ Date fields correctly parsed

## Sample Migrated Article

**Title**: Complete Guide to 5-Axis CNC Machining for Aerospace
**Slug**: `5-axis-cnc-machining-aerospace-guide`
**Category**: manufacturing-processes
**Difficulty**: Intermediate
**Author**: IIS Technical Team
**Read Time**: 12 min read
**Featured**: true
**Tags**: CNC, Aerospace, 5-Axis, Manufacturing, Precision
**Content Blocks**: 69 (paragraphs, headings, etc.)

## Error Handling

The script includes comprehensive error handling:

1. **File Reading Errors**: Logged with filename and error message
2. **Parsing Errors**: Skips file and continues with others
3. **MongoDB Errors**: Catches and reports connection/query errors
4. **Data Validation**: Provides fallback values for missing fields

Error format:
```
❌ filename.mdx - Error: Description of error
```

## MongoDB Collection Schema

The `resources` collection in MongoDB matches the Payload CMS schema defined in `payload.config.ts`:

- **Collection**: `resources`
- **Database**: `precision-manufacturing`
- **Index**: Unique index on `slug` field

## Next Steps

After migration, the articles are accessible via:

1. **Payload CMS Admin**:
   - URL: `http://localhost:3000/admin`
   - Navigate to Collections → Resources

2. **API Endpoints**:
   - List all: `GET /api/resources`
   - Get by slug: `GET /api/resources?where[slug][equals]=article-slug`
   - Get by category: `GET /api/resources?where[category][equals]=manufacturing-processes`

3. **Frontend Integration**:
   - Query resources collection using Payload local API
   - Filter by category, difficulty, featured status
   - Display rich text content using Slate renderer

## Troubleshooting

### Connection Issues
```bash
# Check MongoDB URI in .env.local
echo $MONGODB_URI

# Test connection
mongosh "$MONGODB_URI"
```

### Missing Dependencies
```bash
npm install gray-matter mongodb dotenv
```

### Re-run Migration
```bash
# Safe to run multiple times (uses upsert)
node scripts/migrate-resources.mjs
```

## Technical Notes

### Content Format

The script converts Markdown to a simple Slate format. For more advanced rendering (code blocks, tables, lists), the `convertMarkdownToSlate()` function can be enhanced to:

1. Parse code blocks with syntax highlighting
2. Convert tables to structured format
3. Handle ordered/unordered lists
4. Preserve inline formatting (bold, italic, links)

### Performance

- Migration completes in ~2-3 seconds for 50 files
- Uses batch operations where possible
- Index creation happens once at startup

### Data Integrity

- Unique slug constraint prevents duplicates
- Upsert strategy allows idempotent execution
- All dates stored as ISO Date objects
- Tags normalized to consistent format

## Maintenance

### Adding New Articles

1. Create new MDX file in appropriate category directory
2. Add frontmatter matching the schema
3. Run migration script to import to database

### Updating Existing Articles

1. Edit MDX file in content directory
2. Re-run migration script (will update via upsert)
3. Changes reflected immediately in database

### Bulk Updates

For bulk updates to all articles:

```javascript
// Example: Add new field to all articles
await collection.updateMany(
  {},
  { $set: { newField: 'default value' } }
);
```

## Support

For issues or questions:
- Review error messages in console output
- Run verification script to check data integrity
- Check MongoDB connection and credentials
- Verify MDX file frontmatter format matches schema

---

**Last Updated**: 2025-10-30
**Script Version**: 1.0
**Maintainer**: Development Team
