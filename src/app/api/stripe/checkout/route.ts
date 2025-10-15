import { NextRequest, NextResponse } from "next/server";
import { createInvitationCheckoutSession } from "@/src/lib/stripe/checkout";

export async function POST(request: NextRequest) {
  try {
    const { templateId, customerEmail, invitationId } = await request.json();

    if (!templateId || !customerEmail || !invitationId) {
      return NextResponse.json(
        { error: "Template ID, email e ID do convite são obrigatórios" },
        { status: 400 }
      );
    }

    const { url } = await createInvitationCheckoutSession({
      templateId,
      customerEmail,
      invitationId
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Erro na API de checkout:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
