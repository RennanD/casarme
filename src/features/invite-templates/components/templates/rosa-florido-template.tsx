'use client'

import { Cormorant_Garamond, Lato, Parisienne } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarCheck, MapPin } from 'lucide-react'

import { cn } from '@/src/shared/lib/cn'

import { InviteMusicPlayer } from '../shell/invite-music-player'
import { ExtendedVenueSection } from '../shell/shared/extended-venue-section'
import { GalleryColumnsSection } from '../shell/shared/gallery-columns-section'
import type { InviteShellData, InviteShellPhotos } from '../../model/invite-shell-types'
import { ROSA_FLORIDO_THEME } from '../../model/themes/rosa-florido-theme'
import {
  buildMonthCalendar,
  getWeekdayLabels,
} from '../../model/wedding-calendar'
import {
  formatWeddingTime,
  parseWeddingDateParts,
} from '../../model/wedding-date'
import { openWhatsAppRsvp } from '../../model/whatsapp-rsvp'

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

function SectionMarker({ children }: { children: string }) {
  return (
    <p
      className="text-[9px] tracking-[0.15px]"
      style={{ color: ROSA_FLORIDO_THEME.textMuted, fontFamily: ROSA_FLORIDO_THEME.fontSans }}
    >
      {children}
    </p>
  )
}

function EditorialDivider() {
  return <div className="h-px w-full" style={{ backgroundColor: ROSA_FLORIDO_THEME.divider }} />
}

