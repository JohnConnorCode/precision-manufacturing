'use client';

import React from 'react';

// Tina CMS Provider for local file-based editing
// When configured with Tina Cloud, this will enable visual editing
// For now, editing is done via GitHub web interface or local MDX files
export function AdminProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
