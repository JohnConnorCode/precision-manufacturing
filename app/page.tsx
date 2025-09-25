import Hero from '@/components/sections/Hero';
import TechnicalSpecs from '@/components/sections/TechnicalSpecs';
import Services from '@/components/sections/Services';
import Industries from '@/components/sections/Industries';
import ImageShowcase from '@/components/sections/ImageShowcase';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import MetricsDashboard from '@/components/sections/MetricsDashboard';
import { client } from '@/sanity/lib/sanity';
import { homePageQuery } from '@/sanity/lib/queries';

async function getHomePageData() {
  try {
    const data = await client.fetch(homePageQuery, {}, {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    return data;
  } catch (error) {
    console.log('No CMS content available, using defaults');
    return null;
  }
}

export default async function Home() {
  const cmsData = await getHomePageData();

  // CMS data is fetched and ready for when content is added
  // Components will be updated to use CMS data when available
  return (
    <>
      <Hero />
      <TechnicalSpecs />
      <MetricsDashboard />
      <Services />
      <Industries />
      <ImageShowcase />
      <Stats />
      <CTA />
    </>
  );
}// Force rebuild Wed Sep 24 13:01:21 WITA 2025
