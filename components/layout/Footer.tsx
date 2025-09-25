"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin, Zap } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { theme, cn } from '@/lib/theme';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-t border-cyan-600/10">
      <div className="container py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={logoVariants}>
              <Logo variant="light" className="h-10 w-auto" />
            </motion.div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">INTEGRATED INSPECTION SYSTEMS</h3>
            <p className={cn(theme.typography.small, 'text-slate-400')}>
              Quality is not inspected into a product but is inherently designed and built into every process.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-cyan-600 transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-cyan-600 transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-slate-400 hover:text-cyan-600 transition-colors" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-cyan-600">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Machining
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Inspection
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Fixture Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Metrology
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Metbase®
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-cyan-600">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/compliance/terms" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/compliance/supplier-requirements" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Supplier Requirements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-3 text-cyan-600">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-slate-400 mt-0.5" />
                <a href="mailto:officemgr@iismet.com" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  officemgr@iismet.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-slate-400 mt-0.5" />
                <a href="tel:+15032319093" className="text-slate-400 hover:text-cyan-600 transition-colors">
                  +1 (503) 231-9093
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                <span className="text-slate-400">
                  14310 SE Industrial Way<br />
                  Clackamas, OR 97015<br />
                  United States
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-cyan-600/10"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={cn(theme.typography.small, 'text-slate-500')}>
              © {new Date().getFullYear()} Integrated Inspection Systems, Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Zap className="h-3 w-3 text-cyan-600" />
              <div className={cn(theme.typography.badge, 'text-slate-500')}>
                <span>Founded 1995</span>
                <span className="mx-2">•</span>
                <span>ISO 9001:2015</span>
                <span className="mx-2">•</span>
                <span>AS9100D</span>
                <span className="mx-2">•</span>
                <span>ITAR Registered</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;