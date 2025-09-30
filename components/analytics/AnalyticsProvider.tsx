'use client';

import { Suspense } from 'react';
import { Analytics } from './Analytics';
import { PerformanceMonitor } from './PerformanceMonitor';

interface AnalyticsProviderProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  linkedInPartnerId?: string;
  hotjarId?: string;
  enablePerformanceMonitoring?: boolean;
  children?: React.ReactNode;
}

export function AnalyticsProvider({
  googleAnalyticsId,
  facebookPixelId,
  linkedInPartnerId,
  hotjarId,
  enablePerformanceMonitoring = true,
  children
}: AnalyticsProviderProps) {
  return (
    <>
      <Suspense fallback={null}>
        <Analytics
          googleAnalyticsId={googleAnalyticsId}
          facebookPixelId={facebookPixelId}
          linkedInPartnerId={linkedInPartnerId}
          hotjarId={hotjarId}
        />
      </Suspense>
      {enablePerformanceMonitoring && <PerformanceMonitor />}
      {children}
    </>
  );
}

export default AnalyticsProvider;