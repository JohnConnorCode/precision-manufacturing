import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// IMPORTANT: These are public values safe to hardcode
// The projectId and dataset are public information
export const dataset = 'production';
export const projectId = 'ept6x5im';
export const apiVersion = '2025-01-01';

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