'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { NAV_SECTION_LINKS, NAVBAR_CTA_LABEL } from '@/src/features/home/model/navigation'
import { Button, Link } from '@/src/shared/ui'

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <nav id={HOME_ANCHORS.navigation} className="relative z-50 scroll-mt-20 bg-background" aria-label="Principal">
      <div className="mx-auto flex h-[72px] max-w-[1080px] items-center justify-between px-6">
        <Link href={`#${HOME_ANCHORS.home}`} variant="nav" className="font-serif text-2xl font-normal lowercase no-underline hover:no-underline">
          casarme
        </Link>

        <div className="hidden items-center gap-[30px] md:flex">
          {NAV_SECTION_LINKS.map((link) => (
            <Link key={link.anchorId} href={`#${link.anchorId}`} variant="nav" className="text-xs font-normal">
              {link.label}
            </Link>
          ))}
        </div>

        <Button asChild className="hidden h-auto rounded-full px-[18px] py-3 text-xs md:inline-flex">
          <Link href={templatesHref}>{NAVBAR_CTA_LABEL}</Link>
        </Button>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="home-mobile-nav"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {isOpen && (
        <div id="home-mobile-nav" className="border-t border-border/60 px-6 py-4 sm:px-10 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_SECTION_LINKS.map((link) => (
              <Link key={link.anchorId} href={`#${link.anchorId}`} variant="nav" className="py-2" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full rounded-full">
              <Link href={templatesHref} onClick={() => setIsOpen(false)}>{NAVBAR_CTA_LABEL}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
