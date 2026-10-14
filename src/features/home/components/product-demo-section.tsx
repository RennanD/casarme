import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Link } from '@/src/shared/ui'

export function ProductDemoSection() {
  return (
    <section id={HOME_ANCHORS.demo} className="scroll-mt-20 bg-white px-6 py-8 lg:px-8 lg:py-9" aria-labelledby="product-demo-title">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 bg-white p-6 lg:flex-row lg:gap-8 lg:px-0">
        <div className="relative h-96 w-full max-w-lg shrink-0">
          <figure className="absolute left-0 top-0 h-[63.4%] w-[60%] overflow-hidden rounded-lg">
            <Image src="/images/home-redesigned/gallery-couple-main.png" alt="Casal celebrando o casamento ao ar livre" fill className="object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="300px" />
          </figure>
          <figure className="absolute left-[62.4%] top-0 h-[46.3%] w-[36%] overflow-hidden rounded-lg">
            <Image src="/images/home-redesigned/gallery-celebration.png" alt="Celebração do casamento com amigos e familiares" fill className="object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="180px" />
          </figure>
          <figure className="absolute left-[62.4%] top-[49.3%] h-[50.7%] w-[36%] overflow-hidden rounded-lg">
            <Image src="/images/home-redesigned/gallery-couple-portrait.png" alt="Retrato dos noivos" fill className="object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="180px" />
          </figure>
        </div>

        <div className="w-full max-w-md space-y-3.5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">UM CONVITE, TODOS OS DETALHES</p>
          <h2 id="product-demo-title" className="font-serif text-3xl leading-tight font-normal text-foreground">Mais do que uma data. Um lugar para contar a história de vocês.</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">Reúnam as informações do grande dia em uma página que seus convidados podem abrir direto no celular.</p>
          <ul className="space-y-2 text-xs text-foreground">
            <li>✓&nbsp; Localização com acesso ao mapa</li>
            <li>✓&nbsp; Confirmação de presença pelo WhatsApp</li>
            <li>✓&nbsp; Prévia do convite antes de comprar</li>
          </ul>
          <Link href="/exemplo/garden" variant="nav" className="inline-block pt-1 text-xs font-semibold">
            Veja a demonstração completa&nbsp; →
          </Link>
        </div>
      </div>
    </section>
  )
}
