import Image from 'next/image'

import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'

type ExtendedCoupleStorySectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  coupleStory: string
  storyPhoto?: string | null
}

export function ExtendedCoupleStorySection({
  theme,
  variant,
  coupleStory,
  storyPhoto,
}: ExtendedCoupleStorySectionProps) {
  if (!coupleStory) return null

  const bg =
    variant === 'terracota' ? theme.surface : variant === 'azul' ? theme.bg : theme.surface

  return (
    <section
      className="flex flex-row gap-3.5 px-5 py-6"
      style={{ backgroundColor: bg }}
    >
      {storyPhoto && (
        <div
          className={`relative h-40 w-[120px] shrink-0 overflow-hidden ${
            variant === 'rosa' ? 'rounded-lg' : variant === 'terracota' ? 'rounded-2xl' : 'rounded-lg'
          }`}
        >
          <Image
            src={storyPhoto}
            alt="História do casal"
            fill
            className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <SectionMarker theme={theme}>03 · Nossa história</SectionMarker>
        <p className="text-sm leading-[22px]" style={{ fontFamily: theme.fontSerif }}>
          {coupleStory}
        </p>
      </div>
    </section>
  )
}
