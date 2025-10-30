import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const supplierRequirementsData = {
  globalType: 'supplier-requirements',
  hero: {
    badges: [
      { iconName: 'Shield', text: 'QUALITY STANDARD' },
      { iconName: 'FileCheck', text: 'ISO COMPLIANT' },
      { iconName: 'Lock', text: 'ITAR CONTROLLED' }
    ],
    title: 'SUPPLIER QUALITY',
    titleHighlight: 'REQUIREMENTS',
    description: 'Comprehensive standards ensuring excellence in aerospace and precision manufacturing supply chain',
    versionStatus: 'Version 3.0 Active',
    effectiveDate: 'Effective: January 2024',
    reviewPeriod: 'Review: Annual'
  },
  sections: [
    {
      id: 'purpose',
      number: '1',
      title: 'PURPOSE',
      iconName: 'BookOpen',
      content: 'The purpose of this document is to establish a uniform process for supplier quality requirements.',
      color: 'from-blue-500/10 to-blue-600/5'
    },
    {
      id: 'scope',
      number: '2',
      title: 'SCOPE',
      iconName: 'Shield',
      content: 'This Standard Operating Procedure applies to the process of supplier quality requirements.',
      color: 'from-blue-600/10 to-blue-600/5'
    }
  ],
  requirements: [
    {
      number: '3.1',
      title: 'Supplier Responsibility',
      iconName: 'AlertCircle',
      content: 'The supplier is fully responsible for adhering to the requirements stated in this document. Acceptance of product by Integrated Inspection Systems, Inc. does not relieve the supplier of any liability concerning non-conformities or malfunctions detected after delivery.'
    },
    {
      number: '3.2',
      title: 'Non-Conformity Reporting',
      iconName: 'FileCheck',
      content: 'The supplier is required to immediately inform Integrated Inspection Systems, Inc. of any non-conformity detected during assembly, test or use of the product, and immediately upon the discovery of any non-conformity that might affect the operational safety of any previously delivered product.',
      additional: 'The acceptance of non-conforming parts is the prerogative of Integrated Inspection Systems, Inc. Non-conforming parts that do not meet requirements must be presented in writing to Integrated Inspection Systems, Inc. as a supplier request for material review action. Unless otherwise instructed, all non-conforming parts may be held by the supplier until the request has been dispositioned by Integrated Inspection Systems, Inc.'
    },
    {
      number: '3.3',
      title: 'Right to Monitor',
      iconName: 'Users',
      content: 'Integrated Inspection Systems, Inc., its customers or regulatory authorities reserve the right to monitor the manufacturing and maintenance activities and the Quality Control activities on the premises of the supplier or to have the monitoring carried out by a third party.',
      list: [
        { item: 'Access to the supplier or subcontractor\'s premises and to any documents that contribute to the manufacture, maintenance, inspection, and definition of the product.' },
        { item: 'Necessary facilities are provided in order to complete the mission.' }
      ]
    },
    {
      number: '3.4',
      title: 'Personnel Qualifications',
      iconName: 'Award',
      content: 'The supplier has to manage the personal qualifications to ensure that the personnel have the proper competence to perform the task to ensure the quality of the product.',
      additional: 'The supplier manages a list of all training given to personnel and these records are subject to review by Integrated Inspection Systems, Inc. Individuals performing special processes, such as welders or NDI, are qualified according to current standards and regulations.'
    },
    {
      number: '3.5',
      title: 'Quality System Requirements',
      iconName: 'Shield',
      content: 'The supplier is authorized to implement a Quality System that:',
      list: [
        { item: 'Identifies the processes needed for the quality system and their application throughout the organization and document them.' },
        { item: 'Determine criteria and methods needed to ensure that the operation and control of the processes are effective, and document them in the Quality Documentation.' },
        { item: 'Ensures that the product or service being provided meets all of Integrated Inspection Systems, Inc. requirements.' },
        { item: 'Ensures all equipment used in the production of Integrated Inspection Systems, Inc. parts has been verified, validated, and calibrated if necessary.' }
      ]
    },
    {
      number: '3.6',
      title: 'Change Notification',
      content: 'The supplier shall notify Integrated Inspection Systems, Inc. of any changes in product and/or process, changes of suppliers, changes of manufacturing facility location, and where required, obtain organization approval when applicable.'
    },
    {
      number: '3.7',
      title: 'Supply Chain Requirements',
      content: 'The supplier shall flow down to the supply chain the applicable requirements including customer requirements when applicable.'
    },
    {
      number: '3.8',
      title: 'Record Retention',
      iconName: 'Clock',
      content: 'The supplier shall retain all Integrated Inspection Systems, Inc. records for a minimum of 10 years when applicable.'
    },
    {
      number: '3.9',
      title: 'Test Specimens',
      content: 'When applicable, the supplier may be asked to supply test specimens for design approval, inspection/verification, investigation, or auditing.'
    },
    {
      number: '3.10',
      title: 'Technical Documentation',
      iconName: 'FileText',
      content: 'When applicable, the supplier may be asked to supply design, test, inspection, verification, use of statistical techniques for product acceptance, and related instructions for acceptance by Integrated Inspection Systems, Inc., and as applicable critical items including key characteristics.'
    },
    {
      number: '3.11',
      title: 'Certificate of Compliance',
      content: 'With each shipment against this purchase order, the supplier may provide a Certificate of Compliance when applicable.'
    },
    {
      number: '3.12',
      title: 'Packaging Requirements',
      iconName: 'Package',
      content: 'Parts supplied on this order shall be protectively packaged to prevent damage. Each container shall be identified with the part number, and serial numbers, if applicable, of the item enclosed when applicable.'
    },
    {
      number: '3.13',
      title: 'First Article Evaluation',
      content: 'A first article evaluation is required if one of the following occurs:',
      list: [
        { item: 'A new item or process is being produced (first production run).' },
        { item: 'Changes in design effecting form, fit, or function.' },
        { item: 'Changes in manufacturing source(s) processes, inspection methods, location, tooling, or materials with the potential of effecting form, fit, or function.' },
        { item: 'A lapse in production for two (2) years or as specified.' },
        { item: 'When required as part of a corrective action for a part with repetitive rejection history.' }
      ]
    },
    {
      number: '3.14',
      title: 'Calibration Requirements',
      content: 'All tools/equipment sent for calibration must have a report that includes the following upon return to Integrated Inspection Systems, Inc.:',
      list: [
        { item: '"As Found" measurements noted upon receipt' },
        { item: 'Any adjustments made.' },
        { item: '"As Left" measurements upon completion.' },
        { item: 'Certificate of Calibration that is traceable to N.I.S.T.' },
        { item: 'Supplier must maintain a calibration system in compliance with ANSI Z540 or equivalent when applicable.' }
      ]
    },
    {
      number: '3.15',
      title: 'Test Data',
      content: 'Test data shall be supplied if noted on the purchase order.'
    },
    {
      number: '3.16',
      title: 'ITAR Compliance',
      iconName: 'Lock',
      content: 'When the Integrated Inspection Systems, Inc. purchase order identifies ITAR\'s compliance and that the information contained may be subject to International Traffic Arms Regulations (ITAR) or Export Administration Regulations (EAR) controls and may not be disclosed to any foreign person(s) or firm, including persons employed by or associated with your firm, without first complying with all requirements of the ITAR, 22 CFR 120-130 and the EAR, 15 CFR 730-774.',
      additional: 'By this notification, the supplier has been so advised of its compliance obligations under ITAR.'
    },
    {
      number: '3.17',
      title: 'Counterfeit Work/Parts',
      iconName: 'AlertCircle',
      content: '',
      list: [
        { item: 'Supplier agrees and shall ensure that Counterfeit Work and/or Parts are not delivered to Integrated Inspection Systems, Inc.' },
        { item: 'Supplier shall only purchase products to be delivered or incorporated as work to Integrated Inspection Systems, Inc. directly from the Original Component Manufacturer (OCM)/Original Equipment Manufacturer (OEM) or through an OCM/OEM authorized distributor chain. Work shall not be acquired from independent distributors or brokers unless approved in advance in writing by Integrated Inspection Systems, Inc.' },
        { item: 'Supplier shall immediately notify Integrated Inspection Systems, Inc. with the pertinent facts if the supplier becomes aware or suspects that it has furnished Counterfeit Work.' },
        { item: 'When requested, the supplier shall provide OCM/OEM documentation that authenticates traceability of the affected items to the applicable OCM/OEM.' }
      ]
    }
  ],
  additionalSections: [
    {
      number: '4',
      title: 'Record Retention',
      iconName: 'Clock',
      content: 'Suppliers with direct impact on product quality (i.e. calibration labs) must keep records on file for at least five (5) years for each product service when applicable.'
    },
    {
      number: '5',
      title: 'Supplier Contributions to Quality',
      iconName: 'Award',
      list: [
        { item: 'Supplier\'s Contribution to products or service conformity.' },
        { item: 'Supplier\'s Contribution to Product Safety' },
        { item: 'Supplier\'s Awareness of the importance of Ethical Behavior.' }
      ]
    }
  ],
  footerNote: {
    iconName: 'Shield',
    heading: 'Compliance Commitment',
    content: 'By accepting purchase orders from Integrated Inspection Systems, Inc., suppliers acknowledge and agree to comply with all requirements stated in this document. Continuous improvement and commitment to quality excellence are fundamental expectations of our supply chain partners.'
  }
};

async function migrateSupplierRequirements() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const globalsCollection = db.collection('globals');

    const existingSupplierRequirements = await globalsCollection.findOne({ globalType: 'supplier-requirements' });

    if (existingSupplierRequirements) {
      const result = await globalsCollection.updateOne(
        { globalType: 'supplier-requirements' },
        { $set: supplierRequirementsData }
      );
      console.log('✓ Updated existing supplier-requirements global');
      console.log(`  Modified ${result.modifiedCount} document`);
    } else {
      const result = await globalsCollection.insertOne(supplierRequirementsData);
      console.log('✓ Inserted new supplier-requirements global');
      console.log(`  Inserted ID: ${result.insertedId}`);
    }

    console.log('\n✅ Supplier Requirements page migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected from MongoDB');
  }
}

migrateSupplierRequirements();
