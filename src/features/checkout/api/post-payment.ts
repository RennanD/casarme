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

  if (invitation.paymentStatus !== 'paid' || !invitation.isActive) {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        paymentStatus: 'paid',
        isActive: true,
        paidAt: invitation.paidAt ?? new Date(),
      },
    })
  }

  const [emailState] = await prisma.$queryRaw<
    Array<{ paymentConfirmationEmailSentAt: Date | null }>
  >`
    SELECT "paymentConfirmationEmailSentAt"
    FROM "invitations"
    WHERE "id" = ${invitation.id}
  `

  if (emailState?.paymentConfirmationEmailSentAt) return true

  if (!invitation.email) {
    console.error('Cannot send payment confirmation email: invitation has no recipient', {
      invitationId: invitation.id,
    })
    return true
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? PAYMENT_CONFIRMATION_EMAIL_COPY.siteUrl
  const invitationUrl = `${baseUrl}/convite/${invitation.slug}`
  const plannerDownloadUrl = invitation.includePlanner
    ? `${baseUrl}/api/planner/download?invitationId=${invitation.id}`
    : undefined

  const { error } = await resend.emails.send({
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

  if (error) {
    console.error('Resend rejected the payment confirmation email', {
      invitationId: invitation.id,
      error,
    })
    throw new Error('Payment confirmation email delivery failed')
  }

  await prisma.$executeRaw`
    UPDATE "invitations"
    SET "paymentConfirmationEmailSentAt" = NOW()
    WHERE "id" = ${invitation.id}
      AND "paymentConfirmationEmailSentAt" IS NULL
  `

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
