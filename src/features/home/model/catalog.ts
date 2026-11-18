export {
  CATEGORY_LABELS,
  EXTENDED_TEMPLATE_FEATURES,
  EXTENDED_TEMPLATE_SLUGS,
  getCatalogByProductLine,
  getTemplateCreateHref,
  getTemplateDemoHref,
  HOME_CATALOG,
  PRODUCT_LINE_LABELS,
  resolveCatalogBySlug,
  THEME_LABELS,
} from '@/src/shared/catalog'
export {
  CATALOG_CATEGORY_ORDER,
  filterHomeCatalog,
  formatCatalogResultsAnnouncement,
  getCatalogEmptyStateMessage,
  getThemesForCategory,
  hasCatalogEntriesForCategory,
  isCategoryComingSoon,
} from './catalog-filters'
export type { CatalogThemeFilter } from './catalog-filters'
export type {
  CatalogCategory,
  CatalogTemplate,
  CatalogTheme,
  ExtendedTemplateSlug,
  PlanTier,
  ProductLine,
} from '@/src/shared/catalog'
