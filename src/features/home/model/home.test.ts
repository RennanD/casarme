import { describe, expect, it } from 'vitest'

import { HOME_ANCHORS, NAVBAR_ANCHOR_TARGETS } from './anchors'
import { HOME_CATALOG, PRODUCT_LINE_LABELS } from './catalog'
import {
  HOME_BENEFITS,
  HOME_HERO,
  HOME_HERO_COLLAGE,
  HOME_HOW_IT_WORKS_SECTION,
  HOME_HOW_IT_WORKS_STEPS,
  HOME_OBJECTION_SECTION,
  HOME_OBJECTIONS,
  HOME_TESTIMONIALS,
} from './copy'
import { NAV_SECTION_LINKS } from './navigation'
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

  it('requires non-empty problem and solution fields on each objection', () => {
    for (const objection of HOME_OBJECTIONS) {
      expect(objection.problem.length).toBeGreaterThan(0)
      expect(objection.problemDescription.length).toBeGreaterThan(0)
      expect(objection.solution.length).toBeGreaterThan(0)
    }
  })

  it('requires non-empty title and description on each how-it-works step', () => {
    for (const step of HOME_HOW_IT_WORKS_STEPS) {
      expect(step.title.length).toBeGreaterThan(0)
      expect(step.description.length).toBeGreaterThan(0)
    }
  })
})

describe('home funnel section copy', () => {
  it('defines objection section title and CTA aligned with hero', () => {
    expect(HOME_OBJECTION_SECTION.title.length).toBeGreaterThan(0)
    expect(HOME_OBJECTION_SECTION.solutionLabel.length).toBeGreaterThan(0)
    expect(HOME_OBJECTION_SECTION.ctaHeading.length).toBeGreaterThan(0)
    expect(HOME_OBJECTION_SECTION.ctaLabel).toBe(HOME_HERO.ctaLabel)
  })

  it('defines how-it-works section title and preview image', () => {
    expect(HOME_HOW_IT_WORKS_SECTION.title.length).toBeGreaterThan(0)
    expect(HOME_HOW_IT_WORKS_SECTION.imagePath.length).toBeGreaterThan(0)
    expect(HOME_HOW_IT_WORKS_SECTION.imageAlt.length).toBeGreaterThan(0)
  })
})

describe('home hero copy', () => {
  it('includes display/script headline parts and value-prop subcopy from v1', () => {
    expect(HOME_HERO.headlineLead).toBe('Seu Convite Digital')
    expect(HOME_HERO.scriptAccent).toBe('Interativo')
    expect(HOME_HERO.headlineTail).toMatch(/5 Minutos/)
    expect(HOME_HERO.subcopy).toMatch(/Canva/)
    expect(HOME_HERO.ctaLabel).toBe('Criar Meu Convite')
  })

  it('defines 3 collage images with meaningful alt text', () => {
    expect(HOME_HERO_COLLAGE).toHaveLength(3)

    for (const image of HOME_HERO_COLLAGE) {
      expect(image.src.length).toBeGreaterThan(0)
      expect(image.alt.length).toBeGreaterThan(0)
    }
  })
})

describe('home navbar links', () => {
  it('maps four section links to anchor registry ids', () => {
    expect(NAV_SECTION_LINKS).toHaveLength(4)
    expect(NAV_SECTION_LINKS.map((link) => link.anchorId)).toEqual([
      HOME_ANCHORS.home,
      HOME_ANCHORS.howItWorks,
      HOME_ANCHORS.templates,
      HOME_ANCHORS.whyChoose,
    ])
  })
})
