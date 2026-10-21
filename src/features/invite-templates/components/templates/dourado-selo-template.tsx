'use client'

import { Cormorant_Garamond, Great_Vibes, Lato } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/src/shared/lib/cn'

import { InviteMusicPlayer } from '../shell/invite-music-player'
import { ExtendedFooter } from '../shell/shared/extended-footer'
import { ExtendedQuickActions } from '../shell/shared/extended-quick-actions'
import { ExtendedRsvpCta } from '../shell/shared/extended-rsvp-cta'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryPolaroidSection } from '../shell/shared/gallery-polaroid-section'
import { SectionMarker } from '../shell/shared/section-marker'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { formatWeddingTime, parseWeddingDateParts } from '../../model/wedding-date'
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

export function DouradoSeloTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: DouradoSeloTemplateProps) {
  const theme = DOURADO_SELO_THEME
  const dateParts = parseWeddingDateParts(data.weddingDate)
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto
  const groomInitial = data.groomName?.charAt(0)?.toUpperCase() ?? 'N'
  const brideInitial = data.brideName?.charAt(0)?.toUpperCase() ?? 'N'

  return (
    <div
      className={cn(greatVibes.variable, cormorant.variable, lato.variable, 'min-h-screen')}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <section className="relative flex flex-col items-center px-6 pb-8 pt-14 text-center">
        <p
          className="text-xs uppercase tracking-[0.18em]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
        >
          Você está convidado para o nosso casamento
        </p>

        <div
          className="mt-10 flex size-28 items-center justify-center rounded-full border-2"
          style={{ borderColor: theme.accent }}
        >
          <span className="text-6xl leading-none" style={{ color: theme.accent, fontFamily: theme.fontDisplay }}>
            {brideInitial}
            {groomInitial}
          </span>
        </div>

        <h1 className="mt-6 text-2xl" style={{ fontFamily: theme.fontSerif }}>
          {data.brideName || 'Noiva'} & {data.groomName || 'Noivo'}
        </h1>

        {dateParts && (
          <div className="mt-10 flex items-center gap-3">
            <div
              className="flex flex-col items-center border-y px-3 py-3"
              style={{ borderColor: theme.accent }}
            >
              <p
                className="text-[10px] uppercase"
                style={{ color: theme.accent, fontFamily: theme.fontSans }}
              >
                {dateParts.weekday}
              </p>
            </div>
            <div
              className="flex flex-col items-center border-x px-4 py-2"
              style={{ borderColor: theme.accent }}
            >
              <p
                className="text-[10px] uppercase"
                style={{ color: theme.accent, fontFamily: theme.fontSans }}
              >
                {dateParts.month}
              </p>
              <p
                className="text-6xl leading-none"
                style={{ color: theme.accent, fontFamily: theme.fontSerif }}
              >
                {dateParts.day}
              </p>
              <p
                className="text-[10px] uppercase"
                style={{ color: theme.accent, fontFamily: theme.fontSans }}
              >
                {dateParts.year}
              </p>
            </div>
            <div
              className="flex flex-col items-center border-y px-3 py-3"
              style={{ borderColor: theme.accent }}
            >
              <p
                className="text-[10px] uppercase"
                style={{ color: theme.accent, fontFamily: theme.fontSans }}
              >
                {formatWeddingTime(data.weddingTime)} horas
              </p>
            </div>
          </div>
        )}

        <InviteMusicPlayer musicUrl={data.musicUrl} theme={{ variant: 'extended', tokens: theme }} />
      </section>

      <section className="flex flex-col gap-2 px-8 pb-6 pt-2">
        <SectionMarker theme={theme}>02 · O convite</SectionMarker>
        <p className="text-[19px] leading-8" style={{ fontFamily: theme.fontSerif }}>
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

      <GalleryPolaroidSection
        galleryPhotos={galleryPhotos}
        theme={theme}
        sectionLabel="08 · Galeria"
      />

      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </div>
  )
}
