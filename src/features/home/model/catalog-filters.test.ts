import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  EXTENDED_TEMPLATE_SLUGS,
  HOME_CATALOG,
  type CatalogCategory,
} from '@/src/shared/catalog'

import {
  CATALOG_CATEGORY_ORDER,
  filterHomeCatalog,
  formatCatalogResultsAnnouncement,
  getCatalogEmptyStateMessage,
  getThemesForCategory,
  hasCatalogEntriesForCategory,
  isCategoryComingSoon,
} from './catalog-filters'

describe('catalog-filters', () => {
  it('returns all extended templates when category is extended and theme is all', () => {
    const results = filterHomeCatalog(HOME_CATALOG, 'extended', 'all')

    expect(results).toHaveLength(5)
    expect(results.map((entry) => entry.slug)).toEqual(EXTENDED_TEMPLATE_SLUGS)
  })

  it('returns only templates matching a specific theme', () => {
    const results = filterHomeCatalog(HOME_CATALOG, 'extended', 'rosa')

    expect(results).toHaveLength(1)
    expect(results[0]?.slug).toBe('rosa')
    expect(results[0]?.theme).toBe('rosa')
  })

  it('returns empty sets for categories without catalog entries', () => {
    expect(filterHomeCatalog(HOME_CATALOG, 'cover-photo', 'all')).toEqual([])
    expect(filterHomeCatalog(HOME_CATALOG, 'simple', 'all')).toEqual([])
  })

  it('returns empty set when category and theme combination has no matches', () => {
    expect(filterHomeCatalog(HOME_CATALOG, 'cover-photo', 'rosa')).toEqual([])
    expect(filterHomeCatalog(HOME_CATALOG, 'simple', 'dourado')).toEqual([])
  })

  it('lists categories in display order with extended first', () => {
    expect(CATALOG_CATEGORY_ORDER).toEqual(['extended', 'cover-photo', 'simple'])
  })

  it('returns themes in catalog order for extended category', () => {
    expect(getThemesForCategory(HOME_CATALOG, 'extended')).toEqual([
      'verde-oliva',
      'rosa',
      'azul',
      'dourado',
      'terracota',
    ])
    expect(getThemesForCategory(HOME_CATALOG, 'cover-photo')).toEqual([])
  })

  it('formats accessible results announcements', () => {
    expect(formatCatalogResultsAnnouncement(0)).toBe(
      'Nenhum modelo encontrado para os filtros selecionados.',
    )
    expect(formatCatalogResultsAnnouncement(1)).toBe('1 modelo encontrado.')
    expect(formatCatalogResultsAnnouncement(5)).toBe('5 modelos encontrados.')
  })

  it('returns empty state messages for coming soon categories and theme mismatches', () => {
    expect(getCatalogEmptyStateMessage(HOME_CATALOG, 'cover-photo', 'all')).toBe(
      'Convite com foto de capa chegam em breve. Enquanto isso, explore os modelos estendidos.',
    )
    expect(getCatalogEmptyStateMessage(HOME_CATALOG, 'extended', 'all')).toBe(
      'Nenhum modelo encontrado para os filtros selecionados.',
    )
  })

  it('flags categories without entries as coming soon for UI', () => {
    const emptyCategories: CatalogCategory[] = ['cover-photo', 'simple']

    for (const category of emptyCategories) {
      expect(hasCatalogEntriesForCategory(HOME_CATALOG, category)).toBe(false)
      expect(isCategoryComingSoon(HOME_CATALOG, category)).toBe(true)
    }

    expect(hasCatalogEntriesForCategory(HOME_CATALOG, 'extended')).toBe(true)
    expect(isCategoryComingSoon(HOME_CATALOG, 'extended')).toBe(false)
  })
})

describe('catalog thumbnail assets', () => {
  it('exposes public thumbnail paths for each extended template slug', () => {
    for (const entry of HOME_CATALOG) {
      expect(entry.imagePath).toBe(`/images/thumbs/${entry.slug}/01.png`)
    }
  })

  it('has thumbnail files on disk for each extended template slug', () => {
    for (const slug of EXTENDED_TEMPLATE_SLUGS) {
      const filePath = join(process.cwd(), 'public', 'images', 'thumbs', slug, '01.png')
      expect(existsSync(filePath)).toBe(true)
    }
  })
})
