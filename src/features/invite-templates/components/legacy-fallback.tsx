type LegacyFallbackProps = {
  groomName: string
  brideName: string
}

export function LegacyFallback({ groomName, brideName }: LegacyFallbackProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-background px-6 py-16">
      <div className="max-w-md space-y-3 text-center">
        <p className="font-serif text-2xl text-foreground">
          {groomName} & {brideName}
        </p>
        <p className="text-sm text-muted-foreground">
          Este convite usa um modelo anterior que não está mais disponível no catálogo.
          Entre em contato com os noivos se precisar de ajuda para acessar os detalhes.
        </p>
      </div>
    </div>
  )
}
