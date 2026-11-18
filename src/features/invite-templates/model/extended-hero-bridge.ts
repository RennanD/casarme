import type { ExtendedInviteTheme, ExtendedThemeSlug } from './themes/extended-invite-theme'

export type HeroNamesBridge = {
  backgroundColor: string
  fadeHeightPx: number
  contentPaddingTopPx: number
  gradient: string
}

function rgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '')
  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getHeroNamesBridge(
  variant: ExtendedThemeSlug,
  theme: ExtendedInviteTheme,
): HeroNamesBridge {
  const backgroundColor = variant === 'verde-oliva' ? theme.bg : theme.surface

  const fadeHeightPx = variant === 'verde-oliva' ? 200 : 180

  const contentPaddingTopPx =
    variant === 'verde-oliva'
      ? 0
      : variant === 'terracota'
        ? 48
        : 40 // rosa, azul, dourado

  const gradient =
    variant === 'verde-oliva'
      ? `linear-gradient(180deg, ${rgba(backgroundColor, 0)} 0%, ${rgba(backgroundColor, 0.1)} 25%, ${rgba(backgroundColor, 0.33)} 50%, ${rgba(backgroundColor, 0.73)} 75%, ${rgba(backgroundColor, 0.95)} 92%, ${rgba(backgroundColor, 1)} 100%)`
      : variant === 'dourado'
        ? `linear-gradient(180deg, ${rgba(backgroundColor, 0)} 0%, ${rgba(backgroundColor, 0.87)} 80%, ${rgba(backgroundColor, 1)} 100%)`
        : variant === 'terracota'
          ? `linear-gradient(180deg, ${rgba(backgroundColor, 0)} 0%, ${rgba(backgroundColor, 0.8)} 75%, ${rgba(backgroundColor, 1)} 100%)`
          : `linear-gradient(180deg, ${rgba(backgroundColor, 0)} 0%, ${rgba(backgroundColor, 0.33)} 45%, ${rgba(backgroundColor, 0.93)} 85%, ${rgba(backgroundColor, 1)} 100%)`

  return {
    backgroundColor,
    fadeHeightPx,
    contentPaddingTopPx,
    gradient,
  }
}
