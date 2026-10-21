'use client'

import Image from 'next/image'
import { Calendar, Clock, MapPin } from 'lucide-react'

import { Button } from '@/src/components/ui/button'

import { formatWeddingDate } from '../../../model/wedding-date'
import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'
import { FloralDivider } from '../floral-divider'

type RomanticCeremonySectionProps = {
  data: Pick<InviteShellData, 'weddingDate' | 'weddingTime' | 'venueName' | 'venueAddress'>
}

export function RomanticCeremonySection({ data }: RomanticCeremonySectionProps) {
  return (
    <section id="cerimonia" className="relative overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute left-0 top-0 size-96 opacity-10">
        <Image
          src="/watercolor-pink-roses-corner-decoration.jpg"
          alt=""
          width={400}
          height={400}
          className="size-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rotate-180 opacity-10">
        <Image
          src="/watercolor-pink-roses-corner-decoration.jpg"
          alt=""
          width={400}
          height={400}
          className="size-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8">
          <FloralDivider />
        </div>

        <h2
          className="mb-12 text-center font-serif text-4xl"
          style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
        >
          Cerimônia & Recepção
        </h2>

        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-3xl border-2 bg-white p-8 shadow-2xl md:p-12"
            style={{ borderColor: `${ROMANTIC_THEME.accent}33` }}
          >
            <div className="mb-10 text-center">
              <div
                className="mb-4 inline-block rounded-full p-4"
                style={{ backgroundColor: ROMANTIC_THEME.bg }}
              >
                <MapPin className="size-10" style={{ color: ROMANTIC_THEME.accent }} />
              </div>
              <h3
                className="mb-3 font-serif text-3xl"
                style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
              >
                {data.venueName || 'Local da Cerimônia'}
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: ROMANTIC_THEME.textMuted }}>
                {data.venueAddress || 'Endereço completo'}
              </p>
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-2">
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: `linear-gradient(to bottom right, ${ROMANTIC_THEME.bg}, ${ROMANTIC_THEME.bgGradient})`,
                }}
              >
                <Calendar className="mx-auto mb-3 size-8" style={{ color: ROMANTIC_THEME.accent }} />
                <p className="mb-2 text-sm font-medium" style={{ color: ROMANTIC_THEME.textMuted }}>
                  Data
                </p>
                <p className="text-lg font-semibold" style={{ color: ROMANTIC_THEME.text }}>
                  {formatWeddingDate(data.weddingDate) || 'Data do casamento'}
                </p>
              </div>

              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: `linear-gradient(to bottom right, ${ROMANTIC_THEME.bg}, ${ROMANTIC_THEME.bgGradient})`,
                }}
              >
                <Clock className="mx-auto mb-3 size-8" style={{ color: ROMANTIC_THEME.accent }} />
                <p className="mb-2 text-sm font-medium" style={{ color: ROMANTIC_THEME.textMuted }}>
                  Horário
                </p>
                <p className="text-lg font-semibold" style={{ color: ROMANTIC_THEME.text }}>
                  {data.weddingTime || 'Horário'}
                </p>
              </div>
            </div>

            <Button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
                  '_blank',
                )
              }
              className="w-full rounded-full py-6 text-lg text-white shadow-lg transition-[transform,background-color] duration-150 ease-out enabled:active:scale-[0.96] motion-reduce:transition-none motion-reduce:enabled:active:scale-100"
              style={{ backgroundColor: ROMANTIC_THEME.accent }}
            >
              <MapPin className="mr-2 size-5" />
              Como Chegar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
