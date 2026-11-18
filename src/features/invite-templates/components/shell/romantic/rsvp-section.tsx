'use client'

import { MessageCircle } from 'lucide-react'

import { Button } from '@/src/components/ui/button'

import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'
import { openWhatsAppRsvp } from '../../../model/whatsapp-rsvp'

type RomanticRsvpSectionProps = {
  whatsapp?: InviteShellData['whatsapp']
}

export function RomanticRsvpSection({ whatsapp }: RomanticRsvpSectionProps) {
  const handleConfirmPresence = () => {
    if (!whatsapp) {
      alert('WhatsApp não configurado para este convite.')
      return
    }

    openWhatsAppRsvp(whatsapp)
  }

  return (
    <section id="confirmar" className="px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h2
          className="mb-8 text-center font-serif text-4xl"
          style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
        >
          Confirme sua Presença
        </h2>
        <p className="mb-8 text-center" style={{ color: ROMANTIC_THEME.textMuted }}>
          Sua presença é muito importante para nós! Clique no botão abaixo para confirmar via
          WhatsApp.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleConfirmPresence}
            size="lg"
            className="flex items-center gap-2 px-12 text-white transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
            style={{ backgroundColor: ROMANTIC_THEME.accent }}
          >
            <MessageCircle className="size-5" />
            Confirmar Presença via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
