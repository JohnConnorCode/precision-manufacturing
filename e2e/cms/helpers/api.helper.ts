import { Page, APIRequestContext } from '@playwright/test';
import { AdminCredentials } from './auth.helper';

export interface PayloadResponse<T = any> {
  docs?: T[];
  doc?: T;
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export class PayloadAPIHelper {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
  }

  async authenticate(request: APIRequestContext, credentials: AdminCredentials): Promise<void> {
    const response = await request.post(`${this.baseURL}/api/users/login`, {
      data: {
        email: credentials.email,
        password: credentials.password
      }
    });

    if (!response.ok()) {
      throw new Error(`Authentication failed: ${response.status()} ${response.statusText()}`);
    }

    const data = await response.json();
    this.token = data.token;
  }

  getAuthHeaders(): Record<string, string> {
    if (!this.token) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }
    return {
      'Authorization': `JWT ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async getCollection<T = any>(
    request: APIRequestContext,
    collection: string,
    params?: Record<string, any>
  ): Promise<PayloadResponse<T>> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await request.get(`${this.baseURL}/api/${collection}${queryString}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Failed to get ${collection}: ${response.status()} ${response.statusText()}`);
    }

    return await response.json();
  }

  async getDocument<T = any>(
    request: APIRequestContext,
    collection: string,
    id: string
  ): Promise<T> {
    const response = await request.get(`${this.baseURL}/api/${collection}/${id}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Failed to get ${collection}/${id}: ${response.status()} ${response.statusText()}`);
    }

    return await response.json();
  }

  async createDocument<T = any>(
    request: APIRequestContext,
    collection: string,
    data: any
  ): Promise<T> {
    const response = await request.post(`${this.baseURL}/api/${collection}`, {
      headers: this.getAuthHeaders(),
      data
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Failed to create ${collection}: ${response.status()} ${response.statusText()} - ${errorText}`);
    }

    return await response.json();
  }

  async updateDocument<T = any>(
    request: APIRequestContext,
    collection: string,
    id: string,
    data: any
  ): Promise<T> {
    const response = await request.patch(`${this.baseURL}/api/${collection}/${id}`, {
      headers: this.getAuthHeaders(),
      data
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Failed to update ${collection}/${id}: ${response.status()} ${response.statusText()} - ${errorText}`);
    }

    return await response.json();
  }

  async deleteDocument(
    request: APIRequestContext,
    collection: string,
    id: string
  ): Promise<void> {
    const response = await request.delete(`${this.baseURL}/api/${collection}/${id}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Failed to delete ${collection}/${id}: ${response.status()} ${response.statusText()}`);
    }
  }

  async getGlobal<T = any>(
    request: APIRequestContext,
    slug: string
  ): Promise<T> {
    const response = await request.get(`${this.baseURL}/api/globals/${slug}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok()) {
      throw new Error(`Failed to get global ${slug}: ${response.status()} ${response.statusText()}`);
    }

    return await response.json();
  }

  async updateGlobal<T = any>(
    request: APIRequestContext,
    slug: string,
    data: any
  ): Promise<T> {
    const response = await request.post(`${this.baseURL}/api/globals/${slug}`, {
      headers: this.getAuthHeaders(),
      data
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Failed to update global ${slug}: ${response.status()} ${response.statusText()} - ${errorText}`);
    }

    return await response.json();
  }
}

export function createPayloadAPI(baseURL?: string): PayloadAPIHelper {
  return new PayloadAPIHelper(baseURL);
}
