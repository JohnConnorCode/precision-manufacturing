import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Published content client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true, // Always use CDN for read operations - dramatically faster
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});

// Draft content client (for preview mode)
export const draftClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false, // Don't cache draft content
  perspective: 'previewDrafts', // Include draft documents
  token: process.env.SANITY_READ_TOKEN, // Required for reading drafts
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}