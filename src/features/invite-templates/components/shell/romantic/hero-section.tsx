import Image from 'next/image'

import { formatWeddingDate } from '../../../model/wedding-date'
import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'

type RomanticHeroSectionProps = {
  data: Pick<InviteShellData, 'groomName' | 'brideName' | 'weddingDate'>
  heroPhoto?: string | null
}

export function RomanticHeroSection({ data, heroPhoto }: RomanticHeroSectionProps) {
  return (
    <section id="home" className="relative px-4 pt-24">
      <div className="pointer-events-none absolute right-0 top-0 size-64 opacity-30">
        <Image
          src="/watercolor-pink-roses-corner-decoration.jpg"
          alt=""
          width={400}
          height={400}
          className="size-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="relative mb-8 inline-block">
          <div className="pointer-events-none absolute -inset-12">
            <svg viewBox="0 0 400 400" className="size-full">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
                const rad = (angle * Math.PI) / 180
                const x = 200 + Math.cos(rad) * 160
                const y = 200 + Math.sin(rad) * 160
                return (
                  <g key={index} transform={`translate(${x},${y}) rotate(${angle})`}>
                    <ellipse cx="0" cy="0" rx="15" ry="20" fill={ROMANTIC_THEME.accent} opacity="0.6" />
                    <ellipse cx="0" cy="0" rx="10" ry="15" fill={ROMANTIC_THEME.accentLight} opacity="0.8" />
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="relative z-10 size-64 overflow-hidden rounded-full border-4 border-white shadow-2xl">
            <Image
              src={heroPhoto || '/placeholder.svg?height=400&width=400'}
              alt={`${data.groomName} e ${data.brideName}`}
              width={400}
              height={400}
              className="size-full object-cover"
            />
          </div>
        </div>

        <h1
          className="mb-2 font-serif text-5xl text-[#3E3E3E] md:text-6xl"
          style={{ fontFamily: ROMANTIC_THEME.fontSerif }}
        >
          {data.groomName || 'Noivo'}{' '}
          <span style={{ color: ROMANTIC_THEME.accent }}>&</span>{' '}
          {data.brideName || 'Noiva'}
        </h1>

        <div className="my-6 flex items-center justify-center">
          <svg viewBox="0 0 200 40" className="h-8 w-48">
            <path
              d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20"
              stroke={ROMANTIC_THEME.accent}
              strokeWidth="1"
              fill="none"
            />
            <circle cx="100" cy="20" r="8" fill={ROMANTIC_THEME.accentLight} />
            <circle cx="100" cy="20" r="4" fill={ROMANTIC_THEME.accent} />
          </svg>
        </div>

        <p className="mb-8 text-xl" style={{ color: ROMANTIC_THEME.textMuted }}>
          {formatWeddingDate(data.weddingDate) || 'Data do casamento'}
        </p>
      </div>
    </section>
  )
}
