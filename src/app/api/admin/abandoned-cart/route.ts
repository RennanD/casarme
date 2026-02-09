import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"
import { createInvitationCheckoutSession } from "@/src/lib/stripe/checkout"
import { resend } from "@/src/lib/resend"
import { AbandonedCartEmailTemplate } from "@/src/lib/abandoned-cart-email-template"

// GET: Listar convites não pagos
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (session.user?.email !== adminEmail) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    // Buscar convites não pagos (criados há mais de 1 hora e não pagos)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    const abandonedInvitations = await prisma.invitation.findMany({
      where: {
        isActive: false,
        OR: [
          { paymentStatus: null },
          { paymentStatus: { not: "completed" } },
        ],
        createdAt: {
          lt: oneHourAgo, // Criado há mais de 1 hora
        },
      },
      select: {
        id: true,
        groomName: true,
        brideName: true,
        email: true,
        template: true,
        createdAt: true,
        paymentStatus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ invitations: abandonedInvitations })
  } catch (error) {
    console.error("Erro ao buscar convites abandonados:", error)
    return NextResponse.json(
      { error: "Erro ao buscar convites" },
      { status: 500 }
    )
  }
}

// POST: Enviar email de recuperação para um convite específico
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    if (session.user?.email !== adminEmail) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    const { invitationId } = await request.json()

    if (!invitationId) {
      return NextResponse.json(
        { error: "ID do convite é obrigatório" },
        { status: 400 }
      )
    }

    // Buscar o convite
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    })

    if (!invitation) {
      return NextResponse.json(
        { error: "Convite não encontrado" },
        { status: 404 }
      )
    }

    // Verificar se já foi pago
    if (invitation.isActive || invitation.paymentStatus === "completed") {
      return NextResponse.json(
        { error: "Este convite já foi pago" },
        { status: 400 }
      )
    }



    // Gerar novo link de checkout
    const { url: checkoutUrl } = await createInvitationCheckoutSession({
      templateId: invitation.template,
      customerEmail: invitation.email,
      invitationId: invitation.id,
    })



    // Enviar email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [invitation.email],
      subject: `💍 Complete seu convite de casamento - ${invitation.groomName} & ${invitation.brideName}`,
      react: AbandonedCartEmailTemplate({
        groomName: invitation.groomName,
        brideName: invitation.brideName,
        checkoutUrl: checkoutUrl!,
      }),
    })

    return NextResponse.json({
      success: true,
      message: "Email de recuperação enviado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao enviar email de recuperação:", error)
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    )
  }
}

