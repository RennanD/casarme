import { describe, expect, it } from 'vitest'

import {
  calculateOrderTotal,
  formatDisplayPrice,
  parseDisplayPrice,
  PLANNER_ADDON_PRICE,
  resolveTemplateBySlug,
  type CreateInviteTemplate,
} from './catalog'
import {
  CHANGE_TEMPLATE_HREF,
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

const FIXTURE_CATALOG: CreateInviteTemplate[] = [
  {
    slug: 'azul',
    id: 'blue',
    name: 'Azul',
    displayPrice: 'R$ 30,90',
    imagePath: '/images/thumbs/blue/01.png',
    productLine: 'interactive',
    plan: 'Premium',
  },
  {
    slug: 'dourado',
    id: 'golden',
    name: 'Dourado',
    displayPrice: 'R$ 25,90',
    imagePath: '/images/thumbs/golden/01.png',
    productLine: 'interactive',
    plan: 'Premium',
  },
  {
    slug: 'garden',
    id: 'garden',
    name: 'Verde Oliva',
    displayPrice: 'R$ 26,90',
    imagePath: '/images/thumbs/garden/01.png',
    productLine: 'site',
    plan: 'Básico',
  },
  {
    slug: 'romantic',
    id: 'romantic',
    name: 'Romântico',
    displayPrice: 'R$ 37,90',
    imagePath: '/images/thumbs/romantico/01.png',
    productLine: 'site',
    plan: 'Pro',
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

describe('create-invite catalog', () => {
  it('resolves known template slugs and returns null for unknown slugs', () => {
    expect(resolveTemplateBySlug('azul', FIXTURE_CATALOG)?.name).toBe('Azul')
    expect(resolveTemplateBySlug('romantic', FIXTURE_CATALOG)?.slug).toBe('romantic')
    expect(resolveTemplateBySlug('invalid', FIXTURE_CATALOG)).toBeNull()
  })

  it('parses and formats Brazilian display prices', () => {
    expect(parseDisplayPrice('R$ 30,90')).toBeCloseTo(30.9)
    expect(formatDisplayPrice(40.8)).toBe('R$ 40,80')
  })

  it('calculates order total with and without planner add-on', () => {
    const withPlanner = calculateOrderTotal('R$ 30,90', true)
    expect(withPlanner.templatePrice).toBeCloseTo(30.9)
    expect(withPlanner.total).toBeCloseTo(30.9 + PLANNER_ADDON_PRICE)
    expect(withPlanner.formattedTotal).toBe('R$ 40,80')

    const withoutPlanner = calculateOrderTotal('R$ 30,90', false)
    expect(withoutPlanner.total).toBeCloseTo(30.9)
    expect(withoutPlanner.formattedTotal).toBe('R$ 30,90')
  })
})

describe('wizard config', () => {
  it('resolves 3 steps for Dourado and 4 steps for Azul, garden, and romantic', () => {
    expect(getWizardConfig(FIXTURE_CATALOG[1]).stepCount).toBe(3)
    expect(getWizardConfig(FIXTURE_CATALOG[0]).stepCount).toBe(4)
    expect(getWizardConfig(FIXTURE_CATALOG[2]).stepCount).toBe(4)
    expect(getWizardConfig(FIXTURE_CATALOG[3]).stepCount).toBe(4)
  })

  it('does not require venueName on golden ceremony step but requires it on garden', () => {
    const golden = getWizardConfig(FIXTURE_CATALOG[1])
    const garden = getWizardConfig(FIXTURE_CATALOG[2])

    expect(golden.isFieldVisible(2, 'venueName')).toBe(false)
    expect(golden.isFieldVisible(2, 'musicUrl')).toBe(true)
    expect(garden.isFieldVisible(2, 'venueName')).toBe(true)
    expect(garden.isFieldVisible(2, 'musicUrl')).toBe(false)
  })

  it('includes a media step only for four-step templates', () => {
    expect(getWizardConfig(FIXTURE_CATALOG[1]).steps.some((step) => step.kind === 'media')).toBe(
      false,
    )
    expect(getWizardConfig(FIXTURE_CATALOG[0]).steps.some((step) => step.kind === 'media')).toBe(
      true,
    )
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
    expect(buildStepHref('azul', 1)).toBe('/v2/criar/azul?step=1')
    expect(buildStepHref('dourado', 3)).toBe('/v2/criar/dourado?step=3')
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

  it('requires venueName on garden ceremony schema but not on dourado', () => {
    const douradoSchema = createInviteSchemaForTemplate('dourado')
    const gardenSchema = createInviteSchemaForTemplate('garden')

    expect(
      douradoSchema.safeParse({
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

  it('requires hero, groom, bride, and gallery for romantic media step', () => {
    const romanticSchema = createInviteSchemaForTemplate('romantic')

    expect(
      romanticSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      }).success,
    ).toBe(false)

    expect(
      romanticSchema.safeParse({
        ...VALID_BASE,
        venueName: 'Espaço Jardim',
        welcomeMessage: 'Vocês estão convidados para o nosso casamento!',
        images: {
          hero: SAMPLE_IMAGE,
          groom: SAMPLE_IMAGE,
          bride: SAMPLE_IMAGE,
          gallery: [SAMPLE_IMAGE],
        },
      }).success,
    ).toBe(true)
  })

  it('requires hero image for azul template', () => {
    const azulSchema = createInviteSchemaForTemplate('azul')

    expect(azulSchema.safeParse({ ...VALID_BASE }).success).toBe(false)
    expect(
      azulSchema.safeParse({
        ...VALID_BASE,
        images: { hero: SAMPLE_IMAGE, gallery: [] },
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
  it('maps azul slug to blue template id and converts DD/MM/AAAA + HH:MM to ISO weddingDate', () => {
    const payload = mapFormToApiPayload(
      {
        ...VALID_BASE,
        images: { hero: SAMPLE_IMAGE, gallery: [] },
      },
      FIXTURE_CATALOG[0],
    )

    expect(payload.template).toBe('blue')
    expect(payload.weddingDate).toBe('2026-10-13T18:30:00')
    expect(payload.weddingTime).toBe('18:30')
    expect(payload.isActive).toBe(false)
  })

  it('applies interactive defaults for venueName and welcomeMessage on Dourado', () => {
    const payload = mapFormToApiPayload(VALID_BASE, FIXTURE_CATALOG[1])

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
    expect(CHANGE_TEMPLATE_HREF).toBe('/v2#templates')
  })
})
