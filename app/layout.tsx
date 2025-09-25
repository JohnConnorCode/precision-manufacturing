import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CMSIndicator from "@/components/cms-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IIS - Innovative Industrial Solutions | Precision Manufacturing Since 1995",
  description: "IIS (Innovative Industrial Solutions) - Leading ITAR-registered, AS9100D certified precision manufacturing for aerospace, defense & energy. Expert 5-axis CNC machining, metrology & engineering solutions with ±0.0001\" tolerances. Serving critical industries since 1995.",
  keywords: "IIS, Innovative Industrial Solutions, precision manufacturing, aerospace manufacturing, defense contractor, AS9100D certified, ITAR registered, ISO 9001:2015, 5-axis CNC machining, precision metrology, adaptive manufacturing, predictive analytics, engineering services, aerospace supplier, defense manufacturing, ultra-precision machining, Connecticut manufacturing",
  authors: [{ name: "Innovative Industrial Solutions (IIS)" }],
  creator: "Innovative Industrial Solutions",
  publisher: "Innovative Industrial Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://iismet.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IIS - Innovative Industrial Solutions | Precision Manufacturing Excellence",
    description: "IIS delivers ITAR-compliant precision manufacturing with 5-axis CNC machining, advanced metrology, and engineering solutions for aerospace & defense industries. AS9100D certified since 1995.",
    url: "https://iismet.com",
    siteName: "Innovative Industrial Solutions (IIS)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IIS - Innovative Industrial Solutions Precision Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIS - Innovative Industrial Solutions | Precision Manufacturing",
    description: "Leading ITAR-registered precision manufacturer serving aerospace & defense with AS9100D certified excellence since 1995.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-token-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://iismet.com/#organization",
        name: "Innovative Industrial Solutions (IIS)",
        alternateName: "IIS",
        url: "https://iismet.com",
        logo: {
          "@type": "ImageObject",
          url: "https://iismet.com/logo.png",
          width: "300",
          height: "100",
        },
        description: "Leading ITAR-registered, AS9100D certified precision manufacturing company specializing in aerospace, defense, and energy industries since 1995.",
        foundingDate: "1995",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        sameAs: [
          "https://www.linkedin.com/company/iis-innovative-industrial-solutions",
          "https://twitter.com/IISManufacturing",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-860-555-0100",
          contactType: "Sales",
          areaServed: "US",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
          addressRegion: "Connecticut",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://iismet.com/#website",
        url: "https://iismet.com",
        name: "Innovative Industrial Solutions (IIS)",
        description: "IIS - Expert precision manufacturing solutions for aerospace and defense",
        publisher: {
          "@id": "https://iismet.com/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://iismet.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://iismet.com/#localbusiness",
        name: "Innovative Industrial Solutions (IIS)",
        image: "https://iismet.com/facility.jpg",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
          addressRegion: "CT",
          addressLocality: "Connecticut",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "41.7658",
          longitude: "-72.6734",
        },
        url: "https://iismet.com",
        telephone: "+1-860-555-0100",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "17:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Precision Manufacturing Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "5-Axis CNC Machining",
                description: "Advanced 5-axis simultaneous machining for complex aerospace components",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Precision Metrology",
                description: "Ultra-precision measurement and inspection services",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Engineering Services",
                description: "Design, analysis, and manufacturing engineering support",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main id="main-content" className="min-h-screen lg:pt-32 pt-20">
          {children}
        </main>
        <Footer />
        <CMSIndicator />
      </body>
    </html>
  );
}
