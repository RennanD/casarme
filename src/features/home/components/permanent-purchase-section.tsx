import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Button, Link } from '@/src/shared/ui'

const PURCHASE_BENEFITS = [
  'Convite disponível permanentemente',
  'Compartilhamento por um único link',
  'Sem mensalidade para manter o convite',
]

export function PermanentPurchaseSection() {
  return (
    <section className="bg-[#f8f6f2] px-6 py-8 lg:h-[340px] lg:px-0 lg:py-0" aria-labelledby="purchase-title">
      <div className="mx-auto flex max-w-[1080px] flex-col justify-center gap-8 p-6 md:flex-row md:items-center md:gap-[70px] lg:h-full lg:p-9">
        <div className="w-full max-w-[470px] space-y-[10px]">
          <p className="text-[10px] font-semibold tracking-[1.2px] text-muted-foreground">SEM MENSALIDADE</p>
          <h2 id="purchase-title" className="font-serif text-[30px] leading-[1.1] font-normal">Uma compra. Um convite permanente.</h2>
          <p className="text-xs leading-[1.45] text-muted-foreground">O valor depende do modelo escolhido e é pago uma única vez. O link do convite continua disponível.</p>
        </div>
        <div className="w-full max-w-[510px] space-y-[10px]">
          <ul className="space-y-[10px] text-xs">
            {PURCHASE_BENEFITS.map((benefit) => <li key={benefit}>✓&nbsp; {benefit}</li>)}
          </ul>
          <Button asChild className="h-auto rounded-full px-[18px] py-3 text-xs">
            <Link href={`#${HOME_ANCHORS.templates}`}>Encontrar meu modelo&nbsp; →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
