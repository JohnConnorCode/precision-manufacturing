"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Gauge, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const stats = [
    { label: 'PRECISION', value: '±0.0001"', icon: Gauge },
    { label: 'REJECT RATE', value: '<0.17%', icon: Shield },
    { label: 'ON-TIME', value: '99.8%', icon: Zap },
    { label: 'CERTIFIED', value: 'AS9100D', icon: Award }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent-cyan/5">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated Tech Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-3/4 w-full h-px bg-gradient-to-r from-transparent via-accent-electric/20 to-transparent"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Certification Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 flex flex-wrap justify-center gap-4"
          >
            <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
              <Shield className="w-4 h-4 mr-2" />
              ITAR REGISTERED
            </span>
            <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
              <Award className="w-4 h-4 mr-2" />
              AS9100D CERTIFIED
            </span>
            <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
              ISO 9001:2015
            </span>
          </motion.div>

          {/* Main Headline - Much Bolder */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.9]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              PRECISION
            </span>
            <span className="block text-accent-cyan mt-2 text-6xl md:text-8xl lg:text-9xl">
              REDEFINED
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground mb-6"
          >
            ADVANCED AEROSPACE MANUFACTURING
          </motion.p>

          {/* Detailed Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Industry-leading <span className="text-accent-cyan font-semibold">4-sigma targeting system</span> with
            lifetime reject rates below 0.17%. Specializing in adaptive machining,
            5-axis CNC, and precision metrology for critical aerospace components.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-accent-cyan/10 to-accent-electric/5 border border-accent-cyan/20 rounded-lg p-4"
              >
                <stat.icon className="w-6 h-6 text-accent-cyan mb-2 mx-auto" />
                <div className="text-2xl font-black text-accent-cyan">{stat.value}</div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Bigger and Bolder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              size="lg"
              className="group text-lg px-8 py-6 bg-gradient-to-r from-accent-cyan to-accent-electric hover:from-accent-electric hover:to-accent-cyan font-bold shadow-lg shadow-accent-cyan/25"
            >
              REQUEST QUOTE
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-2 border-accent-cyan/50 hover:border-accent-cyan hover:bg-accent-cyan/10 font-bold"
            >
              <Link href="/services">
                VIEW CAPABILITIES
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold">30+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold">Fortune 500 Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold">24/7 Production</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-accent-cyan/50 rounded-full flex justify-center">
              <div className="w-1.5 h-4 bg-accent-cyan rounded-full mt-2" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-electric/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-cyan/5 to-transparent rounded-full" />
      </div>
    </section>
  );
}