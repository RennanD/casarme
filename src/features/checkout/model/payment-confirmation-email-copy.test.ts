import { describe, expect, it } from 'vitest'

import { PAYMENT_CONFIRMATION_EMAIL_COPY } from './payment-confirmation-email-copy'

const EMOJI_PATTERN =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u

describe('payment confirmation email copy', () => {
  it('builds subject with couple names and CasarMe branding', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.subject('João', 'Maria')).toBe(
      'CasarMe — Pagamento confirmado: convite de João & Maria',
    )
  })

  it('uses the expected inbox preview text', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.preview).toBe(
      'Compartilhe o link do convite com seus convidados.',
    )
  })

  it('interpolates couple names in the title', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.title('João', 'Maria')).toBe(
      'Tudo certo, João & Maria!',
    )
  })

  it('keeps planner copy distinct from base confirmation copy', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.plannerTitle).toBe('Planner de casamento')
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.plannerDescription).toBe(
      'Seu planner digital está pronto para download.',
    )
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.plannerCta).toBe('Baixar planner')
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.plannerTitle).not.toBe(
      PAYMENT_CONFIRMATION_EMAIL_COPY.inviteLinkLabel,
    )
  })

  it('keeps subject and preview free of emoji characters', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.subject('João', 'Maria')).not.toMatch(EMOJI_PATTERN)
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.preview).not.toMatch(EMOJI_PATTERN)
  })

  it('uses the v2 support contact email', () => {
    expect(PAYMENT_CONFIRMATION_EMAIL_COPY.contactEmail).toBe('casarm.site@gmail.com')
  })
})
