import type { Metadata } from 'next'

import { HomePage } from '@/src/features/home'
import { resolveHomeMetadata } from '@/src/shared/og-v2'

const homeMetadata = resolveHomeMetadata()

export const metadata: Metadata = {
  title: homeMetadata.title,
  description: homeMetadata.description,
  openGraph: {
    title: homeMetadata.title,
    description: homeMetadata.description,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'CasarMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeMetadata.title,
    description: homeMetadata.description,
  },
}

export default function V2HomePage() {
  return <HomePage />
}
