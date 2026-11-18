import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'

type ExtendedInviteMessageSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  showMarker?: boolean
}

export function ExtendedInviteMessageSection({
  theme,
  variant,
  showMarker = variant === 'rosa',
}: ExtendedInviteMessageSectionProps) {
  const alignment =
    variant === 'verde-oliva' || variant === 'azul' || variant === 'dourado'
      ? 'text-center'
      : 'text-left'

  const textSize =
    variant === 'rosa'
      ? 'text-[32px] leading-[48px]'
      : variant === 'azul'
        ? 'text-[27px] leading-[41px]'
        : variant === 'dourado'
          ? 'text-[26px] leading-[39px]'
          : variant === 'terracota'
            ? 'text-3xl leading-[44px]'
            : 'text-2xl leading-9'

  return (
    <section
      className={`flex flex-col gap-2 px-8 py-4 ${variant === 'rosa' ? 'pb-6 pt-8' : ''}`}
      style={{
        backgroundColor:
          variant === 'dourado' ? theme.bg : variant === 'terracota' ? theme.bg : theme.bg,
      }}
    >
      {showMarker && <SectionMarker theme={theme}>02 · O convite</SectionMarker>}
      <p
        className={`${textSize} ${alignment}`}
        style={{ fontFamily: theme.fontSerif, color: theme.text }}
      >
        {theme.inviteMessage}
      </p>
      {variant === 'rosa' && (
        <p
          className="text-[108px] leading-[65px]"
          style={{ color: theme.accentLight, fontFamily: theme.fontSerif }}
          aria-hidden
        >
          "
        </p>
      )}
    </section>
  )
}
