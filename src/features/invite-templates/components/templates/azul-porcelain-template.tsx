'use client'

import { Great_Vibes, Lato, Playfair_Display } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/src/shared/lib/cn'

import { InviteMusicPlayer } from '../shell/invite-music-player'
import { ExtendedCalendarSection } from '../shell/shared/extended-calendar-section'
import { ExtendedFooter } from '../shell/shared/extended-footer'
import { ExtendedQuickActions } from '../shell/shared/extended-quick-actions'
import { ExtendedRsvpCta } from '../shell/shared/extended-rsvp-cta'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryColumnsSection } from '../shell/shared/gallery-columns-section'
import { SectionMarker } from '../shell/shared/section-marker'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { formatWeddingTime, parseWeddingDateParts } from '../../model/wedding-date'
import { AZUL_PORCELAIN_THEME } from '../../model/themes/azul-porcelain-theme'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
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
  const dateParts = parseWeddingDateParts(data.weddingDate)
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto

  return (
    <div
      className={cn(greatVibes.variable, playfair.variable, lato.variable, 'min-h-screen')}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <section className="relative h-[360px] w-full">
        <Image
          src={heroPhoto || '/placeholder.svg?height=720&width=780'}
          alt={`${data.groomName} e ${data.brideName}`}
          fill
          priority
          className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #F8FAFC00 0%, #F8FAFC55 45%, #F8FAFCEE 85%, #F8FAFCFF 100%)',
          }}
        />
        <InviteMusicPlayer musicUrl={data.musicUrl} theme={{ variant: 'extended', tokens: theme }} />
      </section>

      <section
        className="flex flex-col items-center gap-3 border-x-4 px-7 pb-9 pt-10"
        style={{ backgroundColor: theme.surface, borderColor: theme.accentLight }}
      >
        <SectionMarker theme={theme}>01 · Os noivos</SectionMarker>
        <h1
          className="text-center text-5xl leading-none"
          style={{ color: theme.accent, fontFamily: theme.fontDisplay }}
        >
          {data.brideName || 'Noiva'} e {data.groomName || 'Noivo'}
        </h1>
        <p
          className="max-w-xs text-center text-sm"
          style={{ fontFamily: theme.fontSerif }}
        >
          Carinhosamente convidam para a cerimônia de seu casamento
        </p>
        {dateParts && (
          <p
            className="text-center text-xs uppercase tracking-[0.12em]"
            style={{ fontFamily: theme.fontSans }}
          >
            {dateParts.day} de {dateParts.month} de {dateParts.year} ·{' '}
            {formatWeddingTime(data.weddingTime)} horas
          </p>
        )}
      </section>

      <section
        className="flex flex-col gap-2 border-x-4 px-8 pb-6 pt-8"
        style={{ borderColor: theme.accentLight }}
      >
        <SectionMarker theme={theme}>02 · O convite</SectionMarker>
        <p className="text-[19px] leading-8" style={{ fontFamily: theme.fontSerif }}>
          {data.welcomeMessage ||
            'É com imensa alegria que convidamos você para celebrar conosco este momento único.'}
        </p>
      </section>

      {data.coupleStory && (
        <section
          className="flex flex-row gap-3.5 border-x-4 px-5 py-6"
          style={{ backgroundColor: theme.surface, borderColor: theme.accentLight }}
        >
          {storyPhoto && (
            <div
              className="relative h-40 w-[120px] shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1"
              style={{ borderColor: theme.accentLight }}
            >
              <div className="relative size-full overflow-hidden rounded-md">
                <Image
                  src={storyPhoto}
                  alt="História do casal"
                  fill
                  className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                />
              </div>
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

      <GalleryColumnsSection
        galleryPhotos={galleryPhotos}
        theme={theme}
        sectionLabel="08 · Galeria"
      />

      <ExtendedFooter groomName={data.groomName} brideName={data.brideName} theme={theme} />
    </div>
  )
}
