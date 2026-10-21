'use client'

import { Cormorant_Garamond, Lato } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/src/shared/lib/cn'

import { InviteMusicPlayer } from '../shell/invite-music-player'
import { ExtendedCalendarSection } from '../shell/shared/extended-calendar-section'
import { ExtendedFooter } from '../shell/shared/extended-footer'
import { ExtendedQuickActions } from '../shell/shared/extended-quick-actions'
import { ExtendedRsvpCta } from '../shell/shared/extended-rsvp-cta'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryCarouselSection } from '../shell/shared/gallery-carousel-section'
import { SectionMarker } from '../shell/shared/section-marker'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { formatWeddingDate } from '../../model/wedding-date'
import { VERDE_OLIVA_THEME } from '../../model/themes/verde-oliva-theme'

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

function EditorialDivider({ color }: { color: string }) {
  return <div className="h-px w-full" style={{ backgroundColor: color }} />
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
    <div
      className={cn(cormorant.variable, lato.variable, 'min-h-screen')}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <section className="relative flex flex-col items-center px-6 pb-10 pt-16">
        <div className="relative mb-8">
          <div
            className="pointer-events-none absolute -inset-4 rounded-full border"
            style={{ borderColor: theme.accentLight }}
          />
          <div className="relative size-56 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={heroPhoto || '/placeholder.svg?height=448&width=448'}
              alt={`${data.groomName} e ${data.brideName}`}
              fill
              priority
              className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
            />
          </div>
        </div>

        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <h1
          className="mt-3 text-center text-4xl leading-tight"
          style={{ fontFamily: theme.fontSerif }}
        >
          {data.groomName || 'Noivo'}{' '}
          <span style={{ color: theme.accent }}>&</span>{' '}
          {data.brideName || 'Noiva'}
        </h1>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          {formatWeddingDate(data.weddingDate) || 'Data do casamento'}
        </p>
        <div className="mt-6 flex w-full max-w-xs flex-col gap-1">
          <EditorialDivider color={theme.divider} />
          <EditorialDivider color={theme.divider} />
        </div>
        <InviteMusicPlayer musicUrl={data.musicUrl} theme={{ variant: 'extended', tokens: theme }} />
      </section>

      <section className="flex flex-col gap-2 px-8 pb-6 pt-4">
        <SectionMarker theme={theme}>02 · O convite</SectionMarker>
        <p className="text-[21px] leading-8" style={{ fontFamily: theme.fontSerif }}>
          {data.welcomeMessage ||
            'É com imensa alegria que convidamos você para celebrar conosco este momento único.'}
        </p>
      </section>

      {data.coupleStory && (
        <section
          className="flex flex-row gap-3.5 px-5 py-6"
          style={{ backgroundColor: theme.surface }}
        >
          {storyPhoto && (
            <div className="relative h-40 w-[120px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={storyPhoto}
                alt="História do casal"
                fill
                className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
              />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <SectionMarker theme={theme}>03 · Nossa história</SectionMarker>
            <p className="text-sm leading-[22px]" style={{ fontFamily: theme.fontSerif }}>
              {data.coupleStory}
            </p>
          </div>
        </section>
      )}

      <ExtendedCalendarSection
        weddingDate={data.weddingDate}
        weddingTime={data.weddingTime}
        theme={theme}
      />

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

      <GalleryCarouselSection
        galleryPhotos={galleryPhotos}
        theme={theme}
        sectionLabel="08 · Galeria"
      />

      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </div>
  )
}
