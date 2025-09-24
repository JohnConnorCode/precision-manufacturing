import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables with proper defaults for build time
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im';
export const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01';

// Log warning if using defaults (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn('⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID not set, using default: ept6x5im');
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    console.warn('⚠️ NEXT_PUBLIC_SANITY_DATASET not set, using default: production');
  }
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};