export function RosaFloridoTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: RosaFloridoTemplateProps) {
  const tokens = ROSA_FLORIDO_THEME
  const dateParts = parseWeddingDateParts(data.weddingDate)
  const weddingDay = dateParts ? Number.parseInt(dateParts.day, 10) : 1
  const weddingYear = dateParts ? Number.parseInt(dateParts.year, 10) : new Date().getFullYear()
  const weddingMonth = dateParts
    ? new Date(`${data.weddingDate}T00:00:00`).getMonth() + 1
    : new Date().getMonth() + 1
  const calendarRows = buildMonthCalendar(weddingYear, weddingMonth, weddingDay)
  const groomInitial = data.groomName?.charAt(0)?.toUpperCase() ?? 'N'
  const brideInitial = data.brideName?.charAt(0)?.toUpperCase() ?? 'N'
  const storyPhoto = groomPhoto || bridePhoto || heroPhoto

  const handleConfirmPresence = () => {
    if (!data.whatsapp) {
      alert('WhatsApp não configurado para este convite.')
      return
    }

    openWhatsAppRsvp(data.whatsapp)
  }

  const handleOpenMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
      '_blank',
    )
  }

  return (
    <div
      className={cn(
        parisienne.variable,
        cormorant.variable,
        lato.variable,
        'min-h-screen',
      )}
      style={{ backgroundColor: tokens.bg, color: tokens.text }}
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
              'linear-gradient(180deg, #FFFCFA00 0%, #FFFCFA55 45%, #FFFCFAEE 85%, #FFFCFAFF 100%)',
          }}
        />
        <InviteMusicPlayer musicUrl={data.musicUrl} theme={{ variant: 'rosa', tokens }} />
      </section>

      <section
        className="flex flex-col items-center gap-3 px-7 pb-9 pt-10"
        style={{ backgroundColor: tokens.surface }}
      >
        <SectionMarker>01 · Os noivos</SectionMarker>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span
            className="text-4xl"
            style={{ color: tokens.accent, fontFamily: tokens.fontDisplay }}
          >
            {data.brideName || 'Noiva'}
          </span>
          <span
            className="text-[28px]"
            style={{ color: tokens.accentLight, fontFamily: tokens.fontSerif }}
          >
            &
          </span>
          <span
            className="text-4xl"
            style={{ color: tokens.accent, fontFamily: tokens.fontDisplay }}
          >
            {data.groomName || 'Noivo'}
          </span>
        </div>
        <p
          className="text-center text-[15px] italic"
          style={{ fontFamily: tokens.fontSerif }}
        >
          Esperamos por você!
        </p>
        <div className="flex w-full flex-col gap-1">
          <EditorialDivider />
          <EditorialDivider />
        </div>
      </section>

      <section className="flex flex-col gap-2 px-8 pb-6 pt-8">
        <SectionMarker>02 · O convite</SectionMarker>
        <p className="text-[21px] leading-8" style={{ fontFamily: tokens.fontSerif }}>
          {data.welcomeMessage ||
            'É com imensa alegria que convidamos você para celebrar conosco este momento único.'}
        </p>
        <span
          className="text-[72px] leading-[43px]"
          style={{ color: tokens.accentLight, fontFamily: tokens.fontSerif }}
          aria-hidden
        >
          “
        </span>
      </section>

      {data.coupleStory && (
        <section
          className="flex flex-row gap-3.5 px-5 py-6"
          style={{ backgroundColor: tokens.surface }}
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
            <SectionMarker>03 · Nossa história</SectionMarker>
            <p className="text-sm leading-[22px]" style={{ fontFamily: tokens.fontSerif }}>
              {data.coupleStory}
            </p>
          </div>
        </section>
      )}

      {dateParts && (
        <>
          <section
            className="flex flex-col items-center px-7 py-8"
            style={{ backgroundColor: tokens.surface }}
          >
            <div className="flex items-end justify-center gap-3">
              <span
                className="text-[13px] capitalize tracking-[0.15px]"
                style={{ color: tokens.textMuted, fontFamily: tokens.fontSerif }}
              >
                {dateParts.month}
              </span>
              <span
                className="text-[72px] leading-[61px]"
                style={{ color: tokens.accent, fontFamily: tokens.fontSerif }}
              >
                {dateParts.day}
              </span>
              <span
                className="text-[13px] tracking-[0.15px]"
                style={{ color: tokens.textMuted, fontFamily: tokens.fontSerif }}
              >
                {dateParts.year}
              </span>
            </div>
            <p
              className="mt-2 text-[10px] capitalize"
              style={{ color: tokens.textMuted, fontFamily: tokens.fontSans }}
            >
              {dateParts.weekday} · {formatWeddingTime(data.weddingTime) || 'Horário'}
            </p>
          </section>

          <section className="flex flex-col items-center gap-2.5 px-[18px] py-6">
            <p className="text-[15px] capitalize" style={{ fontFamily: tokens.fontSerif }}>
              {dateParts.month} {dateParts.year}
            </p>
            <div className="flex w-full flex-col gap-1">
              <div className="grid grid-cols-7 gap-0.5">
                {getWeekdayLabels().map((label) => (
                  <span
                    key={label}
                    className="text-center text-[9px]"
                    style={{ color: tokens.textMuted, fontFamily: tokens.fontSans }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              {calendarRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-7 gap-0.5">
                  {row.map((cell, cellIndex) => {
                    if (cell.kind === 'empty') {
                      return <div key={cellIndex} className="h-9" />
                    }

                    if (cell.isWeddingDay) {
                      return (
                        <div
                          key={cellIndex}
                          className="flex h-9 items-center justify-center rounded-full text-[10px] text-white"
                          style={{ backgroundColor: tokens.accent, fontFamily: tokens.fontSans }}
                        >
                          {cell.day}
                        </div>
                      )
                    }

                    return (
                      <span
                        key={cellIndex}
                        className="flex h-9 items-center justify-center text-[9px]"
                        style={{ color: tokens.textMuted, fontFamily: tokens.fontSans }}
                      >
                        {cell.day}
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section
        className="flex flex-col items-center gap-4 px-6 py-7"
        style={{ backgroundColor: tokens.surface }}
      >
        <SectionMarker>06 · Ações rápidas</SectionMarker>
        <div className="flex justify-center gap-8">
          <button
            type="button"
            onClick={handleConfirmPresence}
            className="flex flex-col items-center gap-2.5 transition-[transform] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
          >
            <span
              className="flex size-16 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: tokens.accent }}
            >
              <CalendarCheck className="size-[22px]" strokeWidth={1.75} />
            </span>
            <span
              className="text-center text-[10px] leading-[13px]"
              style={{ fontFamily: tokens.fontSans }}
            >
              Confirmar
              <br />
              presença
            </span>
          </button>
          <button
            type="button"
            onClick={handleOpenMap}
            className="flex flex-col items-center gap-2.5 transition-[transform] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
          >
            <span
              className="flex size-16 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: tokens.accent }}
            >
              <MapPin className="size-[22px]" strokeWidth={1.75} />
            </span>
            <span
              className="text-center text-[10px] leading-[13px]"
              style={{ fontFamily: tokens.fontSans }}
            >
              Como
              <br />
              chegar
            </span>
          </button>
        </div>
      </section>

      <ExtendedVenueSection
        theme={tokens}
        venueName={data.venueName}
        venueAddress={data.venueAddress}
        sectionLabel="07 · Onde será"
      />

      <section className="flex flex-col items-center gap-3 px-6 py-7">
        <p
          className="w-full text-center text-[13px]"
          style={{ color: tokens.textMuted, fontFamily: tokens.fontSerif }}
        >
          Confirme sua presença
        </p>
        <button
          type="button"
          onClick={handleConfirmPresence}
          className="w-full rounded px-6 py-4 text-xs text-white transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
          style={{ backgroundColor: tokens.accent, fontFamily: tokens.fontSans }}
        >
          Confirmar presença
        </button>
      </section>

      <GalleryColumnsSection
        galleryPhotos={galleryPhotos}
        theme={tokens}
        sectionLabel="08 · Galeria"
      />

      <footer
        className="flex flex-col items-center gap-2 px-7 pb-14 pt-10"
        style={{ backgroundColor: tokens.surface }}
      >
        <p
          className="text-center text-base italic leading-[26px]"
          style={{ fontFamily: tokens.fontSerif }}
        >
          Esperamos contar com sua presença neste dia tão especial.
        </p>
        <p
          className="text-[10px]"
          style={{ color: tokens.textMuted, fontFamily: tokens.fontSans }}
        >
          Feito com{' '}
          <Link href="/criar" className="underline-offset-2 hover:underline">
            CasarMe
          </Link>
        </p>
        <p
          className="text-[8px] tracking-[0.2px]"
          style={{ color: tokens.textMuted, fontFamily: tokens.fontSans }}
        >
          {groomInitial} · {brideInitial}
        </p>
      </footer>
    </div>
  )
}
