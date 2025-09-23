import { groq } from 'next-sanity';

// Home page query
export const homePageQuery = groq`
  *[_type == "home"][0] {
    hero {
      title,
      subtitle,
      ctaPrimary,
      ctaSecondary,
      slides[] {
        "imageUrl": image.asset->url,
        alt,
        title,
        subtitle
      }
    },
    stats[] {
      value,
      label,
      description
    },
    capabilities {
      title,
      subtitle,
      items[] {
        title,
        description,
        icon,
        "imageUrl": image.asset->url,
        features
      }
    },
    cta {
      title,
      subtitle,
      buttons[] {
        text,
        href,
        variant
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

// Service pages
export const servicesQuery = groq`
  *[_type == "service"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    hero {
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url,
      icon,
      badge
    },
    overview {
      description,
      highlights
    }
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    hero {
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url,
      icon,
      badge
    },
    overview {
      description,
      highlights
    },
    capabilities[] {
      label,
      value,
      description
    },
    features[] {
      title,
      description,
      icon,
      "imageUrl": image.asset->url,
      details
    },
    process[] {
      step,
      title,
      description
    },
    technologies,
    equipment[] {
      name,
      specs,
      "imageUrl": image.asset->url
    },
    industries[]-> {
      title,
      "slug": slug.current
    },
    caseStudies[] {
      title,
      client,
      challenge,
      solution,
      results,
      "imageUrl": image.asset->url
    },
    cta {
      title,
      subtitle,
      buttons[] {
        text,
        href,
        variant
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

// Industry pages
export const industriesQuery = groq`
  *[_type == "industry"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    hero {
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url,
      icon,
      badge
    },
    overview
  }
`;

export const industryBySlugQuery = groq`
  *[_type == "industry" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    hero {
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url,
      icon,
      badge
    },
    overview,
    capabilities[] {
      label,
      value,
      description
    },
    applications[] {
      category,
      description,
      "imageUrl": image.asset->url,
      parts
    },
    certifications,
    standards {
      title,
      description,
      qualitySystems,
      materials
    },
    caseStudies[] {
      title,
      client,
      challenge,
      solution,
      results,
      "imageUrl": image.asset->url,
      metrics[] {
        metric,
        value
      }
    },
    partners[] {
      name,
      "logoUrl": logo.asset->url,
      description
    },
    equipment[] {
      name,
      capability,
      specs
    },
    cta {
      title,
      subtitle,
      buttons[] {
        text,
        href,
        variant
      }
    },
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    founded,
    "logoUrl": logo.asset->url,
    contact {
      phone,
      email,
      address,
      hours
    },
    socialMedia {
      linkedin,
      twitter,
      facebook,
      instagram,
      youtube
    },
    navigation {
      mainMenu[] {
        label,
        href,
        submenu[] {
          label,
          href,
          description
        }
      },
      ctaButton {
        text,
        href
      }
    },
    footer {
      description,
      columns[] {
        title,
        links[] {
          label,
          href
        }
      },
      certifications[] {
        name,
        "logoUrl": logo.asset->url
      },
      copyright
    },
    seo {
      defaultTitle,
      titleTemplate,
      defaultDescription,
      siteUrl,
      "defaultOgImageUrl": defaultOgImage.asset->url,
      googleAnalyticsId
    }
  }
`;

// Generate static params for dynamic routes
export const servicePathsQuery = groq`
  *[_type == "service" && defined(slug.current)][].slug.current
`;

export const industryPathsQuery = groq`
  *[_type == "industry" && defined(slug.current)][].slug.current
`;