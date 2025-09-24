"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Award, Shield, Clock, Target } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const showcaseImages = [
  {
    src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=90',
    title: 'Aerospace Components',
    category: 'Turbine Blades',
    href: '/services/5-axis-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?w=1200&q=90',
    title: 'Defense Systems',
    category: 'ITAR Certified',
    href: '/services/adaptive-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=90',
    title: 'Precision Metrology',
    category: 'Quality Control',
    href: '/services/metrology'
  }
];

const stats = [
  { icon: Award, value: 'AS9100D', label: 'Certified Quality', color: 'text-cyan-600' },
  { icon: Shield, value: 'ITAR', label: 'Registered', color: 'text-blue-600' },
  { icon: Clock, value: '24/7', label: 'Production', color: 'text-indigo-600' },
  { icon: Target, value: '±0.0001"', label: 'Tolerance', color: 'text-purple-600' }
];

export default function ImageShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <motion.div
        style={{ opacity, scale }}
        className="container relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-cyan-600 uppercase tracking-[0.2em] mb-4">
            Manufacturing Excellence
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-slate-900">Precision</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"> Delivered</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light">
            From concept to completion, we deliver aerospace-grade components with uncompromising precision
          </p>
        </motion.div>

        {/* Large Feature Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="group"
            >
              <Link href={item.href} className="block relative">
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />

                    {/* Clean gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">
                        {item.category}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium">View Details</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
              Let's discuss how we can deliver precision manufacturing solutions for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}