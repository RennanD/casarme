import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'
import { FloralDivider } from '../floral-divider'

type RomanticCoupleSectionProps = {
  data: Pick<InviteShellData, 'groomName' | 'brideName' | 'groomStory' | 'brideStory'>
  groomPhoto?: string | null
  bridePhoto?: string | null
}

export function RomanticCoupleSection({
  data,
  groomPhoto,
  bridePhoto,
}: RomanticCoupleSectionProps) {
  return (
    <section id="casal" className="px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <FloralDivider />
        </div>

        <div className="mb-12 grid gap-12 md:grid-cols-2">
          <div className="text-center">
            <div
              className="mx-auto mb-6 size-48 overflow-hidden rounded-full border-4 shadow-lg"
              style={{ borderColor: ROMANTIC_THEME.accent }}
            >
              <img
                src={groomPhoto || '/placeholder.svg?height=300&width=300'}
                alt={data.groomName}
                className="size-full object-cover"
              />
            </div>
            <h3
              className="mb-3 font-serif text-2xl"
              style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
            >
              {data.groomName || 'Noivo'}
            </h3>
            {data.groomStory && (
              <p className="leading-relaxed" style={{ color: ROMANTIC_THEME.textMuted }}>
                {data.groomStory}
              </p>
            )}
          </div>

          <div className="text-center">
            <div
              className="mx-auto mb-6 size-48 overflow-hidden rounded-full border-4 shadow-lg"
              style={{ borderColor: ROMANTIC_THEME.accent }}
            >
              <img
                src={bridePhoto || '/placeholder.svg?height=300&width=300'}
                alt={data.brideName}
                className="size-full object-cover"
              />
            </div>
            <h3
              className="mb-3 font-serif text-2xl"
              style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
            >
              {data.brideName || 'Noiva'}
            </h3>
            {data.brideStory && (
              <p className="leading-relaxed" style={{ color: ROMANTIC_THEME.textMuted }}>
                {data.brideStory}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
