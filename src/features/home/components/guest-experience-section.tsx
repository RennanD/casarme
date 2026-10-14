import { HomeCheckList } from '@/src/features/home/components/home-check-list'
import { HomeImage } from '@/src/features/home/components/home-image'
import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Link } from '@/src/shared/ui'

const EXPERIENCE_POINTS = [
  'Cerimônia, recepção e horários no mesmo lugar',
  'Endereço com acesso ao mapa',
  'Confirmação de presença pelo WhatsApp',
] as const

export function GuestExperienceSection() {
  return (
    <section
      id={HOME_ANCHORS.guestExperience}
      className="scroll-mt-20 border-t border-border/60 bg-background py-12 lg:py-16"
      aria-labelledby="guest-experience-title"
    >
      <div className="home-shell">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">As informações do casamento, fora dos grupos</p>
          <h2 id="guest-experience-title" className="font-serif text-3xl leading-tight font-normal lg:text-4xl">
            Um link, um recado. Um pedacinho de quem convida.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A data fica no grupo da família. O endereço, no celular de um amigo. Em vez de repetir tudo várias vezes, compartilhem um convite com todos os detalhes.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-14">
          <figure className="shadow-polaroid relative aspect-[48/43] h-auto w-full max-w-lg shrink-0 overflow-hidden rounded-2xl lg:aspect-auto lg:h-[28rem] lg:max-w-[34rem]">
            <HomeImage
              src="/images/home-redesigned/invitation-phone.webp"
              alt="Convite digital aberto no celular"
              fill
              className="image-outline object-cover"
              sizes="(max-width: 1024px) 100vw, 544px"
            />
            <figcaption className="absolute bottom-4 left-4 flex max-w-[14rem] flex-col gap-0.5 rounded-xl border border-transparent bg-card/95 px-3 py-2 shadow-sm backdrop-blur-sm">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground">POR ANA · EXEMPLO ILUSTRATIVO</span>
              <span className="font-serif text-sm italic text-foreground">Que bom ter todo mundo por perto.</span>
            </figcaption>
          </figure>

          <div className="w-full max-w-md space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cada convidado abre o link no navegador do celular. Vocês também conseguem ver quem confirmou e manter tudo organizado.
            </p>
            <HomeCheckList items={EXPERIENCE_POINTS} />
            <Link
              href="#templates"
              variant="nav"
              className="inline-block rounded-full bg-secondary px-4 py-2 text-xs font-semibold"
            >
              Veja os modelos disponíveis
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
