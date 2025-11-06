"use client"

import { useEffect, useState } from "react"
import { Heart, MoreVertical, ExternalLink } from "lucide-react"
import { detectBrowser } from "@/src/lib/detect-browser"

export default function OpenPage() {
  const [isTikTok, setIsTikTok] = useState<boolean | null>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const userAgent = navigator.userAgent
    const browser = detectBrowser(userAgent)
    const isTikTokBrowser = browser === "TikTok"

    setIsTikTok(isTikTokBrowser)

    if (!isTikTokBrowser) {
      // Redirecionar imediatamente se não for TikTok
      window.location.href = "https://casarme.site?utm_source=tiktok"
      return
    }

    // Se for TikTok, mostrar conteúdo
    setTimeout(() => setShowContent(true), 100)
  }, [])

  // Se não for TikTok, não renderizar nada (já redirecionou)
  if (isTikTok === false) {
    return null
  }

  // Se ainda não detectou, mostrar loading
  if (isTikTok === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Heart className="w-16 h-16 text-[#D4A373] animate-pulse" fill="currentColor" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className={`max-w-md mx-auto text-center transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <div className="mb-6">
          <Heart
            className="w-16 h-16 mx-auto text-[#D4A373] animate-pulse"
            fill="currentColor"
          />
        </div>

        <h1 className="font-serif text-2xl md:text-3xl text-[#3E3E3E] mb-6">
          Para uma melhor experiência 💌
        </h1>

        <div className="bg-[#FAF3E0] rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MoreVertical className="w-6 h-6 text-[#D4A373]" />
            <span className="text-lg font-semibold text-[#3E3E3E]">+</span>
            <ExternalLink className="w-6 h-6 text-[#D4A373]" />
          </div>

          <p className="text-base text-[#3E3E3E] mb-4 leading-relaxed">
            <strong className="text-[#D4A373]">Clique nos 3 pontinhos</strong> no canto superior direito da tela
          </p>

          <p className="text-base text-[#3E3E3E] mb-4 leading-relaxed">
            Em seguida, selecione <strong className="text-[#D4A373]">"Abrir no navegador"</strong>
          </p>

          <p className="text-sm text-[#6B6B6B] italic">
            Isso é necessário para garantir a melhor experiência no site
          </p>
        </div>

        <div className="mt-6">
          <a
            href="https://casarme.site?utm_source=tiktok"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D4A373] hover:bg-[#C4935F] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
          >
            Abrir Site
          </a>
        </div>
      </div>
    </div>
  )
}

