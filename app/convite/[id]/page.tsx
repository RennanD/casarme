"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Heart, Share2 } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"

export default function InvitationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const isPreview = searchParams.get("preview") === "true"

  // Mock data - in production, this would be fetched from a database
  const invitation = {
    groomName: "João Silva",
    brideName: "Maria Santos",
    weddingDate: "2025-06-15",
    weddingTime: "16:00",
    venueName: "Espaço Jardim das Flores",
    venueAddress: "Rua das Flores, 123 - Centro, São Paulo - SP",
    message:
      "Com alegria no coração, convidamos você para celebrar conosco o nosso amor e o início de uma nova jornada.",
    photo: "/romantic-couple-wedding-photo.jpg",
    template: "classico",
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
    // In production, this would save to a database
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
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      {/* Hero Section with Photo */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={invitation.photo || "/placeholder.svg?height=800&width=1200"}
          alt="Foto do casal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF3E0]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {invitation.groomName} & {invitation.brideName}
          </h1>
          <p className="text-white text-xl md:text-2xl drop-shadow-lg">Vamos nos casar!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Message Card */}
        {invitation.message && (
          <Card className="p-8 bg-white border-none shadow-lg mb-8 text-center">
            <Heart className="w-12 h-12 text-[#D4A373] mx-auto mb-4" />
            <p className="text-[#6B6B6B] text-lg leading-relaxed italic">{invitation.message}</p>
          </Card>
        )}

        {/* Countdown - Pro Feature */}
        <Card className="p-8 bg-gradient-to-br from-[#D4A373] to-[#C49363] text-white border-none shadow-lg mb-8">
          <h2 className="font-serif text-3xl font-bold text-center mb-6">Contagem Regressiva</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Dias", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Minutos", value: timeLeft.minutes },
              { label: "Segundos", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <span className="text-4xl md:text-5xl font-bold">{item.value.toString().padStart(2, "0")}</span>
                </div>
                <span className="text-sm uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Date and Location */}
        <Card className="p-8 bg-white border-none shadow-lg mb-8">
          <h2 className="font-serif text-3xl font-bold text-[#3E3E3E] text-center mb-8">Quando e Onde</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-1">Data</h3>
                <p className="text-[#6B6B6B] text-lg">{formatDate(invitation.weddingDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-1">Horário</h3>
                <p className="text-[#6B6B6B] text-lg">{invitation.weddingTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-semibold text-[#3E3E3E] mb-1">{invitation.venueName}</h3>
                <p className="text-[#6B6B6B] mb-4">{invitation.venueAddress}</p>
                <Button onClick={handleOpenMap} className="bg-[#D4A373] text-white hover:bg-[#C49363]">
                  <MapPin className="w-4 h-4 mr-2" />
                  Abrir no Google Maps
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* RSVP */}
        <Card className="p-8 bg-white border-none shadow-lg mb-8">
          <h2 className="font-serif text-3xl font-bold text-[#3E3E3E] text-center mb-6">Confirme sua Presença</h2>

          {rsvpStatus === "pending" ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleRSVP("confirmed")}
                size="lg"
                className="bg-[#D4A373] text-white hover:bg-[#C49363] flex-1 sm:flex-none"
              >
                <Heart className="w-5 h-5 mr-2" />
                Confirmar Presença
              </Button>
              <Button
                onClick={() => handleRSVP("declined")}
                size="lg"
                variant="outline"
                className="border-[#D4A373] text-[#D4A373] hover:bg-[#FAF3E0] flex-1 sm:flex-none"
              >
                Não Poderei Ir
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF3E0] rounded-full">
                <Heart className="w-5 h-5 text-[#D4A373]" />
                <span className="text-[#3E3E3E] font-semibold">
                  {rsvpStatus === "confirmed" ? "Presença confirmada!" : "Resposta registrada"}
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Share Button */}
        <div className="text-center">
          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="border-[#D4A373] text-[#D4A373] hover:bg-[#FAF3E0] bg-transparent"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar Convite
          </Button>
        </div>

        {isPreview && (
          <div className="mt-8 p-4 bg-[#D4A373] text-white rounded-lg text-center">
            <p className="font-semibold">Modo Preview - Este é um exemplo de como seu convite ficará!</p>
          </div>
        )}
      </div>
    </div>
  )
}
