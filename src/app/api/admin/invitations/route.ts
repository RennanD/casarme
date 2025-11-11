import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Verificar se o email é o do admin
    const adminEmail = process.env.ADMIN_EMAIL
    if (session.user?.email !== adminEmail) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 })
    }

    // Buscar convites ordenados por data de criação (mais recentes primeiro)
    const invitations = await prisma.invitation.findMany({
      select: {
        id: true,
        brideName: true,
        groomName: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ invitations })
  } catch (error) {
    console.error("Erro ao buscar convites:", error)
    return NextResponse.json(
      { error: "Erro ao buscar convites" },
      { status: 500 }
    )
  }
}

