import { Button, Input, Label } from '@/src/shared/ui'

import { BrandTokensSection } from './brand-tokens-section'

export function DesignSystemShowcase() {
  return (
    <main className="mx-auto max-w-7xl pb-12">
      <header className="space-y-4 px-6 py-12 md:px-10 md:py-14 xl:px-16">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground">
          CASARME / DESIGN SYSTEM / VERSÃO 02
        </p>
        <h1 className="font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl">
          Dourado suave
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          Uma base mais leve para deixar o convite no centro. O dourado do Casarme
          assume o papel de ação e detalhe.
        </p>
      </header>

      <BrandTokensSection />

      <section
        aria-labelledby="typography-heading"
        className="grid gap-10 bg-card px-6 py-10 md:grid-cols-2 md:items-center md:gap-10 md:px-10 md:py-8 lg:gap-14 xl:px-16"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">
            02 / TIPOGRAFIA
          </p>
          <h2 id="typography-heading" className="sr-only">
            Tipografia
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Serif para emoção e títulos. Inter para clareza, formulários e
            informações práticas.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            O dia de vocês,
            <br />
            do jeito de vocês.
          </p>
          <p className="text-base text-foreground">
            Convites digitais feitos para celebrar cada detalhe.
          </p>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">
            LEGENDA · 11PX · INTER SEMIBOLD
          </p>
        </div>
      </section>

      <section
        aria-labelledby="buttons-heading"
        className="space-y-6 px-6 py-10 md:px-10 xl:px-16"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">
            03 / BOTÕES
          </p>
          <h2 id="buttons-heading" className="sr-only">
            Botões
          </h2>
          <p className="text-sm text-muted-foreground">
          Ação principal em dourado · texto branco.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Button size="lg" className="w-64">
            Criar meu convite&nbsp; →
          </Button>
          <Button variant="outline" size="lg" className="w-56">
            Ver demonstração
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="px-0 text-sm font-semibold text-foreground"
          >
            Voltar e editar&nbsp; ←
          </Button>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          Primário: iniciar, continuar e pagar. · Secundário: explorar e voltar. ·
          Altura mínima: 48px.
        </p>
      </section>

      <section
        aria-labelledby="forms-heading"
        className="grid gap-8 bg-secondary px-6 py-8 md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:py-9 xl:px-16"
      >
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">
            04 / FORMULÁRIOS
          </p>
          <h2 id="forms-heading" className="sr-only">
            Formulários
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Campos claros, rótulos sempre visíveis e fundos quase brancos para
            manter a leitura leve.
          </p>
        </div>

        <div className="min-h-24 space-y-2 rounded-xl border border-border bg-card p-4">
          <Label htmlFor="design-system-email" className="text-xs font-semibold">
            E-mail <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="design-system-email"
            type="email"
            placeholder="seuemail@exemplo.com"
            aria-required="true"
            className="border-transparent bg-transparent px-0 shadow-none focus-visible:border-transparent"
          />
        </div>
      </section>

      <footer className="px-6 pt-8 text-xs font-semibold tracking-widest text-muted-foreground md:px-10 xl:px-16">
        CASARME · PLAYFAIR DISPLAY + INTER · PALETA BASEADA NO DOURADO PRIMARY
      </footer>
    </main>
  )
}
