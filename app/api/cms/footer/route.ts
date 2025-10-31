import { NextResponse } from 'next/server'
import { getFooterFromCMS } from '@/lib/get-cms-data'

export async function GET() {
  try {
    const data = await getFooterFromCMS()
    return NextResponse.json(data || null)
  } catch (e) {
    return NextResponse.json(null, { status: 200 })
  }
}

