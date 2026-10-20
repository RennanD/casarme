import { describe, expect, it } from 'vitest'

import {
  CATEGORY_LABELS,
  EXTENDED_TEMPLATE_FEATURES,
  EXTENDED_TEMPLATE_SLUGS,
  filterCatalogByCategory,
  filterCatalogByCategoryAndTheme,
  filterCatalogByTheme,
  getTemplateCreateHref,
  getTemplateDemoHref,
  HOME_CATALOG,
  PRODUCT_LINE_LABELS,
  resolveCatalogById,
  resolveCatalogBySlug,
  THEME_LABELS,
} from './catalog'

describe('shared catalog taxonomy', () => {
  it('defines five extended template slugs in catalog order', () => {
    expect(EXTENDED_TEMPLATE_SLUGS).toEqual([
      'verde-oliva',
      'rosa',
      'azul',
      'dourado',
      'terracota',
    ])
    expect(HOME_CATALOG.map((entry) => entry.slug)).toEqual(EXTENDED_TEMPLATE_SLUGS)
  })

  it('requires category, theme, and styleLabel on every home catalog entry', () => {
    for (const entry of HOME_CATALOG) {
      expect(entry.category).toBe('extended')
      expect(entry.theme.length).toBeGreaterThan(0)
      expect(entry.styleLabel.length).toBeGreaterThan(0)
    }
  })

  it('exposes readable labels for categories and themes', () => {
    expect(CATEGORY_LABELS.extended).toBe('Convite estendido')
    expect(CATEGORY_LABELS['cover-photo']).toBe('Convite com foto de capa')
    expect(CATEGORY_LABELS.simple).toBe('Convite simples')

    expect(THEME_LABELS['verde-oliva']).toBe('Verde oliva')
    expect(THEME_LABELS.rosa).toBe('Rosa')
    expect(THEME_LABELS.azul).toBe('Azul')
    expect(THEME_LABELS.dourado).toBe('Dourado')
    expect(THEME_LABELS.terracota).toBe('Terracota')
  })
})

describe('shared catalog entries', () => {
  it('contains exactly 5 extended templates, all Pro / R$ 76,50 / site', () => {
    expect(HOME_CATALOG).toHaveLength(5)

    for (const entry of HOME_CATALOG) {
      expect(entry).toMatchObject({
        plan: 'Pro',
        displayPrice: 'R$ 76,50',
        productLine: 'site',
        category: 'extended',
      })
    }
  })

  it('maps commercial names and style labels from the Pencil frames', () => {
    const bySlug = Object.fromEntries(HOME_CATALOG.map((entry) => [entry.slug, entry]))

    expect(bySlug['verde-oliva']).toMatchObject({
      name: 'Verde Oliva',
      styleLabel: 'CDI Minimalista',
      theme: 'verde-oliva',
      id: 'verde-oliva',
    })
    expect(bySlug.rosa).toMatchObject({
      name: 'Rosa Florido',
      styleLabel: 'Editorial Romântico',
      theme: 'rosa',
      id: 'rosa',
    })
    expect(bySlug.azul).toMatchObject({
      name: 'Azul',
      styleLabel: 'Porcelain Framed',
      theme: 'azul',
      id: 'azul',
    })
    expect(bySlug.dourado).toMatchObject({
      name: 'Dourado',
      styleLabel: 'Selo Clássico',
      theme: 'dourado',
      id: 'dourado',
    })
    expect(bySlug.terracota).toMatchObject({
      name: 'Terracota',
      styleLabel: 'Boho Botânico',
      theme: 'terracota',
      id: 'terracota',
    })
  })

  it('shares the romantic feature set across all extended templates', () => {
    for (const entry of HOME_CATALOG) {
      expect(entry.features).toEqual(EXTENDED_TEMPLATE_FEATURES)
      expect(entry.features.length).toBeGreaterThanOrEqual(8)
    }
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
    expect(getTemplateCreateHref('verde-oliva')).toBe('/criar/verde-oliva?step=1')
    expect(getTemplateDemoHref('rosa')).toBe('/demo/rosa')
  })
})

describe('shared catalog resolution', () => {
  it('resolves new extended slugs to entries where id matches slug', () => {
    expect(resolveCatalogBySlug('verde-oliva')?.id).toBe('verde-oliva')
    expect(resolveCatalogBySlug('rosa')?.id).toBe('rosa')
    expect(resolveCatalogBySlug('azul')?.id).toBe('azul')
    expect(resolveCatalogBySlug('dourado')?.id).toBe('dourado')
    expect(resolveCatalogBySlug('terracota')?.id).toBe('terracota')
  })

  it('resolves legacy template ids for existing invites', () => {
    expect(resolveCatalogById('blue')?.name).toBe('Azul')
    expect(resolveCatalogById('golden')?.name).toBe('Dourado')
    expect(resolveCatalogById('garden')?.name).toBe('Verde Oliva')
    expect(resolveCatalogById('romantic')?.name).toBe('Romântico')
  })

  it('resolves legacy slugs not present in the public home catalog', () => {
    expect(resolveCatalogBySlug('romantic')?.id).toBe('romantic')
    expect(resolveCatalogBySlug('garden')?.id).toBe('garden')
  })

  it('returns null for unknown slugs and ids', () => {
    expect(resolveCatalogBySlug('invalid')).toBeNull()
    expect(resolveCatalogById('invalid')).toBeNull()
  })

  it('prefers new extended entries over legacy when slug collides', () => {
    expect(resolveCatalogBySlug('azul')?.id).toBe('azul')
    expect(resolveCatalogBySlug('dourado')?.id).toBe('dourado')
    expect(resolveCatalogById('azul')?.plan).toBe('Pro')
    expect(resolveCatalogById('blue')?.plan).toBe('Premium')
  })
})

describe('shared catalog filters', () => {
  it('returns all extended templates when category is extended and theme is all', () => {
    const results = filterCatalogByCategoryAndTheme(HOME_CATALOG, 'extended', 'all')
    expect(results).toHaveLength(5)
    expect(results.map((entry) => entry.slug)).toEqual(EXTENDED_TEMPLATE_SLUGS)
  })

  it('returns only templates matching a specific theme', () => {
    expect(filterCatalogByTheme(HOME_CATALOG, 'rosa')).toHaveLength(1)
    expect(filterCatalogByTheme(HOME_CATALOG, 'rosa')[0]?.slug).toBe('rosa')
    expect(filterCatalogByTheme(HOME_CATALOG, 'all')).toHaveLength(5)
  })

  it('returns empty sets for categories without catalog entries', () => {
    expect(filterCatalogByCategory(HOME_CATALOG, 'cover-photo')).toEqual([])
    expect(filterCatalogByCategory(HOME_CATALOG, 'simple')).toEqual([])
    expect(
      filterCatalogByCategoryAndTheme(HOME_CATALOG, 'cover-photo', 'all'),
    ).toEqual([])
  })

  it('returns empty set when category and theme combination has no matches', () => {
    expect(
      filterCatalogByCategoryAndTheme(HOME_CATALOG, 'extended', 'rosa'),
    ).toHaveLength(1)
    expect(
      filterCatalogByCategoryAndTheme(HOME_CATALOG, 'cover-photo', 'rosa'),
    ).toEqual([])
  })
})
