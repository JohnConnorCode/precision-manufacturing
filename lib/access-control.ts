import type { Access, AccessArgs } from 'payload'

/**
 * Access Control Helpers for Payload CMS
 *
 * Defines role-based permissions for admin users
 *
 * Roles:
 * - admin: Full access to everything (create, read, update, delete)
 * - editor: Can create and edit content, but cannot delete or manage users
 * - viewer: Read-only access to content
 */

export type UserRole = 'admin' | 'editor' | 'viewer'

/**
 * Check if user is an admin
 */
export const isAdmin = ({ req: { user } }: AccessArgs): boolean => {
  return user?.role === 'admin'
}

/**
 * Check if user is an admin or editor
 */
export const isAdminOrEditor = ({ req: { user } }: AccessArgs): boolean => {
  return user?.role === 'admin' || user?.role === 'editor'
}

/**
 * Check if user is logged in (any role)
 */
export const isLoggedIn = ({ req: { user } }: AccessArgs): boolean => {
  return Boolean(user)
}

/**
 * Admin-only access
 * Use for: User management, sensitive settings, deletion
 */
export const adminOnly: Access = isAdmin

/**
 * Admin and Editor access
 * Use for: Creating and editing content
 */
export const adminOrEditor: Access = isAdminOrEditor

/**
 * Any logged-in user
 * Use for: Reading content in admin
 */
export const authenticated: Access = isLoggedIn

/**
 * Collection Access: Content Collections (Services, Industries, Resources)
 */
export const contentCollectionAccess = {
  // Anyone can read published content on the frontend
  read: () => true,

  // Only admins and editors can create content
  create: isAdminOrEditor,

  // Only admins and editors can update content
  update: isAdminOrEditor,

  // Only admins can delete content
  delete: isAdmin,
}

/**
 * Collection Access: User Management
 */
export const userCollectionAccess = {
  // Admins can read all users, editors/viewers can only read themselves
  read: ({ req: { user } }: AccessArgs) => {
    if (user?.role === 'admin') {
      return true
    }
    // Non-admins can only read their own user document
    return {
      id: {
        equals: user?.id,
      },
    }
  },

  // Only admins can create new users
  create: isAdmin,

  // Admins can update anyone, others can only update themselves
  update: ({ req: { user } }: AccessArgs) => {
    if (user?.role === 'admin') {
      return true
    }
    // Non-admins can only update their own user document
    return {
      id: {
        equals: user?.id,
      },
    }
  },

  // Only admins can delete users
  delete: isAdmin,
}

/**
 * Collection Access: Media/Uploads
 */
export const mediaCollectionAccess = {
  // Anyone can read media on the frontend
  read: () => true,

  // Only admins and editors can upload media
  create: isAdminOrEditor,

  // Only admins and editors can update media
  update: isAdminOrEditor,

  // Only admins can delete media
  delete: isAdmin,
}

/**
 * Global Access: Site-wide settings and content
 */
export const globalAccess = {
  // Anyone can read globals on the frontend
  read: () => true,

  // Only admins and editors can update globals
  update: isAdminOrEditor,
}

/**
 * Field-level access: Prevent non-admins from changing their own role
 */
export const canManageContent: Access = ({ req, ...args }) => {
  const doc = (args as any).doc;
  // Admins can always edit roles
  if (req?.user?.role === 'admin') {
    return true
  }

  // Non-admins cannot edit the role field
  return false
}
