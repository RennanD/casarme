import type { WizardStep } from './wizard-config'

export type { WizardStep } from './wizard-config'

export function parseStep(stepParam: string | undefined, stepCount: number): WizardStep {
  const parsed = Number(stepParam)

  if (Number.isNaN(parsed) || parsed < 1) return 1
  if (parsed > stepCount) return stepCount as WizardStep

  return parsed as WizardStep
}

export function buildStepHref(slug: string, step: WizardStep): string {
  return `/v2/criar/${slug}?step=${step}`
}
