/**
 * Field Validation Helpers for Payload CMS
 *
 * Provides reusable validation functions for common field types
 */

/**
 * Validate slug format (lowercase letters, numbers, hyphens only)
 */
export const validateSlug = (value: string): string | true => {
  if (!value || value.trim() === '') {
    return 'Slug is required'
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  if (!slugRegex.test(value)) {
    return 'Slug must be lowercase letters, numbers, and hyphens only (e.g., "5-axis-machining")'
  }

  return true
}

/**
 * Validate email format
 */
export const validateEmail = (value: string): string | true => {
  if (!value || value.trim() === '') {
    return true // Allow empty if not required
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(value)) {
    return 'Please provide a valid email address'
  }

  return true
}

/**
 * Validate URL format
 */
export const validateURL = (value: string): string | true => {
  if (!value || value.trim() === '') {
    return true // Allow empty if not required
  }

  try {
    new URL(value)
    return true
  } catch {
    return 'Please provide a valid URL (must start with http:// or https://)'
  }
}

/**
 * Validate phone number (flexible format)
 */
export const validatePhone = (value: string): string | true => {
  if (!value || value.trim() === '') {
    return true // Allow empty if not required
  }

  // Allow various formats: (123) 456-7890, 123-456-7890, 1234567890, +1-123-456-7890
  const phoneRegex = /^[\d\s\-\(\)\+]+$/

  if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
    return 'Please provide a valid phone number (at least 10 digits)'
  }

  return true
}

/**
 * Validate character length
 */
export const validateMaxLength = (max: number) => {
  return (value: string): string | true => {
    if (!value) return true

    if (value.length > max) {
      return `Must be ${max} characters or less (currently ${value.length})`
    }

    return true
  }
}

/**
 * Validate minimum character length
 */
export const validateMinLength = (min: number) => {
  return (value: string): string | true => {
    if (!value) return true

    if (value.length < min) {
      return `Must be at least ${min} characters (currently ${value.length})`
    }

    return true
  }
}

/**
 * Validate required field with custom message
 */
export const validateRequired = (message?: string) => {
  return (value: any): string | true => {
    if (value === null || value === undefined || value === '') {
      return message || 'This field is required'
    }

    return true
  }
}

/**
 * Validate number range
 */
export const validateRange = (min: number, max: number) => {
  return (value: number): string | true => {
    if (value === null || value === undefined) {
      return true
    }

    if (value < min || value > max) {
      return `Must be between ${min} and ${max}`
    }

    return true
  }
}

/**
 * Common field descriptions for reuse
 */
export const fieldDescriptions = {
  slug: 'URL-friendly identifier (lowercase letters, numbers, and hyphens only). Example: "precision-machining"',
  title: 'The main title/heading displayed on the page',
  description: 'Full description with rich text formatting',
  shortDescription: 'Short summary shown in card previews and listings',
  excerpt: 'Brief excerpt or preview text for articles and resources',
  content: 'Main content area with full rich text editing capabilities',
  email: 'Email address (e.g., contact@example.com)',
  phone: 'Phone number with country code (e.g., +1-555-123-4567)',
  url: 'Full URL including http:// or https://',
  badge: 'Small text label shown as a badge (e.g., "Featured", "New")',
  order: 'Display order (lower numbers appear first)',
  publishDate: 'Date this content should be published or was published',
  author: 'Name of the content author',
  readTime: 'Estimated reading time (e.g., "5 min read")',
  category: 'Content category for organization and filtering',
  difficulty: 'Technical difficulty level for this resource',
  featured: 'Mark as featured to highlight on main pages',
}
