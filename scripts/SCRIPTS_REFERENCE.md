# Resources Migration Scripts Reference

Quick reference guide for all resource migration scripts.

---

## 📦 Available Scripts

### 1. migrate-resources.mjs
**Purpose**: Migrate all MDX resource files to MongoDB

```bash
node scripts/migrate-resources.mjs
```

**What it does**:
- ✅ Reads 50 MDX files from 5 content directories
- ✅ Parses frontmatter and content
- ✅ Transforms to Payload CMS schema
- ✅ Converts Markdown to Slate rich text
- ✅ Upserts to MongoDB (safe to re-run)
- ✅ Creates unique index on slug field
- ✅ Logs detailed progress

**When to use**:
- Initial migration
- After updating MDX files
- Adding new articles
- Re-syncing content

**Output**:
```
Total files found: 50
✅ Successfully migrated: 50
❌ Failed: 0
```

---

### 2. verify-resources-migration.mjs
**Purpose**: Verify migration was successful

```bash
node scripts/verify-resources-migration.mjs
```

**What it does**:
- ✅ Counts total articles
- ✅ Breaks down by category
- ✅ Shows difficulty distribution
- ✅ Analyzes tags
- ✅ Checks for missing fields
- ✅ Displays sample article details

**When to use**:
- After migration to confirm success
- Debugging data issues
- Checking data integrity
- Generating reports

**Output**:
```
📊 Total articles: 50
Articles by Category: [breakdown]
⭐ Featured articles: 50
✅ All required fields present!
```

---

### 3. sample-resources-queries.mjs
**Purpose**: Demonstrate common query patterns

```bash
node scripts/sample-resources-queries.mjs
```

**What it does**:
- ✅ Shows 10 common query examples
- ✅ Demonstrates filtering
- ✅ Shows text search
- ✅ Examples of aggregation
- ✅ Useful for frontend integration

**When to use**:
- Learning how to query resources
- Testing query patterns
- Frontend development reference
- API integration examples

**Output**:
Shows results for 10 different query patterns

---

### 4. reset-resources-collection.mjs
**Purpose**: Reset or clean up resources collection

```bash
# Reset entire collection (with confirmation)
node scripts/reset-resources-collection.mjs

# Delete specific articles by slug
node scripts/reset-resources-collection.mjs --delete-slugs "slug1,slug2"

# Delete all articles in a category
node scripts/reset-resources-collection.mjs --delete-category "manufacturing-processes"

# Show help
node scripts/reset-resources-collection.mjs --help
```

**What it does**:
- ⚠️ Deletes resources documents
- ⚠️ Requires confirmation for safety
- ⚠️ Can target specific slugs or categories
- ⚠️ Use with extreme caution!

**When to use**:
- Starting fresh migration
- Removing test data
- Cleaning up specific articles
- Emergency reset

**Safety**:
- Requires typing "DELETE ALL RESOURCES" for full reset
- Individual deletes require yes/no confirmation
- **Always backup before using**

---

## 🔄 Common Workflows

### Initial Migration
```bash
# 1. Run migration
node scripts/migrate-resources.mjs

# 2. Verify success
node scripts/verify-resources-migration.mjs

# 3. Test queries
node scripts/sample-resources-queries.mjs
```

### Update Content
```bash
# 1. Edit MDX files in content/resources/
# 2. Re-run migration (safe - uses upsert)
node scripts/migrate-resources.mjs

# 3. Verify changes
node scripts/verify-resources-migration.mjs
```

### Add New Article
```bash
# 1. Create new MDX file in appropriate directory
# 2. Run migration (will add new article only)
node scripts/migrate-resources.mjs

# 3. Verify new article
node scripts/verify-resources-migration.mjs
```

### Reset and Start Over
```bash
# 1. Backup current data (optional but recommended)
mongodump --uri="$MONGODB_URI" --collection=resources

# 2. Reset collection
node scripts/reset-resources-collection.mjs

# 3. Re-run migration
node scripts/migrate-resources.mjs
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Migrate all resources
npm run migrate:resources
# or
node scripts/migrate-resources.mjs

# Verify migration
node scripts/verify-resources-migration.mjs

# Test queries
node scripts/sample-resources-queries.mjs

# Reset collection (with confirmation)
node scripts/reset-resources-collection.mjs

# Delete specific article
node scripts/reset-resources-collection.mjs --delete-slugs "article-slug"

# Delete by category
node scripts/reset-resources-collection.mjs --delete-category "manufacturing-processes"

# Help
node scripts/reset-resources-collection.mjs --help
```

