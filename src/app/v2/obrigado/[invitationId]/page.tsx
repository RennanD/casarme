import { notFound, redirect } from 'next/navigation'

import { getCheckoutInvitation, ThankYouClient } from '@/src/features/checkout'

type ThankYouPageProps = {
  params: Promise<{ invitationId: string }>
}

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { invitationId } = await params
  const invitation = await getCheckoutInvitation(invitationId)

  if (!invitation) {
    notFound()
  }

  if (invitation.paymentStatus !== 'paid') {
    redirect(`/v2/checkout/${invitationId}`)
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  const invitationUrl = `${baseUrl}/convite/${invitation.slug}`

  return <ThankYouClient invitationUrl={invitationUrl} email={invitation.email} />
}
