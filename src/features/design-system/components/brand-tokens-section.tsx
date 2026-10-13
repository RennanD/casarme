import { cn } from '@/src/shared/lib/cn'

import { BRAND_TOKEN_SWATCHES } from '../model/brand-tokens'

export function BrandTokensSection() {
  return (
    <section
      aria-labelledby="brand-tokens-heading"
      className="space-y-6 px-6 py-9 md:min-h-[620px] md:px-10 xl:px-16"
    >
      <div className="space-y-3">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground">
          01 / CORES
        </p>
        <h2 id="brand-tokens-heading" className="sr-only">
          Cores
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-foreground">
          Neutros quase brancos, contraste legível e dourado reservado para ações
          primárias.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {BRAND_TOKEN_SWATCHES.map(
          ({ name, label, value, className, outlined }) => (
            <li
              key={name}
              className="h-[210px] space-y-3 rounded-xl border border-border bg-card p-3"
            >
              <div
                className={cn(
                  'h-[105px] rounded-lg',
                  outlined && 'border border-border',
                  className,
                )}
                aria-hidden="true"
              />
              <p className="text-[13px] leading-5 text-foreground">
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
