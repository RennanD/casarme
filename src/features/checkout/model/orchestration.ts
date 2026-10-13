import {
  centavosToDisplay,
  displayPriceToCentavos,
  PLANNER_ADDON_CENTAVOS,
  PLANNER_ADDON_DISPLAY,
  PIX_EXPIRES_IN_SECONDS,
} from './pricing'
import type {
  ChargeOrchestrationAction,
  ChargeOrchestrationInput,
  CheckoutInvitationRecord,
  OrderSummary,
  TransparentCreatePayload,
  TransparentCustomerInput,
} from './types'

export function buildOrderSummary(input: {
  templateName: string
  displayPrice: string
  includePlanner: boolean
}): OrderSummary {
  const templateCentavos = displayPriceToCentavos(input.displayPrice)
  const lineItems = [
    {
      label: `Convite ${input.templateName}`,
      amountCentavos: templateCentavos,
      displayAmount: input.displayPrice,
    },
  ]

  if (input.includePlanner) {
    lineItems.push({
      label: 'Planner de casamento',
      amountCentavos: PLANNER_ADDON_CENTAVOS,
      displayAmount: PLANNER_ADDON_DISPLAY,
    })
  }

  const totalCentavos = lineItems.reduce((sum, item) => sum + item.amountCentavos, 0)
  const summaryLabel = input.includePlanner
    ? `Convite ${input.templateName} + planner`
    : `Convite ${input.templateName}`

  return {
    lineItems,
    totalCentavos,
    totalDisplay: centavosToDisplay(totalCentavos),
    summaryLabel,
  }
}

export function resolveChargeAction(input: ChargeOrchestrationInput): ChargeOrchestrationAction {
  const { existingChargeId, chargeStatus, expiresAt, now = new Date() } = input

  if (!existingChargeId || !chargeStatus) {
    return 'create'
  }

  if (chargeStatus === 'PAID') {
    return 'reuse'
  }

  if (chargeStatus === 'EXPIRED' || chargeStatus === 'CANCELLED') {
    return 'create'
  }

  if (chargeStatus === 'PENDING') {
    if (expiresAt && new Date(expiresAt) <= now) {
      return 'create'
    }
    return 'reuse'
  }

  return 'create'
}

export function buildTransparentCreatePayload(input: {
  invitation: CheckoutInvitationRecord
  amountCentavos: number
  customer: TransparentCustomerInput
}): TransparentCreatePayload {
  const { invitation, amountCentavos, customer } = input

  return {
    method: 'PIX',
    data: {
      amount: amountCentavos,
      description: 'Convite CasarMe',
      expiresIn: PIX_EXPIRES_IN_SECONDS,
      customer,
      metadata: {
        invitationId: invitation.id,
        template: invitation.template,
        includePlanner: invitation.includePlanner,
      },
    },
  }
}

export function buildCustomerFromInvitation(
  invitation: CheckoutInvitationRecord,
): TransparentCustomerInput {
  return {
    name: `${invitation.brideName} & ${invitation.groomName}`,
    email: invitation.email,
    cellphone: invitation.whatsapp ?? '',
    taxId: invitation.cpf ?? '000.000.000-00',
  }
}
