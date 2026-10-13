import { prisma } from '@/src/lib/prisma'

import {
  checkTransparentCharge,
  createTransparentCharge,
  getTransparentCharge,
  type TransparentChargeData,
} from './abacatepay-v2'
import { getCheckoutInvitation } from './get-checkout-invitation'
import {
  buildCustomerFromInvitation,
  buildOrderSummary,
  buildTransparentCreatePayload,
  resolveChargeAction,
} from '../model/orchestration'
import type { OrderSummary } from '../model/types'
import { TEMPLATE_DISPLAY_NAMES } from '../model/copy'

export type InitializedCheckoutCharge = {
  chargeId: string
  status: TransparentChargeData['status']
  brCode: string
  brCodeBase64: string
  expiresAt: string | null
  orderSummary: OrderSummary
}

export async function initializeTransparentCharge(input: {
  invitationId: string
  displayPrice: string
}): Promise<InitializedCheckoutCharge | null> {
  const invitation = await getCheckoutInvitation(input.invitationId)

  if (!invitation) {
    return null
  }

  if (invitation.paymentStatus === 'paid') {
    return null
  }

  const templateName = TEMPLATE_DISPLAY_NAMES[invitation.template] ?? 'Convite'
  const orderSummary = buildOrderSummary({
    templateName,
    displayPrice: input.displayPrice,
    includePlanner: invitation.includePlanner,
  })

  let existingCharge: TransparentChargeData | null = null

  if (invitation.transparentChargeId) {
    try {
      existingCharge = await checkTransparentCharge(invitation.transparentChargeId)
    } catch {
      try {
        existingCharge = await getTransparentCharge(invitation.transparentChargeId)
      } catch {
        existingCharge = null
      }
    }
  }

  const action = resolveChargeAction({
    existingChargeId: invitation.transparentChargeId,
    chargeStatus: existingCharge?.status ?? null,
    expiresAt: existingCharge?.expiresAt ?? null,
  })

  if (action === 'reuse' && existingCharge) {
    return {
      chargeId: existingCharge.id,
      status: existingCharge.status,
      brCode: existingCharge.brCode,
      brCodeBase64: existingCharge.brCodeBase64,
      expiresAt: existingCharge.expiresAt,
      orderSummary,
    }
  }

  const payload = buildTransparentCreatePayload({
    invitation,
    amountCentavos: orderSummary.totalCentavos,
    customer: buildCustomerFromInvitation(invitation),
  })

  const created = await createTransparentCharge(payload)

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { transparentChargeId: created.id },
  })

  return {
    chargeId: created.id,
    status: created.status,
    brCode: created.brCode,
    brCodeBase64: created.brCodeBase64,
    expiresAt: created.expiresAt,
    orderSummary,
  }
}
