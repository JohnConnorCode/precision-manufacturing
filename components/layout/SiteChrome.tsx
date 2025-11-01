"use client"
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/scroll-to-top'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import { useEffect, useState } from 'react'

type Props = { children: React.ReactNode }

export default function SiteChrome({ children }: Props) {
  const pathname = usePathname() || ''
  const isAdminRoute = pathname.startsWith('/admin')
  const [navigationData, setNavigationData] = useState<any | null>(null)
  const [footerData, setFooterData] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [navRes, footRes] = await Promise.all([
          fetch('/api/cms/navigation', { cache: 'no-store' }),
          fetch('/api/cms/footer', { cache: 'no-store' }),
        ])
        if (mounted) {
          if (navRes.ok) setNavigationData(await navRes.json())
          if (footRes.ok) setFooterData(await footRes.json())
        }
      } catch {
        // fall back to component defaults
      }
    }
    if (!isAdminRoute) load()
    return () => { mounted = false }
  }, [isAdminRoute])

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <AnalyticsProvider enablePerformanceMonitoring={true}>
      <Header data={navigationData} />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer key="site-footer-unique" data={footerData} />
      <ScrollToTop />
    </AnalyticsProvider>
  )
}
