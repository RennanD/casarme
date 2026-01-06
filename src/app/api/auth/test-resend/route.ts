import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET() {
  try {
    const resend = new Resend(process.env.AUTH_RESEND_KEY || process.env.RESEND_API_KEY)

    // Testar se a API do Resend está funcionando
    const testEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@casarme.site",
      to: process.env.ADMIN_EMAIL || "test@example.com",
      subject: "Teste de Configuração",
      html: "<p>Este é um email de teste para verificar a configuração do Resend.</p>",
    })

    return NextResponse.json({
      success: true,
      message: "Resend está configurado corretamente",
      emailId: testEmail.data?.id,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erro ao testar Resend",
        details: error,
      },
      { status: 500 }
    )
  }
}

