import { NextResponse } from 'next/server';
import { getSiteSettingsFromCMS } from '@/lib/get-cms-data-direct';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const siteSettings = await getSiteSettingsFromCMS();
    return NextResponse.json(siteSettings || {});
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
