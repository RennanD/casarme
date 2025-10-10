"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Heart, Share2, Music } from "lucide-react"
import Link from "next/link"
import { InvitationHeader } from "@/components/invitation-header"

interface RomanticTemplateProps {
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
  heroPhoto?: string | null
  groomPhoto?: string | null
  bridePhoto?: string | null
  galleryPhotos?: (string | null)[]
}

export function RomanticTemplate({
  data,
  heroPhoto,
  groomPhoto,
  bridePhoto,
  galleryPhotos = [],
}: RomanticTemplateProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showRSVP, setShowRSVP] = useState(false)
  const [rsvpData, setRsvpData] = useState({ name: "", guests: "1", attending: "yes" })
  const [isPlaying, setIsPlaying] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <InvitationHeader accentColor="#E8B4B8" />

      {/* Music Player */}
      {data.musicUrl && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="rounded-full w-16 h-16 bg-[#E8B4B8] hover:bg-[#D89BA0] text-white shadow-2xl"
          >
            <Music className={`w-6 h-6 ${isPlaying ? "animate-pulse" : ""}`} />
          </Button>
          {isPlaying && getYouTubeEmbedUrl(data.musicUrl) && (
            <iframe src={getYouTubeEmbedUrl(data.musicUrl) || ""} allow="autoplay" className="hidden" />
          )}
        </div>
      )}

      {/* Hero Section with Floral Frame */}
      <section id="home" className="pt-24 pb-16 px-4 relative">
        {/* Top right floral decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none">
          <img src="/watercolor-pink-roses-corner-decoration.jpg" alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <div className="relative inline-block mb-8">
            {/* Floral wreath decoration */}
            <div className="absolute -inset-12 pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Rose petals around the circle */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180
                  const x = 200 + Math.cos(rad) * 160
                  const y = 200 + Math.sin(rad) * 160
                  return (
                    <g key={i} transform={`translate(${x},${y}) rotate(${angle})`}>
                      <ellipse cx="0" cy="0" rx="15" ry="20" fill="#E8B4B8" opacity="0.6" />
                      <ellipse cx="0" cy="0" rx="10" ry="15" fill="#F5D5D8" opacity="0.8" />
                    </g>
                  )
                })}
              </svg>
            </div>

            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <img
                src={heroPhoto || "/placeholder.svg?height=400&width=400"}
                alt={`${data.groomName} e ${data.brideName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1
            className="font-serif text-5xl md:text-6xl text-[#3E3E3E] mb-2"
            style={{ fontFamily: "Playfair Display" }}
          >
            {data.groomName || "Noivo"} <span className="text-[#E8B4B8]">&</span> {data.brideName || "Noiva"}
          </h1>

          {/* Floral divider */}
          <div className="flex items-center justify-center my-6">
            <svg viewBox="0 0 200 40" className="w-48 h-8">
              <path d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20" stroke="#E8B4B8" strokeWidth="1" fill="none" />
              <circle cx="100" cy="20" r="8" fill="#F5D5D8" />
              <circle cx="100" cy="20" r="4" fill="#E8B4B8" />
            </svg>
          </div>

          <p className="text-xl text-[#6B6B6B] mb-8">{formatDate(data.weddingDate) || "Data do casamento"}</p>

          <Button
            onClick={handleShare}
            variant="outline"
            className="border-[#E8B4B8] text-[#E8B4B8] hover:bg-[#E8B4B8] hover:text-white bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar Convite
          </Button>
        </div>
      </section>

      {/* Full Width Romantic Photo */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroPhoto || "/placeholder.svg?height=800&width=1600&query=romantic couple wedding photo"}
          alt="Casal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F3] via-transparent to-transparent" />
      </section>

      {/* Welcome Section */}
      <section id="boas-vindas" className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          {/* Floral divider */}
          <div className="flex items-center justify-center mb-8">
            <svg viewBox="0 0 200 40" className="w-48 h-8">
              <path d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20" stroke="#E8B4B8" strokeWidth="1" fill="none" />
              <circle cx="100" cy="20" r="8" fill="#F5D5D8" />
              <circle cx="100" cy="20" r="4" fill="#E8B4B8" />
            </svg>
          </div>

          <h2 className="font-serif text-4xl text-[#3E3E3E] mb-6" style={{ fontFamily: "Playfair Display" }}>
            Boas-vindas
          </h2>
          <p className="text-[#6B6B6B] text-lg leading-relaxed">
            {data.welcomeMessage ||
              "Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. Estamos muito felizes e contamos com a presença de todos no nosso grande dia!"}
          </p>
        </div>
      </section>

      {/* Couple Section */}
      <section id="casal" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Floral divider */}
          <div className="flex items-center justify-center mb-8">
            <svg viewBox="0 0 200 40" className="w-48 h-8">
              <path d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20" stroke="#E8B4B8" strokeWidth="1" fill="none" />
              <circle cx="100" cy="20" r="8" fill="#F5D5D8" />
              <circle cx="100" cy="20" r="4" fill="#E8B4B8" />
            </svg>
          </div>

          <h2
            className="font-serif text-4xl text-[#3E3E3E] text-center mb-12"
            style={{ fontFamily: "Playfair Display" }}
          >
            O Casal
          </h2>

          <div className="text-center mb-12">
            <p className="text-[#6B6B6B] text-lg leading-relaxed max-w-2xl mx-auto">
              {data.coupleStory ||
                "Nossa história começou de forma inesperada e se tornou a maior aventura das nossas vidas. Cada momento juntos nos trouxe até aqui, e agora queremos celebrar esse amor com todos vocês!"}
            </p>
          </div>

          {/* Individual Photos and Stories */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#E8B4B8] shadow-lg mx-auto mb-6">
                <img
                  src={groomPhoto || "/placeholder.svg?height=300&width=300"}
                  alt={data.groomName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#3E3E3E] mb-3">{data.groomName || "Noivo"}</h3>
              {data.groomStory && <p className="text-[#6B6B6B] leading-relaxed">{data.groomStory}</p>}
            </div>

            <div className="text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#E8B4B8] shadow-lg mx-auto mb-6">
                <img
                  src={bridePhoto || "/placeholder.svg?height=300&width=300"}
                  alt={data.brideName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#3E3E3E] mb-3">{data.brideName || "Noiva"}</h3>
              {data.brideStory && <p className="text-[#6B6B6B] leading-relaxed">{data.brideStory}</p>}
            </div>
          </div>

          {/* Photo Gallery */}
          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {galleryPhotos.map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md">
                  <img
                    src={photo || "/placeholder.svg?height=400&width=400"}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ceremony Section */}
      <section id="cerimonia" className="py-16 px-4 relative overflow-hidden">
        {/* Background floral decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
          <img src="/watercolor-pink-roses-corner-decoration.jpg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none rotate-180">
          <img src="/watercolor-pink-roses-corner-decoration.jpg" alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Floral divider */}
          <div className="flex items-center justify-center mb-8">
            <svg viewBox="0 0 200 40" className="w-48 h-8">
              <path d="M20,20 Q40,10 60,20 T100,20 T140,20 T180,20" stroke="#E8B4B8" strokeWidth="1" fill="none" />
              <circle cx="100" cy="20" r="8" fill="#F5D5D8" />
              <circle cx="100" cy="20" r="4" fill="#E8B4B8" />
            </svg>
          </div>

          <h2
            className="font-serif text-4xl text-[#3E3E3E] text-center mb-12"
            style={{ fontFamily: "Playfair Display" }}
          >
            Cerimônia & Recepção
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#E8B4B8]/20">
              <div className="text-center mb-10">
                <div className="inline-block p-4 bg-[#FFF8F3] rounded-full mb-4">
                  <MapPin className="w-10 h-10 text-[#E8B4B8]" />
                </div>
                <h3 className="font-serif text-3xl text-[#3E3E3E] mb-3" style={{ fontFamily: "Playfair Display" }}>
                  {data.venueName || "Local da Cerimônia"}
                </h3>
                <p className="text-[#6B6B6B] text-lg leading-relaxed">{data.venueAddress || "Endereço completo"}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="text-center p-6 bg-gradient-to-br from-[#FFF8F3] to-[#FFE8E8] rounded-2xl">
                  <Calendar className="w-8 h-8 text-[#E8B4B8] mx-auto mb-3" />
                  <p className="text-sm text-[#6B6B6B] mb-2 font-medium">Data</p>
                  <p className="text-[#3E3E3E] font-semibold text-lg">
                    {formatDate(data.weddingDate) || "Data do casamento"}
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-[#FFF8F3] to-[#FFE8E8] rounded-2xl">
                  <Clock className="w-8 h-8 text-[#E8B4B8] mx-auto mb-3" />
                  <p className="text-sm text-[#6B6B6B] mb-2 font-medium">Horário</p>
                  <p className="text-[#3E3E3E] font-semibold text-lg">{data.weddingTime || "Horário"}</p>
                </div>
              </div>

              <Button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
                    "_blank",
                  )
                }
                className="w-full bg-[#E8B4B8] hover:bg-[#D89BA0] text-white py-6 text-lg rounded-full shadow-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Como Chegar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="confirmar" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2
            className="font-serif text-4xl text-[#3E3E3E] text-center mb-8"
            style={{ fontFamily: "Playfair Display" }}
          >
            Confirme sua Presença
          </h2>
          <p className="text-center text-[#6B6B6B] mb-8">
            Sua presença é muito importante para nós! Por favor, confirme até {formatDate(data.weddingDate)}
          </p>

          {!showRSVP ? (
            <div className="text-center">
              <Button
                onClick={() => setShowRSVP(true)}
                size="lg"
                className="bg-[#E8B4B8] hover:bg-[#D89BA0] text-white px-12"
              >
                Confirmar Presença
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="bg-[#FFF8F3] rounded-2xl p-8 border-2 border-[#E8B4B8]">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#3E3E3E] mb-2 font-medium">Seu Nome</label>
                  <input
                    type="text"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8B4B8] focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#3E3E3E] mb-2 font-medium">Número de Convidados</label>
                  <select
                    value={rsvpData.guests}
                    onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8B4B8] focus:outline-none focus:ring-2 focus:ring-[#E8B4B8]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#3E3E3E] mb-2 font-medium">Confirmação</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="yes"
                        checked={rsvpData.attending === "yes"}
                        onChange={(e) => setRsvpData({ ...rsvpData, attending: e.target.value })}
                        className="w-4 h-4 text-[#E8B4B8]"
                      />
                      <span className="text-[#3E3E3E]">Sim, estarei presente!</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="no"
                        checked={rsvpData.attending === "no"}
                        onChange={(e) => setRsvpData({ ...rsvpData, attending: e.target.value })}
                        className="w-4 h-4 text-[#E8B4B8]"
                      />
                      <span className="text-[#3E3E3E]">Infelizmente não poderei comparecer</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#E8B4B8] hover:bg-[#D89BA0] text-white">
                  Enviar Confirmação
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-b from-[#FFE8E8] to-[#E8B4B8] text-white text-center">
        <p className="mb-4">
          Feito com <Heart className="inline w-4 h-4 fill-current" /> por {data.groomName || "Noivo"} &{" "}
          {data.brideName || "Noiva"}
        </p>
        <Link href="/criar" className="text-white/80 hover:text-white text-sm">
          Crie seu convite com CasarMe
        </Link>
      </footer>
    </div>
  )
}
