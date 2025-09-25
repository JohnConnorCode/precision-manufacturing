"use client";

import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/premium-button';
import { ArrowRight, FileText, Shield, Award, Activity } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Aerospace-inspired animated background */}
      <div className="absolute inset-0">
        {/* Precision grid scanner effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 49%, rgba(6, 182, 212, 0.03) 50%, transparent 51%),
              linear-gradient(90deg, transparent 49%, rgba(6, 182, 212, 0.03) 50%, transparent 51%)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Scanning beam effect */}
        <motion.div
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-600/30 to-transparent"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Vertical scanning beam */}
        <motion.div
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          initial={{ left: '0%' }}
          animate={{ left: '100%' }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Corner accent lights */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Technical overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(6, 182, 212, 0.1) 10deg, transparent 20deg),
            repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 40px, rgba(59, 130, 246, 0.05) 50px, transparent 60px)
          `,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Precision indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-600/20 bg-cyan-600/5 backdrop-blur-sm"
          >
            <Activity className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-600">30 Years of Aerospace Excellence</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Start Your Project?
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Get a quote within 24 hours. From prototype to production, we deliver AS9100D-certified precision components
            with tolerances to ±0.0001" for aerospace, defense, and medical applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <PremiumButton size="lg">
                Request Engineering Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </Link>

            <Link href="/compliance/supplier-requirements">
              <PremiumButton size="lg" variant="secondary">
                <FileText className="mr-2 h-5 w-5" />
                Technical Specifications
              </PremiumButton>
            </Link>
          </div>

          {/* Certification badges with subtle animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <motion.div
                  className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm font-medium text-slate-300">24/7 Production</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Shield className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-slate-300">ITAR Registered</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Award className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-slate-300">AS9100D</span>
            </motion.div>
          </div>

          {/* Client trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Trusted by leading</span>
              <span className="font-semibold text-cyan-600">aerospace & defense</span>
              <span>contractors worldwide</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}