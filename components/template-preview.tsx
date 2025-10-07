import { MapPin, Calendar, Clock } from "lucide-react"

interface TemplatePreviewProps {
  variant: "garden" | "romantico" | "blacktie" | "minimalista"
}

export function TemplatePreview({ variant }: TemplatePreviewProps) {
  const styles = {
    garden: {
      bg: "bg-gradient-to-b from-[#F5F5DC] to-[#E8E8D0]",
      accent: "bg-[#8B9D7F]",
      text: "text-[#3E3E3E]",
      border: "border-[#8B9D7F]",
    },
    romantico: {
      bg: "bg-gradient-to-b from-[#FFF5F7] to-[#FFE8ED]",
      accent: "bg-[#D4A373]",
      text: "text-[#3E3E3E]",
      border: "border-[#D4A373]",
    },
    blacktie: {
      bg: "bg-gradient-to-b from-[#2C2C2C] to-[#1A1A1A]",
      accent: "bg-[#D4AF37]",
      text: "text-white",
      border: "border-[#D4AF37]",
    },
    minimalista: {
      bg: "bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF]",
      accent: "bg-[#6C757D]",
      text: "text-[#212529]",
      border: "border-[#6C757D]",
    },
  }

  const style = styles[variant] || styles.garden

  return (
    <div className={`${style.bg} rounded-lg shadow-lg overflow-hidden w-full h-full flex flex-col`}>
      {/* Mini navigation bar */}
      <div className="bg-white/90 backdrop-blur-sm px-2 py-1.5 flex items-center justify-between border-b">
        <span className={`font-serif text-[8px] font-bold ${style.text.replace("text-white", "text-[#3E3E3E]")}`}>
          J & M
        </span>
        <div className="flex gap-1">
          {["Home", "Casal", "Cerimônia"].map((item) => (
            <span key={item} className={`text-[6px] ${style.text.replace("text-white", "text-[#6B6B6B]")}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Mini hero section */}
      <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
        <img
          src={`/.jpg?height=400&width=600&query=${variant} wedding couple photo`}
          alt="Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <h3 className="font-serif text-xs sm:text-sm font-bold text-white text-center leading-tight mb-0.5">
            João & Maria
          </h3>
          <p className="text-white text-[8px] opacity-90">20 DE DEZEMBRO DE 2025</p>
        </div>
      </div>

      {/* Mini countdown */}
      <div className={`${style.accent} py-2 px-2`}>
        <div className="grid grid-cols-4 gap-1">
          {["184", "14", "09", "24"].map((num, i) => (
            <div key={i} className="text-center">
              <div className="bg-white rounded text-[10px] font-bold py-1">{num}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini content sections */}
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        {/* Welcome section */}
        <div className="text-center">
          <p className={`text-[7px] ${style.text} leading-tight line-clamp-2`}>
            Criamos esse site para compartilhar os detalhes do nosso casamento...
          </p>
        </div>

        {/* Mini couple photos */}
        <div className="flex justify-center gap-2">
          {[1, 2].map((i) => (
            <div key={i} className={`w-8 h-8 rounded-full ${style.border} border overflow-hidden`}>
              <img
                src={`/diverse-group.png?height=100&width=100&query=person ${i}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mini info cards */}
        <div className="grid grid-cols-3 gap-1">
          {[Calendar, Clock, MapPin].map((Icon, i) => (
            <div key={i} className="bg-white/50 rounded p-1 text-center">
              <Icon className={`w-3 h-3 ${style.text} mx-auto`} />
            </div>
          ))}
        </div>

        {/* Mini button */}
        <div className={`${style.accent} rounded py-1 text-center`}>
          <span className="text-white text-[7px] font-medium">Confirmar</span>
        </div>
      </div>
    </div>
  )
}
