import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DemoShell, getSampleDataBySlug } from '@/src/features/demo'
import { InviteRenderer } from '@/src/features/invite-templates'
import { resolveCatalogBySlug } from '@/src/shared/catalog'

type DemoPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { slug } = await params
  const catalogEntry = resolveCatalogBySlug(slug)

  if (!catalogEntry) {
    return {}
  }

  return {
    title: `Demonstração ${catalogEntry.name} — CasarMe`,
    description: catalogEntry.description,
    robots: { index: true, follow: true },
    openGraph: {
      title: `Demonstração ${catalogEntry.name} — CasarMe`,
      description: catalogEntry.description,
      type: 'website',
      locale: 'pt_BR',
      siteName: 'CasarMe',
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
