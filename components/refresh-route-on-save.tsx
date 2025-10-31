'use client'

import { RefreshRouteOnSave as PayloadRefresh } from '@payloadcms/live-preview/react'
import { useRouter, usePathname } from 'next/navigation'

/**
 * RefreshRouteOnSave - Client Component
 *
 * Listens for save events from Payload admin panel and refreshes
 * the current route to show updated content.
 *
 * Works with React Server Components - triggers router.refresh()
 * which re-fetches server component data.
 */
export function RefreshRouteOnSave() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't run on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <PayloadRefresh
      refresh={() => {
        router.refresh()
      }}
    />
  )
}
