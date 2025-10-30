import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

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
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const services = await db
      .collection('services')
      .find({})
      .sort({ order: 1 })
      .toArray();

    console.log('[CMS] ✓ Fetched', services.length, 'services from MongoDB');

    // Map MongoDB data to component format
    return services.map((service) => ({
      title: service.title,
      description: service.shortDescription || service.description,
      iconName: iconNameMap[service.slug] || 'Cog',
      href: `/services/${service.slug}`,
      specs: service.specs || [],
      image: service.image,
      highlight: service.highlight || false,
    }));
  } catch (error) {
    console.error('Error fetching services from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getServiceBySlugFromCMS(slug: string) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const service = await db.collection('services').findOne({ slug });

    if (!service) {
      console.log(`[CMS] ⚠️  Service not found: ${slug}`);
      return null;
    }

    console.log(`[CMS] ✓ Fetched service: ${service.title}`);

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
      body: service.body,
      services: service.services || [],
      materials: service.materials || [],
      processes: service.processes || [],
    };
  } catch (error) {
    console.error(`Error fetching service ${slug} from CMS:`, error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getAllServiceSlugs() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const services = await db
      .collection('services')
      .find({}, { projection: { slug: 1 } })
      .toArray();

    return services.map((service) => service.slug);
  } catch (error) {
    console.error('Error fetching service slugs from CMS:', error);
    return [];
  } finally {
    await client.close();
  }
}

export async function getIndustriesFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const industries = await db
      .collection('industries')
      .find({})
      .sort({ order: 1 })
      .toArray();

    // Map MongoDB data to component format
    return industries.map((industry) => ({
      title: industry.title,
      description: industry.shortDescription || industry.description,
      iconName: iconNameMap[industry.slug] || 'Plane',
      href: `/industries/${industry.slug}`,
      features: industry.features || [],
      image: industry.image,
    }));
  } catch (error) {
    console.error('Error fetching industries from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getIndustryBySlugFromCMS(slug: string) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const industry = await db.collection('industries').findOne({ slug });

    if (!industry) {
      console.log(`[CMS] ⚠️  Industry not found: ${slug}`);
      return null;
    }

    console.log(`[CMS] ✓ Fetched industry: ${industry.title}`);

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
    };
  } catch (error) {
    console.error(`Error fetching industry ${slug} from CMS:`, error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getAllIndustrySlugs() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const industries = await db
      .collection('industries')
      .find({}, { projection: { slug: 1 } })
      .toArray();

    return industries.map((industry) => industry.slug);
  } catch (error) {
    console.error('Error fetching industry slugs from CMS:', error);
    return [];
  } finally {
    await client.close();
  }
}

