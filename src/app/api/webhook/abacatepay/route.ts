import { NextRequest, NextResponse } from 'next/server'

import {
  activateInvitationAndSendEmail,
  findInvitationForTransparentWebhook,
} from '@/src/features/checkout'
import { prisma } from '@/src/lib/prisma'
import { resend } from '@/src/lib/resend'
import { EmailTemplate } from '@/src/lib/email-template'

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text()
    const event = JSON.parse(bodyText)

    // Webhook signature validation remains deferred (existing stub behavior).

    if (event.event === 'billing.paid') {
      const billingId = event.data?.billing?.id || event.data?.id
      const metadata = event.data?.billing?.metadata || event.data?.metadata || event.metadata
      const invitationIdFromMetadata = metadata?.invitationId

      if (!billingId && !invitationIdFromMetadata) {
        console.error(
          'Webhook received billing.paid but no identification found. Full payload:',
          JSON.stringify(event, null, 2),
        )
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
      }

      const invitation = await prisma.invitation.findFirst({
        where: {
          OR: [
            billingId ? { billingId: billingId } : undefined,
            invitationIdFromMetadata ? { id: invitationIdFromMetadata } : undefined,
          ].filter(Boolean) as Array<{ billingId: string } | { id: string }>,
        },
      })

      if (invitation) {
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            paymentStatus: 'paid',
            isActive: true,
            paidAt: new Date(),
          },
        })

        console.log(`Invitation ${invitation.id} activated via AbacatePay v1 billing.`)

        const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${invitation.slug}`

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
              }),
            })
          } catch (emailError) {
            console.error('Error sending email:', emailError)
          }
        }
      } else {
        console.error(
          `Invitation not found for billingId: ${billingId}. Full payload:`,
          JSON.stringify(event, null, 2),
        )
      }
    } else if (event.event === 'transparent.completed') {
      const chargeId = event.data?.id || event.data?.transparent?.id
      const metadata = event.data?.metadata || event.metadata
      const invitationIdFromMetadata = metadata?.invitationId as string | undefined

      const invitation = await findInvitationForTransparentWebhook({
        chargeId,
        invitationId: invitationIdFromMetadata,
      })

      if (invitation) {
        await activateInvitationAndSendEmail(invitation.id)
        console.log(`Invitation ${invitation.id} activated via AbacatePay v2 transparent PIX.`)
      } else {
        console.error(
          `Invitation not found for transparent charge: ${chargeId}. Full payload:`,
          JSON.stringify(event, null, 2),
        )
      }
    } else if (event.event === 'billing.refunded') {
      const billingId = event.data?.billing?.id || event.data?.id
      const invitation = await prisma.invitation.findUnique({
        where: { billingId: billingId || undefined },
      })

      if (invitation) {
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            paymentStatus: 'refunded',
            isActive: false,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
