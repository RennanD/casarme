"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import { useKeyboardNavigation } from "@/src/hooks/use-keyboard-navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { navigateToSection } = useKeyboardNavigation()

  const scrollToSection = (id: string) => {
    navigateToSection(id)
    setIsOpen(false)
  }

  return (
    <nav id="navigation" className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50" role="navigation" aria-label="Navegação principal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 touch-target focus-visible:focus-visible" aria-label="CasarMe - Página inicial">
            <Heart className="w-6 h-6 text-[#D4A373] fill-current" aria-hidden="true" />
            <span className="font-serif text-2xl text-[#3E3E3E]" style={{ fontFamily: "Playfair Display" }}>
              CasarMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="menubar" aria-label="Menu de navegação principal">
            <button
              onClick={() => scrollToSection("home")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors touch-target focus-visible:focus-visible"
              role="menuitem"
              aria-label="Ir para seção Home"
              type="button"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors touch-target focus-visible:focus-visible"
              role="menuitem"
              aria-label="Ir para seção Como Funciona"
              type="button"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors touch-target focus-visible:focus-visible"
              role="menuitem"
              aria-label="Ir para seção Templates"
              type="button"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection("por-que-escolher")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors touch-target focus-visible:focus-visible"
              role="menuitem"
              aria-label="Ir para seção Por que escolher"
              type="button"
            >
              Por que escolher
            </button>
          </div>

          {/* CTA Button - Desktop */}
          <Link href="/criar" className="hidden md:block touch-target focus-visible:focus-visible" aria-label="Criar meu convite de casamento digital">
            <Button className="bg-[#D4A373] hover:bg-[#C4936B] text-white focus-visible:focus-visible" type="button">Criar Meu Convite</Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#3E3E3E] touch-target focus-visible:focus-visible"
            aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className="sr-only">{isOpen ? "Fechar menu" : "Abrir menu"}</span>
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-[#FAF3E0]"
            role="menu"
            aria-label="Menu mobile de navegação"
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2 touch-target focus-visible:focus-visible"
                role="menuitem"
                aria-label="Ir para seção Home"
                type="button"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2 touch-target focus-visible:focus-visible"
                role="menuitem"
                aria-label="Ir para seção Como Funciona"
                type="button"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2 touch-target focus-visible:focus-visible"
                role="menuitem"
                aria-label="Ir para seção Templates"
                type="button"
              >
                Templates
              </button>
              <button
                onClick={() => scrollToSection("por-que-escolher")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2 touch-target focus-visible:focus-visible"
                role="menuitem"
                aria-label="Ir para seção Por que escolher"
                type="button"
              >
                Por que escolher
              </button>
              <Link
                href="/criar"
                onClick={() => setIsOpen(false)}
                aria-label="Criar meu convite de casamento digital"
                className="touch-target focus-visible:focus-visible"
              >
                <Button className="w-full bg-[#D4A373] hover:bg-[#C4936B] text-white focus-visible:focus-visible" type="button">
                  Criar Meu Convite
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
