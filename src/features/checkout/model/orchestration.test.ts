import { describe, expect, it } from 'vitest'

import {
  buildCustomerFromInvitation,
  buildOrderSummary,
  buildTransparentCreatePayload,
  resolveChargeAction,
} from './orchestration'

const BASE_INVITATION = {
  id: 'inv_123',
  slug: 'barbara-rennan',
  template: 'blue',
  includePlanner: false,
  transparentChargeId: null,
  paymentStatus: null,
  groomName: 'Rennan',
  brideName: 'Bárbara',
  email: 'casal@example.com',
  whatsapp: '(11) 99999-9999',
  cpf: '123.456.789-00',
}

describe('checkout orchestration', () => {
  it('builds order summary for Azul without planner at 3090 centavos', () => {
    const summary = buildOrderSummary({
      templateName: 'Azul',
      displayPrice: 'R$ 30,90',
      includePlanner: false,
    })

    expect(summary.lineItems).toHaveLength(1)
    expect(summary.lineItems[0]?.amountCentavos).toBe(3090)
    expect(summary.totalCentavos).toBe(3090)
    expect(summary.summaryLabel).toBe('Convite Azul')
  })

  it('builds order summary for Azul with planner at 4080 centavos', () => {
    const summary = buildOrderSummary({
      templateName: 'Azul',
      displayPrice: 'R$ 30,90',
      includePlanner: true,
    })

    expect(summary.lineItems).toHaveLength(2)
    expect(summary.lineItems[1]?.label).toBe('Planner de casamento')
    expect(summary.lineItems[1]?.amountCentavos).toBe(990)
    expect(summary.totalCentavos).toBe(4080)
    expect(summary.summaryLabel).toBe('Convite Azul + planner')
  })

  it('reuses a pending charge that has not expired with complete PIX payload', () => {
    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'PENDING',
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
        brCode: '00020101021226950014br.gov.bcb.pix',
        brCodeBase64: 'data:image/png;base64,iVBORw0KGgoAAA',
      }),
    ).toBe('reuse')
  })

  it('creates a new charge when pending charge has empty brCode', () => {
    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'PENDING',
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
        brCode: '',
        brCodeBase64: 'data:image/png;base64,iVBORw0KGgoAAA',
      }),
    ).toBe('create')
  })

  it('creates a new charge when pending charge has empty brCodeBase64', () => {
    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'PENDING',
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
        brCode: '00020101021226950014br.gov.bcb.pix',
        brCodeBase64: '',
      }),
    ).toBe('create')
  })

  it('creates a new charge when pending charge is expired', () => {
    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'PENDING',
        expiresAt: new Date(Date.now() - 60_000).toISOString(),
      }),
    ).toBe('create')
  })

  it('creates a new charge when status is EXPIRED or CANCELLED', () => {
    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'EXPIRED',
        expiresAt: null,
      }),
    ).toBe('create')

    expect(
      resolveChargeAction({
        existingChargeId: 'pix_char_abc',
        chargeStatus: 'CANCELLED',
        expiresAt: null,
      }),
    ).toBe('create')
  })

  it('creates a new charge when no existing charge exists', () => {
    expect(
      resolveChargeAction({
        existingChargeId: null,
        chargeStatus: null,
        expiresAt: null,
      }),
    ).toBe('create')
  })

  it('builds AbacatePay v2 create payload with customer and metadata', () => {
    const payload = buildTransparentCreatePayload({
      invitation: { ...BASE_INVITATION, includePlanner: true },
      amountCentavos: 4080,
      customer: buildCustomerFromInvitation(BASE_INVITATION),
    })

    expect(payload.method).toBe('PIX')
    expect(payload.data.amount).toBe(4080)
    expect(payload.data.metadata).toEqual({
      invitationId: 'inv_123',
      template: 'blue',
      includePlanner: true,
    })
    expect(payload.data.customer.email).toBe('casal@example.com')
    expect(payload.data.customer.taxId).toBe('123.456.789-00')
  })
})
