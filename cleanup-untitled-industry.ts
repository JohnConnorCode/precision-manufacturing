import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from './payload.config'

/**
 * Cleanup script to remove the untitled industry entry
 *
 * This script uses Payload's Local API (not direct MongoDB writes) to safely
 * remove incomplete data from the industries collection.
 */
async function cleanup() {
  console.log('🧹 Starting cleanup: Remove untitled industry entry...\n')

  try {
    const payload = await getPayloadHMR({ config: configPromise })
    console.log('✅ Connected to Payload')

    // Find all industries to inspect them
    const { docs: industries } = await payload.find({
      collection: 'industries',
      limit: 100,
    })

    console.log(`\nFound ${industries.length} industries total\n`)

    // Identify incomplete entries
    const incompleteIndustries = industries.filter(
      (industry) => !industry.title || !industry.slug || industry.slug === 'undefined'
    )

    if (incompleteIndustries.length === 0) {
      console.log('✅ No incomplete industries found. Database is clean!')
      process.exit(0)
    }

    console.log(`⚠️  Found ${incompleteIndustries.length} incomplete industry entries:\n`)

    incompleteIndustries.forEach((industry, index) => {
      console.log(`${index + 1}. ID: ${industry.id}`)
      console.log(`   Title: ${industry.title || 'MISSING'}`)
      console.log(`   Slug: ${industry.slug || 'MISSING'}`)
      console.log(`   Created: ${industry.createdAt}`)
      console.log('')
    })

    // Delete incomplete entries
    for (const industry of incompleteIndustries) {
      console.log(`🗑️  Deleting incomplete industry (ID: ${industry.id})...`)

      await payload.delete({
        collection: 'industries',
        id: industry.id,
      })

      console.log(`✅ Deleted successfully`)
    }

    console.log('')
    console.log('🎉 Cleanup completed successfully!')
    console.log('')
    console.log('Summary:')
    console.log(`  ✓ ${incompleteIndustries.length} incomplete entries removed`)
    console.log(`  ✓ ${industries.length - incompleteIndustries.length} valid industries remain`)
    console.log('')

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  }

  process.exit(0)
}

cleanup()
