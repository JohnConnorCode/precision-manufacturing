import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  /* MDX Support */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  /* Performance optimizations */
  compress: true,
  poweredByHeader: false,

  /* Disable ESLint during build temporarily */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* Image optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    qualities: [30, 75, 80, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.apicdn.sanity.io',
      },
    ],
  },

  /* Security headers */
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
        ],
      },
    ];
  },

  /* Redirects */
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/supplier-requirements',
        destination: '/compliance/supplier-requirements',
        permanent: true,
      },
    ];
  },

  /* Experimental features for performance */
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    // Fix module resolution for TypeScript files (from official Payload template)
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    }
    return config
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Wrap with Payload and MDX, with serverless optimization for Vercel
export default withPayload(withMDX(nextConfig), {
  // Disable bundling of server packages for serverless deployment
  devBundleServerPackages: false,
});
