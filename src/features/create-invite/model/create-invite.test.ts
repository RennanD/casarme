import { describe, expect, it } from 'vitest'

import { EXTENDED_TEMPLATE_SLUGS } from '@/src/shared/catalog'

import {
  calculateOrderTotal,
  formatDisplayPrice,
  parseDisplayPrice,
  PLANNER_ADDON_PRICE,
  resolveTemplateBySlug,
  type CreateInviteTemplate,
} from './catalog'
import {
  CREATE_INVITE_ACTIONS,
  CREATE_INVITE_HEADER,
  buildStepEyebrow,
  getFormCopy,
} from './copy'
import { mapFormToApiPayload } from './map-form-to-api'
import { maskCpf, maskWeddingDate, maskWeddingTime, maskWhatsApp } from './masks'
import { createInviteSchemaForTemplate, coupleStepSchema, paymentStepSchema } from './schemas'
import { buildStepHref, parseStep } from './steps'
import { getWizardConfig } from './wizard-config'

const EXTENDED_TEMPLATE: CreateInviteTemplate = {
  slug: 'azul',
  id: 'azul',
  name: 'Azul',
  displayPrice: 'R$ 76,50',
  imagePath: '/images/thumbs/azul/01.png',
  productLine: 'site',
  plan: 'Pro',
}

const DOURADO_EXTENDED: CreateInviteTemplate = {
  slug: 'dourado',
  id: 'dourado',
  name: 'Dourado',
  displayPrice: 'R$ 76,50',
  imagePath: '/images/thumbs/dourado/01.png',
  productLine: 'site',
  plan: 'Pro',
}

const FIXTURE_CATALOG: CreateInviteTemplate[] = [
  EXTENDED_TEMPLATE,
  DOURADO_EXTENDED,
  {
    slug: 'garden',
    id: 'garden',
    name: 'Verde Oliva',
    displayPrice: 'R$ 58,90',
    imagePath: '/images/thumbs/garden/01.png',
    productLine: 'site',
    plan: 'Básico',
  },
  {
    slug: 'romantic',
    id: 'romantic',
    name: 'Romântico',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/romantico/01.png',
    productLine: 'site',
    plan: 'Pro',
  },
  {
    slug: 'golden',
    id: 'golden',
    name: 'Dourado',
    displayPrice: 'R$ 25,90',
    imagePath: '/images/thumbs/golden/01.png',
    productLine: 'interactive',
    plan: 'Premium',
  },
]

const SAMPLE_IMAGE = {
  filename: 'hero_123.jpg',
  originalName: 'foto.jpg',
  width: 800,
  height: 600,
  size: 120000,
  type: 'hero',
}

const VALID_BASE = {
  brideName: 'Bárbara',
  groomName: 'Rennan',
  weddingDate: '13/10/2026',
  weddingTime: '18:30',
  venueAddress: 'Rua das Flores, 123, Centro, São Paulo — SP',
  whatsapp: '(11) 99999-9999',
  musicUrl: '',
  venueName: '',
  welcomeMessage: '',
  coupleStory: '',
  groomStory: '',
  brideStory: '',
  images: { gallery: [] as typeof SAMPLE_IMAGE[] },
  email: 'casal@example.com',
  cpf: '123.456.789-00',
  includePlanner: true,
}

const VALID_ROMANTIC_MEDIA = {
  hero: SAMPLE_IMAGE,
  groom: SAMPLE_IMAGE,
  bride: SAMPLE_IMAGE,
  gallery: [SAMPLE_IMAGE],
}

describe('create-invite catalog', () => {
  it('resolves known template slugs and returns null for unknown slugs', () => {
    expect(resolveTemplateBySlug('azul', FIXTURE_CATALOG)?.name).toBe('Azul')
    expect(resolveTemplateBySlug('romantic', FIXTURE_CATALOG)?.slug).toBe('romantic')
    expect(resolveTemplateBySlug('invalid', FIXTURE_CATALOG)).toBeNull()
  })

  it('parses and formats Brazilian display prices', () => {
    expect(parseDisplayPrice('R$ 76,50')).toBeCloseTo(76.5)
    expect(formatDisplayPrice(86.4)).toBe('R$ 86,40')
  })

  it('calculates order total with and without planner add-on at extended price', () => {
    const withPlanner = calculateOrderTotal('R$ 76,50', true)
    expect(withPlanner.templatePrice).toBeCloseTo(76.5)
    expect(withPlanner.total).toBeCloseTo(76.5 + PLANNER_ADDON_PRICE)
    expect(withPlanner.formattedTotal).toBe('R$ 86,40')

    const withoutPlanner = calculateOrderTotal('R$ 76,50', false)
    expect(withoutPlanner.total).toBeCloseTo(76.5)
    expect(withoutPlanner.formattedTotal).toBe('R$ 76,50')
  })
})

