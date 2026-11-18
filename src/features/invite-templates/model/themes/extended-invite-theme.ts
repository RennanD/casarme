export type ExtendedInviteTheme = {
  bg: string
  surface: string
  accent: string
  accentLight: string
  divider: string
  text: string
  textMuted: string
  fontDisplay: string
  fontSerif: string
  fontSans: string
  /** Dourado gold line / filete */
  line?: string
  /** Static copy for "Mensagem Convite" — not from wizard */
  inviteMessage: string
  /** Small label under couple names, e.g. "MINIMALISTA · CDI" */
  modelLabel?: string
  /** Footer closing line */
  footerMessage?: string
}

export type ExtendedThemeSlug =
  | 'verde-oliva'
  | 'rosa'
  | 'azul'
  | 'dourado'
  | 'terracota'
