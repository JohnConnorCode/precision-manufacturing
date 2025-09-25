"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, Zap, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { PremiumButton } from '@/components/ui/premium-button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/lib/theme';

const navigation = [
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: '5-Axis Machining', href: '/services/5-axis-machining', description: 'Complex geometries with precision' },
      { name: 'Adaptive Machining', href: '/services/adaptive-machining', description: 'Real-time process adjustments' },
      { name: 'Metrology & Inspection', href: '/services/metrology', description: 'Complete dimensional verification' },
      { name: 'Engineering Support', href: '/services/engineering', description: 'Design for manufacturability' },
    ],
  },
  {
    name: 'Industries',
    href: '/industries',
    children: [
      { name: 'Aerospace', href: '/industries/aerospace', description: 'Critical aerospace components' },
      { name: 'Energy & Turbines', href: '/industries/energy', description: 'Power generation solutions' },
      { name: 'Defense', href: '/industries/defense', description: 'ITAR compliant manufacturing' },
    ],
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Compliance',
    href: '#',
    children: [
      { name: 'Terms & Conditions', href: '/compliance/terms', description: 'Purchase order terms' },
      { name: 'Supplier Requirements', href: '/compliance/supplier-requirements', description: 'Supplier guidelines' },
    ],
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar - Hidden on mobile */}
      <aside className="hidden lg:block fixed top-0 z-[150] w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/10" role="complementary" aria-label="Contact information">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+15032319093" className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors group" aria-label="Phone: 503-231-9093">
              <Phone className="h-3 w-3 group-hover:text-cyan-400" aria-hidden="true" />
              <span>503-231-9093</span>
            </a>
            <a href="mailto:officemgr@iismet.com" className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors group" aria-label="Email: officemgr@iismet.com">
              <Mail className="h-3 w-3 group-hover:text-cyan-400" aria-hidden="true" />
              <span>officemgr@iismet.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Zap className="h-3 w-3 text-cyan-400" aria-hidden="true" />
            <span className={cn(theme.typography.badge, 'text-slate-400')}>ISO 9001 • AS9100D • ITAR REGISTERED</span>
          </div>
        </div>
      </aside>

      {/* Main Navigation */}
      <header
        className={cn(
          'fixed z-[140] w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg lg:top-10 top-0 border-b-2 border-cyan-500/20'
            : 'bg-white/90 backdrop-blur-xl lg:top-10 top-0 border-b border-slate-200/50'
        )}
      >
        <nav className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger
                        className="bg-transparent hover:bg-slate-50 data-[state=open]:bg-slate-50 text-slate-700 font-medium"
                        aria-label={`${item.name} menu`}
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <motion.ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="grid w-[500px] gap-2 p-4 bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-xl shadow-xl"
                        >
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block select-none rounded-lg p-4 no-underline outline-none transition-all',
                                    'hover:bg-slate-100/80 hover:shadow-sm',
                                    'focus:bg-slate-100 focus:outline-2 focus:outline-cyan-500',
                                    'group'
                                  )}
                                  aria-label={`${child.name} - ${child.description || ''}`}
                                >
                                  <div className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">
                                    {child.name}
                                  </div>
                                  {child.description && (
                                    <p className="text-xs text-slate-500 mt-1">
                                      {child.description}
                                    </p>
                                  )}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </motion.ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2',
                        'text-sm font-medium transition-all',
                        'hover:bg-slate-50 text-slate-700 font-medium',
                        pathname === item.href && 'bg-slate-100/50'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA - Premium Design */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <PremiumButton>
                REQUEST QUOTE
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PremiumButton>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/95 backdrop-blur-xl overflow-y-auto max-h-screen">
              <nav className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div className="space-y-3">
                        <div className="font-semibold text-sm text-slate-900">
                          {item.name}
                        </div>
                        <div className="space-y-2 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block mt-6">
                  <PremiumButton className="w-full">
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
}