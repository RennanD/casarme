import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'

type ExtendedQuoteSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  welcomeMessage?: string
  groomName: string
  brideName: string
  /** Dourado renders quote inside gold frame section */
  framed?: boolean
}

const DEFAULT_QUOTE =
  'Por isso, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne.'

export function ExtendedQuoteSection({
  theme,
  variant,
  welcomeMessage,
  groomName,
  brideName,
  framed = false,
}: ExtendedQuoteSectionProps) {
  const quote = welcomeMessage || DEFAULT_QUOTE
  const groomInitial = groomName?.charAt(0)?.toUpperCase() ?? 'N'
  const brideInitial = brideName?.charAt(0)?.toUpperCase() ?? 'N'

  const quoteText = (
    <p
      className={
        variant === 'azul'
          ? 'text-center text-sm italic leading-[22px]'
          : variant === 'dourado'
            ? 'text-center text-base italic leading-6'
            : 'text-[15px] italic leading-[23px]'
      }
      style={{
        fontFamily: variant === 'azul' ? theme.fontSerif : theme.fontSerif,
        color: theme.text,
      }}
    >
      {quote.startsWith('"') ? quote : `"${quote}"`}
    </p>
  )

  const monogram = (
    <div
      className="flex items-center justify-center gap-1.5 pb-3"
      style={{ color: theme.accent, fontFamily: theme.fontSerif }}
    >
      <span className="text-base">{brideInitial}</span>
      <span className="text-xs" style={{ color: theme.textMuted, fontFamily: theme.fontSans }}>
        |
      </span>
      <span className="text-base">{groomInitial}</span>
    </div>
  )

  if (variant === 'verde-oliva') {
    return (
      <section className="flex flex-col items-center gap-2 px-7 pb-2 pt-6">
        {quoteText}
        {monogram}
      </section>
    )
  }

  if (variant === 'rosa') {
    return (
      <section
        className="flex flex-row gap-4 px-7 py-8"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="w-[3px] shrink-0 self-stretch" style={{ backgroundColor: theme.accentLight }} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-[15px] italic leading-[23px]" style={{ fontFamily: theme.fontSerif }}>
            {quote.startsWith('"') ? quote : `"${quote}"`}
          </p>
          <p className="text-xs" style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}>
            {brideInitial} · {groomInitial}
          </p>
        </div>
      </section>
    )
  }

  if (variant === 'azul') {
    return (
      <section
        className="flex flex-col items-center justify-center px-8 py-10"
        style={{ backgroundColor: theme.accentLight }}
      >
        {quoteText}
        <p
          className="mt-2 text-[9px] tracking-[0.12px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          {brideInitial} · {groomInitial}
        </p>
      </section>
    )
  }

  if (variant === 'dourado' && framed) {
    return (
      <section
        className="relative flex flex-col items-center px-9 py-9"
        style={{ backgroundColor: theme.surface }}
      >
        {theme.line && (
          <div
            className="pointer-events-none absolute inset-2 border opacity-40"
            style={{ borderColor: theme.line }}
            aria-hidden
          />
        )}
        <div className="relative z-10 flex max-w-sm flex-col items-center gap-2">
          {quoteText}
          <p
            className="text-[9px] tracking-[0.1px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
          >
            {brideInitial} · {groomInitial}
          </p>
        </div>
      </section>
    )
  }

  if (variant === 'dourado') {
    return (
      <section className="flex flex-col items-center gap-2 px-9 py-6" style={{ backgroundColor: theme.bg }}>
        {quoteText}
      </section>
    )
  }

  // terracota
  return (
    <section className="relative bg-white px-6 py-8">
      <div
        className="absolute bottom-8 left-6 top-8 w-[3px]"
        style={{ backgroundColor: theme.accent }}
        aria-hidden
      />
      <div className="pl-5">
        <p className="text-[15px] italic leading-[23px]" style={{ fontFamily: theme.fontSerif }}>
          {quote.startsWith('"') ? quote : `"${quote}"`}
        </p>
        <p
          className="mt-2 text-[9px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          {brideInitial} · {groomInitial}
        </p>
      </div>
    </section>
  )
}
