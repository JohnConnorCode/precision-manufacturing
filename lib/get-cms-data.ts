import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

async function getPayload() {
  return getPayloadHMR({ config: configPromise })
}

// All CMS calls are live-only; no offline mode

const CMS_TIMEOUT_MS = parseInt(process.env.CMS_TIMEOUT_MS || '4000', 10)
type TimeoutSentinel = '__TIMEOUT__'
const TIMEOUT_SENTINEL: TimeoutSentinel = '__TIMEOUT__'

async function raceWithTimeout<T>(promise: Promise<T>, ms = CMS_TIMEOUT_MS): Promise<T | TimeoutSentinel> {
  return Promise.race([
    promise,
    new Promise<TimeoutSentinel>((resolve) => setTimeout(() => resolve(TIMEOUT_SENTINEL), ms)),
  ])
}

async function getPayloadSafe() {
  const res = await raceWithTimeout(getPayload())
  if (res === TIMEOUT_SENTINEL) {
    throw new Error(`CMS init timed out after ${CMS_TIMEOUT_MS}ms`)
  }
  return res
}

async function withTimeoutOr<T>(promise: Promise<T>, fallback: T): Promise<T> {
  const res = await raceWithTimeout(promise)
  if (res === TIMEOUT_SENTINEL) return fallback
  return res as T
}

// Icon name mapping for services and industries
const iconNameMap: Record<string, string> = {
  '5-axis-machining': 'Cog',
  'adaptive-machining': 'Cpu',
  'metrology': 'Gauge',
  'engineering': 'Users',
  'defense': 'Shield',
  'energy': 'Zap',
  'aerospace': 'Plane',
};

export async function getServicesFromCMS() {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'services',
      limit: 1000,
      sort: 'order',
    }), { docs: [] as any[] } as any)

    const services = result.docs || []
    console.log('[CMS] ✓ Fetched', services.length, 'services from Payload')

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
    console.error('Error fetching services from CMS:', error)
    return null
  }
}

export async function getServiceBySlugFromCMS(slug: string) {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    }), { docs: [] as any[] } as any)

    const service = result.docs?.[0]
    if (!service) {
      console.log(`[CMS] ⚠️  Service not found: ${slug}`)
      return null
    }

    console.log(`[CMS] ✓ Fetched service: ${service.title}`)

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
      body: (service as any).body,
      services: service.services || [],
      materials: service.materials || [],
      processes: service.processes || [],
    }
  } catch (error) {
    console.error(`Error fetching service ${slug} from CMS:`, error)
    return null
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'services',
      limit: 1000,
      select: { slug: true },
    }), { docs: [] as any[] } as any)
    return (result.docs || []).map((s: any) => String(s.slug))
  } catch (error) {
    console.error('Error fetching service slugs from CMS:', error)
    return []
  }
}

export async function getIndustriesFromCMS() {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'industries',
      limit: 1000,
      sort: 'order',
    }), { docs: [] as any[] } as any)

    const industries = result.docs || []
    return industries.map((industry: any) => ({
      title: industry.title,
      description: industry.shortDescription || industry.description,
      iconName: iconNameMap[industry.slug] || 'Plane',
      href: `/industries/${industry.slug}`,
      features: industry.features || [],
      image: industry.image,
    }))
  } catch (error) {
    console.error('Error fetching industries from CMS:', error)
    return null
  }
}

export async function getIndustryBySlugFromCMS(slug: string) {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'industries',
      where: { slug: { equals: slug } },
      limit: 1,
    }), { docs: [] as any[] } as any)

    const industry = result.docs?.[0]
    if (!industry) {
      console.log(`[CMS] ⚠️  Industry not found: ${slug}`)
      return null
    }

    console.log(`[CMS] ✓ Fetched industry: ${industry.title}`)

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
    console.error(`Error fetching industry ${slug} from CMS:`, error)
    return null
  }
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'industries',
      limit: 1000,
      select: { slug: true },
    }), { docs: [] as any[] } as any)
    return (result.docs || []).map((i: any) => String(i.slug))
  } catch (error) {
    console.error('Error fetching industry slugs from CMS:', error)
    return []
  }
}

export async function getAllResourcesFromCMS() {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'resources',
      limit: 1000,
      sort: '-publishDate',
    }), { docs: [] as any[] } as any)

    const resources = result.docs || []
    console.log('[CMS] ✓ Fetched', resources.length, 'resources from Payload')

    return resources.map((resource: any) => ({
      _id: resource.id || resource._id,
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
    console.error('Error fetching resources from CMS:', error)
    return null
  }
}

export async function getResourcesByCategoryFromCMS(category: string) {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'resources',
      where: { category: { equals: category } },
      sort: '-publishDate',
      limit: 1000,
    }), { docs: [] as any[] } as any)

    const resources = result.docs || []
    console.log(`[CMS] ✓ Fetched ${resources.length} resources for category: ${category}`)

    return resources.map((resource: any) => ({
      _id: resource.id || resource._id,
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
    console.error(`Error fetching resources for category ${category} from CMS:`, error)
    return null
  }
}

export async function getResourceBySlugFromCMS(category: string, slug: string) {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'resources',
      where: { and: [ { slug: { equals: slug } }, { category: { equals: category } } ] },
      limit: 1,
    }), { docs: [] as any[] } as any)

    const resource = result.docs?.[0]
    if (!resource) {
      console.log(`[CMS] ⚠️  Resource not found: ${slug} in category ${category}`)
      return null
    }

    console.log(`[CMS] ✓ Fetched resource: ${resource.title}`)

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
    console.error(`Error fetching resource ${slug} from CMS:`, error)
    return null
  }
}

