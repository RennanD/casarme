import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  try {
    const invitation = await prisma.invitation.findFirst({
      where: {
        stripeSessionId: sessionId,
        paymentStatus: 'completed'
      }
    });

    if (!invitation) {
      return NextResponse.json({
        success: false,
        message: 'Convite ainda não foi criado'
      });
    }

    const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${invitation.slug}`;

    return NextResponse.json({
      success: true,
      invitationUrl,
      invitation: {
        slug: invitation.slug,
        groomName: invitation.groomName,
        brideName: invitation.brideName,
        template: invitation.template
      }
    });

  } catch (error) {
    console.error('Erro ao verificar status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
