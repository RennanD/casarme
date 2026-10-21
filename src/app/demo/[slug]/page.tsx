import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DemoShell, getSampleDataBySlug } from '@/src/features/demo'
import { InviteRenderer } from '@/src/features/invite-templates'
import { resolveCatalogBySlug } from '@/src/shared/catalog'
import { resolveDemoMetadataBySlug } from '@/src/shared/og-v2'

type DemoPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params
  const metadataCopy = resolveDemoMetadataBySlug(slug)

  if (!metadataCopy) {
    return {}
  }

  return {
    title: metadataCopy.title,
    description: metadataCopy.description,
    robots: { index: true, follow: true },
    openGraph: {
      title: metadataCopy.title,
      description: metadataCopy.description,
      type: 'website',
      locale: 'pt_BR',
      siteName: 'CasarMe',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataCopy.title,
      description: metadataCopy.description,
    },
  }
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params
  const catalogEntry = resolveCatalogBySlug(slug)
  const sampleData = getSampleDataBySlug(slug)

  if (!catalogEntry || !sampleData) {
    notFound()
  }

  return (
    <DemoShell slug={slug} templateName={catalogEntry.name}>
      <InviteRenderer data={sampleData} />
    </DemoShell>
  )
}
