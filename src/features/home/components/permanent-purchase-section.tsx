import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Button, Link } from '@/src/shared/ui'

const PURCHASE_BENEFITS = [
  'Convite disponível permanentemente',
  'Compartilhamento por um único link',
  'Sem mensalidade para manter o convite',
]

export function PermanentPurchaseSection() {
  return (
    <section className="bg-secondary px-6 py-8 lg:px-8 lg:py-9" aria-labelledby="purchase-title">
      <div className="mx-auto flex max-w-7xl flex-col justify-center gap-8 p-6 md:flex-row md:items-center md:gap-16 lg:p-9">
        <div className="w-full max-w-lg space-y-2.5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">SEM MENSALIDADE</p>
          <h2 id="purchase-title" className="font-serif text-3xl leading-tight font-normal">Uma compra. Um convite permanente.</h2>
          <p className="text-xs leading-snug text-muted-foreground">O valor depende do modelo escolhido e é pago uma única vez. O link do convite continua disponível.</p>
        </div>
        <div className="w-full max-w-lg space-y-2.5">
          <ul className="space-y-2.5 text-xs">
            {PURCHASE_BENEFITS.map((benefit) => <li key={benefit}>✓&nbsp; {benefit}</li>)}
          </ul>
          <Button asChild className="h-auto rounded-full px-5 py-3 text-xs">
            <Link href={`#${HOME_ANCHORS.templates}`}>Encontrar meu modelo&nbsp; →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
