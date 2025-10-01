import { client } from '@/sanity/lib/sanity';

// Home Page Query
export const homePageQuery = `
  *[_type == "home"][0] {
    hero {
      mainTitle,
      subTitle,
      tagline,
      badges,
      ctaPrimary,
      ctaSecondary,
      backgroundSlides
    },
    technicalSpecs {
      title,
      subtitle,
      specs
    },
    services {
      title,
      subtitle,
      services[]-> {
        _id,
        title,
        description,
        icon,
        slug,
        features,
        image
      }
    },
    industries {
      title,
      subtitle,
      industries[]-> {
        _id,
        title,
        description,
        icon,
        slug,
        image
      }
    },
    imageShowcase {
      title,
      subtitle,
      images
    },
    stats {
      title,
      subtitle,
      stats
    },
    cta {
      title,
      subtitle,
      buttons
    },
    seo
  }
`;

// About Page Query
export const aboutPageQuery = `
  *[_type == "about"][0] {
    hero,
    companyStats,
    companyStory,
    timeline,
    values,
    leadership,
    capabilities,
    certifications,
    cta,
    seo
  }
`;

// Services Page Query
export const servicesPageQuery = `
  *[_type == "servicesPage"][0] {
    hero,
    capabilities,
    servicesSection {
      title,
      subtitle,
      services
    },
    qualityAssurance,
    cta,
    seo
  }
`;

// Industries Page Query
export const industriesPageQuery = `
  *[_type == "industriesPage"][0] {
    hero,
    industriesOverview {
      title,
      subtitle,
      industries[]-> {
        _id,
        title,
        description,
        icon,
        slug,
        image,
        keyServices,
        certifications
      }
    },
    capabilities,
    certifications,
    cta,
    seo
  }
`;

// Contact Page Query
export const contactPageQuery = `
  *[_type == "contact"][0] {
    hero,
    contactInfo,
    contactForm,
    capabilities,
    testimonials,
    seo
  }
`;

// Compliance Page Query
export const compliancePageQuery = `
  *[_type == "compliance" && slug.current == $slug][0] {
    title,
    hero,
    content,
    lastUpdated,
    version,
    category,
    seo
  }
`;

// Get all compliance pages
export const allCompliancePagesQuery = `
  *[_type == "compliance"] {
    _id,
    title,
    slug,
    category,
    version,
    lastUpdated
  }
`;

// Fetch Functions
export async function getHomePage() {
  try {
    const data = await client.fetch(homePageQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour - content rarely changes
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}

export async function getAboutPage() {
  try {
    const data = await client.fetch(aboutPageQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export async function getServicesPage() {
  try {
    const data = await client.fetch(servicesPageQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching services page:', error);
    return null;
  }
}

export async function getIndustriesPage() {
  try {
    const data = await client.fetch(industriesPageQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching industries page:', error);
    return null;
  }
}

export async function getContactPage() {
  try {
    const data = await client.fetch(contactPageQuery, {}, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}

export async function getCompliancePage(slug: string) {
  try {
    const data = await client.fetch(compliancePageQuery, { slug }, {
      next: { revalidate: 86400 }, // Cache for 24 hours - compliance docs change rarely
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching compliance page:', error);
    return null;
  }
}

export async function getAllCompliancePages() {
  try {
    const data = await client.fetch(allCompliancePagesQuery, {}, {
      next: { revalidate: 86400 }, // Cache for 24 hours
      cache: 'force-cache',
    });
    return data;
  } catch (error) {
    console.error('Error fetching compliance pages:', error);
    return [];
  }
}