import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">PRECISION MFG</h3>
            <p className="text-sm text-muted-foreground">
              Advancing aerospace and precision manufacturing with cutting-edge technology and ITAR-compliant processes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-accent-cyan transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-accent-cyan transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-accent-cyan transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/5-axis-machining" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  5-Axis Machining
                </Link>
              </li>
              <li>
                <Link href="/services/adaptive-machining" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Adaptive Machining
                </Link>
              </li>
              <li>
                <Link href="/services/metrology" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Metrology & Inspection
                </Link>
              </li>
              <li>
                <Link href="/services/engineering" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Engineering Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/compliance/terms" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/compliance/supplier-requirements" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Supplier Requirements
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-accent-cyan transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">contact@precisionmfg.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  123 Aerospace Blvd<br />
                  Industry City, CA 90210
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Precision Manufacturing. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs">
              <span className="text-muted-foreground">ISO 9001:2015</span>
              <span className="text-muted-foreground">AS9100D</span>
              <span className="text-muted-foreground">ITAR Registered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;