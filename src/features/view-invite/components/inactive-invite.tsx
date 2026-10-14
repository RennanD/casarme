import { Button, Link } from '@/src/shared/ui'

export function InactiveInvite() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="font-serif text-2xl text-foreground">Convite em processamento</h1>
        <p className="text-sm text-muted-foreground">
          Seu convite está sendo processado. Você receberá um email assim que estiver pronto!
        </p>
        <Button asChild className="rounded-full">
          <Link href="/">Voltar para home</Link>
        </Button>
      </div>
    </div>
  )
}
