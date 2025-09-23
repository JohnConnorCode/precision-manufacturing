'use client';

import { motion } from 'framer-motion';
import IndustryHero from '@/components/sections/IndustryHero';
import IndustryStats from '@/components/sections/IndustryStats';
import IndustryApplications from '@/components/sections/IndustryApplications';
import IndustryStandards from '@/components/sections/IndustryStandards';
import IndustryCaseStudies from '@/components/sections/IndustryCaseStudies';
import IndustryCTA from '@/components/sections/IndustryCTA';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function MedicalPage() {
  const stats = [
    { value: '100%', label: 'FDA Compliance' },
    { value: '±0.0001"', label: 'Implant Tolerance' },
    { value: 'ISO 13485', label: 'Certified' },
    { value: '99.99%', label: 'Quality Rate' }
  ];

  const applications = [
    {
      title: 'Surgical Implants',
      description: 'Precision manufacturing of orthopedic implants, dental implants, and cardiovascular devices with biocompatible materials.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56'
    },
    {
      title: 'Surgical Instruments',
      description: 'Manufacturing of high-precision surgical tools, endoscopic equipment, and robotic surgery components.',
      image: 'https://images.unsplash.com/photo-1583912267550-91e767df5865'
    },
    {
      title: 'Diagnostic Equipment',
      description: 'Components for MRI machines, CT scanners, and other medical imaging equipment requiring extreme precision.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514'
    },
    {
      title: 'Drug Delivery Systems',
      description: 'Precision components for insulin pumps, infusion systems, and automated medication dispensers.',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926'
    }
  ];

  const standards = [
    'FDA 21 CFR Part 820',
    'ISO 13485:2016',
    'ISO 14971',
    'MDSAP Certified',
    'CE Marking',
    'FDA Registered'
  ];

  const caseStudies = [
    {
      title: 'Titanium Hip Implant Manufacturing',
      client: 'Leading Medical Device Company',
      result: 'Reduced manufacturing time by 40% while maintaining 100% quality standards',
      image: 'https://images.unsplash.com/photo-1666214280557-83cdc5176b54'
    },
    {
      title: 'Micro-Surgical Instrument Production',
      client: 'Surgical Equipment Manufacturer',
      result: 'Achieved ±0.00005" tolerance on critical components',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074'
    }
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <IndustryHero
        title="Medical & Life Sciences"
        subtitle="Precision Manufacturing for Healthcare Innovation"
        description="Supporting medical device manufacturers with FDA-compliant precision manufacturing, from prototype to production."
        backgroundImage="https://images.unsplash.com/photo-1581595220975-9c8e49937d49"
        primaryButtonText="Get FDA-Compliant Quote"
        primaryButtonHref="/contact"
        secondaryButtonText="View Certifications"
        secondaryButtonHref="/certifications"
      />

      <IndustryStats stats={stats} />

      {/* Regulatory Compliance Section */}
      <motion.section {...fadeInUp} className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Complete Regulatory Compliance</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Our quality management system exceeds the strictest medical industry standards,
              ensuring your devices meet all regulatory requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Quality Systems</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full traceability and documentation</li>
                  <li>• Validated processes and equipment</li>
                  <li>• Clean room manufacturing (ISO 7/8)</li>
                  <li>• Statistical process control</li>
                </ul>
              </div>
              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Material Expertise</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Titanium and titanium alloys</li>
                  <li>• Stainless steel (316L, 17-4 PH)</li>
                  <li>• PEEK and biocompatible polymers</li>
                  <li>• Cobalt chrome alloys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <IndustryApplications applications={applications} />

      {/* Process Capabilities */}
      <motion.section {...fadeInUp} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Medical Manufacturing Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">µm</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Micro-Machining</h3>
              <p className="text-sm text-muted-foreground">
                Precision down to micron-level for miniaturized medical devices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">5</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">5-Axis Machining</h3>
              <p className="text-sm text-muted-foreground">
                Complex geometries for implants and surgical instruments
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">EDM</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Wire EDM</h3>
              <p className="text-sm text-muted-foreground">
                Burr-free cutting for critical medical components
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <IndustryStandards standards={standards} />

      <IndustryCaseStudies caseStudies={caseStudies} />

      <IndustryCTA
        title="Partner with Medical Manufacturing Experts"
        description="From prototype to production, we deliver FDA-compliant precision components for life-saving medical devices."
        primaryButtonText="Start Your Medical Project"
        primaryButtonHref="/contact"
        secondaryButtonText="Request Facility Tour"
        secondaryButtonHref="/facility-tour"
      />
    </main>
  );
}