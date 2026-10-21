import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'

type SectionMarkerProps = {
  children: string
  theme: ExtendedInviteTheme
}

export function SectionMarker({ children, theme }: SectionMarkerProps) {
  return (
    <p
      className="text-[9px] tracking-[0.15px]"
      style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
    >
      {children}
    </p>
  )
}