describe('wizard config', () => {
  it.each(EXTENDED_TEMPLATE_SLUGS)('uses 4 romantic steps for extended slug %s', (slug) => {
    const template = { ...EXTENDED_TEMPLATE, slug, id: slug }
    const config = getWizardConfig(template)

    expect(config.stepCount).toBe(4)
    expect(config.steps.some((step) => step.kind === 'media')).toBe(true)
    expect(config.isFieldVisible(2, 'venueName')).toBe(true)
    expect(config.isFieldVisible(2, 'musicUrl')).toBe(true)
    expect(config.isFieldVisible(3, 'coupleStory')).toBe(true)
  })

  it('keeps 3 steps for legacy golden slug', () => {
    const golden = getWizardConfig(FIXTURE_CATALOG[4])
    expect(golden.stepCount).toBe(3)
    expect(golden.steps.some((step) => step.kind === 'media')).toBe(false)
    expect(golden.isFieldVisible(2, 'venueName')).toBe(false)
    expect(golden.isFieldVisible(2, 'musicUrl')).toBe(true)
  })

  it('uses 4 steps for garden and romantic legacy slugs', () => {
    expect(getWizardConfig(FIXTURE_CATALOG[2]).stepCount).toBe(4)
    expect(getWizardConfig(FIXTURE_CATALOG[3]).stepCount).toBe(4)
  })
})

describe('create-invite steps', () => {
  it('defaults invalid or missing step params to step 1 and clamps out-of-range values', () => {
    expect(parseStep(undefined, 3)).toBe(1)
    expect(parseStep('', 3)).toBe(1)
    expect(parseStep('abc', 3)).toBe(1)
    expect(parseStep('0', 3)).toBe(1)
    expect(parseStep('4', 3)).toBe(3)
    expect(parseStep('5', 4)).toBe(4)
    expect(parseStep('2', 3)).toBe(2)
  })

  it('builds step hrefs with slug and step query param', () => {
    expect(buildStepHref('azul', 1)).toBe('/criar/azul?step=1')
    expect(buildStepHref('dourado', 4)).toBe('/criar/dourado?step=4')
  })
})

describe('create-invite schemas', () => {
  it('accepts valid couple step values and rejects invalid date or time format', () => {
    expect(
      coupleStepSchema.safeParse({
        brideName: 'Bárbara',
        groomName: 'Rennan',
        weddingDate: '13/10/2026',
        weddingTime: '18:30',
      }).success,
    ).toBe(true)

    expect(
      coupleStepSchema.safeParse({
        brideName: 'B',
        groomName: 'Rennan',
        weddingDate: '13/10/2026',
        weddingTime: '18:30',
      }).success,
    ).toBe(false)

    expect(
      coupleStepSchema.safeParse({
        brideName: 'Bárbara',
        groomName: 'Rennan',
        weddingDate: '2026-10-13',
        weddingTime: '18:30',
      }).success,
    ).toBe(false)

    expect(
      coupleStepSchema.safeParse({
        brideName: 'Bárbara',
        groomName: 'Rennan',
        weddingDate: '13/10/2026',
        weddingTime: '25:00',
      }).success,
    ).toBe(false)
  })

  it('requires venueName on extended dourado ceremony schema', () => {
    const douradoSchema = createInviteSchemaForTemplate('dourado')

    expect(
      douradoSchema.safeParse({
        ...VALID_BASE,
        venueName: '',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: VALID_ROMANTIC_MEDIA,
      }).success,
    ).toBe(false)

    expect(
      douradoSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: VALID_ROMANTIC_MEDIA,
      }).success,
    ).toBe(true)
  })

  it('requires venueName on garden ceremony schema but not on legacy golden', () => {
    const goldenSchema = createInviteSchemaForTemplate('golden')
    const gardenSchema = createInviteSchemaForTemplate('garden')

    expect(
      goldenSchema.safeParse({
        ...VALID_BASE,
      }).success,
    ).toBe(true)

    expect(
      gardenSchema.safeParse({
        ...VALID_BASE,
        venueName: '',
        welcomeMessage: '',
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      }).success,
    ).toBe(false)

    expect(
      gardenSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Jardim Botânico',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      }).success,
    ).toBe(true)
  })

  it('requires hero and gallery for extended azul media step', () => {
    const azulSchema = createInviteSchemaForTemplate('azul')

    expect(
      azulSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      }).success,
    ).toBe(false)

    expect(
      azulSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: { hero: SAMPLE_IMAGE, gallery: [SAMPLE_IMAGE] },
      }).success,
    ).toBe(true)
  })

  it('accepts valid payment step values and rejects malformed CPF', () => {
    expect(
      paymentStepSchema.safeParse({
        email: 'casal@example.com',
        cpf: '123.456.789-00',
        includePlanner: true,
      }).success,
    ).toBe(true)

    expect(
      paymentStepSchema.safeParse({
        email: 'invalid-email',
        cpf: '123.456.789-00',
        includePlanner: false,
      }).success,
    ).toBe(false)
  })
})

