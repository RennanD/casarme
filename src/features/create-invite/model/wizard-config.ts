import type { CreateInviteTemplate } from './catalog'
import { createInviteSchemaForTemplate, type CreateInviteFormValues } from './schemas'

export type StepKind = 'couple' | 'ceremony' | 'media' | 'payment'

export type WizardStep = 1 | 2 | 3 | 4

export type WizardStepDefinition = {
  number: WizardStep
  kind: StepKind
  label: string
}

export type WizardConfig = {
  stepCount: number
  steps: WizardStepDefinition[]
  stepFields: Partial<Record<WizardStep, readonly (keyof CreateInviteFormValues)[]>>
  isFieldVisible: (step: WizardStep, field: keyof CreateInviteFormValues) => boolean
  createSchema: () => ReturnType<typeof createInviteSchemaForTemplate>
}

const COUPLE_FIELDS = [
  'brideName',
  'groomName',
  'weddingDate',
  'weddingTime',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const INTERACTIVE_CEREMONY_FIELDS = [
  'venueAddress',
  'whatsapp',
  'musicUrl',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const SITE_CEREMONY_FIELDS = [
  'venueName',
  'welcomeMessage',
  'venueAddress',
  'whatsapp',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const ROMANTIC_CEREMONY_FIELDS = [
  ...SITE_CEREMONY_FIELDS,
  'musicUrl',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const AZUL_MEDIA_FIELDS = ['images'] as const satisfies readonly (keyof CreateInviteFormValues)[]

const GARDEN_MEDIA_FIELDS = ['images'] as const satisfies readonly (keyof CreateInviteFormValues)[]

const ROMANTIC_MEDIA_FIELDS = [
  'images',
  'coupleStory',
  'groomStory',
  'brideStory',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const PAYMENT_FIELDS = [
  'email',
  'cpf',
  'includePlanner',
] as const satisfies readonly (keyof CreateInviteFormValues)[]

const THREE_STEP_LAYOUT: WizardStepDefinition[] = [
  { number: 1, kind: 'couple', label: 'Dados do casal' },
  { number: 2, kind: 'ceremony', label: 'Cerimônia' },
  { number: 3, kind: 'payment', label: 'Pagamento' },
]

const FOUR_STEP_LAYOUT: WizardStepDefinition[] = [
  { number: 1, kind: 'couple', label: 'Dados do casal' },
  { number: 2, kind: 'ceremony', label: 'Cerimônia' },
  { number: 3, kind: 'media', label: 'Fotos' },
  { number: 4, kind: 'payment', label: 'Pagamento' },
]

type FieldVisibilityMap = Partial<
  Record<WizardStep, readonly (keyof CreateInviteFormValues)[]>
>

function buildIsFieldVisible(visibility: FieldVisibilityMap) {
  return (step: WizardStep, field: keyof CreateInviteFormValues) => {
    const fields = visibility[step]
    return fields?.includes(field) ?? false
  }
}

const WIZARD_CONFIGS: Record<string, Omit<WizardConfig, 'createSchema'>> = {
  dourado: {
    stepCount: 3,
    steps: THREE_STEP_LAYOUT,
    stepFields: {
      1: COUPLE_FIELDS,
      2: INTERACTIVE_CEREMONY_FIELDS,
      3: PAYMENT_FIELDS,
    },
    isFieldVisible: buildIsFieldVisible({
      1: COUPLE_FIELDS,
      2: INTERACTIVE_CEREMONY_FIELDS,
      3: PAYMENT_FIELDS,
    }),
  },
  azul: {
    stepCount: 4,
    steps: FOUR_STEP_LAYOUT,
    stepFields: {
      1: COUPLE_FIELDS,
      2: INTERACTIVE_CEREMONY_FIELDS,
      3: AZUL_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    },
    isFieldVisible: buildIsFieldVisible({
      1: COUPLE_FIELDS,
      2: INTERACTIVE_CEREMONY_FIELDS,
      3: AZUL_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    }),
  },
  garden: {
    stepCount: 4,
    steps: FOUR_STEP_LAYOUT,
    stepFields: {
      1: COUPLE_FIELDS,
      2: SITE_CEREMONY_FIELDS,
      3: GARDEN_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    },
    isFieldVisible: buildIsFieldVisible({
      1: COUPLE_FIELDS,
      2: SITE_CEREMONY_FIELDS,
      3: GARDEN_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    }),
  },
  romantic: {
    stepCount: 4,
    steps: FOUR_STEP_LAYOUT,
    stepFields: {
      1: COUPLE_FIELDS,
      2: ROMANTIC_CEREMONY_FIELDS,
      3: ROMANTIC_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    },
    isFieldVisible: buildIsFieldVisible({
      1: COUPLE_FIELDS,
      2: ROMANTIC_CEREMONY_FIELDS,
      3: ROMANTIC_MEDIA_FIELDS,
      4: PAYMENT_FIELDS,
    }),
  },
}

export function getWizardConfig(template: CreateInviteTemplate): WizardConfig {
  const config = WIZARD_CONFIGS[template.slug] ?? WIZARD_CONFIGS.dourado

  return {
    ...config,
    createSchema: () => createInviteSchemaForTemplate(template.slug),
  }
}

export function getStepKind(config: WizardConfig, step: WizardStep): StepKind {
  const definition = config.steps.find((entry) => entry.number === step)
  return definition?.kind ?? 'couple'
}
