"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const showcaseImages = [
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    title: 'Precision Turbine Blades',
    category: 'Aerospace Components',
    href: '/services/5-axis-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
    title: 'Defense Systems',
    category: 'ITAR Manufacturing',
    href: '/services/adaptive-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    title: 'CMM Inspection',
    category: 'Quality Assurance',
    href: '/services/metrology'
  },
  {
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    title: 'Complex Geometries',
    category: '5-Axis Machining',
    href: '/services/5-axis-machining'
  },
  {
    src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    title: 'Engineering Excellence',
    category: 'Design Support',
    href: '/services/engineering'
  },
  {
    src: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    title: 'Production Facility',
    category: '24/7 Manufacturing',
    href: '/about'
  }
];

export default function ImageShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

        {/* Animated accent lines */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity }}
        >
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
          <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </motion.div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          {/* Premium Section Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Manufacturing Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-slate-900">Precision in</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"> Every Detail</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            State-of-the-art facilities equipped with advanced CNC systems, delivering
            unmatched precision for aerospace and defense applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group"
            >
              <Link href={item.href} className="block relative">
                {/* Premium Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Image with Premium Treatment */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative h-full"
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                    </motion.div>

                    {/* Lighter Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />


                    {/* Content with Animation */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-2">
                          {item.category}
                        </p>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                      </motion.div>
                    </div>

                    {/* Premium Hover Indicator */}
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                      whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-lg" />
                        <div className="relative w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <ArrowUpRight className="w-5 h-5 text-slate-900" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Premium Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24"
        >
          {/* Decorative Line */}
          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Performance Metrics
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30+', label: 'Years of Excellence', gradient: 'from-cyan-600 to-blue-600' },
              { value: '±0.0001"', label: 'Precision Tolerance', gradient: 'from-blue-600 to-purple-600' },
              { value: '99.97%', label: 'On-Time Delivery', gradient: 'from-purple-600 to-pink-600' },
              { value: '24/7', label: 'Production Capability', gradient: 'from-pink-600 to-cyan-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}