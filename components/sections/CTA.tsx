"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Zap, Shield, Award } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Tech grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(6, 182, 212, 0.1) 2px,
              rgba(6, 182, 212, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.1) 2px,
              rgba(59, 130, 246, 0.1) 4px
            )
          `,
          backgroundSize: '100px 100px',
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Ready to Ship in 24-48 Hours</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
            Precision Manufacturing Excellence
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Partner with aerospace industry leaders. Get your quote within 24 hours
            and experience the precision that powers critical missions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 bg-slate-900/50 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 hover:bg-slate-900/80 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link href="/compliance/supplier-requirements">
                <FileText className="mr-2 h-5 w-5" />
                Supplier Requirements
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800"
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </div>
              <span className="text-sm font-medium text-slate-300">24/7 Production</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">ITAR Compliant</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">AS9100D Certified</span>
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Trusted by</span>
              <span className="font-semibold text-cyan-400">Fortune 500</span>
              <span>aerospace manufacturers</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}