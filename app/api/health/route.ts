import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: {
      sanity: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? 'configured' : 'missing',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ? 'configured' : 'missing',
        apiVersion: process.env.SANITY_API_VERSION ? 'configured' : 'missing'
      },
      node_env: process.env.NODE_ENV,
      vercel: process.env.VERCEL ? 'true' : 'false'
    }
  });
}