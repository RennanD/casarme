import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Button, Link } from '@/src/shared/ui'

export function PermanentPurchaseSection() {
  return (
    <section className="bg-secondary py-14 lg:py-16" aria-labelledby="purchase-title">
      <div className="home-shell flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-lg space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Pagamento único</p>
          <h2 id="purchase-title" className="font-serif text-3xl leading-tight font-normal">Um convite permanente. Sem mensalidade.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Você paga uma única vez pelo modelo escolhido. O link do convite continua disponível para compartilhar quando quiser.
          </p>
        </div>
        <Button asChild className="h-auto shrink-0 rounded-full px-6 py-3.5 text-sm">
          <Link href={`#${HOME_ANCHORS.templates}`}>Escolher meu modelo</Link>
        </Button>
      </div>
    </section>
  )
}
