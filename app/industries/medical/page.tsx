'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Heart, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';
import { theme, styles, cn } from '@/lib/theme';

export default function MedicalPage() {
  const capabilities = [
    { label: 'FDA Compliance', value: '100%', description: '21 CFR Part 820' },
    { label: 'Implant Tolerance', value: '±0.0001"', description: 'Ultra-precision' },
    { label: 'ISO 13485', value: 'Certified', description: 'Medical quality system' },
    { label: 'Quality Rate', value: '99.99%', description: 'Zero defect goal' }
  ];

  const applications = [
    {
      category: 'Surgical Implants',
      description: 'Precision manufacturing of orthopedic implants, dental implants, and cardiovascular devices',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      parts: [
        'Hip and knee replacements',
        'Spinal implants',
        'Dental implants and abutments',
        'Cardiovascular stents',
        'Bone screws and plates',
        'Cranial mesh and fixation'
      ]
    },
    {
      category: 'Surgical Instruments',
      description: 'High-precision surgical tools and endoscopic equipment',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      parts: [
        'Laparoscopic instruments',
        'Endoscopic tools',
        'Microsurgical instruments',
        'Robotic surgery components',
        'Surgical cutting tools',
        'Precision forceps and retractors'
      ]
    },
    {
      category: 'Diagnostic Equipment',
      description: 'Components for medical imaging and diagnostic systems',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
      parts: [
        'MRI machine components',
        'CT scanner parts',
        'X-ray system components',
        'Ultrasound transducer housings',
        'Laboratory analyzer parts',
        'Optical instrument components'
      ]
    }
  ];

  const certifications = [
    'FDA 21 CFR Part 820',
    'ISO 13485:2016',
    'ISO 14971 Risk Management',
    'MDSAP Certified',
    'CE Marking Compliance',
    'FDA Registered Facility'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <main className="relative min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <ParallaxImagePro
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80"
          alt="Medical device manufacturing"
        />

        <div className="container relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-blue-600 uppercase tracking-wider text-sm font-medium">
                Medical & Life Sciences
              </span>
            </div>

            <h1 className={cn(styles.pageTitle, "mb-6")}>
              Precision Manufacturing for Healthcare Innovation
            </h1>

            <p className={cn(theme.typography.lead, "text-slate-300 mb-8")}>
              Supporting medical device manufacturers with FDA-compliant precision manufacturing,
              from prototype to production. We understand the critical nature of medical components
              and maintain the highest quality standards in the industry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white" asChild>
                <Link href="/contact">
                  Get FDA-Compliant Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:border-blue-600 hover:text-blue-600" asChild>
                <Link href="/certifications">
                  View Certifications
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section {...fadeInUp} className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {capabilities.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Applications Section */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Medical Manufacturing Applications</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              From life-saving implants to precision surgical instruments, we manufacture
              critical medical components with uncompromising quality.
            </p>
          </motion.div>

          <div className="space-y-24">
            {applications.map((app, index) => (
              <motion.div
                key={app.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={cn("grid md:grid-cols-2 gap-12 items-center",
                  index % 2 === 1 && "md:flex-row-reverse")}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className={cn(theme.typography.h3, "text-blue-600 mb-4")}>
                    {app.category}
                  </h3>
                  <p className={cn(theme.typography.body, "text-slate-400 mb-8")}>
                    {app.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {app.parts.map((part) => (
                      <div key={part} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{part}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cn("relative h-96 rounded-lg overflow-hidden",
                  index % 2 === 1 ? "md:order-1" : "")}>
                  <ParallaxImagePro
                    src={app.image}
                    alt={app.category}
                    className="rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={cn(theme.typography.h2, "mb-4 text-white")}>Complete Regulatory Compliance</h2>
            <p className={cn(theme.typography.lead, "text-slate-400 max-w-3xl mx-auto")}>
              Our quality management system exceeds the strictest medical industry standards,
              ensuring your devices meet all regulatory requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Quality Systems</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Full traceability and documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Validated processes and equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Clean room manufacturing (ISO 7/8)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Statistical process control</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Material Expertise</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Titanium and titanium alloys</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Stainless steel (316L, 17-4 PH)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>PEEK and biocompatible polymers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Cobalt chrome alloys</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-blue-600/10 to-blue-500/10 border border-blue-600/20 rounded-lg p-4 text-center"
              >
                <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm text-slate-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Partner with Medical Manufacturing Experts
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            From prototype to production, we deliver FDA-compliant precision components
            for life-saving medical devices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/contact">
                Start Your Medical Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/facility-tour">
                Request Facility Tour
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}