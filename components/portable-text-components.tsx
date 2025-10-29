'use client';

import { PortableText } from '@portabletext/react'
import { CalloutBox } from '@/components/ui/callout-box'
import { TechnicalSpecs } from '@/components/ui/technical-specs'
import { CTAButton } from '@/components/ui/cta-button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import Link from 'next/link'
// TODO: Migrate to non-Sanity image handling
// import { urlFor } from '@/lib/sanity-resources'

// Custom components for Portable Text
export const portableTextComponents = {
  types: {
    // Image component
    image: ({ value }: any) => {
      if (!value?.asset) return null

      return (
        <div className="my-8">
          <Image
            src={value.url || 'https://via.placeholder.com/1200x800'}
            alt={value.alt || 'Resource image'}
            width={1200}
            height={800}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <p className="text-sm text-slate-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },

    // Technical Specifications component
    technicalSpecs: ({ value }: any) => {
      if (!value?.specs) return null

      return (
        <div className="my-8">
          <TechnicalSpecs specs={value.specs} />
        </div>
      )
    },

    // Callout Box component
    calloutBox: ({ value }: any) => {
      return (
        <div className="my-6">
          <CalloutBox
            type={value.type || 'info'}
            title={value.title || ''}
          >
            {value.content}
          </CalloutBox>
        </div>
      )
    },

    // Code Block component
    codeBlock: ({ value }: any) => {
      if (!value?.code) return null

      return (
        <div className="my-6">
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              padding: '1rem',
            }}
            showLineNumbers={value.language !== 'text'}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      )
    },

    // CTA Button component
    ctaButton: ({ value }: any) => {
      if (!value?.href || !value?.text) return null

      return (
        <div className="my-8 flex justify-center">
          <CTAButton
            href={value.href}
            variant={value.variant || 'primary'}
          >
            {value.text}
          </CTAButton>
        </div>
      )
    },
  },

  block: {
    // Custom styles for block elements
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-white mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 my-4 italic text-slate-400">
        {children}
      </blockquote>
    ),
  },

  marks: {
    // Custom styles for inline elements
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-slate-800 text-blue-400 px-1 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined

      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {children}
        </Link>
      )
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
  },
}

// Component to render Portable Text content
export function PortableTextContent({ value }: { value: any }) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <PortableText
        value={value}
        components={portableTextComponents}
      />
    </div>
  )
}