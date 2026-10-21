import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import { ExtendedHeroNamesBridge } from './extended-hero-names-bridge'
import { SectionMarker } from './section-marker'
import { getHeroNamesBridge } from '../../../model/extended-hero-bridge'

type ExtendedCoupleNamesSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  groomName: string
  brideName: string
  /** When true, rendered inside ExtendedHeroCap (no outer bridge wrapper). */
  embedded?: boolean
}

function CoupleNamesContent({
  theme,
  variant,
  groom,
  bride,
}: {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  groom: string
  bride: string
}) {
  if (variant === 'verde-oliva') {
    return (
      <>
        <p
          className="text-center text-[54px]"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {bride}
        </p>
        <p
          className="text-center text-[27px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
        >
          e
        </p>
        <p
          className="text-center text-[54px]"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {groom}
        </p>
        <div className="mt-2 flex items-center gap-3 py-2">
          <div className="h-px w-12" style={{ backgroundColor: theme.accent }} />
          <div className="h-px w-12" style={{ backgroundColor: theme.accent }} />
        </div>
        <p className="text-2xl" style={{ fontFamily: theme.fontSerif }}>
          Esperamos por você!
        </p>
        {theme.modelLabel && (
          <p
            className="mt-1 text-[12px] tracking-[0.2px]"
            style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
          >
            {theme.modelLabel}
          </p>
        )}
      </>
    )
  }

  if (variant === 'rosa') {
    return (
      <>
        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[54px]" style={{ color: theme.accent, fontFamily: theme.fontDisplay }}>
            {bride}
          </span>
          <span
            className="text-[42px]"
            style={{ color: theme.accentLight, fontFamily: theme.fontSerif }}
          >
            &
          </span>
          <span className="text-[54px]" style={{ color: theme.accent, fontFamily: theme.fontDisplay }}>
            {groom}
          </span>
        </div>
        <p className="text-[23px] italic" style={{ fontFamily: theme.fontSerif }}>
          Esperamos por você!
        </p>
        <div className="flex w-full flex-col gap-1">
          <div className="h-px w-full" style={{ backgroundColor: theme.divider }} />
          <div className="h-px w-full" style={{ backgroundColor: theme.divider }} />
        </div>
      </>
    )
  }

  if (variant === 'azul') {
    return (
      <>
        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <h1
          className="text-center text-[72px] leading-none"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {bride} e {groom}
        </h1>
        <p className="max-w-xs text-center text-[21px]" style={{ fontFamily: theme.fontSerif }}>
          Carinhosamente convidam para a cerimônia de seu casamento
        </p>
      </>
    )
  }

  if (variant === 'dourado') {
    return (
      <p
        className="text-center text-[57px] leading-[63px]"
        style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
      >
        {bride}
        <br />
        &amp;
        <br />
        {groom}
      </p>
    )
  }

  return (
    <p
      className="text-center text-[60px]"
      style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
    >
      {bride} &amp; {groom}
    </p>
  )
}

function sectionShellClass(variant: ExtendedThemeSlug): string {
  switch (variant) {
    case 'verde-oliva':
      return 'flex flex-col items-center px-4 pb-2'
    case 'rosa':
      return 'flex flex-col items-center gap-3 px-7 pb-9'
    case 'azul':
      return 'flex flex-col items-center gap-3 border-x-4 px-7 pb-9'
    case 'dourado':
      return 'flex min-h-[186px] flex-col items-center justify-center px-6 pb-10'
    default:
      return 'flex flex-col items-center gap-2 px-12 pb-12'
  }
}

export function ExtendedCoupleNamesSection({
  theme,
  variant,
  groomName,
  brideName,
  embedded = false,
}: ExtendedCoupleNamesSectionProps) {
  const groom = groomName || 'Noivo'
  const bride = brideName || 'Noiva'
  const bridge = getHeroNamesBridge(variant, theme)
  const className = sectionShellClass(variant)
  const content = (
    <CoupleNamesContent theme={theme} variant={variant} groom={groom} bride={bride} />
  )

  if (embedded) {
    return (
      <div
        className={`relative z-10 ${className}`}
        style={{
          paddingTop: bridge.contentPaddingTopPx,
          ...(variant === 'azul' ? { borderColor: theme.accentLight } : {}),
        }}
      >
        {content}
      </div>
    )
  }

  return (
    <ExtendedHeroNamesBridge bridge={bridge} className={className}>
      {content}
    </ExtendedHeroNamesBridge>
  )
}
