'use client'

import { useMemo, useState } from 'react'

import {
  HOME_CATALOG,
  type CatalogCategory,
  type CatalogTemplate,
} from '@/src/features/home/model/catalog'
import {
  filterHomeCatalog,
  formatCatalogResultsAnnouncement,
  getCatalogEmptyStateMessage,
  getThemesForCategory,
  isCategoryComingSoon,
  type CatalogThemeFilter,
} from '@/src/features/home/model/catalog-filters'
import { cn } from '@/src/shared/lib/cn'

import { CatalogCategoryFilters, CatalogThemeFilters } from './catalog-filter-chips'
import { TemplateCard } from './template-card'

type TemplateCatalogProps = {
  catalog?: readonly CatalogTemplate[]
}

function CatalogFiltersPanel({
  category,
  theme,
  themes,
  onCategoryChange,
  onThemeChange,
  layout,
}: {
  category: CatalogCategory
  theme: CatalogThemeFilter
  themes: ReturnType<typeof getThemesForCategory>
  onCategoryChange: (category: CatalogCategory) => void
  onThemeChange: (theme: CatalogThemeFilter) => void
  layout: 'sidebar' | 'row'
}) {
  const categoryComingSoon = isCategoryComingSoon(HOME_CATALOG, category)

  if (layout === 'sidebar') {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Categoria</p>
          <CatalogCategoryFilters
            selectedCategory={category}
            isComingSoon={(value) => isCategoryComingSoon(HOME_CATALOG, value)}
            onCategoryChange={onCategoryChange}
            layout="sidebar"
          />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Tema</p>
          <CatalogThemeFilters
            themes={themes}
            selectedTheme={theme}
            disabled={categoryComingSoon}
            onThemeChange={onThemeChange}
            layout="sidebar"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <CatalogCategoryFilters
        selectedCategory={category}
        isComingSoon={(value) => isCategoryComingSoon(HOME_CATALOG, value)}
        onCategoryChange={onCategoryChange}
        layout="row"
      />
      <CatalogThemeFilters
        themes={themes}
        selectedTheme={theme}
        disabled={categoryComingSoon}
        onThemeChange={onThemeChange}
        layout="row"
      />
    </div>
  )
}

export function TemplateCatalog({ catalog = HOME_CATALOG }: TemplateCatalogProps) {
  const [category, setCategory] = useState<CatalogCategory>('extended')
  const [theme, setTheme] = useState<CatalogThemeFilter>('all')

  const themes = useMemo(() => getThemesForCategory(catalog, category), [catalog, category])
  const results = useMemo(
    () => filterHomeCatalog(catalog, category, theme),
    [catalog, category, theme],
  )
  const resultsAnnouncement = formatCatalogResultsAnnouncement(results.length)
  const emptyMessage = getCatalogEmptyStateMessage(catalog, category, theme)

  function handleCategoryChange(nextCategory: CatalogCategory) {
    setCategory(nextCategory)
    setTheme('all')
  }

  return (
    <div className="space-y-6 lg:flex lg:items-start lg:gap-8 lg:space-y-0">
      <aside className="hidden lg:block lg:w-60 lg:shrink-0">
        <div className="sticky top-24">
          <CatalogFiltersPanel
            category={category}
            theme={theme}
            themes={themes}
            onCategoryChange={handleCategoryChange}
            onThemeChange={setTheme}
            layout="sidebar"
          />
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-6">
        <div className="lg:hidden">
          <CatalogFiltersPanel
            category={category}
            theme={theme}
            themes={themes}
            onCategoryChange={handleCategoryChange}
            onThemeChange={setTheme}
            layout="row"
          />
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {resultsAnnouncement}
        </p>

        {results.length > 0 ? (
          <ul
            className={cn(
              'grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3',
            )}
            aria-label={`${results.length} modelos disponíveis`}
          >
            {results.map((template) => (
              <li key={template.id} className="flex">
                <TemplateCard template={template} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="rounded-2xl border border-dashed border-border/70 bg-secondary/40 px-6 py-12 text-center"
            role="status"
          >
            <p className="font-serif text-lg text-foreground">Nenhum modelo por aqui</p>
            <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
