'use client'

import { Cormorant_Garamond, Dancing_Script, Lato } from 'next/font/google'

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
import { GalleryFilmstripSection } from '../shell/shared/gallery-filmstrip-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { TERRACOTA_BOHO_THEME } from '../../model/themes/terracota-boho-theme'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dancing-script',
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

type TerracotaBohoTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

export function TerracotaBohoTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: TerracotaBohoTemplateProps) {
  const theme = TERRACOTA_BOHO_THEME
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto

  return (
    <ExtendedInviteShell
      theme={theme}
      className={cn(dancingScript.variable, cormorant.variable, lato.variable)}
    >
      <ExtendedHeroCap
        theme={theme}
        variant="terracota"
        heroPhoto={heroPhoto}
        groomName={data.groomName}
        brideName={data.brideName}
        musicUrl={data.musicUrl}
      />
      <ExtendedInviteMessageSection theme={theme} variant="terracota" />
      <ExtendedQuoteSection
        theme={theme}
        variant="terracota"
        welcomeMessage={data.welcomeMessage}
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedCoupleStorySection
        theme={theme}
        variant="terracota"
        coupleStory={data.coupleStory}
        storyPhoto={storyPhoto}
      />
      <ExtendedEditorialDateSection
        theme={theme}
        variant="terracota"
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
        sectionLabel="Onde será"
      />
      <ExtendedRsvpCta theme={theme} whatsapp={data.whatsapp} />
      <GalleryFilmstripSection galleryPhotos={galleryPhotos} theme={theme} />
      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </ExtendedInviteShell>
  )
}
