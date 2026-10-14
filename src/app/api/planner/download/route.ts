import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/src/lib/prisma'

const PLANNER_FILENAME = 'Planner_Casamento_CasarMe.xlsx'

export async function GET(request: NextRequest) {
  try {
    const invitationId = request.nextUrl.searchParams.get('invitationId')

    if (!invitationId) {
      return NextResponse.json({ error: 'Missing invitationId' }, { status: 400 })
    }

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: {
        paymentStatus: true,
        includePlanner: true,
      },
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    if (invitation.paymentStatus !== 'paid' || !invitation.includePlanner) {
      return NextResponse.json({ error: 'Planner not available' }, { status: 403 })
    }

    const filePath = path.join(process.cwd(), 'src/assets/planner', PLANNER_FILENAME)
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${PLANNER_FILENAME}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (error) {
    console.error('Error downloading planner:', error)
    return NextResponse.json({ error: 'Failed to download planner' }, { status: 500 })
  }
}
