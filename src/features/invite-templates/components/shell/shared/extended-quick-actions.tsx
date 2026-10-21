'use client'

import type { ReactNode } from 'react'
import { CalendarCheck, MapPin } from 'lucide-react'

import { openVenueMap } from '../../../model/venue-map'
import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { openWhatsAppRsvp } from '../../../model/whatsapp-rsvp'

type ExtendedQuickActionsProps = {
  theme: ExtendedInviteTheme
  venueAddress: string
  whatsapp?: string
}

function ActionCard({
  theme,
  icon: Icon,
  label,
  onClick,
}: {
  theme: ExtendedInviteTheme
  icon: typeof CalendarCheck
  label: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-2 rounded-lg bg-white px-3 py-4 transition-[transform] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
    >
      <span
        className="flex size-10 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: theme.accent }}
      >
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <span
        className="text-center text-[10px] leading-[13px]"
        style={{ fontFamily: theme.fontSans, color: theme.text }}
      >
        {label}
      </span>
    </button>
  )
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
    <section className="flex flex-col items-center gap-3 px-6 py-6">
      <div className="flex w-full gap-2.5">
        <ActionCard
          theme={theme}
          icon={CalendarCheck}
          label={
            <>
              Confirmar
              <br />
              presença
            </>
          }
          onClick={handleConfirmPresence}
        />
        <ActionCard
          theme={theme}
          icon={MapPin}
          label={
            <>
              Como
              <br />
              chegar
            </>
          }
          onClick={() => openVenueMap(venueAddress)}
        />
      </div>
    </section>
  )
}