---

## 📊 Data Structure Reference

### MDX Frontmatter Format
```yaml
---
title: "Article Title"
excerpt: "Brief summary..."
publishDate: "2024-01-15"
author: "IIS Technical Team"
difficulty: "Intermediate"
readTime: "12 min read"
tags: ["Tag1", "Tag2", "Tag3"]
category: "Manufacturing Processes"
featured: true
seoTitle: "SEO Title..."
seoDescription: "SEO Description..."
---
```

### MongoDB Document Format
```javascript
{
  title: "Article Title",
  slug: "article-slug",
  excerpt: "Brief summary...",
  content: [...], // Slate rich text blocks
  category: "manufacturing-processes",
  difficulty: "Intermediate",
  readTime: "12 min read",
  publishDate: Date,
  author: "IIS Technical Team",
  featured: true,
  tags: [
    { tag: "Tag1" },
    { tag: "Tag2" }
  ],
  seo: {
    metaTitle: "SEO Title...",
    metaDescription: "SEO Description..."
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Troubleshooting

### Migration Fails
```bash
# Check MongoDB connection
mongosh "$MONGODB_URI"

# Verify environment variables
echo $MONGODB_URI

# Check file permissions
ls -la content/resources/
```

### Missing Articles
```bash
# Count files in each directory
find content/resources/manufacturing-processes -name "*.mdx" | wc -l
find content/resources/industry-applications -name "*.mdx" | wc -l
# etc...

# Run migration again (safe to re-run)
node scripts/migrate-resources.mjs
```

### Data Issues
```bash
# Run verification
node scripts/verify-resources-migration.mjs

# Check specific article
mongosh "$MONGODB_URI" --eval 'db.resources.findOne({slug: "article-slug"})'
```

### Need Fresh Start
```bash
# Backup first (optional)
mongodump --uri="$MONGODB_URI" --collection=resources

# Reset collection
node scripts/reset-resources-collection.mjs

# Re-run migration
node scripts/migrate-resources.mjs
```

---

## 📚 Documentation Files

1. **SCRIPTS_REFERENCE.md** (this file)
   - Quick reference for all scripts

2. **RESOURCES_MIGRATION_README.md**
   - Detailed migration documentation
   - Technical implementation details

3. **MIGRATION_SUMMARY.md**
   - Executive summary of migration
   - Statistics and results

---

## 🔗 Related Commands

### MongoDB Direct Access
```bash
# Connect to MongoDB
mongosh "$MONGODB_URI"

# Count resources
db.resources.countDocuments()

# List all slugs
db.resources.find({}, {slug: 1, _id: 0})

# Find by category
db.resources.find({category: "manufacturing-processes"})
```

### Payload CMS Access
```bash
# Start Payload admin
npm run dev

# Navigate to:
http://localhost:3000/admin

# Go to: Collections → Resources
```

---

## ⚡ Performance Tips

- **Migration**: ~2-3 seconds for 50 files
- **Verification**: ~1 second
- **Queries**: Sub-second (with proper indexes)
- **Reset**: Instant

### Optimization
- Slug field has unique index (fast lookups)
- Category field should be indexed if querying frequently:
  ```javascript
  db.resources.createIndex({ category: 1 })
  ```
- Consider full-text search index for title/excerpt:
  ```javascript
  db.resources.createIndex({ title: "text", excerpt: "text" })
  ```

---

## 🛡️ Safety Guidelines

### Before Destructive Operations
1. ✅ Always verify the command
2. ✅ Backup if working with production data
3. ✅ Test on development environment first
4. ✅ Read confirmation prompts carefully

### Best Practices
- Run migration in development first
- Use version control for MDX files
- Keep backups of MongoDB data
- Document any manual changes
- Test queries before using in production

---

## 📞 Support

### Getting Help
1. Check error messages in console
2. Run verification script
3. Review documentation files
4. Check MongoDB connection
5. Verify MDX file format

### Common Issues
- **Connection Error**: Check MONGODB_URI in .env.local
- **Parse Error**: Verify MDX frontmatter format
- **Duplicate Key**: Slug already exists (safe - will update)
- **Missing Fields**: Check frontmatter has required fields

---

**Last Updated**: October 30, 2025
**Scripts Version**: 1.0
