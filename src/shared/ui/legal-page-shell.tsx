import { ArrowLeft } from 'lucide-react'

import { Link } from './link'

type LegalPageShellProps = {
  title: string
  children: React.ReactNode
}

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <Link
          href="/"
          variant="nav"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Voltar ao início
        </Link>

        <h1 className="mb-8 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
