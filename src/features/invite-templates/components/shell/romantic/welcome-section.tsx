import type { InviteShellData } from '../../../model/invite-shell-types'
import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'
import { FloralDivider } from '../floral-divider'

type RomanticWelcomeSectionProps = {
  welcomeMessage: InviteShellData['welcomeMessage']
}

export function RomanticWelcomeSection({ welcomeMessage }: RomanticWelcomeSectionProps) {
  return (
    <section id="boas-vindas" className="px-4 pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8">
          <FloralDivider />
        </div>

        <h2
          className="mb-6 font-serif text-4xl"
          style={{ color: ROMANTIC_THEME.text, fontFamily: ROMANTIC_THEME.fontSerif }}
        >
          Boas-vindas
        </h2>
        <p className="text-lg leading-relaxed" style={{ color: ROMANTIC_THEME.textMuted }}>
          {welcomeMessage ||
            'Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!'}
        </p>
      </div>
    </section>
  )
}
