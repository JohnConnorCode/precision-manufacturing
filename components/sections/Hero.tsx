"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ParallaxSlider from '@/components/ui/parallax-slider';

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 300], [0, 50]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const heroImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80'
  ];

  // Sequential animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Slider */}
      <ParallaxSlider images={heroImages} />

      {/* Content Container */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 pt-32 pb-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Certification Badges - Fade in first */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mb-8"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-sm text-cyan-400 border border-cyan-500/30"
            >
              AS9100D Certified
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-sm text-cyan-400 border border-cyan-500/30"
            >
              ITAR Registered
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 backdrop-blur-sm text-cyan-400 border border-cyan-500/30"
            >
              ISO 9001:2015
            </motion.span>
          </motion.div>

          {/* Company Name - Letter by letter animation */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <motion.div className="overflow-hidden">
              <motion.span className="inline-block">
                {"INTEGRATED".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={letterAnimation}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"
                    style={{ marginRight: letter === " " ? "0.25em" : "0" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>

            <motion.div className="overflow-hidden mt-2">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="text-white"
              >
                INSPECTION SYSTEMS
              </motion.div>
            </motion.div>
          </motion.h1>

          {/* Tagline with typewriter effect */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 mb-4"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              Aerospace-Grade Precision Manufacturing
            </motion.span>
          </motion.div>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-base md:text-lg text-slate-400 mb-10"
          >
            Delivering Excellence Since 1995 • 30+ Years of Innovation
          </motion.p>

          {/* CTAs with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-8 py-4 border-2 border-slate-600 backdrop-blur-sm bg-slate-900/30 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 hover:bg-slate-900/50 font-medium text-lg transition-all duration-300"
              >
                <Link href="/services">
                  Our Capabilities
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Service highlights - Fade in last */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { label: '5-Axis', value: 'Machining' },
              { label: 'CMM', value: 'Inspection' },
              { label: 'Fixture', value: 'Design' },
              { label: 'Metrology', value: 'Services' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 3 + (i * 0.1),
                  type: "spring",
                  stiffness: 100
                }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-cyan-400">{item.label}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-cyan-400/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated accent lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          animate={{
            x: [-200, 2000],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0
          }}
        />
        <motion.div
          className="absolute top-3/4 -right-48 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          animate={{
            x: [200, -2000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </motion.div>
    </section>
  );
}