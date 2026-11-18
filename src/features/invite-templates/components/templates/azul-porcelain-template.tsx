'use client'

import { Inter, Playfair_Display, Tangerine } from 'next/font/google'

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
import { GalleryPolaroidSection } from '../shell/shared/gallery-polaroid-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { AZUL_PORCELAIN_THEME } from '../../model/themes/azul-porcelain-theme'
import { formatWeddingTime, parseWeddingDateParts } from '../../model/wedding-date'

const tangerine = Tangerine({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tangerine',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

type AzulPorcelainTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

export function AzulPorcelainTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: AzulPorcelainTemplateProps) {
  const theme = AZUL_PORCELAIN_THEME
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto
  const dateParts = parseWeddingDateParts(data.weddingDate)

  return (
    <ExtendedInviteShell
      theme={theme}
      className={cn(tangerine.variable, playfair.variable, inter.variable)}
    >
      <ExtendedHeroCap
        theme={theme}
        variant="azul"
        heroPhoto={heroPhoto}
        groomName={data.groomName}
        brideName={data.brideName}
        musicUrl={data.musicUrl}
      />
      {dateParts && (
        <p
          className="border-x-4 px-7 pb-4 text-center text-lg uppercase tracking-[0.12em]"
          style={{
            borderColor: theme.accentLight,
            backgroundColor: theme.surface,
            fontFamily: theme.fontSans,
          }}
        >
          {dateParts.day} de {dateParts.month} de {dateParts.year} ·{' '}
          {formatWeddingTime(data.weddingTime)} horas
        </p>
      )}
      <ExtendedQuoteSection
        theme={theme}
        variant="azul"
        welcomeMessage={data.welcomeMessage}
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedQuickActions
        theme={theme}
        venueAddress={data.venueAddress}
        whatsapp={data.whatsapp}
      />
      <ExtendedInviteMessageSection theme={theme} variant="azul" />
      <ExtendedCoupleStorySection
        theme={theme}
        variant="azul"
        coupleStory={data.coupleStory}
        storyPhoto={storyPhoto}
      />
      <ExtendedEditorialDateSection
        theme={theme}
        variant="azul"
        weddingDate={data.weddingDate}
        weddingTime={data.weddingTime}
      />
      <ExtendedCalendarSection weddingDate={data.weddingDate} theme={theme} />
      <ExtendedVenueSection
        theme={theme}
        venueName={data.venueName}
        venueAddress={data.venueAddress}
        sectionLabel="07 · Onde será"
      />
      <ExtendedRsvpCta theme={theme} whatsapp={data.whatsapp} />
      <GalleryPolaroidSection galleryPhotos={galleryPhotos} theme={theme} />
      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </ExtendedInviteShell>
  )
}
