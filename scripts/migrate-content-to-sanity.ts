import { createClient } from '@sanity/client'
import { getAllArticles } from '../lib/content'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need to set this environment variable
})

// Convert MDX content to Sanity portable text format
function convertMDXToPortableText(mdxContent: string) {
  // This is a simplified conversion - in production you'd want a more robust MDX to Portable Text converter
  const blocks: any[] = []

  // Split content by lines and process
  const lines = mdxContent.split('\n')
  let currentBlock: any = null
  let inCodeBlock = false
  let codeLanguage = ''
  let codeContent: string[] = []

  for (const line of lines) {
    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim() || 'text'
        codeContent = []
      } else {
        // End code block
        blocks.push({
          _type: 'codeBlock',
          language: codeLanguage,
          code: codeContent.join('\n'),
        })
        inCodeBlock = false
        codeContent = []
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Handle CalloutBox components
    if (line.includes('<CalloutBox')) {
      const typeMatch = line.match(/type="([^"]+)"/)
      const titleMatch = line.match(/title="([^"]+)"/)
      const contentMatch = mdxContent.match(new RegExp(`${line}([\\s\\S]*?)</CalloutBox>`))

      if (typeMatch && titleMatch && contentMatch) {
        blocks.push({
          _type: 'calloutBox',
          type: typeMatch[1],
          title: titleMatch[1],
          content: contentMatch[1].trim(),
        })
      }
      continue
    }

    // Handle TechnicalSpecs components
    if (line.includes('<TechnicalSpecs')) {
      // Extract specs array from the component
      const specsMatch = line.match(/specs=\{(\[[\s\S]*?\])\}/)
      if (specsMatch) {
        try {
          // This is a simplified extraction - in production you'd parse more carefully
          blocks.push({
            _type: 'technicalSpecs',
            specs: [
              // You'd parse the actual specs here
            ],
          })
        } catch (e) {
          console.error('Error parsing technical specs:', e)
        }
      }
      continue
    }

    // Handle CTAButton components
    if (line.includes('<CTAButton')) {
      const hrefMatch = line.match(/href="([^"]+)"/)
      const variantMatch = line.match(/variant="([^"]+)"/)
      const textMatch = mdxContent.match(new RegExp(`${line}>([\\s\\S]*?)</CTAButton>`))

      if (hrefMatch && textMatch) {
        blocks.push({
          _type: 'ctaButton',
          href: hrefMatch[1],
          text: textMatch[1].trim(),
          variant: variantMatch ? variantMatch[1] : 'primary',
        })
      }
      continue
    }

    // Skip MDX component closing tags
    if (line.includes('</CalloutBox>') || line.includes('</CTAButton>')) {
      continue
    }

    // Handle headings
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.replace(/^#+\s*/, '')
      blocks.push({
        _type: 'block',
        style: `h${level}`,
        children: [
          {
            _type: 'span',
            text: text,
          },
        ],
      })
      continue
    }

    // Handle lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: line.slice(2),
          },
        ],
      })
      continue
    }

    if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\. /, '')
      blocks.push({
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: text,
          },
        ],
      })
      continue
    }

    // Handle regular paragraphs
    if (line.trim()) {
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: line,
          },
        ],
      })
    }
  }

  return blocks
}

async function migrateContent() {
  console.log('Starting content migration to Sanity...')

  try {
    // Get all MDX articles
    const articles = getAllArticles()
    console.log(`Found ${articles.length} articles to migrate`)

    for (const article of articles) {
      console.log(`Migrating: ${article.metadata.title}`)

      // Map category names to slugs
      const categoryMap: Record<string, string> = {
        'Manufacturing Processes': 'manufacturing-processes',
        'Material Science': 'material-science',
        'Quality & Compliance': 'quality-compliance',
        'Industry Applications': 'industry-applications',
        'Calculators & Tools': 'calculators-tools',
      }

      const categorySlug = categoryMap[article.metadata.category] || 'manufacturing-processes'

      // Read the full MDX content
      const filePath = path.join(
        process.cwd(),
        'content',
        'resources',
        categorySlug,
        `${article.slug}.mdx`
      )

      let fullContent = ''
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { content } = matter(fileContent)
        fullContent = content
      }

      // Convert content to Portable Text
      const portableTextContent = convertMDXToPortableText(fullContent)

      // Create Sanity document
      const doc = {
        _type: 'resource',
        title: article.metadata.title,
        slug: {
          current: article.slug,
        },
        excerpt: article.metadata.excerpt,
        category: categorySlug,
        difficulty: article.metadata.difficulty,
        readTime: article.metadata.readTime,
        author: article.metadata.author,
        publishDate: article.metadata.publishDate,
        featured: article.metadata.featured || false,
        tags: article.metadata.tags,
        content: portableTextContent,
        seoTitle: article.metadata.seoTitle || article.metadata.title,
        seoDescription: article.metadata.seoDescription || article.metadata.excerpt,
        canonicalUrl: article.metadata.canonicalUrl,
      }

      // Create or update document in Sanity
      const result = await client.createOrReplace({
        _id: `resource-${article.slug}`,
        ...doc,
      })

      console.log(`✅ Migrated: ${article.metadata.title}`)
    }

    console.log('\n✨ Migration complete!')
    console.log(`Successfully migrated ${articles.length} articles to Sanity CMS`)

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateContent()