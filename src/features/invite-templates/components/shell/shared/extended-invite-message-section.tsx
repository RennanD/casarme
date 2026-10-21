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
      ? 'text-[21px] leading-8'
      : variant === 'azul'
        ? 'text-lg leading-[27px]'
        : variant === 'dourado'
          ? 'text-[17px] leading-[26px]'
          : variant === 'terracota'
            ? 'text-xl leading-[29px]'
            : 'text-base leading-6'

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
          className="text-[72px] leading-[43px]"
          style={{ color: theme.accentLight, fontFamily: theme.fontSerif }}
          aria-hidden
        >
          "
        </p>
      )}
    </section>
  )
}
