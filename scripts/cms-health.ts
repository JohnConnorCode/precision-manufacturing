import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../payload.config'

async function main() {
  const started = Date.now()
  const payload = await getPayloadHMR({ config: configPromise })

  const result: Record<string, any> = { ok: true }
  try {
    const [services, industries, resources] = await Promise.all([
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'industries' }),
      payload.count({ collection: 'resources' }),
    ])

    const [navigation, homepage, footer] = await Promise.all([
      payload.findGlobal({ slug: 'navigation' }).catch(() => null),
      payload.findGlobal({ slug: 'homepage' }).catch(() => null),
      payload.findGlobal({ slug: 'footer' }).catch(() => null),
    ])

    result.services = services
    result.industries = industries
    result.resources = resources
    result.navigation = !!navigation
    result.homepage = !!homepage
    result.footer = !!footer
    result.durationMs = Date.now() - started
  } catch (e: any) {
    result.ok = false
    result.error = e?.message || String(e)
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

