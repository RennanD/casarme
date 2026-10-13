export type TransparentChargeStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED'

export type CheckoutLineItem = {
  label: string
  amountCentavos: number
  displayAmount: string
}

export type OrderSummary = {
  lineItems: CheckoutLineItem[]
  totalCentavos: number
  totalDisplay: string
  summaryLabel: string
}

export type ChargeOrchestrationAction = 'reuse' | 'create'

export type ChargeOrchestrationInput = {
  existingChargeId: string | null
  chargeStatus: TransparentChargeStatus | null
  expiresAt: string | null
  now?: Date
}

export type TransparentCustomerInput = {
  name: string
  email: string
  cellphone: string
  taxId: string
}

export type TransparentCreatePayload = {
  method: 'PIX'
  data: {
    amount: number
    description: string
    expiresIn: number
    customer: TransparentCustomerInput
    metadata: {
      invitationId: string
      template: string
      includePlanner: boolean
    }
    // ensureSameTaxId: future enhancement when PIX provider supports payer CPF lock
  }
}

export type CheckoutInvitationRecord = {
  id: string
  slug: string
  template: string
  includePlanner: boolean
  transparentChargeId: string | null
  paymentStatus: string | null
  groomName: string
  brideName: string
  email: string
  whatsapp: string | null
  cpf: string | null
}
