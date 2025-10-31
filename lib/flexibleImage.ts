/**
 * Frontend utility for working with flexible image fields
 * Use this to resolve image URLs from Payload CMS data
 */

export interface FlexibleImageData {
  [key: string]: any
}

/**
 * Get the image URL from a flexible image field
 *
 * @param data - The data object containing the flexible image fields
 * @param fieldName - The base name of the field (e.g., 'backgroundImage')
 * @returns The resolved image URL or null
 *
 * @example
 * ```tsx
 * const imageUrl = getFlexibleImageUrl(service, 'backgroundImage')
 * if (imageUrl) {
 *   return <img src={imageUrl} alt="Background" />
 * }
 * ```
 */
export function getFlexibleImageUrl(
  data: FlexibleImageData | null | undefined,
  fieldName: string
): string | null {
  if (!data) return null

  const source = data[`${fieldName}Source`]

  // If using upload
  if (source === 'upload') {
    const upload = data[`${fieldName}Upload`]

    // Handle populated upload (object with url)
    if (typeof upload === 'object' && upload?.url) {
      return upload.url
    }

    // Handle upload reference (just an ID string)
    // In this case, you might need to fetch the media separately
    // or use Payload's depth parameter to populate it
    if (typeof upload === 'string') {
      console.warn(
        `Upload field ${fieldName}Upload is not populated. Use depth parameter in Payload query.`
      )
      return null
    }

    return null
  }

  // If using URL
  if (source === 'url') {
    const url = data[`${fieldName}Url`]
    return typeof url === 'string' && url.trim() !== '' ? url : null
  }

  // Fallback: check if old text field exists (for backward compatibility)
  const legacyField = data[fieldName]
  if (typeof legacyField === 'string' && legacyField.trim() !== '') {
    return legacyField
  }

  return null
}

/**
 * Get alt text for a flexible image
 *
 * @param data - The data object containing the flexible image fields
 * @param fieldName - The base name of the field (e.g., 'backgroundImage')
 * @param fallback - Fallback alt text if none is found
 * @returns The alt text string
 */
export function getFlexibleImageAlt(
  data: FlexibleImageData | null | undefined,
  fieldName: string,
  fallback: string = ''
): string {
  if (!data) return fallback

  const source = data[`${fieldName}Source`]

  if (source === 'upload') {
    const upload = data[`${fieldName}Upload`]
    if (typeof upload === 'object' && upload?.alt) {
      return upload.alt
    }
  }

  return fallback
}

/**
 * Check if a flexible image field has a value
 *
 * @param data - The data object containing the flexible image fields
 * @param fieldName - The base name of the field (e.g., 'backgroundImage')
 * @returns True if the field has a valid image URL
 */
export function hasFlexibleImage(
  data: FlexibleImageData | null | undefined,
  fieldName: string
): boolean {
  return getFlexibleImageUrl(data, fieldName) !== null
}

/**
 * Get multiple image sizes from an uploaded flexible image
 *
 * @param data - The data object containing the flexible image fields
 * @param fieldName - The base name of the field (e.g., 'backgroundImage')
 * @returns Object with image sizes or null
 */
export function getFlexibleImageSizes(
  data: FlexibleImageData | null | undefined,
  fieldName: string
): Record<string, { url: string; width: number; height: number }> | null {
  if (!data) return null

  const source = data[`${fieldName}Source`]

  if (source === 'upload') {
    const upload = data[`${fieldName}Upload`]
    if (typeof upload === 'object' && upload?.sizes) {
      return upload.sizes
    }
  }

  return null
}
