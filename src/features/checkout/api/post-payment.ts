import { resolveFromEmail, resend } from '@/src/shared/email'
import { prisma } from '@/src/shared/db'

import { PaymentConfirmationEmail } from '../components/payment-confirmation-email'
import { PAYMENT_CONFIRMATION_EMAIL_COPY } from '../model/payment-confirmation-email-copy'

export async function activateInvitationAndSendEmail(invitationId: string): Promise<boolean> {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  })

  if (!invitation) {
    return false
  }

  if (invitation.paymentStatus === 'paid' && invitation.isActive) {
    return true
  }

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      paymentStatus: 'paid',
      isActive: true,
      paidAt: invitation.paidAt ?? new Date(),
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? PAYMENT_CONFIRMATION_EMAIL_COPY.siteUrl
  const invitationUrl = `${baseUrl}/convite/${invitation.slug}`
  const plannerDownloadUrl = invitation.includePlanner
    ? `${baseUrl}/api/planner/download?invitationId=${invitation.id}`
    : undefined

  if (invitation.email) {
    try {
      await resend.emails.send({
        from: resolveFromEmail(),
        to: [invitation.email],
        subject: PAYMENT_CONFIRMATION_EMAIL_COPY.subject(
          invitation.groomName,
          invitation.brideName,
        ),
        react: PaymentConfirmationEmail({
          groomName: invitation.groomName,
          brideName: invitation.brideName,
          invitationUrl,
          plannerDownloadUrl,
          baseUrl,
        }),
      })
    } catch (error) {
      console.error('Error sending post-payment email:', error)
    }
  }

  return true
}

export async function findInvitationForTransparentWebhook(input: {
  chargeId?: string
  invitationId?: string
}) {
  return prisma.invitation.findFirst({
    where: {
      OR: [
        input.chargeId ? { transparentChargeId: input.chargeId } : undefined,
        input.invitationId ? { id: input.invitationId } : undefined,
      ].filter(Boolean) as Array<{ transparentChargeId: string } | { id: string }>,
    },
  })
}
