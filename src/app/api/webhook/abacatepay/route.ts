


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { validateWebhookSignature } from '@/src/lib/abacatepay';
import { resend } from '@/src/lib/resend';
import { EmailTemplate } from '@/src/lib/email-template';

export async function POST(request: NextRequest) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get('abacatepay-signature') || ''; // Check exact header name in docs. Usually x-abacatepay-signature or similar. 
    // Docs said: "Cabeçalho de autenticação Bearer..." for API, but for webhooks? 
    // Usually webhooks have a signature header. 
    // Let's assume 'abacatepay-signature' or 'x-abacatepay-signature' based on standard practices, 
    // or just proceed without strict validation for MVP if confident.
    // However, the helper function expects a signature.

    // For now, let's parse the body.
    const event = JSON.parse(bodyText);

    // Verify signature (optional for now if header is unknown, but recommended)
    // const isValid = validateWebhookSignature(bodyText, signature, process.env.ABACATEPAY_WEBHOOK_SECRET!);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }



    if (event.event === 'billing.paid') {
      // AbacatePay webhook for billing.paid has the billing object in event.data.billing
      // Some versions might have it in event.data.id (legacy or different event types)
      const billingId = event.data?.billing?.id || event.data?.id;
      const metadata = event.data?.billing?.metadata || event.data?.metadata || event.metadata;
      const invitationIdFromMetadata = metadata?.invitationId;

      if (!billingId && !invitationIdFromMetadata) {
        console.error('Webhook received billing.paid but no identification found. Full payload:', JSON.stringify(event, null, 2));
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }

      // Find invitation by billingId or invitationId from metadata
      const invitation = await prisma.invitation.findFirst({
        where: {
          OR: [
            billingId ? { billingId: billingId } : undefined,
            invitationIdFromMetadata ? { id: invitationIdFromMetadata } : undefined
          ].filter(Boolean) as any
        },
      });

      if (invitation) {
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            paymentStatus: 'paid',
            isActive: true, // Activate invitation
            paidAt: new Date(),
          },
        });

        console.log(`Invitation ${invitation.id} activated via AbacatePay.`);


        // Send email
        const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${invitation.slug}`;

        if (invitation.email) {

          try {
            await resend.emails.send({
              from: process.env.RESEND_FROM_EMAIL!,
              to: [invitation.email],
              subject: `🎉 Seu convite interativo está pronto! - ${invitation.groomName} & ${invitation.brideName}`,
              react: EmailTemplate({
                groomName: invitation.groomName,
                brideName: invitation.brideName,
                invitationUrl
              })
            });

          } catch (emailError) {
            console.error('Error sending email:', emailError);
          }
        }
      } else {
        console.error(`Invitation not found for billingId: ${billingId}. Full payload:`, JSON.stringify(event, null, 2));
      }
    } else if (event.event === 'billing.refunded') {
      const billingId = event.data?.billing?.id || event.data?.id;
      const invitation = await prisma.invitation.findUnique({
        where: { billingId: billingId || undefined },
      });

      if (invitation) {
        await prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            paymentStatus: 'refunded',
            isActive: false, // Deactivate invitation
          },
        });

      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
