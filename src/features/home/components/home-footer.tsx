import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Link } from '@/src/shared/ui'

const FOOTER_PRODUCT_LINKS = [
  { href: `#${HOME_ANCHORS.templates}`, label: 'Modelos' },
  { href: `#${HOME_ANCHORS.howItWorks}`, label: 'Como funciona' },
  { href: `#${HOME_ANCHORS.faq}`, label: 'Dúvidas' },
] as const

const FOOTER_LEGAL_LINKS = [
  { href: '/politica-de-privacidade', label: 'Política de privacidade' },
  { href: '/termos-de-uso', label: 'Termos de uso' },
  { href: 'mailto:casarm.site@gmail.com', label: 'Contato' },
] as const

export function HomeFooter() {
  return (
    <footer className="border-t border-border/60 py-10" role="contentinfo">
      <div className="home-shell space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 lg:col-span-2">
            <p className="font-serif text-xl lowercase text-foreground">
              casarme<span className="text-primary">.</span>
            </p>
            <p className="max-w-xs font-serif text-sm italic text-muted-foreground">
              Todos os pequenos momentos, num convite só.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-foreground">Produto</p>
            <nav className="flex flex-col gap-2" aria-label="Links do produto">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} variant="muted" className="text-xs">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-foreground">Legal</p>
            <nav className="flex flex-col gap-2" aria-label="Links legais">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} variant="muted" className="text-xs">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">casarme · Feito para quem está com você.</p>
      </div>
    </footer>
  )
}
