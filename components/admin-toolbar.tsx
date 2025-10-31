import { cookies } from 'next/headers'
import { AdminEditButton } from './admin-edit-button'

/**
 * AdminToolbar - Server Component
 *
 * Renders admin editing tools for authenticated users.
 * - Server-side auth check (better performance than client-side)
 * - Includes Edit Page button
 *
 * Add once to root layout - works everywhere.
 */
export async function AdminToolbar() {
  // Server-side auth check - much faster than client fetch
  const cookieStore = await cookies()
  const hasAuth = cookieStore.has('payload-token')

  if (!hasAuth) {
    return null
  }

  return <AdminEditButton />
}
