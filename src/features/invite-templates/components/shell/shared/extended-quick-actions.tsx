'use client'

import { CalendarCheck, MapPin } from 'lucide-react'

import { openVenueMap } from '../../../model/venue-map'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { openWhatsAppRsvp } from '../../../model/whatsapp-rsvp'
import { SectionMarker } from './section-marker'

type ExtendedQuickActionsProps = {
  theme: ExtendedInviteTheme
  venueAddress: string
  whatsapp?: string
}

export function ExtendedQuickActions({
  theme,
  venueAddress,
  whatsapp,
}: ExtendedQuickActionsProps) {
  const handleConfirmPresence = () => {
    if (!whatsapp) {
      alert('WhatsApp não configurado para este convite.')
      return
    }

    openWhatsAppRsvp(whatsapp)
  }

  return (
    <section
      className="flex flex-col items-center gap-4 px-6 py-7"
      style={{ backgroundColor: theme.surface }}
    >
      <SectionMarker theme={theme}>Ações rápidas</SectionMarker>
      <div className="flex justify-center gap-8">
        <button
          type="button"
          onClick={handleConfirmPresence}
          className="flex flex-col items-center gap-2.5 transition-[transform] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
        >
          <span
            className="flex size-16 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: theme.accent }}
          >
            <CalendarCheck className="size-[22px]" strokeWidth={1.75} />
          </span>
          <span
            className="text-center text-[10px] leading-[13px]"
            style={{ fontFamily: theme.fontSans }}
          >
            Confirmar
            <br />
            presença
          </span>
        </button>
        <button
          type="button"
          onClick={() => openVenueMap(venueAddress)}
          className="flex flex-col items-center gap-2.5 transition-[transform] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
        >
          <span
            className="flex size-16 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: theme.accent }}
          >
            <MapPin className="size-[22px]" strokeWidth={1.75} />
          </span>
          <span
            className="text-center text-[10px] leading-[13px]"
            style={{ fontFamily: theme.fontSans }}
          >
            Como
            <br />
            chegar
          </span>
        </button>
      </div>
    </section>
  )
}
