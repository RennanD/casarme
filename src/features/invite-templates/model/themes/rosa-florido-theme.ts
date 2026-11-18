import type { ExtendedInviteTheme } from './extended-invite-theme'

export const ROSA_FLORIDO_THEME: ExtendedInviteTheme = {
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
  inviteMessage:
    'É com imensa alegria que convidamos você para celebrar conosco este momento único.',
  footerMessage: 'Esperamos contar com sua presença neste dia tão especial.',
} as const

export type RosaFloridoTheme = typeof ROSA_FLORIDO_THEME
