'use client'

import { Cormorant_Garamond, Great_Vibes, Lato } from 'next/font/google'

import { cn } from '@/src/shared/lib/cn'

import { ExtendedCalendarSection } from '../shell/shared/extended-calendar-section'
import { ExtendedCoupleNamesSection } from '../shell/shared/extended-couple-names-section'
import { ExtendedFooter } from '../shell/shared/extended-footer'
import { ExtendedHeroSection } from '../shell/shared/extended-hero-section'
import { ExtendedInviteMessageSection } from '../shell/shared/extended-invite-message-section'
import { ExtendedInviteShell } from '../shell/shared/extended-invite-shell'
import { ExtendedQuickActions } from '../shell/shared/extended-quick-actions'
import { ExtendedQuoteSection } from '../shell/shared/extended-quote-section'
import { ExtendedRsvpCta } from '../shell/shared/extended-rsvp-cta'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryMosaicSection } from '../shell/shared/gallery-mosaic-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import {
  formatWeddingTime,
  parseWeddingDateParts,
} from '../../model/wedding-date'
import { DOURADO_SELO_THEME } from '../../model/themes/dourado-selo-theme'

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

type DouradoSeloTemplateProps = InviteShellPhotos & {
  data: InviteShellData
}

function DouradoEditorialDate({
  weddingDate,
  weddingTime,
}: {
  weddingDate: string
  weddingTime: string
}) {
  const theme = DOURADO_SELO_THEME
  const dateParts = parseWeddingDateParts(weddingDate)
  if (!dateParts) return null

  return (
    <section
      className="flex flex-col items-center gap-2 px-6 py-8"
      style={{ backgroundColor: theme.surface }}
    >
      <span
        className="text-[52px] leading-none"
        style={{ color: theme.accent, fontFamily: theme.fontSerif }}
      >
        {dateParts.day}
      </span>
      <p className="text-[13px]" style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}>
        {dateParts.month} {dateParts.year} · {formatWeddingTime(weddingTime)}
      </p>
      <div className="flex items-end gap-2">
        <span className="text-sm capitalize" style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}>
          {dateParts.month}
        </span>
        <span style={{ color: theme.line, fontFamily: theme.fontSerif }}>—</span>
        <span
          className="text-[56px] leading-[50px]"
          style={{ color: theme.accent, fontFamily: theme.fontSerif }}
        >
          {dateParts.day}
        </span>
        <span style={{ color: theme.line, fontFamily: theme.fontSerif }}>—</span>
        <span className="text-sm" style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}>
          {dateParts.year}
        </span>
      </div>
      <p
        className="text-[11px] italic capitalize"
        style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
      >
        {dateParts.weekday} · {formatWeddingTime(weddingTime)}
      </p>
      {theme.line && <div className="mt-1 h-px w-[120px]" style={{ backgroundColor: theme.line }} />}
    </section>
  )
}

function DouradoCoupleStory({ coupleStory }: { coupleStory: string }) {
  const theme = DOURADO_SELO_THEME
  if (!coupleStory) return null

  return (
    <section
      className="flex flex-col items-center gap-3 px-7 py-6"
      style={{ backgroundColor: theme.accentLight }}
    >
      {theme.line && <div className="h-px w-20" style={{ backgroundColor: theme.line }} />}
      <p
        className="text-center text-base italic leading-[26px]"
        style={{ fontFamily: theme.fontSerif }}
      >
        {coupleStory}
      </p>
      {theme.line && <div className="h-px w-20" style={{ backgroundColor: theme.line }} />}
    </section>
  )
}

export function DouradoSeloTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: DouradoSeloTemplateProps) {
  const theme = DOURADO_SELO_THEME

  return (
    <ExtendedInviteShell
      theme={theme}
      className={cn(greatVibes.variable, cormorant.variable, lato.variable)}
    >
      <ExtendedHeroSection
        theme={theme}
        variant="dourado"
        heroPhoto={heroPhoto}
        groomName={data.groomName}
        brideName={data.brideName}
        musicUrl={data.musicUrl}
      />
      <ExtendedCoupleNamesSection
        theme={theme}
        variant="dourado"
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedQuoteSection
        theme={theme}
        variant="dourado"
        framed
        welcomeMessage={data.welcomeMessage}
        groomName={data.groomName}
        brideName={data.brideName}
      />
      <ExtendedInviteMessageSection theme={theme} variant="dourado" />
      <ExtendedQuickActions
        theme={theme}
        venueAddress={data.venueAddress}
        whatsapp={data.whatsapp}
      />
      <DouradoCoupleStory coupleStory={data.coupleStory} />
      <DouradoEditorialDate
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
      <GalleryMosaicSection galleryPhotos={galleryPhotos} theme={theme} />
      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </ExtendedInviteShell>
  )
}
