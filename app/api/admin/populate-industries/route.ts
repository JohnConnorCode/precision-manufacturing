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
    // Security check
    const auth = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_POPULATE_TOKEN || 'dev-only-token';

    if (auth !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Read industry data from JSON file
    const industriesPath = join(process.cwd(), 'scripts', 'industries-to-create.json');
    const industriesJson = readFileSync(industriesPath, 'utf-8');
    const industries = JSON.parse(industriesJson);

    console.log(`Populating ${industries.length} industries...`);
    const results = [];

    for (const industry of industries) {
      const slug = industry.slug.current;
      const docId = `industry-${slug}`;

      try {
        // Check if exists
        const existing = await client.fetch(`*[_id == "${docId}"]`);

        if (existing && existing.length > 0) {
          // Update
          const updated = await client.patch(docId).set(industry).commit();
          results.push({
            title: industry.title,
            status: 'updated',
            id: updated._id,
          });
          console.log(`✅ Updated: ${industry.title}`);
        } else {
          // Create
          const created = await client.create({
            _id: docId,
            ...industry,
          });
          results.push({
            title: industry.title,
            status: 'created',
            id: created._id,
          });
          console.log(`✅ Created: ${industry.title}`);
        }
      } catch (error: any) {
        console.error(`❌ Failed: ${industry.title}`, error.message);
        results.push({
          title: industry.title,
          status: 'failed',
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${industries.length} industries`,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Population error:', error);
    return NextResponse.json(
      {
        error: 'Failed to populate industries',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
