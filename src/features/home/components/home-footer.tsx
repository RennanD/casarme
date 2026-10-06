import { Link, Separator } from '@/src/shared/ui'

const FOOTER_LINKS = [
  { href: '/termos-de-uso', label: 'Termos de Uso' },
  { href: '/politica-de-privacidade', label: 'Política de Privacidade' },
] as const

export function HomeFooter() {
  return (
    <footer className="bg-secondary px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="font-serif text-3xl font-semibold text-primary">CasarMe</p>

        <nav
          className="flex flex-wrap justify-center gap-6"
          aria-label="Links do rodapé"
        >
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} variant="muted">
              {link.label}
            </Link>
          ))}
          <Link href="mailto:casarme.site@gmail.com" variant="muted">
            Contato
          </Link>
        </nav>

        <Separator className="max-w-xs" />

        <p className="muted">
          © {new Date().getFullYear()} CasarMe. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
