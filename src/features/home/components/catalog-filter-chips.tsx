'use client'

import {
  CATEGORY_LABELS,
  THEME_LABELS,
  type CatalogCategory,
  type CatalogTheme,
} from '@/src/features/home/model/catalog'
import {
  CATALOG_CATEGORY_ORDER,
  type CatalogThemeFilter,
} from '@/src/features/home/model/catalog-filters'
import { cn } from '@/src/shared/lib/cn'

type FilterChipProps = {
  label: string
  selected: boolean
  disabled?: boolean
  suffix?: string
  onSelect: () => void
}

function FilterChip({ label, selected, disabled = false, suffix, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:enabled:active:scale-[0.96]',
        selected
          ? 'border-transparent bg-primary text-primary-foreground shadow-xs'
          : 'border-border/60 bg-card text-foreground hover:bg-accent/60',
      )}
    >
      <span>{label}</span>
      {suffix && <span className="text-[0.65rem] font-normal tracking-wide text-muted-foreground uppercase">{suffix}</span>}
    </button>
  )
}

type CatalogCategoryFiltersProps = {
  selectedCategory: CatalogCategory
  isComingSoon: (category: CatalogCategory) => boolean
  onCategoryChange: (category: CatalogCategory) => void
  layout: 'sidebar' | 'row'
}

export function CatalogCategoryFilters({
  selectedCategory,
  isComingSoon,
  onCategoryChange,
  layout,
}: CatalogCategoryFiltersProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Filtrar por categoria"
      className={cn(
        layout === 'sidebar' ? 'flex flex-wrap gap-2' : 'flex flex-wrap gap-2',
      )}
    >
      {CATALOG_CATEGORY_ORDER.map((category) => {
        const comingSoon = isComingSoon(category)

        return (
          <FilterChip
            key={category}
            label={CATEGORY_LABELS[category]}
            selected={selectedCategory === category}
            disabled={comingSoon}
            suffix={comingSoon ? 'Em breve' : undefined}
            onSelect={() => onCategoryChange(category)}
          />
        )
      })}
    </div>
  )
}

type CatalogThemeFiltersProps = {
  themes: CatalogTheme[]
  selectedTheme: CatalogThemeFilter
  disabled?: boolean
  onThemeChange: (theme: CatalogThemeFilter) => void
  layout: 'sidebar' | 'row'
}

export function CatalogThemeFilters({
  themes,
  selectedTheme,
  disabled = false,
  onThemeChange,
  layout,
}: CatalogThemeFiltersProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Filtrar por tema"
      className={cn(
        layout === 'sidebar' ? 'flex flex-wrap gap-2' : 'flex flex-wrap gap-2',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      <FilterChip
        label="Todos"
        selected={selectedTheme === 'all'}
        disabled={disabled}
        onSelect={() => onThemeChange('all')}
      />
      {themes.map((theme) => (
        <FilterChip
          key={theme}
          label={THEME_LABELS[theme]}
          selected={selectedTheme === theme}
          disabled={disabled}
          onSelect={() => onThemeChange(theme)}
        />
      ))}
    </div>
  )
}
