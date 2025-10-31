import { NextResponse } from 'next/server'
import { getNavigationFromCMS } from '@/lib/get-cms-data-direct'

export async function GET() {
  try {
    const data = await getNavigationFromCMS()
    return NextResponse.json(data || null)
  } catch (e) {
    return NextResponse.json(null, { status: 200 })
  }
}

