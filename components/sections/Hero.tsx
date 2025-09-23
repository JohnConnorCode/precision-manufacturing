"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Gauge, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';

export default function Hero() {
  const stats = [
    { label: 'FOUNDED', value: '1995', icon: Calendar },
    { label: 'CERTIFIED', value: 'AS9100D', icon: Award },
    { label: 'COMPLIANT', value: 'ITAR', icon: Shield },
    { label: 'QUALITY', value: 'ISO 9001', icon: Gauge }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background">
      {/* Professional Background Image */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
          alt="Precision inspection and manufacturing"
          className="w-full h-full opacity-20"
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.01]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Company Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm">
              <Shield className="w-3 h-3 mr-2" />
              ITAR REGISTERED • AS9100D • ISO 9001:2015
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
          >
            <span className="text-white">
              INTEGRATED
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mt-2">
              INSPECTION SYSTEMS
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 mb-4 font-light"
          >
            Innovative Machining Since 1995
          </motion.p>

          {/* Company Mission */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-slate-500 mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            Quality is not inspected into a product but is inherently designed
            and built into every process. Dedicated to continuous improvement
            of our Quality Management System.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6"
              >
                <stat.icon className="w-5 h-5 text-slate-500 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button
              size="lg"
              className="group px-8 py-6 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-base shadow-xl"
            >
              Request Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="px-8 py-6 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:text-white font-semibold text-base"
            >
              <Link href="/services">
                Our Capabilities
              </Link>
            </Button>
          </motion.div>

          {/* Core Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600"
          >
            <span>Machining</span>
            <span>•</span>
            <span>Inspection</span>
            <span>•</span>
            <span>Fixture Design</span>
            <span>•</span>
            <span>Metrology</span>
            <span>•</span>
            <span>Metbase®</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-600 animate-bounce" />
        </motion.div>
      </div>

      {/* Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-slate-500/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}