import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const services = [
  {
    _type: 'service',
    title: '5-Axis Machining',
    slug: { current: '5-axis-machining' },
    serviceCategory: 'cnc-machining',
    contentStatus: 'published',
    hero: {
      title: '5-Axis Machining',
      subtitle: 'Precision Manufacturing Excellence',
      badge: 'ADVANCED MACHINING SERVICES',
      certifications: ['AS9100', 'ISO 9001', 'ITAR'],
    },
    overview: {
      description:
        'Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications.',
      highlights: [
        'Complex simultaneous 5-axis contouring',
        '±0.0001" positioning accuracy',
        'Automated tool changing and optimization',
        'Real-time monitoring and quality control',
      ],
      valueProposition:
        'Our 5-axis capability enables us to machine the most complex geometries in a single setup, reducing setup time and improving accuracy while maintaining the highest quality standards.',
      keyBenefits: [
        {
          benefit: 'Reduced Setup Time',
          description: 'Simultaneous 5-axis operation eliminates repositioning',
          icon: 'Settings',
        },
        {
          benefit: 'Superior Surface Finish',
          description: 'Continuous tool engagement produces excellent finishes',
          icon: 'Zap',
        },
        {
          benefit: 'Complex Geometry Capability',
          description: 'Machine intricate shapes impossible with traditional methods',
          icon: 'Target',
        },
        {
          benefit: 'Production Efficiency',
          description: 'Automatic tool changing and optimized toolpaths',
          icon: 'Cog',
        },
      ],
    },
    technicalSpecs: {
      tolerances: {
        dimensional: '±0.0001" (±0.0025mm)',
        geometric: '0.0002" (0.005mm)',
        surface: 'Ra 8-125 µin',
        repeatability: '±0.000050" (±0.00127mm)',
      },
      materials: [
        {
          material: 'Aluminum Alloys',
          grade: '6061-T6, 7075-T6, 2024-T3, Mic-6 tooling plate',
          properties: 'Excellent machinability, lightweight, widely used',
          applications: 'Aerospace structures, defense components, tooling',
        },
        {
          material: 'Titanium Alloys',
          grade: 'Ti-6Al-4V, Ti-6Al-2Sn-4Zr-2Mo, Commercial pure titanium',
          properties: 'High strength-to-weight, excellent biocompatibility',
          applications: 'Aerospace engines, medical implants, defense',
        },
        {
          material: 'Stainless Steel',
          grade: '316L, 17-4 PH, 15-5 PH, 304/304L',
          properties: 'Corrosion resistant, versatile',
          applications: 'Food processing, medical, marine',
        },
        {
          material: 'Superalloys',
          grade: 'Inconel 718, Inconel 625, Hastelloy X, Waspaloy',
          properties: 'High-temperature strength',
          applications: 'Aerospace engines, power generation',
        },
      ],
      sizeRange: {
        minSize: '0.125" (0.3cm)',
        maxSize: '48" x 26" x 20"',
        weight: 'Up to 500 lbs',
        complexity: 'High complexity geometries supported',
      },
      standards: [
        {
          standard: 'AS9100D',
          title: 'Aerospace Quality Management',
          scope: 'Aerospace and defense component manufacturing quality requirements',
        },
        {
          standard: 'ISO 9001:2015',
          title: 'Quality Management',
          scope: 'General manufacturing quality management system',
        },
        {
          standard: 'ITAR',
          title: 'International Traffic in Arms',
          scope: 'Defense components and systems export control compliance',
        },
      ],
    },
    capabilities: [
      {
        label: 'Simultaneous Axes',
        value: '5-Axis',
        description: 'Full simultaneous multi-axis control',
        technicalDetails: 'Continuous contouring with automatic axis coordination',
        certificationLevel: 'AS9100',
      },
      {
        label: 'Machining Accuracy',
        value: '±0.0001"',
        description: 'Precision tolerance capability',
        technicalDetails: 'Tight tolerance through advanced fixturing and measurement',
        certificationLevel: 'ISO 9001',
      },
      {
        label: 'Work Envelope',
        value: '48" x 26" x 20"',
        description: 'Maximum capacity',
        technicalDetails: 'Full capacity supports large complex assemblies',
        certificationLevel: 'AS9100',
      },
      {
        label: 'Spindle Speed',
        value: '12,000 RPM',
        description: 'High-speed capability',
        technicalDetails: 'Enables fine details and surface finish optimization',
        certificationLevel: 'ISO 9001',
      },
    ],
    features: [
      {
        title: 'Complex Aerospace Components',
        description: 'Advanced 5-axis machining for turbine blades, impellers, and complex geometries',
        icon: 'Settings',
        details: [
          'Turbine blade manufacturing',
          'Impeller machining',
          'Complex curve generation',
          'Simultaneous 5-axis contouring',
        ],
        technicalBenefit:
          'Simultaneous 5-axis operation eliminates multiple setups, ensuring part accuracy and surface quality',
        metbaseIntegration: true,
      },
      {
        title: 'Precision Defense Parts',
        description: 'High-precision machining of defense components with complex angles',
        icon: 'Shield',
        details: [
          'Defense component machining',
          'Complex angle programming',
          'Tight tolerance manufacturing',
          'ITAR compliance',
        ],
        technicalBenefit: 'Full traceability and compliance verification for defense contracts',
        metbaseIntegration: true,
      },
      {
        title: 'Prototype Development',
        description: 'Rapid prototyping and low-volume production',
        icon: 'Zap',
        details: [
          'Rapid prototyping',
          'Complex geometry machining',
          'Material optimization',
          'Design validation',
        ],
        technicalBenefit:
          'Quick turnaround on prototype validation without expensive tooling',
        metbaseIntegration: false,
      },
      {
        title: 'Production Machining',
        description: 'High-volume production with consistent quality',
        icon: 'Cog',
        details: [
          'High-volume production',
          'Process optimization',
          'Quality consistency',
          'Automated workflows',
        ],
        technicalBenefit:
          '3-sigma manufacturing system ensures consistent quality across production runs',
        metbaseIntegration: true,
      },
    ],
    process: [
      {
        step: 1,
        title: 'Programming & Setup',
        description: 'Advanced CAD/CAM programming with collision detection',
        duration: '2-4 hours',
        qualityCheck: 'Program verification, toolpath simulation',
        toolsRequired: ['Mastercam CAM', 'Collision detection software'],
        deliverables: 'Verified NC program, setup sheet',
        metbaseData: 'Program parameters, tooling information',
      },
      {
        step: 2,
        title: 'Fixturing & Workholding',
        description: 'Custom fixture design and precision workholding',
        duration: '1-3 hours',
        qualityCheck: 'Fixture inspection, runout verification',
        toolsRequired: ['Custom fixtures', 'Precision measuring tools'],
        deliverables: 'Installed fixture, workholding verification',
        metbaseData: 'Fixture setup parameters',
      },
      {
        step: 3,
        title: 'Machining Execution',
        description: 'Controlled machining with real-time monitoring',
        duration: '2-8 hours (varies by complexity)',
        qualityCheck: 'Tool wear monitoring, dimensional sampling',
        toolsRequired: ['5-axis CNC', 'Tool monitoring system'],
        deliverables: 'Machined part, in-process inspection data',
        metbaseData: 'Machining parameters, tool life, dimensional measurements',
      },
      {
        step: 4,
        title: 'Final Inspection & Finishing',
        description: 'CMM inspection and secondary operations',
        duration: '2-4 hours',
        qualityCheck: 'Full CMM verification, surface finish check',
        toolsRequired: ['CMM', 'Surface finish gauge'],
        deliverables: 'Inspection report, finished part',
        metbaseData: 'Final dimensions, surface finish, acceptance documentation',
      },
    ],
    qualityAssurance: {
      qualityPlan:
        'IIS maintains a comprehensive quality plan for all 5-axis machining work, including statistical process control, in-process monitoring, and final CMM inspection to ensure all parts meet specification.',
      inspectionProtocol: [
        {
          stage: 'In-Process',
          method: 'Dimensional sampling',
          criteria: '±0.0001" for critical dimensions',
          documentation: 'First article inspection report',
        },
        {
          stage: 'Mid-Process',
          method: 'Tool wear monitoring',
          criteria: 'Tool life maximization while maintaining quality',
          documentation: 'Tool change log, wear analysis',
        },
        {
          stage: 'Final Inspection',
          method: 'CMM full inspection',
          criteria: '100% verification of all functional dimensions',
          documentation: 'Full CMM report, traceability documentation',
        },
      ],
      traceability: [
        'Serial number assignment and tracking',
        'Material certification documentation',
        'Process parameter recording',
        'Inspection record retention',
      ],
      certificationProcess:
        'All 5-axis machining services are delivered with full AS9100 aerospace quality documentation, including first article inspection, material traceability, and process verification.',
    },
    technologies: [
      {
        technology: 'Mastercam CAM',
        version: 'Latest',
        application: 'Advanced 5-axis toolpath programming and optimization',
        advantages:
          'Industry standard with exceptional collision detection and toolpath simulation',
      },
      {
        technology: 'Heidenhain iTNC 530',
        version: '530',
        application: 'Advanced CNC control with real-time optimization',
        advantages: 'Precision control, automatic optimization, MetBase integration',
      },
      {
        technology: 'MetBase® Manufacturing Software',
        version: 'Current',
        application: 'Closed-loop data collection and process control',
        advantages:
          'Real-time monitoring, 3-sigma manufacturing, historical data analysis',
      },
    ],
    equipment: [
      {
        name: 'Hermle C42U 5-Axis Machining Center',
        manufacturer: 'Hermle',
        model: 'C42U',
        specs: 'Advanced 5-axis simultaneous control, work envelope 48"x26"x20"',
        capabilities: 'Complex aerospace components, tight tolerance work',
        accuracy: '±0.0001"',
        metbaseCompatible: true,
        certifications: ['AS9100 approved', 'ITAR registered'],
      },
      {
        name: 'Heidenhain iTNC 530 Control System',
        manufacturer: 'Heidenhain',
        model: 'iTNC 530',
        specs: 'Advanced control with collision detection and optimization',
        capabilities: 'Complex toolpath programming, real-time monitoring',
        accuracy: '±0.00005" (in certain modes)',
        metbaseCompatible: true,
        certifications: ['Industry standard aerospace control'],
      },
    ],
    pricing: {
      pricingModel: 'quote',
      startingPrice: 'Contact for Quote',
      factorsAffectingPrice: [
        'Part complexity and geometry',
        'Material type and hardness',
        'Quantity and volume',
        'Tolerance requirements',
        'Surface finish requirements',
      ],
      typicalTurnaround: '2-5 business days for standard parts, expedited options available',
    },
    cta: {
      title: 'Ready for Your Next Complex Project?',
      subtitle: 'Contact our team to discuss your 5-axis machining requirements',
      buttons: [
        {
          text: 'Get Quote',
          href: '/contact',
          variant: 'primary',
          trackingEvent: 'cta_5axis_quote',
        },
        {
          text: 'View All Services',
          href: '/services',
          variant: 'secondary',
          trackingEvent: 'cta_5axis_services',
        },
      ],
    },
    seo: {
      metaTitle: '5-Axis CNC Machining | Advanced Precision Manufacturing',
      metaDescription:
        'Expert 5-axis simultaneous machining for aerospace, defense, and complex components. AS9100 certified precision manufacturing.',
      focusKeywords: ['5-axis machining', '5-axis CNC', 'precision machining'],
      secondaryKeywords: [
        'aerospace machining',
        'defense manufacturing',
        'complex geometry',
        'high-precision CNC',
      ],
      structuredData: {
        serviceType: 'CNC Machining',
        areaServed: 'United States, International',
        availableLanguage: ['English'],
      },
    },
  },
  {
    _type: 'service',
    title: 'Adaptive Machining',
    slug: { current: 'adaptive-machining' },
    serviceCategory: 'cnc-machining',
    contentStatus: 'published',
    hero: {
      title: 'Adaptive Machining',
      subtitle: 'Intelligent Manufacturing Technology',
      badge: 'ADVANCED MACHINING',
      certifications: ['AS9100', 'ISO 9001', 'ITAR'],
    },
    overview: {
      description:
        'Adaptive machining technology that optimizes cutting conditions in real-time, reducing tool wear and improving surface finish while maintaining precision tolerances.',
      highlights: [
        'Real-time tool load monitoring',
        '40-60% improvement in tool life',
        'Automated feed rate optimization',
        'Consistent surface finish quality',
      ],
      valueProposition:
        'Our adaptive machining system monitors cutting forces and automatically adjusts feeds and speeds to maintain optimal tool engagement, resulting in superior part quality and reduced production costs.',
      keyBenefits: [
        {
          benefit: 'Extended Tool Life',
          description: '40-60% improvement in tool life vs traditional methods',
          icon: 'Zap',
        },
        {
          benefit: 'Consistent Quality',
          description: 'Real-time adjustments maintain consistent surface finish',
          icon: 'Target',
        },
        {
          benefit: 'Cost Reduction',
          description: 'Fewer tool changes and faster cycle times reduce overall cost',
          icon: 'DollarSign',
        },
        {
          benefit: 'Reduced Setup Time',
          description: 'Intelligent system reduces manual optimization requirements',
          icon: 'Clock',
        },
      ],
    },
    technicalSpecs: {
      tolerances: {
        dimensional: '±0.0001" to ±0.0005" (material dependent)',
        geometric: '0.0002" to 0.0005"',
        surface: 'Ra 8-63 µin',
        repeatability: '±0.000075"',
      },
      materials: [
        {
          material: 'Aluminum Alloys',
          grade: '6061, 7075, 2024 series',
          properties: 'Excellent machinability with adaptive control',
          applications: 'High-volume aerospace components',
        },
        {
          material: 'Titanium Alloys',
          grade: 'Ti-6Al-4V, Ti-5-8-5',
          properties: 'Difficult-to-machine material benefits from adaptation',
          applications: 'Aerospace engines, medical devices',
        },
        {
          material: 'Stainless Steel',
          grade: '316L, 17-4PH',
          properties: 'Work hardening controlled by adaptive feeds',
          applications: 'Medical, chemical processing',
        },
        {
          material: 'Cast Iron & Composites',
          grade: 'Ductile iron, fiber-reinforced composites',
          properties: 'Abrasive materials handled with optimization',
          applications: 'Automotive, aerospace structures',
        },
      ],
      sizeRange: {
        minSize: '0.5" minimum feature',
        maxSize: '42" x 24" x 18"',
        weight: 'Up to 400 lbs',
        complexity: 'High-complexity parts with tough materials',
      },
      standards: [
        {
          standard: 'AS9100D',
          title: 'Aerospace Quality',
          scope: 'Adaptive processes validated for aerospace use',
        },
        {
          standard: 'ISO 9001:2015',
          title: 'Quality Management',
          scope: 'Process capability and statistical control',
        },
      ],
    },
    capabilities: [
      {
        label: 'Tool Load Monitoring',
        value: 'Real-Time',
        description: 'Continuous monitoring and adjustment',
        technicalDetails: 'Dynamic force measurement with adaptive compensation',
        certificationLevel: 'AS9100',
      },
      {
        label: 'Feed Rate Adaptation',
        value: 'Automatic',
        description: 'Intelligent optimization during machining',
        technicalDetails: 'Maintains optimal cutting speed regardless of conditions',
        certificationLevel: 'ISO 9001',
      },
      {
        label: 'Tool Life Improvement',
        value: '40-60%',
        description: 'Extended tool life vs traditional methods',
        technicalDetails: 'Reduced tool wear through controlled engagement',
        certificationLevel: 'ISO 9001',
      },
      {
        label: 'Surface Finish Control',
        value: 'Ra 8-63µin',
        description: 'Consistent surface quality',
        technicalDetails: 'Adaptive optimization ensures repeatability',
        certificationLevel: 'AS9100',
      },
    ],
    features: [
      {
        title: 'Difficult Material Machining',
        description: 'Expert handling of titanium, superalloys, and composites',
        icon: 'Shield',
        details: [
          'Titanium and superalloy machining',
          'Composite material processing',
          'Work-hardening mitigation',
          'Heat-resistant material handling',
        ],
        technicalBenefit:
          'Adaptive feeds prevent work hardening and tool notching in difficult materials',
        metbaseIntegration: true,
      },
      {
        title: 'High-Volume Production',
        description: 'Optimized for production runs with consistent quality',
        icon: 'Cog',
        details: [
          'Repeatable cycle times',
          'Minimal tool breakage',
          'Automatic quality consistency',
          'Production rate optimization',
        ],
        technicalBenefit: 'Reduced tool changes and setup time improves production throughput',
        metbaseIntegration: true,
      },
      {
        title: 'Cost Optimization',
        description: 'Reduce production costs through intelligent machining',
        icon: 'TrendingDown',
        details: [
          'Extended tool life',
          'Faster cycle times',
          'Reduced scrap rate',
          'Lower operator intervention',
        ],
        technicalBenefit: 'Intelligent adaptation reduces both material and labor costs',
        metbaseIntegration: true,
      },
    ],
    process: [
      {
        step: 1,
        title: 'Adaptive Machining Setup',
        description: 'Configuration of adaptive parameters for material and geometry',
        duration: '1-2 hours',
        qualityCheck: 'Parameter validation, tool breakage test',
        toolsRequired: ['Adaptive control system', 'Tool force sensor'],
        deliverables: 'Optimized adaptive program',
        metbaseData: 'Adaptive parameter baseline',
      },
      {
        step: 2,
        title: 'Real-Time Monitoring',
        description: 'Continuous observation of cutting forces and tool condition',
        duration: 'Concurrent with machining',
        qualityCheck: 'Force trending, tool wear tracking',
        toolsRequired: ['Force monitoring system', 'Tool condition sensor'],
        deliverables: 'Real-time optimization data',
        metbaseData: 'Cutting force profiles, tool life data',
      },
      {
        step: 3,
        title: 'Dynamic Adjustment',
        description: 'Automatic feed and speed optimization based on conditions',
        duration: 'Automated during machining cycle',
        qualityCheck: 'Dimensional verification sampling',
        toolsRequired: ['CNC control with adaptive function'],
        deliverables: 'Optimized part with consistent finish',
        metbaseData: 'Adaptive adjustment history',
      },
    ],
    qualityAssurance: {
      qualityPlan:
        'Adaptive machining processes include real-time quality monitoring and automated optimization to maintain dimensional accuracy and surface finish consistency throughout production runs.',
      inspectionProtocol: [
        {
          stage: 'Initial Setup',
          method: 'First article inspection',
          criteria: 'All dimensions within specification',
          documentation: 'FAI report and adaptive parameters',
        },
        {
          stage: 'Production',
          method: 'Sampling per ANSI/ASQ Z1.4',
          criteria: 'Maintained through adaptive adjustments',
          documentation: 'Control charts and monitoring data',
        },
      ],
      traceability: [
        'Adaptive parameter logging',
        'Tool usage tracking',
        'Cutting force data recording',
        'Dimensional measurement history',
      ],
      certificationProcess:
        'All adaptive machined parts include adaptive parameter documentation and tool life verification.',
    },
    technologies: [
      {
        technology: 'Adaptive Control System',
        version: 'Real-time',
        application: 'Tool load monitoring and automatic feed adjustment',
        advantages:
          'Continuous optimization maintains tool engagement and extends tool life',
      },
      {
        technology: 'Force Sensing Technology',
        version: 'Current',
        application: 'Real-time cutting force measurement',
        advantages:
          'Enables dynamic adjustment based on actual cutting conditions',
      },
    ],
    equipment: [
      {
        name: 'Adaptive Control System',
        manufacturer: 'Industry Standard',
        model: 'Real-time Force Monitoring',
        specs: 'Integrated force sensors with feedback control',
        capabilities: 'Tool load monitoring and automatic adjustment',
        accuracy: '±2-3% cutting force measurement',
        metbaseCompatible: true,
        certifications: ['Validated for production'],
      },
    ],
    pricing: {
      pricingModel: 'quote',
      startingPrice: 'Contact for Quote',
      factorsAffectingPrice: [
        'Material type (difficult materials cost more)',
        'Production volume',
        'Adaptive setup complexity',
        'Tool life extension benefits',
      ],
      typicalTurnaround: '3-7 business days for production runs',
    },
    cta: {
      title: 'Optimize Your Difficult Material Machining',
      subtitle: 'Let adaptive technology improve your quality and reduce costs',
      buttons: [
        {
          text: 'Get Quote',
          href: '/contact',
          variant: 'primary',
        },
        {
          text: 'Learn More',
          href: '/services',
          variant: 'secondary',
        },
      ],
    },
    seo: {
      metaTitle: 'Adaptive Machining | Titanium & Difficult Material Machining',
      metaDescription:
        'Expert adaptive CNC machining for titanium, superalloys, and composites. Real-time optimization for superior quality and cost savings.',
      focusKeywords: ['adaptive machining', 'titanium machining', 'difficult materials'],
      secondaryKeywords: [
        'superalloy machining',
        'composite machining',
        'high-feed machining',
      ],
      structuredData: {
        serviceType: 'Adaptive CNC Machining',
        areaServed: 'United States, International',
        availableLanguage: ['English'],
      },
    },
  },
  {
    _type: 'service',
    title: 'Metrology Services',
    slug: { current: 'metrology' },
    serviceCategory: 'metrology',
    contentStatus: 'published',
    hero: {
      title: 'Metrology Services',
      subtitle: 'Precision Measurement Excellence',
      badge: 'PRECISION INSPECTION',
      certifications: ['AS9100', 'ISO 9001'],
    },
    overview: {
      description:
        'Comprehensive metrology services including CMM inspection, GD&T analysis, first article inspection, and statistical process control for aerospace and defense components.',
      highlights: [
        'Zeiss CMM measurement systems',
        'GD&T expert analysis',
        'First article inspection capability',
        'Statistical process control',
      ],
      valueProposition:
        'Our metrology services ensure your components meet the most demanding specifications with full traceability and documentation.',
      keyBenefits: [
        {
          benefit: 'CMM Precision',
          description: '±0.000050" measurement accuracy',
          icon: 'Target',
        },
        {
          benefit: 'GD&T Expertise',
          description: 'Expert geometric dimensioning and tolerancing analysis',
          icon: 'CheckCircle',
        },
        {
          benefit: 'First Article Inspection',
          description: 'Complete FAI reports for aerospace certification',
          icon: 'Award',
        },
        {
          benefit: 'Statistical Analysis',
          description: 'SPC and capability analysis for production',
          icon: 'TrendingUp',
        },
      ],
    },
    technicalSpecs: {
      tolerances: {
        dimensional: 'Measurement uncertainty ±0.000050"',
        geometric: 'GD&T verification to 0.000050"',
        surface: 'Surface finish measurement Ra 1-500 µin',
        repeatability: '±0.000020" CMM repeatability',
      },
      materials: [
        {
          material: 'All Materials',
          grade: 'Aluminum to superalloys',
          properties: 'Measurement independent of material',
          applications: 'Any machined or fabricated component',
        },
      ],
      sizeRange: {
        minSize: '0.010" minimum feature',
        maxSize: 'Part envelope 42" x 24" x 18"',
        weight: 'Up to 400 lbs for CMM fixture',
        complexity: 'Complex multi-featured parts',
      },
      standards: [
        {
          standard: 'AS9102',
          title: 'First Article Inspection Report',
          scope: 'Aerospace first article documentation',
        },
        {
          standard: 'ASME Y14.5',
          title: 'Geometric Dimensioning and Tolerancing',
          scope: 'GD&T interpretation and analysis',
        },
        {
          standard: 'ISO 13849-1',
          title: 'CMM Performance Verification',
          scope: 'Coordinate measuring machine standards',
        },
      ],
    },
    capabilities: [
      {
        label: 'CMM Accuracy',
        value: '±0.000050"',
        description: 'Measurement precision',
        technicalDetails: 'Zeiss CMM with temperature controlled environment',
        certificationLevel: 'AS9100',
      },
      {
        label: 'GD&T Analysis',
        value: 'Expert',
        description: 'Geometric tolerancing expertise',
        technicalDetails: 'Full datum framework and tolerance stack-up analysis',
        certificationLevel: 'AS9100',
      },
      {
        label: 'First Article Inspection',
        value: 'AS9102',
        description: 'Aerospace certification capability',
        technicalDetails: 'Complete FAI reports with full traceability',
        certificationLevel: 'AS9100',
      },
      {
        label: 'Statistical Process Control',
        value: 'Capability',
        description: 'SPC and Cpk analysis',
        technicalDetails: 'Production capability study and control charting',
        certificationLevel: 'ISO 9001',
      },
    ],
    features: [
      {
        title: 'CMM Inspection',
        description: 'Precision measurement using Zeiss coordinate measuring machines',
        icon: 'Target',
        details: [
          'Dimensional measurement',
          'Positional tolerance verification',
          'Complex geometry measurement',
          'Automated CMM programming',
        ],
        technicalBenefit: 'High-precision measurement ensures compliance with specifications',
        metbaseIntegration: true,
      },
      {
        title: 'First Article Inspection',
        description: 'Complete AS9102 FAI reporting for aerospace certification',
        icon: 'Award',
        details: [
          'Full CMM measurement of all features',
          'Material certification verification',
          'Process capability documentation',
          'Traceability matrix completion',
        ],
        technicalBenefit:
          'AS9102 FAI certification enables supplier approval and contract release',
        metbaseIntegration: true,
      },
      {
        title: 'Statistical Analysis',
        description: 'SPC and capability study services',
        icon: 'TrendingUp',
        details: [
          'Process capability studies (Cpk)',
          'Control chart development',
          'Trend analysis',
          'Risk assessment',
        ],
        technicalBenefit: 'Statistical data enables process improvement and risk mitigation',
        metbaseIntegration: true,
      },
    ],
    process: [
      {
        step: 1,
        title: 'Measurement Planning',
        description: 'Development of measurement strategy and CMM program',
        duration: '2-4 hours',
        qualityCheck: 'Program verification, datum validation',
        toolsRequired: ['CAD software', 'CMM programming tools'],
        deliverables: 'Verified CMM measurement program',
        metbaseData: 'Measurement plan documentation',
      },
      {
        step: 2,
        title: 'CMM Measurement',
        description: 'Precise measurement of all specified dimensions and tolerances',
        duration: '1-3 hours per part',
        qualityCheck: 'CMM calibration verification, reference standard checks',
        toolsRequired: ['Zeiss CMM', 'Precision fixtures'],
        deliverables: 'Raw measurement data',
        metbaseData: 'Dimensional data capture',
      },
      {
        step: 3,
        title: 'Data Analysis',
        description: 'Analysis of measurement results and tolerance evaluation',
        duration: '1-2 hours',
        qualityCheck: 'Report verification, trend analysis',
        toolsRequired: ['Data analysis software', 'Statistical tools'],
        deliverables: 'Measured data report',
        metbaseData: 'Analyzed measurement results',
      },
      {
        step: 4,
        title: 'Report Generation',
        description: 'Complete inspection report with traceability documentation',
        duration: '1-2 hours',
        qualityCheck: 'Report completeness verification',
        toolsRequired: ['Report generation software'],
        deliverables: 'Final inspection report',
        metbaseData: 'Report archive and historical data',
      },
    ],
    qualityAssurance: {
      qualityPlan:
        'All metrology services follow AS9100 and ISO 9001 quality requirements with annual CMM calibration and daily reference standard verification.',
      inspectionProtocol: [
        {
          stage: 'Pre-Measurement',
          method: 'CMM calibration and reference verification',
          criteria: 'CMM accuracy certified per ISO 13849-1',
          documentation: 'Calibration certificates, verification reports',
        },
        {
          stage: 'Measurement',
          method: 'Automated CMM measurement',
          criteria: 'Measurement uncertainty documented',
          documentation: 'Raw measurement data files',
        },
        {
          stage: 'Post-Measurement',
          method: 'Data verification and reporting',
          criteria: 'All tolerances evaluated',
          documentation: 'Inspection reports with traceability',
        },
      ],
      traceability: [
        'Part identification and traceability',
        'Material certification references',
        'CMM calibration documentation',
        'Measurement parameter recording',
      ],
      certificationProcess:
        'All metrology services include traceability to NIST standards and full certification documentation.',
    },
    technologies: [
      {
        technology: 'Zeiss CMM Software',
        version: 'Latest',
        application: 'CMM measurement programming and data analysis',
        advantages: 'Advanced probe compensation and reporting capabilities',
      },
      {
        technology: 'Statistical Analysis Software',
        version: 'Current',
        application: 'SPC and capability analysis',
        advantages: 'Real-time control charting and trend analysis',
      },
    ],
    equipment: [
      {
        name: 'Zeiss Coordinate Measuring Machine',
        manufacturer: 'Zeiss',
        model: 'PRISMO',
        specs: 'High-precision CMM with temperature control',
        capabilities: 'Full 3D dimensional measurement of complex parts',
        accuracy: '±0.000050"',
        metbaseCompatible: true,
        certifications: ['ISO 13849-1 verified', 'AS9100 certified'],
      },
      {
        name: 'Optical CMM Scanning System',
        manufacturer: 'Zeiss',
        model: 'SCANMAX',
        specs: 'Non-contact optical measurement for delicate features',
        capabilities: 'Precise measurement without contact damage risk',
        accuracy: '±0.000100"',
        metbaseCompatible: true,
        certifications: ['AS9100 approved'],
      },
    ],
    pricing: {
      pricingModel: 'quote',
      startingPrice: 'Starting at $200/part',
      factorsAffectingPrice: [
        'Part complexity and feature count',
        'Report type (basic vs FAI)',
        'Turnaround time requirements',
        'Data archival needs',
      ],
      typicalTurnaround: '2-5 business days for standard inspection',
    },
    cta: {
      title: 'Need Precision Measurement?',
      subtitle: 'Our metrology team is ready to ensure your components meet specification',
      buttons: [
        {
          text: 'Request Inspection',
          href: '/contact',
          variant: 'primary',
        },
      ],
    },
    seo: {
      metaTitle: 'CMM Inspection & Metrology Services | First Article Inspection',
      metaDescription:
        'Expert CMM metrology services including first article inspection, GD&T analysis, and SPC for aerospace components.',
      focusKeywords: ['metrology services', 'CMM inspection', 'first article inspection'],
      secondaryKeywords: [
        'GD&T analysis',
        'SPC services',
        'coordinate measuring machine',
        'precision measurement',
      ],
      structuredData: {
        serviceType: 'Metrology Services',
        areaServed: 'United States, International',
        availableLanguage: ['English'],
      },
    },
  },
  {
    _type: 'service',
    title: 'Engineering Services',
    slug: { current: 'engineering' },
    serviceCategory: 'engineering',
    contentStatus: 'published',
    hero: {
      title: 'Engineering Services',
      subtitle: 'Design & Process Optimization',
      badge: 'ENGINEERING EXPERTISE',
      certifications: ['AS9100', 'ISO 9001'],
    },
    overview: {
      description:
        'Comprehensive engineering services including first article inspection, process planning, CAD/CAM programming, design optimization, and manufacturing feasibility analysis.',
      highlights: [
        'First article inspection expertise',
        'CAD/CAM programming',
        'Process planning and optimization',
        'Design for manufacturability review',
      ],
      valueProposition:
        'Our engineering team brings decades of manufacturing expertise to optimize your designs for cost, quality, and manufacturability.',
      keyBenefits: [
        {
          benefit: 'First Article Inspection',
          description: 'Complete FAI documentation and certification',
          icon: 'CheckCircle',
        },
        {
          benefit: 'Design Optimization',
          description: 'DFM review to reduce cost and improve quality',
          icon: 'Lightbulb',
        },
        {
          benefit: 'CAM Programming',
          description: 'Expert CNC programming for complex geometries',
          icon: 'Code',
        },
        {
          benefit: 'Process Planning',
          description: 'Comprehensive manufacturing process development',
          icon: 'Layers',
        },
      ],
    },
    technicalSpecs: {
      tolerances: {
        dimensional: 'Analysis to ±0.0001" capability',
        geometric: 'GD&T tolerance stack-up analysis',
        surface: 'Surface finish optimization review',
        repeatability: 'Process capability assessment',
      },
      materials: [
        {
          material: 'All Structural Materials',
          grade: 'Aluminum, titanium, steel, composites',
          properties: 'Full material property analysis',
          applications: 'Any aerospace or industrial application',
        },
      ],
      sizeRange: {
        minSize: '0.100" minimum feature',
        maxSize: '48" x 26" x 20"',
        weight: 'Up to 500 lbs',
        complexity: 'Any complexity level',
      },
      standards: [
        {
          standard: 'ASME Y14.5',
          title: 'GD&T',
          scope: 'Geometric dimensioning and tolerancing',
        },
        {
          standard: 'AS9100D',
          title: 'Aerospace Quality',
          scope: 'Aerospace design and process requirements',
        },
      ],
    },
    capabilities: [
      {
        label: 'First Article Inspection',
        value: 'AS9102',
        description: 'Complete FAI documentation',
        technicalDetails: 'Full aerospace certification capability',
        certificationLevel: 'AS9100',
      },
      {
        label: 'CAD/CAM Programming',
        value: 'Expert',
        description: 'Advanced CNC programming',
        technicalDetails: 'Mastercam, SolidWorks, CATIA experience',
        certificationLevel: 'AS9100',
      },
      {
        label: 'Process Planning',
        value: 'Comprehensive',
        description: 'Complete manufacturing planning',
        technicalDetails: 'From concept to production release',
        certificationLevel: 'ISO 9001',
      },
      {
        label: 'Design Review',
        value: 'DFM',
        description: 'Design for manufacturability analysis',
        technicalDetails: 'Cost and quality optimization',
        certificationLevel: 'ISO 9001',
      },
    ],
    features: [
      {
        title: 'First Article Inspection',
        description: 'Complete AS9102 FAI documentation and aerospace certification',
        icon: 'Award',
        details: [
          'Requirements analysis',
          'Inspection planning',
          'Full dimensional verification',
          'FAI report generation',
        ],
        technicalBenefit: 'AS9102 certification enables supplier approval and production release',
        metbaseIntegration: true,
      },
      {
        title: 'Process Planning & Optimization',
        description: 'Comprehensive manufacturing process development',
        icon: 'Settings',
        details: [
          'Process flow development',
          'Setup and fixturing design',
          'Tooling specification',
          'Sequence optimization',
        ],
        technicalBenefit: 'Optimized processes reduce cost and improve quality consistency',
        metbaseIntegration: true,
      },
      {
        title: 'CAD/CAM Programming',
        description: 'Expert CNC programming for complex geometries',
        icon: 'Code',
        details: [
          'CAD model analysis',
          'Toolpath programming',
          'Tool selection optimization',
          'Program verification',
        ],
        technicalBenefit: 'Expert programming ensures optimal tool life and surface finish',
        metbaseIntegration: false,
      },
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Complete review of design requirements and specifications',
        duration: '2-4 hours',
        qualityCheck: 'Requirements completeness verification',
        toolsRequired: ['CAD software', 'Requirements documents'],
        deliverables: 'Requirements summary and analysis',
        metbaseData: 'Project specification documentation',
      },
      {
        step: 2,
        title: 'Engineering Planning',
        description: 'Development of manufacturing process and inspection plan',
        duration: '4-8 hours',
        qualityCheck: 'Plan review and approval',
        toolsRequired: ['Process planning tools'],
        deliverables: 'Manufacturing and inspection plans',
        metbaseData: 'Process planning documentation',
      },
      {
        step: 3,
        title: 'Design Optimization',
        description: 'Review for manufacturability and cost optimization',
        duration: '2-4 hours',
        qualityCheck: 'Engineering review and approval',
        toolsRequired: ['CAD analysis tools'],
        deliverables: 'Optimization recommendations',
        metbaseData: 'Design analysis reports',
      },
      {
        step: 4,
        title: 'Documentation & Release',
        description: 'Complete documentation package for production',
        duration: '2-3 hours',
        qualityCheck: 'Documentation completeness verification',
        toolsRequired: ['Documentation tools'],
        deliverables: 'Complete engineering package',
        metbaseData: 'Production release documentation',
      },
    ],
    qualityAssurance: {
      qualityPlan:
        'All engineering services follow AS9100D aerospace quality standards with comprehensive documentation and traceability.',
      inspectionProtocol: [
        {
          stage: 'Planning Review',
          method: 'Engineering review',
          criteria: 'Complete and accurate specifications',
          documentation: 'Plan approval records',
        },
        {
          stage: 'Analysis Review',
          method: 'Peer review',
          criteria: 'Compliance with standards',
          documentation: 'Review approval documentation',
        },
      ],
      traceability: [
        'Requirement traceability matrix',
        'Design change tracking',
        'Approval documentation',
        'Configuration control',
      ],
      certificationProcess:
        'All engineering deliverables are reviewed and approved per AS9100D requirements.',
    },
    technologies: [
      {
        technology: 'SolidWorks CAD',
        version: 'Premium',
        application: 'Design modeling and analysis',
        advantages:
          'Comprehensive 3D modeling with integrated FEA and DFM capabilities',
      },
      {
        technology: 'Mastercam CAM',
        version: 'Latest',
        application: 'CNC program generation',
        advantages: 'Industry-leading CAM with 5-axis optimization',
      },
    ],
    equipment: [
      {
        name: 'SolidWorks CAD System',
        manufacturer: 'Dassault Systèmes',
        model: 'Premium',
        specs: 'Complete 3D CAD and analysis capability',
        capabilities: 'Part design, assembly, drawing, simulation',
        accuracy: 'Analysis to design accuracy',
        metbaseCompatible: false,
        certifications: ['Industry standard'],
      },
      {
        name: 'Mastercam CAM Software',
        manufacturer: 'Mastercam',
        model: 'Latest',
        specs: 'Advanced CNC programming with 5-axis capability',
        capabilities: 'Complex toolpath programming and optimization',
        accuracy: 'Micron-level programming accuracy',
        metbaseCompatible: true,
        certifications: ['Industry leading CAM system'],
      },
    ],
    pricing: {
      pricingModel: 'quote',
      startingPrice: 'Contact for Quote',
      factorsAffectingPrice: [
        'Project complexity',
        'Design analysis required',
        'Documentation scope',
        'Timeline requirements',
      ],
      typicalTurnaround: '1-2 weeks for planning, 2-4 weeks for complete FAI',
    },
    cta: {
      title: 'Need Engineering Support?',
      subtitle: 'Our engineering team can help optimize your design and process',
      buttons: [
        {
          text: 'Get Started',
          href: '/contact',
          variant: 'primary',
        },
        {
          text: 'View Services',
          href: '/services',
          variant: 'secondary',
        },
      ],
    },
    seo: {
      metaTitle: 'Engineering Services | CAM Programming & Process Planning',
      metaDescription:
        'Complete engineering services including first article inspection, CAM programming, process planning, and design optimization.',
      focusKeywords: ['engineering services', 'CAM programming', 'process planning'],
      secondaryKeywords: [
        'design optimization',
        'manufacturability analysis',
        'CAD services',
        'aerospace engineering',
      ],
      structuredData: {
        serviceType: 'Engineering Services',
        areaServed: 'United States, International',
        availableLanguage: ['English'],
      },
    },
  },
];

async function migrateServices() {
  console.log('Starting service migration...');
  console.log(`Migrating ${services.length} services to Sanity`);

  for (const service of services) {
    try {
      const result = await client.create(service);
      console.log(`✅ Created: ${service.title} (${result._id})`);
    } catch (error: any) {
      if (error.statusCode === 409) {
        // Document exists, try to update it
        const query = `*[_type == "service" && slug.current == "${service.slug.current}"][0]._id`;
        const existingId = await client.fetch(query);
        if (existingId) {
          try {
            const updated = await client.patch(existingId).set(service).commit();
            console.log(`✅ Updated: ${service.title} (${updated._id})`);
          } catch (updateError) {
            console.error(`❌ Failed to update ${service.title}:`, updateError);
          }
        }
      } else {
        console.error(`❌ Failed to create ${service.title}:`, error.message);
      }
    }
  }

  console.log('Migration complete!');
}

migrateServices().catch(console.error);
