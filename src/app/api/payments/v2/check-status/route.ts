import { NextRequest, NextResponse } from 'next/server'

import { activateInvitationAndSendEmail, checkTransparentCharge } from '@/src/features/checkout'
import { prisma } from '@/src/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const invitationId = request.nextUrl.searchParams.get('invitationId')
    const chargeId = request.nextUrl.searchParams.get('chargeId')

    if (!invitationId || !chargeId) {
      return NextResponse.json({ error: 'Missing invitationId or chargeId' }, { status: 400 })
    }

    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: {
        id: true,
        transparentChargeId: true,
        paymentStatus: true,
      },
    })

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    if (invitation.transparentChargeId !== chargeId) {
      return NextResponse.json({ error: 'Charge mismatch' }, { status: 403 })
    }

    if (invitation.paymentStatus === 'paid') {
      return NextResponse.json({ status: 'PAID' })
    }

    const charge = await checkTransparentCharge(chargeId)

    if (charge.status === 'PAID') {
      await activateInvitationAndSendEmail(invitationId)
    }

    return NextResponse.json({
      status: charge.status,
      expiresAt: charge.expiresAt,
    })
  } catch (error) {
    console.error('Error checking transparent charge:', error)
    return NextResponse.json({ error: 'Failed to check payment status' }, { status: 500 })
  }
}
