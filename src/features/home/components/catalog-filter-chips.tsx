'use client'

import { type KeyboardEvent } from 'react'

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
  tabIndex: number
  onSelect: () => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
}

function FilterChip({
  label,
  selected,
  disabled = false,
  suffix,
  tabIndex,
  onSelect,
  onKeyDown,
}: FilterChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:enabled:active:scale-[0.96]',
        selected
          ? 'border-transparent bg-primary text-primary-foreground shadow-xs'
          : 'border-border/60 bg-card text-foreground hover:bg-accent/60',
      )}
    >
      <span>{label}</span>
      {suffix && (
        <span className="text-[0.65rem] font-normal tracking-wide text-muted-foreground uppercase">
          {suffix}
        </span>
      )}
    </button>
  )
}

function getNextRadioValue<T extends string>(
  values: readonly T[],
  current: T,
  direction: 1 | -1,
  isDisabled?: (value: T) => boolean,
): T | undefined {
  const enabled = values.filter((value) => !isDisabled?.(value))
  const currentIndex = enabled.indexOf(current)

  if (currentIndex === -1 || enabled.length === 0) {
    return undefined
  }

  const nextIndex = (currentIndex + direction + enabled.length) % enabled.length
  return enabled[nextIndex]
}

function createRadioKeyDownHandler<T extends string>(
  values: readonly T[],
  current: T,
  onChange: (value: T) => void,
  isDisabled?: (value: T) => boolean,
) {
  return (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      const next = getNextRadioValue(values, current, 1, isDisabled)
      if (next) onChange(next)
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      const next = getNextRadioValue(values, current, -1, isDisabled)
      if (next) onChange(next)
    }
  }
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
  const chipLayoutClass = layout === 'sidebar' ? 'flex flex-wrap gap-2' : 'flex flex-wrap gap-2'

  return (
    <div role="radiogroup" aria-label="Filtrar por categoria" className={chipLayoutClass}>
      {CATALOG_CATEGORY_ORDER.map((category) => {
        const comingSoon = isComingSoon(category)

        return (
          <FilterChip
            key={category}
            label={CATEGORY_LABELS[category]}
            selected={selectedCategory === category}
            disabled={comingSoon}
            suffix={comingSoon ? 'Em breve' : undefined}
            tabIndex={selectedCategory === category ? 0 : -1}
            onSelect={() => onCategoryChange(category)}
            onKeyDown={createRadioKeyDownHandler(
              CATALOG_CATEGORY_ORDER,
              selectedCategory,
              onCategoryChange,
              isComingSoon,
            )}
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
  const themeValues: CatalogThemeFilter[] = ['all', ...themes]
  const chipLayoutClass = layout === 'sidebar' ? 'flex flex-wrap gap-2' : 'flex flex-wrap gap-2'

  return (
    <div
      role="radiogroup"
      aria-label="Filtrar por tema"
      className={cn(chipLayoutClass, disabled && 'pointer-events-none opacity-50')}
    >
      <FilterChip
        label="Todos"
        selected={selectedTheme === 'all'}
        disabled={disabled}
        tabIndex={selectedTheme === 'all' ? 0 : -1}
        onSelect={() => onThemeChange('all')}
        onKeyDown={createRadioKeyDownHandler(themeValues, selectedTheme, onThemeChange)}
      />
      {themes.map((theme) => (
        <FilterChip
          key={theme}
          label={THEME_LABELS[theme]}
          selected={selectedTheme === theme}
          disabled={disabled}
          tabIndex={selectedTheme === theme ? 0 : -1}
          onSelect={() => onThemeChange(theme)}
          onKeyDown={createRadioKeyDownHandler(themeValues, selectedTheme, onThemeChange)}
        />
      ))}
    </div>
  )
}