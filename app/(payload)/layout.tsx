import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'Content Management System',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  // Payload admin panel - just return children without HTML structure
  // Root layout will handle the HTML/body tags
  return children
}
