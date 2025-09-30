#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Complete internal linking map for all articles
const linkingMap = {
  'series-cmm-02-probe-selection': [
    {
      title: "CMM Setup and Environment Control: Foundation for Precision Measurement",
      slug: "cmm-setup-environment-control-precision",
      excerpt: "Master CMM setup procedures and environmental controls for consistent precision measurement.",
      category: "cmm-inspection",
      readTime: "8 min read"
    },
    {
      title: "CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency",
      slug: "cmm-measurement-strategies-planning",
      excerpt: "Master CMM measurement strategy development, datum establishment, and measurement sequence planning.",
      category: "cmm-inspection",
      readTime: "9 min read"
    },
    {
      title: "CNC Machining Tolerance Capabilities and Specifications",
      slug: "cnc-machining-tolerance-capabilities-precision",
      excerpt: "Master CNC machining tolerance capabilities, achievable specifications, and factors affecting precision.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    }
  ],
  'series-cmm-03-measurement-strategies': [
    {
      title: "CMM Probe Selection and Configuration: Choosing the Right Tool for Precision",
      slug: "cmm-probe-selection-configuration-guide",
      excerpt: "Master CMM probe selection, configuration, and qualification procedures for optimal measurement accuracy.",
      category: "cmm-inspection",
      readTime: "7 min read"
    },
    {
      title: "CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues",
      slug: "cmm-error-analysis-troubleshooting",
      excerpt: "Master CMM error analysis, measurement uncertainty assessment, and systematic troubleshooting techniques.",
      category: "cmm-inspection",
      readTime: "8 min read"
    },
    {
      title: "GD&T Measurement and Verification: CMM Programming and Functional Gaging",
      slug: "gdt-measurement-verification-cmm-functional-gaging",
      excerpt: "Master practical GD&T measurement methods, CMM programming techniques, and functional gaging strategies.",
      category: "gdt-fundamentals",
      readTime: "9 min read"
    }
  ],
  'series-cmm-04-error-analysis': [
    {
      title: "CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency",
      slug: "cmm-measurement-strategies-planning",
      excerpt: "Master CMM measurement strategy development, datum establishment, and measurement sequence planning.",
      category: "cmm-inspection",
      readTime: "9 min read"
    },
    {
      title: "MetBase Statistical Analysis and Reporting: SPC and Advanced Analytics",
      slug: "metbase-statistical-analysis-spc-reporting",
      excerpt: "Master statistical analysis and reporting capabilities in MetBase for comprehensive quality data intelligence.",
      category: "metbase-integration",
      readTime: "8 min read"
    },
    {
      title: "AS9100 Risk Management and Configuration Control for Aerospace Manufacturing",
      slug: "as9100-risk-management-configuration-control-aerospace",
      excerpt: "Master AS9100 risk management principles, configuration control processes, and change management.",
      category: "as9100-compliance",
      readTime: "9 min read"
    }
  ],
  'series-fai-01-as9102-forms': [
    {
      title: "FAI Measurement and Inspection Procedures: Systematic AS9102 Compliance",
      slug: "fai-measurement-inspection-procedures-as9102",
      excerpt: "Master systematic FAI measurement procedures, inspection planning, and AS9102 compliance verification.",
      category: "first-article",
      readTime: "8 min read"
    },
    {
      title: "AS9100 Implementation and Aerospace Quality Certification",
      slug: "as9100-implementation-aerospace-quality-certification",
      excerpt: "Master AS9100 implementation strategies, certification processes, and quality management system development.",
      category: "as9100-compliance",
      readTime: "12 min read"
    },
    {
      title: "GD&T Symbols and Basic Principles: ASME Y14.5 Foundation",
      slug: "gdt-symbols-basic-principles-asme-y14-5",
      excerpt: "Master fundamental GD&T symbols, principles, and applications per ASME Y14.5 standard.",
      category: "gdt-fundamentals",
      readTime: "9 min read"
    }
  ],
  'series-fai-02-measurement-procedures': [
    {
      title: "AS9102 Forms and Documentation Requirements: Complete FAI Compliance Guide",
      slug: "as9102-forms-documentation-fai-compliance",
      excerpt: "Master AS9102 Form 1, Form 2, and Form 3 completion for First Article Inspection compliance.",
      category: "first-article",
      readTime: "10 min read"
    },
    {
      title: "Customer Requirements and FAI Approval Process",
      slug: "customer-fai-requirements-approval-process",
      excerpt: "Navigate complex customer-specific FAI requirements and approval processes for aerospace and defense programs.",
      category: "first-article",
      readTime: "7 min read"
    },
    {
      title: "CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency",
      slug: "cmm-measurement-strategies-planning",
      excerpt: "Master CMM measurement strategy development, datum establishment, and measurement sequence planning.",
      category: "cmm-inspection",
      readTime: "9 min read"
    }
  ],
  'series-fai-03-customer-requirements': [
    {
      title: "FAI Measurement and Inspection Procedures: Systematic AS9102 Compliance",
      slug: "fai-measurement-inspection-procedures-as9102",
      excerpt: "Master systematic FAI measurement procedures, inspection planning, and AS9102 compliance verification.",
      category: "first-article",
      readTime: "8 min read"
    },
    {
      title: "AS9100 Supplier Management and Continuous Improvement",
      slug: "as9100-supplier-management-continuous-improvement",
      excerpt: "Master AS9100 supplier management requirements, performance monitoring, and continuous improvement strategies.",
      category: "as9100-compliance",
      readTime: "8 min read"
    },
    {
      title: "CNC Machining Tolerance Capabilities and Specifications",
      slug: "cnc-machining-tolerance-capabilities-precision",
      excerpt: "Master CNC machining tolerance capabilities, achievable specifications, and factors affecting precision.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    }
  ],
  'series-gdt-01-symbols-principles': [
    {
      title: "GD&T Datum Reference Frames and Coordinate Systems",
      slug: "gdt-datum-reference-frames-coordinate-systems",
      excerpt: "Master datum reference frame establishment, coordinate system definition, and the 3-2-1 principle in GD&T.",
      category: "gdt-fundamentals",
      readTime: "8 min read"
    },
    {
      title: "AS9102 Forms and Documentation Requirements: Complete FAI Compliance Guide",
      slug: "as9102-forms-documentation-fai-compliance",
      excerpt: "Master AS9102 Form 1, Form 2, and Form 3 completion for First Article Inspection compliance.",
      category: "first-article",
      readTime: "10 min read"
    },
    {
      title: "CNC Machining Tolerance Capabilities and Specifications",
      slug: "cnc-machining-tolerance-capabilities-precision",
      excerpt: "Master CNC machining tolerance capabilities, achievable specifications, and factors affecting precision.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    }
  ],
  'series-gdt-02-datum-reference-frames': [
    {
      title: "GD&T Symbols and Basic Principles: ASME Y14.5 Foundation",
      slug: "gdt-symbols-basic-principles-asme-y14-5",
      excerpt: "Master fundamental GD&T symbols, principles, and applications per ASME Y14.5 standard.",
      category: "gdt-fundamentals",
      readTime: "9 min read"
    },
    {
      title: "Position Tolerance and Material Condition Modifiers: MMC, LMC, and Bonus Tolerance",
      slug: "position-tolerance-mmc-lmc-bonus-tolerance",
      excerpt: "Master position tolerance applications, MMC/LMC material condition modifiers, and bonus tolerance calculations.",
      category: "gdt-fundamentals",
      readTime: "10 min read"
    },
    {
      title: "CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency",
      slug: "cmm-measurement-strategies-planning",
      excerpt: "Master CMM measurement strategy development, datum establishment, and measurement sequence planning.",
      category: "cmm-inspection",
      readTime: "9 min read"
    }
  ],
  'series-gdt-03-position-tolerance-material-conditions': [
    {
      title: "GD&T Datum Reference Frames and Coordinate Systems",
      slug: "gdt-datum-reference-frames-coordinate-systems",
      excerpt: "Master datum reference frame establishment, coordinate system definition, and the 3-2-1 principle in GD&T.",
      category: "gdt-fundamentals",
      readTime: "8 min read"
    },
    {
      title: "GD&T Measurement and Verification: CMM Programming and Functional Gaging",
      slug: "gdt-measurement-verification-cmm-functional-gaging",
      excerpt: "Master practical GD&T measurement methods, CMM programming techniques, and functional gaging strategies.",
      category: "gdt-fundamentals",
      readTime: "9 min read"
    },
    {
      title: "CNC Surface Finish Requirements and Machining Quality Optimization",
      slug: "cnc-surface-finish-requirements-machining-quality",
      excerpt: "Master surface finish specifications, measurement techniques, and achievement methods for CNC machining.",
      category: "cnc-manufacturing",
      readTime: "8 min read"
    }
  ],
  'series-gdt-04-measurement-verification': [
    {
      title: "Position Tolerance and Material Condition Modifiers: MMC, LMC, and Bonus Tolerance",
      slug: "position-tolerance-mmc-lmc-bonus-tolerance",
      excerpt: "Master position tolerance applications, MMC/LMC material condition modifiers, and bonus tolerance calculations.",
      category: "gdt-fundamentals",
      readTime: "10 min read"
    },
    {
      title: "CMM Measurement Strategies and Planning: Optimizing Accuracy and Efficiency",
      slug: "cmm-measurement-strategies-planning",
      excerpt: "Master CMM measurement strategy development, datum establishment, and measurement sequence planning.",
      category: "cmm-inspection",
      readTime: "9 min read"
    },
    {
      title: "FAI Measurement and Inspection Procedures: Systematic AS9102 Compliance",
      slug: "fai-measurement-inspection-procedures-as9102",
      excerpt: "Master systematic FAI measurement procedures, inspection planning, and AS9102 compliance verification.",
      category: "first-article",
      readTime: "8 min read"
    }
  ],
  'series-cnc-01-tolerance-capabilities': [
    {
      title: "CNC Surface Finish Requirements and Machining Quality Optimization",
      slug: "cnc-surface-finish-requirements-machining-quality",
      excerpt: "Master surface finish specifications, measurement techniques, and achievement methods for CNC machining.",
      category: "cnc-manufacturing",
      readTime: "8 min read"
    },
    {
      title: "GD&T Symbols and Basic Principles: ASME Y14.5 Foundation",
      slug: "gdt-symbols-basic-principles-asme-y14-5",
      excerpt: "Master fundamental GD&T symbols, principles, and applications per ASME Y14.5 standard.",
      category: "gdt-fundamentals",
      readTime: "9 min read"
    },
    {
      title: "Customer Requirements and FAI Approval Process",
      slug: "customer-fai-requirements-approval-process",
      excerpt: "Navigate complex customer-specific FAI requirements and approval processes for aerospace and defense programs.",
      category: "first-article",
      readTime: "7 min read"
    }
  ],
  'series-cnc-02-surface-finish-requirements': [
    {
      title: "CNC Machining Tolerance Capabilities and Specifications",
      slug: "cnc-machining-tolerance-capabilities-precision",
      excerpt: "Master CNC machining tolerance capabilities, achievable specifications, and factors affecting precision.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    },
    {
      title: "CNC Materials and Machining Considerations: Aluminum, Stainless Steel, and Advanced Materials",
      slug: "cnc-materials-machining-aluminum-stainless-steel",
      excerpt: "Master material-specific CNC machining strategies, tool selection, and parameter optimization.",
      category: "cnc-manufacturing",
      readTime: "9 min read"
    },
    {
      title: "CMM Probe Selection and Configuration: Choosing the Right Tool for Precision",
      slug: "cmm-probe-selection-configuration-guide",
      excerpt: "Master CMM probe selection, configuration, and qualification procedures for optimal measurement accuracy.",
      category: "cmm-inspection",
      readTime: "7 min read"
    }
  ],
  'series-cnc-03-material-considerations': [
    {
      title: "CNC Surface Finish Requirements and Machining Quality Optimization",
      slug: "cnc-surface-finish-requirements-machining-quality",
      excerpt: "Master surface finish specifications, measurement techniques, and achievement methods for CNC machining.",
      category: "cnc-manufacturing",
      readTime: "8 min read"
    },
    {
      title: "Advanced CNC Techniques: 5-Axis Machining and Complex Geometry Programming",
      slug: "5-axis-machining-multi-axis-cnc-complex-geometry",
      excerpt: "Master advanced CNC techniques including 5-axis machining, multi-setup strategies, and complex geometry programming.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    },
    {
      title: "AS9100 Implementation and Aerospace Quality Certification",
      slug: "as9100-implementation-aerospace-quality-certification",
      excerpt: "Master AS9100 implementation strategies, certification processes, and quality management system development.",
      category: "as9100-compliance",
      readTime: "12 min read"
    }
  ],
  'series-cnc-04-advanced-5axis-techniques': [
    {
      title: "CNC Materials and Machining Considerations: Aluminum, Stainless Steel, and Advanced Materials",
      slug: "cnc-materials-machining-aluminum-stainless-steel",
      excerpt: "Master material-specific CNC machining strategies, tool selection, and parameter optimization.",
      category: "cnc-manufacturing",
      readTime: "9 min read"
    },
    {
      title: "MetBase Advanced Automation and Custom Solutions",
      slug: "metbase-automation-custom-solutions-advanced-features",
      excerpt: "Master advanced MetBase automation capabilities and custom development for complex quality management requirements.",
      category: "metbase-integration",
      readTime: "7 min read"
    },
    {
      title: "AS9100 Risk Management and Configuration Control for Aerospace Manufacturing",
      slug: "as9100-risk-management-configuration-control-aerospace",
      excerpt: "Master AS9100 risk management principles, configuration control processes, and change management.",
      category: "as9100-compliance",
      readTime: "9 min read"
    }
  ],
  'series-as9100-01-implementation-certification': [
    {
      title: "AS9100 Risk Management and Configuration Control for Aerospace Manufacturing",
      slug: "as9100-risk-management-configuration-control-aerospace",
      excerpt: "Master AS9100 risk management principles, configuration control processes, and change management.",
      category: "as9100-compliance",
      readTime: "9 min read"
    },
    {
      title: "AS9102 Forms and Documentation Requirements: Complete FAI Compliance Guide",
      slug: "as9102-forms-documentation-fai-compliance",
      excerpt: "Master AS9102 Form 1, Form 2, and Form 3 completion for First Article Inspection compliance.",
      category: "first-article",
      readTime: "10 min read"
    },
    {
      title: "CNC Materials and Machining Considerations: Aluminum, Stainless Steel, and Advanced Materials",
      slug: "cnc-materials-machining-aluminum-stainless-steel",
      excerpt: "Master material-specific CNC machining strategies, tool selection, and parameter optimization.",
      category: "cnc-manufacturing",
      readTime: "9 min read"
    }
  ],
  'series-as9100-02-risk-management-configuration-control': [
    {
      title: "AS9100 Implementation and Aerospace Quality Certification",
      slug: "as9100-implementation-aerospace-quality-certification",
      excerpt: "Master AS9100 implementation strategies, certification processes, and quality management system development.",
      category: "as9100-compliance",
      readTime: "12 min read"
    },
    {
      title: "AS9100 Supplier Management and Continuous Improvement",
      slug: "as9100-supplier-management-continuous-improvement",
      excerpt: "Master AS9100 supplier management requirements, performance monitoring, and continuous improvement strategies.",
      category: "as9100-compliance",
      readTime: "8 min read"
    },
    {
      title: "CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues",
      slug: "cmm-error-analysis-troubleshooting",
      excerpt: "Master CMM error analysis, measurement uncertainty assessment, and systematic troubleshooting techniques.",
      category: "cmm-inspection",
      readTime: "8 min read"
    }
  ],
  'series-as9100-03-supplier-management-continuous-improvement': [
    {
      title: "AS9100 Risk Management and Configuration Control for Aerospace Manufacturing",
      slug: "as9100-risk-management-configuration-control-aerospace",
      excerpt: "Master AS9100 risk management principles, configuration control processes, and change management.",
      category: "as9100-compliance",
      readTime: "9 min read"
    },
    {
      title: "Customer Requirements and FAI Approval Process",
      slug: "customer-fai-requirements-approval-process",
      excerpt: "Navigate complex customer-specific FAI requirements and approval processes for aerospace and defense programs.",
      category: "first-article",
      readTime: "7 min read"
    },
    {
      title: "MetBase Statistical Analysis and Reporting: SPC and Advanced Analytics",
      slug: "metbase-statistical-analysis-spc-reporting",
      excerpt: "Master statistical analysis and reporting capabilities in MetBase for comprehensive quality data intelligence.",
      category: "metbase-integration",
      readTime: "8 min read"
    }
  ],
  'series-metbase-01-setup-integration': [
    {
      title: "MetBase Statistical Analysis and Reporting: SPC and Advanced Analytics",
      slug: "metbase-statistical-analysis-spc-reporting",
      excerpt: "Master statistical analysis and reporting capabilities in MetBase for comprehensive quality data intelligence.",
      category: "metbase-integration",
      readTime: "8 min read"
    },
    {
      title: "CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues",
      slug: "cmm-error-analysis-troubleshooting",
      excerpt: "Master CMM error analysis, measurement uncertainty assessment, and systematic troubleshooting techniques.",
      category: "cmm-inspection",
      readTime: "8 min read"
    },
    {
      title: "AS9100 Implementation and Aerospace Quality Certification",
      slug: "as9100-implementation-aerospace-quality-certification",
      excerpt: "Master AS9100 implementation strategies, certification processes, and quality management system development.",
      category: "as9100-compliance",
      readTime: "12 min read"
    }
  ],
  'series-metbase-02-statistical-analysis-reporting': [
    {
      title: "MetBase Setup and Measurement Equipment Integration",
      slug: "metbase-setup-measurement-equipment-integration",
      excerpt: "Master MetBase setup and integration with measurement equipment for comprehensive quality data management.",
      category: "metbase-integration",
      readTime: "9 min read"
    },
    {
      title: "MetBase Advanced Automation and Custom Solutions",
      slug: "metbase-automation-custom-solutions-advanced-features",
      excerpt: "Master advanced MetBase automation capabilities and custom development for complex quality management requirements.",
      category: "metbase-integration",
      readTime: "7 min read"
    },
    {
      title: "CMM Error Analysis and Troubleshooting: Identifying and Correcting Measurement Issues",
      slug: "cmm-error-analysis-troubleshooting",
      excerpt: "Master CMM error analysis, measurement uncertainty assessment, and systematic troubleshooting techniques.",
      category: "cmm-inspection",
      readTime: "8 min read"
    }
  ],
  'series-metbase-03-advanced-automation-custom-solutions': [
    {
      title: "MetBase Statistical Analysis and Reporting: SPC and Advanced Analytics",
      slug: "metbase-statistical-analysis-spc-reporting",
      excerpt: "Master statistical analysis and reporting capabilities in MetBase for comprehensive quality data intelligence.",
      category: "metbase-integration",
      readTime: "8 min read"
    },
    {
      title: "Advanced CNC Techniques: 5-Axis Machining and Complex Geometry Programming",
      slug: "5-axis-machining-multi-axis-cnc-complex-geometry",
      excerpt: "Master advanced CNC techniques including 5-axis machining, multi-setup strategies, and complex geometry programming.",
      category: "cnc-manufacturing",
      readTime: "10 min read"
    },
    {
      title: "AS9100 Supplier Management and Continuous Improvement",
      slug: "as9100-supplier-management-continuous-improvement",
      excerpt: "Master AS9100 supplier management requirements, performance monitoring, and continuous improvement strategies.",
      category: "as9100-compliance",
      readTime: "8 min read"
    }
  ]
};

// Directory containing the articles
const articlesDir = '/Users/johnconnor/Documents/GitHub/iismet/precision-manufacturing/content/technical-articles';

function updateArticleLinks(filename, relatedArticles) {
  const filePath = path.join(articlesDir, `${filename}.json`);

  try {
    // Read the current file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const article = JSON.parse(fileContent);

    // Update the relatedContent
    if (!article.relatedContent.relatedArticles) {
      article.relatedContent.relatedArticles = [];
    }
    article.relatedContent.relatedArticles = relatedArticles;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    console.log(`✅ Updated: ${filename}`);

  } catch (error) {
    console.error(`❌ Error updating ${filename}:`, error.message);
  }
}

// Process all articles in the linking map
Object.entries(linkingMap).forEach(([filename, relatedArticles]) => {
  updateArticleLinks(filename, relatedArticles);
});

console.log('\n🎉 Complete internal linking update completed!');