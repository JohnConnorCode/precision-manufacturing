import type { Field } from 'payload'

/**
 * Flexible Image Field
 *
 * Allows editors to either:
 * 1. Upload an image from the media collection
 * 2. Paste an external image URL
 *
 * Usage:
 * ```typescript
 * import { flexibleImageField } from './fields/flexibleImage'
 *
 * fields: [
 *   ...flexibleImageField('backgroundImage', {
 *     label: 'Background Image',
 *     description: 'Upload an image or provide a URL'
 *   })
 * ]
 * ```
 */
export const flexibleImageField = (
  name: string,
  options: {
    label?: string
    description?: string
    required?: boolean
    admin?: {
      position?: 'sidebar'
      condition?: (data: any, siblingData: any) => boolean
    }
  } = {}
): Field[] => {
  const {
    label = name,
    description,
    required = false,
    admin = {},
  } = options

  return [
    {
      name: `${name}Source`,
      type: 'radio',
      defaultValue: 'upload',
      options: [
        {
          label: 'Upload from Media Library',
          value: 'upload',
        },
        {
          label: 'External URL',
          value: 'url',
        },
      ],
      admin: {
        layout: 'horizontal',
        description: 'Choose how to add the image',
        ...admin,
      },
    } as Field,
    {
      name: `${name}Upload`,
      type: 'upload',
      relationTo: 'media',
      required: false, // Handle required validation at the group level
      admin: {
        description: description || 'Upload an image from your computer',
        condition: (data: any, siblingData: any) => {
          return siblingData?.[`${name}Source`] === 'upload'
        },
        ...admin,
      },
    } as Field,
    {
      name: `${name}Url`,
      type: 'text',
      required: false, // Handle required validation at the group level
      admin: {
        description: description || 'Paste the URL of an external image (e.g., https://example.com/image.jpg)',
        placeholder: 'https://example.com/image.jpg',
        condition: (data: any, siblingData: any) => {
          return siblingData?.[`${name}Source`] === 'url'
        },
        ...admin,
      },
    } as Field,
  ]
}

/**
 * Helper function to get the image URL from flexible image fields
 * Use this in your frontend to resolve the correct image URL
 */
export const getFlexibleImageUrl = (
  data: any,
  fieldName: string
): string | null => {
  const source = data?.[`${fieldName}Source`]

  if (source === 'upload') {
    const upload = data?.[`${fieldName}Upload`]
    if (typeof upload === 'object' && upload?.url) {
      return upload.url
    }
    return null
  }

  if (source === 'url') {
    return data?.[`${fieldName}Url`] || null
  }

  return null
}

/**
 * Validation hook to ensure at least one image source is provided
 */
export const validateFlexibleImage = (fieldName: string) => {
  return (value: any, { data, siblingData }: any) => {
    const source = siblingData?.[`${fieldName}Source`] || data?.[`${fieldName}Source`]

    if (source === 'upload') {
      const upload = siblingData?.[`${fieldName}Upload`] || data?.[`${fieldName}Upload`]
      if (!upload) {
        return 'Please upload an image or switch to URL mode'
      }
    }

    if (source === 'url') {
      const url = siblingData?.[`${fieldName}Url`] || data?.[`${fieldName}Url`]
      if (!url || url.trim() === '') {
        return 'Please provide an image URL or switch to upload mode'
      }

      // Basic URL validation
      try {
        new URL(url)
      } catch {
        return 'Please provide a valid URL (must start with http:// or https://)'
      }
    }

    return true
  }
}
