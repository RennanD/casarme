"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { MapPin, Calendar, Clock, Heart, Share2, Menu, X } from "lucide-react"
import Link from "next/link"

export default function ExampleInvitationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const invitation = {
    groomName: "João",
    brideName: "Maria",
    weddingDate: "2025-12-20",
    weddingTime: "17:00",
    venueName: "Espaço Jardim das Flores",
    venueAddress: "Rua das Flores, 123 - Centro, São Paulo - SP",
    message:
      "Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!",
    photo: "/romantic-couple-wedding-photo-in-garden.jpg",
    coupleStory:
      "Nossa história começou em 2017, no Jardim Botânico, em um dia comum que se tornou inesquecível. Estávamos ambos em um evento de fotografia, quando nossos olhares se cruzaram. Desde então, somos companheiros e melhores amigos. Estamos muito felizes em celebrar esse amor com a presença de cada um de vocês!",
    groomPhoto: "/groom-portrait-smiling.jpg",
    bridePhoto: "/bride-portrait-smiling.jpg",
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "confirmed" | "declined">("pending")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDateTime = new Date(`${invitation.weddingDate}T${invitation.weddingTime}`)
      const now = new Date()
      const difference = weddingDateTime.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [invitation.weddingDate, invitation.weddingTime])

  const handleOpenMap = () => {
    const encodedAddress = encodeURIComponent(invitation.venueAddress)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  const handleRSVP = (status: "confirmed" | "declined") => {
    setRsvpStatus(status)
  }

  const handleShare = async () => {
    const shareData = {
      title: `Casamento de ${invitation.groomName} & ${invitation.brideName}`,
      text: `Você está convidado para o nosso casamento!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "casal", label: "O Casal" },
    { id: "cerimonia", label: "Cerimônia" },
    { id: "confirmar", label: "Confirme sua Presença" },
  ]

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Names */}
            <button onClick={() => scrollToSection("home")} className="font-serif text-lg font-bold text-[#D4A373]">
              {invitation.groomName} & {invitation.brideName}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#D4A373]" : "text-[#3E3E3E] hover:text-[#D4A373]"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#3E3E3E]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#D4A373] bg-[#FAF3E0]" : "text-[#3E3E3E] hover:bg-[#FAF3E0]"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={invitation.photo || "/placeholder.svg"}
            alt="Foto do casal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#FAF3E0]" />
        </div>

        <div className="relative z-10 text-center px-4 py-20">
          {/* Decorative leaf illustration */}
          <div className="mb-6 flex justify-center">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" className="text-white/90">
              <path
                d="M40 10C35 15 30 20 25 30C20 40 15 50 10 55M40 10C45 15 50 20 55 30C60 40 65 50 70 55M40 10V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            {invitation.groomName} <span className="text-3xl sm:text-4xl block my-2">&</span> {invitation.brideName}
          </h1>
          <p className="text-white text-xl sm:text-2xl font-light tracking-wider drop-shadow-lg uppercase">
            {formatDate(invitation.weddingDate).toUpperCase()}
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#8B9D7F] to-[#6B7D5F] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white text-center mb-8">Contagem Regressiva</h2>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: "Dias", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Minutos", value: timeLeft.minutes },
              { label: "Segundos", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="bg-white rounded-lg p-4 sm:p-6 mb-2 shadow-lg">
                  <span className="text-3xl sm:text-5xl font-bold text-[#3E3E3E] block">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-white text-xs sm:text-sm uppercase tracking-wider font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* Decorative leaf */}
          <div className="mb-6 flex justify-center">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="text-[#8B9D7F]">
              <path
                d="M30 5C27 10 24 15 20 22C16 29 12 36 8 40M30 5C33 10 36 15 40 22C44 29 48 36 52 40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E3E3E] mb-6">Boas vindas</h2>
          <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed">{invitation.message}</p>
          <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed mt-4">
            Ah, é importante também confirmar sua presença. Para isto contamos com sua ajuda clicando no menu "Confirme
            sua Presença" e preenchendo os dados necessários.
          </p>
          <p className="text-[#3E3E3E] font-serif text-lg sm:text-xl mt-8 italic">
            Aguardamos vocês no nosso grande dia!
          </p>
          <p className="text-[#D4A373] font-serif text-xl sm:text-2xl mt-2">
            Com amor, {invitation.groomName} & {invitation.brideName} ♥
          </p>
        </div>
      </section>

      <section id="casal" className="py-16 sm:py-20 bg-[#FAF3E0]">
        <div className="max-w-4xl mx-auto px-4">
          {/* Decorative leaf */}
          <div className="mb-6 flex justify-center">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="text-[#8B9D7F]">
              <path
                d="M30 5C27 10 24 15 20 22C16 29 12 36 8 40M30 5C33 10 36 15 40 22C44 29 48 36 52 40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E3E3E] text-center mb-12">O Casal</h2>

          {/* Couple photos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-12">
            <div className="text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#D4A373] shadow-xl mb-4 mx-auto">
                <img
                  src={invitation.groomPhoto || "/placeholder.svg"}
                  alt={invitation.groomName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-[#3E3E3E]">{invitation.groomName}</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#D4A373] shadow-xl mb-4 mx-auto">
                <img
                  src={invitation.bridePhoto || "/placeholder.svg"}
                  alt={invitation.brideName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-[#3E3E3E]">{invitation.brideName}</p>
            </div>
          </div>

          {/* Couple story */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[#6B6B6B] text-base sm:text-lg leading-relaxed">{invitation.coupleStory}</p>
            <p className="text-[#3E3E3E] font-serif text-lg sm:text-xl mt-6 italic">
              Estamos muito felizes em celebrar esse amor com a presença de cada um de vocês! 💙
            </p>
          </div>
        </div>
      </section>

      <section id="cerimonia" className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Decorative leaf */}
          <div className="mb-6 flex justify-center">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="text-[#8B9D7F]">
              <path
                d="M30 5C27 10 24 15 20 22C16 29 12 36 8 40M30 5C33 10 36 15 40 22C44 29 48 36 52 40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E3E3E] text-center mb-12">Cerimônia</h2>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF3E0] rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4A373] flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#3E3E3E] mb-2">Data</h3>
              <p className="text-[#6B6B6B] text-sm">{formatDate(invitation.weddingDate)}</p>
            </div>

            <div className="bg-[#FAF3E0] rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4A373] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#3E3E3E] mb-2">Horário</h3>
              <p className="text-[#6B6B6B] text-sm">{invitation.weddingTime}</p>
            </div>

            <div className="bg-[#FAF3E0] rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4A373] flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#3E3E3E] mb-2">Local</h3>
              <p className="text-[#6B6B6B] text-sm">{invitation.venueName}</p>
            </div>
          </div>

          <div className="bg-[#FAF3E0] rounded-xl p-6 sm:p-8 shadow-lg">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3E3E3E] mb-4 text-center">
              {invitation.venueName}
            </h3>
            <p className="text-[#6B6B6B] text-center mb-6">{invitation.venueAddress}</p>
            <Button onClick={handleOpenMap} className="bg-[#D4A373] text-white hover:bg-[#C49363] w-full" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              Abrir no Google Maps
            </Button>
          </div>
        </div>
      </section>

      <section id="confirmar" className="py-16 sm:py-20 bg-[#FAF3E0]">
        <div className="max-w-2xl mx-auto px-4">
          {/* Decorative leaf */}
          <div className="mb-6 flex justify-center">
            <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="text-[#8B9D7F]">
              <path
                d="M30 5C27 10 24 15 20 22C16 29 12 36 8 40M30 5C33 10 36 15 40 22C44 29 48 36 52 40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E3E3E] text-center mb-6">
            Confirme sua Presença
          </h2>
          <p className="text-[#6B6B6B] text-center text-base sm:text-lg mb-8">
            Sua presença é muito importante para nós! Por favor, confirme até 30 dias antes do casamento.
          </p>

          {rsvpStatus === "pending" ? (
            <div className="space-y-4">
              <Button
                onClick={() => handleRSVP("confirmed")}
                size="lg"
                className="bg-[#D4A373] text-white hover:bg-[#C49363] w-full"
              >
                <Heart className="w-5 h-5 mr-2" />
                Confirmar Presença
              </Button>
              <Button
                onClick={() => handleRSVP("declined")}
                size="lg"
                variant="outline"
                className="border-[#D4A373] text-[#D4A373] hover:bg-[#FAF3E0] w-full"
              >
                Não Poderei Comparecer
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg">
                <Heart className="w-6 h-6 text-[#D4A373]" />
                <span className="text-[#3E3E3E] font-semibold text-lg">
                  {rsvpStatus === "confirmed" ? "Presença confirmada! ✨" : "Resposta registrada"}
                </span>
              </div>
              <p className="text-[#6B6B6B] text-sm">Obrigado por confirmar!</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Button
              onClick={handleShare}
              size="lg"
              variant="outline"
              className="border-[#D4A373] text-[#D4A373] hover:bg-white bg-transparent"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar Convite
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#D4A373] to-[#C49363]">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Gostou do que viu?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-95">
            Crie seu próprio site de casamento interativo em menos de 5 minutos!
          </p>
          <Link href="/criar">
            <Button size="lg" className="bg-white text-[#D4A373] hover:bg-[#FAF3E0] text-lg px-8">
              Criar Meu Site Agora
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-[#3E3E3E] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            Site criado com ♥ por <span className="font-semibold">Amore</span>
          </p>
          <p className="text-xs opacity-60 mt-2">Transformando momentos especiais em memórias digitais</p>
        </div>
      </footer>
    </div>
  )
}
