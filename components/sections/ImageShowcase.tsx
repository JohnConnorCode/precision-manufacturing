"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
            MANUFACTURING EXCELLENCE
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            State-of-the-art facilities and cutting-edge technology delivering aerospace precision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={item.href} className="block relative overflow-hidden rounded-xl shadow-lg">
                {/* Image Container */}
                <div className="relative h-64 bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-slate-200"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              30+
            </div>
            <div className="text-sm text-slate-600 mt-1">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              ±0.0001"
            </div>
            <div className="text-sm text-slate-600 mt-1">Min Tolerance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              99.97%
            </div>
            <div className="text-sm text-slate-600 mt-1">On-Time Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              24/7
            </div>
            <div className="text-sm text-slate-600 mt-1">Manufacturing</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}