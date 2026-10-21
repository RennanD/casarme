'use client'

import Image from 'next/image'

import { InviteMusicPlayer } from '../invite-music-player'
import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'

type MusicPlacement = 'bottom-center' | 'top-right' | 'top-left'

type ExtendedHeroSectionProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  heroPhoto?: string | null
  groomName: string
  brideName: string
  musicUrl?: string
}

const HERO_HEIGHT: Record<ExtendedThemeSlug, string> = {
  'verde-oliva': 'h-[440px]',
  rosa: 'h-[360px]',
  azul: 'h-[360px]',
  dourado: 'h-[340px]',
  terracota: 'h-[380px]',
}

const FADE_GRADIENT: Record<ExtendedThemeSlug, string> = {
  'verde-oliva':
    'linear-gradient(180deg, #FAFAF700 0%, #FAFAF71A 25%, #FAFAF755 50%, #FAFAF7BB 75%, #FAFAF7F2 92%, #FAFAF7FF 100%)',
  rosa: 'linear-gradient(180deg, #FFFCFA00 0%, #FFFCFA55 45%, #FFFCFAEE 85%, #FFFCFAFF 100%)',
  azul: 'linear-gradient(180deg, #F8FAFC00 0%, #F8FAFC55 45%, #F8FAFCEE 85%, #F8FAFCFF 100%)',
  dourado: 'linear-gradient(180deg, #FFFCF500 0%, #FFFCF5DD 80%, #FFFCF5FF 100%)',
  terracota: 'linear-gradient(180deg, #FAF3EB00 0%, #FAF3EBCC 75%, #FAF3EBFF 100%)',
}

const MUSIC_PLACEMENT: Record<ExtendedThemeSlug, MusicPlacement> = {
  'verde-oliva': 'bottom-center',
  rosa: 'top-right',
  azul: 'top-right',
  dourado: 'top-right',
  terracota: 'top-left',
}

export function ExtendedHeroSection({
  theme,
  variant,
  heroPhoto,
  groomName,
  brideName,
  musicUrl,
}: ExtendedHeroSectionProps) {
  const alt = `${groomName} e ${brideName}`

  return (
    <section className={`relative w-full shrink-0 ${HERO_HEIGHT[variant]}`}>
      <Image
        src={heroPhoto || '/placeholder.svg?height=880&width=780'}
        alt={alt}
        fill
        priority
        className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[200px]"
        style={{ backgroundImage: FADE_GRADIENT[variant] }}
        aria-hidden
      />

      {variant === 'dourado' && theme.line && (
        <div
          className="pointer-events-none absolute inset-4 border opacity-50"
          style={{ borderColor: theme.line }}
          aria-hidden
        />
      )}

      {variant === 'terracota' && (
        <>
          <div
            className="pointer-events-none absolute inset-6 rounded-full border border-dashed opacity-60"
            style={{ borderColor: theme.accentLight }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-3 rounded-full opacity-30"
            style={{ backgroundColor: theme.accentLight }}
            aria-hidden
          />
        </>
      )}

      <InviteMusicPlayer
        musicUrl={musicUrl}
        theme={{ variant: 'extended', tokens: theme }}
        placement={MUSIC_PLACEMENT[variant]}
      />
    </section>
  )
}
