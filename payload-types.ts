/**
 * Payload Generated Types - Temporary Stub
 *
 * Run `npx payload generate:types` to regenerate proper types
 * This stub allows the project to build without errors
 */

export interface Service {
  id: string;
  title: string;
  slug: string;
  description?: any;
  shortDescription?: string;
  specs?: string[];
  order?: number;
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Industry {
  id: string;
  title: string;
  slug: string;
  description: any;
  features?: string[];
  order?: number;
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category?: string;
  content?: any;
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
