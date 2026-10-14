'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { NAV_SECTION_LINKS, NAVBAR_CTA_LABEL } from '@/src/features/home/model/navigation'
import { getTemplateDemoHref } from '@/src/shared/catalog'
import { Button, Link } from '@/src/shared/ui'

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <nav id={HOME_ANCHORS.navigation} className="relative z-50 scroll-mt-20 border-b border-border/40 bg-background/95 backdrop-blur-sm" aria-label="Principal">
      <div className="home-shell flex h-18 items-center justify-between gap-4">
        <Link href={`#${HOME_ANCHORS.home}`} variant="nav" className="font-serif text-2xl font-normal lowercase no-underline hover:no-underline">
          casarme<span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_SECTION_LINKS.map((link) => (
            <Link key={link.anchorId} href={`#${link.anchorId}`} variant="nav" className="text-xs font-normal no-underline hover:no-underline">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild className="h-auto rounded-full px-4 py-2.5 text-xs">
            <Link href={getTemplateDemoHref('garden')} className="no-underline hover:no-underline">Ver demonstração</Link>
          </Button>
          <Button asChild className="h-auto rounded-full px-5 py-3 text-xs">
            <Link href={templatesHref} className="no-underline hover:no-underline">{NAVBAR_CTA_LABEL}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="home-mobile-nav"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="size-6 stroke-[1.75]" aria-hidden /> : <Menu className="size-6 stroke-[1.75]" aria-hidden />}
        </button>
      </div>

      {isOpen && (
        <div id="home-mobile-nav" className="overscroll-contain border-t border-border/60">
          <div className="home-shell flex flex-col gap-3 py-4">
            {NAV_SECTION_LINKS.map((link) => (
              <Link key={link.anchorId} href={`#${link.anchorId}`} variant="nav" className="py-2" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={getTemplateDemoHref('garden')} variant="nav" className="py-2" onClick={() => setIsOpen(false)}>
              Ver demonstração
            </Link>
            <Button asChild className="w-full rounded-full">
              <Link href={templatesHref} onClick={() => setIsOpen(false)}>{NAVBAR_CTA_LABEL}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
