import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe/stripe-client";
import { prisma } from "@/src/lib/prisma";
import { generateUniqueSlug } from "@/src/lib/slug";
import { resend } from "@/src/lib/resend";
import { EmailTemplate } from "@/src/lib/email-template";

// Configuração para garantir que o corpo seja mantido como string bruta
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Obter o corpo bruto da requisição como Buffer
    const body = await request.arrayBuffer();
    const bodyString = Buffer.from(body).toString('utf8');
    const signature = request.headers.get('stripe-signature');


    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        bodyString,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }


    // Processar pagamento bem-sucedido
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      try {
        await handleSuccessfulPayment(session);
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
      }
    } else {
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro geral no webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleSuccessfulPayment(session: any) {
  const {
    templateId,
    customerEmail,
    invitationId
  } = session.metadata;

  // Buscar o convite existente
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { images: true }
  });

  if (!invitation) {
    throw new Error('Convite não encontrado');
  }

  // Ativar o convite e atualizar dados do Stripe
  await prisma.invitation.update({
    where: { id: invitationId },
    data: {
      isActive: true,
      stripeCustomerId: session.customer,
      stripePaymentIntentId: session.payment_intent,
      stripeSessionId: session.id,
      paymentStatus: 'completed',
      purchasedAt: new Date(),
    }
  });

  // Gerar URL do convite
  const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${invitation.slug}`;


  // Enviar email de confirmação
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: [customerEmail],
    subject: `🎉 Seu convite interativo está pronto! - ${invitation.groomName} & ${invitation.brideName}`,
    react: EmailTemplate({
      groomName: invitation.groomName,
      brideName: invitation.brideName,
      invitationUrl
    })
  });
}
