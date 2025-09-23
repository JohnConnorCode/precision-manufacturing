"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FileText, Shield, DollarSign, Package, AlertCircle,
  CheckCircle, Clock, Lock, Globe, Scale,
  Zap, Info, Phone, Mail, MapPin,
  Wrench, Award, BookOpen, Users
} from 'lucide-react';

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const sections = [
    {
      icon: FileText,
      title: "ACCEPTANCE OF PURCHASE ORDER",
      content: "This document is an offer by the Buyer to the Seller for the purchase of goods and/or services herein and supersedes all negotiations, representations or proposals. These terms and conditions shall become a binding contract (the "Purchase Order") upon the Seller's (1) written acknowledgement; (2) shipment of the products; or (3) performance of the services. Acceptance is limited to the terms and conditions herein. Any terms proposed in the Seller's acceptance of the purchase order that add to, vary from, or conflict with the terms herein are hereby objected to. Any such proposed terms shall not become a part of this Purchase Order. Seller's failure to object to any of Buyer's terms and conditions shall not constitute a waiver or modification of these terms and conditions.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: DollarSign,
      title: "PRICE",
      content: "The pricing for the products are as noted in the Purchase Order. Unless otherwise specified in the Purchase Order, the price includes all packaging, shipping costs to the Buyer's place of destination, insurance, customs duties, fees and applicable taxes, including, but not limited to, all sales, use or excise taxes. No increase in the price may be made without the prior written consent of the Buyer.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Package,
      title: "SHIPPING / DELIVERY",
      content: "Time is of the essence for this Purchase Order. Any anticipated delays in shipment/delivery must be immediately communicated to the Buyer so as to avoid any damages associated with late delivery. All goods shall be received by the Buyer subject to the Buyer's right of inspection and rejection. Defective or non-conforming goods or goods not in accordance with the Buyer's specifications will be held for the Seller's instructions at the Seller's risk. Return to the Seller shall be made at the Seller's expense.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Clock,
      title: "PAYMENT TERMS",
      content: "Payment terms shall be defined as \"Net 30 days\" (30 days after receipt of an undisputed invoice). No change to payment terms shall be made without prior written approval of the Buyer.",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Shield,
      title: "WARRANTY",
      content: "Seller warrants that products manufactured pursuant to this Purchase Order: (1) Will be free from defects in material, workmanship and design for a period of at least one year from the date of delivery, (2) Will conform to applicable specifications, drawings, samples or other descriptions (3) Be fit for use for the particular purpose described in this Purchase Order. These warranties shall survive inspection, test and acceptance of the products.",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      icon: AlertCircle,
      title: "BUYER'S PROPERTY",
      content: "Seller will not, without prior written consent, (i) disclose to any person outside its employ, or use, except for the Buyer's benefit, any data or technical information received from the Buyer under this Purchase Order, and (ii) will not disclose to any third person outside its employ (with exception of its subcontractors' use for fabrication and/or assembly to this Purchase Order provided the subcontractors agree to conditions consistent with this Purchase Order) any non-public information pertaining to the business of the Buyer except as required by law. Unless otherwise agreed, all information disclosed by the Buyer to the Seller in connection with this Purchase Order shall be deemed proprietary and confidential.",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      icon: CheckCircle,
      title: "QUALITY",
      content: "Seller shall provide and maintain a quality system acceptable to the Buyer and compliant with (1) AS9100 latest revision, (2) ISO 9001 latest revision and (3) AS9102 latest revision (for first article requirements). Records of all inspection work by the Seller shall be kept complete and available to the Buyer for three (3) years after delivery of the product.",
      gradient: "from-teal-500/20 to-cyan-500/20"
    },
    {
      icon: Globe,
      title: "SOURCE INSPECTION",
      content: "The Buyer's customer, regulatory authorities and the Buyer, reserve the right, upon reasonable notice, to inspect at the source, all products, materials, and pertinent quality records applicable to work performed under this Purchase Order.",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      icon: Lock,
      title: "DPAS/DX RATING",
      content: "Any priority rating identified on this Purchase Order is certified for national defense use and the Seller is required to follow all the provisions of the Defense Priorities and Allocations System Regulation (15 CFR Part 700).",
      gradient: "from-gray-500/20 to-slate-500/20"
    },
    {
      icon: Wrench,
      title: "TOOLING",
      content: "The Buyer agrees to pay the agreed upon charges for special tooling, gauges, dies, patterns, jigs and fixtures (collectively \"tooling\") required to produce the items to be supplied under this order. All tooling shall be and remain the property of the Buyer.",
      gradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      icon: Award,
      title: "CERTIFICATES",
      content: "For products manufactured and/or distributed by Seller (or its subsidiaries) the Certificate of Compliance shall be made on Seller's letterhead and state the Purchase Order number, item number, revision level, part description and quantity. For parts distributed by Seller which are manufactured by other than Seller (or its subsidiaries) the Certificate of Compliance shall state, in addition, the actual manufacturer's name and part number and lot or date code.",
      gradient: "from-emerald-500/20 to-green-500/20"
    },
    {
      icon: BookOpen,
      title: "TERMS FLOW DOWN",
      content: "Seller agrees to incorporate this Purchase Order, including these Terms and Conditions (and, in particular, all provisions related to export control restrictions), in all of its subcontracts or other agreements with its subcontractors and suppliers providing products or services for this Purchase Order.",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: Scale,
      title: "INDEMNITY",
      content: "Seller will indemnify, defend and hold harmless Buyer, its directors, officers, employees, agents, customers and users of its products (\"Indemnitees\") from all claims, loss, damage, fines, penalties, liability and expense incurred by Indemnitees arising out of any breach or alleged breach of any warranty of Seller and for any actual or alleged defect in any product supplied by Seller.",
      gradient: "from-violet-500/20 to-purple-500/20"
    },
    {
      icon: Users,
      title: "SOCIAL ACCOUNTABILITY REQUIREMENTS",
      content: "Seller shall abide by the following standards of conduct: Employment is freely chosen, freedom of association and the right to collective bargaining are respected, working conditions are safe and hygienic, child labor shall not be used, remuneration paid to workers meets at a minimum, national legal standards or industry benchmark standards, whichever is higher, working hours are not excessive, no discrimination is practiced, physical abuse or discipline the threat of physical abuse, sexual or other harassment and verbal abuse or other forms of intimidation shall be prohibited.",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: FileText,
      title: "COUNTERFEIT PARTS PREVENTION",
      content: "Seller shall only purchase authentic product directly from the Original Equipment Manufacturer (OEM) and Original Component Manufacturer (OCM) or their franchised distributor. Parts from any other source are strictly prohibited unless the Buyer has given prior written approval to use another source. The Seller is responsible for ensuring that fraudulent/counterfeit work and fraudulent/counterfeit parts (electronic, electrical and electromechanical parts that are unauthorized copies or imitations intentionally misrepresented as genuine OEM/OCM parts) are not delivered to the Buyer. If product delivered is subsequently found to be fraudulent/counterfeit, the Seller shall, at the Buyer's discretion, promptly replace the fraudulent/counterfeit product with authentic product conforming to the requirements of the Purchase Order or promptly refund the price of the fraudulent/counterfeit product.",
      gradient: "from-red-600/20 to-pink-600/20"
    },
    {
      icon: Zap,
      title: "TERMINATION",
      content: "The Buyer may immediately terminate this Purchase Order without cause at any time upon written notice to the Seller. Upon receipt of such notice, the Seller shall immediately cease work. The Buyer will pay the Seller for satisfactory products delivered or services performed as of the termination date. Sellers failure to perform any of its obligations under this Purchase Order will be deemed a default. The Buyer may terminate this order for default without liability.",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      icon: Info,
      title: "COMPLIANCE WITH LAWS",
      content: "Seller warrants that all products sold or services delivered to the Buyer will be produced, sold, delivered and furnished in strict compliance with all applicable laws, rules and regulations, including without limitation, fair labor standards, equal employment opportunity and the requirements of 41 CFR 60-1.4, 60-250.5 and 60-741.5. Seller will defend, indemnify and hold harmless Buyer against all claims, demands or liabilities arising out of the Seller's failure to comply with this warranty.",
      gradient: "from-slate-500/20 to-gray-500/20"
    },
    {
      icon: Globe,
      title: "EXPORT CONTROL",
      content: "Seller acknowledges that the products, materials, services, equipment and technology data obtained from Buyer may be controlled by U.S. export control laws and regulations, including the Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR). Seller agrees to comply with all applicable U.S. export control laws and regulations.",
      gradient: "from-blue-600/20 to-indigo-600/20"
    },
    {
      icon: Scale,
      title: "APPLICABLE LAW",
      content: "This Purchase Order shall be governed by the laws of the State of California, USA without reference to its conflicts of laws provisions. The U.N. Convention on Contracts for the International Sale of Goods (Vienna, 1980) shall not apply to this Purchase Order or to any dispute arising out of it.",
      gradient: "from-purple-600/20 to-violet-600/20"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background">
      {/* Parallax Background */}
      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-background to-accent-electric/5" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-electric/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5,
          }}
        >
          <div className="w-2 h-2 bg-accent-cyan/30 rounded-full blur-sm" />
        </motion.div>
      ))}

      <div className="container relative z-10 py-24 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-electric">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xl text-muted-foreground">
            Purchase Order Terms and Conditions
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
              <Shield className="w-4 h-4 mr-2" />
              Effective: January 2024
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
              <Award className="w-4 h-4 mr-2" />
              Version 3.0
            </span>
          </div>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, translateY: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative overflow-hidden rounded-2xl border border-accent-cyan/20 bg-gradient-to-br ${section.gradient} backdrop-blur-sm`}
              >
                <div className="absolute inset-0 bg-grid opacity-5" />
                <div className="relative p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-electric flex items-center justify-center shadow-lg shadow-accent-cyan/25">
                        <section.icon className="w-7 h-7 text-background" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4 text-accent-cyan">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-accent-cyan/30 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-cyan/10 to-accent-electric/10 border border-accent-cyan/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-grid opacity-5" />
          <div className="relative p-12 text-center">
            <h3 className="text-3xl font-bold mb-6 text-accent-cyan">
              CONTACT INFORMATION
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              For questions regarding these terms and conditions, please contact:
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <a href="mailto:legal@precisionmfg.com" className="flex items-center gap-3 hover:text-accent-cyan transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-electric flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-background" />
                </div>
                <span className="font-semibold">legal@precisionmfg.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 hover:text-accent-cyan transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-electric flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-background" />
                </div>
                <span className="font-semibold">+1 (555) 123-4567</span>
              </a>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-electric flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <span className="font-semibold">Legal Department</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Tech Lines */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </div>
    </div>
  );
}