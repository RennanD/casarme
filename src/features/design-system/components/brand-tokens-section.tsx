import { cn } from '@/src/shared/lib/cn'

import { BRAND_TOKEN_SWATCHES } from '../model/brand-tokens'

export function BrandTokensSection() {
  return (
    <section
      aria-labelledby="brand-tokens-heading"
      className="space-y-6 px-6 py-9 md:px-10 xl:px-16"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground">
          01 / CORES
        </p>
        <h2 id="brand-tokens-heading" className="sr-only">
          Cores
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-foreground">
          Neutros quase brancos, contraste legível e dourado reservado para ações
          primárias. Superfícies sage, pêssego e lilás para bandas de marketing.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {BRAND_TOKEN_SWATCHES.map(
          ({ name, label, value, className, outlined }) => (
            <li
              key={name}
              className="h-52 space-y-3 rounded-xl border border-border bg-card p-3"
            >
              <div
                className={cn(
                  'h-28 rounded-lg',
                  outlined && 'border border-border',
                  className,
                )}
                aria-hidden="true"
              />
              <p className="text-sm leading-5 text-foreground">
                {label} · {name}
                <br />
                <span className="font-mono text-muted-foreground">
                  {value}
                </span>
              </p>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
