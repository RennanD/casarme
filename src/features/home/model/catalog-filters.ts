import {
  CATEGORY_LABELS,
  type CatalogCategory,
  type CatalogTemplate,
  type CatalogTheme,
} from '@/src/shared/catalog'

export type CatalogThemeFilter = CatalogTheme | 'all'

export const CATALOG_CATEGORY_ORDER: CatalogCategory[] = [
  'extended',
  'cover-photo',
  'simple',
]

const THEME_DISPLAY_ORDER: CatalogTheme[] = [
  'verde-oliva',
  'rosa',
  'azul',
  'dourado',
  'terracota',
]

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

export function getThemesForCategory(
  catalog: readonly CatalogTemplate[],
  category: CatalogCategory,
): CatalogTheme[] {
  const available = new Set<CatalogTheme>()

  for (const entry of catalog) {
    if (entry.category === category) {
      available.add(entry.theme)
    }
  }

  return THEME_DISPLAY_ORDER.filter((theme) => available.has(theme))
}

export function formatCatalogResultsAnnouncement(count: number): string {
  if (count === 0) {
    return 'Nenhum modelo encontrado para os filtros selecionados.'
  }

  if (count === 1) {
    return '1 modelo encontrado.'
  }

  return `${count} modelos encontrados.`
}

export function getCatalogEmptyStateMessage(
  catalog: readonly CatalogTemplate[],
  category: CatalogCategory,
  theme: CatalogThemeFilter,
): string {
  if (isCategoryComingSoon(catalog, category)) {
    return `${CATEGORY_LABELS[category]} chegam em breve. Enquanto isso, explore os modelos estendidos.`
  }

  if (theme !== 'all') {
    return 'Nenhum modelo corresponde a este tema. Tente outro filtro ou volte para Todos.'
  }

  return formatCatalogResultsAnnouncement(0)
}
