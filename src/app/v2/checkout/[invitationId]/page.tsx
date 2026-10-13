import { notFound, redirect } from 'next/navigation'

import {
  CheckoutClient,
  CHECKOUT_COPY,
  getCheckoutInvitation,
  initializeTransparentCharge,
} from '@/src/features/checkout'
import { CheckoutInvitePreview, mapInvitationToPreview } from '@/src/features/invite-preview'
import { HOME_CATALOG } from '@/src/features/home'

type CheckoutPageProps = {
  params: Promise<{ invitationId: string }>
}

function resolveDisplayPrice(templateId: string): string {
  const catalogEntry = HOME_CATALOG.find((entry) => entry.id === templateId)
  return catalogEntry?.displayPrice ?? 'R$ 0,00'
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { invitationId } = await params
  const invitation = await getCheckoutInvitation(invitationId)

  if (!invitation) {
    notFound()
  }

  if (invitation.paymentStatus === 'paid') {
    redirect(`/v2/obrigado/${invitationId}`)
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
      brCode={charge.brCode}
      brCodeBase64={charge.brCodeBase64}
      orderSummary={charge.orderSummary}
      brideName={invitation.brideName}
      groomName={invitation.groomName}
      email={invitation.email}
      preview={
        <CheckoutInvitePreview
          data={previewData}
          previewLabel={CHECKOUT_COPY.previewLabel}
          expandLabel={CHECKOUT_COPY.previewExpand}
          modalTitle={CHECKOUT_COPY.previewModalTitle}
          modalDescription={CHECKOUT_COPY.previewModalDescription}
        />
      }
    />
  )
}
