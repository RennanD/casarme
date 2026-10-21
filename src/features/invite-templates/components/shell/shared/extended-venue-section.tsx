'use client'

import { MapPin } from 'lucide-react'

import { openVenueMap } from '../../../model/venue-map'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'
import { VenueMapEmbed } from './venue-map-embed'

type ExtendedVenueSectionProps = {
  theme: ExtendedInviteTheme
  venueName: string
  venueAddress: string
  sectionLabel?: string
}

export function ExtendedVenueSection({
  theme,
  venueName,
  venueAddress,
  sectionLabel = 'Onde será',
}: ExtendedVenueSectionProps) {
  return (
    <>
      <section
        className="flex flex-col gap-2.5 px-7 pb-5 pt-7"
        style={{ backgroundColor: theme.surface }}
      >
        <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
        <h2
          className="text-2xl"
          style={{ color: theme.accent, fontFamily: theme.fontSerif }}
        >
          Onde será?
        </h2>
        <p className="text-[17px]" style={{ fontFamily: theme.fontSerif }}>
          {venueName || 'Local da Cerimônia'}
        </p>
        <p
          className="text-sm leading-[21px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
        >
          {venueAddress || 'Endereço completo'}
        </p>
        <button
          type="button"
          onClick={() => openVenueMap(venueAddress)}
          className="flex items-center gap-2 px-5 py-3 transition-[transform,opacity] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
        >
          <MapPin className="size-3.5" style={{ color: theme.accent }} strokeWidth={1.75} />
          <span
            className="text-[11px]"
            style={{ color: theme.accent, fontFamily: theme.fontSans }}
          >
            Abrir no Google Maps
          </span>
        </button>
      </section>

      {venueAddress && (
        <VenueMapEmbed
          address={venueAddress}
          title={venueName || 'Local do evento'}
          className="h-[220px] w-full"
        />
      )}
    </>
  )
}
