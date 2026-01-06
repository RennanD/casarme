"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { MapPin, Calendar, Clock, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GardenTemplateProps {
  data: {
    groomName: string
    brideName: string
    weddingDate: string
    weddingTime: string
    venueName: string
    venueAddress: string
    welcomeMessage: string
    coupleStory: string
    whatsapp?: string
  }
  heroPhoto?: string | null
}

export function GardenTemplate({ data, heroPhoto }: GardenTemplateProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

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
    <div className="min-h-screen bg-[#FAF3E0]">

      {/* Hero Section */}
      <section id="home" className="pt-24 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="relative inline-block mb-8">
            {/* Decorative frame */}
            <svg
              className="absolute -top-8 -left-8 w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none"
              viewBox="0 0 300 300"
            >
              <path
                d="M150,20 Q180,20 200,40 L260,100 Q280,120 280,150 Q280,180 260,200 L200,260 Q180,280 150,280 Q120,280 100,260 L40,200 Q20,180 20,150 Q20,120 40,100 L100,40 Q120,20 150,20 Z"
                fill="none"
                stroke="#D4A373"
                strokeWidth="2"
              />
            </svg>
            {/* Olive branches decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,10 Q60,20 55,30 Q50,40 45,30 Q40,20 50,10 M55,30 Q65,35 60,45 M45,30 Q35,35 40,45"
                  fill="none"
                  stroke="#8B9D7F"
                  strokeWidth="2"
                />
                <ellipse cx="60" cy="45" rx="3" ry="5" fill="#8B9D7F" />
                <ellipse cx="40" cy="45" rx="3" ry="5" fill="#8B9D7F" />
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rotate-180">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,10 Q60,20 55,30 Q50,40 45,30 Q40,20 50,10 M55,30 Q65,35 60,45 M45,30 Q35,35 40,45"
                  fill="none"
                  stroke="#8B9D7F"
                  strokeWidth="2"
                />
                <ellipse cx="60" cy="45" rx="3" ry="5" fill="#8B9D7F" />
                <ellipse cx="40" cy="45" rx="3" ry="5" fill="#8B9D7F" />
              </svg>
            </div>

            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <Image
                src={heroPhoto || "/placeholder.svg?height=400&width=400"}
                alt={`${data.groomName} e ${data.brideName}`}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1
            className="font-serif text-5xl md:text-6xl text-[#3E3E3E] mb-4"
            style={{ fontFamily: "Playfair Display" }}
          >
            {data.groomName || "Noivo"} <span className="text-[#8B9D7F]">&</span> {data.brideName || "Noiva"}
          </h1>
          <p className="text-xl text-[#6B6B6B] mb-8">{formatDate(data.weddingDate) || "Data do casamento"}</p>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="boas-vindas" className="pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          {/* Olive branch divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-[#8B9D7F] w-20" />
            <svg viewBox="0 0 40 40" className="w-10 h-10 mx-4">
              <path
                d="M20,10 Q25,15 22,20 Q20,25 18,20 Q15,15 20,10 M22,20 Q27,22 25,27 M18,20 Q13,22 15,27"
                fill="none"
                stroke="#8B9D7F"
                strokeWidth="1.5"
              />
              <ellipse cx="25" cy="27" rx="2" ry="3" fill="#8B9D7F" />
              <ellipse cx="15" cy="27" rx="2" ry="3" fill="#8B9D7F" />
            </svg>
            <div className="h-px bg-[#8B9D7F] w-20" />
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
      <section id="casal" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          {/* Olive branch divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-[#8B9D7F] w-20" />
            <svg viewBox="0 0 40 40" className="w-10 h-10 mx-4">
              <path
                d="M20,10 Q25,15 22,20 Q20,25 18,20 Q15,15 20,10 M22,20 Q27,22 25,27 M18,20 Q13,22 15,27"
                fill="none"
                stroke="#8B9D7F"
                strokeWidth="1.5"
              />
              <ellipse cx="25" cy="27" rx="2" ry="3" fill="#8B9D7F" />
              <ellipse cx="15" cy="27" rx="2" ry="3" fill="#8B9D7F" />
            </svg>
            <div className="h-px bg-[#8B9D7F] w-20" />
          </div>

          {/* <h2
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
          </div> */}

          <div className="text-center">
            <p className="font-serif text-2xl text-[#8B9D7F] italic">
              <Heart className="inline w-6 h-6 fill-current" /> Com amor, {data.groomName || "Noivo"} &{" "}
              {data.brideName || "Noiva"} <Heart className="inline w-6 h-6 fill-current" />
            </p>
          </div>
        </div>
      </section>

      {/* Ceremony Section */}
      <section id="cerimonia" className="py-16 px-4 bg-[#8B9D7F]">
        <div className="container mx-auto max-w-4xl">
          {/* Olive branch divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-white/30 w-20" />
            <svg viewBox="0 0 40 40" className="w-10 h-10 mx-4">
              <path
                d="M20,10 Q25,15 22,20 Q20,25 18,20 Q15,15 20,10 M22,20 Q27,22 25,27 M18,20 Q13,22 15,27"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
              <ellipse cx="25" cy="45" rx="2" ry="3" fill="white" />
              <ellipse cx="15" cy="45" rx="2" ry="3" fill="white" />
            </svg>
            <div className="h-px bg-white/30 w-20" />
          </div>

          <h2 className="font-serif text-4xl text-white text-center mb-12" style={{ fontFamily: "Playfair Display" }}>
            Cerimônia
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#FAF3E0] rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="space-y-8">
                <div className="text-center pb-6 border-b border-[#8B9D7F]/20">
                  <h3 className="font-serif text-3xl text-[#3E3E3E] mb-3" style={{ fontFamily: "Playfair Display" }}>
                    {data.venueName || "Local da Cerimônia"}
                  </h3>
                  <p className="text-[#6B6B6B] text-lg">{data.venueAddress || "Endereço completo"}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white rounded-lg">
                    <Calendar className="w-8 h-8 text-[#8B9D7F] mx-auto mb-3" />
                    <p className="text-sm text-[#6B6B6B] mb-1 uppercase tracking-wider">Data</p>
                    <p className="text-[#3E3E3E] font-semibold">
                      {formatDate(data.weddingDate) || "Data do casamento"}
                    </p>
                  </div>

                  <div className="text-center p-6 bg-white rounded-lg">
                    <Clock className="w-8 h-8 text-[#8B9D7F] mx-auto mb-3" />
                    <p className="text-sm text-[#6B6B6B] mb-1 uppercase tracking-wider">Horário</p>
                    <p className="text-[#3E3E3E] font-semibold">{data.weddingTime || "Horário"}</p>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.venueAddress)}`,
                      "_blank",
                    )
                  }
                  className="w-full bg-[#8B9D7F] hover:bg-[#6B7D5F] text-white py-6 text-lg"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Ver Localização no Mapa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="confirmar" className="py-16 px-4 bg-[#8B9D7F]">
        <div className="container mx-auto max-w-2xl">
          <h2
            className="font-serif text-4xl text-white text-center mb-8"
            style={{ fontFamily: "Playfair Display" }}
          >
            Confirme sua Presença
          </h2>
          <p className="text-center text-white/90 mb-8">
            Sua presença é muito importante para nós! Clique no botão abaixo para confirmar via WhatsApp.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleConfirmPresence}
              size="lg"
              className="bg-white text-[#8B9D7F] hover:bg-[#FAF3E0] px-12 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Confirmar Presença via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#8B9D7F] text-white text-center">
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
