import { createClient } from '@sanity/client';
import { sanityClient } from './sanity.client';

// Preview client for draft content
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: false, // Always bypass CDN for fresh content
  perspective: 'previewDrafts', // Include drafts
  token: process.env.SANITY_READ_TOKEN, // Required for draft access
  ignoreBrowserTokenWarning: true, // Suppress warning in browser
});

// Helper to get the right client based on preview mode
export function getClient(preview?: boolean) {
  return preview ? previewClient : sanityClient;
}

// Helper to fetch with preview support
export async function sanityFetch<T = any>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: Record<string, any>;
  preview?: boolean;
}): Promise<T> {
  const client = getClient(preview);
  return client.fetch<T>(query, params);
}