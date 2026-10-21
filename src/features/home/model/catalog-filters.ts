import type {
  CatalogCategory,
  CatalogTemplate,
  CatalogTheme,
} from '@/src/shared/catalog'

export type CatalogThemeFilter = CatalogTheme | 'all'

export function filterHomeCatalog(
  catalog: readonly CatalogTemplate[],
  category: CatalogCategory,
  theme: CatalogThemeFilter,
): CatalogTemplate[] {
  const byCategory = catalog.filter((entry) => entry.category === category)

  if (theme === 'all') {
    return [...byCategory]
  }

  return byCategory.filter((entry) => entry.theme === theme)
}

export function hasCatalogEntriesForCategory(
  catalog: readonly CatalogTemplate[],
  category: CatalogCategory,
): boolean {
  return catalog.some((entry) => entry.category === category)
}

export function isCategoryComingSoon(
  catalog: readonly CatalogTemplate[],
  category: CatalogCategory,
): boolean {
  return !hasCatalogEntriesForCategory(catalog, category)
}