describe('mapFormToApiPayload', () => {
  it('persists azul slug as template id and converts DD/MM/AAAA + HH:MM to ISO weddingDate', () => {
    const payload = mapFormToApiPayload(
      {
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados!',
        images: VALID_ROMANTIC_MEDIA,
      },
      EXTENDED_TEMPLATE,
    )

    expect(payload.template).toBe('azul')
    expect(payload.weddingDate).toBe('2026-10-13T18:30:00')
    expect(payload.weddingTime).toBe('18:30')
    expect(payload.isActive).toBe(false)
    expect(payload.venueName).toBe('Espaço Jardim')
  })

  it('persists dourado extended slug without mapping to golden', () => {
    const payload = mapFormToApiPayload(
      {
        ...VALID_BASE,
        venueName: 'Salão Nobre',
        welcomeMessage: 'Celebraremos juntos!',
        images: VALID_ROMANTIC_MEDIA,
      },
      DOURADO_EXTENDED,
    )

    expect(payload.template).toBe('dourado')
    expect(payload.venueName).toBe('Salão Nobre')
    expect(payload.welcomeMessage).toBe('Celebraremos juntos!')
  })

  it('persists includePlanner from payment step values', () => {
    const withPlanner = mapFormToApiPayload(
      { ...VALID_BASE, includePlanner: true },
      EXTENDED_TEMPLATE,
    )
    const withoutPlanner = mapFormToApiPayload(
      { ...VALID_BASE, includePlanner: false },
      EXTENDED_TEMPLATE,
    )

    expect(withPlanner.includePlanner).toBe(true)
    expect(withoutPlanner.includePlanner).toBe(false)
  })

  it('applies interactive defaults for legacy golden slug', () => {
    const payload = mapFormToApiPayload(VALID_BASE, FIXTURE_CATALOG[4])

    expect(payload.template).toBe('golden')
    expect(payload.venueName).toBe('Local da Cerimônia')
    expect(payload.welcomeMessage).toBe('Você está convidado para o nosso casamento!')
  })

  it('passes site template venue fields without interactive defaults', () => {
    const payload = mapFormToApiPayload(
      {
        ...VALID_BASE,
        venueName: 'Jardim Botânico',
        welcomeMessage: 'Celebraremos juntos!',
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      },
      FIXTURE_CATALOG[2],
    )

    expect(payload.template).toBe('garden')
    expect(payload.venueName).toBe('Jardim Botânico')
    expect(payload.welcomeMessage).toBe('Celebraremos juntos!')
    expect(payload.images?.hero).toEqual(SAMPLE_IMAGE)
  })
})

describe('create-invite masks', () => {
  it('formats wedding date as DD/MM/AAAA', () => {
    expect(maskWeddingDate('13102026')).toBe('13/10/2026')
    expect(maskWeddingDate('13/10/2026')).toBe('13/10/2026')
  })

  it('formats wedding time as HH:MM', () => {
    expect(maskWeddingTime('1830')).toBe('18:30')
    expect(maskWeddingTime('18:30')).toBe('18:30')
  })

  it('formats CPF as 000.000.000-00', () => {
    expect(maskCpf('12345678900')).toBe('123.456.789-00')
  })

  it('formats WhatsApp as (11) 99999-9999', () => {
    expect(maskWhatsApp('11999999999')).toBe('(11) 99999-9999')
  })
})

describe('create-invite copy helpers', () => {
  it('builds dynamic step eyebrow and form copy for varying totals', () => {
    expect(buildStepEyebrow(2, 4, '3 MINUTOS')).toBe('ETAPA 2 DE 4  ·  3 MINUTOS')
    expect(getFormCopy('payment', 3, 3).eyebrow).toBe('ETAPA 3 DE 3  ·  PAGAMENTO')
  })

  it('defines header metadata and navigation copy', () => {
    expect(CREATE_INVITE_HEADER.brandLabel).toBe('casarme')
    expect(CREATE_INVITE_ACTIONS.createInvite).toMatch(/convite/)
  })
})
