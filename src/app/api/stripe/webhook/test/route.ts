import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe/stripe-client";
import { prisma } from "@/src/lib/prisma";

// Rota de teste para verificar webhook e metadados
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ 
        error: 'session_id é obrigatório',
        usage: 'Use ?session_id=cs_test_...'
      }, { status: 400 });
    }

    // Buscar sessão do Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });

    // Buscar convite no banco se houver invitationId nos metadados
    let invitation = null;
    if (session.metadata?.invitationId) {
      invitation = await prisma.invitation.findUnique({
        where: { id: session.metadata.invitationId }
      });
    }

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        status: session.status,
        customer_email: session.customer_email,
        metadata: session.metadata,
        payment_intent: typeof session.payment_intent === 'string' 
          ? session.payment_intent 
          : session.payment_intent?.id,
      },
      invitation: invitation ? {
        id: invitation.id,
        slug: invitation.slug,
        isActive: invitation.isActive,
        paymentStatus: invitation.paymentStatus,
        email: invitation.email,
        groomName: invitation.groomName,
        brideName: invitation.brideName,
      } : null,
      hasInvitationId: !!session.metadata?.invitationId,
      env: {
        hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
        hasResendFromEmail: !!process.env.RESEND_FROM_EMAIL,
        hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      }
    });
  } catch (error) {
    console.error('Erro no teste do webhook:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

