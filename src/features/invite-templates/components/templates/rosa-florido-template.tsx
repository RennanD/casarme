'use client'

import { Cormorant_Garamond, Lato, Parisienne } from 'next/font/google'

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
import { GalleryColumnsSection } from '../shell/shared/gallery-columns-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { ROSA_FLORIDO_THEME } from '../../model/themes/rosa-florido-theme'

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne',
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

type RosaFloridoTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

export function RosaFloridoTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: RosaFloridoTemplateProps) {
  const theme = ROSA_FLORIDO_THEME
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto

  return (
    <ExtendedInviteShell
      theme={theme}
      className={cn(parisienne.variable, cormorant.variable, lato.variable)}
    >
      <ExtendedHeroCap
        theme={theme}
        variant="rosa"
        heroPhoto={heroPhoto}
        groomName={data.groomName}
        brideName={data.brideName}
        musicUrl={data.musicUrl}
      />
      <ExtendedInviteMessageSection theme={theme} variant="rosa" showMarker />
      <ExtendedQuoteSection
        theme={theme}
        variant="rosa"
        welcomeMessage={data.welcomeMessage}
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedCoupleStorySection
        theme={theme}
        variant="rosa"
        coupleStory={data.coupleStory}
        storyPhoto={storyPhoto}
      />
      <ExtendedEditorialDateSection
        theme={theme}
        variant="rosa"
        weddingDate={data.weddingDate}
        weddingTime={data.weddingTime}
      />
      <ExtendedCalendarSection weddingDate={data.weddingDate} theme={theme} />
      <ExtendedQuickActions
        theme={theme}
        venueAddress={data.venueAddress}
        whatsapp={data.whatsapp}
      />
      <ExtendedVenueSection
        theme={theme}
        venueName={data.venueName}
        venueAddress={data.venueAddress}
        sectionLabel="07 · Onde será"
      />
      <ExtendedRsvpCta theme={theme} whatsapp={data.whatsapp} />
      <GalleryColumnsSection galleryPhotos={galleryPhotos} theme={theme} />
      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </ExtendedInviteShell>
  )
}
