'use client'

import { getHeroNamesBridge } from '../../../model/extended-hero-bridge'
import type { ExtendedInviteTheme, ExtendedThemeSlug } from '../../../model/themes/extended-invite-theme'
import { ExtendedCoupleNamesSection } from './extended-couple-names-section'
import { InviteMusicPlayer } from '../invite-music-player'

type MusicPlacement = 'bottom-center' | 'top-right' | 'top-left'

type ExtendedHeroCapProps = {
  theme: ExtendedInviteTheme
  variant: ExtendedThemeSlug
  heroPhoto?: string | null
  groomName: string
  brideName: string
  musicUrl?: string
}

const HERO_HEIGHT_PX: Record<ExtendedThemeSlug, number> = {
  'verde-oliva': 440,
  rosa: 360,
  azul: 360,
  dourado: 340,
  terracota: 380,
}

const HERO_OVERLAP_PX: Record<ExtendedThemeSlug, number> = {
  'verde-oliva': 48,
  rosa: 40,
  azul: 40,
  dourado: 36,
  terracota: 40,
}

const MUSIC_PLACEMENT: Record<ExtendedThemeSlug, MusicPlacement> = {
  'verde-oliva': 'bottom-center',
  rosa: 'top-right',
  azul: 'top-right',
  dourado: 'top-right',
  terracota: 'top-left',
}

/** Hero photo + couple names in one block — photo is an absolute layer (no hard bottom edge). */
export function ExtendedHeroCap({
  theme,
  variant,
  heroPhoto,
  groomName,
  brideName,
  musicUrl,
}: ExtendedHeroCapProps) {
  const alt = `${groomName} e ${brideName}`
  const bridge = getHeroNamesBridge(variant, theme)
  const photo = heroPhoto || '/placeholder.svg?height=880&width=780'
  const heroHeightPx = HERO_HEIGHT_PX[variant]
  const overlapPx = HERO_OVERLAP_PX[variant]
  const fadeStartPx = heroHeightPx - bridge.fadeHeightPx
  const fadeEndPx = heroHeightPx + overlapPx
  const photoMask = `linear-gradient(to bottom, #000 0px, #000 ${fadeStartPx}px, transparent ${fadeEndPx}px)`

  return (
    <section
      className="relative"
      style={{
        backgroundColor: bridge.backgroundColor,
        paddingTop: heroHeightPx - overlapPx,
      }}
    >
      <div
        role="img"
        aria-label={alt}
        className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-cover bg-no-repeat"
        style={{
          height: fadeEndPx,
          backgroundImage: `url("${photo}")`,
          backgroundPosition: 'center top',
          WebkitMaskImage: photoMask,
          maskImage: photoMask,
        }}
      />

      {variant === 'dourado' && theme.line && (
        <div
          className="pointer-events-none absolute inset-x-4 top-4 z-[2] opacity-50"
          style={{
            height: heroHeightPx - 32,
            borderColor: theme.line,
            borderWidth: 1,
            borderStyle: 'solid',
            borderBottomWidth: 0,
          }}
          aria-hidden
        />
      )}

      {variant === 'terracota' && (
        <>
          <div
            className="pointer-events-none absolute left-6 right-6 top-6 z-[2] rounded-full border border-dashed opacity-60"
            style={{
              height: heroHeightPx - 48,
              borderColor: theme.accentLight,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-3 right-3 top-3 z-[2] rounded-full opacity-30"
            style={{
              height: heroHeightPx - 24,
              backgroundColor: theme.accentLight,
            }}
            aria-hidden
          />
        </>
      )}

      <div className="absolute inset-x-0 top-0 z-20 overflow-visible" style={{ height: heroHeightPx }}>
        <InviteMusicPlayer
          musicUrl={musicUrl}
          theme={{ variant: 'extended', tokens: theme }}
          placement={MUSIC_PLACEMENT[variant]}
        />
      </div>

      <ExtendedCoupleNamesSection
        theme={theme}
        variant={variant}
        groomName={groomName}
        brideName={brideName}
        embedded
      />
    </section>
  )
}
