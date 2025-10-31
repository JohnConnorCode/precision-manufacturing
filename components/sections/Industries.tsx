"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Plane, Zap, Shield, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Shield': Shield,
  'Zap': Zap,
  'Plane': Plane,
};

const industries = [
  {
    title: 'Defense & Government',
    description: 'ITAR-compliant manufacturing for defense contractors and government agencies. Secure, certified production.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
    href: '/industries/defense',
    features: ['ITAR registered', 'Secure facility', 'Rapid prototyping'],
  },
  {
    title: 'Energy & Power',
    description: 'Critical components for power generation and renewable energy. High-temperature alloys and superalloy expertise.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    href: '/industries/energy',
    features: ['Superalloy expertise', 'Large part capability', 'Field service support'],
  },
  {
    title: 'Aerospace & Aviation',
    description: 'Precision components for commercial and military aircraft. AS9100D certified production.',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
    href: '/industries/aerospace',
    features: ['AS9100D certified', 'NADCAP accredited', 'Zero defect delivery'],
  },
];

interface IndustriesProps {
  data?: any;
}

export default function Industries({ data }: IndustriesProps) {
  // Use CMS data if available, otherwise use hardcoded data
  const industriesData = data || industries;

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Clear Section Purpose */}
          <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-[0.2em] mb-2">
            SPECIALIZED SECTOR EXPERTISE
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-slate-900">INDUSTRY</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> LEADERS</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-900 max-w-3xl mx-auto font-medium mb-4">
            Three decades of trusted partnerships in mission-critical sectors
          </p>

          <p className="text-base text-slate-800 max-w-2xl mx-auto">
            Our certifications and clearances enable us to serve the most demanding industries
            where component failure can mean mission failure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industriesData.map((industry: any, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = industry.iconName ? iconMap[industry.iconName] || Plane : industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={industry.href} className="block">
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-slate-200 hover:border-blue-600/50">
                    <div className="relative h-56 overflow-hidden">
                      <ParallaxImage
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />

                      {/* Icon and title overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white leading-tight pt-2">
                            {industry.title}
                          </h3>
                        </div>

                        {/* Feature badges on image */}
                        <div className="flex flex-wrap gap-2">
                          {industry.features?.map((feature: any, index: number) => {
                            // Handle both string and object formats
                            const featureText = typeof feature === 'string' ? feature : feature.feature;
                            return (
                              <span
                                key={index}
                                className="text-[10px] font-semibold text-white/90 bg-white/10 backdrop-blur-sm px-2 py-1 rounded uppercase tracking-wider"
                              >
                                {featureText}
                              </span>
                            );
                          }) || null}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white">
                      <p className="text-sm text-slate-800 leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}