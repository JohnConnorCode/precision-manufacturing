'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function CMSIndicator() {
  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SHOW_CMS_INDICATOR) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="/studio"
        className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-blue-600 hover:border-blue-600 transition-all backdrop-blur-sm"
      >
        <Settings className="w-4 h-4" />
        <span>Edit Content</span>
      </Link>
    </div>
  );
}