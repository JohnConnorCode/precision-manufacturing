import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// These values MUST come from environment variables
// They are set in Vercel and allow Sanity Studio to work properly
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im';
export const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01';

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