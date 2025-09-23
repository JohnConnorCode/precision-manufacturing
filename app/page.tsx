import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Industries from '@/components/sections/Industries';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Industries />
      <CTA />
    </>
  );
}