import { Link } from '@/src/shared/ui'

const FOOTER_LINKS = [
  { href: '/politica-de-privacidade', label: 'Privacidade' },
  { href: '/termos-de-uso', label: 'Termos' },
  { href: 'mailto:casarme.site@gmail.com', label: 'Ajuda' },
] as const

export function HomeFooter() {
  return (
    <footer className="px-6 lg:px-8" role="contentinfo">
      <div className="mx-auto flex h-20 max-w-7xl flex-col items-center justify-between gap-3 py-4 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-muted-foreground">casarme · Convites digitais para celebrar</p>
        <nav className="flex items-center gap-5" aria-label="Links do rodapé">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} variant="muted" className="text-xs">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
