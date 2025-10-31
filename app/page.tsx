import Hero from '@/components/sections/Hero';
import TechnicalSpecs from '@/components/sections/TechnicalSpecs';
import Services from '@/components/sections/Services';
import Industries from '@/components/sections/Industries';
import ImageShowcase from '@/components/sections/ImageShowcase';
import Resources from '@/components/sections/Resources';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import StructuredData from '@/components/seo/StructuredData';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateProductCatalogSchema,
  generateFAQSchema
} from '@/lib/structured-data';
import { getServicesFromCMS, getIndustriesFromCMS, getHomepageFromCMS } from '@/lib/get-cms-data';

// Force static generation with long revalidation
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data from CMS
  const servicesData = await getServicesFromCMS();
  const industriesData = await getIndustriesFromCMS();
  const homepageData = await getHomepageFromCMS();

  // Organization data for structured markup
  const organizationData = {
    name: "Integrated Inspection Systems (IIS)",
    alternateName: "IIS",
    url: "https://iismet.com",
    logo: "https://iismet.com/logo.png",
    description: "Engineering, Metrology, Machining & Database Services since 1995. AS9100 & ISO 9001 certified precision machining and CMM inspection services. Proprietary MetBase® software for closed-loop data integration. ITAR registered. First article inspection, dimensional measurement, and process verification for aerospace, defense & manufacturing.",
    foundingDate: "1995",
    address: {
      streetAddress: "14310 SE Industrial Way",
      addressLocality: "Clackamas",
      addressRegion: "Oregon",
      postalCode: "97015",
      addressCountry: "US"
    },
    contactPoint: {
      telephone: "+1-503-231-9093",
      email: "officemgr@iismet.com",
      contactType: "customer service"
    },
    sameAs: [
      "https://www.linkedin.com/company/integrated-inspection-systems",
      "https://twitter.com/iismet"
    ]
  };

  // Generate all structured data schemas
  const organizationSchema = generateOrganizationSchema(organizationData);
  const localBusinessSchema = generateLocalBusinessSchema(organizationData);
  const websiteSchema = generateWebsiteSchema(organizationData.url);
  const productCatalogSchema = generateProductCatalogSchema();
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* Comprehensive Structured Data for World-Class SEO */}
      <StructuredData data={[
        organizationSchema,
        localBusinessSchema,
        websiteSchema,
        productCatalogSchema,
        faqSchema
      ]} />

      <Hero data={homepageData?.hero || undefined} />
      <Services data={servicesData || undefined} />
      <TechnicalSpecs data={homepageData?.technicalSpecs || undefined} />
      <Industries data={industriesData || undefined} />
      <ImageShowcase data={homepageData?.imageShowcase || undefined} />
      <Resources data={homepageData?.resources || undefined} />
      <Stats data={homepageData?.stats || undefined} />
      <CTA data={homepageData?.cta || undefined} />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = 'https://iismet.com';

  const metadata = {
    title: 'IIS - Integrated Inspection Systems | Engineering, Metrology, Machining & Database Services',
    description: 'Integrated Inspection Systems (IIS): Engineering, Metrology, Machining & Database Services since 1995. Proprietary MetBase® software links CMM, CNC & vision systems. AS9100, ISO 9001 certified, ITAR registered. Serving aerospace, manufacturing & government.',
    keywords: 'IIS, Integrated Inspection Systems, engineering services, metrology, machining, database services, MetBase software, CMM inspection, CNC machining, AS9100, ISO 9001, ITAR, aerospace, precision manufacturing, Oregon',
    ogImage: `${baseUrl}/og-image-home.jpg`
  };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: 'IIS Precision Manufacturing', url: baseUrl }],
    creator: 'IIS Precision Manufacturing',
    publisher: 'IIS Precision Manufacturing',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: 'IIS Precision Manufacturing',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: metadata.ogImage,
          width: 1200,
          height: 630,
          alt: 'IIS Precision Manufacturing - Advanced CNC Machining Services',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@iisprecision',
      creator: '@iisprecision',
      title: metadata.title,
      description: metadata.description,
      images: [metadata.ogImage],
    },
    verification: {
      google: 'google-verification-code', // Add actual verification code
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',
      other: {
        'msvalidate.01': 'bing-verification-code',
      },
    },
    category: 'Business',
    classification: 'Manufacturing',
    other: {
      'business:contact_data:street_address': '123 Manufacturing Drive',
      'business:contact_data:locality': 'Precision City',
      'business:contact_data:region': 'Oregon',
      'business:contact_data:postal_code': '97201',
      'business:contact_data:country_name': 'United States',
      'business:contact_data:phone_number': '+1-503-231-9093',
      'business:contact_data:website': baseUrl,
    },
  };
}
