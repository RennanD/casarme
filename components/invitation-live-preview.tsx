"use client"

import { Heart, MapPin, Calendar, Clock } from "lucide-react"

interface InvitationLivePreviewProps {
  variant: "garden" | "romantico" | "blacktie" | "minimalista"
  data: {
    groomName: string
    brideName: string
    weddingDate: string
    weddingTime: string
    venueName: string
    venueAddress: string
    welcomeMessage: string
    coupleStory: string
  }
  photoPreview: string | null
  groomPhotoPreview: string | null
  bridePhotoPreview: string | null
}

const templateStyles = {
  garden: {
    bg: "bg-[#F5F5F0]",
    accent: "text-[#8B9D7F]",
    accentBg: "bg-[#8B9D7F]",
    border: "border-[#8B9D7F]",
    text: "text-[#4A5D3F]",
  },
  romantico: {
    bg: "bg-[#FFF5F7]",
    accent: "text-[#E8B4B8]",
    accentBg: "bg-[#E8B4B8]",
    border: "border-[#E8B4B8]",
    text: "text-[#8B6B6F]",
  },
  blacktie: {
    bg: "bg-[#F8F9FA]",
    accent: "text-[#2C3E50]",
    accentBg: "bg-[#2C3E50]",
    border: "border-[#2C3E50]",
    text: "text-[#2C3E50]",
  },
  minimalista: {
    bg: "bg-[#FAFAF8]",
    accent: "text-[#9B8B7E]",
    accentBg: "bg-[#9B8B7E]",
    border: "border-[#9B8B7E]",
    text: "text-[#6B5B4F]",
  },
}

export function InvitationLivePreview({
  variant,
  data,
  photoPreview,
  groomPhotoPreview,
  bridePhotoPreview,
}: InvitationLivePreviewProps) {
  const style = templateStyles[variant] || templateStyles.garden
  const coupleNames = data.groomName && data.brideName ? `${data.groomName} & ${data.brideName}` : "Seus Nomes"

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data do Casamento"
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
  }

  return (
    <div className={`${style.bg} rounded-lg overflow-hidden shadow-lg`}>
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        {photoPreview ? (
          <img src={photoPreview || "/placeholder.svg"} alt="Casal" className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full ${style.accentBg} opacity-20 flex items-center justify-center`}>
            <Heart className="w-16 h-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">{coupleNames}</h1>
          <p className="text-sm opacity-90">{formatDate(data.weddingDate)}</p>
        </div>
      </div>

      {/* Welcome Message */}
      {data.welcomeMessage && (
        <div className="p-6 text-center border-b border-gray-200">
          <div className={`inline-flex items-center gap-2 mb-3 ${style.accent}`}>
            <div className="h-px w-8 bg-current" />
            <Heart className="w-4 h-4" />
            <div className="h-px w-8 bg-current" />
          </div>
          <p className={`text-sm ${style.text} leading-relaxed`}>{data.welcomeMessage}</p>
        </div>
      )}

      {/* O Casal Section */}
      {(groomPhotoPreview || bridePhotoPreview || data.coupleStory) && (
        <div className="p-6 border-b border-gray-200">
          <h2 className={`font-serif text-xl font-semibold text-center mb-4 ${style.accent}`}>O Casal</h2>
          <div className="flex justify-center gap-6 mb-4">
            {groomPhotoPreview && (
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${style.border} mx-auto mb-2`}>
                  <img
                    src={groomPhotoPreview || "/placeholder.svg"}
                    alt="Noivo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-xs font-medium ${style.text}`}>{data.groomName || "Noivo"}</p>
              </div>
            )}
            {bridePhotoPreview && (
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${style.border} mx-auto mb-2`}>
                  <img
                    src={bridePhotoPreview || "/placeholder.svg"}
                    alt="Noiva"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-xs font-medium ${style.text}`}>{data.brideName || "Noiva"}</p>
              </div>
            )}
          </div>
          {data.coupleStory && (
            <p className={`text-xs ${style.text} text-center leading-relaxed`}>
              {data.coupleStory.substring(0, 150)}...
            </p>
          )}
        </div>
      )}

      {/* Cerimônia Section */}
      {(data.venueName || data.venueAddress || data.weddingTime) && (
        <div className="p-6">
          <h2 className={`font-serif text-xl font-semibold text-center mb-4 ${style.accent}`}>Cerimônia</h2>
          <div className="space-y-3">
            {data.weddingDate && (
              <div className="flex items-center gap-3">
                <Calendar className={`w-4 h-4 ${style.accent}`} />
                <span className={`text-xs ${style.text}`}>{formatDate(data.weddingDate)}</span>
              </div>
            )}
            {data.weddingTime && (
              <div className="flex items-center gap-3">
                <Clock className={`w-4 h-4 ${style.accent}`} />
                <span className={`text-xs ${style.text}`}>{data.weddingTime}</span>
              </div>
            )}
            {data.venueName && (
              <div className="flex items-start gap-3">
                <MapPin className={`w-4 h-4 ${style.accent} mt-0.5`} />
                <div>
                  <p className={`text-xs font-medium ${style.text}`}>{data.venueName}</p>
                  {data.venueAddress && <p className={`text-xs ${style.text} opacity-75`}>{data.venueAddress}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
