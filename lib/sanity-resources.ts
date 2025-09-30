import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Resource type definition
export interface Resource {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: string
  author: string
  publishDate: string
  featured: boolean
  tags: string[]
  content: any[]
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
}

// Get all resources
export async function getAllResources(): Promise<Resource[]> {
  return await client.fetch(`
    *[_type == "resource"] | order(publishDate desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      difficulty,
      readTime,
      author,
      publishDate,
      featured,
      tags,
      seoTitle,
      seoDescription
    }
  `)
}

// Get resources by category
export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  return await client.fetch(
    `
    *[_type == "resource" && category == $category] | order(publishDate desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      difficulty,
      readTime,
      author,
      publishDate,
      featured,
      tags,
      seoTitle,
      seoDescription
    }
  `,
    { category }
  )
}

// Get single resource
export async function getResource(slug: string): Promise<Resource | null> {
  const resource = await client.fetch(
    `
    *[_type == "resource" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      difficulty,
      readTime,
      author,
      publishDate,
      featured,
      tags,
      content,
      seoTitle,
      seoDescription,
      canonicalUrl
    }
  `,
    { slug }
  )

  return resource || null
}

// Get related resources
export async function getRelatedResources(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<Resource[]> {
  return await client.fetch(
    `
    *[_type == "resource" && category == $category && slug.current != $currentSlug] | order(publishDate desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      category,
      difficulty,
      readTime,
      author,
      publishDate,
      featured,
      tags
    }
  `,
    { category, currentSlug, limit }
  )
}

// Get featured resources
export async function getFeaturedResources(): Promise<Resource[]> {
  return await client.fetch(`
    *[_type == "resource" && featured == true] | order(publishDate desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      difficulty,
      readTime,
      author,
      publishDate,
      featured,
      tags,
      seoTitle,
      seoDescription
    }
  `)
}

// Category information
export const categoryInfo = {
  'manufacturing-processes': {
    title: 'Manufacturing Processes',
    description: 'Advanced manufacturing techniques, CNC machining, and process optimization guides.',
    slug: 'manufacturing-processes',
  },
  'material-science': {
    title: 'Material Science',
    description: 'Material selection, properties, and application guides for precision manufacturing.',
    slug: 'material-science',
  },
  'quality-compliance': {
    title: 'Quality & Compliance',
    description: 'Quality standards, compliance requirements, and certification guides.',
    slug: 'quality-compliance',
  },
  'industry-applications': {
    title: 'Industry Applications',
    description: 'Industry-specific manufacturing guides for aerospace, defense, medical, and energy.',
    slug: 'industry-applications',
  },
  'calculators-tools': {
    title: 'Calculators & Tools',
    description: 'Interactive tools and calculators for engineering and manufacturing.',
    slug: 'calculators-tools',
  },
}

export function getCategoryInfo(slug: string) {
  return categoryInfo[slug as keyof typeof categoryInfo] || null
}