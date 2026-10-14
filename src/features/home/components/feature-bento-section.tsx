import { MapPin, MessageCircle } from 'lucide-react'

import { HomeIconBadge } from '@/src/features/home/components/home-icon-badge'
import { HomeImage } from '@/src/features/home/components/home-image'
import { HOME_BENTO_SECTION, HOME_FEATURE_HIGHLIGHTS } from '@/src/features/home/model/copy'

export function FeatureBentoSection() {
  const [romanticHighlight, privacyHighlight] = HOME_FEATURE_HIGHLIGHTS

  return (
    <section className="bg-background py-12 lg:py-16" aria-labelledby="bento-title">
      <div className="home-shell space-y-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{HOME_BENTO_SECTION.eyebrow}</p>
          <h2 id="bento-title" className="font-serif text-3xl leading-tight font-normal">{HOME_BENTO_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{HOME_BENTO_SECTION.subtitle}</p>
        </header>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <article className="flex min-h-52 flex-col items-stretch justify-between gap-4 rounded-2xl bg-surface-sage p-5 lg:flex-row lg:items-center">
            <div className="max-w-sm space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Localização</p>
              <h3 className="font-serif text-xl leading-tight">Todo mundo sabe como chegar.</h3>
              <p className="text-xs leading-snug text-muted-foreground">Endereço e acesso ao mapa no próprio convite.</p>
            </div>
            <div className="shadow-elevated flex h-36 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-transparent bg-card p-3 text-center lg:h-40 lg:w-48">
              <HomeIconBadge icon={MapPin} size="lg" />
              <p className="font-serif text-xs">Casa das Oliveiras</p>
              <span className="text-xs text-muted-foreground">Abrir rota</span>
            </div>
          </article>

          <article className="flex min-h-52 flex-col justify-between gap-3 rounded-2xl bg-surface-peach p-5">
            <HomeIconBadge icon={MessageCircle} size="lg" />
            <h3 className="font-serif text-xl leading-tight">Confirme sem complicação.</h3>
            <p className="text-xs leading-snug text-muted-foreground">Quem recebe pode responder direto pelo WhatsApp, sem criar conta.</p>
            <span className="shadow-sm w-fit rounded-full border border-transparent bg-card px-3 py-2 text-xs">Confirmar presença</span>
          </article>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {romanticHighlight.image && (
              <figure className="shadow-elevated relative mx-auto h-52 w-36 shrink-0 overflow-hidden rounded-xl lg:mx-0">
                <HomeImage
                  src={romanticHighlight.image}
                  alt={romanticHighlight.alt ?? ''}
                  fill
                  className="image-outline object-contain bg-secondary/40 p-2"
                  sizes="(max-width: 768px) 144px, 180px"
                />
              </figure>
            )}
            <div className="space-y-2 text-center lg:text-left">
              {romanticHighlight.eyebrow && (
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{romanticHighlight.eyebrow}</p>
              )}
              <h3 className="font-serif text-2xl leading-tight">{romanticHighlight.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{romanticHighlight.description}</p>
            </div>
          </article>

          <article className="flex flex-col justify-center gap-2 rounded-2xl bg-surface-lilac p-6 lg:p-8">
            <h3 className="font-serif text-2xl leading-tight">{privacyHighlight.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{privacyHighlight.description}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
