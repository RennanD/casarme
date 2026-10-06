import { cn } from '@/src/shared/lib/cn'

import { BRAND_TOKEN_SWATCHES } from '../model/brand-tokens'

export function BrandTokensSection() {
  return (
    <section aria-labelledby="brand-tokens-heading" className="space-y-8">
      <div className="space-y-2">
        <h2 id="brand-tokens-heading" className="h2">
          Brand Tokens
        </h2>
        <p className="body text-muted-foreground">
          Mapeamento visual dos tokens semânticos Amore — verifique que cada
          swatch corresponde ao valor CSS em{' '}
          <code className="font-mono text-sm">src/app/v2/globals.css</code>.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {BRAND_TOKEN_SWATCHES.map(({ name, className }) => (
          <li key={name} className="space-y-2">
            <div
              className={cn(
                'h-20 rounded-lg border border-border shadow-xs',
                className,
              )}
              aria-hidden="true"
            />
            <p className="font-mono text-xs text-muted-foreground">{name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
