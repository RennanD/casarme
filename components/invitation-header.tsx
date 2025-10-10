"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface InvitationHeaderProps {
  accentColor: string
  textColor?: string
}

export function InvitationHeader({ accentColor, textColor = "#3E3E3E" }: InvitationHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-6 text-sm flex-1">
            <button
              onClick={() => scrollToSection("home")}
              className="transition-colors"
              style={{ color: accentColor }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("boas-vindas")}
              className="transition-colors"
              style={{ color: accentColor }}
            >
              Boas-vindas
            </button>
            <button
              onClick={() => scrollToSection("casal")}
              className="transition-colors"
              style={{ color: accentColor }}
            >
              O Casal
            </button>
            <button
              onClick={() => scrollToSection("cerimonia")}
              className="transition-colors"
              style={{ color: accentColor }}
            >
              Cerimônia
            </button>
            <button
              onClick={() => scrollToSection("confirmar")}
              className="transition-colors"
              style={{ color: accentColor }}
            >
              Confirmar Presença
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-auto" style={{ color: textColor }}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: `${accentColor}20` }}>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left py-2 transition-colors"
                style={{ color: accentColor }}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("boas-vindas")}
                className="text-left py-2 transition-colors"
                style={{ color: accentColor }}
              >
                Boas-vindas
              </button>
              <button
                onClick={() => scrollToSection("casal")}
                className="text-left py-2 transition-colors"
                style={{ color: accentColor }}
              >
                O Casal
              </button>
              <button
                onClick={() => scrollToSection("cerimonia")}
                className="text-left py-2 transition-colors"
                style={{ color: accentColor }}
              >
                Cerimônia
              </button>
              <button
                onClick={() => scrollToSection("confirmar")}
                className="text-left py-2 transition-colors"
                style={{ color: accentColor }}
              >
                Confirmar Presença
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
