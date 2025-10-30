import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body.email !== 'string' || typeof body.template !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const email = body.email.trim()
    const template = body.template.trim()
    if (!email || !template) {
      return NextResponse.json({ error: 'Email e template são obrigatórios' }, { status: 400 })
    }

    // Save to database
    await prisma.godparentDownload.create({ data: { email, template } })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


