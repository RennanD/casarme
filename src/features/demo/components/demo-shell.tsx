import { getTemplateCreateHref } from '@/src/shared/catalog'
import { Button, Link } from '@/src/shared/ui'

type DemoShellProps = {
  slug: string
  templateName: string
  children: React.ReactNode
}

export function DemoShell({ slug, templateName, children }: DemoShellProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" variant="nav" className="text-sm font-medium">
            ← Voltar ao CasarMe
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Modelo {templateName}
            </span>
            <Button asChild className="h-auto rounded-full px-5 py-2.5 text-sm">
              <Link href={getTemplateCreateHref(slug)}>Criar meu convite</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-[4.5rem]">{children}</main>
    </div>
  )
}
