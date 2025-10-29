'use client';

import React from 'react';

// Tina CMS Provider for local file-based editing
// Configured to use Git as backend - no external authentication needed
// Files are committed automatically to the repository
export function AdminProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
