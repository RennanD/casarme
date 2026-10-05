import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System — CasarMe v2',
}

const typographySamples = [
  {
    className: 'display',
    label: 'display',
    sample: 'Convite digital elegante',
  },
  {
    className: 'h1',
    label: 'h1',
    sample: 'Heading level 1',
  },
  {
    className: 'h2',
    label: 'h2',
    sample: 'Heading level 2',
  },
  {
    className: 'h3',
    label: 'h3',
    sample: 'Heading level 3',
  },
  {
    className: 'lead',
    label: 'lead',
    sample:
      'Texto introdutório para seções — maior que body, cor muted para hierarquia suave.',
  },
  {
    className: 'body',
    label: 'body',
    sample:
      'Corpo padrão para parágrafos e conteúdo. Use em blocos de texto, descrições e labels longos.',
  },
  {
    className: 'body-sm',
    label: 'body-sm',
    sample: 'Texto auxiliar compacto — metadados, captions e detalhes secundários.',
  },
  {
    className: 'muted',
    label: 'muted',
    sample: 'Texto desativado ou de apoio com cor muted-foreground.',
  },
] as const

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-10">
        <p className="body-sm text-muted-foreground">CasarMe v2 · Internal</p>
        <h1 className="display">Design System</h1>
        <p className="lead">
          Referência visual para tokens, tipografia e primitivos da v2.
        </p>
      </header>

      <section aria-labelledby="typography-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="typography-heading" className="h2">
            Typography
          </h2>
          <p className="body text-muted-foreground">
            Utilitários CSS em <code className="font-mono text-sm">@layer components</code>.
            Aplique as classes diretamente — sem componentes React de tipografia.
          </p>
        </div>

        <ul className="divide-y divide-border">
          {typographySamples.map(({ className, label, sample }) => (
            <li key={label} className="grid gap-4 py-8 md:grid-cols-[8rem_1fr]">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  .{label}
                </p>
              </div>
              <p className={className}>{sample}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
