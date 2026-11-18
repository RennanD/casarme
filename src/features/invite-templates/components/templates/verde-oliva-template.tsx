'use client'

import { Cormorant_Garamond, Great_Vibes, Lato } from 'next/font/google'

import { cn } from '@/src/shared/lib/cn'

import { ExtendedCalendarSection } from '../shell/shared/extended-calendar-section'
import { ExtendedCoupleStorySection } from '../shell/shared/extended-couple-story-section'
import { ExtendedEditorialDateSection } from '../shell/shared/extended-editorial-date-section'
import { ExtendedFooter } from '../shell/shared/extended-footer'
import { ExtendedHeroCap } from '../shell/shared/extended-hero-cap'
import { ExtendedInviteMessageSection } from '../shell/shared/extended-invite-message-section'
import { ExtendedInviteShell } from '../shell/shared/extended-invite-shell'
import { ExtendedQuickActions } from '../shell/shared/extended-quick-actions'
import { ExtendedQuoteSection } from '../shell/shared/extended-quote-section'
import { ExtendedRsvpCta } from '../shell/shared/extended-rsvp-cta'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryCarouselSection } from '../shell/shared/gallery-carousel-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { VERDE_OLIVA_THEME } from '../../model/themes/verde-oliva-theme'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
  display: 'swap',
})

type VerdeOlivaTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

export function VerdeOlivaTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: VerdeOlivaTemplateProps) {
  const theme = VERDE_OLIVA_THEME
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto

  return (
    <ExtendedInviteShell
      theme={theme}
      className={cn(greatVibes.variable, cormorant.variable, lato.variable)}
    >
      <ExtendedHeroCap
        theme={theme}
        variant="verde-oliva"
        heroPhoto={heroPhoto}
        groomName={data.groomName}
        brideName={data.brideName}
        musicUrl={data.musicUrl}
      />
      <ExtendedQuoteSection
        theme={theme}
        variant="verde-oliva"
        welcomeMessage={data.welcomeMessage}
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedQuickActions
        theme={theme}
        venueAddress={data.venueAddress}
        whatsapp={data.whatsapp}
      />
      <ExtendedInviteMessageSection theme={theme} variant="verde-oliva" />
      <ExtendedCoupleStorySection
        theme={theme}
        variant="verde-oliva"
        coupleStory={data.coupleStory}
        storyPhoto={storyPhoto}
      />
      <ExtendedEditorialDateSection
        theme={theme}
        variant="verde-oliva"
        weddingDate={data.weddingDate}
        weddingTime={data.weddingTime}
      />
      <ExtendedCalendarSection weddingDate={data.weddingDate} theme={theme} />
      <ExtendedVenueSection
        theme={theme}
        venueName={data.venueName}
        venueAddress={data.venueAddress}
        sectionLabel="Onde será"
      />
      <ExtendedRsvpCta theme={theme} whatsapp={data.whatsapp} />
      <GalleryCarouselSection galleryPhotos={galleryPhotos} theme={theme} />
      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </ExtendedInviteShell>
  )
}
