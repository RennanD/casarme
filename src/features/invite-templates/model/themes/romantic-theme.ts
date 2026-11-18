export const ROMANTIC_THEME = {
  bg: '#FFF8F3',
  bgGradient: '#FFE8E8',
  accent: '#E8B4B8',
  accentHover: '#D89BA0',
  accentLight: '#F5D5D8',
  text: '#3E3E3E',
  textMuted: '#6B6B6B',
  fontSerif: 'Playfair Display',
} as const

export type RomanticTheme = typeof ROMANTIC_THEME
