"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ParallaxImagePro from '@/components/ui/parallax-image-pro';

const services = [
  {
    title: '5-Axis Machining',
    description: 'Complex geometries with unmatched precision. Simultaneous multi-axis control for aerospace components.',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Up to 60" parts', 'Titanium & exotic alloys'],
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80'
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements. Ensuring consistency across production runs.',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning. AS9102 first article inspection.',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'Full traceability'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
  },
  {
    title: 'Engineering Support',
    description: 'Design for manufacturability consultation. Process optimization and cost reduction strategies.',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Value engineering'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.3em]">Excellence in Engineering</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Core</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Capabilities</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Precision manufacturing excellence backed by three decades of aerospace expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Link href={service.href} className="block h-full">
                  <Card className="h-full overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 border-slate-800/50 group relative bg-slate-900/50 backdrop-blur-sm">
                    {/* Premium Image Header with Parallax */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <ParallaxImagePro
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full opacity-60 group-hover:opacity-90 transition-all duration-700"
                        speed={0.3}
                        scale={true}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                      {/* Floating Icon with Glow */}
                      <motion.div
                        className="absolute bottom-4 left-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-500/50 rounded-xl blur-xl" />
                          <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Premium Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {service.specs.map((spec, i) => (
                          <motion.li
                            key={spec}
                            className="text-xs text-slate-500 flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2 group-hover:w-2 transition-all duration-300" />
                            <span className="group-hover:text-slate-400 transition-colors">{spec}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Premium Hover Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cyan-400/60 font-medium uppercase tracking-wider">Explore</span>
                        <div className="flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <span className="text-sm font-semibold mr-1">View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
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