import { prisma } from '@/src/lib/prisma'
import { resend } from '@/src/lib/resend'
import { EmailTemplate } from '@/src/lib/email-template'

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  const invitationUrl = `${baseUrl}/convite/${invitation.slug}`
  const plannerDownloadUrl = invitation.includePlanner
    ? `${baseUrl}/api/planner/download?invitationId=${invitation.id}`
    : undefined

  if (invitation.email) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: [invitation.email],
        subject: `🎉 Seu convite interativo está pronto! - ${invitation.groomName} & ${invitation.brideName}`,
        react: EmailTemplate({
          groomName: invitation.groomName,
          brideName: invitation.brideName,
          invitationUrl,
          plannerDownloadUrl,
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
