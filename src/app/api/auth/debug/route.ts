import { NextRequest, NextResponse } from "next/server"
import { signIn } from "@/src/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 })
    }

    // Tentar fazer signIn e capturar o erro detalhado
    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      })

      return NextResponse.json({
        success: true,
        result,
      })
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Erro desconhecido",
          stack: error.stack,
          name: error.name,
          details: error,
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro ao processar requisição",
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}

