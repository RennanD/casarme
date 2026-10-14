import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import {
  CheckoutClient,
  CHECKOUT_COPY,
  getCheckoutInvitation,
  initializeTransparentCharge,
} from '@/src/features/checkout'
import { CheckoutInvitePreview, mapInvitationToPreview } from '@/src/features/invite-preview'
import { resolveCatalogById } from '@/src/shared/catalog'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

type CheckoutPageProps = {
  params: Promise<{ invitationId: string }>
}

function resolveDisplayPrice(templateId: string): string {
  const catalogEntry = resolveCatalogById(templateId)
  return catalogEntry?.displayPrice ?? 'R$ 0,00'
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { invitationId } = await params
  const invitation = await getCheckoutInvitation(invitationId)

  if (!invitation) {
    notFound()
  }

  if (invitation.paymentStatus === 'paid') {
    redirect(`/obrigado/${invitationId}`)
  }

  const charge = await initializeTransparentCharge({
    invitationId,
    displayPrice: resolveDisplayPrice(invitation.template),
  })

  if (!charge) {
    notFound()
  }

  const previewData = mapInvitationToPreview(invitation)

  return (
    <CheckoutClient
      invitationId={invitationId}
      chargeId={charge.chargeId}
      chargeStatus={charge.status}
      expiresAt={charge.expiresAt}
      brCode={charge.brCode}
      brCodeBase64={charge.brCodeBase64}
      devMode={charge.devMode}
      orderSummary={charge.orderSummary}
      brideName={invitation.brideName}
      groomName={invitation.groomName}
      email={invitation.email}
      preview={
        <CheckoutInvitePreview
          data={previewData}
          previewLabel={CHECKOUT_COPY.previewLabel}
        />
      }
    />
  )
}
