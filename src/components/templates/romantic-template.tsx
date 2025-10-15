"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/src/components/ui/button"
import { MapPin, Calendar, Clock, Heart, Play, Pause, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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
    whatsapp?: string
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getYouTubeId = (url: string) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
    )?.[1]
    return videoId
  }

  // Plugin de autoplay para o carousel
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

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


  const handleConfirmPresence = () => {
    if (!data.whatsapp) {
      alert('WhatsApp não configurado para este convite.')
      return
    }

    // Mensagem simples para confirmação
    const message = `Olá! Será uma honra estar presente nessa data tão especial! 💕`

    // Limpar o número do WhatsApp (remover caracteres não numéricos)
    const cleanWhatsapp = data.whatsapp.replace(/\D/g, '')

    // Abrir WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }


  return (
    <div className="min-h-screen bg-[#FFF8F3]">

      {/* Music Player */}
      {data.musicUrl && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex flex-col items-end gap-2">
            {isPlaying && (
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-[#3E3E3E] font-medium shadow-lg">
                🎵 Tocando
              </div>
            )}
            {!hasUserInteracted && (
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-[#3E3E3E] font-medium shadow-lg max-w-32 text-center">
                Toque para tocar música
              </div>
            )}
            <Button
              onClick={() => {
                setHasUserInteracted(true)
                setIsPlaying(!isPlaying)
              }}
              size="lg"
              className={`rounded-full w-16 h-16 text-white shadow-2xl transition-all duration-300 ${isPlaying
                ? "bg-[#D89BA0] hover:bg-[#C88A8F] scale-105"
                : "bg-[#E8B4B8] hover:bg-[#D89BA0]"
                }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </Button>
          </div>
          {/* YouTube Player - Hidden but functional */}
          {hasUserInteracted && getYouTubeId(data.musicUrl) && (
            <div className="absolute -top-1 -left-1 w-1 h-1 opacity-0 pointer-events-none">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(data.musicUrl)}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${getYouTubeId(data.musicUrl)}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`}
                allow="autoplay; encrypted-media"
                className="w-full h-full"
                title="Background Music"
              />
            </div>
          )}
        </div>
      )}

      {/* Hero Section with Floral Frame */}
      <section id="home" className="pt-24 pb-16 px-4 relative">
        {/* Top right floral decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-30 pointer-events-none">
          <Image src="/watercolor-pink-roses-corner-decoration.jpg" alt="" width={400} height={400} className="w-full h-full object-contain" />
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
              <Image
                src={heroPhoto || "/placeholder.svg?height=400&width=400"}
                alt={`${data.groomName} e ${data.brideName}`}
                width={400}
                height={400}
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
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      {galleryPhotos.length > 0 && (
        <section className="relative h-[60vh] overflow-hidden">
          <Carousel
            className="w-full h-full"
            plugins={[autoplayPlugin.current]}
            opts={{
              loop: true,
            }}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
          >
            <CarouselContent className="h-full">
              {galleryPhotos.map((photo, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={photo || "/placeholder.svg?height=800&width=1600&query=romantic couple wedding photo"}
                      alt={`Galeria ${index + 1}`}
                      width={1600}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F3] via-transparent to-transparent" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-[#E8B4B8] border-[#E8B4B8]" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white text-[#E8B4B8] border-[#E8B4B8]" />
          </Carousel>
        </section>
      )}

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

        </div>
      </section>

      {/* Ceremony Section */}
      <section id="cerimonia" className="py-16 px-4 relative overflow-hidden">
        {/* Background floral decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
          <Image src="/watercolor-pink-roses-corner-decoration.jpg" alt="" width={400} height={400} className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none rotate-180">
          <Image src="/watercolor-pink-roses-corner-decoration.jpg" alt="" width={400} height={400} className="w-full h-full object-contain" />
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
            Sua presença é muito importante para nós! Clique no botão abaixo para confirmar via WhatsApp.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleConfirmPresence}
              size="lg"
              className="bg-[#E8B4B8] hover:bg-[#D89BA0] text-white px-12 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Confirmar Presença via WhatsApp
            </Button>
          </div>
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
