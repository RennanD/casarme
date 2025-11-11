import { NextRequest, NextResponse } from "next/server";
import { createInvitationCheckoutSession } from "@/src/lib/stripe/checkout";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { templateId, customerEmail, invitationId } = await request.json();

    if (!templateId || !customerEmail || !invitationId) {
      return NextResponse.json(
        { error: "Template ID, email e ID do convite são obrigatórios" },
        { status: 400 }
      );
    }

    const { url, sessionId } = await createInvitationCheckoutSession({
      templateId,
      customerEmail,
      invitationId
    });

    // Salvar o sessionId no banco imediatamente para permitir fallback no webhook
    if (sessionId) {
      try {
        await prisma.invitation.update({
          where: { id: invitationId },
          data: { stripeSessionId: sessionId }
        });
        console.log('✅ stripeSessionId salvo no banco:', sessionId);
      } catch (dbError) {
        console.error('⚠️ Erro ao salvar stripeSessionId (não crítico):', dbError);
        // Não falhar o checkout se não conseguir salvar o sessionId
      }
    }

    return NextResponse.json({ url, sessionId });
  } catch (error) {
    console.error("Erro na API de checkout:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
