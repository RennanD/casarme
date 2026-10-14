import { describe, expect, it } from 'vitest'

import {
  getTemplateCreateHref,
  getTemplateDemoHref,
  HOME_CATALOG,
  PRODUCT_LINE_LABELS,
  resolveCatalogBySlug,
} from './catalog'

describe('shared catalog', () => {
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

  it('builds demo and create hrefs from template slug', () => {
    expect(getTemplateDemoHref('azul')).toBe('/demo/azul')
    expect(getTemplateCreateHref('dourado')).toBe('/criar/dourado?step=1')
    expect(getTemplateCreateHref('garden')).toBe('/criar/garden?step=1')
    expect(getTemplateDemoHref('romantic')).toBe('/demo/romantic')
  })

  it('resolves catalog entries by slug and returns null for unknown slugs', () => {
    expect(resolveCatalogBySlug('azul')?.id).toBe('blue')
    expect(resolveCatalogBySlug('invalid')).toBeNull()
  })
})
