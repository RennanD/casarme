"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Menu, X, Heart, Users } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    try {
      const element = document.getElementById(id)
      if (element) {
        // Fallback para browsers que não suportam smooth scroll
        try {
          element.scrollIntoView({ behavior: "smooth" })
        } catch {
          element.scrollIntoView()
        }
      }
    } catch (error) {
      console.error("Scroll error:", error)
      // Fallback: usar hash
      window.location.hash = id
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#D4A373] fill-current" />
            <span className="font-serif text-2xl text-[#3E3E3E]" style={{ fontFamily: "Playfair Display" }}>
              CasarMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("templates")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors"
            >
              Modelos
            </button>
            <button
              onClick={() => scrollToSection("por-que-escolher")}
              className="text-[#3E3E3E] hover:text-[#D4A373] transition-colors"
            >
              Por que escolher
            </button>
            <Link
              href="/convite-padrinhos"
              className="flex items-center gap-2 text-[#3E3E3E] hover:text-[#D4A373] transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Convite Padrinhos</span>
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <Link href="/#templates" className="hidden md:block">
            <Button className="bg-[#D4A373] hover:bg-[#C4936B] text-white">Criar Meu Convite</Button>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#3E3E3E]">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#FAF3E0]">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("templates")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2"
              >
                Modelos
              </button>
              <button
                onClick={() => scrollToSection("por-que-escolher")}
                className="text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2"
              >
                Por que escolher
              </button>
              <Link
                href="/convite-padrinhos"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-left text-[#3E3E3E] hover:text-[#D4A373] transition-colors py-2"
              >
                <Users className="w-4 h-4" />
                <span>Convite Padrinhos</span>
              </Link>
              <Link href="/#templates" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#D4A373] hover:bg-[#C4936B] text-white">Criar Meu Convite</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
