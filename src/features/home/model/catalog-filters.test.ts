import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  EXTENDED_TEMPLATE_SLUGS,
  HOME_CATALOG,
  type CatalogCategory,
} from '@/src/shared/catalog'

import {
  filterHomeCatalog,
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
