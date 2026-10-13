import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { CreateInviteWizard, type CreateInviteTemplate } from '@/src/features/create-invite'
import { HOME_CATALOG } from '@/src/features/home'

type CreateInvitePageProps = {
  params: Promise<{ slug: string }>
}

export default async function CreateInvitePage({ params }: CreateInvitePageProps) {
  const { slug } = await params

  const catalogEntry = HOME_CATALOG.find((entry) => entry.slug === slug)

  if (!catalogEntry) {
    notFound()
  }

  const template: CreateInviteTemplate = {
    slug: catalogEntry.slug,
    name: catalogEntry.name,
    displayPrice: catalogEntry.displayPrice,
    imagePath: catalogEntry.imagePath,
  }

  return (
    <Suspense>
      <CreateInviteWizard template={template} />
    </Suspense>
  )
}