export async function getAllResourcesFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const resources = await db
      .collection('resources')
      .find({})
      .sort({ publishDate: -1 })
      .toArray();

    console.log('[CMS] ✓ Fetched', resources.length, 'resources from MongoDB');

    return resources.map((resource) => ({
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
    }));
  } catch (error) {
    console.error('Error fetching resources from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getResourcesByCategoryFromCMS(category: string) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const resources = await db
      .collection('resources')
      .find({ category })
      .sort({ publishDate: -1 })
      .toArray();

    console.log(`[CMS] ✓ Fetched ${resources.length} resources for category: ${category}`);

    return resources.map((resource) => ({
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
    }));
  } catch (error) {
    console.error(`Error fetching resources for category ${category} from CMS:`, error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getResourceBySlugFromCMS(category: string, slug: string) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const resource = await db.collection('resources').findOne({ slug, category });

    if (!resource) {
      console.log(`[CMS] ⚠️  Resource not found: ${slug} in category ${category}`);
      return null;
    }

    console.log(`[CMS] ✓ Fetched resource: ${resource.title}`);

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
    };
  } catch (error) {
    console.error(`Error fetching resource ${slug} from CMS:`, error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getAllResourceSlugs() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const resources = await db
      .collection('resources')
      .find({}, { projection: { slug: 1, category: 1 } })
      .toArray();

    return resources.map((resource) => ({
      category: resource.category,
      slug: resource.slug,
    }));
  } catch (error) {
    console.error('Error fetching resource slugs from CMS:', error);
    return [];
  } finally {
    await client.close();
  }
}

export async function getHomepageFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const homepage = await db.collection('globals').findOne({ globalType: 'homepage' });

    if (!homepage) {
      console.log('[CMS] ⚠️  Homepage global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched homepage data from MongoDB');

    // Transform badges array format
    const transformedHero = homepage.hero ? {
      ...homepage.hero,
      badges: homepage.hero.badges?.map((b: any) => b.badge) || []
    } : null;

    return {
      hero: transformedHero,
      stats: homepage.stats,
      cta: homepage.cta,
      technicalSpecs: homepage.technicalSpecs,
      imageShowcase: homepage.imageShowcase,
      resources: homepage.resources,
    };
  } catch (error) {
    console.error('Error fetching homepage from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getNavigationFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const navigation = await db.collection('globals').findOne({ globalType: 'navigation' });

    if (!navigation) {
      console.log('[CMS] ⚠️  Navigation global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched navigation data from MongoDB');

    return {
      topBar: navigation.topBar,
      menuItems: navigation.menuItems,
      cta: navigation.cta,
    };
  } catch (error) {
    console.error('Error fetching navigation from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getFooterFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const footer = await db.collection('globals').findOne({ globalType: 'footer' });

    if (!footer) {
      console.log('[CMS] ⚠️  Footer global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched footer data from MongoDB');

    return {
      company: footer.company,
      social: footer.social,
      servicesLinks: footer.servicesLinks,
      resourcesLinks: footer.resourcesLinks,
      quickLinks: footer.quickLinks,
      contact: footer.contact,
      copyright: footer.copyright,
    };
  } catch (error) {
    console.error('Error fetching footer from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getAboutFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const about = await db.collection('globals').findOne({ globalType: 'about' });

    if (!about) {
      console.log('[CMS] ⚠️  About global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched about data from MongoDB');

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
    };
  } catch (error) {
    console.error('Error fetching about from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getContactFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const contact = await db.collection('globals').findOne({ globalType: 'contact' });

    if (!contact) {
      console.log('[CMS] ⚠️  Contact global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched contact data from MongoDB');

    return {
      hero: contact.hero,
      contactInfo: contact.contactInfo,
      certifications: contact.certifications,
      bottomStats: contact.bottomStats,
    };
  } catch (error) {
    console.error('Error fetching contact from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getCareersFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const careers = await db.collection('globals').findOne({ globalType: 'careers' });

    if (!careers) {
      console.log('[CMS] ⚠️  Careers global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched careers data from MongoDB');

    return {
      hero: careers.hero,
      whyWorkHere: careers.whyWorkHere,
      benefits: careers.benefits,
      values: careers.values,
      opportunities: careers.opportunities,
      cta: careers.cta,
    };
  } catch (error) {
    console.error('Error fetching careers from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getTermsFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const terms = await db.collection('globals').findOne({ globalType: 'terms' });

    if (!terms) {
      console.log('[CMS] ⚠️  Terms global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched terms data from MongoDB');

    return {
      header: terms.header,
      sections: terms.sections,
      contact: terms.contact,
    };
  } catch (error) {
    console.error('Error fetching terms from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getSupplierRequirementsFromCMS() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const supplierRequirements = await db.collection('globals').findOne({ globalType: 'supplier-requirements' });

    if (!supplierRequirements) {
      console.log('[CMS] ⚠️  Supplier Requirements global not found');
      return null;
    }

    console.log('[CMS] ✓ Fetched supplier requirements data from MongoDB');

    return {
      hero: supplierRequirements.hero,
      sections: supplierRequirements.sections,
      requirements: supplierRequirements.requirements,
      additionalSections: supplierRequirements.additionalSections,
      footerNote: supplierRequirements.footerNote,
    };
  } catch (error) {
    console.error('Error fetching supplier requirements from CMS:', error);
    return null;
  } finally {
    await client.close();
  }
}
