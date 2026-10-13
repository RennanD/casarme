import type { CreateInviteFormValues } from './schemas'

export const WIZARD_STEP_COUNT = 3

export type WizardStep = 1 | 2 | 3

export const WIZARD_STEPS = [
  { number: 1 as const, label: 'Dados do casal' },
  { number: 2 as const, label: 'Cerimônia' },
  { number: 3 as const, label: 'Pagamento' },
] as const

export const STEP_FIELDS: Record<WizardStep, readonly (keyof CreateInviteFormValues)[]> = {
  1: ['brideName', 'groomName', 'weddingDate'],
  2: ['venueAddress', 'whatsapp', 'musicUrl'],
  3: ['email', 'cpf', 'includePlanner'],
}

export function parseStep(stepParam: string | undefined): WizardStep {
  const parsed = Number(stepParam)

  if (Number.isNaN(parsed)) return 1
  if (parsed < 1) return 1
  if (parsed > WIZARD_STEP_COUNT) return WIZARD_STEP_COUNT

  return parsed as WizardStep
}

export function buildStepHref(slug: string, step: WizardStep): string {
  return `/v2/criar/${slug}?step=${step}`
}
