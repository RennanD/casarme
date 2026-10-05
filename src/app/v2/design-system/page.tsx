import type { Metadata } from 'next'
import { Plus } from 'lucide-react'

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Link,
  Separator,
} from '@/src/shared/ui'

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
    className: 'script',
    label: 'script',
    sample: 'Com amor, Maria & João',
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

const buttonVariants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const

const badgeVariants = ['default', 'secondary', 'outline', 'destructive'] as const

const linkVariants = ['default', 'muted', 'nav'] as const

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

      <section aria-labelledby="buttons-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="buttons-heading" className="h2">
            Buttons
          </h2>
          <p className="body text-muted-foreground">
            Variantes e tamanhos para ações e CTAs. Ícones via{' '}
            <code className="font-mono text-sm">lucide-react</code>.
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <p className="body-sm font-mono text-muted-foreground">variants</p>
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="body-sm font-mono text-muted-foreground">sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="default">default</Button>
              <Button size="sm">sm</Button>
              <Button size="lg">lg</Button>
              <Button size="icon" aria-label="Adicionar">
                <Plus />
              </Button>
              <Button size="icon-sm" aria-label="Adicionar">
                <Plus />
              </Button>
              <Button size="icon-lg" aria-label="Adicionar">
                <Plus />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="body-sm font-mono text-muted-foreground">
              disabled
            </p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>default</Button>
              <Button variant="secondary" disabled>
                secondary
              </Button>
              <Button variant="outline" disabled>
                outline
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="badges-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="badges-heading" className="h2">
            Badges
          </h2>
          <p className="body text-muted-foreground">
            Etiquetas de status e tags compactas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </section>

      <section aria-labelledby="links-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="links-heading" className="h2">
            Links
          </h2>
          <p className="body text-muted-foreground">
            Navegação interna com <code className="font-mono text-sm">next/link</code>{' '}
            e variantes CVA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          {linkVariants.map((variant) => (
            <Link key={variant} href="/v2/design-system" variant={variant}>
              {variant}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="cards-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="cards-heading" className="h2">
            Cards
          </h2>
          <p className="body text-muted-foreground">
            Blocos de conteúdo compostos — header, title, description, content,
            footer e action.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Convite básico</CardTitle>
              <CardDescription>
                Plano ideal para casamentos íntimos com até 50 convidados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-muted-foreground">
                RSVP, mapa do local e contagem regressiva inclusos.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Ver detalhes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Convite premium</CardTitle>
              <CardDescription>
                Recursos avançados para eventos maiores.
              </CardDescription>
              <CardAction>
                <Badge variant="secondary">Popular</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="body-sm text-muted-foreground">
                Galeria de fotos, playlist colaborativa e domínio personalizado.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                Comparar
              </Button>
              <Button size="sm">Escolher plano</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section aria-labelledby="forms-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="forms-heading" className="h2">
            Forms
          </h2>
          <p className="body text-muted-foreground">
            Campos de formulário com <code className="font-mono text-sm">Input</code> e{' '}
            <code className="font-mono text-sm">Label</code> alinhados aos tokens semânticos.
          </p>
        </div>

        <div className="grid max-w-md gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="guest-name">Nome do convidado</Label>
            <Input id="guest-name" placeholder="Maria Silva" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guest-email">E-mail</Label>
            <Input id="guest-email" type="email" placeholder="maria@email.com" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guest-count">Número de acompanhantes</Label>
            <Input id="guest-count" type="number" min={0} defaultValue={0} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="guest-disabled">Campo desabilitado</Label>
            <Input id="guest-disabled" disabled placeholder="Indisponível" />
          </div>
        </div>
      </section>

      <section aria-labelledby="separator-heading" className="space-y-8">
        <div className="space-y-2">
          <h2 id="separator-heading" className="h2">
            Separator
          </h2>
          <p className="body text-muted-foreground">
            Divisor padrão para quebras de seção — horizontal ou vertical.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="body-sm font-mono text-muted-foreground">horizontal</p>
            <div className="space-y-4">
              <p className="body">Conteúdo acima do divisor</p>
              <Separator />
              <p className="body">Conteúdo abaixo do divisor</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="body-sm font-mono text-muted-foreground">vertical</p>
            <div className="flex h-10 items-center gap-4">
              <span className="body">Esquerda</span>
              <Separator orientation="vertical" />
              <span className="body">Centro</span>
              <Separator orientation="vertical" />
              <span className="body">Direita</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
