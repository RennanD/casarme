import { NextResponse } from "next/server"

export async function GET() {
  const config = {
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    AUTH_RESEND_KEY: !!process.env.AUTH_RESEND_KEY,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "não configurado",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "não configurado",
    AUTH_URL: process.env.AUTH_URL || "não configurado",
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json(config, { status: 200 })
}

