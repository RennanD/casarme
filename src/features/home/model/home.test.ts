import { describe, expect, it } from 'vitest'

import { HOME_ANCHORS, NAVBAR_ANCHOR_TARGETS } from './anchors'
import { HOME_CATALOG, PRODUCT_LINE_LABELS } from './catalog'
import {
  HOME_BENEFITS,
  HOME_HOW_IT_WORKS_STEPS,
  HOME_OBJECTIONS,
  HOME_TESTIMONIALS,
} from './copy'
import { HOME_SECTION_ORDER } from './sections'

describe('home catalog', () => {
  it('contains exactly 4 templates with expected names, prices, plans, and product lines', () => {
    expect(HOME_CATALOG).toHaveLength(4)

    const byName = Object.fromEntries(HOME_CATALOG.map((entry) => [entry.name, entry]))

    expect(byName.Dourado).toMatchObject({
      plan: 'Premium',
      displayPrice: 'R$ 25,90',
      productLine: 'interactive',
    })
    expect(byName.Azul).toMatchObject({
      plan: 'Premium',
      displayPrice: 'R$ 30,90',
      productLine: 'interactive',
    })
    expect(byName['Verde Oliva']).toMatchObject({
      plan: 'Básico',
      displayPrice: 'R$ 26,90',
      productLine: 'site',
    })
    expect(byName.Romântico).toMatchObject({
      plan: 'Pro',
      displayPrice: 'R$ 37,90',
      productLine: 'site',
    })
  })

  it('requires non-empty id, slug, imagePath, and description on each entry', () => {
    for (const entry of HOME_CATALOG) {
      expect(entry.id.length).toBeGreaterThan(0)
      expect(entry.slug.length).toBeGreaterThan(0)
      expect(entry.imagePath.length).toBeGreaterThan(0)
      expect(entry.description.length).toBeGreaterThan(0)
    }
  })

  it('labels both product lines for grouped display', () => {
    expect(PRODUCT_LINE_LABELS.interactive).toBe('Convites Digitais Interativos')
    expect(PRODUCT_LINE_LABELS.site).toBe('Convites no Modelo de Site')
  })
})

describe('home section order', () => {
  it('matches the agreed top-to-bottom composition including reserved slots', () => {
    expect([...HOME_SECTION_ORDER]).toEqual([
      'navbar',
      'hero',
      'category-nav',
      'templates',
      'objection-breaker',
      'how-it-works',
      'whatsapp-spotlight',
      'why-choose',
      'testimonials',
      'final-cta',
      'footer',
    ])
  })
})

describe('home anchor registry', () => {
  it('matches navbar link targets', () => {
    expect(NAVBAR_ANCHOR_TARGETS).toEqual({
      home: HOME_ANCHORS.home,
      howItWorks: HOME_ANCHORS.howItWorks,
      templates: HOME_ANCHORS.templates,
      whyChoose: HOME_ANCHORS.whyChoose,
      navigation: HOME_ANCHORS.navigation,
      mainContent: HOME_ANCHORS.mainContent,
    })
  })
})

describe('home copy arrays', () => {
  it('includes 4 objections, 3 steps, 4 benefits, and 3 testimonials', () => {
    expect(HOME_OBJECTIONS).toHaveLength(4)
    expect(HOME_HOW_IT_WORKS_STEPS).toHaveLength(3)
    expect(HOME_BENEFITS).toHaveLength(4)
    expect(HOME_TESTIMONIALS).toHaveLength(3)
  })
})
