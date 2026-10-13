import { describe, expect, it } from 'vitest'

import {
  calculateOrderTotal,
  formatDisplayPrice,
  parseDisplayPrice,
  PLANNER_ADDON_PRICE,
  resolveTemplateBySlug,
} from './catalog'
import {
  CHANGE_TEMPLATE_HREF,
  CREATE_INVITE_ACTIONS,
  CREATE_INVITE_FORM_COPY,
  CREATE_INVITE_HEADER,
  CREATE_INVITE_INTRO,
  PLANNER_ORDER_BUMP,
} from './copy'
import { maskCpf, maskWeddingDate, maskWhatsApp } from './masks'
import {
  ceremonyStepSchema,
  coupleStepSchema,
  paymentStepSchema,
} from './schemas'
import { buildStepHref, parseStep, STEP_FIELDS, WIZARD_STEPS } from './steps'

const FIXTURE_CATALOG = [
  {
    slug: 'azul',
    name: 'Azul',
    displayPrice: 'R$ 30,90',
    imagePath: '/images/thumbs/blue/01.png',
  },
  {
    slug: 'dourado',
    name: 'Dourado',
    displayPrice: 'R$ 25,90',
    imagePath: '/images/thumbs/golden/01.png',
  },
  {
    slug: 'garden',
    name: 'Verde Oliva',
    displayPrice: 'R$ 26,90',
    imagePath: '/images/thumbs/garden/01.png',
  },
  {
    slug: 'romantic',
    name: 'Romântico',
    displayPrice: 'R$ 37,90',
    imagePath: '/images/thumbs/romantico/01.png',
  },
] as const

describe('create-invite catalog', () => {
  it('resolves known template slugs and returns null for unknown slugs', () => {
    expect(resolveTemplateBySlug('azul', [...FIXTURE_CATALOG])?.name).toBe('Azul')
    expect(resolveTemplateBySlug('romantic', [...FIXTURE_CATALOG])?.slug).toBe('romantic')
    expect(resolveTemplateBySlug('invalid', [...FIXTURE_CATALOG])).toBeNull()
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

describe('create-invite steps', () => {
  it('defaults invalid or missing step params to step 1 and clamps out-of-range values', () => {
    expect(parseStep(undefined)).toBe(1)
    expect(parseStep('')).toBe(1)
    expect(parseStep('abc')).toBe(1)
    expect(parseStep('0')).toBe(1)
    expect(parseStep('4')).toBe(3)
    expect(parseStep('2')).toBe(2)
    expect(parseStep('3')).toBe(3)
  })

  it('defines three wizard steps with field groups per step', () => {
    expect(WIZARD_STEPS).toHaveLength(3)
    expect(STEP_FIELDS[1]).toEqual(['brideName', 'groomName', 'weddingDate'])
    expect(STEP_FIELDS[2]).toEqual(['venueAddress', 'whatsapp', 'musicUrl'])
    expect(STEP_FIELDS[3]).toEqual(['email', 'cpf', 'includePlanner'])
  })

  it('builds step hrefs with slug and step query param', () => {
    expect(buildStepHref('azul', 1)).toBe('/v2/criar/azul?step=1')
    expect(buildStepHref('dourado', 3)).toBe('/v2/criar/dourado?step=3')
  })
})

describe('create-invite schemas', () => {
  it('accepts valid couple step values and rejects invalid date format', () => {
    expect(
      coupleStepSchema.safeParse({
        brideName: 'Bárbara',
        groomName: 'Rennan',
        weddingDate: '13/10/2026',
      }).success,
    ).toBe(true)

    expect(
      coupleStepSchema.safeParse({
        brideName: 'B',
        groomName: 'Rennan',
        weddingDate: '13/10/2026',
      }).success,
    ).toBe(false)

    expect(
      coupleStepSchema.safeParse({
        brideName: 'Bárbara',
        groomName: 'Rennan',
        weddingDate: '2026-10-13',
      }).success,
    ).toBe(false)
  })

  it('accepts valid ceremony step values and optional empty music URL', () => {
    expect(
      ceremonyStepSchema.safeParse({
        venueAddress: 'Rua das Flores, 123, Centro, São Paulo — SP',
        whatsapp: '(11) 99999-9999',
        musicUrl: '',
      }).success,
    ).toBe(true)

    expect(
      ceremonyStepSchema.safeParse({
        venueAddress: 'Curta',
        whatsapp: '(11) 99999-9999',
        musicUrl: '',
      }).success,
    ).toBe(false)

    expect(
      ceremonyStepSchema.safeParse({
        venueAddress: 'Rua das Flores, 123, Centro, São Paulo — SP',
        whatsapp: '(11) 99999-9999',
        musicUrl: 'not-a-url',
      }).success,
    ).toBe(false)

    expect(
      ceremonyStepSchema.safeParse({
        venueAddress: 'Rua das Flores, 123, Centro, São Paulo — SP',
        whatsapp: '(11) 99999-9999',
        musicUrl: 'https://youtu.be/example',
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

    expect(
      paymentStepSchema.safeParse({
        email: 'casal@example.com',
        cpf: '12345678900',
        includePlanner: true,
      }).success,
    ).toBe(false)
  })
})

describe('create-invite masks', () => {
  it('formats wedding date as DD/MM/AAAA', () => {
    expect(maskWeddingDate('13102026')).toBe('13/10/2026')
    expect(maskWeddingDate('13/10/2026')).toBe('13/10/2026')
  })

  it('formats CPF as 000.000.000-00', () => {
    expect(maskCpf('12345678900')).toBe('123.456.789-00')
  })

  it('formats WhatsApp as (11) 99999-9999', () => {
    expect(maskWhatsApp('11999999999')).toBe('(11) 99999-9999')
  })
})

describe('create-invite copy constants', () => {
  it('defines header, intro, and form metadata for all three steps', () => {
    expect(CREATE_INVITE_HEADER.brandLabel).toBe('casarme')
    expect(CREATE_INVITE_HEADER.draftStatus.length).toBeGreaterThan(0)

    for (const step of [1, 2, 3] as const) {
      expect(CREATE_INVITE_INTRO[step].title.length).toBeGreaterThan(0)
      expect(CREATE_INVITE_INTRO[step].description.length).toBeGreaterThan(0)
      expect(CREATE_INVITE_FORM_COPY[step].title.length).toBeGreaterThan(0)
    }
  })

  it('defines planner order bump and navigation copy', () => {
    expect(PLANNER_ORDER_BUMP.title).toBe('Planner de casamento')
    expect(CREATE_INVITE_ACTIONS.generatePix).toMatch(/PIX/)
    expect(CHANGE_TEMPLATE_HREF).toBe('/v2#templates')
  })
})
