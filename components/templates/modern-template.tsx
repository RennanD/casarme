"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Heart, Share2, Music, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ModernTemplateProps {
  data: {
    groomName: string
    brideName: string
    weddingDate: string
    weddingTime: string
    venueName: string
    venueAddress: string
    welcomeMessage: string
    coupleStory: string
    groomStory?: string
    brideStory?: string
    musicUrl?: string
  }
  heroPhotos?: (string | null)[]
  groomPhoto?: string | null
  bridePhoto?: string | null
  galleryPhotos?: (string | null)[]
}

export function ModernTemplate({
  data,
  heroPhotos = [],
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: ModernTemplateProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showRSVP, setShowRSVP] = useState(false)
  const [rsvpData, setRsvpData] = useState({ name: "", guests: "1", attending: "yes" })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = heroPhotos.length > 0 ? heroPhotos : ["/modern-wedding-couple-photo.jpg"]

  useEffect(() => {
    if (!data.weddingDate) return

    const calculateTimeLeft = () => {
      const weddingDateTime = new Date(`${data.weddingDate}T${data.weddingTime || "00:00"}`)
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
  }, [data.weddingDate, data.weddingTime])

  // Auto-advance slideshow
  useEffect(() => {
    if (slides.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Casamento ${data.groomName} & ${data.brideName}`,
          text: `Você está convidado para o nosso casamento!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Erro ao compartilhar:", err)
      }
    }
  }

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Obrigado por confirmar, ${rsvpData.name}!`)
    setShowRSVP(false)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
    )?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1A1A2E]/95 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-4 text-sm">
            <a href="#home" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider">
              Home
            </a>
            <a
              href="#boas-vindas"
              className="text-white/80 hover:text-white transition-colors uppercase tracking-wider"
            >
              Boas-vindas
            </a>
            <a href="#casal" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider">
              O Casal
            </a>
            <a href="#cerimonia" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider">
              Cerimônia
            </a>
            <a href="#confirmar" className="text-white/80 hover:text-white transition-colors uppercase tracking-wider">
              Confirmar
            </a>
          </div>
        </div>
      </nav>

      {/* Music Player */}
      {data.musicUrl && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="rounded-full w-16 h-16 bg-white hover:bg-white/90 text-[#1A1A2E] shadow-2xl"
          >
            <Music className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
          </Button>
          {isPlaying && getYouTubeEmbedUrl(data.musicUrl) && (
            <iframe src={getYouTubeEmbedUrl(data.musicUrl) || ""} allow="autoplay" className="hidden" />
          )}
        </div>
      )}

      {/* Hero Section with Slideshow */}
      <section id="home" className="relative h-screen">
        {/* Slideshow */}
        <div className="absolute inset-0">
          {slides.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={photo || "/placeholder.svg?height=1080&width=1920"}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Slideshow Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider uppercase">
            {data.groomName || "Noivo"} <span className="text-white/60">&</span> {data.brideName || "Noiva"}
          </h1>
          <div className="h-px w-32 bg-white/50 mb-6" />
          <p className="text-2xl md:text-3xl text-white/90 tracking-widest uppercase">
            {formatDate(data.weddingDate) || "Data do casamento"}
          </p>

          <Button
            onClick={handleShare}
            variant="outline"
            className="mt-12 border-2 border-white text-white hover:bg-white hover:text-[#1A1A2E] px-8 py-6 text-lg uppercase tracking-wider bg-transparent"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </Button>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="boas-vindas" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="h-px w-24 bg-[#1A1A2E] mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-[#1A1A2E] mb-8 uppercase tracking-wider">Boas-vindas</h2>
          <p className="text-[#6B6B6B] text-xl leading-relaxed">
            {data.welcomeMessage ||
              "Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!"}
          </p>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 bg-[#1A1A2E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: timeLeft.days, label: "DIAS" },
              { value: timeLeft.hours, label: "HORAS" },
              { value: timeLeft.minutes, label: "MINUTOS" },
              { value: timeLeft.seconds, label: "SEGUNDOS" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-sm text-white/60 tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section id="casal" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="h-px w-24 bg-[#1A1A2E] mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-[#1A1A2E] text-center mb-16 uppercase tracking-wider">O Casal</h2>

          <div className="text-center mb-16">
            <p className="text-[#6B6B6B] text-xl leading-relaxed max-w-3xl mx-auto">
              {data.coupleStory ||
                "Nossa história começou de forma inesperada e se tornou a maior aventura das nossas vidas. Cada momento juntos nos trouxe até aqui, e agora queremos celebrar esse amor com todos vocês!"}
            </p>
          </div>

          {/* Individual Photos and Stories */}
          <div className="grid md:grid-cols-2 gap-16">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 overflow-hidden">
                <img
                  src={groomPhoto || "/placeholder.svg?height=400&width=400"}
                  alt={data.groomName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-3xl font-bold text-[#1A1A2E] mb-4 uppercase tracking-wider">
                {data.groomName || "Noivo"}
              </h3>
              {data.groomStory && <p className="text-[#6B6B6B] leading-relaxed">{data.groomStory}</p>}
            </div>

            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 overflow-hidden">
                <img
                  src={bridePhoto || "/placeholder.svg?height=400&width=400"}
                  alt={data.brideName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-3xl font-bold text-[#1A1A2E] mb-4 uppercase tracking-wider">
                {data.brideName || "Noiva"}
              </h3>
              {data.brideStory && <p className="text-[#6B6B6B] leading-relaxed">{data.brideStory}</p>}
            </div>
          </div>

          {/* Photo Gallery */}
          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-16">
              {galleryPhotos.map((photo, index) => (
                <div key={index} className="aspect-square overflow-hidden">
                  <img
                    src={photo || "/placeholder.svg?height=400&width=400"}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ceremony Section */}
      <section id="cerimonia" className="py-24 px-4 bg-[#1A1A2E]">
        <div className="container mx-auto max-w-4xl">
          <div className="h-px w-24 bg-white mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-white text-center mb-16 uppercase tracking-wider">Cerimônia</h2>

          <div className="bg-white/5 backdrop-blur-sm rounded-none p-12 max-w-2xl mx-auto border border-white/10">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-xl uppercase tracking-wider">
                    {data.venueName || "Local da Cerimônia"}
                  </h3>
                  <p className="text-white/70 text-lg">{data.venueAddress || "Endereço completo"}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-xl uppercase tracking-wider">Data</h3>
                  <p className="text-white/70 text-lg">{formatDate(data.weddingDate) || "Data do casamento"}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 text-xl uppercase tracking-wider">Horário</h3>
                  <p className="text-white/70 text-lg">{data.weddingTime || "Horário"}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
                  "_blank",
                )
              }
              className="w-full mt-12 bg-white hover:bg-white/90 text-[#1A1A2E] py-6 text-lg uppercase tracking-wider"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Ver no Mapa
            </Button>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="confirmar" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <div className="h-px w-24 bg-[#1A1A2E] mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-[#1A1A2E] text-center mb-8 uppercase tracking-wider">
            Confirme sua Presença
          </h2>
          <p className="text-center text-[#6B6B6B] text-lg mb-12">
            Sua presença é muito importante para nós! Por favor, confirme até {formatDate(data.weddingDate)}
          </p>

          {!showRSVP ? (
            <div className="text-center">
              <Button
                onClick={() => setShowRSVP(true)}
                size="lg"
                className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white px-16 py-6 text-lg uppercase tracking-wider"
              >
                Confirmar Presença
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="bg-[#F5F5F5] rounded-none p-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#1A1A2E] mb-2 font-bold uppercase tracking-wider text-sm">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-4 py-4 rounded-none border-2 border-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A2E] mb-2 font-bold uppercase tracking-wider text-sm">
                    Número de Convidados
                  </label>
                  <select
                    value={rsvpData.guests}
                    onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                    className="w-full px-4 py-4 rounded-none border-2 border-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#1A1A2E]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1A1A2E] mb-2 font-bold uppercase tracking-wider text-sm">
                    Confirmação
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="yes"
                        checked={rsvpData.attending === "yes"}
                        onChange={(e) => setRsvpData({ ...rsvpData, attending: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span className="text-[#1A1A2E]">Sim, estarei presente!</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="no"
                        checked={rsvpData.attending === "no"}
                        onChange={(e) => setRsvpData({ ...rsvpData, attending: e.target.value })}
                        className="w-5 h-5"
                      />
                      <span className="text-[#1A1A2E]">Infelizmente não poderei comparecer</span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white py-6 text-lg uppercase tracking-wider"
                >
                  Enviar Confirmação
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1A1A2E] text-white text-center border-t border-white/10">
        <p className="mb-4 text-lg">
          Feito com <Heart className="inline w-5 h-5 fill-current" /> por {data.groomName || "Noivo"} &{" "}
          {data.brideName || "Noiva"}
        </p>
        <Link href="/criar" className="text-white/60 hover:text-white text-sm uppercase tracking-wider">
          Crie seu convite com Amore
        </Link>
      </footer>
    </div>
  )
}
