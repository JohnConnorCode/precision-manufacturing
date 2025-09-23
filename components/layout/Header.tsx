"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
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

const navigation = [
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: '5-Axis Machining', href: '/services/5-axis-machining' },
      { name: 'Adaptive Machining', href: '/services/adaptive-machining' },
      { name: 'Metrology & Inspection', href: '/services/metrology' },
      { name: 'Engineering Support', href: '/services/engineering' },
    ],
  },
  {
    name: 'Industries',
    href: '/industries',
    children: [
      { name: 'Aerospace', href: '/industries/aerospace' },
      { name: 'Energy & Turbines', href: '/industries/energy' },
      { name: 'Defense', href: '/industries/defense' },
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
      { name: 'Terms & Conditions', href: '/compliance/terms' },
      { name: 'Supplier Requirements', href: '/compliance/supplier-requirements' },
    ],
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="hidden lg:block fixed top-0 z-50 w-full bg-accent-cyan/10 border-b border-accent-cyan/20">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+15031234567" className="flex items-center space-x-2 hover:text-accent-cyan transition-colors">
              <Phone className="h-3 w-3" />
              <span className="font-medium">503-123-4567</span>
            </a>
            <a href="mailto:contact@precisionmfg.com" className="flex items-center space-x-2 hover:text-accent-cyan transition-colors">
              <Mail className="h-3 w-3" />
              <span className="font-medium">contact@precisionmfg.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <span className="font-bold text-accent-cyan">ISO 9001</span>
            <span className="font-bold text-accent-cyan">AS9100D</span>
            <span className="font-bold text-accent-cyan">ITAR REGISTERED</span>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'fixed z-50 w-full transition-all duration-300 border-b-2 border-accent-cyan/20',
          isScrolled ? 'bg-background/98 backdrop-blur-lg shadow-lg top-0' : 'bg-background lg:top-10 top-0',
          hideHeader ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <nav className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-12 w-auto" />
          </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                )}
                              >
                                <div className="text-sm font-medium leading-none">
                                  {child.name}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                      pathname === item.href && 'bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="outline"
            size="default"
            className="border-2 border-accent-cyan hover:bg-accent-cyan hover:text-background font-bold text-sm px-6"
          >
            REQUEST QUOTE
          </Button>
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-muted-foreground">
                        {item.name}
                      </div>
                      <div className="space-y-1 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-sm hover:text-accent-cyan transition-colors"
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
                      className="block py-2 font-medium hover:text-accent-cyan transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button className="mt-4 w-full">Get Quote</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
    </>
  );
}