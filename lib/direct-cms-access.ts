/**
 * Direct MongoDB access for CMS data
 * Used as a fallback when Payload CMS fails to initialize in serverless environment
 */

import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || ''
const DB_NAME = 'precision-manufacturing'

let cachedClient: MongoClient | null = null
let cachedDb: any = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Icon name mapping (same as get-cms-data.ts)
const iconNameMap: Record<string, string> = {
  '5-axis-machining': 'Cog',
  'adaptive-machining': 'Cpu',
  'metrology': 'Gauge',
  'engineering': 'Users',
  'defense': 'Shield',
  'energy': 'Zap',
  'aerospace': 'Plane',
  'medical': 'Heart',
}

export async function getServicesFromDB() {
  try {
    const { db } = await connectToDatabase()
    const services = await db
      .collection('services')
      .find({})
      .sort({ order: 1 })
      .limit(1000)
      .toArray()

    console.log('[DirectDB] ✓ Fetched', services.length, 'services')

    return services.map((service: any) => ({
      title: service.title,
      description: service.shortDescription || service.description,
      iconName: iconNameMap[service.slug] || 'Cog',
      href: `/services/${service.slug}`,
      specs: service.specs || [],
      image: service.image,
      highlight: service.highlight || false,
    }))
  } catch (error) {
    console.error('[DirectDB] Error fetching services:', error)
    return []
  }
}

export async function getIndustriesFromDB() {
  try {
    const { db } = await connectToDatabase()
    const industries = await db
      .collection('industries')
      .find({})
      .sort({ order: 1 })
      .limit(1000)
      .toArray()

    console.log('[DirectDB] ✓ Fetched', industries.length, 'industries')

    return industries.map((industry: any) => ({
      title: industry.title,
      description: industry.shortDescription || industry.description,
      iconName: iconNameMap[industry.slug] || 'Plane',
      href: `/industries/${industry.slug}`,
      features: industry.features || [],
      image: industry.image,
    }))
  } catch (error) {
    console.error('[DirectDB] Error fetching industries:', error)
    return []
  }
}

export async function getServiceBySlugFromDB(slug: string) {
  try {
    const { db } = await connectToDatabase()
    const service = await db.collection('services').findOne({ slug })

    if (!service) {
      console.log(`[DirectDB] ⚠️  Service not found: ${slug}`)
      return null
    }

    console.log(`[DirectDB] ✓ Fetched service: ${service.title}`)

    return {
      title: service.title,
      slug: service.slug,
      description: service.description,
      hero: service.hero,
      overview: service.overview,
      capabilities: service.capabilities,
      technicalSpecs: service.technicalSpecs,
      process: service.process,
      equipment: service.equipment,
      seo: service.seo,
      services: service.services || [],
      materials: service.materials || [],
      processes: service.processes || [],
    }
  } catch (error) {
    console.error(`[DirectDB] Error fetching service ${slug}:`, error)
    return null
  }
}

export async function getIndustryBySlugFromDB(slug: string) {
  try {
    const { db } = await connectToDatabase()
    const industry = await db.collection('industries').findOne({ slug })

    if (!industry) {
      console.log(`[DirectDB] ⚠️  Industry not found: ${slug}`)
      return null
    }

    console.log(`[DirectDB] ✓ Fetched industry: ${industry.title}`)

    return {
      title: industry.title,
      slug: industry.slug,
      description: industry.description,
      hero: industry.hero,
      overview: industry.overview,
      capabilities: industry.capabilities,
      regulatory: industry.regulatory,
      applications: industry.applications,
      seo: industry.seo,
      components: industry.components || [],
      qualityStandards: industry.qualityStandards || [],
      processBenefits: industry.processBenefits || [],
    }
  } catch (error) {
    console.error(`[DirectDB] Error fetching industry ${slug}:`, error)
    return null
  }
}

export async function getAllResourcesFromDB() {
  try {
    const { db } = await connectToDatabase()
    const resources = await db
      .collection('resources')
      .find({})
      .sort({ publishDate: -1 })
      .limit(1000)
      .toArray()

    console.log('[DirectDB] ✓ Fetched', resources.length, 'resources')

    return resources.map((resource: any) => ({
      _id: resource._id.toString(),
      title: resource.title,
      slug: resource.slug,
      excerpt: resource.excerpt,
      category: resource.category,
      difficulty: resource.difficulty,
      readTime: resource.readTime,
      publishDate: resource.publishDate,
      author: resource.author,
      featured: resource.featured,
      tags: resource.tags || [],
    }))
  } catch (error) {
    console.error('[DirectDB] Error fetching resources:', error)
    return []
  }
}

export async function getResourcesByCategoryFromDB(category: string) {
  try {
    const { db } = await connectToDatabase()
    const resources = await db
      .collection('resources')
      .find({ category })
      .sort({ publishDate: -1 })
      .limit(1000)
      .toArray()

    console.log(`[DirectDB] ✓ Fetched ${resources.length} resources for category: ${category}`)

    return resources.map((resource: any) => ({
      _id: resource._id.toString(),
      title: resource.title,
      slug: resource.slug,
      excerpt: resource.excerpt,
      category: resource.category,
      difficulty: resource.difficulty,
      readTime: resource.readTime,
      publishDate: resource.publishDate,
      author: resource.author,
      featured: resource.featured,
      tags: resource.tags || [],
    }))
  } catch (error) {
    console.error(`[DirectDB] Error fetching resources for category ${category}:`, error)
    return []
  }
}

export async function getResourceBySlugFromDB(category: string, slug: string) {
  try {
    const { db } = await connectToDatabase()
    const resource = await db.collection('resources').findOne({ category, slug })

    if (!resource) {
      console.log(`[DirectDB] ⚠️  Resource not found: ${slug} in category ${category}`)
      return null
    }

    console.log(`[DirectDB] ✓ Fetched resource: ${resource.title}`)

    return {
      title: resource.title,
      slug: resource.slug,
      excerpt: resource.excerpt,
      content: resource.content,
      category: resource.category,
      difficulty: resource.difficulty,
      readTime: resource.readTime,
      publishDate: resource.publishDate,
      author: resource.author,
      featured: resource.featured,
      tags: resource.tags || [],
      seo: resource.seo,
    }
  } catch (error) {
    console.error(`[DirectDB] Error fetching resource ${slug}:`, error)
    return null
  }
}

export async function getPageContentFromDB(pageName: string) {
  try {
    const { db } = await connectToDatabase()
    const pageContent = await db.collection('page-content').findOne({ pageName })

    if (!pageContent) {
      console.log(`[DirectDB] Page content not found for: ${pageName}`)
      return null
    }

    console.log(`[DirectDB] ✓ Fetched page content for: ${pageName}`)
    return {
      pageName: pageContent.pageName,
      capabilities: pageContent.capabilities || [],
      qualityAssurance: pageContent.qualityAssurance || [],
      hero: pageContent.hero || null,
      sections: pageContent.sections || [],
    }
  } catch (error) {
    console.error(`[DirectDB] Error fetching page content for ${pageName}:`, error)
    return null
  }
}
