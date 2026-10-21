'use client'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { openWhatsAppRsvp } from '../../../model/whatsapp-rsvp'

type ExtendedRsvpCtaProps = {
  theme: ExtendedInviteTheme
  whatsapp?: string
}

export function ExtendedRsvpCta({ theme, whatsapp }: ExtendedRsvpCtaProps) {
  const handleConfirmPresence = () => {
    if (!whatsapp) {
      alert('WhatsApp não configurado para este convite.')
      return
    }

    openWhatsAppRsvp(whatsapp)
  }

  return (
    <section className="flex flex-col items-center gap-3 px-6 py-7">
      <p
        className="w-full text-center text-[13px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
      >
        Confirme sua presença
      </p>
      <button
        type="button"
        onClick={handleConfirmPresence}
        className="w-full rounded px-6 py-4 text-xs text-white transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
        style={{ backgroundColor: theme.accent, fontFamily: theme.fontSans }}
      >
        Confirmar presença
      </button>
    </section>
  )
}
