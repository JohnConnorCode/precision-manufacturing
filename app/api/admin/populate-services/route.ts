import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ept6x5im',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: NextRequest) {
  try {
    // Security check - verify this is a legitimate admin request
    const auth = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_POPULATE_TOKEN || 'dev-only-token';

    if (auth !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Read service data from JSON file
    const servicesPath = join(process.cwd(), 'scripts', 'services-to-create.json');
    const servicesJson = readFileSync(servicesPath, 'utf-8');
    const services = JSON.parse(servicesJson);

    console.log(`Populating ${services.length} services...`);
    const results = [];

    for (const service of services) {
      const slug = service.slug.current;
      const docId = `service-${slug}`;

      try {
        // Check if exists
        const existing = await client.fetch(`*[_id == "${docId}"]`);

        if (existing && existing.length > 0) {
          // Update
          const updated = await client.patch(docId).set(service).commit();
          results.push({
            title: service.title,
            status: 'updated',
            id: updated._id,
          });
          console.log(`✅ Updated: ${service.title}`);
        } else {
          // Create
          const created = await client.create({
            _id: docId,
            ...service,
          });
          results.push({
            title: service.title,
            status: 'created',
            id: created._id,
          });
          console.log(`✅ Created: ${service.title}`);
        }
      } catch (error: any) {
        console.error(`❌ Failed: ${service.title}`, error.message);
        results.push({
          title: service.title,
          status: 'failed',
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${services.length} services`,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Population error:', error);
    return NextResponse.json(
      {
        error: 'Failed to populate services',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
