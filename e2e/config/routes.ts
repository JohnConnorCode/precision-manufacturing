/**
 * Centralized route configuration for E2E tests
 * Single source of truth for all routes and their expected content
 */

export interface RouteConfig {
  path: string;
  name: string;
  type: 'page' | 'article' | 'studio';
  expectedContent: string[];
  requiredMetaTags?: {
    title?: RegExp;
    description?: boolean;
    ogImage?: boolean;
  };
  requiredElements?: string[];
}

export const routes: Record<string, RouteConfig[]> = {
  main: [
    {
      path: '/',
      name: 'Homepage',
      type: 'page',
      expectedContent: ['PRECISION', 'MANUFACTURING', 'AS9100', 'ITAR'],
      requiredMetaTags: {
        title: /IIS.*Integrated Inspection/i,
        description: true,
        ogImage: true,
      },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/about',
      name: 'About',
      type: 'page',
      expectedContent: ['INTEGRATED', 'INSPECTION', 'Years in Business', 'Team Members'],
      requiredMetaTags: {
        title: /IIS/i,
        description: true,
      },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/contact',
      name: 'Contact',
      type: 'page',
      expectedContent: ['Contact', 'Name', 'Email', 'Message'],
      requiredMetaTags: {
        title: /IIS/i,
        description: true,
      },
      requiredElements: ['header', 'main', 'footer', 'form'],
    },
  ],

  services: [
    {
      path: '/services',
      name: 'Services Overview',
      type: 'page',
      expectedContent: ['Services', 'CNC', 'Machining', 'Metrology'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/services/5-axis-machining',
      name: '5-Axis Machining',
      type: 'page',
      expectedContent: ['5-Axis', 'Machining', 'CNC'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/services/adaptive-machining',
      name: 'Adaptive Machining',
      type: 'page',
      expectedContent: ['Adaptive', 'Machining'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/services/metrology',
      name: 'Metrology',
      type: 'page',
      expectedContent: ['Metrology', 'Inspection', 'Measurement'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/services/engineering',
      name: 'Engineering',
      type: 'page',
      expectedContent: ['Engineering', 'Design'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/services/predictive-analytics',
      name: 'Predictive Analytics',
      type: 'page',
      expectedContent: ['Predictive', 'Analytics'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
  ],

  industries: [
    {
      path: '/industries',
      name: 'Industries Overview',
      type: 'page',
      expectedContent: ['Industries', 'Aerospace', 'Defense', 'Energy'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/industries/aerospace',
      name: 'Aerospace',
      type: 'page',
      expectedContent: ['Aerospace', 'AS9100'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/industries/defense',
      name: 'Defense',
      type: 'page',
      expectedContent: ['Defense', 'ITAR'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/industries/energy',
      name: 'Energy',
      type: 'page',
      expectedContent: ['Energy', 'Power'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/industries/medical',
      name: 'Medical',
      type: 'page',
      expectedContent: ['Medical'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
  ],

  resources: [
    {
      path: '/resources',
      name: 'Resources Overview',
      type: 'page',
      expectedContent: ['Resources', 'Articles', 'Category'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/resources/manufacturing-processes',
      name: 'Manufacturing Processes',
      type: 'page',
      expectedContent: ['Manufacturing', 'Processes'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/resources/material-science',
      name: 'Material Science',
      type: 'page',
      expectedContent: ['Material', 'Science'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/resources/quality-compliance',
      name: 'Quality & Compliance',
      type: 'page',
      expectedContent: ['Quality', 'Compliance'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide',
      name: 'Sample Article - 5-Axis Guide',
      type: 'article',
      expectedContent: ['5-Axis', 'CNC', 'Machining'],
      requiredMetaTags: { title: /IIS/i, description: true },
      requiredElements: ['header', 'main', 'footer', 'article'],
    },
  ],

  compliance: [
    {
      path: '/compliance/terms',
      name: 'Terms',
      type: 'page',
      expectedContent: ['Terms'],
      requiredMetaTags: { title: /IIS/i },
      requiredElements: ['header', 'main', 'footer'],
    },
    {
      path: '/compliance/supplier-requirements',
      name: 'Supplier Requirements',
      type: 'page',
      expectedContent: ['Supplier', 'Requirements'],
      requiredMetaTags: { title: /IIS/i },
      requiredElements: ['header', 'main', 'footer'],
    },
  ],

  other: [
    {
      path: '/studio',
      name: 'Sanity Studio',
      type: 'studio',
      expectedContent: ['sanity'],
      requiredElements: [],
    },
  ],
};

// Flatten all routes for easy iteration
export const allRoutes: RouteConfig[] = Object.values(routes).flat();

// Get routes by type
export const getRoutesByType = (type: RouteConfig['type']): RouteConfig[] => {
  return allRoutes.filter(route => route.type === type);
};

// Navigation links that should be in header
export const mainNavLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];
