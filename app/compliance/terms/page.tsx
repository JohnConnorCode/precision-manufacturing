import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Precision Manufacturing',
  description: 'Terms and conditions for Precision Manufacturing services and supplier agreements.',
};

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <p className="text-muted-foreground">Effective Date: January 1, 2024 | Version: 2.0</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Terms</h2>
          <p>
            These Terms and Conditions govern all purchase orders, contracts, and agreements between
            Precision Manufacturing ("Supplier") and its customers ("Buyer"). By placing an order,
            Buyer agrees to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Quotations and Orders</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All quotations are valid for 30 days unless otherwise specified</li>
            <li>Orders must reference a valid quotation number</li>
            <li>Minimum order value: $500 USD</li>
            <li>Changes to orders must be submitted in writing and may affect delivery schedules</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Pricing and Payment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prices are in USD unless otherwise specified</li>
            <li>Payment terms: Net 30 days from invoice date</li>
            <li>Setup and tooling charges are non-refundable</li>
            <li>Late payments subject to 1.5% monthly interest</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Delivery and Shipping</h2>
          <p>
            Delivery dates are estimates based on current production schedules. Supplier will make
            commercially reasonable efforts to meet requested delivery dates. Shipping terms are
            FOB Origin unless otherwise agreed in writing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Quality and Inspection</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All parts manufactured to specified tolerances and requirements</li>
            <li>First article inspection reports available upon request</li>
            <li>Material certifications provided with shipment</li>
            <li>Non-conforming parts must be reported within 10 business days of receipt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Warranty</h2>
          <p>
            Supplier warrants that products will conform to specifications and be free from defects
            in material and workmanship for a period of 12 months from delivery. This warranty does
            not cover normal wear, misuse, or modifications made by Buyer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. ITAR Compliance</h2>
          <p>
            Buyer acknowledges that certain products may be subject to International Traffic in Arms
            Regulations (ITAR). Buyer agrees to comply with all applicable export control laws and
            regulations. Technical data and products subject to ITAR cannot be exported without
            proper authorization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Proprietary Information</h2>
          <p>
            All drawings, specifications, and technical data provided by either party shall remain
            the property of the disclosing party. Recipient agrees to maintain confidentiality and
            not disclose to third parties without written consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            Supplier's liability shall not exceed the purchase price of the products. In no event
            shall Supplier be liable for consequential, incidental, or punitive damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Force Majeure</h2>
          <p>
            Neither party shall be liable for delays or failures in performance resulting from acts
            beyond their reasonable control, including but not limited to acts of God, natural
            disasters, war, terrorism, labor disputes, or government actions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of the State of California, USA. Any disputes
            shall be resolved through binding arbitration in accordance with the rules of the
            American Arbitration Association.
          </p>
        </section>

        <section className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>
            For questions regarding these terms, please contact:<br />
            Legal Department<br />
            Email: legal@precisionmfg.com<br />
            Phone: +1 (555) 123-4567
          </p>
        </section>
      </div>
    </div>
  );
}