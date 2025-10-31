// Direct MongoDB access to bypass Payload API issues
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://John:TestPass123@precisionmanufacturing.m1waxew.mongodb.net/precision-manufacturing?appName=PrecisionManufacturing';
const DB_NAME = 'precision-manufacturing';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(DB_NAME);
  return cachedDb;
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
    const db = await getDatabase();
    const services = await db.collection('services').find({}).toArray();

    console.log('[Direct DB] ✓ Fetched', services.length, 'services from MongoDB');

    return services.map((service: any) => ({
      title: service.title,
      description: service.shortDescription || service.description,
      iconName: iconNameMap[service.slug] || 'Cog',
      href: `/services/${service.slug}`,
      specs: service.specs || [],
      image: service.image,
      highlight: service.highlight || false,
    }));
  } catch (error) {
    console.error('Error fetching services from MongoDB:', error);
    // Return hardcoded fallback data to maintain site functionality
    return [
      {
        title: "5-Axis Machining",
        description: "Advanced multi-axis CNC capabilities for complex aerospace and defense components",
        iconName: "Cog",
        href: "/services/5-axis-machining",
        specs: [],
        image: null,
        highlight: false
      },
      {
        title: "Adaptive Machining",
        description: "Intelligent material removal strategies for optimal efficiency",
        iconName: "Cpu",
        href: "/services/adaptive-machining",
        specs: [],
        image: null,
        highlight: false
      },
      {
        title: "Metrology Services",
        description: "Comprehensive measurement and inspection services",
        iconName: "Gauge",
        href: "/services/metrology",
        specs: [],
        image: null,
        highlight: false
      },
      {
        title: "Engineering Services",
        description: "Design, analysis, and optimization expertise",
        iconName: "Users",
        href: "/services/engineering",
        specs: [],
        image: null,
        highlight: false
      }
    ];
  }
}

export async function getIndustriesFromCMS() {
  try {
    const db = await getDatabase();
    const industries = await db.collection('industries').find({}).toArray();

    console.log('[Direct DB] ✓ Fetched', industries.length, 'industries from MongoDB');

    return industries.map((industry: any) => ({
      title: industry.title,
      description: industry.description,
      iconName: iconNameMap[industry.slug] || 'Factory',
      href: `/industries/${industry.slug}`,
      image: industry.image,
    }));
  } catch (error) {
    console.error('Error fetching industries from MongoDB:', error);
    // Return hardcoded fallback data
    return [
      {
        title: "Aerospace",
        description: "AS9100 certified manufacturing for critical flight components",
        iconName: "Plane",
        href: "/industries/aerospace",
        image: null
      },
      {
        title: "Defense",
        description: "ITAR registered facility for defense contracts",
        iconName: "Shield",
        href: "/industries/defense",
        image: null
      },
      {
        title: "Energy",
        description: "Precision components for power generation",
        iconName: "Zap",
        href: "/industries/energy",
        image: null
      }
    ];
  }
}

export async function getHomepageFromCMS() {
  try {
    const db = await getDatabase();
    const homepage = await db.collection('globals').findOne({ globalType: 'homepage' });

    if (!homepage) {
      console.log('[Direct DB] ⚠️  Homepage global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched homepage data from MongoDB');

    // Transform badges array format if present
    const transformedHero = homepage.hero ? {
      ...homepage.hero,
      badges: homepage.hero.badges?.map((b: any) =>
        typeof b === 'string' ? b : b.badge
      ) || []
    } : null;

    return {
      hero: transformedHero,
      stats: homepage.stats,
      cta: homepage.cta,
    };
  } catch (error) {
    console.error('Error fetching homepage from MongoDB:', error);
    return null;
  }
}

export async function getServiceBySlugFromCMS(slug: string) {
  try {
    const db = await getDatabase();
    const service = await db.collection('services').findOne({ slug });

    if (!service) {
      console.log(`[Direct DB] ⚠️  Service not found: ${slug}`);
      return null;
    }

    console.log(`[Direct DB] ✓ Fetched service: ${service.title}`);

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
    };
  } catch (error) {
    console.error(`Error fetching service ${slug} from MongoDB:`, error);
    return null;
  }
}

export async function getIndustryBySlugFromCMS(slug: string) {
  try {
    const db = await getDatabase();
    const industry = await db.collection('industries').findOne({ slug });

    if (!industry) {
      console.log(`[Direct DB] ⚠️  Industry not found: ${slug}`);
      return null;
    }

    console.log(`[Direct DB] ✓ Fetched industry: ${industry.title}`);

    return industry;
  } catch (error) {
    console.error(`Error fetching industry ${slug} from MongoDB:`, error);
    return null;
  }
}

export async function getResourcesFromCMS() {
  try {
    const db = await getDatabase();
    const resources = await db.collection('resources').find({}).toArray();

    console.log('[Direct DB] ✓ Fetched', resources.length, 'resources from MongoDB');

    return resources;
  } catch (error) {
    console.error('Error fetching resources from MongoDB:', error);
    return [];
  }
}

export async function getNavigationFromCMS() {
  try {
    const db = await getDatabase();
    const navigation = await db.collection('globals').findOne({ globalType: 'navigation' });

    if (!navigation) {
      console.log('[Direct DB] ⚠️  Navigation global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched navigation data from MongoDB');

    return navigation;
  } catch (error) {
    console.error('Error fetching navigation from MongoDB:', error);
    return null;
  }
}

export async function getFooterFromCMS() {
  try {
    const db = await getDatabase();
    const footer = await db.collection('globals').findOne({ globalType: 'footer' });

    if (!footer) {
      console.log('[Direct DB] ⚠️  Footer global not found');
      return null;
    }

    console.log('[Direct DB] ✓ Fetched footer data from MongoDB');

    return footer;
  } catch (error) {
    console.error('Error fetching footer from MongoDB:', error);
    return null;
  }
}