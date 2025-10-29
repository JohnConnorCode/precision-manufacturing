import React from 'react';

// This page will be a dynamic route that catches all paths under /admin
// The Tina UI will be rendered here
export default async function AdminPage({ params }: { params: Promise<{ route?: string[] }> }) {
  const { route } = await params;

  return (
    <div id="tina-root">
      {/* Tina UI will be injected here by the client component */}
      <p>Loading Tina Admin...</p>
    </div>
  );
}
