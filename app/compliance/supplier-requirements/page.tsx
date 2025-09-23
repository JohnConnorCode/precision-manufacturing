import { Metadata } from 'next';
import { FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Supplier Quality Requirements | Precision Manufacturing',
  description: 'Supplier quality requirements and standards for Precision Manufacturing vendors and partners.',
};

export default function SupplierRequirementsPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Supplier Quality Requirements</h1>
          <p className="text-muted-foreground">Rev 3.0 | Effective: January 1, 2024</p>
        </div>
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <section className="p-6 bg-accent/5 rounded-lg border border-accent-cyan/20">
          <h2 className="text-xl font-semibold text-accent-cyan">Compliance Notice</h2>
          <p>
            All suppliers must maintain compliance with AS9100D, ISO 9001:2015, and applicable
            ITAR/EAR regulations. This document outlines minimum requirements for all vendors
            supplying materials, components, or services to Precision Manufacturing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Quality System Requirements</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">1.1 Certification Requirements</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain current ISO 9001:2015 certification at minimum</li>
            <li>AS9100D certification preferred for aerospace suppliers</li>
            <li>NADCAP certification required for special processes</li>
            <li>Provide copies of current certificates upon request</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">1.2 Quality Control</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Documented quality management system (QMS)</li>
            <li>Calibrated measurement equipment with traceability to NIST</li>
            <li>Statistical process control (SPC) for critical characteristics</li>
            <li>Documented corrective and preventive action (CAPA) process</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Purchase Order Requirements</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">2.1 Order Acknowledgment</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acknowledge receipt within 24 hours</li>
            <li>Confirm delivery date and pricing</li>
            <li>Identify any exceptions or deviations</li>
            <li>No substitutions without written approval</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">2.2 Documentation Requirements</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Certificate of Conformance (C of C) with each shipment</li>
            <li>Material Test Reports (MTR) for raw materials</li>
            <li>First Article Inspection (FAI) per AS9102 when required</li>
            <li>Maintain records for minimum 10 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Special Process Requirements</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">3.1 NADCAP Processes</h3>
          <p>The following special processes require NADCAP certification:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Heat Treatment</li>
            <li>Non-Destructive Testing (NDT)</li>
            <li>Chemical Processing</li>
            <li>Coatings</li>
            <li>Welding (when applicable)</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">3.2 Process Control</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Documented process procedures</li>
            <li>Qualified personnel with current certifications</li>
            <li>Process validation and monitoring</li>
            <li>Batch traceability and identification</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Material Requirements</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">4.1 Raw Materials</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Materials must meet applicable AMS, ASTM, or MIL specifications</li>
            <li>Provide material certifications with chemical and mechanical properties</li>
            <li>Maintain lot traceability throughout production</li>
            <li>No counterfeit materials or unauthorized substitutions</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">4.2 Shelf Life Control</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Track and control shelf life for time-sensitive materials</li>
            <li>Provide minimum 75% remaining shelf life at delivery</li>
            <li>Label with expiration dates clearly visible</li>
            <li>FIFO inventory management required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Inspection Requirements</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">5.1 Incoming Inspection</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>100% inspection of critical characteristics</li>
            <li>Sampling plans per ANSI/ASQ Z1.4 or Z1.9</li>
            <li>Document inspection results and maintain records</li>
            <li>Segregate non-conforming material</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">5.2 In-Process Inspection</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>First piece inspection at setup</li>
            <li>Periodic inspection during production</li>
            <li>Final inspection before shipment</li>
            <li>Statistical Process Control (SPC) where specified</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Non-Conformance Management</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">6.1 Notification</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Notify Precision Manufacturing within 24 hours of detection</li>
            <li>Provide detailed non-conformance report</li>
            <li>Obtain written disposition before proceeding</li>
            <li>No unauthorized rework or repair</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">6.2 Corrective Action</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Root cause analysis required for all non-conformances</li>
            <li>Corrective action plan within 5 business days</li>
            <li>Effectiveness verification required</li>
            <li>8D reporting format preferred</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Packaging and Shipping</h2>
          <h3 className="text-xl font-medium mt-4 mb-2">7.1 Packaging Requirements</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Protect parts from damage during shipment</li>
            <li>Use ESD-safe packaging for electronic components</li>
            <li>Include desiccant for moisture-sensitive items</li>
            <li>Clear labeling with part number, quantity, and PO number</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">7.2 Documentation</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Packing list with each shipment</li>
            <li>Certificate of Conformance</li>
            <li>Material certifications as applicable</li>
            <li>Special handling instructions if required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. ITAR/Export Control</h2>
          <p className="mb-4">
            Suppliers handling ITAR-controlled technical data or defense articles must:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain current ITAR registration</li>
            <li>Implement Technology Control Plan (TCP)</li>
            <li>Restrict access to authorized US persons only</li>
            <li>No unauthorized exports or re-exports</li>
            <li>Annual compliance certification required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Supplier Performance Metrics</h2>
          <p className="mb-4">Suppliers will be evaluated quarterly on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>On-Time Delivery (Target: 98%)</li>
            <li>Quality Performance (Target: 99.5%)</li>
            <li>Documentation Accuracy (Target: 100%)</li>
            <li>Corrective Action Response Time</li>
            <li>Cost competitiveness</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Right of Access</h2>
          <p>
            Precision Manufacturing, our customers, and regulatory authorities reserve the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Audit supplier facilities and quality systems</li>
            <li>Review quality records and documentation</li>
            <li>Witness testing and inspection activities</li>
            <li>Verify compliance with requirements</li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Supplier Acknowledgment</h3>
          <p className="mb-4">
            By accepting a purchase order from Precision Manufacturing, supplier acknowledges
            understanding and agreement to comply with these requirements.
          </p>
          <div className="space-y-2">
            <p><strong>Quality Assurance Contact:</strong></p>
            <p>Email: quality@precisionmfg.com</p>
            <p>Phone: +1 (555) 123-4567 ext. 200</p>
            <p>Fax: +1 (555) 123-4568</p>
          </div>
        </section>

        <section className="mt-8 p-4 border-2 border-accent-cyan/30 rounded-lg bg-accent-cyan/5">
          <p className="text-sm font-medium text-accent-cyan">
            Document Control: This is a controlled document. The current version is maintained
            in the Quality Management System. Printed copies are uncontrolled unless stamped
            "CONTROLLED COPY" with an expiration date.
          </p>
        </section>
      </div>
    </div>
  );
}