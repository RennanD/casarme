import { describe, expect, it } from 'vitest'

import { HOME_ANCHORS, NAVBAR_ANCHOR_TARGETS } from './anchors'
import {
  getTemplateCreateHref,
  getTemplateDemoHref,
  HOME_CATALOG,
  PRODUCT_LINE_LABELS,
} from './catalog'
import {
  HOME_BENEFITS,
  HOME_BENEFIT_STRIP,
  HOME_BENTO_FEATURES,
  HOME_FAQ,
  HOME_FINAL_CTA,
  HOME_FOOTER,
  HOME_HERO,
  HOME_HERO_COLLAGE,
  HOME_HOW_IT_WORKS_SECTION,
  HOME_HOW_IT_WORKS_STEPS,
  HOME_OBJECTION_SECTION,
  HOME_OBJECTIONS,
  HOME_TEMPLATE_SECTION,
  HOME_TESTIMONIALS,
  HOME_TESTIMONIALS_SECTION,
  HOME_WHATSAPP_SECTION,
  HOME_WHY_CHOOSE_SECTION,
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
      displayPrice: 'R$ 58,90',
      productLine: 'site',
    })
    expect(byName.Romântico).toMatchObject({
      plan: 'Pro',
      displayPrice: 'R$ 76,50',
      productLine: 'site',
    })
  })

  it('orders templates romantic, garden, blue, golden', () => {
    expect(HOME_CATALOG.map((entry) => entry.id)).toEqual([
      'romantic',
      'garden',
      'blue',
      'golden',
    ])
  })

  it('requires non-empty id, slug, imagePath, description, and features on each entry', () => {
    for (const entry of HOME_CATALOG) {
      expect(entry.id.length).toBeGreaterThan(0)
      expect(entry.slug.length).toBeGreaterThan(0)
      expect(entry.imagePath.length).toBeGreaterThan(0)
      expect(entry.description.length).toBeGreaterThan(0)
      expect(entry.features.length).toBeGreaterThanOrEqual(4)
    }
  })

  it('labels both product lines for grouped display', () => {
    expect(PRODUCT_LINE_LABELS.interactive).toBe('Convites Digitais Interativos')
    expect(PRODUCT_LINE_LABELS.site).toBe('Convites no Modelo de Site')
  })

  it('builds demo and create hrefs from template slug', () => {
    expect(getTemplateDemoHref('azul')).toBe('/demo/azul')
    expect(getTemplateCreateHref('dourado')).toBe('/criar/dourado?step=1')
    expect(getTemplateCreateHref('garden')).toBe('/criar/garden?step=1')
    expect(getTemplateDemoHref('romantic')).toBe('/demo/romantic')
  })
})

describe('home section order', () => {
  it('matches the agreed top-to-bottom composition including reserved slots', () => {
    expect([...HOME_SECTION_ORDER]).toEqual([
      'navbar',
      'hero',
      'how-it-works',
      'templates',
      'before-celebration',
      'product-demo',
      'feature-bento',
      'guest-experience',
      'permanent-purchase',
      'faq',
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
      demo: HOME_ANCHORS.demo,
      faq: HOME_ANCHORS.faq,
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
  it('includes the editorial headline, eyebrow, and CTA from the desktop design', () => {
    expect(HOME_HERO.eyebrow).toBe('CONVITES DIGITAIS DE CASAMENTO')
    expect(HOME_HERO.headline).toMatch(/história merece um convite à altura/)
    expect(HOME_HERO.body).toMatch(/Escolham um modelo/)
    expect(HOME_HERO.ctaLabel).toBe('Criar meu convite  →')
  })

  it('defines 2 desktop collage images with meaningful alt text', () => {
    expect(HOME_HERO_COLLAGE).toHaveLength(2)

    for (const image of HOME_HERO_COLLAGE) {
      expect(image.src.length).toBeGreaterThan(0)
      expect(image.alt.length).toBeGreaterThan(0)
    }
  })
})

describe('home navbar links', () => {
  it('maps desktop navigation links to anchor registry ids', () => {
    expect(NAV_SECTION_LINKS).toHaveLength(3)
    expect(NAV_SECTION_LINKS.map((link) => link.anchorId)).toEqual([
      HOME_ANCHORS.templates,
      HOME_ANCHORS.howItWorks,
      HOME_ANCHORS.faq,
    ])
  })
})

describe('home section titles and funnel copy', () => {
  it('defines template section title and subtitle', () => {
    expect(HOME_TEMPLATE_SECTION.title.length).toBeGreaterThan(0)
    expect(HOME_TEMPLATE_SECTION.subtitle.length).toBeGreaterThan(0)
  })

  it('defines whatsapp section with 3 benefits and aligned CTAs', () => {
    expect(HOME_WHATSAPP_SECTION.title.length).toBeGreaterThan(0)
    expect(HOME_WHATSAPP_SECTION.painBody.length).toBeGreaterThan(0)
    expect(HOME_WHATSAPP_SECTION.benefits).toHaveLength(3)
    expect(HOME_WHATSAPP_SECTION.secondaryCtaLabel).toBe(HOME_HERO.ctaLabel)
    expect(HOME_WHATSAPP_SECTION.imagePath.length).toBeGreaterThan(0)
  })

  it('defines why-choose and testimonials section titles', () => {
    expect(HOME_WHY_CHOOSE_SECTION.title.length).toBeGreaterThan(0)
    expect(HOME_TESTIMONIALS_SECTION.title.length).toBeGreaterThan(0)
  })

  it('defines final CTA aligned with hero CTA label', () => {
    expect(HOME_FINAL_CTA.title.length).toBeGreaterThan(0)
    expect(HOME_FINAL_CTA.ctaLabel.length).toBeGreaterThan(0)
  })

  it('defines footer brand and copyright', () => {
    expect(HOME_FOOTER.brandName).toBe('CasarMe')
    expect(HOME_FOOTER.copyright.length).toBeGreaterThan(0)
  })
})

describe('desktop Home Redesigned feature content', () => {
  it('defines four Bento features, two shared benefits, and four FAQ entries', () => {
    expect(HOME_BENTO_FEATURES).toHaveLength(4)
    expect(HOME_BENEFIT_STRIP).toHaveLength(2)
    expect(HOME_FAQ).toHaveLength(5)
  })
})
