'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/sanity';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function CMSIndicator() {
  const [hasCMS, setHasCMS] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if CMS has any content
    const checkCMS = async () => {
      try {
        const result = await client.fetch(`count(*[_type in ["home", "service", "industry", "siteSettings"]])`);
        setHasCMS(result > 0);
      } catch (error) {
        console.log('CMS not configured or no content yet');
        setHasCMS(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkCMS();
  }, []);

  // Only show in development or if explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SHOW_CMS_INDICATOR) {
    return null;
  }

  if (isChecking) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="/studio"
        className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-all backdrop-blur-sm"
      >
        <Settings className="w-4 h-4" />
        <span>
          {hasCMS ? 'Edit Content' : 'Setup CMS'}
        </span>
      </Link>
    </div>
  );
}