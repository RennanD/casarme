export const ROSA_FLORIDO_THEME = {
  bg: '#FFFCFA',
  surface: '#FFFFFF',
  accent: '#C8898E',
  accentLight: '#EDCDD0',
  divider: '#E8D8DA',
  text: '#3A2E2E',
  textMuted: '#7A6568',
  fontDisplay: 'var(--font-parisienne), cursive',
  fontSerif: 'var(--font-cormorant), Georgia, serif',
  fontSans: 'var(--font-lato), system-ui, sans-serif',
} as const

export type RosaFloridoTheme = typeof ROSA_FLORIDO_THEME
