import { NextRequest, NextResponse } from 'next/server'

import {
  checkTransparentCharge,
  simulateTransparentPayment,
} from '@/src/features/checkout/api/abacatepay-v2'
import { CHECKOUT_COPY } from '@/src/features/checkout/model/copy'
import { prisma } from '@/src/lib/prisma'

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Simulate payment is only available in development' }, { status: 403 })
  }

  try {
    const body = (await request.json()) as { invitationId?: string; chargeId?: string }
    const { invitationId, chargeId } = body

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

    const currentCharge = await checkTransparentCharge(chargeId)

    if (currentCharge.status === 'EXPIRED' || currentCharge.status === 'CANCELLED') {
      return NextResponse.json({ error: CHECKOUT_COPY.simulatePaymentExpired }, { status: 409 })
    }

    if (currentCharge.status !== 'PENDING') {
      return NextResponse.json({ error: CHECKOUT_COPY.simulatePaymentNotPending }, { status: 409 })
    }

    const charge = await simulateTransparentPayment(chargeId)

    if (!charge.devMode) {
      return NextResponse.json({ error: 'Simulate payment is only available for dev mode charges' }, { status: 403 })
    }

    return NextResponse.json({
      status: charge.status,
      expiresAt: charge.expiresAt,
    })
  } catch (error) {
    console.error('Error simulating transparent charge:', error)
    const message = error instanceof Error ? error.message : 'Failed to simulate payment'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
