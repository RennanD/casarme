import { notFound } from 'next/navigation'

import {
  buildInviteMetadata,
  getInvitationBySlug,
  InactiveInvite,
  mapDbInvitationToRenderer,
  ViewInvitePage,
} from '@/src/features/view-invite'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params
  const invitation = await getInvitationBySlug(slug)

  if (!invitation) {
    notFound()
  }

  if (!invitation.isActive) {
    return <InactiveInvite />
  }

  const rendererData = mapDbInvitationToRenderer(invitation)

  return <ViewInvitePage data={rendererData} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const invitation = await getInvitationBySlug(slug)

  if (!invitation) {
    return {
      title: 'Convite não encontrado',
      description: 'O convite que você está procurando não existe.',
    }
  }

  return buildInviteMetadata({
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    weddingDate: invitation.weddingDate,
    venueName: invitation.venueName,
    welcomeMessage: invitation.welcomeMessage,
  })
}
