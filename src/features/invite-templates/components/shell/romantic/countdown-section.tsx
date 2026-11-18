'use client'

import { useCountdown } from '../../../hooks/use-countdown'
import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'

type RomanticCountdownSectionProps = {
  data: Pick<InviteShellData, 'weddingDate' | 'weddingTime'>
}

const COUNTDOWN_LABELS = ['Dias', 'Horas', 'Minutos', 'Segundos'] as const

export function RomanticCountdownSection({ data }: RomanticCountdownSectionProps) {
  const timeLeft = useCountdown(data.weddingDate, data.weddingTime)
  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]

  return (
    <section
      className="px-4 pb-16"
      style={{ background: `linear-gradient(to bottom, ${ROMANTIC_THEME.bg}, ${ROMANTIC_THEME.bgGradient})` }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="mb-8 font-serif text-3xl"
          style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
        >
          Contagem Regressiva
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={COUNTDOWN_LABELS[index]}
              className="rounded-2xl border-2 bg-white p-6 shadow-lg"
              style={{ borderColor: `${ROMANTIC_THEME.accent}33` }}
            >
              <div className="mb-2 text-4xl font-bold" style={{ color: ROMANTIC_THEME.accent }}>
                {value}
              </div>
              <div
                className="text-sm uppercase tracking-wider"
                style={{ color: ROMANTIC_THEME.textMuted }}
              >
                {COUNTDOWN_LABELS[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