export async function getAllResourceSlugs(): Promise<{ category: string; slug: string }[]> {
  try {
    const payload = await getPayloadSafe()
    const result = await withTimeoutOr(payload.find({
      collection: 'resources',
      limit: 1000,
      select: { slug: true, category: true },
    }), { docs: [] as any[] } as any)

    return (result.docs || []).map((r: any) => ({
      category: String(r.category),
      slug: String(r.slug),
    }))
  } catch (error) {
    console.error('Error fetching resource slugs from CMS:', error)
    return []
  }
}

export async function getHomepageFromCMS() {
  try {
    const payload = await getPayloadSafe()
    const homepage: any = await withTimeoutOr(payload.findGlobal({ slug: 'homepage' }), null as any)

    if (!homepage) {
      console.log('[CMS] ⚠️  Homepage global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched homepage data from Payload')

    // Transform badges array format if present
    const transformedHero = homepage.hero ? {
      ...homepage.hero,
      badges: homepage.hero.badges?.map((b: any) => b.badge) || []
    } : null

    return {
      hero: transformedHero,
      stats: homepage.stats,
      cta: homepage.cta,
      technicalSpecs: homepage.technicalSpecs,
      imageShowcase: homepage.imageShowcase,
      resources: homepage.resources,
    }
  } catch (error) {
    console.error('Error fetching homepage from CMS:', error)
    return null
  }
}

export async function getNavigationFromCMS() {
  try {
    const payload = await getPayload()
    const navigation: any = await withTimeoutOr(payload.findGlobal({ slug: 'navigation' }), null as any)

    if (!navigation) {
      console.log('[CMS] ⚠️  Navigation global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched navigation data from Payload')

    return {
      topBar: navigation.topBar,
      menuItems: navigation.menuItems,
      cta: navigation.cta,
    }
  } catch (error) {
    console.error('Error fetching navigation from CMS:', error)
    return null
  }
}

export async function getFooterFromCMS() {
  try {
    const payload = await getPayload()
    const footer: any = await withTimeoutOr(payload.findGlobal({ slug: 'footer' }), null as any)

    if (!footer) {
      console.log('[CMS] ⚠️  Footer global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched footer data from Payload')

    return {
      company: footer.company,
      social: footer.social,
      servicesLinks: footer.servicesLinks,
      resourcesLinks: footer.resourcesLinks,
      quickLinks: footer.quickLinks,
      contact: footer.contact,
      copyright: footer.copyright,
    }
  } catch (error) {
    console.error('Error fetching footer from CMS:', error)
    return null
  }
}

export async function getAboutFromCMS() {
  try {
    const payload = await getPayload()
    const about: any = await withTimeoutOr(payload.findGlobal({ slug: 'about' }), null as any)

    if (!about) {
      console.log('[CMS] ⚠️  About global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched about data from Payload')

    return {
      hero: about.hero,
      companyStats: about.companyStats,
      story: about.story,
      timeline: about.timeline,
      values: about.values,
      leadership: about.leadership,
      capabilities: about.capabilities,
      certifications: about.certifications,
      cta: about.cta,
    }
  } catch (error) {
    console.error('Error fetching about from CMS:', error)
    return null
  }
}

export async function getContactFromCMS() {
  try {
    const payload = await getPayload()
    const contact: any = await withTimeoutOr(payload.findGlobal({ slug: 'contact' }), null as any)

    if (!contact) {
      console.log('[CMS] ⚠️  Contact global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched contact data from Payload')

    return {
      hero: contact.hero,
      contactInfo: contact.contactInfo,
      certifications: contact.certifications,
      bottomStats: contact.bottomStats,
    }
  } catch (error) {
    console.error('Error fetching contact from CMS:', error)
    return null
  }
}

export async function getCareersFromCMS() {
  try {
    const payload = await getPayload()
    const careers: any = await withTimeoutOr(payload.findGlobal({ slug: 'careers' }), null as any)

    if (!careers) {
      console.log('[CMS] ⚠️  Careers global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched careers data from Payload')

    return {
      hero: careers.hero,
      whyWorkHere: careers.whyWorkHere,
      benefits: careers.benefits,
      values: careers.values,
      opportunities: careers.opportunities,
      cta: careers.cta,
    }
  } catch (error) {
    console.error('Error fetching careers from CMS:', error)
    return null
  }
}

export async function getTermsFromCMS() {
  try {
    const payload = await getPayload()
    const terms: any = await withTimeoutOr(payload.findGlobal({ slug: 'terms' }), null as any)

    if (!terms) {
      console.log('[CMS] ⚠️  Terms global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched terms data from Payload')

    return {
      header: terms.header,
      sections: terms.sections,
      contact: terms.contact,
    }
  } catch (error) {
    console.error('Error fetching terms from CMS:', error)
    return null
  }
}

export async function getSupplierRequirementsFromCMS() {
  try {
    const payload = await getPayload()
    const supplierRequirements: any = await withTimeoutOr(payload.findGlobal({ slug: 'supplier-requirements' }), null as any)

    if (!supplierRequirements) {
      console.log('[CMS] ⚠️  Supplier Requirements global not found')
      return null
    }

    console.log('[CMS] ✓ Fetched supplier requirements data from Payload')

    return {
      hero: supplierRequirements.hero,
      sections: supplierRequirements.sections,
      requirements: supplierRequirements.requirements,
      additionalSections: supplierRequirements.additionalSections,
      footerNote: supplierRequirements.footerNote,
    }
  } catch (error) {
    console.error('Error fetching supplier requirements from CMS:', error)
    return null
  }
}
