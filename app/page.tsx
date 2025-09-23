import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import ImageShowcase from '@/components/sections/ImageShowcase';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ImageShowcase />
      <CTA />
    </>
  );
}