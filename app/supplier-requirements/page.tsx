'use client';

import HeroSection from '@/components/ui/hero-section';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Shield,
  CheckCircle2,
  FileText,
  Award,
  Users,
  Gauge,
  AlertTriangle,
  Download,
  ArrowRight,
  ClipboardCheck
} from 'lucide-react';
import Link from 'next/link';

const requirements = [
  {
    category: 'Quality Standards',
    icon: Shield,
    items: [
      'AS9100D certification for aerospace suppliers',
      'ISO 9001:2015 quality management system',
      'NADCAP accreditation for special processes',
      'First article inspection reports (AS9102)',
      'Statistical process control (SPC) implementation'
    ]
  },
  {
    category: 'Compliance & Security',
    icon: AlertTriangle,
    items: [
      'ITAR registration and compliance',
      'Export control documentation',
      'Cybersecurity maturity certification (CMMC)',
      'Conflict minerals reporting',
      'Data protection and NDA agreements'
    ]
  },
  {
    category: 'Technical Capabilities',
    icon: Gauge,
    items: [
      'Tolerance capability of ±0.0001"',
      'CMM inspection equipment',
      'Material certification and traceability',
      'Process validation documentation',
      'Capacity planning and on-time delivery metrics'
    ]
  },
  {
    category: 'Business Requirements',
    icon: Users,
    items: [
      'Minimum 5 years in precision manufacturing',
      'Financial stability verification',
      'Insurance coverage minimum $2M',
      'Dedicated quality assurance team',
      'Continuous improvement program'
    ]
  }
];

const documents = [
  {
    title: 'Supplier Application Form',
    description: 'Complete application with company information and capabilities',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    title: 'Quality Manual Template',
    description: 'AS9100D compliant quality manual template',
    size: '1.8 MB',
    format: 'DOCX'
  },
  {
    title: 'Supplier Code of Conduct',
    description: 'Ethics, compliance, and business conduct requirements',
    size: '856 KB',
    format: 'PDF'
  },
  {
    title: 'ITAR Compliance Checklist',
    description: 'International Traffic in Arms Regulations requirements',
    size: '524 KB',
    format: 'PDF'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Initial Application',
    description: 'Submit supplier application with required documentation'
  },
  {
    step: '02',
    title: 'Capability Review',
    description: 'Technical assessment of manufacturing capabilities'
  },
  {
    step: '03',
    title: 'Quality Audit',
    description: 'On-site audit of quality systems and processes'
  },
  {
    step: '04',
    title: 'Approval & Onboarding',
    description: 'Contract execution and system integration'
  }
];

export default function SupplierRequirementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=2400&q=95"
        imageAlt="Supplier requirements and quality standards"
        badge={{
          text: "SUPPLIER EXCELLENCE",
          icon: Award
        }}
        title={
          <span className="text-white">
            Supplier <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Requirements</span>
          </span>
        }
        subtitle="Partner with us in precision manufacturing excellence"
        description="Join our network of certified suppliers delivering aerospace-grade components with uncompromising quality standards."
        buttons={[
          {
            label: "Apply Now",
            href: "#application",
            variant: "primary"
          },
          {
            label: "Download Requirements",
            href: "#downloads",
            variant: "secondary"
          }
        ]}
        height="large"
        alignment="center"
      />

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-600">Core</span>
              <span className="text-blue-600"> Requirements</span>
            </h2>
            <p className="text-lg text-blue-600 max-w-3xl mx-auto">
              Our supplier partners must meet stringent standards to ensure the highest quality and reliability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <motion.div
                  key={req.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full p-6 hover:shadow-xl transition-shadow duration-300 border-slate-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-cyan-600" />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-600">{req.category}</h3>
                    </div>
                    <ul className="space-y-3">
                      {req.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-600">Application</span>
              <span className="text-blue-600"> Process</span>
            </h2>
            <p className="text-lg text-blue-600 max-w-3xl mx-auto">
              A streamlined onboarding process to qualify and integrate new suppliers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-5xl font-black text-cyan-200 mb-2">{step.step}</div>
                  <h3 className="text-lg font-bold text-cyan-600 mb-2">{step.title}</h3>
                  <p className="text-sm text-blue-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-8 w-6 h-6 text-cyan-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-600">Required</span>
              <span className="text-blue-600"> Documents</span>
            </h2>
            <p className="text-lg text-blue-600 max-w-3xl mx-auto">
              Download application forms and compliance documentation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-cyan-600 mb-1">{doc.title}</h3>
                      <p className="text-sm text-blue-600 mb-2">{doc.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cyan-500">{doc.format} • {doc.size}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-cyan-600 hover:text-blue-600"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="application" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <ClipboardCheck className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-600">Ready to</span>
              <span className="text-blue-600"> Partner?</span>
            </h2>
            <p className="text-lg text-blue-600 mb-8">
              Join our network of world-class suppliers delivering excellence in precision manufacturing.
              Start your application today and become part of our commitment to aerospace innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-cyan-600 hover:bg-blue-600 text-white"
                asChild
              >
                <Link href="/contact">
                  Start Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                asChild
              >
                <Link href="/about">
                  Learn About IIS
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}