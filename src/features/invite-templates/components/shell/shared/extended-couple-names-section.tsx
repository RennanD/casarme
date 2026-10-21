import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'

type ExtendedCoupleNamesSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  groomName: string
  brideName: string
}

export function ExtendedCoupleNamesSection({
  theme,
  variant,
  groomName,
  brideName,
}: ExtendedCoupleNamesSectionProps) {
  const groom = groomName || 'Noivo'
  const bride = brideName || 'Noiva'

  if (variant === 'verde-oliva') {
    return (
      <section className="flex flex-col items-center px-4 pb-2 pt-0">
        <p
          className="text-center text-4xl"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {bride}
        </p>
        <p
          className="text-center text-lg"
          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
        >
          e
        </p>
        <p
          className="text-center text-4xl"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {groom}
        </p>
        <div className="mt-2 flex items-center gap-3 py-2">
          <div className="h-px w-12" style={{ backgroundColor: theme.accent }} />
          <div className="h-px w-12" style={{ backgroundColor: theme.accent }} />
        </div>
        <p className="text-base" style={{ fontFamily: theme.fontSerif }}>
          Esperamos por você!
        </p>
        {theme.modelLabel && (
          <p
            className="mt-1 text-[8px] tracking-[0.2px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
          >
            {theme.modelLabel}
          </p>
        )}
      </section>
    )
  }

  if (variant === 'rosa') {
    return (
      <section
        className="flex flex-col items-center gap-3 px-7 pb-9 pt-10"
        style={{ backgroundColor: theme.surface }}
      >
        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-4xl" style={{ color: theme.accent, fontFamily: theme.fontDisplay }}>
            {bride}
          </span>
          <span
            className="text-[28px]"
            style={{ color: theme.accentLight, fontFamily: theme.fontSerif }}
          >
            &
          </span>
          <span className="text-4xl" style={{ color: theme.accent, fontFamily: theme.fontDisplay }}>
            {groom}
          </span>
        </div>
        <p className="text-[15px] italic" style={{ fontFamily: theme.fontSerif }}>
          Esperamos por você!
        </p>
        <div className="flex w-full flex-col gap-1">
          <div className="h-px w-full" style={{ backgroundColor: theme.divider }} />
          <div className="h-px w-full" style={{ backgroundColor: theme.divider }} />
        </div>
      </section>
    )
  }

  if (variant === 'azul') {
    return (
      <section
        className="flex flex-col items-center gap-3 border-x-4 px-7 pb-9 pt-10"
        style={{ backgroundColor: theme.surface, borderColor: theme.accentLight }}
      >
        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <h1
          className="text-center text-5xl leading-none"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {bride} e {groom}
        </h1>
        <p className="max-w-xs text-center text-sm" style={{ fontFamily: theme.fontSerif }}>
          Carinhosamente convidam para a cerimônia de seu casamento
        </p>
      </section>
    )
  }

  if (variant === 'dourado') {
    return (
      <section
        className="relative flex min-h-[186px] flex-col items-center justify-center px-6 py-10"
        style={{ backgroundColor: theme.surface }}
      >
        <p
          className="text-center text-[38px] leading-[42px]"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {bride}
          <br />
          &amp;
          <br />
          {groom}
        </p>
      </section>
    )
  }

  // terracota
  return (
    <section
      className="flex flex-col items-center gap-2 px-12 py-12"
      style={{ backgroundColor: theme.surface }}
    >
      <p
        className="text-center text-[40px]"
        style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
      >
        {bride} &amp; {groom}
      </p>
      <p
        className="text-center text-[11px] leading-[17px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
      >
        Com a benção de nossos pais
      </p>
    </section>
  )
}
