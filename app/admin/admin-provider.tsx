'use client';

import React, { useState } from 'react';
import { TinaEditProvider } from 'tinacms/dist/rich-text';
import TinaCloud from 'tina-cloud-starter';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <TinaEditProvider
      clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID!}
      token={process.env.NEXT_PUBLIC_TINA_TOKEN}
      branch={process.env.TINA_GIT_BRANCH || 'main'}
    >
      {children}
    </TinaEditProvider>
  );
}
