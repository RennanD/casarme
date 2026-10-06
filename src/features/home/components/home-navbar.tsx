'use client'

import { useState } from 'react'
import { Heart, Menu, Users, X } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  GODPARENT_INVITE_PATH,
  NAV_SECTION_LINKS,
  NAVBAR_CTA_LABEL,
} from '@/src/features/home/model/navigation'
import { Button, Link } from '@/src/shared/ui'

export function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <nav
      id={HOME_ANCHORS.navigation}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm"
      aria-label="Principal"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href={`#${HOME_ANCHORS.home}`}
          variant="nav"
          className="flex items-center gap-2 no-underline hover:no-underline"
        >
          <Heart className="size-6 fill-primary text-primary" aria-hidden />
          <span className="font-serif text-2xl font-semibold">CasarMe</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_SECTION_LINKS.map((link) => (
            <Link
              key={link.anchorId}
              href={`#${link.anchorId}`}
              variant="nav"
            >
              {link.label}
            </Link>
          ))}
          <Link href={GODPARENT_INVITE_PATH} variant="nav">
            <Users className="size-4" aria-hidden />
            Convite Padrinhos
          </Link>
        </div>

        <Link href={templatesHref} className="hidden md:inline-flex">
          <Button>{NAVBAR_CTA_LABEL}</Button>
        </Link>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="home-mobile-nav"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isOpen ? (
        <div
          id="home-mobile-nav"
          className="border-t border-border/60 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_SECTION_LINKS.map((link) => (
              <Link
                key={link.anchorId}
                href={`#${link.anchorId}`}
                variant="nav"
                className="py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={GODPARENT_INVITE_PATH}
              variant="nav"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              <Users className="size-4" aria-hidden />
              Convite Padrinhos
            </Link>
            <Link href={templatesHref} onClick={() => setIsOpen(false)}>
              <Button className="w-full">{NAVBAR_CTA_LABEL}</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
