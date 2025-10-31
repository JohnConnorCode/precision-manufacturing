'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Resources error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-slate-400 mb-8">
          We encountered an error loading this resource.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try again
          </Button>
          <Link href="/resources">
            <Button variant="outline" className="w-full">
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
