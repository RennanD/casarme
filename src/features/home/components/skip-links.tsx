import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

const SKIP_LINKS = [
  {
    href: `#${HOME_ANCHORS.mainContent}`,
    label: 'Pular para o conteúdo principal',
  },
  {
    href: `#${HOME_ANCHORS.navigation}`,
    label: 'Pular para a navegação',
  },
] as const

export function SkipLinks() {
  return (
    <>
      {SKIP_LINKS.map((link) => (
        <a key={link.href} href={link.href} className="skip-link">
          {link.label}
        </a>
      ))}
    </>
  )
}
