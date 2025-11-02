import { APIRequestContext } from '@playwright/test';
import { PayloadAPIHelper } from './api.helper';

export interface TestDataTracker {
  services: string[];
  industries: string[];
  resources: string[];
  teamMembers: string[];
  media: string[];
}

export class CleanupHelper {
  private tracker: TestDataTracker = {
    services: [],
    industries: [],
    resources: [],
    teamMembers: [],
    media: []
  };

  trackService(id: string): void {
    this.tracker.services.push(id);
  }

  trackIndustry(id: string): void {
    this.tracker.industries.push(id);
  }

  trackResource(id: string): void {
    this.tracker.resources.push(id);
  }

  trackTeamMember(id: string): void {
    this.tracker.teamMembers.push(id);
  }

  trackMedia(id: string): void {
    this.tracker.media.push(id);
  }

  async cleanupAll(request: APIRequestContext, api: PayloadAPIHelper): Promise<void> {
    const errors: string[] = [];

    // Clean up in reverse order to handle dependencies
    for (const id of this.tracker.resources) {
      try {
        await api.deleteDocument(request, 'resources', id);
      } catch (error) {
        errors.push(`Failed to delete resource ${id}: ${error}`);
      }
    }

    for (const id of this.tracker.services) {
      try {
        await api.deleteDocument(request, 'services', id);
      } catch (error) {
        errors.push(`Failed to delete service ${id}: ${error}`);
      }
    }

    for (const id of this.tracker.industries) {
      try {
        await api.deleteDocument(request, 'industries', id);
      } catch (error) {
        errors.push(`Failed to delete industry ${id}: ${error}`);
      }
    }

    for (const id of this.tracker.teamMembers) {
      try {
        await api.deleteDocument(request, 'team-members', id);
      } catch (error) {
        errors.push(`Failed to delete team member ${id}: ${error}`);
      }
    }

    for (const id of this.tracker.media) {
      try {
        await api.deleteDocument(request, 'media', id);
      } catch (error) {
        errors.push(`Failed to delete media ${id}: ${error}`);
      }
    }

    // Reset tracker
    this.tracker = {
      services: [],
      industries: [],
      resources: [],
      teamMembers: [],
      media: []
    };

    if (errors.length > 0) {
      console.warn('Cleanup warnings:', errors);
    }
  }

  async cleanupTestDocuments(
    request: APIRequestContext,
    api: PayloadAPIHelper,
    collection: string,
    testPattern: RegExp
  ): Promise<number> {
    try {
      const response = await api.getCollection(request, collection, { limit: 100 });
      const docs = response.docs || [];
      let deletedCount = 0;

      for (const doc of docs) {
        if (testPattern.test(doc.title || doc.name || '')) {
          try {
            await api.deleteDocument(request, collection, doc.id);
            deletedCount++;
          } catch (error) {
            console.warn(`Failed to delete ${collection}/${doc.id}:`, error);
          }
        }
      }

      return deletedCount;
    } catch (error) {
      console.warn(`Failed to cleanup ${collection}:`, error);
      return 0;
    }
  }
}

export function createCleanupHelper(): CleanupHelper {
  return new CleanupHelper();
}
