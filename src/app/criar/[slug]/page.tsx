import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { CreateInviteWizard, type CreateInviteTemplate } from '@/src/features/create-invite'
import { resolveCatalogBySlug } from '@/src/shared/catalog'
import { resolveCreateInviteMetadataBySlug } from '@/src/shared/og-v2'

type CreateInvitePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CreateInvitePageProps): Promise<Metadata> {
  const { slug } = await params
  const metadataCopy = resolveCreateInviteMetadataBySlug(slug)

  if (!metadataCopy) {
    return {}
  }

  return {
    title: metadataCopy.title,
    description: metadataCopy.description,
    robots: { index: false, follow: false },
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

export default async function CreateInvitePage({ params }: CreateInvitePageProps) {
  const { slug } = await params
  const catalogEntry = resolveCatalogBySlug(slug)

  if (!catalogEntry) {
    notFound()
  }

  const template: CreateInviteTemplate = {
    slug: catalogEntry.slug,
    id: catalogEntry.id,
    name: catalogEntry.name,
    displayPrice: catalogEntry.displayPrice,
    imagePath: catalogEntry.imagePath,
    productLine: catalogEntry.productLine,
    plan: catalogEntry.plan,
  }

  return (
    <Suspense>
      <CreateInviteWizard template={template} />
    </Suspense>
  )
}
