import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import {
  formatWeddingTime,
  parseWeddingDateParts,
} from '../../../model/wedding-date'

type ExtendedEditorialDateSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  weddingDate: string
  weddingTime: string
}

export function ExtendedEditorialDateSection({
  theme,
  variant,
  weddingDate,
  weddingTime,
}: ExtendedEditorialDateSectionProps) {
  const dateParts = parseWeddingDateParts(weddingDate)
  if (!dateParts) return null

  if (variant === 'verde-oliva') {
    return (
      <section className="flex flex-row items-center px-5 py-7">
        <div className="flex w-[120px] shrink-0 flex-col items-end gap-1 pr-3">
          <span className="text-base capitalize" style={{ fontFamily: theme.fontSerif }}>
            {dateParts.month}
          </span>
          <span className="text-sm" style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}>
            {dateParts.year}
          </span>
          <span className="text-[10px]" style={{ color: theme.textMuted, fontFamily: theme.fontSans }}>
            {formatWeddingTime(weddingTime) || 'Horário'}
          </span>
        </div>
        <div className="h-20 w-px shrink-0" style={{ backgroundColor: `${theme.accent}33` }} />
        <div className="flex flex-1 flex-col items-center gap-1 pl-3">
          <span
            className="text-[64px] leading-none"
            style={{ color: theme.accent, fontFamily: theme.fontSerif }}
          >
            {dateParts.day}
          </span>
          <span
            className="text-[10px] capitalize tracking-[0.1px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
          >
            {dateParts.weekday}
          </span>
        </div>
      </section>
    )
  }

  return (
    <section
      className="flex flex-col items-center px-7 py-8"
      style={{ backgroundColor: variant === 'rosa' ? theme.surface : theme.surface }}
    >
      <div className="flex items-end justify-center gap-3">
        <span
          className="text-[13px] capitalize tracking-[0.15px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
        >
          {dateParts.month}
        </span>
        <span
          className="text-[72px] leading-[61px]"
          style={{ color: theme.accent, fontFamily: theme.fontSerif }}
        >
          {dateParts.day}
        </span>
        <span
          className="text-[13px] tracking-[0.15px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
        >
          {dateParts.year}
        </span>
      </div>
      <p
        className="mt-2 text-[10px] capitalize"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        {dateParts.weekday} · {formatWeddingTime(weddingTime) || 'Horário'}
      </p>
    </section>
  )
}
